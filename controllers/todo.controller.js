const todoModel = require('../models/todoModel')

exports.createTodo = async (req, res) => {
    console.log('create todo route')
    res.status(200).send('create todo route')
}

exports.getAllTodo = async (req, res) => {

    console.log('get all todo route')
    res.status(200).send('get all todo route')
}

exports.getSingleTodo = async (req, res) => {

    console.log('get single todo route')
    res.status(200).send('get single todo route')
}

exports.updateTodo = async (req, res) => {

    console.log('update todo route')
    res.status(200).send('update todo route')
}

exports.deleteTodo = async (req, res) => {
    console.log('delete todo route')
    res.status(200).send('delete todo route')

}
