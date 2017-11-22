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
})
