const express =require('express')
const router=new express.Router();
const connection = require ('../db/conn') 
const multer=require('multer')
const moment=require('moment');
const conn = require('../db/conn');
const imgConfig=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,`image-${Date.now()}.${file.originalname}`)
    }
})

// const isImage=(req,file,cb)=>{
//     if(file.mimetype.startWith("image")){
//         cb(null,true)
//     }else{
//         cb(null,Error("only image is allowed"))
//     }
// }
const upload=multer({
    storage:imgConfig,
   // fileFilter:isImage
}).single("photo")

router.post('/register',upload,(req,res)=>{
  console.log(req.body.name)
  console.log(req.file.filename)
     const name=req.body.name;
     const filename=req.file.filename;


if(! name  || ! filename){
    res.status(422).json({status:422, message:'fill all details'})
}

try {
    const date=moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
    conn.query("insert into usersdata set?",{username:name,userimg:filename,date:date},(err,result)=>{
        if(err) throw err;
        console.log('data added')
        res.status(201).json({status:201,data:req.body})
    })
} catch (error) {
    res.status(422).json({status:422,error})
}
})


router.get('/getdata',(req,res)=>{
    try {
        conn.query("select * from usersdata",(err,result)=>{
            if(err){
                console.log("error")
            }else{
                console.log(" get data ")
                res.status(201).json({status:201,data:result})
            }
        })
    } catch (error) {
        res.status(422).json({status:422,error})
    }
})


module.exports=router;