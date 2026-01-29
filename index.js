// const express = require("express");
// const dotenv = require("dotenv");
// const axios = require("axios");

// dotenv.config();

// const app = express();
// app.use(express.json());

// // =====================
// // WEBHOOK VERIFICATION
// // =====================
// app.get("/webhook", (req, res) => {
//   const mode = req.query["hub.mode"];
//   const token = req.query["hub.verify_token"];
//   const challenge = req.query["hub.challenge"];

//   if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
//     console.log("✅ Webhook verified");
//     return res.status(200).send(challenge);
//   }

//   return res.sendStatus(403);
// });

// // =====================
// // RECEIVE MESSAGE
// // =====================
// app.post("/webhook", async (req, res) => {
//   try {
//     const message =
//       req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

//     if (!message) {
//       return res.sendStatus(200);
//     }

//     const from = message.from;
//     const text = message.text?.body?.toLowerCase().trim().replace(/^\./, ""); // hapus titik di depan kalau ada

//     const responses = {
//       "menu": 
// `📌 Menu Bot Kampus:
// 1️⃣ jadwal
// 2️⃣ kalender
// 3️⃣ krs
// 4️⃣ cuti
// 5️⃣ kontak
// 6️⃣ jam`,

//       "jadwal": "📅 Jadwal perkuliahan dapat dilihat di portal akademik.",
//       "kalender": "🗓️ Kalender akademik tersedia di website kampus.",
//       "krs": "📝 KRS dilakukan melalui sistem akademik.",
//       "cuti": "📌 Cuti akademik diajukan ke BAAK dengan persetujuan dosen wali.",
//       "kontak": "☎️ akademik@kampus.ac.id",
//       "jam": "⏰ Jam layanan: Senin–Jumat, 08.00–15.00"
//     };

//     const reply =
//       responses[text] ||
//       "❌ Perintah tidak dikenali.\nKetik *.menu* untuk melihat layanan.";

//     await sendWhatsAppMessage(from, reply);

//     res.sendStatus(200);
//   } catch (err) {
//     console.error("Webhook error:", err);
//     res.sendStatus(500);
//   }
// });

// // =====================
// // SEND WHATSAPP MESSAGE
// // =====================
// const sendWhatsAppMessage = async (to, text) => {
//   try {
//     await axios.post(
//       `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
//       {
//         messaging_product: "whatsapp",
//         to,
//         text: { body: text }
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );
//   } catch (err) {
//     console.error(
//       "Gagal kirim WA:",
//       err.response?.data || err.message
//     );
//   }
// };

// // =====================
// app.listen(process.env.PORT || 3000, () => {
//   console.log("Bot Kampus jalan 🚀");
// });


// ------------------------------------------------------------------------

const express = require("express");
require("dotenv").config();

const webhookRoute = require("./routes/webhook");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bot Kampus aktif 🚀");
});

// Menangani endpoint webhook WhatsApp
app.use("/webhook", webhookRoute);


app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err.stack); // Menangani endpoint webhook WhatsApp
  res.status(500).send("Internal Server Error"); 
});


// app.listen(PORT, () => {
//   console.log(`Server berjalan di http://localhost:${PORT}`);
// });

app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 Bot Kampus Aktif");
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log("=================================");
});


// ------------------------------------------------------------------------

// // import express from "express";
// // import dotenv from "dotenv";

// const { sendWhatsAppMessage } = require("./whatsapp");

// require("dotenv").config();
// const express = require("express");

// const app = express();
// const PORT = process.env.PORT || 3000;
// const token = process.env.KAMPUS_BOT_TOKEN;
// // console.log("TOKEN:", token);

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Server bot kampus aktif 🚀");
// });



// // 🔐 Verifikasi Webhook dari Meta
// app.get("/webhook", (req, res) => {
//   const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN; // bebas, asal sama dengan di Meta

//   const mode = req.query["hub.mode"];
//   const token = req.query["hub.verify_token"];
//   const challenge = req.query["hub.challenge"];

//   if (mode === "subscribe" && token === process.env.WEBHOOK_VERIFY_TOKEN) {
//     console.log("✅ Webhook terverifikasi");
//     res.status(200).send(challenge);
//   } else {
//     res.sendStatus(403);
//   }
// });


// app.get("/webhook", (req, res) => {
//   const mode = req.query["hub.mode"];
//   const token = req.query["hub.verify_token"];
//   const challenge = req.query["hub.challenge"];

//   if (mode === "subscribe" && token === process.env.WEBHOOK_VERIFY_TOKEN) {
//     console.log("Webhook verified");
//     res.status(200).send(challenge);
//   } else {
//     res.sendStatus(403);
//   }
// });


// app.post("/webhook", async (req, res) => {
//   try {
//     const message =
//       req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

//     if (!message) {
//       return res.sendStatus(200);
//     }

//     const from = message.from;
//     const text = message.text?.body?.toLowerCase().trim();

//     const responses = {
//       "menu": 
// `📌 Menu Bot Kampus:
// 1️⃣ jadwal
// 2️⃣ kalender
// 3️⃣ krs
// 4️⃣ cuti
// 5️⃣ kontak
// 6️⃣ jam`,
//       "jadwal": "📅 Jadwal perkuliahan dapat dilihat di portal akademik.",
//       "kalender": "🗓️ Kalender akademik tersedia di website kampus.",
//       "krs": "📝 KRS dilakukan melalui sistem akademik.",
//       "cuti": "📌 Syarat cuti: mahasiswa aktif & ajukan ke BAAK.",
//       "kontak": "☎️ akademik@kampus.ac.id",
//       "jam": "⏰ Senin–Jumat, 08.00–15.00"
//     };

//     const reply =
//       responses[text] ||
//       "❌ Perintah tidak dikenali.\nKetik *menu*.";

//     await sendWhatsAppMessage(from, reply);

//     res.sendStatus(200);
//   } catch (err) {
//     console.error(err);
//     res.sendStatus(500);
//   }
// });


// const sendWhatsAppMessage = async (to, text) => {
//   await axios.post(
//     `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
//     {
//       messaging_product: "whatsapp",
//       to,
//       text: { body: text }
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
//         "Content-Type": "application/json"
//       }
//     }
//   );
// };

// app.post("/webhook", (req, res) => {
//   console.log(JSON.stringify(req.body, null, 2));
//   res.sendStatus(200);
// });


// app.listen(process.env.PORT, () => {
//   console.log(`Server berjalan di http://localhost:${PORT}`);
// });


// ------------------------------------------------------------------------


// import express from "express";
// import dotenv from "dotenv";
// import axios from "axios";

// dotenv.config();
// const app = express();
// app.use(express.json());

// app.get("/webhook", (req, res) => {
//   const mode = req.query["hub.mode"];
//   const token = req.query["hub.verify_token"];
//   const challenge = req.query["hub.challenge"];

//   if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
//     return res.status(200).send(challenge);
//   }
//   return res.sendStatus(403);
// });


// app.post("/webhook", async (req, res) => {
//   try {
//     const message =
//       req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

//     if (!message) {
//       return res.sendStatus(200);
//     }
//     const from = message.from;
//     const text = message.text?.body?.toLowerCase().trim();

//     const responses = {
//   "menu": "...",
//   "jadwal": "...",
//   "kalender": "...",
//   "krs": "...",
//   "cuti": "...",
//   "kontak": "...",
//   "jam": "..."
// };

// const reply =
//   responses[text] ||
//   "❌ Perintah tidak dikenali.\nKetik *menu*.";

//   await sendWhatsAppMessage(from, reply);
//   res.sendStatus(200);

//   // } catch (err) {
//   //   console.error(err);
//   //   res.sendStatus(500);
//   // }
// });

// const sendWhatsAppMessage = async (to, text) => {
//   await axios.post(
//     `https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER_ID}/messages`,
//     {
//       messaging_product: "whatsapp",
//       to,
//       text: { body: text }
//     },
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
//         "Content-Type": "application/json"
//       }
//     }
//   );
// };

