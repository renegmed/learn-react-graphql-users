const express = require('express');
const { graphqlHTTP } = require('express-graphql');

var app = express();

app.use('/graphql', graphqlHTTP({
    graphiql: true  // use for development environment
}));

app.listen(4000, () =>{
    console.log('Listening port 4000');
});
