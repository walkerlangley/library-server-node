const axios = require('axios')
const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBool,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = graphql

const {
  getUser,
  getUserBooks,
  getAllBooks,
  getBookById,
  getUserFriends,
  getBookAuthors,
  getAuthorsBooks,
  getAuthorById,
  getAuthorByName,
} = require('../database/queries')

const {
  addUser,
  addBook,
  addAuthor,
  addAuthorBook,
} = require('../database/mutations')

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'Author Type',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve: async (parentValue, args) => {
        return await getAuthorsBooks(parentValue.id)
      }
    }
  })
})

const UserBooksType = new GraphQLObjectType({
  name: 'UserBooks',
  fields: () => ({
    userId: { type: GraphQLID },
    bookId: { type: GraphQLID },
    read: { type: GraphQLInt },
    notes: { type: GraphQLString }
  })
})

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    isbn10: { type: GraphQLString },
    isbn13: { type: GraphQLString },
    title: { type: GraphQLString },
    subtitle: { type: GraphQLString },
    description: { type: GraphQLString },
    smallThumbnail: { type: GraphQLString },
    thumbnail: { type: GraphQLString },
    previewLink: { type: GraphQLString },
    infoLink: { type: GraphQLString },
    buyLink: { type: GraphQLString },
    publishedDate: { type: GraphQLString },
    pageCount: { type: GraphQLInt },
    averageRating: { type: GraphQLInt },
    status: { type: GraphQLString },
    author: {
      type: new GraphQLList(AuthorType),
      resolve: async (parentValue, args) => {
        console.log('ParentValueID: ', parentValue);
        const author = await getBookAuthors(parentValue.id)
        console.log('Author: ', author);
        return author
        //return getBookAuthors(parentValue.id)
      }
    }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User Type',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    occupation: { type: GraphQLString },
    email: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve: async (parentValue, args) => {
        return await getUserBooks(parentValue.id)
      }
    },
    friends: {
      type: new GraphQLList(UserType),
      resolve: async (parentValue, args) => {
        return await getUserFriends(parentValue.id)
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Root Query',
  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: async (parentValue, args) => {
        return await getUser(args.id)
      }
    },
    book: {
      type: new GraphQLList(BookType),
      args: { id: { type: GraphQLID }
      },
      resolve: async (parentValue, args) => {
        return args.id
          ? await getBookById(args.id)
          : await getAllBooks()
      }
    }
  })
})
const AuthorInputType = new GraphQLInputObjectType({
  name: 'AuthorInputType',
  fields: () => ({
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
  })
})

const fetchGoogleBookByISBN = async (isbn) => {
  const URL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_BOOKSHELF_API}`
  const results = await axios.get(URL)
  const googleBook = results.data
  const { volumeInfo, saleInfo } = googleBook.items[0]
  const {
    title,
    subtitle,
    authors,
    publishedDate,
    description,
    industryIdentifiers,
    pageCount,
    averageRating,
    imageLinks: { smallThumbnail, thumbnail },
    previewLink,
    infoLink
  } = volumeInfo
  const { buyLink } = saleInfo
  const [ isbn10, isbn13 ] = industryIdentifiers
    .map(i => i.identifier)
    .sort((a,b) => a.length - b.length)

  const bookArgs = {
    isbn10,
    isbn13,
    title,
    subtitle,
    description,
    smallThumbnail,
    thumbnail,
    previewLink,
    infoLink,
    buyLink,
    publishedDate,
    pageCount,
    averageRating,
  }

  const authorNames = authors.map(author => {
    const [firstName, lastName] = author.split(' ')
    return [firstName, lastName]
  })

  return {
    authorNames,
    bookArgs
  }
}

const getAuthorIDs = async (authorNames) => {
  const authArr = authorNames.map(async (name) => {
    const exists = await getAuthorByName(name)
    if (exists.length) {
      return exists[0].id
    } else {
      const newAuthor = await addAuthor(name);
      return newAuthor.insertId
    }
  })

  return Promise.all(authArr)
}

const getAuthorBookIDs = async (authIDs, bookId) => {
  const authBookIds = authIDs.map(async (id) => {
    const authBook = await addAuthorBook(id, bookId)
    return authBook.insertId
  })
  return Promise.all(authBookIds)
}

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Mutate Stuff',
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: (GraphQLString) },
        occupation: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parentValue, args) => {
        const res = await addUser(args)
        const id = await res.insertId
        return await getUser(id)
      }
    },
    addBookByISBN: {
      type: BookType,
      args: {
        isbn: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parentValue, { isbn }) => {
        const { authorNames, bookArgs } = await fetchGoogleBookByISBN(isbn);
        const authIDs = await getAuthorIDs(authorNames)
        const book = await addBook(bookArgs)
        const bookId = await book.insertId
        const authBook = await getAuthorBookIDs(authIDs, bookId)
        const res = await getBookById(bookId)

        return res[0]
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})
