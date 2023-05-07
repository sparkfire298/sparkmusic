module.exports = {
	name: 'play',
	async execute(bot, message, args) {
		message.channel.send("**2 commands found:**\nplay-mp3 - **MP3 player**\nplay-incomp - **Incompetech player**");
	},
};