const Class=require("../Models/classSchema");
const Teacher=require("../Models/teacherSchema");
const Child=require("../Models/childSchema");
exports.getallClasses=((req, res,next) => {
    Class.find({})
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error=>next(error));
});
exports.addClassData=((req, res) => {
    const class1=new Class(req.body);
    class1.save()
    .then(data=>{
        res.status(201).json(data)
    })
    .catch(error=>next(error));
    
});

exports.updateClassuser = async (req, res) => {
    try {
        const { _id, name, supervisor, children } = req.body;

        const class1 = await Class.findOne({ _id });

        if (!class1) {
            return res.status(404).json({ error: 'Class not found' });
        }

        // Update fields based on the request body
        class1.name = name;
        class1.supervisor = supervisor;
        class1.children = children;

        // Save the changes to the database
        await class1.save();

        res.status(200).json({ data: 'Class updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteClass=async (req, res) => {
    try {
        const { _id } = req.body;

        const class1 = await Class.findOne({ _id });

        if (!class1) {
            return res.status(404).json({ error: 'Child not found' });
        }

        // Delete the child from the database
        await class1.deleteOne();

        res.status(200).json({ data: 'Class deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getClassById=((req, res) => {
    Class.findOne({_id:req.params.id})
    .then(data=>{
           if(!data)
           throw new Error("id doesn't Exists");

           res.status(200).json(data);

    })
    .catch(error=>next(error))

});

exports.getClassChildren = async (req, res) => {
    try {
        const { classId } = req.params;

        const selectedClass = await Class.findOne({ _id: classId });

        if (!selectedClass) {
            return res.status(404).json({ error: 'Class not found' });
        }

        const childrenIds = selectedClass.children;

        if (!childrenIds || childrenIds.length === 0) {
            return res.status(404).json({ error: 'No children found for the specified class' });
        }

        // Query the Child model using the array of child IDs
        const childrenData = await Child.find({ _id: { $in: childrenIds } });

        res.status(200).json({ data: childrenData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.getClassTeacher= async (req, res) => {
    try {
        const { classId } = req.params;

        // Assuming 'className' corresponds to the 'name' field in the schema
        const selectedClass = await Class.findOne({ _id:classId }).populate('supervisor');

        if (!selectedClass) {
            return res.status(404).json({ error: 'Class not found' });
        }

        const teacher = selectedClass.supervisor;

        if (!teacher) {
            return res.status(404).json({ error: 'No teacher assigned to the specified class' });
        }

       
        const fullTeacherData = await Teacher.findById(teacher._id);

        if (!fullTeacherData) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        res.status(200).json({ data: fullTeacherData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


