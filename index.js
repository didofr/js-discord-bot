// env
require('dotenv').config();
const { TOKEN, PREFIX } = process.env

// bot
const Discord = require('discord.js')
const bot = new Discord.Client()
bot.commands = new Discord.Collection()
const commands = require('./src/commands')
Object.keys(commands).map(key => {
    bot.commands.set(commands[key].name, commands[key])
})

// utils
const { guards, utils } = require('./src')
let sentFormBot, referredToBot
let getContentWithoutPrefix

// start
bot.login(TOKEN)

bot.on('ready', () => {
    let { tag, id } = bot.user
    console.info(`Logged in as
    tag: ${tag}
    id: ${id}`)

    sentFormBot = guards.sentFrom(id)
    referredToBot = guards.referredTo(PREFIX)
    getContentWithoutPrefix = utils.removePrefix(PREFIX)
})

bot.on('message', message => {
    if (sentFormBot(message)) return
    if (!referredToBot(message)) return

    let content = getContentWithoutPrefix(message)
    console.log(content)
})