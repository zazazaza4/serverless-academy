const { bot } = require("./consts");

const startBot = () => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;

    console.log(`User ${firstName} (Chat ID: ${chatId}) initiated a chat.`);
  });

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    console.log(`Received a message from Chat ID: ${chatId}`);
  });

  console.log("Your Telegram bot is up and running.");
};

startBot();
