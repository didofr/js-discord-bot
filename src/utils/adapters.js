exports.removePrefix = function(prefix) {
    return function(message) {
        return message.content.substr(prefix.length)
    }
}