module.exports = {
  name: 'ping',
  description: 'Ping command',
  execute(message) {
      message.channel.send('Pong!');
  },
};