//user database
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://mongodbuser:adarsh26@cluster0.9f4so.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true,userCreateIndex: true});
var conn=mongoose.Collection;
var userSchema=new mongoose.Schema({

  email: {type: String,
  	required: true,
    unique:true,
  },

  name:{
   type:String
  },
  
  password: {type: String,
  	required: true,
  },

  role:{
   type:String,
   required:true,
  },

  date: {type: Date,
  	default: Date.now
  },

  resetLink:{
    data:String,
    default:''
  }   
});

var userModel=mongoose.model('users_auths',userSchema);
module.exports=userModel;


  
