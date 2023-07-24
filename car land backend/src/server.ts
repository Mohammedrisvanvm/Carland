import express, { Request, Response } from 'express'
import { DBconnect } from './config/mongoDB'
import cors from 'cors'
import { config } from './config/config'
import userRouers from './routers/userRouers'
import { errorHandler, notFound } from './middlewares/errorHandler/errorHandlingMiddleware'
import cookieParser from 'cookie-parser'
import { userCheck } from './middlewares/userCheckMiddleware/userCheckMiddleware'





const app = express()
DBconnect()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
// app.use(userCheck)

app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
        
     
    }
))

app.use('/users', userRouers)
app.get('/', (req: Request, res: Response): void => {
    res.send("hai")
})

app.use(notFound)
app.use(errorHandler)

app.listen(config.server.port, () => console.log('server connected @3131'))