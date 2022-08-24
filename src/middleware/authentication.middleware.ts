import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import Error from '../interface/error.interface'

const handleAuthorizedError = (next: NextFunction) => {
  const error: Error = new Error('Login Failed: Please Try Again')
  error.status = 401
  next(error)
}

const validateTokenMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization')
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase()
      const token = authHeader.split(' ')[1]
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(token, config.tokenSecret as unknown as string)
        if (decode) {
          next()
        } else {
          handleAuthorizedError(next)
        }
      } else {
        handleAuthorizedError(next)
      }
    } else {
      handleAuthorizedError(next)
    }
  } catch (error) {
    handleAuthorizedError(next)
  }
}

export default validateTokenMiddleware
