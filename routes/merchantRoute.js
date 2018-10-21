var express = require('express');
var router = express.Router();
var path = require('path');
var _ = require('lodash')

const jsonfile = require('jsonfile')
const file = path.join(__dirname, '/merchant_data.json')
let itemData = {}
jsonfile.readFile(file)
	.then(obj => itemData = obj.items)
	.catch(error => console.error(error))

var synchronyAPI = require('../apis/synchronyAPI')
var yelpAPI = require('../apis/yelpAPI')

function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1); // deg2rad below
	var dLon = deg2rad(lon2 - lon1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return Math.round(d * 1.68);
}

function deg2rad(deg) {
	return deg * (Math.PI / 180)
}

var purchaseStatsMiddleware = function (req, res, next) {
	synchronyAPI.purchaseStats().then(function (value) {
		req.purchaseStats = value
		next()
	})
}

var yelpMiddleware = function (req, res, next) {
	var lat1 = req.query.lat
	var lon1 = req.query.lon
	var term = req.purchaseStats.nextLikelyPurchase
	var availableSpend = req.purchaseStats.availableSpend
	var availableSpend = 250
	term = 'furniture'
	var respData = {
		merchants: []
	}
	yelpAPI.getNearbyBusinesses(term, lat1, lon1).then(function (bizData) {
		for (var count = 0; count < 3; count++) {
			var biz = bizData.businesses[count]
			var name = biz.name
			var lat2 = biz.coordinates.latitude
			var lon2 = biz.coordinates.longitude
			var distance = getDistanceFromLatLon(lat1, lon1, lat2, lon2)
			var items = itemData.slice(count, count + 5)
			_.map(items, (item) => {
				return item['insufficientCredit'] = item.price > availableSpend 
			})
			items = _.sortBy(items, ['price'])
			var merchantData = {
				name: name,
				position: {
					lat: lat2,
					lng: lon2
				},
				distance: distance,
				items: items
			}
			respData.merchants.push(merchantData)
		}
		respData.merchants = _.sortBy(respData.merchants, ['distance'])
		res.json(respData)
	})
}

/* GET home page. */
router.get('/', purchaseStatsMiddleware, yelpMiddleware);

module.exports = router;