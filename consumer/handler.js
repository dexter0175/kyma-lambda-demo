const TelegramBot = require('node-telegram-bot-api');
const token = '5396955540:AAEOGjQkGQcguAI5Lx8t5AQf6DFAJkrBxdI';

module.exports = {
  main: function (event, context) {
    console.log(event);
    const tgBot = new TelegramBot(token, {polling: true});
    tgBot.sendMessage(640902100, event);

    return "Hello World from Kyma Serverless!";
  },
};
