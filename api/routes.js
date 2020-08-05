var express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
var helper=require('../api/helpers/helper')
var userModule=require('../api/signup');
var doctorModule=require('../api/signdoc');
var user_auths=require('../api/user_auths');
//file upload 
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'vendor/public/uploads/')
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

//login api
router.post('/login',function(req,res,next){
var email=req.body.email;
 var password=req.body.pass;

 var response={ statusCode:404,
    status:false,
    message:"Authentications Failed", 
    redirectTo:"/index" 
  }

 var name= user_auths.find({email:email})
  name.exec()
  .then(user=>{
    if(user.length<1){
      res.status(200).json(response); 
    }else{
      bcrypt.compare(password,user[0].password, function(err, result) {
       if(err){
         res.status(200).json(response); 
       }
       if(result){
          req.session.user=user;
          response.status=true;
          response.statusCode=200;
          response.message="logged successfully";
          if(req.session.user[0].role == "USER"){
            helper.getUser({email:email})
           .then(data=>{
              if(data[0].sessio== "INACTIVE"){
                response.status=false,
                response.message="Please contact with admin",
                response.redirectTo="/index"
              }else{
                response.sessio=true;
                response.statusCode=200;
                response.message="logged successfully";
                response.redirectTo="/userdash";
              }
              res.status(200).json(response)
            })
            .catch(err=>{
              res.status(200).json({
                error:err
              });        
            })   
          }  
          else if(req.session.user[0].role == "DOCTOR"){
            helper.getDoctor({email:email})
            .then(data=>{
              if(data[0].sessio== "INACTIVE"){
                  response.status=false,
                  response.message="Please contact with admin",
                  response.redirectTo="/index"
              }else{
                response.sessio=true;
                response.statusCode=200;
                response.message="logged successfully";
                response.redirectTo="/doctordash";
              }
              res.status(200).json(response)
            })
            .catch(err=>{
              res.status(200).json({
                error:err
              });        
            })
          }  
          else if(req.session.user[0].role=="ADMIN"){
               response.redirectTo="/admindash";
               res.status(200).json(response)
          }
        }   
      })
    }       
  })   
  .catch(err=>{
    res.json({
      error:err
    });        
  })
})

//user signup api
router.post('/signup',function(req,res,next){
 var name=req.body.Name;
 var gender=req.body.Gender;
 var email=req.body.Email;
 var birth=req.body.Birth;
 var address=req.body.Address;
 var password=req.body.Password;
 var confirmPassword=req.body.ConfirmPassword;
 var bloodGroup=req.body.BloodGroup;

  bcrypt.hash(password, 10, function(err, hash) {
    if(err){
    res.status(200).json({
      statusCode:404,
      status:false, 
      message:"something wrong,try later!",
      error:err
    });
    }else{
      var authDetails=new user_auths({
        email:email,
        password:hash,
        role:"USER",    
      })

      authDetails.save()
      .then(user=>{
       var userDetails=new userModule({
          email:email,
          name:name,
          birth_date:birth,
          gender:gender,
          address:address,
          blood_group:bloodGroup,
          user_id:user._id,
          sessio:"ACTIVE"  
        });
  
        userDetails.save()
        .then(user=>{
          res.status(201).json({
              statusCode:200,
              status:true,  
              message:"User registered successfully"
          });
        })
        .catch(err=>{
          res.status(201).json({
          statusCode:404,
          status:false,  
          message:err
          });   
        })               
      })
      .catch(err=>{
        res.status(201).json({
          statusCode:404,
          status:false,  
          message:'Email Duplicate Error'
        });   
      })
    }
  })
});   

 //doctor signup api
router.post('/signdoc',upload.single('licenseImage'),function(req,res,next){
 var name=req.body.Name;
 var gender=req.body.Gender;
 var email=req.body.Email;
 var birthdate=req.body.Birth;
 var password=req.body.Password;
 var confirmPassword=req.body.ConfirmPassword;
 var bloodgroup=req.body.BloodGroup;
 var contactNumber=req.body.contactNumber;
 var city=req.body.City;
 var state=req.body.State;
 var licensenumber=req.body.Licensenumber;
 var image=req.file.filename;
 var specialization=req.body.Specialization;
 var hospitaladdress=req.body.Hospitaladdress;
 var hospitalworkinghour=req.body.HospitalWorkinghour;
 var clinicaddress=req.body.Clinicaddress;
 var clinicworkinghour=req.body.ClinicWorkinghour;

  bcrypt.hash(password, 10, function(err, hash) {
    if(err){
       res.status(200).json({
        statusCode:404,
        status:false, 
        message:"something wrong,try later!",
        error:err
        });
    }else{

     var authDetails=new user_auths({
        email:email,
        password:hash,
        role:"DOCTOR"  
      })
     authDetails.save()
     .then(doctor=>{
       var doctorDetails=new doctorModule({
          email:email,
          name:name,
          birth_date:birthdate,
          gender:gender,
          blood_group:bloodgroup,
          contact_number:contactNumber,
          city:city,
          state:state,
          license_number:licensenumber,
          image:image,
          specialization:specialization,
          hospital_address:hospitaladdress,
          hospital_working_hour:hospitalworkinghour,
          clinic_address:clinicaddress,
          clinic_working_hour:clinicworkinghour,
          doctor_id:doctor._id,
          sessio:"ACTIVE"
        });
       doctorDetails.save()
       .then(doc=>{
          res.status(201).json({
            statusCode:200,
            status:true,  
            message:"doctors registered successfully"
          });
        })
        .catch(err=>{
           res.status(201).json({
          statusCode:404,
          status:false,  
          message:'Email Duplicate Error'
        }); 
        })    
      })
      .catch(err=>{
          res.status(201).json({
          statusCode:404,
          status:false,  
          message:'Email Duplicate Error'
        }); 
      })
    }
  }); 
});

//admin signup api
router.post('/signadmin',function(req,res,next){
 var email=req.body.email;
 var name=req.body.name;
 var password=req.body.password;
 var confirmPassword=req.body.confirmPassword;

 if(password!=confirmPassword){
    res.status(200).json({
        statusCode:404,
        status:false, 
        message:"Password not matched",
        });
 }else{

    bcrypt.hash(password, 10, function(err, hash) {
      if(err){
      res.status(200).json({
      statusCode:404,
      status:false, 
      message:"something wrong,try later!",
      error:err
      });
      }else{
        var authDetails=new user_auths({
          email:email,
          name:name,
          password:hash,
          role:"ADMIN",
          status:"ACTIVE"    
        })
  
        authDetails.save()
        .then(admin=>{
          res.status(201).json({
            statusCode:200,
            status:true,  
            message:"admin registered successfully"
          });
        })
        .catch(err=>{
           res.json(err);   
        });                
      }
    })  
  }
});

//users enable route
router.put('/user-enable/:id',function(req,res,next){
 var _id=req.params.id;
 var status=req.body.status;
 helper.findUserEnableAndUpdate({_id:_id},{$set:{ sessio:status }})
  .then(data=>{
    res.status(201).json({
      statusCode:200,
      status:true,  
      message:"ACTIVE"
    });
  })
  .catch(err=>{
    res.json({
      error:err
    });        
  })
}) 

//users disable route
router.put('/user-disable/:id',function(req,res,next){
 var _id=req.params.id;
 helper.findUserEnableAndUpdate({_id:_id},{$set:{ sessio:"INACTIVE" }})
  .then(data=>{
    res.status(201).json({
      statusCode:200,
      status:true,  
      message:"INACTIVE"
    });
  })
  .catch(err=>{
    res.json({
      error:err
    });        
  })
})  

//doctors enable route
router.put('/doctor-enable/:id',function(req,res,next){
 var _id=req.params.id;
 var status=req.body.status;
 helper.findDoctorEnableAndUpdate({_id:_id},{$set:{ sessio:status }})
  .then(data=>{
    res.status(201).json({
      statusCode:200,
      status:true,  
      message:"ACTIVE"
    });
  })
  .catch(err=>{
    res.json({
      error:err
    });        
  })
})  

//doctors disable route
router.put('/doctor-disable/:id',function(req,res,next){
 var _id=req.params.id;
 helper.findDoctorEnableAndUpdate({_id:_id},{$set:{ sessio:"INACTIVE" }})
  .then(data=>{
    res.status(201).json({
      statusCode:200,
      status:true,  
      message:"INACTIVE"
    });
  })
  .catch(err=>{
    res.json({
      error:err
    });        
  })
})  

//list of users
router.get('/searchusers',function(req,res,next){
 var email=req.query.email || '';
 var userAll={}
 if(email){
    userAll={email:email}
 }
 var userlist=userModule.find(userAll)
 userlist.exec()
 .then(data=>{
    if(data.length<1){
      res.status(200).json({
        statusCode:200,
        status:false, 
        result:[],
        message:""
      }); 
    }else{
      res.status(200).json({
        statusCode:201,
        status:true, 
        result:data,
        message:data[0].sessio
      });
    } 
  })  
  .catch(err=>{
    res.json(err);   
  }) 
}) 

//search based on city and specialist
router.get('/search',function(req,res,next){
 var city=req.query.city || '';
 var Specia=req.query.specia || '';
 var searchFilter={};
  if(city  && Specia){
     searchFilter={ $and: [{ city:city },
      { specialization:Specia }]
     }  
  }else if(city){
      searchFilter={ city:city }  
  }else if(Specia){
      searchFilter={ specialization:Specia } 
  }
   
 var employeeFilter=doctorModule.find(searchFilter)
 employeeFilter.exec()
 .then(data=>{
    if(data.length<1){
      res.status(200).json({
        statusCode:200,
        status:false, 
        result:[],
        message:""
      }); 
    }else{
      res.status(200).json({
        statusCode:201,
        status:true, 
        result:data,
        message:""
      });
    }
  })  
  .catch(err=>{
     res.json(err);   
  }) 
})     

//list of doctors
router.get('/searchdoctors',function(req,res,next){
 var email=req.query.email || '';
 var doctorAll={}  
 if(email){
    doctorAll={email:email}
 }
 var doctordetails=doctorModule.find(doctorAll)
 doctordetails.exec()
 .then(data=>{
  if(data.length<1){
      res.status(200).json({
        statusCode:200,
        status:false, 
        result:[],
        message:""
      }); 
    }else{
      res.status(200).json({
        statusCode:201,
        status:true, 
        result:data,
        message:""
      });
    } 
  })  
  .catch(err=>{
    res.json(err);   
  }) 
})     

//logout of dashboard
router.get('/logout',function(req,res,next){
   
 req.session.destroy(function(err) {
    if(err){
      res.status(200).json({
        statusCode:404,
        status:false, 
        message:"something wrong,try later!",
        error:err
      });
    }else{
      res.redirect('/');
    }
  })  
})  

//get user details at d time of login
router.get('/userdetails',function(req,res,next){
   
 var userDetails=userModule.find({user_id:req.session.user[0]._id})
 userDetails.exec()
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

//fetch doctor data for new page 
router.get('/updatedoc/:id',function(req,res,next){
var _id=req.params.id;
var view=doctorModule.find({_id:_id})  
  view.exec()
  .then(data=>{
    res.status(200).json({
       statusCode:200,
        status:true, 
        result:data
    });
  })

  .catch(err=>{
    res.json({
      statusCode:200,
        status:false
    });   
  }) 
})

//get doctor details at d time of login
router.get('/doctorDetails',function(req,res,next){
   
 var doctorDetails=doctorModule.find({doctor_id:req.session.user[0]._id})
 doctorDetails.exec()
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

//get admin details at d time of login
router.get('/admindetails',function(req,res,next){
   
 var adminDetails=user_auths.find({_id:req.session.user[0]._id})
 adminDetails.exec()
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
        message:err
    });   
  }) 
}) 

//delete users based on admin from users database and user_auths database
router.delete('/deleteuser/:id',function(req,res,next){
 var _id=req.params.id;
 var user=userModule.find({_id:_id})  
  user.exec()
  .then(data=>{
    var user_id=data[0].user_id;
    var auths=user_auths.findOneAndUpdate({})
    auths.exec()
    .then(data=>{
      res.status(200).json({
        status:true,
        message:"prescription deleted"
      });
      var userdatabase=userModule.findByIdAndDelete({_id:_id})  
      userdatabase.exec()
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

    .catch(err=>{
      res.json({
        status:false,
        message:err
      });   
    }) 
  }) 
  .catch(err=>{
    res.json({
      status:false,
      message:err
    });   
  }) 
})  

//delete users based on admin from doctors and user_auths database
router.delete('/deletedoctor/:id',function(req,res,next){
var _id=req.params.id;
 var doctor=doctorModule.find({_id:_id})  
  doctor.exec()
  .then(data=>{
    var doctor_id=data[0].doctor_id;
    var auths=user_auths.findByIdAndDelete({_id:doctor_id})
    auths.exec()
    .then(data=>{
      res.status(200).json({
        status:true,
        message:"prescription deleted"
      })
      var doctordatabase=doctorModule.findByIdAndDelete({_id:_id})  
      doctordatabase.exec()
      .then(data=>{
        res.status(200).json({
          status:true,
          message:"prescription deleted"
        });
      })

      doctordatabase.catch(err=>{
        res.json({
          status:false,
          message:err
        });   
      }) 
    })

    auths.catch(err=>{
      res.json({
        status:false,
        message:err
      });   
    }) 
  }) 
  doctor.catch(err=>{
    res.json({
      status:false,
      message:err
    });   
  }) 
})  

module.exports=router;