const todoController = require('../controllers/todo.controller')
const express = require('express')
const router = express.Router()

router.route('/')
    .get(todoController.getAllTodo)
    .post(todoController.createTodo)
router.route('/:id')
    .get(todoController.getSingleTodo)
    .patch(todoController.updateTodo)
    .delete(todoController.deleteTodo)

module.exports = router
