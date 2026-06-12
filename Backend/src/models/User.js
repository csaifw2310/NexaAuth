const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      default: null
    },

    provider: {
      type: String,
      enum: ["local", "google", "github"],
      default: "local"
    },

    providerId: {
      type: String,
      default: null
    },

    avatar: {
      type: String,
      default: null
    },

    isVerified: {
  type: Boolean,
  default: false
}, 

   verificationOTP: {
  type: String,
  default: null
},

verificationOTPExpires: {
  type: Date,
  default: null
},

otpAttempts: {
  type: Number,
  default: 0
},

lastOTPRequest: {
  type: Date,
  default: null
},
resetPasswordVerified: {
  type: Boolean,
  default: false
},
resetPasswordOTP: {
  type: String,
  default: null
},

resetPasswordOTPExpires: {
  type: Date,
  default: null
},

passwordResetAttempts: {
  type: Number,
  default: 0
}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);