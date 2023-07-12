import  Express  from "express";

const app=Express()


app.get('/',(req,res)=>res.send('hai'))

app.listen(5000,()=>{
    console.log('port running')
})