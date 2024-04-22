const express = require("express");

require("../config");

const {
  RegisterData,
  GetAllUserData,
  GetUserProfile,
  LoginUser,
  GetRegisterUserData,
  UserLogOut,
  GetUserProfileAndIssueBook
} = require("../Controler/User/user");

const { AuthenticUser,UserRegisterMiddleWare,UserLoginMiddleWare } = require("../Middlewares/user");
const { GetAdminData, AdminRegisterdata } = require("../Controler/Admin/admin");
const firebaseUpload = require("../Controler/User/Uploads");
// const upload = require("../Controler/User/ProfileUpload");

const router = express.Router();

router.get("/registerUser", AuthenticUser, GetRegisterUserData);
router.post("/login",UserLoginMiddleWare, LoginUser);
router.get("/logout", UserLogOut);

router.post("/register", firebaseUpload.single("file"), UserRegisterMiddleWare, RegisterData);

router.get("/allStudent", AuthenticUser, GetAllUserData);
router.get("/profile", AuthenticUser, GetUserProfile);
router.get("/:id", AuthenticUser, GetUserProfileAndIssueBook);

router.get("/admin/:id", GetAdminData);
router.post("/admin/register", AdminRegisterdata);

// export the router
module.exports = router;
