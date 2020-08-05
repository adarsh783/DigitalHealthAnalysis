//prescroption upload
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://mongodbuser:adarsh26@cluster0.9f4so.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true,userCreateIndex: true});
var conn=mongoose.Collection;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var presSchema=new mongoose.Schema({
   
  description: {type: String,
    required: true
  },

  image: {type: String,
    required: true
  },  
  
  user_id:{
   type:ObjectId,
   required:true
  },

  Date: {type: Date,
  	default: Date.now
  }
});

var presModel=mongoose.model('prescrip',presSchema);
module.exports=presModel;


  
