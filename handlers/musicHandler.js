const { readdirSync } = require(`fs`);
const fs = require('fs');
const path = require('path');

var colors = require(`colors`);

module.exports = async (client) => {
    //Music Events
    console.log(`[${colors.green('NODES')}] Loading ${colors.cyan('NodesEvents')}...`)
    readdirSync(`${process.cwd()}/events/music`)
    .filter((file)=> file.endsWith('.js'))
    .forEach(file => {
        const pull = require(`${process.cwd()}/events/music/${file}`)
        let eventName = file.split('.')[0];
        client.manager.on(eventName, pull);
    })
}