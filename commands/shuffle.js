const {EmbedBuilder} = require('discord.js')
const {EMBED_COLORS} = require('../config.js');

module.exports ={
    name: 'shuffle',
    description: 'Shuffling The Queue',

    run: async(interaction, client) =>{
        const player = interaction.client.manager.get(interaction.guild.id);
        if(!player) return interaction.reply({content: `❌ **| Nothing is playing right now...**`, ephemeral: true});
        const channel = interaction.member.voice.channel;
        const botChannel = interaction.guild.members.me.voice.channel;

        if(!channel) return interaction.reply({content: `⚠️**| You have to be on a voice channel to use this command.**`, ephemeral: true});
        if(channel && channel != botChannel) return interaction.reply({content: `⚠️**| You have to be on the same voice channel as mine to use this command.**`, ephemeral: true});

        if(player.playing && player.queue.length > 0){
            try {
                queue = player.queue;
                await queue.shuffle();
                const embed = new EmbedBuilder()
                .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
                .setColor(EMBED_COLORS.SUCCESS)
                .setDescription(`> 🔀 **Successfully Shuffled The Queue.**`)
                .addFields([
                    {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
                ])
                await interaction.reply({embeds: [embed]})
                
            }catch{}
        } else interaction.reply({content: `❌ **| Can't Shuffle The Queue.**`, ephemeral: true});
    }
}