const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'stats',
    description: 'Displays detailed statistics about the bot.',
    execute: async (bot, message, args) => {
        const uptime = process.uptime();
        const uptimeDays = Math.floor(uptime / 86400);
        const uptimeHours = Math.floor((uptime % 86400) / 3600);
        const uptimeMinutes = Math.floor((uptime % 3600) / 60);
        const uptimeSeconds = Math.floor(uptime % 60);
        const used = process.memoryUsage().heapUsed / 1024 / 1024;

        const embed = new MessageEmbed()
            .setColor('#7289da')
            .setTimestamp()
            .addField('Uptime', `${uptimeDays}d ${uptimeHours}h ${uptimeMinutes}m ${uptimeSeconds}s`, true)
            .addField('Memory Usage', `${Math.round(used * 100) / 100}MB`, true)
            .addField('API Latency', `${Math.round(bot.ws.ping)}ms`, true)
            .addField('CPU Usage', `${Math.round(process.cpuUsage().system / 1000000)}%`, true);

        message.reply({ embeds: [embed] });
    },
};
