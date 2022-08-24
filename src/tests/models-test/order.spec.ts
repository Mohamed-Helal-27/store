import OrderModel from '../../models/order.model'
import db from '../../database'
import Order from '../../types/orders.types'

const orderModel = new OrderModel()

describe('orders Model', () => {
    describe('test methods exists', () => {
        it('should have an get Many orders method', () => {
            expect(orderModel.getMany).toBeDefined()
        })
        it('should have a get one orders method', () => {
            expect(orderModel.getOne).toBeDefined()
        })
        it('should have create new orders', () => {
            expect(orderModel.create).toBeDefined()
        })
        it('should have update order method', () => {
            expect(orderModel.updateOne).toBeDefined()
        })
        it('should have delete one order method', () => {
            expect(orderModel.deleteOne).toBeDefined
        })
    })
    describe('test Orders model logic', () => {
        const order = {
            status: 'Active',
            user_id: 1
        } as Order
        beforeAll(async () => {
            const createdOrder = await orderModel.create(order)
            order.id = createdOrder.id
        })
        afterAll(async () => {
            const connection = await db.connect()
            const sql = 'DELETE FROM orders'
            await connection.query(sql)
            connection.release()
        })

    })
})
