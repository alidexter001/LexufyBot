const {EmbedBuilder} = require('discord.js')
const {EMBED_COLORS} = require('../config')

module.exports = {
    name: 'skipto',
    description: 'skip to a specific track from the queue',
    options:[
        {
            name: 'position',
            description: 'the track number from the queue',
            type: 4,
            required: true,
        }
    ],

    run: async(interaction, client) =>{
        const skipTo = interaction.options.getInteger('position')
        const player = interaction.client.manager.get(interaction.guild.id)
        const channel = interaction.member.voice.channel;
        const botChannel = interaction.guild.members.me.voice.channel;

        if(!player) return interaction.reply({content: `❌ **| Nothing Is Played Right Now...**`, ephemeral: true})
        if(!channel) return interaction.reply({content:`⚠️ **| You have to be on a voice channel to use this command.**`, ephemeral: true})
        if(channel && channel !== botChannel) return interaction.reply({content:`⚠️ **| You have to be on the same voice channel as mine to use this command.**`, ephemeral: true})
        if(skipTo < 0 || skipTo > player.queue.size && player.queue.size !== 0) return await interaction.reply({content: `❌ **| You have to provide a number between *\`<1-${player.queue.length}>\`***`, ephemeral: true})
            else if(player.queue.size === 0) return interaction.reply({content:`❌ **| You can't use this command. *\`There Is Only One Track On The Queue.\`***`, ephemeral: true})

        try {
           await player.stop(player.queue.size - skipTo)
           let embed = new EmbedBuilder()
            .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
            .setColor(EMBED_COLORS.SKIP)
            .setDescription(`> ⏭️ **Successfully Skipped To The Track Number *\`${player.queue.length - 1}\`***`)
            .addFields([
                {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
            ])
            await interaction.reply({embeds: [embed]})
        }catch{}

    }
}