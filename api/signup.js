//user database
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://mongodbuser:adarsh26@cluster0.9f4so.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true,userCreateIndex: true});
var conn=mongoose.Collection;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var userSchema=new mongoose.Schema({

  email: {type: String,
    required: true,
    unique:true,
  },

  name: {type: String,
  	required: true,
  },

  gender: {type: String,
  	required: true,
  },

  birth_date: {type: String,
    required: true,
  },

  address: {type: String,
  	required: true,
  },	

  blood_group: {type: String,
  	required: true,
  },
 	
  date: {type: Date,
  	default: Date.now
  },

  user_id:{
   type:ObjectId,
   required:true
  },

  sessio:{
   type:String,
   required:true,
  }

});

var userModel=mongoose.model('users',userSchema);
module.exports=userModel;


  
