const { Schema, model } = require("mongoose");

const AdminSchema = new Schema(
  {
    Name: {
      type: String,
    },
    SecretKey: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const admin = model("admin", AdminSchema);

model.export = admin;
