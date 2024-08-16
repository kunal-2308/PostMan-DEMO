let mongoose = require('mongoose');

let connection = async() =>{
    try {
        await mongoose.connect('mongodb://localhost:27017/RestApi');
        console.log("Database Connected");
    } catch (error) {
        console.log(error);
    }
};
connection();