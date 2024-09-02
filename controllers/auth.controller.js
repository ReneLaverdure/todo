const userModel = require('../models/userModel')

exports.register = async (req, res) => {
    console.log('register route')
    res.status(200).send('register route')
}

exports.login = async (req, res) => {
    console.log('login route')
    res.status(200).send('login route')
}
