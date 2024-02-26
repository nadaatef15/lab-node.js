const jwt = require("jsonwebtoken");
const Teachers=require("../Models/teacherSchema");
const {PasswordManager}=require("../password");
exports.login = async (req, res, next) => {
  try {
    let token;
  
    if (
      req.body.username === "admin" &&
      req.body.password === process.env.ADMIN_PASSWORD
    ) {
      
      token = jwt.sign(
        { role: "admin", username: "admin" },
        process.env.secret_key,
        {
          expiresIn: "1h",
        }
      );

      res.status(200).json({ message: "Logged in as admin", token });
    } else {
     
      const {firstname, password } = req.body;

      const teacher = await Teachers.findOne({ 'fullname.firstname': firstname });

      if (!teacher) {
        throw new Error("Not authenticated");
      }

 
      await PasswordManager.compare(password, teacher.password);

      
      token = jwt.sign(
        { role: "teacher", username: teacher.firstname, id: teacher._id },
        process.env.secret_key,
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
