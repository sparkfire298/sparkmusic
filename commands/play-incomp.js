const { createAudioPlayer, createAudioResource, joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice');
const fetch = require("node-fetch");
module.exports = {
	name: 'play-incomp',
    description: 'Play a song from incompetech (Kevin MacLeod)',
	async execute(bot, message, args, Discord) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('Please join a voice channel first!');
        }
        try {
const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        });
            const query = args.join(' ');
            if (!query) return message.reply("Enter a search query");
            
            const response = await fetch('https://incompetech.com/music/royalty-free/pieces.json');
        const data = await response.json(); const tracks = data.filter(track => track.title.toLowerCase().includes(query.toLowerCase()));

        if (tracks.length === 0) { return message.reply(`No tracks were found. (you should look at incompetech.com first, there are a shitload of songs there)`); }
            const track = tracks[0];
            const url = `https://incompetech.com/music/royalty-free/mp3-royaltyfree/${encodeURIComponent(track.filename)}`

            const resource = createAudioResource(url, { inputType: 'opus', inlineVolume: true });

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

            const embed = new Discord.MessageEmbed().setTitle("Now playing").setDescription(`${track.title} by Kevin MacLeod\n\nDuration: ${track.length}\nInstruments: ${track.instruments}\n\n"*${track.description}*"\n- incompetech\n\n[Download the track](${url})\n[${track.title} on iTunes](${track.itunes})\nTrack released: ${track.uploaded}`).setThumbnail(`https://incompetech.com/images/2013janlogo.png`).setFooter(`(no the audio isnt from youtube its directly from incompetech)\nRequested by ${message.author.tag}`, message.author.displayAvatarURL({ format: 'png', dynamic: true })); message.reply({embeds:[embed]});
        } catch (error) {
            console.error(error);
            connection.destroy();
            await message.reply('Something went wrong!');
        }
    },
};
