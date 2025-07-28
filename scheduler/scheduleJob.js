const cron = require("node-cron");
const sendNews = require("../bot/sendNews");

function scheduleWeeklyJob() {
  cron.schedule("* * * * *", () => {
    console.log(
      "[scheduler] Menjalankan pengiriman berita (testing tiap menit)..."
    );
    sendNews();
  });
}

module.exports = scheduleWeeklyJob;
