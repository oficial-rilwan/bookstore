const Book = require("../models/Book");
const router = require("express").Router();
const {
  createbook,
  updatebook,
  getBook,
  getAllBooks,
} = require("../controllers/books");

router.route("/").post(createbook);
router.route("/:id").put(updatebook);
router.route("/find").get(getBook);
router.route("/").get(getAllBooks);

module.exports = router;
