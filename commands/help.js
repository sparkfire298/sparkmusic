module.exports = {
	name: 'help',
	async execute(bot, message, args, Discord) {
        const embed = new Discord.MessageEmbed()
        .setTitle("sparkmusic")
        .setDescription(`${bot.commands.map(command => `[**${command.name}**](http://o.o): ${command.description || "*No description*"}`).join('\n')}`)
        .setFooter(`${bot.commands.size} commands ${bot.guilds.cache.size} guilds`);

        message.reply({content: "**If you cannot see the embedded message, make sure you have embeds enabled.** (Settings>Text & Images>Embeds And Link Previews)", embeds:[embed]});


	},
};