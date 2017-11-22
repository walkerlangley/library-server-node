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
} = graphql

const {
  getUser,
  getUserBooks,
  getAllBooks,
  getBookById,
  getUserFriends,
  getBookAuthors,
  getAuthorsBooks,
} = require('../database/queries')

const {
  addUser,
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
      resolve: (parentValue, args) => {
        console.log('Parent: ', parentValue);
        return getAuthorsBooks(parentValue.id)
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
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    yearWritten: { type: GraphQLString },
    status: { type: GraphQLString },
    author: {
      type: new GraphQLList(AuthorType),
      resolve: (parentValue, args) => {
        return getBookAuthors(parentValue.id)
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
      resolve: (parentValue, args) => {
        return getUserBooks(parentValue.id)
      }
    },
    friends: {
      type: new GraphQLList(UserType),
      resolve: (parentValue, args) => {
        return getUserFriends(parentValue.id)
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
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: (parentValue, args) => {
        return getUser(args.id)
      }
    },
    book: {
      type: new GraphQLList(BookType),
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: (parentValue, args) => {
        return args.id
          ? getBookById(args.id)
          : getAllBooks()
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
        return await addUser(args)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
})
