//  models/ticket.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new mongoose.Schema({
  seat: {type: String,
    match: /[A-F][1-9]\d?/
  },
  price: {type: Number,
          min: 0
  },
  flight: {type: Schema.Types.ObjectId,
           ref: 'Flight'
  },
}, {
  timestamps: true
});

// Compile the schema into a model and export it
module.exports = mongoose.model('Ticket', ticketSchema);
