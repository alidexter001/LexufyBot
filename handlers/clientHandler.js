const { readdirSync } = require(`fs`);
const fs = require('fs');
const path = require('path');

var colors = require(`colors`);

module.exports = async (client) => {
    //commands
    console.log(`[${colors.green('COMMANDS')}] Loading ${colors.cyan('SlashCommands')}...`)
    const slashCommandsArray = [];
    readdirSync(`${process.cwd()}/commands`)
        .filter((file)=> file.endsWith('.js'))
        .forEach(file =>{
            let pull = require(`${process.cwd()}/commands/${file}`);
            client.slashCommands.set(pull.name, pull);
            slashCommandsArray.push(pull);
    })
    //events 
    console.log(`[${colors.green('EVENTS')}] Loading ${colors.cyan('ClientEvents')}...`)
    readdirSync(`${process.cwd()}/events`)
    .filter((file)=> file.endsWith('.js'))
    .forEach(file => {
        const pull = require(`${process.cwd()}/events/${file}`)
        let eventName = file.split('.')[0];
        client.on(eventName, pull);
    })
    //
    client.on(`ready`, async () => {
        if(client.deploySlash.enabled) {
            if(client.deploySlash.guild) {
                client.guilds.cache.get(client.deploySlash.guild).commands.set(slashCommandsArray); 
            } else {
                client.application.commands.set(slashCommandsArray);
            }
        } 
    });

    // AntiCrash
    process.on('unhandledRejection', (reason, p) => {
        console.log('\n\n\n\n\n=== unhandled Rejection ==='.toUpperCase());
        console.log('Reason: ', reason.stack ? String(reason.stack) : String(reason));
        console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase());
    });
    process.on("uncaughtException", (err, origin) => {
        console.log('\n\n\n\n\n\n=== uncaught Exception ==='.toUpperCase());
        console.log('Exception: ', err.stack ? err.stack : err)
        console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase());
    })
    process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('=== uncaught Exception Monitor ==='.toUpperCase());
    });
    process.on('multipleResolves', (type, promise, reason) => {
    /* console.log('\n\n\n\n\n=== multiple Resolves ==='.toUpperCase());
    console.log(type, promise, reason);
    console.log('=== multiple Resolves ===\n\n\n\n\n'.toUpperCase());
    */
    });
}