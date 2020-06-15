const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Request-With, Content-Type, Accept');
    response.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PATCH, DELETE, OPTIONS');
    next();
})

app.post('/api/posts', (request, response, next) => {
    const post = request.body;
    console.log(post)
    response.status(201).json({
        message: 'Post added successfully'
    });
});

app.get('/api/posts', (request, response, next) => {
    const posts = [
        { id: 'qweadsqwr1a', 
            title: 'First server side post',
            content: 'This is coming from the server'
        },
        { id: 'qweasdacead', 
            title: 'Second server-side Post',
            content: 'This is coming from the server!'
        }
    ];
    response.status(200).json({
        message: 'Posts fetched successfully!',
        posts: posts
    });
});

module.exports = app;


