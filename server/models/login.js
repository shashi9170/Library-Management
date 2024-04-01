const { mongoose, Schema } = require("mongoose");

const LoginData = new Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const loginSchema = mongoose.model("Login", LoginData);

module.exports = loginSchema;
