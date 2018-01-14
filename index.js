const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

const PORT = 4000;

const app = express()
app.use('/graphiql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.get('/health', (req, res) => {
  res.send('OK!')
})

app.listen(PORT, () => {
  console.log(`Server Started on PORT: ${PORT}`);
  console.log('If this is your first time running this server, please kill the server and do the following');
  console.log('1. Make sure you have mysql installed');
  console.log('2. Create a db named "library" (or change the db name in the db.js file on line 6)');
  console.log('3. Run "npm run db" to create the nessary tables and pre-load some data');
  console.log('4. Once you\'ve verified the data is there, run npm start!');
})
