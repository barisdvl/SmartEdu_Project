const nodemailer = require("nodemailer");
const User = require('../models/User')
const Course = require('../models/Course')

exports.getIndexPage = async (req, res) => {
  const courses = await Course.find({}).sort('-createdAt')
  const totalStutents = await User.countDocuments({role: 'Student'})
  const totalTeachers = await User.countDocuments({role: 'Teacher'})
  const totalCourses = await Course.countDocuments()
  res.status(200).render("index", {
    page_name: "index",
    totalCourses,
    totalStutents,
    totalTeachers,
    courses,
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render("about", {
    page_name: "about",
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render("register", {
    page_name: "register",
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render("login", {
    page_name: "login",
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render("contact", {
    page_name: "contact",
  });
};

exports.sendMail = async (req, res) => {
  try{
  const outputMessage = `    
      <h1>Mail Details</h1>
      <ul>
        <li>Name: ${req.body.name} </li>
        <li>Email: ${req.body.email} </li>
      </ul>
      <h1>Message </h1>
      <p> ${req.body.message} </p>
    `;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "mail@gmail.com", // generated ethereal user
      pass: "password", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"SmartEDU Contact Form" <foo@example.com>', // sender address
    to: "mail@gmail.com", // list of receivers
    subject: "Smart EDU Message", // Subject line
    html: outputMessage, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  req.flash("success", "We received your message succesfully");

  res.status(200).redirect("contact");
}catch(err){
  req.flash("error", `Something happened!` );

  res.status(200).redirect("contact");
}
};
