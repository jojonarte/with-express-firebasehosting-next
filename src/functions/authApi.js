const express = require("express");
const router = express.Router();

// JUST FOR DEMO DONT FOLLOW
let user = null;

router.post("/login", (req, res, next) => {
  user = req.body;

  res
    .status(200)
    .cookie("token", "dummycookie")
    .json({ success: true, data: user });
});

router.get("/logout", (req, res, next) => {
  res
    .status(200)
    .clearCookie("token")
    .json({
      success: true,
      data: null,
    });
});

// GETTING CURRENT USER
router.get("/me", (req, res) => {
  if (typeof req.cookies.token === "undefined" || !req.cookies.token) {
    return res.status(403).json({
      success: false,
      message: "Not logged in",
      data: null,
    });
  }
  res.status(200).json({
    success: true,
    data: {},
  });
});

module.exports = router;
