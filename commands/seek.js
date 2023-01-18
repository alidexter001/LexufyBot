const { EmbedBuilder } = require("discord.js");
const {EMBED_COLORS} = require('../config.js');
const msToHms = require("ms-to-hms");

module.exports = {
    name: 'seek',
    description: 'seek to a specific part of the music',
    options: [{
        name: 'time',
        description: 'time to seek (seconds)',
        type: 4,
        required: true,
    }],

    run: async(interaction, client) =>{
        const time = interaction.options.getInteger('time');
        const player = interaction.client.manager.get(interaction.guild.id);

        if(!player || !player.playing) return interaction.reply({content: `❌ **| Nothing is playing right now...**`, ephemeral: true});
        const channel = interaction.member.voice.channel;
        const botChannel = interaction.guild.members.me.voice.channel;

        if(!channel) return interaction.reply({content: `⚠️**| You have to be on a voice channel to use this command.**`, ephemeral: true});
        if(channel && channel != botChannel) return interaction.reply({content: `⚠️**| You have to be on the same voice channel as mine to use this command.**`, ephemeral: true});

        if(time > player.queue.current.duration) return interaction.reply({content:`❌ **| You have to provide a valid part to seek to.**`, ephemeral: true});

        try {

            const current = player.queue.current;
            if(time > current.length) return interaction.reply({content:`❌ **| You have to provide a valid part to seek to seek`, ephemeral: true});

            const embed = new EmbedBuilder()
            .setAuthor({name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({dynamic: false})})
            .setColor(EMBED_COLORS.SUCCESS)
            .setDescription(`> ➡️ **Successfully seeked to *\`${msToHms(time * 1000)}\`* / *\`${msToHms(current.duration)}\`* **`)
            .addFields([
                {name: `Requested By:`, value: ("`" + interaction.member.user.username + "`"), inline: true}
            ])
            await player.seek(time * 1000)
            interaction.reply({embeds: [embed]});

        }catch(e){console.log(e)}
    }
}