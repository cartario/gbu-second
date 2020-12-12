const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/auth.routes');
const path = require('path');

require('dotenv').config();

const mongoURI = process.env.mongoURI;

app.use(express.json({extended: true}));

app.use('/api/auth', router);

app.use('/', express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req,res)=>{
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = 3001;

async function start (){
  try {
    await mongoose.connect(mongoURI,  {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    app.listen(PORT, ()=>{
      console.log(`server started on ${PORT} port`)
    });
  }
  catch(err){
    console.log(err);
    process.exit(1);
  }
}

start();
