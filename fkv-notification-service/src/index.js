const nodemailer = require('nodemailer');
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendWelcomeEmail(toEmail) {
  try {
    await transporter.sendMail({
      from: `"FKV-TEST" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: 'Письмо продактам',
      text: `ЗАГЛУШКА`,
    });
    console.log(`[LOG]: Email sent to ${toEmail}`);
    return true;
  } catch (error) {
    console.error('[ERROR]: Failed to send email:', error);
    return false;
  }
}

app.post('/send-welcome-email', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const result = await sendWelcomeEmail(email);
    
    if (result) {
      res.status(200).json({ message: `Welcome email sent to ${email}` });
    } else {
      res.status(500).json({ error: 'Failed to send email' });
    }
  } catch (error) {
    console.error('[ERROR]:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[LOG]: Notification Service running on port ${PORT}`);
});
