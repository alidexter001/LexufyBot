const {EmbedBuilder} = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const {EMBED_COLORS} = require('../config')

module.exports = {
    name: 'clear',
    description: 'Clear all the queue',

    run: async(interaction, client) =>{
        const player = interaction.client.manager.get(interaction.guild.id);

        if(!player) return interaction.reply({content: `❌ **| Nothing is playing right now...**`, ephemeral: true});
        const channel = interaction.member.voice.channel;
        const botChannel = interaction.guild.members.me.voice.channel;

        if(!channel) return interaction.reply({content: `⚠️**| You have to be on a voice channel to use this command.**`, ephemeral: true});
        if(channel && channel != botChannel) return interaction.reply({content: `⚠️**| You have to be on the same voice channel as mine to use this command.**`, ephemeral: true});

        const queue = player.queue;

        if(queue.size > 0){
            const embed = new EmbedBuilder()
            .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
            .setColor(EMBED_COLORS.QUEUE_CLEARED)
            .setDescription(`> 🚮 **Successfully Cleared The Queue.**`)
            .addFields([
                {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
            ])

            try {
                await queue.clear();
                interaction.reply({embeds: [embed]})
            }catch{}
        }
        else return interaction.reply({content: `❌ **| The Queue Is Already Empty.**`, ephemeral: true});

    }
}