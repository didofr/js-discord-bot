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
const { guards } = require('./src/utils')
let sentFormBot, referredToBot

// import and declare core features
const app = require('./src/app')
let processInput

// start bot
bot.login(TOKEN)

bot.on('ready', () => {
    let { tag, id } = bot.user
    console.info(`Logged in as\ntag: ${tag} - id: ${id}`)

    // use utils
    sentFormBot = guards.sentFrom(id)
    referredToBot = guards.referredTo(PREFIX)
    processInput = app.processInput(bot, PREFIX)
})

bot.on('message', message => {
    if (sentFormBot(message)) return
    if (!referredToBot(message)) return

    processInput(message)

})