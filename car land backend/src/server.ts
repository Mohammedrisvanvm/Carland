import express, { Request, Response } from 'express'
import { DBconnect } from './config/mongoDB'
import cors from 'cors'
import { config } from './config/config'
import userRouters from './routers/userRouers'
import vendorRouters from './routers/VenderRouters'
import { errorHandler, notFound } from './middlewares/errorHandler/errorHandlingMiddleware'
import cookieParser from 'cookie-parser'
import { userCheck } from './middlewares/userCheckMiddleware/userCheckMiddleware'





const app = express()
DBconnect()
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ extended: false, limit:"50mb" }));
app.use(cookieParser())

// app.use(userCheck)

app.use(cors(
    {
        origin:"http://localhost:3000",
        credentials: true,
    }
))

app.use('/users', userRouters)
app.use('/vendors', vendorRouters)
app.get('/', (req: Request, res: Response): void => {
    res.send("hai")
})

app.use(notFound)
app.use(errorHandler)

app.listen(config.server.port, () => console.log('server connected @3131'))