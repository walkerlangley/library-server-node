const axios = require('axios')

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
  getBookByISBN,
  getAuthBookId,
} = require('../database/queries')

const {
  addUser,
  addBook,
  addAuthor,
  addAuthorBook,
} = require('../database/mutations')

module.exports = {
  transformBookData: book => {
    const { volumeInfo, saleInfo: { buyLink } } = book.items[0]
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

    const authorNames = authors.map(author => author.split(' '))

    return {
      authorNames,
      bookArgs
    }
  },

  fetchGoogleBookByISBN: async (isbn) => {
    const URL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_BOOKSHELF_API}`
    const results = await axios.get(URL)
    return results.data
  },

  getAuthorIDs: authorNames => {
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
  },

  getAuthorBookIDs: (authIDs, bookId) => {
    const authBookIds = authIDs.map(async (id) => {
      const exists = await getAuthBookId(id, bookId)
      if (!exists.length) {
        const authBook = await addAuthorBook(id, bookId)
        return authBook.insertId
      }
    })
    return Promise.all(authBookIds)
  },

  getBookIDs: async bookArgs => {
    const bookId = await getBookByISBN(bookArgs.isbn13)
    if (bookId.length) {
      return bookId[0].id;
    } else {
      const book = await addBook(bookArgs);
      return book.insertId
    }
  }
}
