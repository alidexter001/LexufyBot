const Client = require('./client/Client.js')
const { getVoiceConnection } = require("@discordjs/voice");
const config = require('./config.js');
require('dotenv').config();
var colors = require('colors');

const { Collection } = require('discord.js');




const client = new Client();

// Slash Commands deployment settings
client.deploySlash = {
    enabled: true,
    guild: false, // false | "ID" (if it's false, just set global once, and then never needed again!)
  }


//
client.commands = new Collection();
client.slashCommands = new Collection();

//load Music Events
require('./client/MusicManager.js')(client);

//Loading Events
//require('./handlers/clientHandler.js')(client);
require('./handlers/clientHandler.js')(client);
require('./handlers/musicHandler.js')(client);


//Client Bot
if(!process.env.TOKEN) {
    console.log(`[${colors.red('CLT')}] You Have To Provide A Valid Bot Token`);
    process.exit();
} else {
    client.login(process.env.TOKEN)
}