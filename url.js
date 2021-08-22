function create(API_URL, request) {
    return API_URL+request.url.toString().split('/api/').pop();
}

module.exports = {create}