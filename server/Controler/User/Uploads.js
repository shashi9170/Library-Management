const multer = require('multer');
const { getStorage } = require("firebase/storage");

const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

module.exports = upload;