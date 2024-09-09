const userModel = require('../../models/userModel')
const authController = require('../../controllers/auth.controller')
const mockHttp = require('node-mocks-http')
const userRegiserData = require('../mock-data/userRes.json')

jest.mock('../../models/userModel.js')


beforeEach(() => {
    let req = mockHttp.createRequest()
    let res = mockHttp.createResponse()

})

describe('authController has register function', () => {
    it('register function exist', async () => {
        expect(typeof authController.register).toBe('function')
    })
    it('register function called with right values ', async () => {
        await authController.register(req, res)
        expect(userModel.create).toBeCalledWith(userRegiserData)
    })
})

describe('authController has login function', () => {
    it('login fuction exist', async () => {
        expect(typeof authController.login).toBe('function')
    })
})
