const Teacher=require("../Models/teacherSchema");
const Class=require("../Models/classSchema");
const { PasswordManager } = require('../password');
const multer = require('multer');
const uuidv4 = require('uuid');
const path = require('path');
  

exports.getallTeachers=((req, res,next) => {
    Teacher.find({})
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error=>next(error));

});
exports.addnewTeacher = async (req, res, next) => {
    try {
        const {firstname, lastname, email, password } = req.body;
        const { file } = req;
        const hashedPassword = await PasswordManager.hash(password);
        const teacher = new Teacher({
            fullname: {
                firstname: firstname,
                lastname: lastname
            },
            email: email, 
            password: hashedPassword,
            image: (file && file.path) || null,
            role:"teacher"
        });

        const savedTeacher = await teacher.save();

        res.status(201).json(savedTeacher);
    } catch (error) {
        next(error);
    }
};

exports.changePassword = async (req, res, next) => {
    try {
  
      const { _id,currentPassword, newPassword } = req.body;
  
      const teacher = await Teacher.findById({_id});
      if (!teacher) {
        throw new Error('Teacher not found');
      }
  
      await PasswordManager.compare(currentPassword, teacher.password);
      teacher.password = newPassword;
      const updatedUser = await teacher.save();
  
      res.status(200).json({
        success: true,
        message: 'Password updated!',
        data: updatedUser
      });
    } catch (err) {
      next(err);
    }
};

exports.updateTeacherData=async (req, res) => {
    try {
        const { _id, fullname, age, email ,password} = req.body;
        const { file } = req;
        const teacher = await Teacher.findOne({ _id });

        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        
        teacher.fullname = fullname;
        teacher.age = age;
        teacher.email = email;
        teacher.password = password;
        //await PasswordManager.compare(password, teacher.password);
        teacher.image=(file && file.path) || null;

        // Save the changes to the database
        await teacher.save();

        res.status(200).json({ data: 'Teacher updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteTeacher=async (req, res) => {
    try {
        const { _id } = req.body;

        const teacher= await Teacher.findOne({ _id });

        if (!teacher) {
            return res.status(404).json({ error: 'Child not found' });
        }

        // Delete the child from the database
        await teacher.deleteOne();

        res.status(200).json({ data: "Child deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getteacherById=((req, res) => {
    Child.findOne({_id:req.params.id})
    .then(data=>{
           if(!data)
           throw new Error("id doesn't Exists");

           res.status(200).json(data);

    })
    .catch(error=>next(error))

});

exports.getAllSupervisors = async (req, res, next) => {
    try {
       
        const classes = await Class.find({}).populate({ path: 'supervisor', select: '_id' });
        const teacherIds = classes.reduce((ids, classData) => {
            if (classData.supervisor) {
                ids.push(classData.supervisor._id);
            }
            return ids;
        }, []);

        // Remove duplicates from the array
        const uniqueTeacherIds = [...new Set(teacherIds)];
        const supervisors = await Teacher.find({ _id: { $in: uniqueTeacherIds } });

        res.status(200).json({ supervisors });
    } catch (error) {
        console.error('Error in getAllSupervisors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



