const mongoose= require("mongoose")

//SCHEMA
const BookSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number
  });
  module.exports = mongoose.model('Book', BookSchema, "books");
