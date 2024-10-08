const userController = require('../controllers/auth.controller')
const express = require('express')
const router = express.Router()

router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router
