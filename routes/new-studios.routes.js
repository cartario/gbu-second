const { Router } = require('express');
const router = Router();
const NewStudioModel = require('../models/New-Studio');
const { check, validationResult } = require('express-validator');

router.post('/create', async (req, res) => {  

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    await NewStudioModel.create(req.body);

    res.status(200).send({
      message: 'created ok'
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

router.get('/create', async(req, res)=>{
  try{
    console.log('here');

    res.sendStatus(200)
  }
  catch(err){
    res.status(500).send({ message: err });
  }
});


module.exports = router;
