const mongoose=require("mongoose");


const schema=new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true
        },
        lastname:{
            type: String,
           required: true
        },
    },
    email:{
        type: String,
        required: true,
    
    },
    password:{
        type: String, 
       required: true
    },
    role:{
        type:String,
        enum:['teacher']
    },
    image:String,
    
});
module.exports=mongoose.model("teachers",schema);