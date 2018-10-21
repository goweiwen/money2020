var _ = require('lodash')
var express = require('express');
var router = express.Router();

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
	yelpAPI.getNearbyBusinesses(term, lat, lon).then(function(bizData) {
		for (var count = 0; count < 3; count++) {
			var biz = bizData.businesses[count]
			var name = biz.name
			var lat = biz.coordinates.latitude
			var lon = biz.coordinates.longitude
			var items = [

			]
		}
	})
}

/* GET home page. */
router.get('/', purchaseStatsMiddleware, yelpMiddleware);

module.exports = router;