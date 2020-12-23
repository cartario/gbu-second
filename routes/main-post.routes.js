const { Router } = require('express');
const router = Router();
const MainPostModel = require('../models/MainPost');
const { check, validationResult } = require('express-validator');

router.post('/create', async (req, res) => {
  const obj = req.body; 

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ status: 'error', errors: errors.array() });
      return;
    }

    const postItem = await MainPostModel.create(obj);
    res.status(200).send(postItem);
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

    const postId = req.params.id;
    const post = await MainPostModel.findById(postId);

    if (!postId) {
      res.status(400).json({
        message: 'событие не найдено',
      });
    }

    res.status(200).send(post);
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

    const posts = await MainPostModel.find({});
    res.status(200).send(posts);
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

    const postId = req.params.id;
    const obj = req.body;
    const post = await MainPostModel.findById(postId);

    if (!post) {
      res.status(400).json({
        message: 'событие не найдено',
      });
    }

    const fields = Object.keys(obj);

    fields.forEach((field) => {      
      post[field] = obj[field];
    });
    await post.save();
    
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

    const postId = req.params.id;
    const post = await MainPostModel.findByIdAndDelete(postId);    

    if (!post) {
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
