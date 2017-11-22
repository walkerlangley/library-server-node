const db = require('./db')

module.exports = {
  getUser: (id) => {
    return db.query('SELECT * FROM users WHERE id = ?', id).then(res => res[0])
  },

  getUserBooks: (id) => {
    return db.query(`
    SELECT
      b.*,
      bs.status
    FROM
      users u
      left join usersBooks ub on (ub.userId = u.id)
      left join bookStatus bs on (bs.id = ub.statusId)
      left join books b on (b.id = ub.bookId)
    WHERE
      u.id = ?
    `,
    id)
  },

  getAllBooks: () => {
    return db.query(`SELECT * FROM books`)
  },

  getBookById: (id) => {
    return db.query(`SELECT * FROM books WHERE id = ?`, id)
  },

  getUserFriends: (id) => {
    return db.query(`
    select
      u2.*
    from
      users u
      left join relationships r on (r.userId = u.id)
      left join users u2 on (u2.id = r.friendId)
    where
      u.id = 1
    `,
    id)
  },

  getBookAuthors: (id) => {
    return db.query(`
    SELECT
        a.id,
        a.firstName,
        a.lastName
    FROM
        books b
        left join authorBooks ab on (ab.bookId = b.id)
        left join authors a on (ab.authorId = a.id)
    WHERE
        b.id = ?
    `,
    id)
  },

  getAuthorsBooks: (id) => {
    return db.query(`
    SELECT
        b.*
    FROM
        authors a
        left join authorBooks ab on (ab.authorId = a.id)
        left join books b on (b.Id = ab.bookId)
    WHERE
        a.id = ?
    `,
    id)
  },
}
