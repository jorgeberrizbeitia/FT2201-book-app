const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String
})

const BookModel = mongoose.model( "Book", bookSchema );

module.exports = BookModel