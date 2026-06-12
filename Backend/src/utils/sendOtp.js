const transporter = require("../services/emailService");

exports.sendOTP =
async (
  email,
  otp,
  subject
) => {
 
  await transporter.sendMail({
    from: process.env.EMAIL_USER,

    to: email,

    subject,

    html: `
      <h2>${subject}</h2>

      <h1>${otp}</h1>

      <p>Expires in 10 minutes</p>
    `
  });

};