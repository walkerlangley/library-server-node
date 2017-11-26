const db = require('./db');

module.exports = {
  addUser: (args) => {
    const {
      firstName,
      lastName,
      username,
      password,
      occupation,
      email
    } = args
    return db.query(`
      INSERT INTO users (firstName, lastName, userName, password, occupation, email)
      VALUES (?, ?, ?, ?, ?, ?)`,
        [
          firstName,
          lastName,
          username,
          password,
          occupation,
          email
        ]
    )
  },
  addAuthor: (authorNames) => {
    return db.query(`
      INSERT INTO authors (firstName, lastName)
      VALUES (?, ?)`,
      authorNames
    )
  },

  addBook: (args) => {
    const {
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
    } = args
    return db.query(`
    INSERT INTO books (
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
      averageRating
      )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
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
      ])
  },

  addAuthorBook: (authId, bookId) => {
    return db.query(`
      INSERT INTO authorBooks (authorId, bookId)
      VALUES (?, ?)
      `, [authId, bookId]
    )
  },
}
