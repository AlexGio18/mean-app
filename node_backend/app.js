const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//exported Post model
const Post = require('./models/post');
const app = express();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to database!');
    }).catch(() => {
        console.log('Connection failed!');
    })

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
    const post = new Post({
        title: request.body.title,
        content: request.body.content
    });
    post.save().then(createdPost => {
        response.status(201).json({
            message: 'Post added successfully',
            postId: createdPost._id
        });
    });

});

app.get('/api/posts', (request, response, next) => {
    Post.find()
    .then(documents => {
        response.status(200).json({
            message: 'Posts fetched successfully!',
            posts: documents
        });
    });
});

app.delete('/api/posts/:id', (request, response, next) => {
    Post.deleteOne({_id: request.params.id}).then(result => {
        console.log(result);
        response.status(200).json({ message: 'Post deleted!'});
    })
})

module.exports = app;


