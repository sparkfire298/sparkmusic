const fs=require("node:fs");
const { Client, Intents } = require('discord.js'); const Discord = require("discord.js"); const discord = require("discord.js"); //all the discord variables
const { token } = require('./info.json'); // grab info
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES ] }); //client
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

bot.once('ready', () => {
	bot.user.setActivity("sm!help - sparkfire.ml", {type:"PLAYING"});
    console.log("bot is ready");
    console.log(`invite: https://discord.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=0`)
});

bot.on('message', message => {
    const prefix = "sm!"
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!bot.commands.has(command))return;
	try {
		bot.commands.get(command).execute(bot, message, args, Discord);
	} catch (error) {
		console.error(error);
	}
});

bot.login(token);