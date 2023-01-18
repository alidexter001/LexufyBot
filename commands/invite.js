const { EmbedBuilder } = require("discord.js");

const {EMBED_COLORS} = require('../config');

const config = require('../config');


module.exports = {
    name: 'invite',
    description: 'Invite me to you discord server',

    run: async(interaction, client) =>{
        
        try{
            const member = interaction.member
            const client = interaction.client

            const embed = new EmbedBuilder()
            .setTitle('✅ Invite.')
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(EMBED_COLORS.SUCCESS)
            .setDescription(`**We thank you for considering that *\`${client.user.tag}\`* is useful for you.** 
            **We always invite you to join our Community also to inform us of any type of bug**
            
            > ***[[💠 Invite Me]](https://discord.com/api/oauth2/authorize?client_id=${config.CLIENT_ID}&permissions=${config.PERMISSIONS}&scope=bot%20applications.commands)***
            
            > ***[[✨ Support Server]](${config.SUPPORT_SERVER})***`)

            await interaction.reply({content: "📩 **| *Check Your DMs...***", ephemeral: true})
            member.send({embeds: [embed]}).catch((() => interaction.editReply({content: '❌ **| Your DMs Are Closed...**', ephemeral: true})))
        }catch{}
    }
}