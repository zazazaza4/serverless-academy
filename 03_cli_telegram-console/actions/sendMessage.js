const { chatId, bot } = require("../consts");

const sendMessage = (message) => {
  bot
    .sendMessage(chatId, message)
    .catch(() => {
      console.error("Error sending message");
    })
    .finally(() => {
      process.exit(0);
    });
};

module.exports = {
  sendMessage,
};
