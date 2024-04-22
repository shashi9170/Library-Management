const BookUpload = require("../models/book");
const IssueBook = require("../models/issueBook");

const IssueBookMiddleWare = async (req, res, next) => {
  const { Uid, Bid } = req.body;

  const IssueBookData = await IssueBook.findOne({
    $and: [{ "BookId.Bid": Bid }, { UserId: Uid }],
  });

  if (IssueBookData) {
    res.status(400).json({ message: "This book Already issue to you" });
  } else {
    const data = await BookUpload.findById({ _id: Bid });

    if (data.NoOfItem > 0) {
      next();
    } else {
      res.status(400).json({ message: "Book not available" });
    }
  }
};

const IssueBookOneUserMiddleWare = async (req, res, next) => {
  const Uid = req.params.id;
  const data = await IssueBook.findOne({ UserId: Uid });

  if (data && data.BookId.length > 0) next();
  else res.status(400).json({ book: "You don't have any issue book" });
};

module.exports = { IssueBookMiddleWare, IssueBookOneUserMiddleWare };
