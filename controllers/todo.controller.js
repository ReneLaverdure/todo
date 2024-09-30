const todoModel = require('../models/todoModel')
const { BadRequest } = require('../utils/errors')


exports.createTodo = async (req, res) => {
    const { userId } = req.user
    const { name } = req.body

    if (!name) {
        throw new BadRequest('no todo name')
    }

    try {
        const todo = await todoModel.create({ name, createdBy: userId })
        res.status(201).json(todo)
    } catch (err) {
        throw new BadRequest('property missing')
    }

}

exports.getAllTodo = async (req, res) => {
    const { userId } = req.user

    if (!userId) {
        throw new BadRequest('user id property missing')
    }

    try {
        const todoList = await todoModel.find({ createdBy: userId })
        res.status(200).json(todoList)
    } catch (err) {
        console.error(err)
        throw new BadRequest('cannot find todo list')
    }
}

exports.getSingleTodo = async (req, res) => {
    const { id: todoId } = req.params
    const { userId } = req.user

    if (!todoId || !userId) {
        throw new BadRequest('todo id doesnt exist')
    }

    try {
        const todo = await todoModel.findOne({ createdBy: userId, _id: todoId })
        res.status(200).json(todo)
    } catch (err) {
        console.error(err)
        throw new BadRequest('todo id doesnt exist')
    }

}

exports.updateTodo = async (req, res) => {
    const { userId } = req.user
    const { id: todoId } = req.params

    if (!userId || !todoId) {
        throw new BadRequest('todoId or userId property missing')
    }

    const filter = { _id: todoId, createdBy: userId }
    const update = { ...req.body }
    const options = { new: true, runValidators: true }

    try {
        const updatedTodo = await todoModel.findOneAndUpdate(filter, update, options)
        res.status(200).json(updatedTodo)
    } catch (err) {
        console.error(err)
        throw new BadRequest('cannot find and update todo')
    }
}

exports.deleteTodo = async (req, res) => {
    const { userId } = req.user
    const { id: todoId } = req.params

    if (!userId || !todoId) {
        throw new BadRequest('todoId or userId property missing')
    }

    try {
        const deletedTodo = await todoModel.findOneAndDelete({ _id: todoId, createdBy: userId })
        res.status(200).json(deletedTodo)
    } catch (err) {
        console.error(err)
        throw new BadRequest('cannot find and delete todo')
    }
}
