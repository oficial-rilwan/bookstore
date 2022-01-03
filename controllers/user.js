const Book = require("../models/Book");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById({ _id: id });
    if (!user) {
      return next(new ErrorResponse("No User found with the giver ID", 404));
    }
    const { _id: userId, firstName, lastName, email, image } = user;
    res.status(200).json({ userId, firstName, lastName, email, image });
  } catch (error) {
    next(error.message);
  }
};

exports.addToWishlist = async (req, res, next) => {
  const bookId = req.params.id;
  const userId = req.body.id;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return next(new ErrorResponse("No User found with the giver ID", 404));
    }
    await user.updateOne({ $push: { wishlists: bookId } });
    if (user.wishlists.includes(bookId)) {
      return next(new ErrorResponse("Book already added to wishlists", 400));
    }
    res.status(200).json({ message: "Book added to wishlist successfully!" });
  } catch (error) {
    next(error.message);
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  const bookId = req.params.id;
  const userId = req.body.id;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return next(new ErrorResponse("No User found with the giver ID", 404));
    }
    await user.updateOne({ $pull: { wishlists: bookId } });
    res
      .status(200)
      .json({ message: "Book removed from wishlist successfully!" });
  } catch (error) {
    next(error.message);
  }
};

exports.getWishlists = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const wishlists = await Promise.all(
      user.wishlists.map((wishlist) => {
        return Book.findById(wishlist);
      })
    );
    let wishlistBooks = [];
    wishlists.map((wishlist) => {
      wishlistBooks.push(wishlist);
    });
    res.status(200).json(wishlistBooks);
  } catch (error) {
    next(error.message);
  }
};
