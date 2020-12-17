const {Schema, model} = require('mongoose');

const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  place: {
    type: String
  },
  description: {
    type: String
  },
  posterUrl: {
    type: String
  },
  cloudinary_id: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = model('Event', EventSchema);


