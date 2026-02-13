import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';

export const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'DevDojo',
      link: 'https://devdojo.com',
    },
  });

  const emailBody = mailGenerator.generate(options.mailGenContent);

  const emailText = mailGenerator.generatePlaintext(options.mailGenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAILTRAP_SENDERMAIL,
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
  }
};

export const mailVerificationMailGenContent = (username, verficationUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to DevDojo! We're very excited to have you on board. Start your coding journey today.",
      action: {
        instructions: 'To get started with DevDojo, please verify your email:',
        button: {
          color: '#22BC66', // Optional action button color
          text: 'Verify your email',
          link: verficationUrl,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };
};
