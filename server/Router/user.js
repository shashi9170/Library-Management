const express = require("express");

// import the all file from controller
const {
  RegisterData,
  GetAllUserData,
  GetUserProfile,
  LoginUser,
  UsetLoginDataForAuth,
  GetRegisterUserData,
  UserLogOut,
} = require("../Controler/User/user");

const { GetAdminData, AdminRegisterdata } = require("../Controler/Admin/admin");

const upload = require("../Controler/User/ProfileUpload");

const router = express.Router();

router.get("/registerUser", GetRegisterUserData);
router.post("/login", LoginUser);
router.get("/logout", UserLogOut);
router.get("/auth/:id/:email", UsetLoginDataForAuth);

router.post("/register", upload.single("file"), RegisterData);

router.get("/allStudent", GetAllUserData);
router.get("/profile", GetUserProfile);

router.get("/admin/:id", GetAdminData);
router.post("/admin/register", AdminRegisterdata);

// export the router
module.exports = router;
