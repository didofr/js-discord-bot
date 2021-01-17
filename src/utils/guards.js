exports.sentFrom = function(id) {
    return function(message) {
        return id === message.author.id;
    }
}

exports.referredTo = function(prefix) {
    return function(message) {
        return message.content.startsWith(prefix)
    }
}