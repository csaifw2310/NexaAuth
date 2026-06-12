const User = require("../models/User");
const bcrypt = require("bcryptjs");
 

const { isValidEmail } = require("../utils/validators");
const generateToken = require("../utils/generateToken");
const transporter = require("../services/emailService");
const { generateOTP } = require("../utils/otp");

const { sendOTP } = require("../utils/sendOTP");

// =====================================================
// REGISTER
// =====================================================

exports.register = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

   const otp = generateOTP();

   const hashedOTP =await bcrypt.hash(  otp, 10)
   ;
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: "local",
      isVerified: false,
      verificationOTP:hashedOTP,
        verificationOTPExpires:
        Date.now() + 10 * 60 * 1000
    });
        await sendOTP(
        user.email,
        otp,
        "Verify Your Account"
        );

    res.status(201).json({
      success: true,
      message:
        "Registration successful. Please verify your email.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }
};

// =====================================================
// LOGIN
// =====================================================

exports.login = async (req, res) => {
  try {

    const email =
      req.body.email?.trim().toLowerCase();

    const password =
      req.body.password?.trim();

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required"
      });
    }

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    if (!user.password) {
      return res.status(400).json({
        success: false,
        message:
          "Please login using your OAuth provider"
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message:
          "Please verify your email first"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token =
      generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge:
        7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }
};

// =====================================================
// LOGOUT
// =====================================================

exports.logout = async (req, res) => {

  req.logout?.(() => {});

  req.session?.destroy(() => {});

  res.clearCookie("token");
  res.clearCookie("connect.sid");

  res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });

};

// =====================================================
// PROFILE
// =====================================================

exports.getProfile = async (req, res) => {

  res.status(200).json({
    success: true,
    user: req.user
  });

};
 



// =============================================================================================================

exports.verifyOTP = async (
  req,
  res
) => {
  try {

    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message:
          "Email and OTP are required"
      });
    }

    
    const user =
      await User.findOne({
        email: email.toLowerCase()
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.otpAttempts >= 5) {

    return res.status(429).json({
        success: false,
        message:
        "Too many OTP attempts. Please request a new OTP."
    });

}

if (user.isVerified) {
  return res.status(400).json({
    success: false,
    message: "Email already verified"
  });
}

if (!user.verificationOTP) {
  return res.status(400).json({
    success: false,
    message:
      "No active OTP found. Please request a new OTP."
  });
}
   const isValidOTP =
  await bcrypt.compare(
    otp,
    user.verificationOTP
  );

    if (!isValidOTP) {

    user.otpAttempts += 1;

    await user.save();

    return res.status(400).json({
        success: false,
        message: "Invalid OTP"
    });

    }
    if (
      user.verificationOTPExpires <
      Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });
    }
    user.otpAttempts = 0;
    user.isVerified = true;

    user.verificationOTP = null;
    user.verificationOTPExpires = null;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Email verified successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Internal Server Error"
    });

  }
};

// ==================================================================
exports.resendOTP = async (
  req,
  res
) => {
  try {
const { email } = req.body;

    if (!email) {
    return res.status(400).json({
        success: false,
        message: "Email is required"
    });
    }

    const user = await User.findOne({
    email: email.toLowerCase()
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message:
          "Email already verified"
      });
    }
    const cooldown = 60 * 1000;
    if (
        user.lastOTPRequest &&
        Date.now() -
        user.lastOTPRequest.getTime()
        < cooldown
        ) {

        return res.status(429).json({
            success: false,
            message:
            "Please wait 60 seconds before requesting another OTP"
        });

    }

    const newOTP = generateOTP();

    const hashedOTP =
        await bcrypt.hash(
        newOTP,
        10
        );

        user.verificationOTP =
        hashedOTP;

    user.verificationOTPExpires =
      Date.now() +
      10 * 60 * 1000;


    user.lastOTPRequest = new Date();

    await user.save();

    await sendOTP(
        user.email,
        newOTP,
        "New Verification OTP"
        );

    res.status(200).json({
      success: true,
      message:
        "OTP sent successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Internal Server Error"
    });

  }
};


// ===============================================================\
exports.forgotPassword =
async (req, res) => {

  try {

    const email =
      req.body.email
      ?.trim()
      .toLowerCase();

    if (!email) {
      return res.status(400).json({
        success:false,
        message:"Email required"
      });
    }

    const user =
      await User.findOne({
        email
      });

    if (!user) {

      return res.status(200).json({
        success:true,
        message:
        "If the account exists, an OTP has been sent."
      });

    }

    const otp =
      generateOTP();

    const hashedOTP =
      await bcrypt.hash(
        otp,
        10
      );

    user.resetPasswordOTP = hashedOTP;
     
    user.resetPasswordVerified = false;

    user.resetPasswordOTPExpires =
      Date.now() +
      10 * 60 * 1000;

    await user.save();

    await sendOTP(
      email,
      otp,
      "Password Reset OTP"
    );

    res.status(200).json({
      success:true,
      message:
      "If the account exists, an OTP has been sent."
    });

  } catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:
      "Internal Server Error"
    });

  }

};

// =========================================================================

exports.verifyResetOTP = async (req, res) => {
  try {

    const email =
      req.body.email?.trim().toLowerCase();

    const otp =
      req.body.otp?.trim();

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid request"
      });
    }

    if (
      !user.resetPasswordOTP ||
      user.resetPasswordOTPExpires < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });
    }

    const isValidOTP =
      await bcrypt.compare(
        otp,
        user.resetPasswordOTP
      );

    if (!isValidOTP) {

      user.passwordResetAttempts += 1;

      await user.save();

      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    user.passwordResetAttempts = 0;

    user.resetPasswordVerified = true;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });

  }
};

// /==============================================================
exports.resetPassword = async (req, res) => {
  try {

    const email =
      req.body.email?.trim().toLowerCase();

     

    const newPassword =
      req.body.newPassword?.trim();

    if (!email || !newPassword ) {
      return res.status(400).json({
        success: false,
        message:
          "Email, OTP and new password are required"
      });
    }

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid request"
      });
    }
        if (
        !user.resetPasswordVerified
        ) {
        return res.status(400).json({
            success: false,
            message:
            "OTP verification required"
        });
        }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        12
      );

    user.password =
      hashedPassword;

        user.resetPasswordOTP = null;

        user.resetPasswordOTPExpires = null;

        user.passwordResetAttempts = 0;

        user.resetPasswordVerified = false;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password reset successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Internal Server Error"
    });

  }
};

// =======================================================================

exports.changePassword = async (
  req,
  res
) => {
  try {

    const {
      currentPassword,
      newPassword
    } = req.body;

    if (
      !currentPassword ||
      !newPassword
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required"
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters"
      });
    }

    const user =
      await User.findById(
        req.user._id
      );

    if (!user.password) {

        return res.status(400).json({
            success: false,
            message:
            "Password login not enabled for this account"
        });

}
    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Current password is incorrect"
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        12
      );

    user.password =
      hashedPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password changed successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Internal Server Error"
    });

  }
};