const { program } = require("commander");

const { sendMessage, sendPhoto } = require("./actions");

program.version("1.0.0").description("CLI: TELEGRAM CONSOLE SENDER");

const commands = [
  {
    cmd: "send-message <message>",
    description: "Send a message to the Telegram bot",
    action: sendMessage,
  },
  {
    cmd: "send-photo <path>",
    description: "Send a photo to the Telegram bot",
    action: sendPhoto,
  },
];

commands.forEach(({ cmd, description, action }) => {
  program.command(cmd).description(description).action(action);
});

program.parse(process.argv);
