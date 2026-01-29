// const commands = {
//   menu: "👋 Halo! Selamat datang di Bot Informasi Kampus\n\n📌 Layanan:\n• .info\n• .jadwal\n• .kalender\n• .kontak\n• .help",
//   info: "🏫 Informasi Kampus\nNama: Universitas Contoh\nJam Layanan: 08.00–16.00",
//   jadwal: "🗓️ Jadwal Akademik\nKRS, UTS, UAS",
//   kalender: "📆 Kalender Akademik",
//   kontak: "☎️ Kontak Kampus",
//   help: "🆘 Ketik perintah dengan titik, contoh: .menu"
// };

// function getReply(command) {
//   return (
//     commands[command] ||
//     "❌ Perintah tidak dikenali.\nKetik *.menu*."
//   );
// }

// module.exports = { getReply };


// Menangani endpoint webhook WhatsApp
function getReply(command, args = []) {
  switch (command) {
    case "menu":
      return "📌 Menu:\n• .info\n• .jadwal uts\n• .jadwal uas\n• .kontak akademik";

    case "jadwal":
      if (args[0] === "uts") {
        return "📝 Jadwal UTS: 18–23 Maret";
      }
      if (args[0] === "uas") {
        return "📝 Jadwal UAS: 10–15 Juni";
      }
      return "🗓️ Jadwal Akademik:\n• .jadwal uts\n• .jadwal uas";

    case "kontak":
      if (args[0] === "akademik") {
        return "📧 Akademik: akademik@kampus.ac.id";
      }
      return "☎️ Kontak:\n• .kontak akademik\n• .kontak baak";

    case "help":
      return "🆘 Gunakan format:\n.command [opsional]";

    default:
      return "❌ Perintah tidak dikenali.\nKetik *.menu*";
  }
}

module.exports = { getReply };
