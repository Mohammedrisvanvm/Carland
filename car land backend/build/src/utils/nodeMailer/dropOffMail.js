"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailServiceDropOff = void 0;
const config_1 = require("./config");
const mailServiceDropOff = (email, name, bookingDetails) => {
    const mailOptions = {
        from: process.env.USER_NODEMAILER,
        to: email,
        subject: "Take Of Vehicle",
        text: `Your bookingID :${bookingDetails._id}`,
        html: `
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Car Land</a>
          </div>
          <p style="font-size:1.1em">Hi ${name},</p>
    
    <p>Thank you for choosing Car Land. <span style="font-size:1.4em;color:#04c72e; p-2"> Your order is completed </span></p>
    <p>Booking Details:</p>
    <ul>
   
      <li>Car Model: ${bookingDetails.vehicleName}</li>
      <li>Hub Name: ${bookingDetails.hubName}</li>
      <li>Location: ${bookingDetails.locationName}</li>
    </ul>
    <p>We look forward to serving you.</p>
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
exports.mailServiceDropOff = mailServiceDropOff;
//# sourceMappingURL=dropOffMail.js.map