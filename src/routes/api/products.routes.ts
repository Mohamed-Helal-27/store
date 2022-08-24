import { Router } from 'express'
import * as controllers from '../../controllers/products.controllers'
import authenticationMiddleware from '../../middleware/authentication.middleware'

const products = Router()

products
  .route('/')
  .get(controllers.getMany)
  .post(authenticationMiddleware, controllers.createproduct)
products
  .route('/:id')
  .get(controllers.getOne)
  .patch(authenticationMiddleware, controllers.updateOne)
  .delete(authenticationMiddleware, controllers.deleteOne)

export default products
