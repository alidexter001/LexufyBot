const {EmbedBuilder} = require('discord.js')
const { splitBar } = require("string-progressbar");
const {EMBED_COLORS} = require('../config.js')
const msToHms = require('ms-to-hms')

module.exports ={
    name: 'nowplaying',
    description: 'Display the current playing song informations',

    run: async(interaction, client) =>{
        const player = interaction.client.manager.get(interaction.guild.id);
        if(!player || !player.queue.current) return interaction.reply({content: `❌ **| Nothing is playing right now...**`, ephemeral: true});
        const channel = interaction.member.voice.channel;
        const botChannel = interaction.guild.members.me.voice.channel;

        if(!channel) return interaction.reply({content: `⚠️**| You have to be on a voice channel to use this command.**`, ephemeral: true});
        if(channel && channel != botChannel) return interaction.reply({content: `⚠️**| You have to be on the same voice channel as mine to use this command.**`, ephemeral: true});

        const track = player.queue.current;

        try {
            const n = track.isStream ? "🔴 LIVE" : new Date(track.duration).toISOString().slice(11, 19);
            const a = new Date(player.position).toISOString().slice(11, 19)
            const embed = new EmbedBuilder()
            .setAuthor({name:'🎶 NowPlaying'})
            .setDescription(`**[${track.title}](${track.uri})**`)
            .addFields([
                {name: '**Duration**', value: track.isStream ? '\`🔴 LIVE\`' : `\`${msToHms(track.duration)}\``, inline: true},
                {name: '**Author**', value: "`" + track.author + "`", inline: true},
                {name: '**Position**', value: "`" + (player.queue.size - 0) + "`", inline: true},
                {name: 'Position', value: ("`"+a+"`") +
                " [" +
                splitBar(track.isStream ? player.position : track.duration, player.position, 15)[0] +
                "] " + ("`"+n+"`"), inline: false},
            ])
            if (typeof track.displayThumbnail === "function") embed.setThumbnail(track.displayThumbnail("hqdefault"))
            .setColor(EMBED_COLORS.SUCCESS)
            interaction.reply({embeds: [embed], ephemeral: true})

        }catch{}
    }
}