const fetch = require("node-fetch");

async function request(uri, params = {}) {
    try {
        const response = await fetch(uri, params);
        return await response.json();
    } catch(e) {
        return e;
    }
}

function retrieve(request) {
    return {
        privateKey: request.files.privateKey, // p12 file
        keyPassword: request.body.password, // password for p12 file
        keyAlias: request.body.keyAlias, // alias for key
        bodyData: request.body.data, // object "data" to resend
        consumerKey: request.header('ConsumerKey') // consumer key
    }
}

module.exports = {request, retrieve}