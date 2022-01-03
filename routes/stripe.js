const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51JyvJQH3owj1ZBgYgTQmEXe1tRlC9i2ZWk3ajtdhQWFdRctzVTpODtuYRCBuHrMZSJpUNyB8aSosIZWKHZhDLErm00CcALwHm4"
);

router.post("/payment", async (req, res) => {
  await stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeRes) {
        res.status(200).json(stripeRes);
      } else {
        res.status(500).json(stripeErr);
      }
    }
  );
});

module.exports = router;
