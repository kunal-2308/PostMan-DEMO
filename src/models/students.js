let mongoose = require('mongoose');
let validator = require('validator');

//creating a schema Validator:
let Schema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : [2,"Minimum length of name must be 2 characters"],
    },
    email : {
        type : String,
        required : true,
        unique : [true,"User with this already exists"],
        validate(value){
            let res = validator.isEmail(value);
            if(res==false){
                throw new Error("Enter a valid email address");
            }
        }
    },
    phone:{
        type : Number,
        min : 10,
        required:true,
    },
    address :{
        type:String,
        required : true,
        minlength:[4,"Address must be atleast 4 characters long"],
    }
});


//creating a model :
let studentModel = new mongoose.model('student',Schema);

module.exports = studentModel;