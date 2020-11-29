const express = require('express');
const path = require('path');
const app = express();

app.use('/', express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req,res)=>{
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});

const PORT = 3001;

app.listen(PORT, ()=>{
  console.log(`server started on ${PORT} port`)
});
