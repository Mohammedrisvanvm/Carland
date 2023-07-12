import  express, { Request, Response } from "express";
import dotenv from "dotenv";
const app=express()

dotenv.config();
app.get('/', (req: Request, res: Response):void => {
    res.send('hai');
  });
  

app.listen(process.env.PORT,()=>{
    console.log('port running')
})