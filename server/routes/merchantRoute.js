var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    longtitude: '',
    latitutde: '',
    merchant_name: ''
  })
});

module.exports = router;
