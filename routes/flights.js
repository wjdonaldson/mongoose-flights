var express = require('express');
var router = express.Router();

var flightsCtrl = require('../controllers/flights');

// All actual paths start with "/flights"

/* GET flights listing. */
router.get('/', flightsCtrl.index);
// GET /flight/new
router.get('/new', flightsCtrl.new);
// GET /flights/:id (show functionality) MUST be below new route
router.get('/:id', flightsCtrl.show);
// POST /movies
router.post('/', flightsCtrl.create);

module.exports = router;
