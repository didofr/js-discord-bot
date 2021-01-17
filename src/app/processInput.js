const { adapters, errors } = require('../utils')

module.exports = function (bot, prefix) {
    let botKnowsCommand = errors.commandNotFound(bot)

    return function (message) {
        let content = adapters.removePrefix(prefix)(message).toLowerCase()

        let args = content.split(/ +/)

        let command = args.shift()
        while (command) {
            if(!botKnowsCommand(command, message)) return

            try {
                bot.commands.get(command).execute(bot, message)
            } catch (error) {
                console.error(error)
            }

            command = args.shift()
        }
    }
}