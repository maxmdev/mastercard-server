const keyRetriever = require('./keyRetriever.js');

function get(data) {
    return keyRetriever.retrieveKey(data.privateKey.path, data.keyPassword, data.keyAlias);
}

module.exports = {get}