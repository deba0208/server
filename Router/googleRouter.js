const express = require("express");
const router = express.Router();
const passport = require("passport");

// Route to initiate Google authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route for Google to redirect to
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to your desired route
    res.redirect("/profile");
  }
);

module.exports = router;
