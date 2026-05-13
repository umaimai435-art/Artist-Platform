const express = require("express");
const router = express.Router();
const artistController = require("../controller/artistController");

router.post("/", artistController.createProfile);
router.get("/", artistController.getArtists);

module.exports = router;