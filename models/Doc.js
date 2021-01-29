const {Schema, model} = require('mongoose');

const DocSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = model('Doc', DocSchema);


