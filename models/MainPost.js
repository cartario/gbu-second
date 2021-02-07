const {Schema, model} = require('mongoose');

const MainPostSchema = new Schema({
  visible: {
    type: Boolean,
    required: true
  },
  background: {
    type: String,
    
  },
  
  logo_color: {
    type: String,
    required: true
  },
  contacts_bg: {
    type: String,
    required: true
  },
  contacts_background_1: {
    type: String,
    required: true
  },
  contacts_background_2: {
    type: String,
    required: true
  },
  address: {
    type: String,
    
  },
  contacts_color: {
    type: String,
    required: true
  },
  title_bg: {
    type: String,
    required: true
  },
  title_color: {
    type: String,
    required: true
  },
  title_content: {
    type: String,
    required: true
  },
  title_contentType: {
    type: String,
    required: false
  },
  date_date: {
    type: String,
    required: true
  },
  date_time: {
    type: String,
    required: true
  },
  videoplayer_visible: {
    type: Boolean,
  },
  videoplayer_url: {
    type: String,
  },
  videoplayer_title: {
    type: String,
  },

}, {
  timestamps: true
})

module.exports = model('MainPost', MainPostSchema);


