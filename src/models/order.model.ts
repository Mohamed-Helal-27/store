import Order from '../types/orders.types'
import db from '../database'

class OrderModel {
  async create(o: Order): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO orders (status, user_id) VALUES ($1, $2) returning *`
      const result = await connection.query(sql, [o.status, o.user_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('Unable to create Order')
    }
  }
  //GET All orders
  async getMany(): Promise<Order[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT * FROM orders'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Error you can't seel all orders ${(error as Error).message}`)
    }
  }
  //GET Spacefic Order
  async getOne(id: number): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT * FROM orders WHERE id = ($1)'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`You can't get this order details ${(error as Error).message}`)
    }
  }
  //Update one Order
  async updateOne(o: Order): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE orders SET status=$1, user_id=$2 WHERE id=$3 RETURNING *`
      const result = await connection.query(sql, [o.status, o.user_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`you can't update this order ${(error as Error).message}`)
    }
  }
  async deleteOne(id: number): Promise<Order> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM order WHERE id =($1) RETURNING *`
      const result = await connection.query(sql, [id])
      return result.rows[0]
    } catch (error) {
      throw new Error(`you can't delete this order ${(error as Error).message}`)
    }
  }
}

export default OrderModel
