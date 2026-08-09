const express = require("express");
const { protect,admin } = require("../middlewares/authMiddleware");
const { getAdminStats } = require("../controllers/analyticsController");

const router = express.Router();

router.get("/", protect, admin, getAdminStats);

module.exports = router;
