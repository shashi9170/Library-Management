const express = require("express");
const upload = require("../Controler/Book/BookUpload");
const { UploadBook, GetAllBookData, GetOneBookData } = require("../Controler/Book/book");

const BookRouter = express.Router();

BookRouter.post("/upload", upload.single("file"), UploadBook);

BookRouter.get("/allbook", GetAllBookData);

BookRouter.get("/:id", GetOneBookData);

module.exports = BookRouter;
