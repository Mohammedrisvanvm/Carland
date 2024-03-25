"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailServiceConfirmBooking = void 0;
const config_1 = require("./config");
const mailServiceConfirmBooking = (email, name, bookingDetails) => {
    const mailOptions = {
        from: process.env.USER_NODEMAILER,
        to: email,
        subject: "bookingConfirmation",
        text: `Your bookingID :${bookingDetails._id}`,
        html: `
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Car Land</a>
          </div>
          <p style="font-size:1.1em">Hi ${name},</p>
    
    <p>Thank you for choosing Car Land. Your booking is confirmed.</p>
    <p>Booking Details:</p>
    <ul>
      <li>Payment Id: ${bookingDetails._id}</li>
      <li>Car Model: ${bookingDetails.vehicleName}</li>
      <li>Pick-up Date:  ${bookingDetails.bookingStartDate}</li>
      <li>Drop-off Date: ${bookingDetails.bookingEndDate}</li>
      <li >Price: ${bookingDetails.totalPrice}</li>
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
exports.mailServiceConfirmBooking = mailServiceConfirmBooking;
//# sourceMappingURL=confirmBooking.js.map