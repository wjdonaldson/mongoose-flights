// controllers/flight.js

const Flight = require('../models/flight');

module.exports = {
  index,
  new: newFlight,
  create
};

async function index(req, res) {
  const flights = await Flight.find({});
  res.render('flights/index', {
    flights,
    title: "All Flights"
  });
}

function newFlight(req, res) {
  const newFlight = new Flight();
  const dt = newFlight.departs;
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
  departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
  newFlight.departs = departsDate;
  console.log(`departsDate: ${departsDate}`);
  // res.render('flights/new', { departsDate });
  res.render('flights/new', {
    flight: newFlight,
    errorMsg: '',
    title: "New Skill" });
}

async function create(req, res) {
  // Remove empty properties so that defaults will be applied
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  try {
    await Flight.create(req.body);
    res.redirect('/flights');  // Update this line
  } catch (err) {
    console.log(err);
    res.render('flights/new', {
      errorMsg: err.message,
      title: "New Skill"
    });
  }
}
