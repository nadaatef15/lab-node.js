const jwt = require("jsonwebtoken");
const Teachers=require("../Models/teacherSchema");
const {PasswordManager}=require("../password");
require('dotenv').config();
exports.login =  (req, res, next) => {
  try {
    let token;
  
    if (
      req.body.username === "admin" &&
      req.body.password === process.env.Admin_password

    ) {
       console.log(req.body.username);
       console.log(req.body.password);
      token = jwt.sign(
        { role: "admin", username: "admin" },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ message: "Logged in as admin", token });
    } else {
     
      const {firstname, password } = req.body;

      const teacher = Teachers.findOne({ 'fullname.firstname': firstname });

      if (!teacher) {
        throw new Error("Not authenticated");
      }

 
       PasswordManager.compare(password, teacher.password);

      
      token = jwt.sign(
        { role: "teacher", username: teacher.firstname, id: teacher._id },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ message: "Logged in as teacher", token });
    }
  } catch (error) {
    next(error);
  }
};
