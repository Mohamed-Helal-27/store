import { Router } from 'express'
import * as controllers from '../../controllers/order.products.controllers'
const orderproduct = Router()


orderproduct
    .route('/')
    .get(controllers.getMany)
    .post(controllers.createorderproduct)
orderproduct
    .route('/:id')
    .get(controllers.getOne)
    .patch(controllers.updateOne)
    .delete(controllers.deleteOne)

export default orderproduct
