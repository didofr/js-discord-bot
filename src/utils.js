exports.getContentWithoutPrefix = function(prefix, message) {
    return message.content.substr(prefix.length)
}