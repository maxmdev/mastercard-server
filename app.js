// Defines constants
const API_SANDBOX_URL = 'https://sandbox.api.mastercard.com/fraud/merchant/v3/';
const API_PROD_URL = 'https://api.mastercard.com/fraud/merchant/v3/';
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
server.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

// POST /termination-inquiry
server.post('/api/termination-inquiry', (req, res) => {
    // Retrieves necessary data from request
    const data = perform.retrieve(req);

    // Defines signing key variable
    const signingKey = keyRetriever.retrieveKey(data.privateKey.path, data.keyPassword, data.keyAlias);

    // Defines request parameters
    const uri = API_URL+req.url.toString().split('/api/').pop();
    const method = 'POST';

    // Defines OAuth Authorization Header
    const authHeader = oauthSigner.getAuthorizationHeader(uri, method, data.bodyData, data.consumerKey, signingKey);

    // Performs a request to MasterCard
    perform.request(uri, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        body: data.bodyData,
        cache: 'no-cache',
        redirect: 'follow'
    })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(400).json(error);
        })
})

// GET /termination-inquiry/{IRN}
server.post('/api/termination-inquiry/:IRN', (req, res) => {
    // Retrieves data from request
    const data = perform.retrieve(req);

    // Defines a signing key variable
    const signingKey = keyRetriever.retrieveKey(data.privateKey.path, data.keyPassword, data.keyAlias);

    // Defines request parameters
    const uri = API_URL + req.url.toString().split('/api/').pop();
    console.log(uri);
    const method = 'GET';

    // Defines OAuth Authorization Header
    const payload = null;
    const authHeader = oauthSigner.getAuthorizationHeader(uri, method, payload, data.consumerKey, signingKey);

    // Performs a request to MasterCard
    perform.request(uri, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        body: null,
        cache: 'no-cache',
        redirect: 'follow'
    })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(400).json(error);
        })
})


server.listen(3000, () => console.log('Started successfully on port 3000...'));