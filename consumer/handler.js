const TelegramBot = require('node-telegram-bot-api');
const token = '5396955540:AAEOGjQkGQcguAI5Lx8t5AQf6DFAJkrBxdI';

module.exports = {
  main: async function (event, context) {
    console.log(event);
    const tgBot = new TelegramBot(token, {polling: true});

    await tgBot.sendMessage(640902100, JSON.stringify(event, null, 2));

    return "Hello World from Kyma Serverless!";
  },
};
