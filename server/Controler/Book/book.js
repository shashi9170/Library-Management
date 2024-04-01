const BookUpload = require("../../models/book");

const UploadBook = async (req, res) => {
  const { subject, author, edition, price, item } = req.body;
  const file = req.file.filename;
  console.log(req.body);

  const book = new BookUpload({
    Subject: subject,
    Author: author,
    NoOfItem: item,
    Price: price,
    Edition: edition,
    file: file,
  });

  book.save();
  res.send("Success");
};

const GetAllBookData = async (req, res) => {
  const BookData = await BookUpload.find({});
  res.json({ book: BookData });
};

const GetOneBookData = async (req, res) => {
  const BookData = await BookUpload.findById({ _id: req.params.id });

  res.json({ book: BookData });
};

module.exports = { UploadBook, GetAllBookData, GetOneBookData };
