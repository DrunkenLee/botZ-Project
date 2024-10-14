require('dotenv').config()
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const express = require('express');
const config = require('././Configs/discord.config');  // Load the config file
const APP_PORT = process.env.APP_PORT
const app = express();

// Initialize the Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = new Collection();

// Load command files
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`././commands/${file}`);
    client.commands.set(command.name, command);
}
// Load event files
const eventFiles = fs.readdirSync(path.join(__dirname, 'events')).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`././events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// Express server setup (optional)
app.get('/', (req, res) => {
  res.send('Bot is running');
});

app.listen(APP_PORT, () => {
  console.log('Express server is running on port 3000');
});

// Discord bot login
client.login(config.token);