var colors = require('colors');
const {ApplicationCommandType} = require('discord.js')

module.exports = async(interaction, client) => {
    // Slash Command Handling
        try{
            if (!interaction.isCommand()) return;
            const cmd = interaction.client.slashCommands.get(interaction.commandName);
            if (!cmd) return interaction.reply({ content: "❌ **| An error occured.**" }).catch((error)=>{
                console.log(`[${colors.red('CLT Error')}] An error occurred while executing command ${interaction.commandName}`);
                console.error(error);
            })

            const args = [];

            for (let option of interaction.options.data) {
                if (option.type === "SUB_COMMAND") {
                    if (option.name) args.push(option.name);
                    option.options?.forEach((x) => {
                        if (x.value) args.push(x.value);
                    });
                } else if (option.value) args.push(option.value);
            }
            interaction.member = interaction.guild.members.cache.get(interaction.user.id) || await interaction.guild.members.fetch(interaction.user.id).catch(() => null)

            cmd.run(interaction,client, args, "/");
        }catch{}
}