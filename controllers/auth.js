const User = require("../models/User");
const bcrypt = require("bcrypt");
const ErrorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
  const { firstName, lastName, password, email } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(
      new ErrorResponse(
        "This email address is already associated with another account",
        400
      )
    );
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, salt);
    const user = new User({
      firstName,
      lastName,
      email,
      password: securePassword,
    });
    user.save(function (error) {
      if (error) {
        return next(new ErrorResponse(error, 500));
      }
    });
    const {
      firstName: fname,
      lastName: lname,
      email: mail,
      image,
      isAdmin,
    } = user;
    res.status(200).json({ fname, lname, mail, image });
  } catch (error) {
    next(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return next(new ErrorResponse("Sorry, that password isn't right", 400));
    }
    const {
      _id,
      firstName,
      lastName,
      email: userEmail,
      image,
      isAdmin,
      wishlists,
    } = user;
    res
      .status(200)
      .json({ _id, firstName, lastName, userEmail, image, isAdmin, wishlists });
  } catch (error) {
    next(error.message);
  }
};
