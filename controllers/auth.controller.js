const userModel = require('../models/userModel')

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
    res.status(200).send('login route')
}
