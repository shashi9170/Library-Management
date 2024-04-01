const mongoose = require("mongoose");

const Connection = () => {
  mongoose
    .connect(`${process.env.DATABASEURL}/library`)
    .then(()=>console.log("Mongodb connected"))
    .catch((err) => console.log("Mongodb are not connected ",err));
};

module.exports = Connection;
