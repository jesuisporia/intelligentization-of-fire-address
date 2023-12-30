const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    // host: 'smtp.mailtrap.io',
    // port: 2525,
    // secure: false, // true for 465, false for other ports
    // auth: {
    //     user: '8a138bb109feab1', // generated ethereal user
    //     pass: '4b7967490dc2931' // generated ethereal password
    // }

    // service: 'gmail',
    // auth: {
    //   user: 'poriayavari20@gmail.com',
    //   pass: 'Howoften1234!@#$'
    // }

    // host: 'smtp.ethereal.email',
    // port: 587,
    // auth: {
    //     user: 'rahsaan12@ethereal.email',
    //     pass: 'yugWR4fg439g9T8x8T'
    // }
});

module.exports = transporter;