const { chatId, bot } = require("../consts");

process.env["NTBA_FIX_350"] = 1;

const sendPhoto = (path) => {
  console.log(path);
  bot
    .sendPhoto(chatId, path, {}, { contentType: "image/svg+xml" })
    .catch(() => {
      console.error("Error sending photo");
    })
    .finally(() => {
      process.exit(0);
    });
};

module.exports = {
  sendPhoto,
};
