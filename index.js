require('dotenv').config();
const Discord = require('discord.js')

const { sentFrom, referredTo } = require('./guards.js')
const commandTo = require('./commands.js')

const bot = new Discord.Client()
const { TOKEN, PREFIX } = process.env


bot.login(TOKEN)

// utils
let sentFormBot
let referredToBot
let commandToBot

bot.on('ready', () => {
    let { tag, id } = bot.user
    console.info(`Logged in as
    tag: ${tag}
    id: ${id}`)

    sentFormBot = sentFrom(id)
    referredToBot = referredTo(PREFIX)
    commandToBot = commandTo(bot, PREFIX)
})

bot.on('message', message => {
    if (sentFormBot(message)) return
    if (referredToBot(message)) {
        commandToBot(message)
    }
})