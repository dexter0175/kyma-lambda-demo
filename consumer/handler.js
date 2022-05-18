const TelegramBot = require('node-telegram-bot-api');
const token = '5396955540:AAEOGjQkGQcguAI5Lx8t5AQf6DFAJkrBxdI';
const tgBot = new TelegramBot(token, {polling: true});

module.exports = {
  main: async function (event, context) {
    console.log(event);

    await tgBot.sendMessage(640902100, JSON.stringify({
      'ce-type': event['ce-type'],
      'ce-source': event['ce-source'],
      'ce-eventtypeversion': event['ce-eventtypeversion'],
      'ce-specversion': event['ce-specversion'],
      'ce-id': event['ce-id'],
      'ce-time': event['ce-time'],
    }, null, 2));

    return "Hello World from Kyma Serverless!";
  },
};
