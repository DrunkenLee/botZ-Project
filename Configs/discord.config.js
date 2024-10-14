require('dotenv').config()

const bot_token = process.env.bot_token

module.exports = {
  token: bot_token,
  prefix: '!',
};