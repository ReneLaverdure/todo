const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please provide a username'],
        min: [4, 'username must have a minimum of 4 characters'],
        max: [16, 'username cannot be longer than 16 characters']
    },
    email: {
        type: String,
        required: [true, 'please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please provide a valid email'
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'pealse provide a password'],
        min: [4, 'password must have a minimum of 4 characters'],
        max: [16, 'password cannot be longer than 16 characters']
    }
})


userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, username: this.username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME
    })
}

userSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password)

    // bcrypt.compare(password, this.password).then((res) => {
    //     console.log(res)
    // })

    return isMatch
}

const userModel = mongoose.model('User', userSchema)
module.exports = userModel
