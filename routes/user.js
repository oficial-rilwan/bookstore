const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {
  getUser,
  addToWishlist,
  removeFromWishlist,
  getWishlists,
} = require("../controllers/user");

router.route("/find/:id").get(getUser);
router.route("/wishlists/:id").get(getWishlists);
router.route("/wishlists/:id").put(addToWishlist);
router.route("/wishlists/remove/:id").put(removeFromWishlist);

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(500).json(error);
      }
    }
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res
      .status(403)
      .json({ message: "You can only update your account" });
  }
});

// delete a user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can only delete your account.");
  }
});

module.exports = router;
