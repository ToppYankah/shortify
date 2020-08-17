const express = require("express");
const mongoose = require("mongoose");
const apiRouter = require("./routes/api");
const UrlRequest = require("./models/UrlRequest");
const app = express();
const password = process.argv[2];

const url = `mongodb+srv://Kenny_Yankz:${password}@ichat.lljpl.mongodb.net/ichat?retryWrites=true&w=majority`;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use("/api", apiRouter);
app.use("/public", express.static("public"));

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/:id", async (req, res) => {
  const foundUrl = await UrlRequest.findById(req.params.id);
  console.log("From the Get", foundUrl);
  if (foundUrl) {
    res.render("index", { result: foundUrl });
  }
});

app.get("/", (req, res) => {
  res.render("index", { result: { shortUrl: "" } });
});

const port = process.env.PORT || 5000;

app.listen(port);
