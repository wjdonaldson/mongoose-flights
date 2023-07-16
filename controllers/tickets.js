// controllers/tickets.js

const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
  new: newTicket,
  create
};

function newTicket(req, res) {
  res.render('tickets/new', {
    errorMsg: '',
    title: "New Ticket",
    f_id: req.params.id
  });
}

async function create(req, res) {
  try {
    req.body.flight = req.params.id;
    const ticket = await Ticket.create(req.body);
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/flights/${req.params.id}`);
}

// async function create(req, res) {
//   try {
//     const ticket = await Ticket.create(req.body);
//     ticket.flight = req.params.id;
//     await ticket.save();
//   } catch (err) {
//     console.log(err);
//   }
//   res.redirect(`/flights/${req.params.id}`);
// }
