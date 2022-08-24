import UserModel from '../../models/user.model'
import db from '../../database'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('User Model', () => {
  describe('test methods exists', () => {
    it('should have an get Many users method', () => {
      expect(userModel.getMany).toBeDefined()
    })
    it('should have a get one user method', () => {
      expect(userModel.getOne).toBeDefined()
    })
    it('should have create new user', () => {
      expect(userModel.create).toBeDefined()
    })
    it('should have update user method', () => {
      expect(userModel.updateOne).toBeDefined()
    })
    it('should have delete one user method', () => {
      expect(userModel.deleteOne).toBeDefined
    })
    it('should have an authenticate user method', () => {
      expect(userModel.authenticate).toBeDefined()
    })
  })
  describe('test user model logic', () => {
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
    it('create method should return a new user', async () => {
      const createdUser = await userModel.create({
        email: 'test10@test.com',
        user_name: 'rahmou',
        first_name: 'ahmed',
        last_name: 'rahmou',
        password: 'test123'
      } as User)
      expect(createdUser).toEqual({
        id: createdUser.id,
        email: createdUser.email,
        user_name: createdUser.user_name,
        first_name: createdUser.first_name,
        last_name: createdUser.last_name,
        password: createdUser.password
      } as User)
    })
    it('get many method should return all available users in db', async () => {
      const users = await userModel.getMany()
      expect(users.length).toBe(2)
    })
    it('get one method should return one available user in db', async () => {
      const returnedUser = await userModel.getOne(user.id as unknown as number)
      expect(returnedUser.id).toBe(user.id)
      expect(returnedUser.email).toBe(user.email)
      expect(returnedUser.first_name).toBe(user.first_name)
      expect(returnedUser.last_name).toBe(user.last_name)
    })
    it('update one method should return a user with edited attributes', async () => {
      const updatedUser = await userModel.updateOne({
        ...user,
        user_name: 'rahmou3',
        first_name: 'ahmed2',
        last_name: 'rahmou2'
      })
      expect(updatedUser.id).toBe(user.id)
      expect(updatedUser.email).toBe(user.email)
      expect(updatedUser.user_name).toBe('rahmou3')
      expect(updatedUser.first_name).toBe('ahmed2')
      expect(updatedUser.last_name).toBe('rahmou2')
    })

    it('delete one user method should delete user from db', async () => {
      const deleteUser = await userModel.deleteOne(user.id as unknown as number)
      expect(deleteUser.id).toBe(user.id)
    })
  })
})
