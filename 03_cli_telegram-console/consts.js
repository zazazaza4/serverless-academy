const TelegramBot = require("node-telegram-bot-api");

const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

const bot = new TelegramBot(botToken, { polling: true });

module.exports = { botToken, chatId, bot };
