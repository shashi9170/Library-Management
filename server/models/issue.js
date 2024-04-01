const { Schema, model } = require("mongoose");

const IssueBook = new Schema(
  {
    UserId: {
      type: Schema.ObjectId,
      ref: "Profile",
      require: true,
    },
    BookId: {
      type: Schema.ObjectId,
      ref: "book",
      require: true,
    },
    Subject: {
      type: String,
      require: true,
    },
    file: {
      type: String,
      require: true,
    },
    issueDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Issue = model("issue", IssueBook);

module.exports = Issue;
