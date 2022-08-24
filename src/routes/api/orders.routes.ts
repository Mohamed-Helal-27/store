import { Router } from 'express'
import * as controllers from '../../controllers/order.controllers'
import authenticationMiddleware from '../../middleware/authentication.middleware'

const orders = Router()

orders
    .route('/')
    .get(authenticationMiddleware, controllers.getMany)
    .post(authenticationMiddleware, controllers.createorder)
orders
    .route('/:id')
    .get(authenticationMiddleware, controllers.getOne)
    .patch(authenticationMiddleware, controllers.updateOne)
    .delete(authenticationMiddleware, controllers.deleteOne)

export default orders
