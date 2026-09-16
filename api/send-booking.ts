import sgMail from '@sendgrid/mail';

export default async function handler(req: any, res: any) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { name, email, topic, selectedTime, message } = req.body || {};

  const apiKey = process.env.SENDGRID_API_KEY;
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'mdyasinarafath20@gmail.com';

  if (!apiKey) {
    console.warn('SENDGRID_API_KEY environment variable not configured. Booking saved without email.');
    return res.status(200).json({
      success: true,
      message: 'Booking received and stored in database.',
    });
  }

  try {
    sgMail.setApiKey(apiKey);
    await sgMail.send({
      from: process.env.VERIFIED_SENDER_EMAIL || 'infokarimganj@gmail.com',
      replyTo: email,
      to: notificationEmail,
      subject: `New Portfolio Booking Request: ${name}`,
      text: `
        New Booking Request Received:
        -----------------------------
        Name: ${name}
        Email: ${email}
        Topic: ${topic || 'General Inquiry'}
        Time Slot: ${selectedTime || 'Flexible'}
        Message: ${message || 'No additional message.'}
      `,
    });
    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('SendGrid dispatch error:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Failed to dispatch email' });
  }
}
