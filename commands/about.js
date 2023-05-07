module.exports = {
	name: 'about',
	async execute(bot, message, args, Discord) {
		const embed = new Discord.MessageEmbed()
        .setTitle("sparkmusic#1935")
        .setDescription("sparkmusic is a music Discord bot that currently supports **2 sources**! I was created on the 6th of May 2023.")
        .setFooter(`${bot.commands.size} commands ${bot.guilds.cache.size} guilds`);
        message.reply({embeds:[embed]})
	},
};
