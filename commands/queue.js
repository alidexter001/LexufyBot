const { EmbedBuilder } = require("discord.js");
const msToHms = require("ms-to-hms");

const {EMBED_COLORS} = require('../config')

module.exports = {
    name: 'queue',
    description: 'The Current Queue',
    options: [{
        name: 'page',
        description: 'The page of the queue you want to see',
        type: 4,
        required: false,
    }],

    run: async(interaction, client) =>{
        const page = interaction.options.getInteger('page');
        const player = interaction.client.manager.get(interaction.guild.id);
        if(!player) return interaction.reply({content: `❌ **| Nothing is playing right now...**`, ephemeral: true});
        const channel = interaction.member.voice.channel;
        const botChannel = interaction.guild.members.me.voice.channel;

        if(!channel) return interaction.reply({content: `⚠️**| You have to be on a voice channel to use this command.**`, ephemeral: true});
        if(channel && channel != botChannel) return interaction.reply({content: `⚠️**| You have to be on the same voice channel as mine to use this command.**`, ephemeral: true});

        const queue = player.queue;

        const embed = new EmbedBuilder()
        .setAuthor({name: `📑 The Current Queue`})
        .setColor(EMBED_COLORS.SUCCESS)

        try {
        const multiple = 10;// change for the amount of tracks per page
        const pagen = page || 1;

        const end = pagen * multiple;
        const start = end - multiple;

        const tracks = queue.slice(start, end);
        
        if(queue.current) embed.addFields([{name: `Current: `, value: `**[${queue.current.title}](${queue.current.uri})**`}])
        if (!tracks.length) embed.setDescription(`No tracks in ${pagen > 1 ? `page ${pagen}` : "the queue"}.`);
        else embed.setDescription(tracks.map((track, i) => `\`${start + ++i}\` - **[${track.title}](${track.uri})**`).join("\n"));
        embed.addFields([{name: `Queue Duration:`, value: "***`"+(msToHms(queue.duration)+"`***"), inline: true}])
        const maxPages = Math.ceil(queue.length / multiple);

        embed.setFooter({ text: `Page ${pagen > maxPages ? maxPages : pagen} of ${maxPages}` });

        interaction.reply({embeds: [embed]})
        }catch{}
    
    }
}