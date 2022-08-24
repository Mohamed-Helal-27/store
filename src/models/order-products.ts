import OrderProducts from '../types/order_product.types'
import db from '../database'

class OrderProductModel {
  async create(op: OrderProducts): Promise<OrderProducts> {
    try {
      const connection = await db.connect()
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) returning *'
      const result = await connection.query(sql, [op.quantity, op.order_id, op.product_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('Unable to add this product to order')
    }
  }
  // GET ALL ORDER-PRODUCTS
  async getMany(): Promise<OrderProducts[]> {
    try {
      const connection = await db.connect()
      const sql = `select order_products.quantity, products.name, products.price, concat(users.first_name,' ', users.last_name) as name, orders.status, (order_products.quantity * products.price) as total from order_products join orders on orders.id = order_id join products on products.id = product_id join users on users.id = user_id`
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Error you can't see all order-products ${(error as Error).message}`)
    }
  }
  //GET SPACEFIC PRODUCT-PRODUCTS
  async getOne(id: number): Promise<OrderProducts> {
    try {
      const connection = await db.connect()
      const sql = `select order_products.quantity, products.name, products.price, concat(users.first_name,' ', users.last_name) as name, orders.status, (order_products.quantity * products.price) as total from order_products join orders on orders.id = order_id join products on products.id = product_id join users on users.id = user_id where order_products.id = ($1)`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`You can't get this order-product ${(error as Error).message}`)
    }
  }
  // Update One product-order
  async updateOne(op: OrderProducts): Promise<OrderProducts> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE order_products SET quantity=$1, order_id=$2, product_id=$3 WHERE id = $4 RETURNING *`
      const result = await connection.query(sql, [op.quantity, op.order_id, op.product_id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`You can't update the product-order ${(error as Error).message}`)
    }
  }
  //DELETE Product-order
  async deleteOne(id: number): Promise<OrderProducts> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM order_products WHERE id =($1) RETURNING *`
      const result = await connection.query(sql, [id])
      return result.rows[0]
    } catch (error) {
      throw new Error(`You can't delete this order-product ${(error as Error).message}`)
    }
  }
}

export default OrderProductModel
