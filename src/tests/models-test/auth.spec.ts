import UserModel from '../../models/user.model'
import db from '../../database'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('Authentication Model', () => {
  describe('test method exists', () => {
    it('should have authenticate User method', () => {
      expect(userModel.authenticate).toBeDefined()
    })
  })
  describe('test authentication logic', () => {
    const user = {
      email: 'test@test.com',
      user_name: 'rahmou',
      first_name: 'ahmed',
      last_name: 'rahmou',
      password: '123456'
    } as User
    beforeAll(async () => {
      const createUser = await userModel.create(user)
      user.id = createUser.id
    })
    afterAll(async () => {
      const connection = await db.connect()
      const sql = 'DELETE FROM users'
      await connection.query(sql)
      connection.release()
    })
    it('Authenticate method should return the authentication user', async () => {
      const authenticatedUser = await userModel.authenticate(
        user.user_name,
        user.password as string
      )
      expect(authenticatedUser?.email).toBe(user.email)
      expect(authenticatedUser?.user_name).toBe(user.user_name)
      expect(authenticatedUser?.first_name).toBe(user.first_name)
      expect(authenticatedUser?.last_name).toBe(user.last_name)
    })
    it('Authinticate method should return null for wrong username or password', async () => {
      const authenticatedUser = await userModel.authenticate(
        'Ahmed_Rahmou@gmail.com',
        'fake_password'
      )
      expect(authenticatedUser).toBe(null)
    })
  })
})
