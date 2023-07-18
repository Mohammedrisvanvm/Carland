import express,{Request,Response} from 'express'
import { DBconnect } from './config/mongoDB'
import cors from 'cors'
import { config } from './config/config'
import userRouers from './routers/userRouers'






const app = express()
DBconnect()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(
    {
        origin:"http://localhost:3000"
    }
))

app.use('/users',userRouers)
app.get('/',(req:Request,res:Response):void=>{
    res.send("hai")
})


app.listen(config.server.port, () => console.log('server connected @3131'))