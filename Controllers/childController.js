const Child=require("../Models/childSchema");

exports.getallChildren=((req, res,next) => {
    Child.find({})
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error=>next(error));

});

exports.addnewChild=((req, res,next) => {
    const object=new Child(req.body);
    object.save()
    .then(data=>{
        res.status(201).json(data)
    })
    .catch(error=>next(error));
});

exports.updateChildData = async (req, res) => {
    try {
        const { _id, fullname, age, level, address } = req.body;

        const child = await Child.findOne({ _id });

        if (!child) {
            return res.status(404).json({ error: 'Child not found' });
        }

        
        child.fullname = fullname;
        child.age = age;
        child.level = level;
        child.address = address;

        // Save the changes to the database
        await child.save();

        res.status(200).json({ data: 'Child updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.deleteChild = async (req, res) => {
    try {
        const { _id } = req.body;

        const child = await Child.findOne({ _id });

        if (!child) {
            return res.status(404).json({ error: 'Child not found' });
        }

        // Delete the child from the database
        await child.deleteOne();

        res.status(200).json({ data: "Child deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getChildById=((req, res) => {
    Child.findOne({_id:req.params.id})
    .then(data=>{
           if(!data)
           throw new Error("id doesn't Exists");

           res.status(200).json(data);

    })
    .catch(error=>next(error))

});



