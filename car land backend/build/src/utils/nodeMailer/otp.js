"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailServiceOtp = void 0;
const config_1 = require("./config");
const MailServiceOtp = (email, otp) => {
    const mailOptions = {
        from: process.env.USER_NODEMAILER,
        to: email,
        subject: "OTP",
        text: `Your otp :${otp}`,
        html: `
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Car Land</a>
        </div>
        <p style="font-size:1.1em">Hi ${email},</p>
        <p>Thank you for choosing Car Land. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />Car Land</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Car Land</p>
        </div>`,
    };
    config_1.transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log("Failed to generate otp");
        }
        else {
            console.log("Email sent successfully");
        }
    });
};
exports.MailServiceOtp = MailServiceOtp;
//# sourceMappingURL=otp.js.map