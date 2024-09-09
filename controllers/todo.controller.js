const todoModel = require('../models/todoModel')

exports.createTodo = async (req, res) => {
    const { userId } = req.user
    const { name } = req.body

    const todo = await todoModel.create({ name, createdBy: userId })

    res.status(200).json(todo)
}

exports.getAllTodo = async (req, res) => {
    const { userId } = req.user
    const todoList = await todoModel.find({ createdBy: userId })

    res.status(200).json(todoList)
}

exports.getSingleTodo = async (req, res) => {
    const { id: todoId } = req.params
    const { userId } = req.user

    const todo = await todoModel.findOne({ createdBy: userId, _id: todoId })
    res.status(200).json(todo)
}

exports.updateTodo = async (req, res) => {
    const { userId } = req.user
    const { id: todoId } = req.params

    const filter = { _id: todoId, createdBy: userId }
    const update = { ...req.body }
    const options = { new: true, runValidators: true }
    const updatedTodo = await todoModel.findOneAndUpdate(filter, update, options)

    res.status(200).json(updatedTodo)
}

exports.deleteTodo = async (req, res) => {
    const { userId } = req.user
    const { id: todoId } = req.params

    const deletedTodo = await todoModel.findOneAndDelete({ _id: todoId, createdBy: userId })
    res.status(200).json(deletedTodo)
}
