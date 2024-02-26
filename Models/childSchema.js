const mongoose=require("mongoose");


const schema=new mongoose.Schema({
    _id:Number,
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
    age:{
        type:Number
    },
    level:{
        type: String,
        enum: ['PreKG', 'KG1','KG2'],
        required: true
    },
    address: {
        city: {
            type: String
        },
        street: {
            type: String
        },
        building: {
            type: String
        }
    }
    
    
});
module.exports=mongoose.model("children",schema);