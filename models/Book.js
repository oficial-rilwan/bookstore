const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishDate: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    pages: {
      type: String,
      required: true,
    },
    dimensions: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    aboutAuthor: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
