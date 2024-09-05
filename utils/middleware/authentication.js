
const jwt = require('jsonwebtoken')
const { BadRequest } = require('../errors/index')

// change BadRequest to unAuthenticatedError
const authentication = async (err, req, res, next) => {
    const authHeader = req.headers.authoriation
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new BadRequest('authenication invalid')
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId, username: payload.username }
        next()
    } catch (e) {
        throw new BadRequest('authentication invalid')
    }
}

module.exports = authentication
