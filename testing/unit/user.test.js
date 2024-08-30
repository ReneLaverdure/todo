const userModel = require('../../models/userModel')
const userController = require('../../controllers/user.controller')
const mockHttp = require('node-mocks-http')
const userRegiserData = require('../mock-data/userRes.json')

jest.mock('../../models/userModel.js')


beforeEach(() => {
    let req = mockHttp.createRequest()
    let res = mockHttp.createResponse()

})

describe('userController has register function', () => {
    beforeEach(() => {
        req.body = userRegiserData
    })
    it('register function exist', async () => {
        expect(typeof userController.register).toBe('function')
    })
    it('register function called with right values ', async () => {
        await userController.register(req, res)
        expect(userModel.create).toBeCalledWith(userRegiserData)
    })
})

describe('userController has login function', () => {
    it('login fuction exist', async () => {
        expect(typeof userController.login).toBe('function')
    })
})
