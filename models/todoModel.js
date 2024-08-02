const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide a todo name']
    },
    done: Boolean,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide a user']
    }
})

const todoModel = mongoose.model('todo', todoSchema)

module.exports = todoModel
