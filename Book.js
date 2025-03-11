// backend/models/Book.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: String,
    year: Number
});

module.exports = mongoose.model('Book', BookSchema);
