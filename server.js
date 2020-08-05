var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var session = require('express-session')
const userAPI=require('./api/routes');
const presAPI=require('./api/prescrip');
const forgotAPI=require('./api/forgot');

var app=express();

//for sending css and normal files we make them static
app.use('/vendor', express.static('vendor'));

//bodyParser convert them in json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//session authentication
app.use(session({
  secret: 'f9Crj@U+]}DB*z.e',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge:3600000
  }
}))

//user login signup api
app.use('/userapi/',userAPI);

//user prescription api
app.use('/presapi/',presAPI);

//forgot password api
app.use('/forgotapi/',forgotAPI);

//sending dashboard.html file
app.get("/",function(req,res){
    res.sendFile(__dirname+'/index.html');

});

app.get("/robo",function(req,res){
    res.sendFile(__dirname+'/robo.html');

});

//sending index.html file
app.get("/index",function(req,res){
    res.sendFile(__dirname+'/login.html');
});

//sending user-dashboard.html file
app.get("/userdash",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/userdash.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending doctor-dashboard.html file
app.get("/doctordash",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/doctordash.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending admin-dashboard.html file
app.get("/admindash",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/admindash.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending about-dashboard.html file
app.get("/about",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/about.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending about-dashboard.html file
app.get("/doctorabout",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/doctorabout.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending signup.html file
app.get("/User",function(req,res){
    res.sendFile(__dirname+'/usersign.html');
});

//sending user upload.html file
app.get("/upload",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/upload.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending user view document viewusersdoc.html file
app.get("/view",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/viewusersdoc.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending userlists userlist.html file
app.get("/userlist",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/userslist.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending doctorlists doctorslist.html file
app.get("/doclist",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/doclist.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending doctorview doctorslist.html file
app.get("/docview",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/doctorview.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending viewdoctordetails doctorslist.html file
app.get("/doctdetail",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/viewdoctordetails.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending doctor upload.html file
app.get("/docupload",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/docupload.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending doctorenable userenable.html file
app.get("/doctorenable",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/doctorenable.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending userenable userenable.html file
app.get("/userenable",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/userenable.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending doctorfeedback doctorfeed.html file
app.get("/doctorfeed",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/doctorfeed.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending userfeedback userfeed.html file
app.get("/userfeed",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/userfeed.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending feedback upload.html file
app.get("/feedback",function(req,res){
    //if(req.session.user){
     res.sendFile(__dirname+'/feedback.html');
    //}else{
     //res.sendFile(__dirname+'/');
    //}
});

//sending signup.html file
app.get("/chat",function(req,res){
     if(req.session.user){
    res.sendFile(__dirname+'/chat.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending signdoc.html file
app.get("/Doctor",function(req,res){
    res.sendFile(__dirname+'/signdoc.html');

});

//sending forgot.html file
app.get("/forgot",function(req,res){
    res.sendFile(__dirname+'/forgot.html');

});

//sending outdoorcheckup.html file
app.get("/outdoor",function(req,res){
    if(req.session.user){
     res.sendFile(__dirname+'/outdoor.html');
    }else{
     res.sendFile(__dirname+'/');
    }
});

//sending reset.html file
app.get("/reset",function(req,res){
    res.sendFile(__dirname+'/reset.html');

});
