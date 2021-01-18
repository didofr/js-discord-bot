exports.getGuildList = function(bot) {
    const { cache } = bot.guilds
    return function(properties) {
        return cache.map(function(guild) {
            return Object.keys(guild).reduce(function(accumulator, current) {
                Boolean(~properties.indexOf(current)) && (accumulator[current] = guild[current])
                return accumulator
            }, {})
        })
    }
}