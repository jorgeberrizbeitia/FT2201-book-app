const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author"
    }
  ]
})

const BookModel = mongoose.model( "Book", bookSchema );

module.exports = BookModel