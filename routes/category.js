const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  const categoryExist = await Category.findOne({ title: req.body.title });
  if (categoryExist) {
    res.status(400).json({ message: "Category already exist!" });
  } else {
    try {
      const newCategory = new Category({
        title: req.body.title,
      });
      const saveCategory = await newCategory.save();
      res.status(200).json(saveCategory);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
});

router.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

module.exports = router;
