const { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
	name: 'play-mp3',
	async execute(bot, message, args, Discord) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('Please join a voice channel first!');
        }

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });

        try {

            const stream = args[0];
            if (!stream) return message.reply("Enter a mp3 file link")

            const resource = createAudioResource(stream, {
                inputType: 'opus',
                inlineVolume: true
            });

            const player = createAudioPlayer();
            player.play(resource);
            connection.subscribe(player);

            player.on(AudioPlayerStatus.Idle, () => {
                player.stop();
                connection.destroy();
                const efmbed = new Discord.MessageEmbed().setTitle("Finished").setDescription(`Track has finished, leaving the channel.`).setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ format: 'png', dynamic: true })); message.reply({embeds:[efmbed]});
            });
            player.on('error', error => {
                console.error(error);
                player.stop();
                connection.destroy();
            });

            const embed = new Discord.MessageEmbed().setTitle("Now playing").setDescription(`Unknown track\n${stream}`).setThumbnail(`https://i.imgur.com/NXmVjXZ.png`).setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ format: 'png', dynamic: true })); message.reply({embeds:[embed]});
        } catch (error) {
            console.error(error);
            connection.destroy();
            await message.reply('Something went wrong!');
        }
    },
};
