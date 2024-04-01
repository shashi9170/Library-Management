const express = require("express");
const {
  IssueBookToUser,
  ReturnBookUser,
  GetAllBookUserData,
} = require("../Controler/Issue/issue");
const { IssueBookMiddleWare } = require("../Middlewares/Issue/issue");

const router = express.Router();

router.post("/issuebook",IssueBookMiddleWare, IssueBookToUser);

router.post("/return", ReturnBookUser);

router.get("/issueAllbook/:id", GetAllBookUserData);

module.exports = router;
