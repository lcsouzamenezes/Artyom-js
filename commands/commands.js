const Config = require('../includes/config.js').default;
const conf = new Config()
const R6StatsAPI = require('r6statsapi').default;
/* COMMANDS */
const Command = require('./base/command').default
const CmdRainbowSix = require('./modules/cmd_rainbowsix').default
const CmdDevelopment = require('./modules/cmd_development').default

class Commands {
    constructor(key = '!') {
        this.key = key;
        this.CommandList = [
            new Command("help", "help"),
            new CmdRainbowSix('Rainbow Six Siege', 'r6', new R6StatsAPI(conf.r6apiKey)),
            new CmdDevelopment('Development', "dev")
        ]
    }

    exists(keyword) {
        for (let i = 0; i <= this.CommandList.length; i++) {
            if (this.CommandList[i].keyword == keyword) {
                return i;
            } else { continue; }
        }

        return -1;
    }

    Execute(keyword, args, msg) {
        let index = this.exists(keyword);

        if (index >= 0) {
            this.CommandList[index].Execute(args, msg);
        } else {
            return;
        }
    }
}

exports.default = Commands;