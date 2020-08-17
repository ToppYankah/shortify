const express = require("express");
const router = express.Router();
const UrlRequest = require("../models/UrlRequest");

router.post("/create", async (req, res) => {
  if (req.body.mainUrl) {
    const urlCode = generateRandomCode();

    let newRequest = new UrlRequest({
      longUrl: req.body.mainUrl,
      shortUrl: `localhost:5000/short.ly/${urlCode}`,
      urlCode,
    });
    try {
      newRequest = await newRequest.save();
      res.redirect(`/${newRequest._id}`);
    } catch (err) {
      console.log("from Post", err.message);
      res.redirect("/");
    }
  }

  res.redirect("/");
});

const generateRandomCode = () => {
  return (
    Math.random().toString(32).substring(2, 5) +
    Math.random().toString(32).substring(2, 5)
  );
};

module.exports = router;
