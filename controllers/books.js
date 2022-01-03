const Book = require("../models/Book");
const ErrorResponse = require("../utils/errorResponse");

exports.createbook = async (req, res, next) => {
  const {
    title,
    image,
    description,
    author,
    publishDate,
    category,
    publisher,
    pages,
    dimensions,
    language,
    aboutAuthor,
    price,
  } = req.body;
  try {
    const savedBook = await new Book({
      title,
      image,
      description,
      author,
      publishDate,
      category,
      publisher,
      pages,
      dimensions,
      language,
      aboutAuthor,
      price,
    }).save();
    res.status(201).json(savedBook);
  } catch (error) {
    next(error.message);
  }
};

exports.updatebook = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.updateOne(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    if (!book) {
      return next(
        new ErrorResponse("Sorry we couldn't find a book with that ID", 404)
      );
    }
    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    return next(
      new ErrorResponse("Sorry we couldn't find a book with that ID", 500)
    );
  }
};

exports.getBook = async (req, res, next) => {
  const bookId = req.query.bookId;
  try {
    const book = await Book.findOne({ _id: bookId });
    if (!book) {
      return next(
        new ErrorResponse("Sorry we couldn't find a book with that ID", 404)
      );
    }
    res.status(200).json(book);
  } catch (error) {
    return next(
      new ErrorResponse("Sorry we couldn't find a book with that ID", 500)
    );
  }
};

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books.reverse());
  } catch (error) {
    return next(
      new ErrorResponse("Sorry we couldn't find a book with that ID", 500)
    );
  }
};
