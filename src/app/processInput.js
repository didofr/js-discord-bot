const { adapters, errors } = require('../utils')

module.exports = function (bot, prefix) {
    let botKnowsCommand = errors.commandNotFound(bot)
    let getContentWithoudPrefix = adapters.removePrefix(prefix)

    return function (message) {
        let content = getContentWithoudPrefix(message).toLowerCase()

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