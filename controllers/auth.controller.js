const userModel = require('../models/userModel')
const { BadRequest } = require('../utils/errors')

exports.register = async (req, res) => {
    try {

        const user = await userModel.create({ ...req.body })
        const token = user.createJWT()
        res.status(200).json({ user: user.username, token })
    } catch (err) {
        console.log(err)
        res.status(404).json({ errorMessage: 'register route error' })
    }

}

exports.login = async (req, res) => {
    console.log('login route')
    const { username, password } = req.body

    if (!password || !username) {
        throw new BadRequest('please username and password')
    }

    let user = await userModel.findOne({ username })
    if (!user) {
        throw new BadRequest('user does not exist')
    }

    let match = await user.comparePassword(password)
    if (!match) {
        throw new BadRequest('password is incorrect')
    }

    const token = user.createJWT()
    res.status(200).json({ user: user.username, token })

}
