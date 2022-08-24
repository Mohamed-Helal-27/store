import { Response, Request } from 'express'
import Error from '../interface/error.interface'

const errorMiddleware = (error: Error, req: Request, res: Response) => {
  const status = error.status || 500
  const message = error.message || 'whoops something went Wrong'
  res.status(status).json({ status, message })
}

export default errorMiddleware
