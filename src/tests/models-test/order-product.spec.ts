import OrderProductModel from '../../models/order-products'
import db from '../../database'
import OrderProducts from '../../types/order_product.types'

const orderProductModel = new OrderProductModel()

describe('orders Model', () => {
    describe('test methods exists', () => {
        it('should have an get Many orders method', () => {
            expect(orderProductModel.getMany).toBeDefined()
        })
        it('should have a get one orders method', () => {
            expect(orderProductModel.getOne).toBeDefined()
        })
        it('should have create new orders', () => {
            expect(orderProductModel.create).toBeDefined()
        })
        it('should have update order method', () => {
            expect(orderProductModel.updateOne).toBeDefined()
        })
        it('should have delete one order method', () => {
            expect(orderProductModel.deleteOne).toBeDefined
        })
    })
    describe('test Orders-product model logic', () => {
        const orderProducttest = {
            quantity: 20,
            order_id: 1,
            product_id: 1
        } as OrderProducts
        beforeAll(async () => {
            const createdOrderProduct = await orderProductModel.create(orderProducttest)
            orderProducttest.id = createdOrderProduct.id
        })
        afterAll(async () => {
            const connection = await db.connect()
            const sql = 'DELETE FROM order_products'
            await connection.query(sql)
            connection.release()
        })

    })
})
