import supertest from 'supertest'
import app from '../index'
import authenticationMiddleware from '../middleware/authentication.middleware'

// create a request object
const request = supertest(app)

describe('Test endpoint response', () => {
  it('test hello world endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})

describe('Test endpoint response', () => {
  it('Users Endpoints', async () => {
    const response = await request.get('/api/products')
    expect(response.status).toBe(200)
  })
})
