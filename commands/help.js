const {EmbedBuilder} = require('discord.js')

const {EMBED_COLORS} = require('../config')
const config = require('../config')
module.exports = {
    name: 'help',
    description: 'Show the list of all the available commands',

    run: async(interaction, client) =>{
        try{
            let Commands = interaction.client.slashCommands.map((cmd) =>`> ***\`/${cmd.name}\`*** **-** **${cmd.description}**`);
            const embed  = new EmbedBuilder()
            .setAuthor({name: `🗒️ All the available commands of ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL()})
            .setColor(EMBED_COLORS.SUCCESS)
            .setFooter({text: `Requested by: ${interaction.member.user.username}`, iconURL: interaction.member.displayAvatarURL({dynamic: true})})
            .setDescription(`${Commands.join("\n")}
            
            > ***[✨ Support Server](${config.SUPPORT_SERVER})***
            > ***[💠 Invite Me](https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&permissions=${config.PERMISSIONS}&scope=bot%20applications.commands)***
            \`\`\` \`\`\``)

            interaction.reply({embeds: [embed]})

        }catch{}
    }
}