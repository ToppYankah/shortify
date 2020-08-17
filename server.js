const express = require("express");
const mongoose = require("mongoose");
const apiRouter = require("./routes/api");
const UrlRequest = require("./models/UrlRequest");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/api", apiRouter);
app.use("/public", express.static("public"));

const password = process.env.URI_PASSWORD;
const url = `mongodb+srv://Kenny_Yankz:${password}@ichat.lljpl.mongodb.net/ichat?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/visit/:urlCode", async (req, res) => {
  const foundUrl = await UrlRequest.findOne({ urlCode: req.params.urlCode });

  if (foundUrl && foundUrl.visits > 0) {
    foundUrl.visits--;
    await foundUrl.save();
    res.redirect(foundUrl.longUrl);
  }
  res.redirect(
    "/?error=You have reach your maximum visit. Register premium to enjoy more"
  );
});

app.get("/:id", async (req, res) => {
  const foundUrl = await UrlRequest.findById(req.params.id);

  if (foundUrl) {
    res.render("index", { result: foundUrl });
  }
});

app.get("/", async (req, res) => {
  const error = req.query.error ? req.query.error : "";
  res.render("index", { result: { shortUrl: "", error } });
});

const port = process.env.PORT || 5000;

app.listen(port);
