//const sendEmail = require('../helper/sendMail');
const nodemailer = require("nodemailer");
const Joi = require('joi');
var Student = require('../model/Student')

exports.mailContact = async (req, res) => {
  //  await  sendEmail({
  //           name : req.body.name,
  //           email: req.body.email,
  //           subject : req.body.subject,
  //           cotact: req.body.contact,
  //           message : req.body.message
  //       });
  //       res.status(200).json({"status": 200, "message": "Email sent successfully"});
  try {


    var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      port: 465,
      auth: {
        user: 'helpmetutors27@gmail.com',
        pass: 'xyhrovwrydfoqmmn'
      }
    });

    var mailOptions = {
      from: 'helpmetutors27@gmail.com',
      to: 'thesophomorescripps@gmail.com',

      subject: `${req.body.subject}`,
      html: `<h3>New Enquiry</h3>
              <p> Name: ${req.body.name} </p>
              <p> Email: ${req.body.email} </p>
              <p> Contact: ${req.body.contact} </p>
              <p> Message: ${req.body.message} </p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);


      }
    });
    return res.status(200).json({ 'message': 'mail sent successfully', status: 200 });
  } catch (err) {
    return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
  }

}

exports.createStudent = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    email: Joi.string().email().required(),
    contact: Joi.string().required(),
    standard: Joi.string().required(),
    school: Joi.string().required(),

  })
  try {
    await schema.validateAsync(req.body);
    await Student.create(req.body, (err, data) => {

      if (data) {
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: true,
          port: 465,
          auth: {
            user: 'helpmetutors27@gmail.com',
            pass: 'xyhrovwrydfoqmmn'
          }
        });

        var mailOptions = {
          from: 'helpmetutors27@gmail.com',
          to: 'thesophomorescripps@gmail.com',

          subject: `New Student Registered`,
          html: `
                            <p> Name: ${req.body.name} </p>
                            <p> Age: ${req.body.age} </p>
                            <p> Email: ${req.body.email} </p>
                            <p> Contact: ${req.body.contact} </p>
                            <p> Class: ${req.body.standard} </p>
                            <p> School: ${req.body.school} </p>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            res.send('Sent Successfully')
          }
        });
      }
      if (err) throw err
      return res.status(200).json({ 'message': 'Student created successfully', status: 200 });
    })

  } catch (err) {
    return res.status(500).json({ 'message': 'something went wrong', 'err': err.message })
  }
}