const mongoose = require('mongoose')

const main = async (url) => {
    try {
        await mongoose.connect(url)
        console.log('successful connection to database')
    } catch (err) {
        console.log(err)
    }
}

module.exports = main
