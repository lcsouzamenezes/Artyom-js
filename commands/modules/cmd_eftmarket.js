const Command = require('../base/command').default;
const Discord = require('discord.js')

class CmdEftMarket extends Command {
    constructor(name, keyword, api) {
        super(name, keyword)
        this.api = api;
    }

    Execute(args, msg) {
        let command = (args.length >= 1) ? args[0].toLowerCase() : 'price';

        switch (command) {
            case 'help':
                this.Help(args, msg);
                break;
            default:
                this.GetItemByName(args, msg);
                break;
        }
    }

    async GetItemByName(args, msg) {
        let items = await this.api.GetItemByName(args.join(' '));
        let str = "";

        if (items.length > 1) {
            items.length = (items.length <= 10) ? items.length : 10;

            let str = ``;
            items.forEach(item => {
                str += `${item.name} \n`;
            })
            str += '\n**Please specify**';

            let embed = new Discord.MessageEmbed()
                .setColor('#dc3545')
                .setTitle('Items found:')
                .setDescription(str)
                .setTimestamp();

            msg.channel.send(embed);
        } else {
            let item = items[0];
            let embed = new Discord.MessageEmbed()
                .setColor('#292929')
                .setTitle(`${item.name} (${item.shortName})`)
                .setURL(item.wikiLink)
                .setThumbnail(item.icon)
                .setDescription('Shortname: ' + item.shortName)
                .addFields(
                    { name: 'Fleamarket:', value: `**${item.avg24hPrice}₽**\n*(${item.slots} Slots)*`, inline: true},
                    { name: 'Trader value:', value: `**${item.traderPrice}${item.traderPriceCur}**\n*${item.traderName}*`, inline: true },
                    { name: 'Development:', value: `24hr: **${item.diff24h}%**\n7d: **${item.diff7days}%**`, inline: true},
                    { name: '\u200B', value: '\u200B' },
                )
                .setTimestamp();

            msg.channel.send(embed);
        }
    }

    Help(args, msg) {
        console.log("no help");
    }
}

exports.default = CmdEftMarket;