import supertest from 'supertest'
import db from '../../database'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'
import app from '../../index'

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
    it('should be failed to authenticate with wrong email', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          user_name: 'rahmou23',
          password: 'test1233'
        })
      expect(res.status).toBe(401)
    })
  })
  describe('Test CRUD API methods', () => {
    it('should create new user', async () => {
      const res = await request
        .post('/api/users/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'test2@test.com',
          user_name: 'rahmou2',
          first_name: 'ahmed2',
          last_name: 'rahmou2',
          password: 'test123'
        } as User)
      expect(res.status).toBe(200)
      const { email, user_name, first_name, last_name } = res.body.data
      expect(email).toBe('test2@test.com')
      expect(user_name).toBe('rahmou2')
      expect(first_name).toBe('ahmed2')
      expect(last_name).toBe('rahmou2')
    })
    it('should get list of users', async () => {
      const res = await request
        .get('/api/users/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.length).toBeGreaterThan(1)
    })
    it('should get user info', async () => {
      const res = await request
        .get(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.last_name).toBe('rahmou')
      expect(res.body.data.email).toBe('test@test.com')
    })
    it('should update the user', async () => {
      const res = await request
        .get(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_name: 'hamada',
          first_name: 'ahmed3',
          last_name: 'rahmou5'
        })
      expect(res.status).toBe(200)
      const { id, email, first_name, last_name } = res.body.data
      expect(id).toBe(user.id)
      expect(email).toBe(user.email)
      expect(first_name).toBe('ahmed')
      expect(last_name).toBe('rahmou')
    })
    it('should delete user', async () => {
      const res = await request
        .delete(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.id).toBe(user.id)
      expect(res.body.data.last_name).toBe('rahmou')
    })
  })
})
