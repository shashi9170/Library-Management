const mongoose = require("mongoose");

const StudentProfile = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    adhar: {
      type: String,
    },
    mobile: {
      type: String,
    },
    address: {
      type: String,
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    study: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", StudentProfile);

module.exports = Profile;
