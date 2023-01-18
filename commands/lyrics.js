const {EmbedBuilder} = require('discord.js');
const {EMBED_COLORS} = require('../config.js');
const lyricsFinder = require("lyrics-finder");
const msToHms = require('ms-to-hms');

module.exports = {
    name: 'lyrics',
    description: 'Give you the lyrics of the current song',

    run: async(interaction, client) =>{
        const player = interaction.client.manager.get(interaction.guild.id);
        if(!player || !player.queue.current) return interaction.reply({content: `❌ **| Nothing is playing right now...**`, ephemeral: true});
        const channel = interaction.member.voice.channel;
        const botChannel = interaction.guild.members.me.voice.channel;

        if(!channel) return interaction.reply({content: `⚠️**| You have to be on a voice channel to use this command.**`, ephemeral: true});
        if(channel && channel != botChannel) return interaction.reply({content: `⚠️**| You have to be on the same voice channel as mine to use this command.**`, ephemeral: true});

        const lyrics = await lyricsFinder(player.queue.current.title)
        if(lyrics.length === 0 && player.queue.current.isStream) return interaction.reply({content:`❌ **| Didn't Find The Lyrics Of The Song *\`${player.queue.current.title}\`* **`, ephemeral: true});
        else {
            try {
                    let embed = new EmbedBuilder()
                    .setTitle(`\n ***\`${player.queue.current.title}\`***`)
                    .setAuthor({name:`🎼 Lyrics Of`})
                    .setDescription(lyrics)
                    .setColor(EMBED_COLORS.SUCCESS)
                    .addFields([
                        {name: `Duration`, value: ("`"+msToHms(player.queue.current.duration)+"`"), inline: true},
                        {name: `Author`, value: ("`"+player.queue.current.author+"`"), inline: true},
                        {name: `position`, value: ("`"+(player.queue.size -0)+"`"), inline: true},
                    ])
                    if (typeof player.queue.current.displayThumbnail === "function") embed.setThumbnail(player.queue.current.displayThumbnail("hqdefault"))
                    
                    await interaction.deferReply({ephemeral: true})
                    .then(() => interaction.editReply({embeds: [embed], ephemeral: true}))
            }catch{interaction.reply({content:`❌ **| The Lyrics Is Too Long To Be Displayed**`, ephemeral: true})}
        }
        
    }

}