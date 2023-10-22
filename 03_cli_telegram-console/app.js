const { program } = require("commander");

const { sendMessage, sendPhoto } = require("./actions");

program.version("1.0.0").description("CLI: TELEGRAM CONSOLE SENDER");

const commands = [
  {
    cmd: "send-message <message>",
    alias: "m",
    description: "Send a message to the Telegram bot",
    action: sendMessage,
  },
  {
    cmd: "send-photo <path>",
    alias: "p",
    description: "Send a photo to the Telegram bot",
    action: sendPhoto,
  },
];

commands.forEach(({ cmd, description, alias, action }) => {
  program.command(cmd).alias(alias).description(description).action(action);
});

program.parse(process.argv);
