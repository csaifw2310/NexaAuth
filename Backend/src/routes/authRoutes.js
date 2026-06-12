const express = require("express");

const { authLimiter} = require("../middleware/rateLimiter");
const protect = require("../middleware/authMiddleware");
const passport = require("passport");
const generateToken =
require("../utils/generateToken");
const {
  register,
  login,
  logout,
  getProfile,
 verifyOTP,
 resendOTP,
 forgotPassword,
 verifyResetOTP,
 resetPassword,
 changePassword
} = require("../controllers/authController");

const router = express.Router();

router.post("/register",authLimiter, register);
router.post("/login",authLimiter, login);
router.post("/logout", logout);
router.get("/profile",protect,getProfile);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp",authLimiter,resendOTP);
router.post( "/verify-reset-otp", verifyResetOTP);
router.post( "/forgot-password",authLimiter,forgotPassword);
router.post("/reset-password", authLimiter,resetPassword);
router.post("/change-password", protect,changePassword);

router.get(
  "/google",
  passport.authenticate(
    "google",
    {
      scope: ["profile", "email"],
      session: false
    }
  )
);

router.get(
  "/google/callback",

  passport.authenticate(
    "google",
    {
      session: false,
      failureRedirect: `${process.env.CLIENT_URL}/login`
    }
  ),

  async (req, res) => {
    const token =
      generateToken(
        req.user._id
      );

   res.cookie(
    "token",
        token,
        {
            httpOnly: true,
            secure: false, // localhost

            sameSite: "lax",

            maxAge:
            7 * 24 * 60 * 60 * 1000
        }
        );

    res.redirect(
      `${process.env.CLIENT_URL}/`
    );

  }

);

module.exports = router;