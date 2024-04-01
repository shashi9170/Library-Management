const URLData = require("../../models/link");

const AddYouTubeLink = async (req, res) => {
  const { Uid, Bid, URL } = req.body;

  const Link = await new URLData({
    UserId: Uid,
    BookId: Bid,
    Link: URL,
  });

  Link.save();

  res.json({ message: "Successful" });
};

module.exports = { AddYouTubeLink };
