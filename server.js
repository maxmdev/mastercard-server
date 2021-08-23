// Defines constants
const API_SANDBOX_URL = 'https://sandbox.api.mastercard.com/fraud/merchant/v3/';
//const API_PROD_URL = 'https://api.mastercard.com/fraud/merchant/v3/';
const API_URL = API_SANDBOX_URL;
// Defines a port variable
const PORT = process.env.PORT || 3000;

// Imports libraries
const express = require('express');
const formData = require('express-form-data');
const path = require('path');
const https = require('https');
const fs = require('fs');
const bodyParser = require('body-parser');

const oauthSigner = require('mastercard-oauth1-signer');
const perform = require('./request.js');
const url = require('./url');
const key = require('./key');

// Defines a server
const server = express();

server.use(express.static(path.resolve(__dirname, 'public')));
server.use(express.json());
server.use(bodyParser.json());
server.use(formData.parse());

// GET *
server.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// POST [/termination-inquiry]
server.post('/api/termination-inquiry', (req, res) => {
    // Retrieves necessary data from request
    const data = perform.retrieve(req);

    // Defines signing key variable
    const signingKey = key.get(data);

    // Defines request parameters
    const uri = url.create(API_URL, req);
    const method = 'POST';

    // Defines OAuth Authorization Header
    const authHeader = oauthSigner.getAuthorizationHeader(uri, method, data.bodyData, data.consumerKey, signingKey);

    // Performs a request to MasterCard
    perform.request(uri, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        body: data.bodyData,
        cache: 'no-cache',
        redirect: 'follow'
    })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).send(error.message))
});

// GET [/termination-inquiry/{IRN}]
server.post('/api/termination-inquiry/:IRN', (req, res) => {
    // Retrieves data from request
    const data = perform.retrieve(req);

    // Defines a signing key variable
    const signingKey = key.get(data);

    // Defines request parameters
    const uri = url.create(API_URL, req);
    const method = 'GET';

    // Defines OAuth Authorization Header
    const payload = null;
    const authHeader = oauthSigner.getAuthorizationHeader(uri, method, payload, data.consumerKey, signingKey);

    // Performs a request to MasterCard
    perform.request(uri, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        body: null,
        cache: 'no-cache',
        redirect: 'follow'
    })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).send(error.message))
});

// POST [/add-merchant]
server.post('/api/add-merchant', (req, res) => {
    // Retrieves data from request
    const data = perform.retrieve(req);

    // Defines a signing key variable
    const signingKey = key.get(data);

    // Defines request parameters
    const uri = url.create(API_URL, req);
    const method = 'POST';

    // Defines OAuth Authorization header
    const authHeader = oauthSigner.getAuthorizationHeader(uri, method, data.bodyData, data.consumerKey, signingKey);

    // Performs a request to MasterCard
    perform.request(uri, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        body: data.bodyData,
        cache: 'no-cache',
        redirect: 'follow'
    })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).send(error.message))
});

// POST [/common/contact-details]
server.post('/api/common/contact-details', (req, res) => {
    // Retrieves data from request
    const data = perform.retrieve(req);

    // Defines a signing key variable
    const signingKey = key.get(data);

    // Defines a request parameters
    const uri = url.create(API_URL, req);
    const method = 'POST';

    // Defines OAuth Authorization header
    const authHeader = oauthSigner.getAuthorizationHeader(uri, method, data.bodyData, data.consumerKey, signingKey);

    // Performs a request to MasterCard
    perform.request(uri, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        body: data.bodyData,
        cache: 'no-cache',
        redirect: 'follow'
    })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).send(error.message));
});

// POST [/retro/retro-list]
server.post('/api/retro/retro-list', (req, res) => {
    // Retrieves data from request
    const data = perform.retrieve(req);

    // Defines a signing key variable
    const signingKey = key.get(data);

    // Defines a request parameters
    const uri = url.create(API_URL, req);
    const method = 'POST';

    // Defines OAuth Authorization header
    const authHeader = oauthSigner.getAuthorizationHeader(uri, method, data.bodyData, data.consumerKey, signingKey);

    // Performs a request to MasterCard
    perform.request(uri, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        body: data.bodyData,
        cache: 'no-cache',
        redirect: 'follow'
    })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).send(error.message));
});

// POST [/retro/retro-inquiry-details]
server.post('/api/retro/retro-inquiry-details', (req, res) => {
    // Retrieves data from request
    const data = perform.retrieve(req);

    // Defines a signing key variable
    const signingKey = key.get(data);

    // Defines a request parameters
    const uri = url.create(API_URL, req);
    const method = 'POST';

    // Defines OAuth Authorization header
    const authHeader = oauthSigner.getAuthorizationHeader(uri, method, data.bodyData, data.consumerKey, signingKey);

    // Performs a request to MasterCard
    perform.request(uri, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        body: data.bodyData,
        cache: 'no-cache',
        redirect: 'follow'
    })
        .then(data => res.status(200).json(data))
        .catch(error => res.status(500).send(error.message));
});

// POST [/]
server.post('/api/authorize', (req, res) => {
    // Retrieves data from request
    const data = perform.retrieve(req);

    // Defines a signing key variable
    const signingKey = key.get(data);

    // Defines a request parameters
    const uri = API_URL + 'termination-inquiry/19962021082200007?PageOffset=0&PageLength=10&Format=JSON&AcquirerId=1996';
    const method = 'GET';

    // Defines OAuth Authorization header
    const payload = null;
    const authHeader = oauthSigner.getAuthorizationHeader(uri, method, payload, data.consumerKey, signingKey);

    // Performs a request to MasterCard
    perform.request(uri, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        cache: 'no-cache',
        redirect: 'follow'
    })
        .then(data => res.status(200).json('OK'))
        .catch(error => res.status(500).json(error.message));
});

// Starts a server with SSL
//https.createServer({
  //  key: fs.readFileSync('./key.pem'),
    //cert: fs.readFileSync('./cert.pem'),
    //passphrase: 'mastercard'
//}, server).listen(3000, () => console.log('Started successfully on port 3000...'));

server.listen(PORT, () => console.log('Started successfully on port 3000...'));