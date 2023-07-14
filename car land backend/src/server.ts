import express,{Request,Response} from 'express'
import { DBconnect } from './config/mongoDB'







const app = express()
DBconnect()



app.get('/',(req:Request,res:Response):void=>{
    res.send("hai")
})


app.listen(3131, () => console.log('server connected @3131'))