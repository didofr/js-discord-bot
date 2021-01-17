const { getContentWithoutPrefix } = require('./utils.js')

module.exports = function(bot, prefix) {
    return function(message) {
        let content = getContentWithoutPrefix(prefix, message)
        console.log(content)
    }
}

exports.introduce = function(bot, message) {
    return message.reply(`Hello there, my name is ${bot.user.username}!`)
}