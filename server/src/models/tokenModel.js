const fs = require('fs');
const TOKEN_PATH = 'token.json';

// Load the token from the file system
function loadToken() {
    if (fs.existsSync(TOKEN_PATH)) {
        const token = fs.readFileSync(TOKEN_PATH);
        return JSON.parse(token);
    }
    return null;
}

// Save the token to the file system
function saveToken(token) {
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
}

module.exports = {
    loadToken,
    saveToken,
};
