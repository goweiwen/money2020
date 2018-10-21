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
	yelpAPI.getNearbyBusinesses(term, lat, lon).then(function(bizData) {
		res.send(bizData)
	})
}

function processYelpBiz(bizData) {
	for (var count = 0; count < 5; count++) {

	}
}


/* GET home page. */
router.get('/', purchaseStatsMiddleware, yelpMiddleware);

module.exports = router;