const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  name: 'disconnect',
  description: 'Stops the currently playing audio',
  async execute(bot, message, args, Discord) {
      const novc = new Discord.MessageEmbed().setDescription("You are not in a voice channel").setColor("RED"); const menovc = new Discord.MessageEmbed().setDescription("I am not in a voice channel").setColor("RED"); const menosamevc = new Discord.MessageEmbed().setDescription("I am not in the channel you're in").setColor("RED"); const embed = new Discord.MessageEmbed().setTitle("Stopped").setDescription("The player has been destroyed.");
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('You are not in a voice channel');
    }

    const voiceConnection = getVoiceConnection(voiceChannel.guild.id);
    if (!voiceConnection) {
      return message.reply('I am not in a channel');
    }

    const userVoiceChannel = message.guild.me.voice.channel;
    if (voiceChannel !== userVoiceChannel) {
      return message.reply('I am not in your channel');
    }

    const player = voiceConnection.state.subscription.player;

    player.stop();
   message.reply({embeds:[embed]})
  }
};
