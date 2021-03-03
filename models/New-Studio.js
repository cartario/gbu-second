const { Schema, model } = require('mongoose');

const AgeSchema = new Schema({
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
});

const subGroupSchema = new Schema({  
  number: {
    type: Number,
    required: true
  },
  schedule: [
    {
      monday: [
        {
          type: Date,
          required: true,
        },
        {
          type: Date,
          required: true,
        },
      ], 
    },
  ]  
});

const NewStudioSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    age: { "type": AgeSchema, required: true},

    subGroups: { "type": subGroupSchema, required: true},    

    cabinet: String,
    teacher: String,
    imgUrl: String,
    description: String
  },
  {
    timestamps: true,
  },
);


module.exports = model('NewStudio', NewStudioSchema);
