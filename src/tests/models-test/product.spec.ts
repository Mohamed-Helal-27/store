import ProductModel from '../../models/product.model'
import db from '../../database'
import Product from '../../types/products.type'

const productModel = new ProductModel()

describe('Products Model', () => {
  describe('test methods exists', () => {
    it('should have an get Many products method', () => {
      expect(productModel.getMany).toBeDefined()
    })
    it('should have a get one product method', () => {
      expect(productModel.getOne).toBeDefined()
    })
    it('should have create new product', () => {
      expect(productModel.create).toBeDefined()
    })
    it('should have update product method', () => {
      expect(productModel.updateOne).toBeDefined()
    })
    it('should have delete one product method', () => {
      expect(productModel.deleteOne).toBeDefined
    })
  })
  describe('test Products model logic', () => {
    const product = {
      name: 'cable3',
      price: 450
    } as Product
    beforeAll(async () => {
      const createdProduct = await productModel.create(product)
      product.id = createdProduct.id
    })
    afterAll(async () => {
      const connection = await db.connect()
      const sql = 'DELETE FROM products'
      await connection.query(sql)
      connection.release()
    })

    it('create method should return a new product', async () => {
      const createdProduct = await productModel.create({
        name: 'cable4',
        price: 450
      } as Product)
      const createdProduct2 = await productModel.create({
        name: 'cable5',
        price: 450
      } as Product)
      expect(createdProduct).toEqual({
        id: createdProduct.id,
        name: createdProduct.name,
        price: createdProduct.price
      } as Product)
      expect(createdProduct2).toEqual({
        id: createdProduct2.id,
        name: createdProduct2.name,
        price: createdProduct2.price
      } as Product)
    })
    it('get many method should return all available products in db', async () => {
      const products = await productModel.getMany()
      expect(products.length).toBe(3)
    })
    it('get one method should return one available product in db', async () => {
      const returnedProduct = await productModel.getOne(product.id as unknown as number)
      expect(returnedProduct.id).toBe(product.id)
      expect(returnedProduct.name).toBe(product.name)
      expect(returnedProduct.price).toBe(product.price)
    })

    it('update one method should return a product with edited attributes', async () => {
      const updatedProduct = await productModel.updateOne({
        ...product,
        name: 'cable6',
        price: 490
      })
      expect(updatedProduct.id).toBe(product.id)
      expect(updatedProduct.name).toBe('cable6')
      expect(updatedProduct.price).toBe(490)
    })

    it('delete one user method should delete product from db', async () => {
      const deleteProduct = await productModel.deleteOne(product.id as unknown as number)
      expect(deleteProduct.id).toBe(product.id)
    })
  })
})
