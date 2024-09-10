const todoModel = require('../../models/todoModel')
const todoController = require('../../controllers/todo.controller')
const mockHttp = require('node-mocks-http')
const mockTodo = require('../mock-data/todo.json')
const mockTodoList = require('../mock-data/todo-list.json')
jest.mock('../../models/todoModel.js')

const singleTodo = {
    "name": "talk/visit a friend",
    "done": false,
    "createdBy": "64d27c9f8c91f73b3b2f3e5e"
}

let req, res;
beforeEach(() => {
    req = mockHttp.createRequest()
    res = mockHttp.createResponse()
    req.user = { userId: "64d27c9f8c91f73b3b2f3e5e" }
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
        expect(todoModel.create).toBeCalledWith({ name: mockTodo.name, createdBy: req.user.userId })
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


    })
    it('handle errors', async () => {
        //     const errorMessage = { message: 'property missing' }
        //     const rejectedPromise = Promise.reject(errorMessage)
        //     todoModel.create.mockReturnValue(rejectedPromise)
        //     await todoController.createTodo(req, res)
        //     expect(next).toBeCalledWith(errorMessage)
    })
})

describe('getAllTodo controllers', () => {
    it('getAllTodo function exist', async () => {
        expect(typeof todoController.getAllTodo).toBe('function')
    })

    it('getAllTodo function called with correct value', async () => {
        await todoController.getAllTodo(req, res)
        expect(todoModel.find).toBeCalledWith({ createdBy: req.user.userId })
    })
    it('return 200 status', async () => {
        await todoController.getAllTodo(req, res)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
    })
    it('return json body list of todos', async () => {
        todoModel.find.mockReturnValue(mockTodoList)
        await todoController.getAllTodo(req, res)
        expect(res._getJSONData()).toEqual(mockTodoList)

    })
    it('handle errors', async () => {
        // const errorMessage = { message: 'failed to get data' }
        // const rejectedPromise = Promise.reject(errorMessage)
        // todoModel.find.mockReturnValue(rejectedPromise)
        // await todoController.getAllTodo(req, res)
        // expect(next).toBeCalledWith(errorMessage)
    })
})


describe('getSingleTodo controllers', () => {
    beforeEach(() => {
        req.params.id = "64d27c9f8c91f73b3b2f3e5e"
    })
    it('getSingleTodo function exist', async () => {
        expect(typeof todoController.getSingleTodo).toBe('function')
    })
    it('getSingleTodo function called with correction values', async () => {
        await todoController.getSingleTodo(req, res)
        expect(todoModel.findOne).toBeCalledWith({ createdBy: req.user.userId, _id: req.params.id })
    })
    it('return 200 status', async () => {
        await todoController.getSingleTodo(req, res)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
    })
    it('return single todos', async () => {
        todoModel.findOne.mockReturnValue(singleTodo)
        await todoController.getSingleTodo(req, res)
        expect(res._getJSONData()).toEqual(singleTodo)

    })
    // error handling testing
})


describe('updateTodo controllers', () => {
    beforeEach(() => {
        req.params.id = "64d27c9f8c91f73b3b2f3e5e"
    })
    it('updateTodo function exist', async () => {
        expect(typeof todoController.updateTodo).toBe('function')
    })
    it('updateTodo function called with correction values', async () => {

        const filter = { _id: req.params.id, createdBy: req.user.userId }
        const update = { ...req.body }
        const options = { new: true, runValidators: true }
        await todoController.updateTodo(req, res)
        expect(todoModel.findOneAndUpdate).toBeCalledWith(filter, update, options)
    })
    it('return 200 status', async () => {
        await todoController.updateTodo(req, res)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
    })
    it('return single todos', async () => {

        const filter = { _id: req.params.id, createdBy: req.user.userId }
        const options = { new: true, runValidators: true }
        const updatedTodo = {
            name: "updated todo item",
            done: true
        }
        req.body = updatedTodo
        todoModel.findOneAndUpdate.mockReturnValue(filter, updatedTodo, options)
        await todoController.updateTodo(req, res)
        expect(res._getJSONData()).toBeTruthy()

    })
    // error handling testing
})


describe('deleteTodo controllers', () => {
    beforeEach(() => {
        req.params.id = "64d27c9f8c91f73b3b2f3e5e"
    })
    it('deleteTodo function exist', async () => {
        expect(typeof todoController.deleteTodo).toBe('function')
    })
    it('deleteTodo function called with correction values', async () => {
        await todoController.deleteTodo(req, res)
        expect(todoModel.findOneAndDelete).toBeCalledWith({ _id: req.params.id, createdBy: req.user.userId })
    })
    it('return 200 status', async () => {
        await todoController.deleteTodo(req, res)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
    })
    it('return single todos', async () => {
        todoModel.findOneAndDelete.mockReturnValue({ _id: req.params.id, createdBy: req.user.userId })
        await todoController.deleteTodo(req, res)
        expect(res._getJSONData()).toBeTruthy()

    })
    // error handling testing
})


