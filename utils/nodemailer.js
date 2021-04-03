const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  secure: true,
  port: 465,
  auth: {
      user: 'test-zaykov@mail.ru',
      pass: 'Nodemailer'
  }
},{
  from: 'test-zaykov@mail.ru'
});

const mailer = (message) => {
  transporter.sendMail(message, (err, info)=>{
    if(err){
      return console.log(err);
    }

    console.log(info)
  })  
}

module.exports = mailer;
