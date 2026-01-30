// const express = require("express");
// const { parseCommand } = require("../utils/textParser");
// const { getReply } = require("../services/commandService");

// const router = express.Router();

// router.post("/", (req, res) => {
//   const text = req.body?.text || "";
//   const command = parseCommand(text);
//   const reply = getReply(command);

//   res.json({ reply });
// });

// module.exports = router;


// const express = require("express");
// const { parseInput } = require("../utils/textParser");
// const { getReply } = require("../services/commandService");

// const router = express.Router();

// router.post("/", (req, res) => {
//   const text = req.body?.text || "";
//   const { command, args } = parseInput(text);

//   const reply = getReply(command, args);
//   res.json({ reply });
// });

// module.exports = router;


// const express = require("express");
// const { parseInput } = require("../utils/textParser");
// const { getReply } = require("../services/commandService");

// const router = express.Router();

// router.post("/", (req, res) => {
//   try {
//     const timestamp = new Date().toISOString();
//     const text = req.body?.text || "";

//     console.log(`[${timestamp}] 📩 Incoming message:`, text);

//     const { command, args } = parseInput(text);
//     console.log(`➡️ Parsed command:`, command, args);

//     const reply = getReply(command, args);
//     console.log(`⬅️ Reply sent:` , reply);

//     res.json({ reply });

//   } catch (error) {
//     console.error("🔥 Error di webhook:", error.message);

//     res.status(500).json({
//       reply: "⚠️ Terjadi kesalahan sistem. Silakan coba lagi."
//     });
//   }
// });

// module.exports = router;



// const express = require("express");
// const { parseInput } = require("../utils/textParser");
// const { getReply } = require("../services/commandService");
// const { writeLog } = require("../utils/logger");

// const router = express.Router();

// router.post("/", (req, res) => { // Menangani endpoint webhook WhatsApp
//   try {
//     const text = req.body?.text || "";
//     const { command, args } = parseInput(text);

//     writeLog(`IN  | ${text}`);
//     writeLog(`CMD | ${command} ${args.join(" ")}`);

//     const reply = getReply(command, args);

//     writeLog(`OUT | ${reply}`);

//     res.json({ reply });
//   } catch (err) {
//     writeLog(`ERR | ${err.message}`);
//     res.status(500).json({
//       reply: "⚠️ Terjadi kesalahan sistem."
//     });
//   }
// });

// module.exports = router;



// const express = require("express");
const axios = require("axios");
const { parseInput } = require("../utils/textParser");
const { getReply } = require("../services/commandService");
const { writeLog } = require("../utils/logger");

const dotenv = require("dotenv");
dotenv.config();

// const router = express.Router();
//application.use("/webhook", express.Router());

router.get("/", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  res.sendStatus(403);
});

router.post("/", async (req, res) => {
  console.log("Webhook HIT");
  console.log("RAW BODY:", JSON.stringify(req.body, null, 2));
  try {
    const message =
      req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    // WA kirim event lain (status, dll)
    if (!message || message.type !== "text") {
      return res.sendStatus(200);
    }

    const from = message.from;
    const text = message.text.body;

    writeLog(`IN  | ${from} | ${text}`);

    const { command, args } = parseInput(text);
    const reply = getReply(command, args);

    await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.WA_PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: from,
        text: { body: reply }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WA_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    writeLog(`OUT | ${from} | ${reply}`);
    res.sendStatus(200);

    const value = req.body.entry?.[0]?.changes?.[0]?.value;
    if (!value || !value.messages) {
      return res.sendStatus(200);
    }

    const receivedMessage = value.messages[0];


  } catch (err) {
    writeLog(`ERR | ${err.message}`);
    res.sendStatus(200);
  }
});

module.exports = router;
