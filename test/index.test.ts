import { RawServerDefault } from 'fastify'
import request from 'supertest'
import { app } from '../src/app'

let server: RawServerDefault

beforeAll(async () => {
    await app.ready()
    server = app.server
})

afterAll(() => {
    server.close()
})

test('Should get a 200 OK', async () => {
    const response = await request(server).get('/ping')
    expect(response.status).toBe(200)
})
