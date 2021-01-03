const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

var app = express();

app.use('/graphql', graphqlHTTP({
    schema,   // same as schema: schema
    graphiql: true  // use for development environment
}));

app.listen(4000, () =>{
    console.log('Listening port 4000');
});
