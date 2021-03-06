const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//exported Post model
const postsRoutes = require("./routes/posts");

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
        'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
})

app.use("/api/posts", postsRoutes);

module.exports = app;


