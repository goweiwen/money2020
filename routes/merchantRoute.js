var express = require('express');
var router = express.Router();
var path = require('path');

const jsonfile = require('jsonfile')
const file = path.join(__dirname, '/merchant_data.json')
let itemData = {}
jsonfile.readFile(file)
  .then(obj => itemData = obj.items)
  .catch(error => console.error(error))

var synchronyAPI = require('../apis/synchronyAPI')
var yelpAPI = require('../apis/yelpAPI')

var purchaseStatsMiddleware = function (req, res, next) {
	synchronyAPI.purchaseStats().then(function (value) {
		req.purchaseStats = value
		next()
	})
}

var yelpMiddleware = function (req, res, next) {
	var lat = req.query.lat
	var lon = req.query.lon
	var term = req.purchaseStats.nextLikelyPurchase
	term = 'furniture'
	var respData = {merchant: []}
	yelpAPI.getNearbyBusinesses(term, lat, lon).then(function(bizData) {
		for (var count = 0; count < 3; count++) {
			var biz = bizData.businesses[count]
			var name = biz.name
			var lat = biz.coordinates.latitude
			var lon = biz.coordinates.longitude
			var items = [
				itemData.slice(count, count + 5)
			]
			var merchantData = {
				name: name,
				lat: lat,
				lon: lon,
				items: items
			}
			respData.merchant.push(merchantData)
		}
		res.json(respData)
	})
}

/* GET home page. */
router.get('/', purchaseStatsMiddleware, yelpMiddleware);

module.exports = router;