const TelegramBot = require("node-telegram-bot-api");

const { botToken, city, COMMANDS } = require("./consts");
const weatherService = require("./services/weather.service");

const startBot = () => {
  const bot = new TelegramBot(botToken, { polling: true });

  bot.onText(COMMANDS.START, (msg) => {
    const chatId = msg.chat.id;
    const text = "Welcome to the Weather Forecast Bot!";

    const keyboard = {
      reply_markup: {
        keyboard: [[COMMANDS.FORECAST]],
      },
    };

    bot.sendMessage(chatId, text, keyboard);
  });

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    if (messageText === COMMANDS.FORECAST) {
      const text = "Select the forecast interval:";
      const keyboard = {
        reply_markup: {
          keyboard: [[COMMANDS.INTERVAL_3, COMMANDS.INTERVAL_6]],
        },
      };

      bot.sendMessage(chatId, text, keyboard);
    }

    if (messageText === COMMANDS.INTERVAL_3) {
      const weather = await weatherService.getForecast(city, 3);
      bot.sendMessage(chatId, weather);
    }

    if (messageText === COMMANDS.INTERVAL_6) {
      const weather = await weatherService.getForecast(city, 6);
      bot.sendMessage(chatId, weather);
    }
  });
};

startBot();
