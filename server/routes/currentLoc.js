const express = require('express');
const router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
	const {lat, lon} = req.body
	// Set up post get route to find merchants nearby
});

module.exports = router;