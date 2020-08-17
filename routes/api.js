const express = require("express");
const UrlRequest = require("../models/UrlRequest");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

router.post("/create", async (req, res) => {
  if (req.body.mainUrl !== "") {
    const urlExists = await UrlRequest.findOne({ longUrl: req.body.mainUrl });

    if (!urlExists) {
      const urlCode = generateRandomCode();

      let newRequest = new UrlRequest({
        longUrl: req.body.mainUrl,
        shortUrl: process.env.BASE_URL + urlCode,
        urlCode,
      });

      try {
        newRequest = await newRequest.save();
        res.redirect(`/${newRequest._id}`);
      } catch (err) {
        res.redirect("/?error=Error generating url. Try again.");
      }
    }
    res.redirect(
      `/?error=The url you entered already exist&url=${urlExists.shortUrl}`
    );
  }

  res.redirect("/?error=Please enter a valid url");
});

const generateRandomCode = () => {
  return (
    Math.random().toString(32).substring(2, 5) +
    Math.random().toString(32).substring(2, 5)
  );
};

module.exports = router;
