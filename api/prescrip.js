var express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
var presModule=require('../api/prescription');
var path=require('path');
//file upload 
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'vendor/prescription/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
});
//file type
const fileFilter=(req, file, cb)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/pdf'){
    cb(null,true);
  }else{
    cb(null,false);
  }
};

var upload = multer({ storage:storage,
 limits:{
    fileSize:1024*1024*5
 },
 fileFilter:fileFilter
});

//upload user prescription
router.post('/userpres',upload.single('presimage'),function(req,res,next){

 var description=req.body.description;
 var image=req.file.filename;
  var presDetails=new presModule({
    description:description,
    image:image,
    user_id:req.session.user[0]._id
  });

  presDetails.save()
  .then(pres=>{
    res.status(201).json({
      statusCode:200,
      status:true,  
      message:"file uploaded successfully",
      results:pres
    });  
  })

  .catch(err=>{
    res.json(err);   
  });
});

//get user prescription
router.get('/searchusersdoc',function(req,res,next){
   
 var userAll=presModule.find({user_id:req.session.user[0]._id})
  userAll.exec()
  .then(data=>{
    res.status(200).json({
      statusCode:200,
        status:true, 
        result:data,
        message:""
    });
  })

  .catch(err=>{
    res.json({
      statusCode:200,
        status:false, 
        result:data,
        message:""
    });   
  }) 
}) 

//delete user prescription
router.delete('/deletepres/:id',function(req,res,next){
var _id=req.params.id;
var del=presModule.findByIdAndDelete({_id})  
  del.exec()
  .then(data=>{
    res.status(200).json({
      status:true,
      message:"prescription deleted"
    });
  })

  .catch(err=>{
    res.json({
      status:false,
      message:err
    });   
  }) 
}) 

//get user prescription
router.get('/download/:file',function(req,res,next){
 var filename=req.params.file; 
 var filepath='vendor/prescription/uploads/'+filename;
 var fs=require('fs');
  if (fs.existsSync(filepath)) { 
  }
     res.download(filepath);
}) 

//get doctor prescription
router.get('/doctordown/:file',function(req,res,next){
 var filename=req.params.file; 
 var filepath='vendor/public/uploads/'+filename;
 var fs=require('fs');
  if (fs.existsSync(filepath)) { 
  }
     res.download(filepath);
}) 

module.exports=router;