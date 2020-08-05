//user database
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://mongodbuser:adarsh26@cluster0.9f4so.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true,userCreateIndex: true});
var conn=mongoose.Collection;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var doctorSchema=new mongoose.Schema({

  email: {type: String,
    required: true,
    unique:true,
  },

  name: {type: String,
  	required: true,
  },
 
  birth_date: {type: String,
    required: true,
  },

  gender: {type: String,
  	required: true,
  },

  blood_group: {type: String,
  	required: true,
  },

  contact_number: {type: String,
    
  },

  city: {type: String,
    required: true,
  },  
 	
  state: {type: String,
    required: true,
  },  

  license_number: {type: String,
    required: true,
    unique: true
  },

  image: {type: String,
    required: true
  },  
  
  specialization: {type: String,
    required: true,
  },

  hospital_address: {type: String,
    required: true,
  },

  hospital_working_hour: {type: String,
    required: true,
  },
    
  clinic_address: {type: String,
   
  },
    
  clinic_working_hour: {type: String,
    
  },   

  doctor_id:{
   type:ObjectId,
   required:true
  },     

  sessio:{
   type:String,
   required:true,
  },

  date: {type: Date,
  	default: Date.now
  }
});

var doctorModel=mongoose.model('doctos',doctorSchema);
module.exports=doctorModel;


  
