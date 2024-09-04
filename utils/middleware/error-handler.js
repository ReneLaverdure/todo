const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log('handling error =======================')
    if (err instanceof CustomAPIError) {
        return res.status(err.StatusCodes).json({ msg: err.message })
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong. Try again later')
}

module.exports = errorHandlerMiddleware
