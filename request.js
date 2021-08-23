const fetch = require("node-fetch");

async function request(uri, params = {}) {
    // Performs a request and waiting for response
    const response = await fetch(uri, params);

    // Valid request has only 200 status in MasterCard
    if (response.status === 200) {
        return await response.json();
    }

    // Defines error message text store for throwing
    let errorMessage = '';

    // MasterCard API returns XML or JSON in errors unpredictable, even if FORMAT=JSON is set (headers and query param).
    // To handle that I use try-catch, because JSON.parse fails when sees XML
    // When XML response, app just resends it forward, when JSON, it tries to retrieve message description
    const responseText = await response.text()
        .then(text => {
            try {
                const data = JSON.parse(JSON.parse(JSON.stringify(text.toString())));
                const reasonCode = data.Errors.Error[0]['ReasonCode'];
                const reasonDescription = data.Errors.Error[0]['Description'];
                errorMessage = reasonCode + ': ' + reasonDescription + '.';
            } catch (error) {
                throw new Error(text.toString());
            }
        })

    // Throws error with retrieved description
    throw new Error(errorMessage);
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