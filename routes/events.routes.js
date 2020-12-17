const { Router } = require('express');
const router = Router();
const EventModel = require('../models/Event');
const { check, validationResult } = require('express-validator');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

router.post('/upload/create', upload.single('posterUrl'), async (req, res) => {
  
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const uploadedFile = await cloudinary.uploader.upload(req.file.path);
    
    const event = {
      title: req.body.title,
      date: req.body.date,
      category: req.body.category,
      place: req.body.place,
      description: req.body.description,
      posterUrl: uploadedFile.secure_url || req.body.posterUrl,
      cloudinary_id: uploadedFile.public_id || "",
    };

    const eventItem = await EventModel.create(event);
    res.status(200).send(eventItem);
    }

   catch (err) {
    res.status(500).send({ message: err });
  }
});

router.patch('/upload/:id', upload.single('posterUrl'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }
    const eventsId = req.params.id;
    const eventItem = await EventModel.findById(eventsId);  
    
    if (!eventItem) {
      res.status(400).json({
        message: 'событие не найдено',
      });
    }

    // await cloudinary.uploader.destroy(eventItem.cloudinary_id); //delete from cloudinary
    const uploadedFile = await cloudinary.uploader.upload(req.file.path); //upload to cloudinary

    const event = {
      title: req.body.title || eventItem.title,
      date: req.body.date || eventItem.date,
      category: req.body.category || eventItem.category,
      place: req.body.place || eventItem.place,
      description: req.body.description || eventItem.description,
      posterUrl: uploadedFile.secure_url || eventItem.posterUrl,
      cloudinary_id: uploadedFile.public_id || eventItem.cloudinary_id,
    };

    const fields = Object.keys(event);

    fields.forEach((field) => {      
      eventItem[field] = event[field];
    });
    await eventItem.save();
    
    res.status(200).send({
      message: `Updated success. Updated fields: ${fields}`,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/create', async (req, res) => {
  const obj = req.body; 

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const eventItem = await EventModel.create(obj);
    res.status(200).send(eventItem);
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

    const eventId = req.params.id;
    const event = await EventModel.findById(eventId);

    if (!eventId) {
      res.status(400).json({
        message: 'событие не найдено',
      });
    }

    res.status(200).send(event);
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

    const events = await EventModel.find({});
    res.status(200).send(events);
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

    const eventsId = req.params.id;
    const obj = req.body;
    const event = await EventModel.findById(eventsId);

    if (!event) {
      res.status(400).json({
        message: 'событие не найдено',
      });
    }

    const fields = Object.keys(obj);

    fields.forEach((field) => {      
      event[field] = obj[field];
    });
    await event.save();
    
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

    const eventId = req.params.id;
    const event = await EventModel.findByIdAndDelete(eventId);
    await cloudinary.uploader.destroy(event.cloudinary_id); //delete from cloudinary

    if (!event) {
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
