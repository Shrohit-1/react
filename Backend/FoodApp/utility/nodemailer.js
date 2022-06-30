const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports.sendMail= async function sendMail(str,data) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "", // generated ethereal user
      pass: "klclyaqznafmggnx", // generated ethereal password
    },
  });

  // send mail with defined transport object
  var Ohtml,Osubject;
  if(str==="signup"){
    Osubject=`THANK YOU for Signing ${data.name}`;
    Ohtml=`
    <h1> Welcome To foodApp.com</h1>
    Hope You Have a good time !!!
    Here Are Your Details:
    Name - ${data.name},
    email - ${data.email}
    `
  }
  else if(str==="resetpassword"){
    Osubject=`Reset Password`;
    Ohtml=`
    <h1>foodApp.com</h1>
    Here is your link to reset the password !
    ${data.resetPasswordLink}
    `
  }
  let info = await transporter.sendMail({
    from: '"Food App 👻" <shrohitsoam@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
     // plain text body
    html: Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

