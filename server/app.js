const express = require('express');
const graphqlHTTP = require('express-graphql');
const importedSchema = require('./schema/schema');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://user:chuchubilli@cluster0-qkyjv.mongodb.net/testdb?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('connected to db');
});

const https = require('https');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: importedSchema,
    graphiql: true
}));

app.listen(4000, () => {
    
    https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
    let data = '';

    console.log(resp.statusCode);
    
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(JSON.parse(data).explanation);
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
});