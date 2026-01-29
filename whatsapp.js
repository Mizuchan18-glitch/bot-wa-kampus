const axios = require("axios");

const sendWhatsAppMessage = async (to, text) => {
  try {
    await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        text: { body: text }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (err) {
    console.error("Gagal kirim WA:", err.response?.data || err.message);
  }
};

module.exports = { sendWhatsAppMessage };
