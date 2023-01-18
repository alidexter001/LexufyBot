const {EmbedBuilder} = require('discord.js')
const {EMBED_COLORS} = require('../config')
module.exports = {
    name: 'ping',
    description: 'request the ping of the bot',

    run: async(interaction, client) =>{

        try{
            

            const message = await interaction.deferReply({fetchReply: true})
            const embed = new EmbedBuilder()
            .setTitle('🏓 PONG.')
            .setColor(EMBED_COLORS.SUCCESS)
            .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
            .setDescription(`> 💫 **My Current Api Latency: *\`${interaction.client.ws.ping} ms\`* **
           
            > 🏷️ **My Current Ping: *\`${message.createdTimestamp - interaction.createdTimestamp} ms\`* **`)
            .addFields([
                {name: 'Requested By', value: ("`"+interaction.member.user.username+"`"), inline: true}
            ])

            interaction.editReply({embeds: [embed]})

        }catch(e){console.log(e)}
        
    }
}