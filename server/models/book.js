const { Schema, model } = require("mongoose");

const BookUploadSchema = new Schema({
  Subject: { type: String, require: true },
  Author: { type: String, require: true },
  NoOfItem: { type: Number, require: true },
  Price: { type: Number, require: true },
  Edition: { type: Number, require: true },
  file: { type: String, default: "/default.jpg" },
});

const BookUpload = model("book", BookUploadSchema);

module.exports = BookUpload;