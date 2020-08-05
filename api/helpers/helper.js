var express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
var userModule=require('../../api/signup');
var doctorModule=require('../../api/signdoc');
var user_auths=require('../../api/user_auths');

const helper={
    getUser:function(where){
    	where=where||{}
    	return new Promise(function(resolve,reject){
    		userModule.find(where)
            .exec()
            .then(data=>{
               resolve(data)              
            })
            .catch(err=>{
              reject(err)      
            }) 
    	})
    },

    getDoctor:function(where){
    	where=where||{}
    	return new Promise(function(resolve,reject){
    		doctorModule.find(where)
            .exec()
            .then(data=>{
               resolve(data)              
            })
            .catch(err=>{
              reject(err)      
            }) 
    	})
    },
     
   /*  kennels.findOneAndUpdate({}, { age: 5 }, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});*/

    findUserEnableAndUpdate:function(where,data){
    	where=where||{}
         console.log(where)
        console.log(data)
    	return new Promise(function(resolve,reject){
    		userModule.findOneAndUpdate(where, data, {new: true})
            .exec()
            .then(data=>{
                console.log(data)
               resolve(data)              
            })
            .catch(err=>{
              reject(err)      
            })

    	})
    },
    
    findDoctorEnableAndUpdate:function(where,data){
        where=where||{}
         console.log(where)
        console.log(data)
        return new Promise(function(resolve,reject){
            doctorModule.findOneAndUpdate(where, data, {new: true})
            .exec()
            .then(data=>{
                console.log(data)
               resolve(data)              
            })
            .catch(err=>{
              reject(err)      
            })

        })
    }
    
}

module.exports=helper;