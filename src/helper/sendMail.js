const nodemailer = require("nodemailer");

const sendEmail = async (req) => {
   // create reusable transporter object using the default SMTP transport
    console.log('send mail')
    var transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      secure: true,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    var mailOptions = {
      from: process.env.FROM_EMAIL,
      to: req.email,
      subject: `Contact details: ${req.name}`,
      html:`<h3>New Contact details</h3>
            <p> Name:${req.name} </p>
            <p> Email:${req.email} </p>
            <p> Contact:${req.contact} </p>
            <p> Subject:${req.subject}</p>
            <p> Message:${req.message} </p>`

    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ success: true, 'message': 'Email sent' });
      }
    });

  
};


module.exports = sendEmail;