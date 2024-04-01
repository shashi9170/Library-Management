const jwt = require("jsonwebtoken");
const BookUpload = require("../../models/book");
const admin = require("../../models/admin");
const Issue = require("../../models/issue");
const Profile = require("../../models/student");
const IssueBook = require("../../models/issueBook");

const IssueBookMiddleWare = async (req, res, next) => {
  const { Uid, Bid } = req.body;
  const AuthCookies = req.cookies.token;

  if (AuthCookies && Uid && Bid) {
    const { email, _id } = jwt.verify(AuthCookies, process.env.SECRET);
    const UserData = await Profile.findById({ _id: _id, name: email });

    if (UserData === null) {
      res.header("Access-Control-Allow-Credentials", "true");
      res.status(200).json({ message: "You have not register" });
    } else {
      const IssueBookData = await IssueBook.findOne({
        $and: [{ "BookId.Bid": Bid }, { UserId: Uid }],
      });

      if (IssueBookData !== null) {
        res.header("Access-Control-Allow-Credentials", "true");
        res.status(200).json({ message: "This book Already issue to you" });
      } else {
        const data = await BookUpload.findById({ _id: Bid });

        if (data.NoOfItem > 0) {
          req.body.subject = data.Subject;
          req.body.file = data.file;
          next();
        } else {
          res.header("Access-Control-Allow-Credentials", "true");
          res.status(200).json({ message: "Book not available" });
        }
      }
    }
  } else {
    res.header("Access-Control-Allow-Credentials", "true");
    res.status(200).json({ message: "Your are not login" });
  }
};

module.exports = { IssueBookMiddleWare };
