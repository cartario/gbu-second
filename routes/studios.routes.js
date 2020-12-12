const { Router } = require('express');
const router = Router();
const StudioModel = require('../models/Studio');
const { check, validationResult } = require('express-validator');
const Studio = require('../models/Studio');

//TODO: add auth middleware
router.post('/create', async (req, res) => {
  const obj = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const studioItem = await StudioModel.create(obj);
    res.status(200).send(studioItem);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const studioId = req.params.id;
    const studio = await StudioModel.findById(studioId);

    if (!studio) {
      res.status(400).json({
        message: 'студия не найдена',
      });
    }

    res.status(200).send(studio);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const studios = await StudioModel.find({});
    res.status(200).send(studios);
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

    const studioId = req.params.id;
    const obj = req.body;
    const studio = await StudioModel.findById(studioId);

    if (!studio) {
      res.status(400).json({
        message: 'студия не найдена',
      });
    }

    const fields = Object.keys(obj);

    fields.forEach((field) => {      
      studio[field] = obj[field];
    });
    await studio.save();

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

    const studioId = req.params.id;
    const studio = await StudioModel.findByIdAndDelete(studioId);

    if (!studio) {
      res.status(400).json({
        message: 'студия не найдена',
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
