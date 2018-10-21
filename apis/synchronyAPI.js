const request = require('request')
const CONSUMER_KEY = '3BlrebRdD8AErR5oiaz2QHUnBU9MWcA7'
const CONSUMER_SECRET = 'cx3ChIzx3nK8RLW0'
const GRANT_TYPE = 'client_credentials'

const TOKEN_URL = 'https://api-stg.syf.com/oauth2/v1/token'
const PURCHASE_STATS_ENDPOINT = 'https://api-stg.syf.com/m2020/credit/customers/2/purchaseStatistics'

async function getToken() {
    return new Promise((resolve, reject) => {
        request.post({
            url: TOKEN_URL,
            form: {
                client_id: CONSUMER_KEY,
                client_secret: CONSUMER_SECRET,
                grant_type: GRANT_TYPE
            }
        }, function (err, httpResponse, body) {
            let accessToken = JSON.parse(body).access_token
            resolve(accessToken)
        }, reject)
    })
}

async function getPurchaseStats() {
    accessToken = await getToken()
    const options = {
        url: PURCHASE_STATS_ENDPOINT,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    return new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
            let purchaseStats = JSON.parse(body)
            resolve(purchaseStats)
        }, reject)
    })
}

module.exports = {
    purchaseStats: function () {
        return getPurchaseStats()
    }
}