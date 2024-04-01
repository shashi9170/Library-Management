const { Schema, model } = require("mongoose");

const URLYoutube = new Schema({
    UserId: {
        type: Schema.ObjectId,
        ref: "Profile",
        require: true,
      },
      BookId: {
        type: Schema.ObjectId,
        ref: "books",
        require: true,
      },
      Link: {
        type: String,
        require: true,
      },
      URLDate: {
        type: Date,
        default: Date.now(),
      },
}, {timestamps:true});

const URL = model("url", URLYoutube);

module.exports = URL;

