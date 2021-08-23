const fetch = require("node-fetch");

async function request(uri, params = {}) {
        const response = await fetch(uri, params);
        const responseData = await response.json();

        if (response.status === 200) {
            return responseData;
        } else {
            const error = JSON.parse(JSON.stringify(responseData)).Errors.Error[0].Description || false;

            if (error) {
                throw new Error(response.status + ': ' + error + '.')
            } else {
                return responseData;
            }
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