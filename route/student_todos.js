const express = require('express');
const student_todos_route = express.Router();
const student_todos_controller = require('../controller/stundet_todos_controller');

student_todos_route.route("/student/:s_id")
	.get(student_todos_controller.getTodos) // get all todo for student

student_todos_route.route("/student")
	.post(student_todos_controller.addNewTodo); // create new todo task


student_todos_route.route("/:t_id")
	.get(student_todos_controller.getTodoDetails) // get details of particular todo item
	.delete(student_todos_controller.deleteTodo) // delete todo item by t_id
	.put(student_todos_controller.updateTodoDetails) // update todo item


module.exports = student_todos_route;