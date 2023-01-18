const {EmbedBuilder} = require('discord.js');
const {EMBED_COLORS} = require('../config')


module.exports = {
    name: 'previous',
    description: 'play the previous song',

    run: async(interaction, client) =>{
        const player = interaction.client.manager.get(interaction.guild.id);

        if(!player || !player.playing) return interaction.reply({content: `❌ **| Nothing is playing right now...**`, ephemeral: true});
        const channel = interaction.member.voice.channel;
        const botChannel = interaction.guild.members.me.voice.channel;

        if(!channel) return interaction.reply({content: `⚠️**| You have to be on a voice channel to use this command.**`, ephemeral: true});
        if(channel && channel != botChannel) return interaction.reply({content: `⚠️**| You have to be on the same voice channel as mine to use this command.**`, ephemeral: true});


        try{
            const currentSong = player.queue.current;
            if(!player.queue.previous) return interaction.reply({content: `❌ **| There is no previous played songs on this queue**`, ephemeral: true})
            if (currentSong) player.queue.unshift(currentSong);
            await player.play(player.queue.previous);

            const embed = new EmbedBuilder()
            .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
            .setColor(EMBED_COLORS.SUCCESS)
            .setDescription(`> ⏪ **Successfully returned to the previous song**`)
            .addFields([
                {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
            ])
            interaction.reply({embeds: [embed]})

        }catch{}
    }
}