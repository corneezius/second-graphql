const express = require('express');
const graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');


const mongo = require('mongoose');
const app = express();

mongo.connect("mongodb+srv://corneezius:fivetime@cluster0-9j8wy.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongo.connection.once('open', () => {
    console.log('connected to database');
})

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
