import Product from '../types/products.type'
import db from '../database'

class ProductModel {
  async create(p: Product): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = `INSERT INTO products(name, price) values ($1, $2) returning *`
      const result = await connection.query(sql, [p.name, p.price])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error('Unable to create product')
    }
  }
  //GET all products
  async getMany(): Promise<Product[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT id, name, price FROM products'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Error you can't see all products ${(error as Error).message}`)
    }
  }
  //GET spacefic Product
  async getOne(id: number): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = `SELECT id, name, price FROM products where id = ($1)`
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error you can't see this product ${(error as Error).message}`)
    }
  }
  //Update Product
  async updateOne(p: Product): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE products SET name=$1, price=$2 WHERE id=$3 RETURNING *`
      const result = await connection.query(sql, [p.name, p.price, p.id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`You can't update this product ${(error as Error).message}`)
    }
  }
  // Delete Product
  async deleteOne(id: number): Promise<Product> {
    try {
      const connection = await db.connect()
      const sql = 'DELETE FROM products WHERE id =($1) RETURNING *'
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`You can't delete this product ${(error as Error).message}`)
    }
  }
}

export default ProductModel
