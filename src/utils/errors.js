exports.commandNotFound = function (bot) {
    return function (command, message) {
        let commandIsFound = bot.commands.has(command)
        if (!commandIsFound) {
            let errorMessage = `command ${command} not recognized.`
            console.info(errorMessage)
            message.reply(errorMessage)
        }
        return commandIsFound
    }
}