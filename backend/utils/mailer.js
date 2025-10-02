// utils/mailer.js
require('dotenv').config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail', // or any email service you use
  auth: {
     user: process.env.EMAIL_USER,       // your email
     pass: process.env.EMAIL_PASS     // app password for Gmail or real password
  }
});

const sendEmail = async ({ to, subject, text, attachments }) => {
  const mailOptions = {
    from: `"SkillLink Admin" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    attachments
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
