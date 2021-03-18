const {Schema, model} = require('mongoose');

const DocSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  afisha: {
    type: Boolean    
  }
}, {
  timestamps: true
})

module.exports = model('Doc', DocSchema);


