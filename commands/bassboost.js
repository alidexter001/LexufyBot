const { EmbedBuilder } = require("discord.js");

const {EMBED_COLORS} = require('../config.js')

module.exports = {
    name: 'bassboost',
    description: 'set the bassboost level to the played song',
    options: [{
        name: 'level',
        description: 'bassboost level',
        type: 3,
        required: true,
        choices: [
            {
                name: 'default',
                value: 'default',
            },
            {
                name: 'low',
                value: 'low',
            },
            {
                name: 'medium',
                value: 'medium',
            },
            {
                name: 'high',
                value: 'high',
            }
        ],
    }],

    run: async(interaction, client) =>{
        const player = interaction.client.manager.get(interaction.guild.id);
        let level = interaction.options.getString('level');
        const levels = {
            default: 0.0,
            low: 0.20,
            medium: 0.30,
            high: 0.35,
          };

        if(!player || !player.playing) return interaction.reply({content: `❌ **| Nothing is playing right now...**`, ephemeral: true});
        const channel = interaction.member.voice.channel;
        const botChannel = interaction.guild.members.me.voice.channel;

        if(!channel) return interaction.reply({content: `⚠️**| You have to be on a voice channel to use this command.**`, ephemeral: true});
        if(channel && channel != botChannel) return interaction.reply({content: `⚠️**| You have to be on the same voice channel as mine to use this command.**`, ephemeral: true});

        try {
            const bands = new Array(3).fill(null).map((_, i) => ({ band: i, gain: levels[level] }));
            await player.setEQ(...bands)
            const embed = new EmbedBuilder()
            .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
            .setColor(EMBED_COLORS.SUCCESS)
            .setDescription(`> ⏫ **Successfully set BassBoost level to *\`${level}\`* **`)
            .addFields([
                {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
            ])

            interaction.reply({embeds: [embed]});

        }catch{}

    }
}