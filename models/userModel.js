const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please provide a username'],
        min: [4, 'username must have a minimum of 4 characters'],
        max: [16, 'username cannot be longer than 16 characters']
    },
    password: {
        type: String,
        required: [true, 'pealse provide a password'],
        min: [4, 'password must have a minimum of 4 characters'],
        max: [16, 'password cannot be longer than 16 characters']
    }
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
