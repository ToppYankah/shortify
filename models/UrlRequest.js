const mongoose = require("mongoose");

const urlRequestSchema = new mongoose.Schema({
  longUrl: { required: true, type: String },
  shortUrl: { type: String, required: true },
  urlCode: { type: String, required: true },
  visits: { type: Number, default: Date.now, default: 5 },
});

module.exports = mongoose.model("UrlRequest", urlRequestSchema);
