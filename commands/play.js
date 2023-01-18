const {EmbedBuilder} = require('discord.js');
const msToHms = require('ms-to-hms');
const { getVoiceConnection } = require('@discordjs/voice');
const {EMBED_COLORS} = require('../config')
const config = require('../config');
module.exports = {
    name: 'play',
    description: 'Playing Music From Youtube/Spotify',
    options: [{
        name: 'song',
        description: 'Song Name/Link',
        type: 3,
        required: true
    }],
    run: async(interaction, client) =>{
        const channel = interaction.member.voice.channel;
        const song = interaction.options.getString('song');
        let player = interaction.client.manager.get(interaction.guild.id)
        if(!player) {
            player = interaction.client.manager.create({
                guild: interaction.guild.id, 
                textChannel: interaction.channel.id, 
                voiceChannel: '',
                volume: 100,
                selfDeafen: true,
                selfMute: false,
            })
        }
        player.voiceChannel == null
        if(!channel){
            interaction.reply({content: `⚠️ **| You Have To Be On A Voice Channel To Use This Command.**`, ephemeral: true})
            return player.voiceChannel == null
        }
        if (channel && channel !== interaction.guild.members.me.voice.channel && player.playing) return interaction.reply({content: `⚠️ **| You Have To Be On The Same Voice Channel As Mine To Use This Command**`, ephemeral: true});
        if (!channel.viewable)
        return interaction.reply("I need \`View Channel\` permission.");

        if (!channel.joinable && player.state !== "CONNECTED" && !player.playing) return interaction.reply( "I need \`Connect Channel\` permission.");

        if (!channel.speakable && player.state !== "CONNECTED" && !player.playing) return interaction.reply( "I need \`Speak\` permission.");

        if (channel.full && player.state !== "CONNECTED" && !player.playing) return interaction.reply( "Can't join, the voice channel is full.");


        if (interaction.guild.members.me.voice.mute)
            return interaction.reply( "Please unmute me before playing.");
        
        const queue = player.queue;
        player.setVoiceChannel(interaction.member.voice.channel.id)
        if (player.state !== "CONNECTED"){ 
            await player.connect();
            player.stop();
        }

        const result = await player.search(song, interaction.member);

        switch(result.loadType) {
            case "LOAD_FAILED": 
            case "NO_MATCHES": 
                if(!queue.current) player.destroy();

                return interaction.reply(`❌ **No Result Was Found!**`)

            case "PLAYLIST_LOADED":
                const plTracks = result.tracks;
                queue.add(plTracks)
                const embede = new EmbedBuilder()
                .setAuthor({name: '🎵 Queue.'})
                .setColor(EMBED_COLORS.QUEUE_ADD)
                .setDescription(`✅ **| Added *\`${plTracks.length}\`* Tracks to The Queue From** \n***\`${result.playlist.name}\`***`)
                .addFields([
                    {name: `Duration:`, value: "`"+(msToHms(result.playlist.duration))+"`", inline: true},
                    {name: `Author:`, value: "`"+result.playlist.author+"`", inline: true},
                    {name: `Queue Length`, value: "`"+(queue.length)+"`", inline: true}
                ])
                .setFooter({text: `Requested by: ${result.tracks[0].requester.user.username}`, iconURL: result.tracks[0].requester.displayAvatarURL({dynamic: true})})
                
                interaction.reply({embeds: [embede]})

                if (!player.playing && !player.paused && queue.totalSize === plTracks.length)
                    return await player.play();
            case "TRACK_LOADED":
            case "SEARCH_RESULT":
                const track = result.tracks[0];
                queue.add(track);
                if (!player.playing && !player.paused && !queue.size){
                    player.play();
                    const embed = new EmbedBuilder()
                    .setAuthor({name: '🎵 Queue.'})
                    .setDescription(`**Added** \n **[${track.title}](${track.uri})** **To The Queue.**`)
                    .addFields([
                        {name: '**Duration**', value: track.isStream ? '\`🔴 LIVE\`' : `\`${msToHms(track.duration)}\``, inline: true},
                        {name: '**Author**', value: "`" + track.author + "`", inline: true},
                        {name: '**Position**', value: "`" + (queue.indexOf(track) + 1).toString()+ "`", inline: true},
                    ])
                    .setColor(EMBED_COLORS.QUEUE_ADD)
                    .setFooter({text: `Requested By: ${track.requester.user.username}`, iconURL: track.requester.displayAvatarURL({dynamic: true})})
                    if (typeof track.displayThumbnail === "function") embed.setThumbnail(track.displayThumbnail("hqdefault"))
                    await interaction.reply({embeds: [embed]})
                } else if(player.playing && queue.size && player.queue.totalSize === queue.totalSize + 0){
                    try{
                        const embed = new EmbedBuilder()
                        .setAuthor({name: '🎵 Queue.'})
                        .setDescription(`**Added** \n **[${track.title}](${track.uri})** **To The Queue.**`)
                        .addFields([
                            {name: '**Duration**', value: track.isStream ? '\`🔴 LIVE\`' : `\`${msToHms(track.duration)}\``, inline: true},
                            {name: '**Author**', value: "`" + track.author + "`", inline: true},
                            {name: '**Position**', value: "`" + (queue.indexOf(track) + 1).toString()+ "`", inline: true},
                        ])
                        .setColor(EMBED_COLORS.QUEUE_ADD)
                        .setFooter({text: `Requested By: ${track.requester.user.username}`, iconURL: track.requester.displayAvatarURL({dynamic: true})})
                        if (typeof track.displayThumbnail === "function") embed.setThumbnail(track.displayThumbnail("hqdefault"))
                        
                        await interaction.reply({embeds: [embed]})
                    }catch{}
                }
        }
    }
}
