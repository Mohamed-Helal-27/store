import supertest from 'supertest'
import app from '../..'
import db from '../../database'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'


const userModel = new UserModel()
const request = supertest(app)
let token = ''

describe('User API Endpoints', () => {
    const user = {
      email: 'test@test.com',
      user_name: 'rahmou',
      first_name: 'ahmed',
      last_name: 'rahmou',
      password: 'test123'
    } as User
  
    beforeAll(async () => {
      const createdUser = await userModel.create(user)
      user.id = createdUser.id
    })
    afterAll(async () => {
      const connection = await db.connect()
      const sql = 'DELETE FROM users'
      await connection.query(sql)
      connection.release()
    })
describe('Test Authentication method', () => {
    it('should be able to authenticate to get token', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          user_name: 'rahmou',
          password: 'test123'
        })
      expect(res.status).toBe(200)
      const { id, user_name, token: userToken } = res.body.data
      expect(id).toBe(user.id)
      expect(user_name).toBe(user.user_name)
      token = userToken
    })

describe("Test server (order) endpoint responses", () => {
    it("gets create endpoint", async () => {
        const response = await request.get("/api/orders")
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    })
    it("gets show endpoint", async () => {
        const response = await request.get("/api/orders/1")
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    })
    it("gets addProduct endpoint", async () => {
        const response = await request.post("/api/orders")
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    })
})
})
})