var express = require('express')
var router = express.Router();
var { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers')

// route to get a list of todos for the user from the database 
router.get('/', getTodos);

// route to create a new todo for the user in the database
router.post('/', createTodo);

// route to update an existing  todos for the user in the database
router.put('/', updateTodo);
