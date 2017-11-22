const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const PORT = 4000;
const schema = require('./schema/schema')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'library'
})

connection.connect()

const app = express()
//app.use(bodyParser.json())
app.use('/graphiql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.get('/health', (req, res) => {
  res.send('OK!')
})

app.get('/db', (req, res) => {
  connection.query('SELECT * from users', (err, rows, fields) => {
    if (err) res.send(err)
    console.log('Users: ', rows[0]);
  })
})



app.listen(PORT, () => {
  console.log(`Server Started on PORT: ${PORT}`);
})
