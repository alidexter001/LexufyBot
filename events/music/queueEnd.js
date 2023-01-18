const {MessageEmbed} = require('discord.js');
const { MUSIC } = require('../../config');

/**
 * @param {import('discord.js').Client} client
 * @param {import('erela.js').Player} player
 */

module.exports = async(player) =>{
    setTimeout(() =>{
        if(player.state === 'CONNECTED' && player.queue.size === 0 && !player.playing) player.destroy();
    }, MUSIC.IDLE_TIME * 1000)
}

