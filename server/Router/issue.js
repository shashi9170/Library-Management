const express = require("express");
const {
  IssueBookToUser,
  ReturnIssueBook,
  GetAllBookUserData,
} = require("../Controler/Issue/issue");
const {
  IssueBookMiddleWare,
  IssueBookOneUserMiddleWare,
} = require("../Middlewares/issue");

const { AuthenticUser } = require("../Middlewares/user");

const router = express.Router();

router.post("/issuebook", AuthenticUser, IssueBookMiddleWare, IssueBookToUser);

router.post("/return", AuthenticUser, ReturnIssueBook);

router.get(
  "/issueAllbook/:id",
  AuthenticUser,
  IssueBookOneUserMiddleWare,
  GetAllBookUserData
);

module.exports = router;
