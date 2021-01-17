module.exports = {
    name: 'introduce',
    description: 'the bot introduce himself',
    execute(bot, message) {
        message.reply(`Hello there, my name is ${bot.user.username}!`)
    }
}