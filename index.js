// env
require('dotenv').config();
const { TOKEN, PREFIX } = process.env

// instance bot
const Discord = require('discord.js')
const bot = new Discord.Client()
bot.commands = new Discord.Collection()
const commands = require('./src/commands')
Object.keys(commands).map(key => {
    bot.commands.set(commands[key].name, commands[key])
})

// import and declare utils
const { guards, adapters } = require('./src/utils')
let sentFormBot, referredToBot
let getContentWithoutPrefix

// start bot
bot.login(TOKEN)

bot.on('ready', () => {
    let { tag, id } = bot.user
    console.info(`Logged in as\ntag: ${tag} - id: ${id}`)

    // use utils
    sentFormBot = guards.sentFrom(id)
    referredToBot = guards.referredTo(PREFIX)
    getContentWithoutPrefix = adapters.removePrefix(PREFIX)
})

bot.on('message', message => {
    if (sentFormBot(message)) return
    if (!referredToBot(message)) return

    let content = getContentWithoutPrefix(message).toLowerCase()

    let args = content.split(/ +/)
    let command = args.shift()
    while(command) {
        if(!bot.commands.has(command)) {
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

})