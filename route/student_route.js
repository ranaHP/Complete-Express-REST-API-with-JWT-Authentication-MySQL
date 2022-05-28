const express = require('express');
const student_route = express.Router();
const student_controller = require('../controller/stundet_controller');

// student_route.post("/" , student_controller.student_register);
// student_route.get("/" , student_controller.student_login);


student_route.route("/")
    .post(student_controller.student_register)
    .get(student_controller.student_login)

module.exports = student_route;