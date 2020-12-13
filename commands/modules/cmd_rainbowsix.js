const Command = require('../base/command').default;
const Discord = require('discord.js');

class CmdRainbowSix extends Command {
    constructor(name, keyword, api) {
        super(name, keyword)
        this.api = api;
    }

    Execute(args, msg) {
        let command = (args.length >= 1) ? args[0].toLowerCase() : 'help';
        let username = (args.length >= 2) ? args[1] : 'noUser';
        let platform = (args.length >= 3) ? args[2].toLowerCase() : 'pc'

        switch (command) {
            case 'stats':
                this.GetGenericStats(username, platform, msg);
                break;
            default:
                this.Help(args, msg);
                break;
        }
    }

    Help(args, msg) {
        msg.channel.send(`\`\`\`xml\n
        <stats> | use: ${this.keyword} <stats*> <username> <platform*>
        [choices: platform = pc, ps4, xbox]
        [default: platform = pc]

        * : these are not case sensitive. E.g. XbOx = xbox.
        \`\`\`
        `)
    }

    GetGenericStats(username, platform, msg) {
        this.api.getGenericStats(username, platform, 'all').then(userStats => {
            if (userStats.status == 'error') {
                let errEmbed = new Discord.MessageEmbed()
                .setColor('#dc3545')
                .setTitle('Erorr')
                .setDescription(`No user **${username}** found on **${platform}**.`)
                .setTimestamp();

                msg.channel.send(errEmbed);
                return;
            }

            let embed = new Discord.MessageEmbed()
            .setColor('#292929')
            .setTitle(`${username}`)
            .addFields(
                { name: 'KD:', value: `**${userStats.stats.general.kd}**`, inline: true},
                { name: 'Combat Stats:', value: `Kills: **${userStats.stats.general.kills}**\nAssists: **${userStats.stats.general.assists}**\nDeaths: **${userStats.stats.general.deaths}**`, inline: true },
                { name: 'Match Stats:', value: `Wins: **${userStats.stats.general.wins}%**\nLosses: **${userStats.stats.general.losses}%**`, inline: true},
                { name: '\u200B', value: '\u200B' },
            )
            .setTimestamp();
    
            msg.channel.send(embed)
        });
    }
}

exports.default = CmdRainbowSix;