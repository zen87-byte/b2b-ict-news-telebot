const TelegramBot = require('node-telegram-bot-api');
const fetchAllNews = require('../services/fetchNews');
const { BOT_TOKEN, CHAT_ID } = require('../config');

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

async function sendNews() {
  const newsList = await fetchAllNews();
  if (!newsList.length) {
    console.log('[sendNews] Tidak ada berita ditemukan');
    return;
  }

  let message = '*Berita B2B ICT Terbaru:*\n\n';

  newsList.forEach((news, index) => {
    message += `📰 *${index + 1}. ${news.title}*\n🔗 ${news.link}\n\n`;
  });

  try {
    await bot.sendMessage(CHAT_ID, message, { parse_mode: 'Markdown' });
    console.log('[sendNews] Semua berita berhasil dikirim dalam satu pesan.');
  } catch (err) {
    console.error('[sendNews] Gagal kirim pesan gabungan:', err.message);
  }
}

module.exports = sendNews;
