const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'introduce',
    description: 'the bot introduce himself',
    execute(bot, message) {
        const embed = new MessageEmbed()
            .setColor(0xffff00)
            .setAuthor('made with <3 by @didof')
            .setTitle(`Hello, my name is ${bot.user.username}`)
            .setDescription('I am a discord bot, made in node.js. I am still growing up.')
            .addField('js:introduce', 'display this message')
            .addField('js:help', 'display the help message')
            .setFooter('if at any time you want to know what I can do for you, call me with prefix: help')

        message.channel.send(embed)
    }
}