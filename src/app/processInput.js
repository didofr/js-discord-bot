const { removePrefix } = require('../utils/adapters')

module.exports = function (bot, prefix) {
    return function (message) {
        let content = removePrefix(prefix)(message).toLowerCase()

        let args = content.split(/ +/)

        let command = args.shift()
        while (command) {
            if (!bot.commands.has(command)) {
                let errorMessage = `command ${command} not recognized.`
                console.info(errorMessage)
                message.reply(errorMessage)
                return
            }

            try {
                bot.commands.get(command).execute(bot, message)
            } catch (error) {
                console.error(error)

            }

            command = args.shift()
        }
    }
}