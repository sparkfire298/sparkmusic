module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(bot, message, args) {
		message.channel.send(`${bot.ws.ping} ms`);
	},
};