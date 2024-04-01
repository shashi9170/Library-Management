const { Schema, model } = require("mongoose");

const Issue = new Schema(
  {
    UserId: {
      type: Schema.ObjectId,
      ref: "Profile",
      require: true,
    },
    BookId: [
      {
        Bid: {
          type: Schema.ObjectId,
          ref: "book",
          require: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const IssueBook = model("issueBook", Issue);

module.exports = IssueBook;
