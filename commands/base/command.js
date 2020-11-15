class Command {
    constructor(name, keyword, SubCommands) {
        this.name = name;
        this.keyword = keyword;
        this.funcs = SubCommands;
    }

    Execute(args, msg) {
        console.log("not implemented.");
    }

    Help(args, msg) {
        console.log("no help");
    }
}

exports.default = Command;