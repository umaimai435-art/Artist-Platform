const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");

router.post("/", reviewController.addReview);
// router.get("/", reviewController.getReviews);
router.get("/", reviewController.getReviews)

module.exports = router;