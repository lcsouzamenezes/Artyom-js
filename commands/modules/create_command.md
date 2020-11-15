const Command = require('../base/command').default;

class YourCommand extends Command {
    constructor(name, keyword /* custom variables*/) {
        super(name, keyword)
        
        /* Your custom stuff goes here */
    }

    Execute(args, msg) {
        let command = (args.length >= 1) ? args[0].toLowerCase() : 'help';

        switch (command) {
            default:
                this.Help(args, msg);
                break;
        }

        console.log("not implemented.");
    }

    Help(args, msg) {
        console.log("no help");
    }
}

exports.default = YourCommand;