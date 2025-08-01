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
        user: 'connectteamskilllink@gmail.com',      
        pass: 'zffl juwe kjjn zicz',        
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

module.exports = { sendProviderMessage };
