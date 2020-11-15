const Command = require('../base/command').default;

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
                msg.channel.send(`\`\`\`md\nuser <${username}> not found on <${platform}>\`\`\``);
                return;
            }
    
            let statString = `\`\`\`cs\n
            [${username}]
            KD: ${userStats.stats.general.kd}
    
            Kills: ${userStats.stats.general.kills}
            Assists: ${userStats.stats.general.assists}
            Deaths: ${userStats.stats.general.deaths}
    
            Wins: ${userStats.stats.general.wins}
            Lossess: ${userStats.stats.general.losses}
            \`\`\`
            `;
    
            msg.channel.send(statString)
        });
    }
}

exports.default = CmdRainbowSix;