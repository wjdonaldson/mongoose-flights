// controllers/flight.js

const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
  index,
  show,
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

async function show(req, res) {
   const flight = await Flight.findById(req.params.id);
   const tickets = await Ticket.find({flight: flight._id});
   res.render('flights/show', { title: 'Flight Detail', flight, tickets });
}

// async function show(req, res) {
//   Flight.findById(req.params.id, function(err, flight) {
//     Ticket.find({flight: flight._id}, function(err, tickets) {
//       res.render('flights/show', { title: 'Flight Detail', flight, tickets });
//     });
//   });
// }

function newFlight(req, res) {
  const newFlight = new Flight();
  const dt = newFlight.departs;
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
  departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
  res.render('flights/new', {
    errorMsg: '',
    title: "Add A New Flight",
    departsDate});
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
      title: "Add A New Flight"
    });
  }
}
