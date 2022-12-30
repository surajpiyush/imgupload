const express=require('express');
const app=express();
const conn=require('./db/conn')
const cors=require('cors')
const router=require('./routes/router')
app.use(express.json())
app.use(cors())
app.use(router)
app.use('/uploads',express.static('./uploads'))
app.listen(3000, ()=>{console.log('server is runing')})