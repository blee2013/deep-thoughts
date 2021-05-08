const express = require('express');

//Step 7- import ApolloServer
const { ApolloServer } = require('apollo-server-express');

//Step 8- import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Step 9- create a new Apollog server and pass in ourr schema data
const server = new ApolloServer({
  typeDefs,
  resolvers
});

//Step 10- integrate our Apollo server with the Express applicaiton as middlleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    //Step 11- log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
