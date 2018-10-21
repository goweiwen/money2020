const request = require('request')
const YELP_API_KEY = '-Lqzaxx4tvt_PzUjPiKJQRMiUd4jXp89C-VNqW65UVFQUTgKlZRsjYyZUCZUIG6gFOj9lEb-CWT-9M58-EG2a1BsrL0DZeYjklaiK7RuFE0hhfizTmUKHDkjslHMW3Yx'
const YELP_ENDPOINT = 'https://api.yelp.com/v3/businesses/search'

async function getNearbyBusinesses(term, lat, lon) {
    const options = {
        url: YELP_ENDPOINT,
        headers: {
            Authorization: 'Bearer ' + YELP_API_KEY
        },
        qs: {
            term: term,
            latitude: lat,
            longitude: lon
        }
    }
    return new Promise((resolve, reject) => {
        request(options, function(err, HttpResponse, body) {
            let yelpData = JSON.parse(body)
            resolve(yelpData)
        }, reject)
    })
}

module.exports = {
    getNearbyBusinesses: getNearbyBusinesses
}