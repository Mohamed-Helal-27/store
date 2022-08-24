import { Router } from 'express'
import userRoutes from './api/users.routes'
import productRoutes from './api/products.routes'
import orderRoutes from './api/orders.routes'
import orderproduct from './api/orderproducts.routes'
const routes = Router()

routes.use('/order-products', orderproduct)
routes.use('/products', productRoutes)
routes.use('/orders', orderRoutes)
routes.use('/users', userRoutes)

export default routes
