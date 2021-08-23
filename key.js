const keyRetriever = require('./keyRetriever.js');
const fs = require('fs');

function get(data) {
    return keyRetriever.retrieveKey(data.privateKey.path, data.keyPassword, data.keyAlias);
}

module.exports = {get}