// config for API Keys and Co
const Config = require('./includes/config.js').default;
const conf = new Config();
// Commands
const Commands = require('./commands/commands').default;
const cmd = new Commands();
// Discord
const Discord = require('discord.js')
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Bot online as ${client.user.tag}`);
    client.user.setActivity('Javascript');
});

client.on('message', msg => {
    if (msg.author == client.user) { 
        return; 
    }  else if (msg.content.startsWith(cmd.key)) {
        let splitCommand = msg.content.substr(1).split(" ");
        let keyword = splitCommand[0].toLowerCase();
        let args = splitCommand.slice(1);

        cmd.Execute(keyword, args, msg);
    }
});

client.login(conf.discordKey);