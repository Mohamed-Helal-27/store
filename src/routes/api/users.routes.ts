import { Router } from 'express'
import * as controllers from '../../controllers/users.controllers'
import authenticationMiddleware from '../../middleware/authentication.middleware'
const users = Router()
// Api users
users.route('/').get(authenticationMiddleware, controllers.getMany).post(controllers.create)
users
  .route('/:id')
  .get(authenticationMiddleware, controllers.getOne)
  .patch(authenticationMiddleware, controllers.updateOne)
  .delete(authenticationMiddleware, controllers.deleteOne)

//Authentications
users.route('/authenticate').post(controllers.authenticate)

export default users
