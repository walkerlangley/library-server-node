const mysql = require('mysql')
const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'library'
}

// For a more functional approach
//const loadDBConn = db => config => {
  //const conn = (sql, args) => {
    //return new Promise((resolve, reject) =>
      //conn.query(sql, args, (err, rows) => {
        //if (err) return reject(err)
        //resolve(rows)
      //})
    //)
  //}
//}

//const conn = loadDBConn(mysql)(config);
//module.exports.query = conn;

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
    this.connection.connect(err => {
      if (err) throw err;
      console.log('DB Connected!');
    })
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err)
            return reject(err);
        resolve(rows);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err)
          return reject(err);
        resolve();
      });
    });
  }
}
module.exports = new Database(config);
//http://www.codedodle.com/2014/12/social-network-friends-database.html
