const express = require("express");
const {AddYouTubeLink} = require("../Controler/URL/link");

const router = express.Router();

router.post("/link", AddYouTubeLink);

module.exports = router;