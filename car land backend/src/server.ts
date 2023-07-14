import express,{Request,Response} from 'express'
import { DBconnect } from './config/mongoDB'
import cors from 'cors'






const app = express()
DBconnect()


app.use(cors(
    {
        origin:"http://localhost:3000"
    }
))
app.get('/',(req:Request,res:Response):void=>{
    res.send("hai")
})


app.listen(3131, () => console.log('server connected @3131'))