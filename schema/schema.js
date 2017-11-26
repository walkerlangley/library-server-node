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
  addUserBook,
} = require('../database/mutations')

const {
  transformBookData,
  fetchGoogleBookByISBN,
  getAuthorIDs,
  getAuthorBookIDs,
  getBookIDs,
} = require('../utils/helpers')

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
        return await getBookAuthors(parentValue.id)
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

const AuthorInputType = new GraphQLInputObjectType({
  name: 'AuthorInputType',
  fields: () => ({
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
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
        userId: { type: new GraphQLNonNull(GraphQLID) },
        statusId: { type: GraphQLInt },
      },
      resolve: async (parentValue, { isbn, userId, statusId = 1 }) => {
        const googleBook = await fetchGoogleBookByISBN(isbn);
        const { authorNames, bookArgs } = await transformBookData(googleBook);
        const authIDs = await getAuthorIDs(authorNames)
        const bookId = await getBookIDs(bookArgs)
        const authBook = await getAuthorBookIDs(authIDs, bookId)
        const newBook = await getBookById(bookId)
        const userBook = await addUserBook(userId, bookId, statusId)

        return newBook[0]
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})
