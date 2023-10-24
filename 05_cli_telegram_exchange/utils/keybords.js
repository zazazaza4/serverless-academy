const generateKeyboard = (buttons) => ({
  reply_markup: {
    keyboard: buttons.map((button) =>
      Array.isArray(button) ? button : [button]
    ),
  },
});

module.exports = { generateKeyboard };
