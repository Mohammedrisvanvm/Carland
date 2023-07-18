import express,{Request,Response} from 'express'
import { DBconnect } from './config/mongoDB'
import cors from 'cors'
import { config } from './config/config'






const app = express()
DBconnect()


app.use(cors(
    {
        origin:"http://localhost:3000"
    }
))

app.use('/users',)
app.get('/',(req:Request,res:Response):void=>{
    res.send("hai")
})


app.listen(config.server.port, () => console.log('server connected @3131'))