const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage(); // used to store file temporarily on our RAM

const upload = multer({ storage: storage });

module.exports = upload;
