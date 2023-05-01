# MusicBot Only `</commands>`
## _An advanced Music Bot Made By C4•Clan_
### ***_© C4•Clan 2023 All rights reserved_***

[![C4•Clan](https://i.imgur.com/j97DJzV.png)](https://discord.gg/c4-clan-community-917454141087965244)

_**LexufyBot**_ is an **Advanced** and **Simple** ***_MusicBot_*** Made By   **_[∁₄•Clan](https://discord.gg/c4-clan-community-917454141087965244)_**.
- Support *_`Youtube | Spotify | Deezer | Radio Stations`_*
- Made With *_`Erela.js | Erela.js-Spotify | Erela.js-Deezer | Erela.js-Facebook`_*
- Total commands *_`20 Commands`_*
- Developed By: `!௹ ◈คli◈ ௹#7137`
 
 [![Discord Presence](https://lanyard.cnrad.dev/api/622846126713995305?theme=dark&animated=true&hideDiscrim=true&borderRadius=10px)](https://discord.com/users/622846126713995305)


## *_Commands_*

| Command | Description |
| --------- | --------- |
| Play | `Play/add to the queue` Music From `Youtube/Spotify` |
| Stop | `Destroy` the server music queue|
| Skip | `Skip` the current played music |
| Pause | `Pause` the server queue |
| Resume | `Resume` the server queue |
| Skipto | `Skip` to a specific song on the queue |
| Clear | `Clear` the queue from all the songs |
| Queue | `Display` the current queue of the server |
| NowPlaying | `Display` the current track played informations |
| Grab | `Save` a specific track from the queue on your DMs |
| Shuffle | `Shuffle` the server queue |
| Seek | `Seek` to a specific part from the song (seconds) |
| Loop | `Loop` the current `Queue / Track` |
| Previous | `Play` the `previous` song from the queue |
| Bassboost | `Set` the `BassBoost` level to the queue |
| Lyrics | `Display` the lyrics of the current song |
| Volume | `Set` the `Volume` level to the queue |
| Help | `Display` the list of all the bot commands |
| Invite | `Save` an invite link of the bot to your DMs |
| Ping | `Display` the bot Ping & Api latency |

## Installation

***_LexufyBot_*** requires [Node.js](https://nodejs.org/dist/v18.0.0/node-v18.0.0-x64.msi) v18 to run.

Install the `Packages` and start the server.

***

**_For Windows..._**
```sh
cd LexufyBot
npm i
node index.js
```
***

**_For Replit..._**

**_Click The `The Button` Down Below_**

[![Repl.it](https://i.imgur.com/jztSOMQ.png)](https://replit.com/github/alidexter001/LexufyBot)

**_On The `Shell` Type The Following Commands_**
```sh
npm i
node index.js
```
***

## *_Development_*

Want to Edit The Code? Great!

_**It's really easy to add commands just follow the steps:**_
***
```js
const {EmbedBuilder} = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const {EMBED_COLORS} = require('../config')

module.exports = {
    name: '',//the name of the command here
    description: '',// the description here

    run: async(interaction, client) =>{
        const player = interaction.client.manager.get(interaction.guild.id);

        if(!player) return interaction.reply({content: `❌ **| Nothing is playing right now...**`, ephemeral: true});
        const channel = interaction.member.voice.channel;
        const botChannel = interaction.guild.members.me.voice.channel;

        if(!channel) return interaction.reply({content: `⚠️**| You have to be on a voice channel to use this command.**`, ephemeral: true});
        if(channel && channel != botChannel) return interaction.reply({content: `⚠️**| You have to be on the same voice channel as mine to use this command.**`, ephemeral: true});
        
        try{
            //you add the actions that the command do here.
        }catch(e){console.log(e)}
    }
}
```
***
**_`⚠️You are free to edit the code or use a part of it on your project but don't change the copyright and author`_**

## License

**_Apache License Version 2.0_**
**_[License](https://github.com/alidexter001/LexufyBot/blob/main/LICENSE)_**
