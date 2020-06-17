const mongoose = require('mongoose');

// schema
const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

// model
module.exports = mongoose.model('Post', postSchema);