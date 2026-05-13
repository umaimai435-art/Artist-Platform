const express = require("express");
const router = express.Router();

const { loginAdmin } = require("../controller/adminController");

router.post("/adminLogin", loginAdmin);

module.exports = router;
