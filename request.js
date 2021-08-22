const fetch = require("node-fetch");

async function request(uri, params = {}) {
        const response = await fetch(uri, params);

        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error('An error occurred.' + response.status);
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