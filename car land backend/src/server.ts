import express,{Request,Response} from 'express'







const app = express()

app.get('/',(req:Request,res:Response):void=>{
    res.send("hai")
})


app.listen(3131, () => console.log('server connected @3131'))