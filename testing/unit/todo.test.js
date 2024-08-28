const todoModel = require('../../models/todoModel')
const todoController = require('../../controllers/todo.controller')
const mockHttp = require('node-mocks-http')
const mockTodo = require('../mock-data/todo.json')
const mockTodoList = require('../mock-data/todo-list.json')
jest.mock('../../models/todoModel.js')

beforeEach(() => {
    let req = mockHttp.createRequest()
    let res = mockHttp.createResponse()

})

describe('createTodo controllers', () => {

    beforeEach(() => {
        req.body = mockTodo
    })

    it('createTodo function exist', async () => {
        expect(typeof todoController.createTodo).toBe('function')
    })
    it('create function called with correct value', async () => {
        await todoController.createTodo(req, res)
        expect(todoModel.create).toBeCalledWith(mockTodo)
    })
    it('return 201 status', async () => {
        await todoController.createTodo(req, res)
        expect(res.statusCode).toBe(201)
        expect(res._isEndCalled()).toBeTruthy()
    })
    it('should return json body of newly created todo', async () => {
        todoModel.create.mockReturnValue(mockTodo)
        await todoController.createTodo(req, res)
        expect(res._getJSONData()).toEqual(mockTodo)
        expect(res.body).toEqual(mockTodo)

    })
    it('handle errors', async () => {
        const errorMessage = { message: 'property missing' }
        const rejectedPromise = Promise.reject(errorMessage)
        todoModel.create.mockReturnValue(rejectedPromise)
        await todoController.createTodo(req, res)
        expect(next).toBeCalledWith(errorMessage)
    })
})

describe('getAllTodo controllers', () => {
    it('getAllTodo function exist', async () => {
        expect(typeof todoController.getAllTodo).toBe('function')
    })

    it('getAllTodo function called with correct value', async () => {
        await todoController.getAllTodo(req, res)
        expect(todoModel.find).toBeCalledWith(mockTodo)
    })
    it('return 201 status', async () => {
        await todoController.getAllTodo(req, res)
        expect(res.statusCode).toBe(201)
        expect(res._isEndCalled()).toBeTruthy()
    })
    it('return json body list of todos', async () => {
        todoModel.find.mockReturnValue(mockTodoList)
        await todoController.getAllTodo(req, res)
        expect(res._getJSONData()).toEqual(mockTodoList)
        expect(res.body).toEqual(mockTodoList)
    })
    it('handle errors', async () => {
        const errorMessage = { message: 'failed to get data' }
        const rejectedPromise = Promise.reject(errorMessage)
        todoModel.find.mockReturnValue(rejectedPromise)
        await todoController.getAllTodo(req, res)
        expect(next).toBeCalledWith(errorMessage)
    })
})


describe('getSingleTodo controllers', () => {
    it('getSingleTodo function exist', async () => {
        expect(typeof todoController.getSingleTodo).toBe('function')
    })
})


describe('updateTodo controllers', () => {
    it('updateTodo function exist', async () => {
        expect(typeof todoController.updateTodo).toBe('function')
    })
})


describe('deleteTodo controllers', () => {
    it('deleteTodo function exist', async () => {
        expect(typeof todoController.deleteTodo).toBe('function')
    })
})


