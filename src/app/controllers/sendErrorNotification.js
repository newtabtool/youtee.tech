import { Telegraf } from 'telegraf';

async function sendErrorNotification(error) {
  const bot = new Telegraf(process.env.bot_token);
  const date = getDate();
  const message = `Novo erro em ${date}:\n\n${error}`;
  
  await bot.telegram.sendMessage('5258143401', message)
    .then(() => {
      if (bot.telegram.botInfo) {
        bot.stop();
      } else {
        console.log('Bot is not connected');
      }
    });
}

function getDate() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear().toString();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export default sendErrorNotification;
