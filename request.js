const fetch = require("node-fetch");

async function request(uri, params = {}) {
    try {
        const response = await fetch(uri, params);
        return await response.json();
    } catch(e) {
        return e;
    }
}

module.exports = {request}