const Flight = require('../models/flight');

module.exports = {
  create,
};

async function create(req, res) {
  const flight = await Flight.findById(req.params.id);
  // We can push (or unshift if we want newest to oldest) subdocs into Mongoose arrays
  // the schema in our array makes sure that anything being pushed has the same shape
  flight.destinations.push(req.body);
  try {
    // Save any changes made to the flight doc
    await flight.save();
  } catch (err) {
    console.log(err);
  }
  
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.redirect(`/flights/${flight._id}`);
}
