var express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
var userModule=require('../api/user_auths');
require('dotenv').config();
var url = require('url');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ =require('lodash'); 
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox0114a9f25a9f4a6eb895f1d0d6bb9811.mailgun.org';
const mg = mailgun({apiKey: process.env.MAILGUN_APIkey, domain: DOMAIN});

//forgot-password user and doctor
router.put('/forgot-password',function(req,res,next){
  var email=req.body.email;
  userModule.findOne({email:email})
  .exec()
  .then(user=>{
        if(!user){
          res.status(200).json({
          statusCode:404,
          status:false, 
          message:"User with this email does not exist"
          });
        }else{
          const token=jwt.sign({email:email},process.env.RESET_PASSWORD_KEY,{expiresIn:'40m'});

          const data = {
				from: 'adarsh007addy@gmail.com',
				to: email,
				subject: 'Account Activation Link',
				html:`
				<h1>Please Click on given link to reset your password</h1>
				<p>${process.env.CLIENT_URL}/reset?token=${token}</p>
	           `
		    };

		   return user.updateOne( {resetLink:token}, function(err,success) {
                if(err){
                 return res.status(400).json({error: "reset password link error"});
                }else{
             	 mg.messages().send(data, function (error, body) {
						if(error){
						  return res.json({
							  error:error.message
						    })
						}
					  return res.status(200).json({
					  	statusCode:201,
                        status:true, 
					  	message : "Email has been sent, kindly change your password"})
				    })
                }
            })  
        }           
    })
  .catch(err=>{
     res.json(err);   
    }) 
})

//reset-password user and doctor
router.put('/reset-password',function(req,res,next){
  var newPassword=req.body.newpassword;
  var confirmPassword=req.body.confirmpassword;
  var resetLink=req.body.token;

    if(resetLink){
	  	jwt.verify(resetLink,process.env.RESET_PASSWORD_KEY,function(error,decodeData){
         if(error){
	          return res.status(401).json({
                   error: "Incorrect token or it is expired"
                });
            }
	     userModule.findOne({resetLink}, (err,user) => {
	           if(err || !user){
	              res.status(200).json({
		              statusCode:404,
		              status:false, 
		              message:"User with this token does not exist"
	                });
	            }
              else{
				 bcrypt.hash(confirmPassword, 10, function(err, hash) {
				      if(err){
				          res.status(200).json({
					          statusCode:404,
					          status:false,	
					          message:"something wrong,try later!",
					          error:er
				            });
					    }else{     
				            const obj={
				            	password:hash,
				            	resetLink:''
				            }
			           
			                user = _.extend(user,obj);
			                user.save((err,result) =>{
				                if(err){
					              return res.status(400).json({error: "reset password error"});
					            }else{
								   return res.status(200).json({
								   	  statusCode:201,
                                      status:true, 
								   	  message : "Your password has been changed"
								    })
					            }
			                })
	                    }
	                })
				} 
            })
	    }) 
    }else{
      return res.status(201).json({error : "Authentications error"})
    }
})




//feedback email
router.post('/feedback',function(req,res,next){
  var email=req.body.feedemail;
  var name=req.body.feedname;
  var comment=req.body.feedcomment;

  const data = {
		from:'digital health@feedback',
		to: 'digitalhealth.digital@gmail.com',
		subject: 'Feedback',
		html:`
		<p>Email:${email}</p>
		<p>Name:${name}</p>
		<p>Comment:${comment}</p>
       `
    };
 	mg.messages().send(data, function (error, body) {
		if(error){
		  return res.json({
			  error:error.message
		    })
		}
	  return res.status(200).json({
		  	statusCode:201,
            status:true, 
		  	message : "Your response has been registered"
        })
    })  
})

//feedback email dental doctor
router.post('/dental',function(req,res,next){
  var email=req.body.denemail;
  var name=req.body.denname;
  var comment=req.body.dencomment;

  const data = {
		from:'digital health@dental',
		to: 'rastogisneha62@gmail.com',
		subject:'Dental Consultation',
		html:`
		<p>Email:${email}</p>
		<p>Name:${name}</p>
		<p>Health related query:${comment}</p>
       `
    };
 	mg.messages().send(data, function (error, body) {
		if(error){
		  return res.json({
			  error:error.message
		    })
		}
	  return res.status(200).json({
		  	statusCode:201,
            status:true, 
		  	message : "Your response has been sent to doctor we will respond back as soon as possible"
        })
    })  
})

//feedback email gastrolo doctor
router.post('/gastro',function(req,res,next){
  var email=req.body.gasemail;
  var name=req.body.gasname;
  var comment=req.body.gascomment;

  const data = {
		from:'digital health@digital',
		to: 'rastogisneha62@gmail.com',
		subject:'Gastrologist Consultation',
		html:`
		<p>Email:${email}</p>
		<p>Name:${name}</p>
		<p>Health related query:${comment}</p>
       `
    };
 	mg.messages().send(data, function (error, body) {
		if(error){
		  return res.json({
			  error:error.message
		    })
		}
	  return res.status(200).json({
		  	statusCode:201,
            status:true, 
		  	message : "Your response has been sent to doctor we will respond back as soon as possible"
        })
    })  
})

//feedback email generalphysi doctor
router.post('/general',function(req,res,next){
  var email=req.body.genemail;
  var name=req.body.genname;
  var comment=req.body.gencomment;

  const data = {
		from:'digital health@dental',
		to: 'csaroj262@gmail.com',
		subject:'General Physician',
		html:`
		<p>Email:${email}</p>
		<p>Name:${name}</p>
		<p>Health related query:${comment}</p>
       `
    };
 	mg.messages().send(data, function (error, body) {
		if(error){
		  return res.json({
			  error:error.message
		    })
		}
	  return res.status(200).json({
		  	statusCode:201,
            status:true, 
		  	message : "Your response has been sent to doctor we will respond back as soon as possible"
        })
    })  
})

//feedback email pediatra doctor
router.post('/pedia',function(req,res,next){
  var email=req.body.pedemail;
  var name=req.body.pedname;
  var comment=req.body.pedcomment;

  const data = {
		from:'digital health@dental',
		to: 'csaroj262@gmail.com',
		subject:'Pediatration Consultation',
		html:`
		<p>Email:${email}</p>
		<p>Name:${name}</p>
		<p>Health related query:${comment}</p>
       `
    };
 	mg.messages().send(data, function (error, body) {
		if(error){
		  return res.json({
			  error:error.message
		    })
		}
	  return res.status(200).json({
		  	statusCode:201,
            status:true, 
		  	message : "Your response has been sent to doctor we will respond back as soon as possible"
        })
    })  
})

//feedback email ortho doctor
router.post('/Orthologist',function(req,res,next){
  var email=req.body.ortemail;
  var name=req.body.ortname;
  var comment=req.body.ortcomment;

  const data = {
		from:'digital health@dental',
		to: 'rastogisneha62@gmail.com',
		subject:'Orthologist Consultation',
		html:`
		<p>Email:${email}</p>
		<p>Name:${name}</p>
		<p>Health related query:${comment}</p>
       `
    };
 	mg.messages().send(data, function (error, body) {
		if(error){
		  return res.json({
			  error:error.message
		    })
		}
	  return res.status(200).json({
		  	statusCode:201,
            status:true, 
		  	message : "Your response has been sent to doctor we will respond back as soon as possible"
        })
    })  
})

module.exports=router;