const nodemailer = require("nodemailer");

const SendMail = async (to_email, text, html) => {
  const tranporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  await tranporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: to_email,
    subject: "Medicine Reminder !!",
    text,
    html,
  });
};

module.exports = SendMail;
