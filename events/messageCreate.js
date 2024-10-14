module.exports = {
  name: 'messageCreate',
  execute(message, client) {
    const { prefix } = require('../Configs/discord.config');

    // Determine if the message is from the bot (in-game chat) or a direct Discord user command
    const msgFromBot = message.author.bot;
    let args = [];
    let commandName = '';

    // Handle messages from the bot (in-game chat)
    if (msgFromBot) {
      // Split the message by ":" to capture username and command
      const messageParts = message?.content?.split(':');
      const username = messageParts[0]?.trim();  // Username from the in-game chat
      const commandWithPrefix = messageParts[1]?.trim();  // Command after the colon

      // Check if the command starts with the correct prefix
      if (commandWithPrefix && commandWithPrefix.startsWith(prefix)) {
        commandName = commandWithPrefix.split(' ')[0].slice(prefix.length).toLowerCase();  // Extract command name
        args = commandWithPrefix.split(' ').slice(1);  // Extract arguments
        console.log({ username, commandName, args });
      } else {
        return;  // If no valid command, exit
      }
    }
    // Handle messages directly from Discord users
    else if (!msgFromBot && message.content.startsWith(prefix)) {
      args = message.content.slice(prefix.length).trim().split(/ +/);  // Extract command and arguments
      commandName = args.shift().toLowerCase();
      console.log({ commandName, args });
    } else {
      return;  // If not from bot or doesn't start with prefix, ignore
    }

    // If no valid command is found, exit
    if (!commandName || !client.commands.has(commandName)) return;

    // Get the command from the client's collection of commands
    const command = client.commands.get(commandName);
    if (!command) return;

    // Execute the command and handle any errors
    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      message.reply('There was an error executing that command.');
    }
  },
};
