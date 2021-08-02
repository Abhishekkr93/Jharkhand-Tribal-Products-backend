var ejs = require("ejs");
var nodemailer = require("nodemailer");
var mg = require('nodemailer-mailgun-transport');

var auth = {
  auth: {
    api_key: process.env.MAILGUN_KEY,
    domain: 'web.startdropship.us'
  }
}

var transporter = nodemailer.createTransport(mg(auth));

module.exports.sendWelcomeEmail = async (user, email) => {
  ejs.renderFile(__dirname + "/../public/welcome.ejs", { user, url: 'vdev.in' }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      var mainOptions = {
        from: 'startdropship noreply@startdropship.us',
        to: email,
        subject: `Welcome to Vdev, ${user}!`,
        html: data
      };
      transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log('Message sent: ' + info.message);
        }
      });
    }
  });
}

module.exports.sendPassResetEmail = async (user, email, url) => {
  ejs.renderFile(__dirname + "/../public/resetpassword.ejs", { user, url }, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      var mainOptions = {
        from: 'startdropship noreply@startdropship.us',
        to: email,
        subject: `Hi ${user}!, You have requested to reset your password`,
        html: data
      };

      transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log('Message sent: ' + info.message);
        }
      });
    }
  });
}