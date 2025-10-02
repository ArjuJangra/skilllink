// backend/test-email.js
require('dotenv').config();
const sendEmail = require('./utils/mailer');

async function testEmail() {
  try {
    await sendEmail({
      to: 'parveendhillo08@gmail.com',
      subject: 'Test Email from SkillLink',
      text: 'This is a test email to check your credentials.',
    });
    console.log('✅ Email sent successfully');
  } catch (err) {
    console.error('❌ Email failed', err);
  }
}

testEmail();
