const db = require('./db');

module.exports = {
  addUser: async (args) => {
    const {
      firstName,
      lastName,
      username,
      password,
      occupation,
      email
    } = args
    const res = await db.query(`
    INSERT INTO users (firstName, lastName, userName, password, occupation, email)
    VALUES (?, ?, ?, ?, ?, ?)`,
      [
        firstName,
        lastName,
        username,
        password,
        occupation,
        email
      ])
    return await res.insertId
  }
}
