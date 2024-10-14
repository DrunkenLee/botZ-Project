// commands/register_zomboid.js

const { Op } = require('sequelize');
const { sequelize } = require('../Models');
const { Player } = require('../models');

module.exports = {
  name: 'register',
  description: 'Register a user with username, and steamID for Project Zomboid',
  async execute(message, args) {
    if (args.length < 2) {
      return message.reply('Please provide a username, and steamID. Usage: !register <username> <steamid>');
    }

    const [username, steamID] = args;

    try {
      const isSteamIDValid = await validateSteamID(steamID);
      if (!isSteamIDValid) {
        return message.reply('The provided SteamID is invalid.');
      }

      if (!username || username.length < 5 || !steamID)
        return message.reply('username min 5 character harus diisi, steamID harus diisi');

      const payload = {
        username,
        steamID
      };

      createPayer(payload)
        .then((result) => {
          const {error, description} = result;
          if (error) throw new Error(description);
          message.reply(`User ${username} has been registered successfully with SteamID ${steamID} for Project Zomboid.`);
        })
        .catch((err) => {
          console.log({ err });
          return message.reply(err.message || `Terjadi kendala pada saat proses registrasi, harap hubungi admin discord.`);
        });

    } catch (error) {
      console.error(error);
      message.reply('An error occurred during registration. Please try again later.');
    }
  },
};

async function validateSteamID(steamID) {
  return steamID.length === 17;
}

async function createPayer(payload) {
  const resp = {
    error: true,
    description: 'Terjadi Kendala',
  };
  try {
    const { username, steamID } = payload;
    console.log({payload});

    const where = {
      [Op.or] : {
        username,
        steam_id: steamID
      }
    };
    const playerInstance = await Player.findOne({ where });

    if (playerInstance) {
      resp.description = 'username atau steamID sudah terdaftar, 1 username = 1 steamID. hubungi @admin jika mengalami salah input data'
      return resp;
    }

    const result = await Player.create({
      username,
      steam_id: steamID,
      role: 'Player'
    });

    if (!result) return resp;

    resp.error = false
    resp.description = 'success create'
    return resp;

  } catch (error) {
    resp['metadata'] = error?.message || 'no metadata'
    return resp
  }

}
