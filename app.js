// Defines constants
const API_SANDBOX_URL = 'https://sandbox.api.mastercard.com/fraud/merchant/v3/';
//const API_PROD_URL = 'https://api.mastercard.com/fraud/merchant/v3/';
const API_URL = API_SANDBOX_URL;

// Imports libraries
const express = require('express');
const formData = require('express-form-data');
const path = require('path');

const oauthSigner = require('mastercard-oauth1-signer');
const perform = require('./request.js');
const keyRetriever = require('./keyRetriever.js');

// Defines a server
const server = express();

server.use(express.static(path.resolve(__dirname, 'client')));
server.use(express.json());
server.use(formData.parse())

// GET *
server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

// POST
server.post('/api/termination-inquiry', (req, res) => {
    // Retrieves necessary data from request
    const privateKey = req.files.privateKey; // p12 file
    const keyPassword = req.body.password; // password to p12 file
    const keyAlias = req.body.keyAlias; // alias for key
    const bodyData = req.body.data; // object "data" to resend
    const consumerKey = req.header('ConsumerKey'); // consumer key

    // Defines signing key variable
    const signingKey = keyRetriever.retrieveKey(privateKey.path, keyPassword, keyAlias);

    // Defines OAuth Authorization Header
    const uri = API_URL+req.url.toString().split('/api/').pop()
    const method = 'POST';
    const authHeader = oauthSigner.getAuthorizationHeader(uri, method, bodyData, consumerKey, signingKey);

    // Performs a request to MasterCard
    perform.request(uri, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        body: bodyData,
        cache: 'no-cache',
        redirect: 'follow'
    })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(200).json(error);
        })
})

server.listen(3000, () => console.log('Started successfully on port 3000...'));