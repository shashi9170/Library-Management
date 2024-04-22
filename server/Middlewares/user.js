const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Profile = require("../models/student");

const UserRegisterMiddleWare = async (req, res, next) => {
  const { name, adhar, mobile, study, dob, gender, address, password } =
    req.body;
  const file = req.file;
  
  if (
    !name ||
    !adhar ||
    !mobile ||
    !study ||
    !dob ||
    !gender ||
    !file ||
    !address ||
    !password
  ) {
     res.setHeader("Access-Control-Allow-Credentials", "true");
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
     res.setHeader("Access-Control-Allow-Origin", "https://react-phi-coral.vercel.app");
    res
      .status(400)
      .json({ status: "Failed", message: "All the field are required" });
  } else {
    const userData = await Profile.findOne({ adhar: adhar });

    if (userData) {
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader("Access-Control-Allow-Origin", "https://react-phi-coral.vercel.app");
      res.status(400).json({
        status: "Failed",
        message: "This adhar number has already register",
      });
    } else {
      next();
    }
  }
};

const UserLoginMiddleWare = async (req, res, next) => {
  const { adhar, password } = req.body;

  if (!adhar || !password) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader("Access-Control-Allow-Origin", "https://react-phi-coral.vercel.app");
    res
      .status(400)
      .json({ status: "Failed", message: "All the field are required" });
  } else {
    const userData = await Profile.findOne({ adhar: adhar });

    if (userData) {
      const isMatch = bcrypt.compare(password, userData.password);
      if (isMatch) next();
      else{
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader("Access-Control-Allow-Origin", "https://react-phi-coral.vercel.app");
        res.status(400).json({
          status: "Failed",
          message: "Your password or adhar number is wrong",
        });
      }
    } else {
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader("Access-Control-Allow-Origin", "https://react-phi-coral.vercel.app");
      res.status(400).json({ status: "Failed", message: "Please register" });
    }
  }
};

const AuthenticUser = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (token) {
    const { _id, adhar } = jwt.verify(token, process.env.SECRET);
    const userData = await Profile.findOne({ _id: _id, adhar: adhar });

    if (userData) {
      next();
    } else {
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader("Access-Control-Allow-Origin", "https://react-phi-coral.vercel.app");
      res.status(400).json({ status: "Failed", message: "Please login" });
    }
  } else {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader("Access-Control-Allow-Origin", "https://react-phi-coral.vercel.app");
    res.status(400).json({ status: "Failed", message: "Please login" });
  }
};

module.exports = { UserRegisterMiddleWare, UserLoginMiddleWare, AuthenticUser };
