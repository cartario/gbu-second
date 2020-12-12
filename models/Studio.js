const {Schema, model} = require('mongoose');

const StudioSchema = new Schema({
  isDuplicate: {
    type: String     
  },
  name: {
    type: String,
    required: true 
  },  
  title: {
    type: String,
    required: true
  },
  age_min: {
    type: String,
    required: true
  },
  age_max: {
    type: String,
    required: false
  },
  groupNumber: {
    type: String,
    required: true
  },
  cab: {
    type: String,
    required: false
  },
  day: {
    type: String,
    required: true
  },
  timeFrom: {
    type: String,
    required: true
  },
  timeTo: {
    type: String,
    required: true
  },
  teacher: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  priceOptions: {
    type: String,
    required: false
  },
  adress: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  }  
}, {
  timestamps: true
});

module.exports = model('Studio', StudioSchema);
