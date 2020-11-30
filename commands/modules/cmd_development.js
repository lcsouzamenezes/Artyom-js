const Command = require('../base/command').default;

class CmdDevelopment extends Command {
    constructor(name, keyword) {
        super(name, keyword)
    }

    Execute(args, msg) {
        let command = (args.length >= 1) ? args[0].toLowerCase() : 'help';
        let role = msg.guild.roles.cache.find(role => role.name == 'Russian Engineer');

        switch (command) {
            case 'join':
                this.JoinDev(msg, role);
                break;
            case 'leave':
                this.LeaveDev(msg, role);
                break;
            default:
                this.Help(args, msg);
                break;
        }
    }

    Help(args, msg) {
        msg.channel.send(`\`\`\`xml\n
        <join>  | use: ${this.keyword} <join*>
        <leave> | use: ${this.keyword} <leave*>

        * : these are not case sensitive. E.g. XbOx = xbox.
        \`\`\`
        `)
    }

    LeaveDev(msg, role) {
        let userRole = msg.member.roles.cache.find(userRole => userRole.name == role.name);
        if (null != userRole) {
            msg.member.roles.remove(role.id);
        }
    }

    JoinDev(msg, role) {
        if (null != role) { 
            msg.member.roles.add(role.id); 
        }
    }
}

exports.default = CmdDevelopment;