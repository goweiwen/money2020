const request = require('request')
const CONSUMER_KEY = '3BlrebRdD8AErR5oiaz2QHUnBU9MWcA7'
const CONSUMER_SECRET = 'cx3ChIzx3nK8RLW0'
const GRANT_TYPE = 'client_credentials'

const TOKEN_URL = 'https://api-stg.syf.com/oauth2/v1/token'
let access_token = get_token()9

function get_token() {
    request.post({
        url: TOKEN_URL,
        form: {
            client_id: CONSUMER_KEY,
            client_secret: CONSUMER_SECRET,
            grant_type: GRANT_TYPE
        }
    }, function(err, httpResposnse, body) {
        return JSON.parse(body).access_token
    })
}

module.exports = {

}