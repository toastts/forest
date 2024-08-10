import { Resend } from 'resend';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { EmailTemplate } from '@/components/emails/welcome'; // Adjust the import according to your project's structure
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendMail(toEmail: string, firstName: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Forest <email@bombing.yachts>', // Sender address
      to: [toEmail], // List of receivers
      subject: 'Welcome to Forest!',
      react: EmailTemplate({ firstName }) as React.ReactElement,
    });

    if (error) {
      console.error('Error sending email:', error);
      return;
    }

    console.log('Email sent successfully:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Send the email to a specific address
sendMail('probablyharis@gmail.com', 'Haris').catch(console.error);
