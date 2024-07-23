import nodemailer from 'nodemailer';

export async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: 'no-reply@yourapp.com',
    to,
    subject,
    text,
  });
}
