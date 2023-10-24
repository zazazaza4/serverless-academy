const TelegramBot = require("node-telegram-bot-api");

const {
  botToken,
  city,
  COMMANDS,
  intervalEnum,
  currencyEnum,
} = require("./consts");
const currencyService = require("./services/currency.service");
const weatherService = require("./services/weather.service");
const { generateKeyboard } = require("./utils/keybords");

const startBot = () => {
  const bot = new TelegramBot(botToken, { polling: true });

  bot.onText(COMMANDS.START, (msg) => {
    const chatId = msg.chat.id;
    const text = `Вітаю, тут ви отримаєте детальну інформацію про валюту та погоду в місті ${city}`;

    const keyboard = generateKeyboard([COMMANDS.WEATHER, COMMANDS.CURRENCY]);

    bot.sendMessage(chatId, text, keyboard);
  });

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    switch (messageText) {
      case COMMANDS.WEATHER:
        const weatherText =
          "Виберіть інтервал оновлення погоди або швидкість вітру:";
        const weatherKeyboard = generateKeyboard([
          [COMMANDS.INTERVAL_3, COMMANDS.INTERVAL_6],
          COMMANDS.WIND,
          COMMANDS.PREVIOUS,
        ]);
        await bot.sendMessage(chatId, weatherText, weatherKeyboard);
        break;

      case COMMANDS.CURRENCY:
        const currencyText =
          "Виберіть валюту для отримання інформації про її вартість: ";
        const currencyKeyboard = generateKeyboard([
          [COMMANDS.USDT, COMMANDS.EUR],
          COMMANDS.PREVIOUS,
        ]);
        await bot.sendMessage(chatId, currencyText, currencyKeyboard);
        break;

      case COMMANDS.INTERVAL_3:
        const weather3 = await weatherService.getForecast(
          city,
          intervalEnum.INTERVAL_3
        );
        await bot.sendMessage(chatId, weather3);
        break;

      case COMMANDS.INTERVAL_6:
        const weather6 = await weatherService.getForecast(
          city,
          intervalEnum.INTERVAL_6
        );
        await bot.sendMessage(chatId, weather6);
        break;

      case COMMANDS.WIND:
        const windInfo = await weatherService.getWindInfo(city);
        await bot.sendMessage(chatId, windInfo);
        break;

      case COMMANDS.EUR:
        const currencyEUR = await currencyService.getCurrency(currencyEnum.EUR);
        await bot.sendMessage(chatId, currencyEUR);
        break;

      case COMMANDS.USDT:
        const currencyUSDT = await currencyService.getCurrency(
          currencyEnum.USDT
        );
        await bot.sendMessage(chatId, currencyUSDT);
        break;

      case COMMANDS.PREVIOUS:
        const text = "Повернення до головного меню.";
        const previousKeyboard = generateKeyboard([
          COMMANDS.WEATHER,
          COMMANDS.CURRENCY,
        ]);
        await bot.sendMessage(chatId, text, previousKeyboard);
        break;

      default:
        break;
    }
  });
};

startBot();
