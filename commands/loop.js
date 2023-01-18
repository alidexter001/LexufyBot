const {EmbedBuilder} = require('discord.js')
const {EMBED_COLORS} = require('../config')

module.exports = {
    name: 'loop',
    description: 'Loop The Queue/Track',
    options: [{
        name: 'type',
        type: 3,
        description: 'The Entity you want to loop',
        required: false,
        choices: [
            {
                name: 'queue',
                value: 'queue',
            },
            {
                name: 'track',
                value: 'track',
            },
        ],
    }],

    run: async(interaction, client) =>{
        const type = interaction.options.getString('type') || "track";
        const player = interaction.client.manager.get(interaction.guild.id)
        if(!player) return interaction.reply({content: `❌ **| Nothing is playing right now...**`, ephemeral: true});
        const channel = interaction.member.voice.channel;
        const botChannel = interaction.guild.members.me.voice.channel;

        if(!channel) return interaction.reply({content: `⚠️**| You have to be on a voice channel to use this command.**`, ephemeral: true});
        if(channel && channel != botChannel) return interaction.reply({content: `⚠️**| You have to be on the same voice channel as mine to use this command.**`, ephemeral: true});

        if(type === 'queue'){
            try{
                await player.setQueueRepeat(!player.queueRepeat);
                const embed = new EmbedBuilder()
                .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
                .setDescription(`> ♾️ ***\`${player.queueRepeat ? 'Activating': 'Desactivating'}\`* Loop For The Queue.**`)
                .addFields([
                    {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
                ])
                .setColor(`${player.queueRepeat ? EMBED_COLORS.SUCCESS : EMBED_COLORS.ERROR}`)
                await interaction.reply({embeds: [embed]})
            }catch{}
        }
        else if(type === 'track'){
            try{
                await player.setTrackRepeat(!player.trackRepeat);
                const embed = new EmbedBuilder()
                .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
                .setDescription(`> 🔁 ***\`${player.trackRepeat ? 'Activating': 'Desactivating'}\`* Loop For The Track.**`)
                .addFields([
                    {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
                ])
                .setColor(`${player.trackRepeat ? EMBED_COLORS.SUCCESS : EMBED_COLORS.ERROR}`)
                await interaction.reply({embeds: [embed]})
            }catch{}
        }
    }
    
}