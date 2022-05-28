const express = require('express');
const student_route = require('./route/student_route');
const student_todos_route = require('./route/student_todos');
const auth = require('./service/auth_service');
const errorHandler = require('./utils/errorHandler');
const app = express();

const cors = require('cors');

app.use(cors({ origin: "*"}))

app.use(express.json());


app.use("/student" , student_route);
app.use("/todos" , student_todos_route);

app.use( errorHandler )

const PORT = 3000;

app.listen(PORT, () => {
    console.log(` server is running on port ${PORT} ...`);
})


// localhost:3000/