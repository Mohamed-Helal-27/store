import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import ratelimit from 'express-rate-limit'
import errorMiddleware from './middleware/error.middleware'
import config from './config'
import routes from './routes'

dotenv.config()

const PORT = config.port || 3000
const app: Application = express()
app.use(express.json())
app.use(morgan('short'))
app.use(
  ratelimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'you had done to many requets to the same url please try again after 60 Seconds'
  })
)

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World '
  })
})

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'There is no page or url with this name'
  })
})

app.use(errorMiddleware)


app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

export default app
