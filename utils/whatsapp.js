const axios = require('axios');

// Function to send a WhatsApp message
const sendWhatsAppMessage = async (to, message) => {
  try {
    const response = await axios.post(
      'https://graph.facebook.com/v18.0/messages',
      {
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        },
      }
    );
    console.log('WhatsApp message sent:', response.data);
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error.message);
  }
};

module.exports = sendWhatsAppMessage;