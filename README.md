# library-server-node
Node server for library using GraphQL

## Steps to get this working
1. Make sure you have mysql running
2. Create a local database called "library" (or call it whatever you want to but you'll need to change the db name in database/db.js (line 6))
3. Run the following commands 
  1. `mkdir library-server-node && cd library-server-node`
  2. `yarn` or `npm install`
  3. `npm run db` to create the necessary tables and pre-load data
  4. `npm start` to fire up the server.  Go to `localhost:4000/graphiql` to start running GraphQL queries

#### If you've never used GraphQL, check out the docs [here](http://graphql.org/), but below is an example query.
- Instead of using the GUI at localhost:4000/graphiql, you can also use Insomnia (https://insomnia.rest/blog/introducing-graphql/)
- Or use CURL
  ```
  curl --request POST \
    --url http://localhost:4000/graphiql \
    --header 'content-type: application/json' \
    --data '{"query":"query {\n  user(id: 1) {\n    firstName,\n    lastName,\n    books {\n      title,\n      subtitle,\n      author {\n        firstName,\n        lastName,\n        books {\n          title,\n          subtitle,\n        \taverageRating,\n          thumbnail\n        }\n      }\n    }\n  }\n}"}'
  ```

```
query {
  user(id: 1) {
    firstName,
    lastName,
    books {
      title,
      subtitle,
      author {
        firstName,
        lastName,
        books {
          title,
          subtitle,
          averageRating,
          thumbnail
        }
      }
    }
  }
}
```
