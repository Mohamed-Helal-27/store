import db from '../database/index'
import User from '../types/user.type'
import config from '../config'
import bcrypt from 'bcrypt'

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

class UserModel {
  //create user
  async create(u: User): Promise<User> {
    try {
      // opening connection with database
      const connection = await db.connect()
      // start query to insert new data
      const sql = `INSERT INTO users (email, user_name, first_name, last_name, password)
            VALUES ($1, $2, $3, $4, $5) returning id, email, user_name, first_name, last_name, password`
      // run the query
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassword(u.password)
      ])
      // close connection by use release
      connection.release()
      // returning results
      return result.rows[0]
    } catch (error) {
      throw new Error(`You can not add this user ${(error as Error).message}`)
    }
  }
  // Get All Users
  async getMany(): Promise<User[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT id, email, user_name, first_name, last_name from users'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Error You Can not see all users ${(error as Error).message}`)
    }
  }
  // Get Spacefic User
  async getOne(id: number): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `SELECT id, email, first_name, last_name FROM users WHERE id = ($1)`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `You can't see information about this user ${id}, ${(error as Error).message}`
      )
    }
  }
  // Update User
  async updateOne(u: User): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE users
      SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5
      WHERE id=$6
      RETURNING id, email, user_name, first_name, last_name`
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashPassword(u.password),
        u.id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`You Can't Update this user ${(error as Error).message}`)
    }
  }
  // Delete User
  async deleteOne(id: number): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = 'DELETE FROM users WHERE id = ($1) RETURNING id, email, first_name, last_name'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`You can't delete this user ${id}, ${(error as Error).message}`)
    }
  }
  //authenticate User
  async authenticate(user_name: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT password FROM users where user_name=$1'
      const result = await connection.query(sql, [user_name])
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0]
        const isPasswordValid = bcrypt.compareSync(`${password}${config.pepper}`, hashPassword)
        if (isPasswordValid) {
          const userInfo = await connection.query(
            'SELECT id, email, user_name, first_name, last_name FROM users WHERE user_name=($1)',
            [user_name]
          )
          return userInfo.rows[0]
        }
      }
      connection.release()
      return null
    } catch (error) {
      throw new Error(`no authintication ${(error as Error).message}`)
    }
  }
}

export default UserModel
