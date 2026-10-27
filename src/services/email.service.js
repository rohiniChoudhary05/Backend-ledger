const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    //  console.log("1. sendEmail function called");
    // console.log("2. Receiver:", to);
    // const info = await transporter.sendMail({
    //   from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
    //   to, // list of receivers
    //   subject, // Subject line
    //   text, // plain text body
    //   html, // html body
    // });

    // console.log('Message sent: %s', info.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    const info = await transporter.sendMail({
    from: `"Backend Ledger" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });

console.log("Accepted:", info.accepted);
console.log("Rejected:", info.rejected);
console.log("Response:", info.response);
console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


async function sendRegistrationEmail(userEmail , name) {
  const subject = 'Welcome to backend ledger!';
  const text = `Hello ${name},\n\n Thank you for registering at backend ledger. we're 
  excited to have you on board!\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hello ${name},</p> <p>Thank you for registering at backend ledger . We're excited to have you on Board!
  </p><p>Best regards , <br> The Backend ledger Team</p>` ;
  

  await sendEmail(userEmail , subject, text, html)
  
}
module.exports = {
  sendRegistrationEmail
};