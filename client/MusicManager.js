const {Manager} = require('erela.js');
const Spotify = require('erela.js-spotify');
const Deezer = require('erela.js-deezer');
const Facebook = require('erela.js-facebook');
const config = require('../config.js');
require('dotenv').config();

const { EMBED_COLORS } = require("../config");
const { VoiceState ,EmbedBuilder, Embed } = require("discord.js");
const msToHms = require('ms-to-hms')
/** 
 * @param {VoiceState} oldState
 * @param {VoiceState} newState 
 * @returns {Promise<void>}
*/
module.exports = (client) => {

    if(!config.SPOTIFY.CLIENT_ID && !config.SPOTIFY.CLIENT_SECRET){
        client.manager = new Manager({
            nodes: config.NODES,
            autoPlay: true,
            plugins: [
                new Facebook(),
                new Deezer({
                    albumLimit: config.DEEZER.ALBUM_LIMIT,
                    playlistLimit: config.DEEZER.PLAYLIST_LIMIT,
                }),
            ],
            send(id, payload) {
                var guild = client.guilds.cache.get(id);
                if (guild) guild.shard.send(payload);
            },
        });
    }
    else {
        client.manager = new Manager({
            nodes: config.NODES,
            autoPlay: true,
            plugins: [
                new Facebook(),
                new Deezer({
                    albumLimit: config.DEEZER.ALBUM_LIMIT,
                    playlistLimit: config.DEEZER.PLAYLIST_LIMIT,
                }),
                new Spotify({
                    clientID: config.SPOTIFY.CLIENT_ID,
                    clientSecret: config.SPOTIFY.CLIENT_SECRET,
                    albumLimit: config.SPOTIFY.ALBUM_LIMIT,
                    playlistLimit: config.SPOTIFY.PLAYLIST_LIMIT,
                    convertUnresolved: true,
                }),
            ],
            send(id, payload) {
                var guild = client.guilds.cache.get(id);
                if (guild) guild.shard.send(payload);
            },
        });
    }
    client.on("raw", (d) => client.manager.updateVoiceState(d));
    client.on('voiceStateUpdate', async(oldState, newState) =>{
        client.manager.updateVoiceState(oldState, newState)
        let guildId = newState.guild.id;
    const player = client.manager.get(guildId);
  
    // check if the bot is active (playing, paused or empty does not matter (return otherwise)
    if (!player || player.state !== "CONNECTED") return;
  
    // prepreoces the data
    const stateChange = {};
    // get the state change
    if (oldState.channel === null && newState.channel !== null)
      stateChange.type = "JOIN";
    if (oldState.channel !== null && newState.channel === null)
      stateChange.type = "LEAVE";
    if (oldState.channel !== null && newState.channel !== null)
      stateChange.type = "MOVE";
    if (oldState.channel === null && newState.channel === null) return; // you never know, right
    if (newState.serverMute == true && oldState.serverMute == false)
      return player.pause(true);
    if (newState.serverMute == false && oldState.serverMute == true)
      return player.pause(false);
    // move check first as it changes type
    if (stateChange.type === "MOVE") {
      if (oldState.channel.id === player.voiceChannel) stateChange.type = "LEAVE";
      if (newState.channel.id === player.voiceChannel) stateChange.type = "JOIN";
    }
    // double triggered on purpose for MOVE events
    if (stateChange.type === "JOIN") stateChange.channel = newState.channel;
    if (stateChange.type === "LEAVE") stateChange.channel = oldState.channel;
  
    // check if the bot's voice channel is involved (return otherwise)
    if (!stateChange.channel || stateChange.channel.id !== player.voiceChannel)
      return;
  
    // filter current users based on being a bot
    stateChange.members = stateChange.channel.members.filter(
      (member) => !member.user.bot
    );
  
    switch (stateChange.type) {
      case "JOIN":
        if (stateChange.members.size === 1 && player.paused && player) {
          let emb = new EmbedBuilder()
            .setTitle(`Resuming paused queue`)
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
            .setColor(EMBED_COLORS.PLAY)
            .setDescription(`> ▶️ **Resuming playback because *\`I Was Alone On This Voice Channel\`* **`);
          await client.channels.cache.get(player.textChannel).send({ embeds: [emb] });
  
          player.pause(false);
        }
        break;
      case "LEAVE":
        if (stateChange.members.size === 0 && !player.paused && player.playing && player) {
          player.pause(true);
  
          let emb = new EmbedBuilder()
            .setTitle('PAUSED!')
            .setColor(EMBED_COLORS.STOP)
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
            .setDescription(`> ⏸️ **The player has been paused because *\`I Am Alone On This Voice Channel\`* **`);
          await client.channels.cache.get(player.textChannel).send({ embeds: [emb] });
        }
        break;
    }
    })
    client.manager.on('trackStart', async (player, track) => {
        const embeded = new EmbedBuilder()
        .setTitle(`🎶 PLAYING`)
        if (typeof track.displayThumbnail === "function") 
            embeded.setThumbnail(track.displayThumbnail("hqdefault"))
        .setDescription(`**[${track.title}](${track.uri})**`)
        .addFields([
            {name: '**Duration**', value: track.isStream ? '\`🔴 LIVE\`' : `\`${msToHms(track.duration)}\``, inline: true},
            {name: '**Author**', value: "`" + track.author + "`", inline: true},
            {name: '**Position**', value: "`" + (player.queue.size - 0) + "`", inline: true},
        ])
        .setColor(EMBED_COLORS.PLAY)
        .setFooter({text: `Requested By: ${track.requester.user.username}`, iconURL: track.requester.displayAvatarURL({dynamic: true})})
        await client.channels.cache
          .get(player.textChannel)
          .send({embeds: [embeded]});
    })
    client.manager.on('queueEnd', async(player, track) =>{
        const channel = client.channels.cache.get(player.textChannel);
        let embed = new EmbedBuilder()
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({dynamic: false})})
        .setDescription(`> ✅ **| Queue Ended**`)
        .setColor(EMBED_COLORS.QUEUE_END)
        channel.send({embeds: [embed]});
    })

}