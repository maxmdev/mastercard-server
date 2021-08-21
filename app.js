// Imports necessary libraries
const express = require('express');
const formData = require('express-form-data');
const path = require('path');
const forge = require('node-forge');
const fs = require('fs');
const oauthSigner = require('mastercard-oauth1-signer');

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

    // Retrieves signing key from certificate
    const p12Content = fs.readFileSync(privateKey.path, 'binary');
    const p12Asn1 = forge.asn1.fromDer(p12Content, false);
    const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, keyPassword);
    const keyObj = p12.getBags({
        friendlyName: keyAlias,
        bagType: forge.pki.oids.pkcs8ShroudedKeyBag
    }).friendlyName[0];

    // Defines signing key variable
    const signingKey = forge.pki.privateKeyToPem(keyObj.key);

    // Defines OAuth Authorization Header
    const uri = 'https://sandbox.api.mastercard.com/fraud/merchant/v3/termination-inquiry?ExtraFields=true&Format=JSON&PageLength=10';
    const method = 'POST';
    const authHeader = oauthSigner.getAuthorizationHeader(uri, method, bodyData, consumerKey, signingKey);

    // Performs a request to MasterCard

    res.status(200).json(authHeader);
})

server.listen(3000, () => console.log('Started successfully on port 3000...'));