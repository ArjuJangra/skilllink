const nodemailer = require('nodemailer');

const sendProviderMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Setup transporter (use real credentials in production)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS        
      },
    });

    const mailOptions = {
      from: email,
      to: 'connectteamskilllink@gmail.com',           
      subject: `Provider Message from ${name}`,
      text: `
        You received a message from provider:
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

const sendUserMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'connectteamskilllink@gmail.com',
      subject: `User Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    });

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ message: 'Failed to send message.' });
  }
};

module.exports = {
  sendProviderMessage,
  sendUserMessage
};

