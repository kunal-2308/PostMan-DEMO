//INCLUDES :
let express = require('express');
let PORT = process.env.PORT || 8000;
let app = express();
require('./db/connection');
let StudentCollection = require('./models/students');

//to handle incoming POST request and tell that incoming reqbody is  JSON we use middleware :
app.use(express.json());

//craete a new student/register a new student :
app.post('/students',(req,res)=>{
    //creating a new user document in StudentCollection :
        let registerUser = async() =>{
            try {
                let student = new StudentCollection(req.body);
                await student.save();
                res.status(200).send(`Student : ${req.body.name} registered successfully`);
            } catch (error) {
                res.status(400).send(error);
            }
        }
        registerUser();
});

//Get List of all students : 
app.get('/students',(req,res)=>{
    let getAllStudents = async() =>{
        try {
            let studentList = await StudentCollection.find();
            res.status(200).send(studentList);
        } catch (error) {
            res.status(400).send(error);
        }
    };
    getAllStudents();
});

//fetch the info about a single student : USING ID

/*
app.get('/students/:id',(req,res)=>{
    let _id = req.params.id;
   
    let getStudent = async() =>{
        try {
            let studentData = await StudentCollection.findById(_id);
            if(studentData){
                res.status(200).send(studentData);
            }
            else{
                res.status(400).send("Student With This ID Not Found!");
            }
        }
         catch (error) {
            res.status(400).send(error);
        }
    };
    getStudent();
});
*/

//fetch the info about a single student : USING Name

app.get('/students/:name',(req,res)=>{
    const name = req.params.name;

    let findStudent = async() =>{
        try {
            let studentData = await StudentCollection.find({"name":name});
            res.status(200).send(studentData);
        } catch (error) {
            res.status(400).send(error);
        }
    };
    findStudent();
});




app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Listening at PORT : ",PORT);
    }
});