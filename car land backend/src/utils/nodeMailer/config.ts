import nodemailer from "nodemailer";
export const transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_NODEMAILER,
      pass: process.env.API_KEY_NODEMAILER,
    },
  });
  