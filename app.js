// require express library
const express = require('express'); 

// require route

const student_route = require('./route/student_route'); // this for student route
const student_todos_route = require('./route/student_todos');// this for student's todo route

// require JWT auth Service
const auth = require('./service/auth_service');

// require error handler 
const errorHandler = require('./utils/errorHandler');

// create instance of an express, then assign to app variable
const app = express();

// require cors package
const cors = require('cors');

// use cors middleware to enable CORS with various options
app.use(cors({ origin: "*"}))

//use express.json() middleware to parses incoming requests with JSON payloads 
//and is based on body-parser
app.use(express.json());

// if request come from "localhost:3000/student", then it gose to student_route
app.use("/student" , student_route);

// if request come from "localhost:3000/todos", then it gose to student_todos_route
app.use("/todos" , auth,  student_todos_route);

// use errorhandler middleware to handle errors   
app.use( errorHandler )

// this is the prot that server is running on
const PORT = 3000;

// finally start the server on 3000 prot
app.listen(PORT, () => {
    console.log(` server is running on port ${PORT} ...`);
})
