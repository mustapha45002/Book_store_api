const express=require("express")
const uploadRoute=express.Router()
const multer=require("multer")
const path=require("path")

const storage=multer.diskStorage({
     destination:function(req,res,cb){
cb(null,path.join(__dirname,'../images'))
     },
     filename:function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g,"-") + file.originalname)
     }
})

const upload=multer({storage})


// api upload
uploadRoute.post("/",upload.single("image"),(req,res)=>{
    res.send({message:"imgs has been uploaded"})
})




module.exports=uploadRoute