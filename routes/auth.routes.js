const {Router} = require('express');
const router = Router();
const UserModel = require('../models/User');
const {check, validationResult} = require('express-validator');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

router.get('/users', async (req,res)=>{
  try{
    const users = await UserModel.find({}).exec();    
    res.send({users})
  }
  catch(err){
    res.status(500).send();
  }
})

router.post('/newuser', [
  check('email', 'Неверный email').isEmail().exists(),
  check('password', 'Минимальная длина пароля не менее 6 символов').isLength({min: 6}).exists()
], async  (req, res)=>{

  const {email, password} = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({message: 'INVALID DATA: некорректные данные при входе', status: 'error', errors: errors.array()});        
      return;
    }
    
    const candidate = await UserModel.findOne({email});
    
    if(candidate){
      res.status(400).send({message: 'Такой пользователь уже существует'});
      return;
    }

    const user = UserModel.create({email, password});

    res.status(200).json({
      message: 'Пользователь создан'
    })
  }
  catch(err){    
    res.status(500).send();
  }
}); 

router.post('/login', [
  check('email', 'Неверный email').isEmail().exists(),
  check('password', 'Минимальная длина пароля не менее 6 символов').isLength({min: 6}).exists()
], async (req, res)=>{
  const {email, password} = req.body;
  console.log('here')
  try{

    const candidate = await UserModel.findOne({email});

    if(!candidate){
      res.status(400).json({
        message: 'Такого пользователя нет'
      })
    }

    if(candidate.password!==password){
      res.json({
        message: 'пароли не совпадают'
      })
    }

    const token = jwt.sign(
      {userId: candidate.id},
      SECRET_KEY,
      {expiresIn: '365d'}
    );   

    res.status(200).send({
      userId: candidate.id,
      email,
      token,
    });    
  }
  
  catch(err){    
    res.status(500).send();
  }
});

module.exports = router;
