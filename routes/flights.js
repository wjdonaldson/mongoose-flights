var express = require('express');
var router = express.Router();

var flightsCtrl = require('../controllers/flights');

// All actual paths start with "/flights"

/* GET flights listing. */
router.get('/', flightsCtrl.index);
// GET /movies/new
router.get('/new', flightsCtrl.new);
// POST /movies
router.post('/', flightsCtrl.create);

module.exports = router;
