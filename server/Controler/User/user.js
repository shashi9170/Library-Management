const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const storage = getStorage();

const Profile = require("../../models/student");
const IssueBook = require("../../models/issueBook");
const BookUpload = require("../../models/book");

const LoginUser = async (req, res) => {
  const { adhar, password } = req.body;

  const data = await Profile.findOne({ adhar: adhar }).select("-password");

  const token = jwt.sign(
    { _id: data._id, adhar: data.adhar },
    process.env.SECRET
  );

  res.cookie("token", token, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.status(200).json({ message: "success", token: token, data: data });
};

const RegisterData = async (req, res) => {
  const { name, adhar, mobile, study, dob, gender, address, password } =
    req.body;
  console.log(req.body, " ", req.file);
  const storageRef = ref(
    storage,
    `students/${Date.now() + req.file.originalname}`
  );

  const metadata = { contentType: req.file.mimetype };

  const snapshot = await uploadBytesResumable(
    storageRef,
    req.file.buffer,
    metadata
  );
  const downloadURL = await getDownloadURL(snapshot.ref);

  // const salt = await bcrypt.salt(10);
  const hashPassword = await bcrypt.hash(password, 10);

  const User = new Profile({
    name: name,
    adhar: adhar,
    mobile: mobile,
    study: study,
    dob: dob,
    gender: gender,
    address: address,
    password: hashPassword,
    image: downloadURL,
  });

  await User.save();
   res.setHeader("Access-Control-Allow-Credentials", "true");
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.status(201).json({ status: "success", message: "You have registered" });
};

const GetAllUserData = async (req, res) => {
  const data = await Profile.find({});

  return res.status(200).json({ user: data });
};

const GetUserProfile = async (req, res) => {
  const token = req.headers["authorization"];

  const { _id, adhar } = jwt.verify(token, process.env.SECRET);
  const data = await Profile.findById({ _id: _id, adhar: adhar }).select(
    "-password"
  );

  res.status(200).json({ user: data });
};

const GetRegisterUserData = async (req, res) => {
  const token = req.headers["authorization"];

  const { _id, adhar } = jwt.verify(token, process.env.SECRET);
  const result = await Profile.find({ _id: _id, adhar: adhar });

  res.status(200).json({ message: "Successful", data: result });
};

const UserLogOut = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "success" });
};

const GetUserProfileAndIssueBook = async (req, res) => {
  const Uid = req.params.id;
  const issueBook = await IssueBook.findOne({ UserId: Uid });
  const userData = await Profile.find({ _id: Uid });

  let arr = [];
  if (issueBook && issueBook.BookId.length > 0) {
    for (let i = 0; i < issueBook.BookId.length; i++) {
      const BookData = await BookUpload.findById({ _id: issueBook.BookId[i].Bid });
      const newBookData = {
        Subject: BookData.Subject,
        file: BookData.file,
        BookId: BookData._id,
        UserId: Uid,
        issueDate: issueBook.BookId[i].date,
      };
      arr.push(newBookData);
    }
  }

  res
    .status(200)
    .json({ message: "Successful", userData: userData, BookData: arr });
};

module.exports = {
  RegisterData,
  GetAllUserData,
  GetUserProfile,
  LoginUser,
  GetRegisterUserData,
  UserLogOut,
  GetUserProfileAndIssueBook,
};
