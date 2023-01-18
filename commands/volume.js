const {EmbedBuilder} = require('discord.js')

const {EMBED_COLORS} = require('../config.js')

module.exports = {
    name: 'volume',
    description: 'Set the music Volume <0-100>',
    options: [{
        name: 'amount',
        description: 'Volume Number between 0 and 100',
        type: 4,
        required: false,
    }],

    run: async(interaction, client) =>{
        const volume = interaction.options.getInteger('amount')
        const player = interaction.client.manager.get(interaction.guild.id);

        if(!player) return interaction.reply({content: `❌ **| Nothing is playing right now...**`, ephemeral: true});
        const channel = interaction.member.voice.channel;
        const botChannel = interaction.guild.members.me.voice.channel;

        if(!channel) return interaction.reply({content: `⚠️**| You have to be on a voice channel to use this command.**`, ephemeral: true});
        if(channel && channel != botChannel) return interaction.reply({content: `⚠️**| You have to be on the same voice channel as mine to use this command.**`, ephemeral: true});
        if(!volume) return interaction.reply({content: `🔊 **| Current Volume Is Set To \`${player.volume}\`**`, ephemeral: true});
            try {
                if(volume > 100 || volume < 0) return interaction.reply({content: `❌ **| You Should Provide A Value Between *\`<0-100>\`***`,ephemeral: true});
                
                await player.setVolume(volume);
                const embed = new EmbedBuilder()
                .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
                .setDescription(`> 🔊 **Successfully Set The Volume To *\`${player.volume}\`* **`)
                .addFields([
                    {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
                ])
                .setColor(EMBED_COLORS.SUCCESS)
                await interaction.reply({embeds: [embed]})
                    

            }catch(e){
                console.log(e)
            }
    }
}