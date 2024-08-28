const userModel = require('../../models/userModel')
const userController = require('../../controllers/user.controller')


jest.mock('../../models/userModel.js')

describe('userController has register function', () => {
    it('register function exist', async () => {
        expect(typeof userController.register).toBe('function')
    })
})

