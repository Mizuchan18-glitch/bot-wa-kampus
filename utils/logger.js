const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "../logs/bot.log");

function writeLog(message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}\n`;

  fs.appendFile(logFile, line, (err) => {
    if (err) console.error("❌ Gagal menulis log:", err.message);
  });
}

module.exports = { writeLog };
