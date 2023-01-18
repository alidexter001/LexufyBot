const {EmbedBuilder} = require('discord.js');
const {EMBED_COLORS} = require('../config')

module.exports = {
    name:'pause',
    description: 'Pause the bot from playing music',
    run: async(interaction, client) =>{

        const player = interaction.client.manager.get(interaction.guild.id);
        if(!player) return interaction.reply({content: `❌ **| Nothing Is Played Right Now...**`, ephemeral: true})
        const channel = interaction.member.voice.channel;
        const botChannel = interaction.guild.members.me.voice.channel;
        if(!channel) return interaction.reply({content:`⚠️ **| You have to be on a voice channel to use this command.**`, ephemeral: true});
        if(channel && channel !== botChannel) return interaction.reply({content: `⚠️ **| You have to be on the same voice channel as mine to use this command.**`, ephemeral: true})
        if(!player.paused){
            try {
                await player.pause(true);
                const embed = new EmbedBuilder()
                .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
                .setDescription(`> ⏸️ **Successfuly Paused The Current Track.**`)
                .addFields([
                    {name: `Requested By:`, value: "`" + interaction.member.user.username + "`", inline: true},
                ])
                .setColor(EMBED_COLORS.STOP)
                await interaction.reply({embeds: [embed]})
            }catch{}
        }else if(player.paused) return interaction.reply({content: `❌ **| The Player Is Already Paused.** `, ephemeral: true})
    }
}