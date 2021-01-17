module.exports = {
    name: 'avatar',
    description: 'shows the avatar of whom requests it',
    execute(_, message) {
        let text = `, this is your avatar.\n`
        text += message.author.displayAvatarURL()
        message.reply(text)
    }
}