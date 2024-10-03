const request = require('supertest')
const app = require('../../app')
const newTodo = require('../mock-data/todo.json')

const todoEndpoint = "/api/todo"
const authEndpoint = "/api/auth"

let user, todo;
const nonExistingTodoId = "5d5fff416bef3c07ecf11f77";

describe('testing todo flow', () => {
    it('get user token', async () => {
        const response = await request(app)
            .post(authEndpoint + '/login')
            .send({
                "username": "tunable",
                "password": "qwerty123"
            })


        user = response.body
        expect(response.status).toBe(200)
        expect(typeof response.body).toBe('object')
    })
    it('create new todo without authentication', async () => {
        const response = await request(app)
            .post(todoEndpoint)
            .send(newTodo)

        expect(response.body).toEqual({ msg: 'authenication invalid' })
    })
    it('create new todo', async () => {
        const response = await request(app)
            .post(todoEndpoint)
            .set('Authorization', `Bearer ${user.token}`)
            .send(newTodo)

        console.log(response.body)
        expect(response.body.name).toEqual('RENE LAVERDURE')
        expect(response.status).toBe(201)
    })
    it('get list of all todos', async () => {
        const response = await request(app)
            .get(todoEndpoint)
            .set('Authorization', `Bearer ${user.token}`)


        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body[0].name).toBeDefined()
        expect(response.body[0].done).toBeDefined()
        todo = response.body[0]
    })
    it('get todo by id', async () => {
        const response = await request(app)
            .get(todoEndpoint + '/' + todo._id)
            .set('Authorization', `Bearer ${user.token}`)

        expect(response.status).toBe(200)
        expect(response.body).toEqual(todo)

    })
    it('should return error for non existing todo', async () => {
        const response = await request(app)
            .get(todoEndpoint + '/' + nonExistingTodoId)
            .set('Authorization', `Bearer ${user.token}`)

        console.log(response.body)
        expect(response.status).toBe(400)
        expect(response.body).toEqual({ msg: 'todo id doesnt exist' })
    })
    it('update todo', async () => {
        const updateTodo = { name: 'updating the todo from supertest testing' }
        const response = await request(app)
            .patch(todoEndpoint + '/' + todo._id)
            .set('Authorization', `Bearer ${user.token}`)
            .send(updateTodo)

        todo = response.body
        expect(response.status).toBe(200)
        expect(response.body.name).toBe(updateTodo.name)
    })
    it('should return error for non existant todo update', async () => {
        const updateTodo = { name: 'updating the todo from supertest testing' }
        const response = await request(app)
            .patch(todoEndpoint + '/' + nonExistingTodoId)
            .set('Authorization', `Bearer ${user.token}`)
            .send(updateTodo)


        expect(response.status).toBe(400)
        expect(response.body).toEqual({ msg: 'cannot find and update todo' })
    })
    it('delete todo', async () => {
        const response = await request(app)
            .delete(todoEndpoint + '/' + todo._id)
            .set('Authorization', `Bearer ${user.token}`)

        expect(response.body).toEqual(todo)
    })
    it('delete non existed todo should return error', async () => {
        const response = await request(app)
            .delete(todoEndpoint + '/' + todo._id)
            .set('Authorization', `Bearer ${user.token}`)

        console.log(response.body)
        expect(response.body).toEqual(null)
    })

})
