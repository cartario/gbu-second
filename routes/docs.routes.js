const { Router } = require('express');
const router = Router();
const DocModel = require('../models/Doc');
const { check, validationResult } = require('express-validator');



router.post('/create', async (req, res) => {
  const obj = req.body; 

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const docItem = await DocModel.create(obj);
    res.status(200).send(docItem);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const docs = await DocModel.find({});
    res.status(200).send(docs);
  } catch (err) {
    res.status(500).send();
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const docId = req.params.id;
    const obj = req.body;
    const doc = await DocModel.findById(docId);

    if (!doc) {
      res.status(400).json({
        message: 'событие не найдено',
      });
    }

    const fields = Object.keys(obj);

    fields.forEach((field) => {      
      doc[field] = obj[field];
    });
    await doc.save();
    
    res.status(200).send({
      message: `Updated success. Updated fields: ${fields}`,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const docId = req.params.id;
    const doc = await DocModel.findByIdAndDelete(docId);
    

    if (!doc) {
      res.status(400).json({
        message: 'событие не найдено',
      });
    }

    res.status(200).json({
      message: 'delete success',
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
