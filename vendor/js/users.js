(function(window,document,$,api){
  $(document).ready(function(){
    $('#namecheck').hide();
    $('#emailcheck').hide();
    $('#birthcheck').hide();
    $('#gendercheck').hide();
    $('#passwordcheck').hide();
    $('#confirmcheck').hide();
    $('#addresscheck').hide();  
    $('#bloodcheck').hide();        

    var name_err=true;  
    var email_err=true;
    var birth_err=true; 
    var gender_err=true; 
    var password_err=true; 
    var confirm_err=true;
    var address_err=true; 
    var blood_err=true; 

   $('#name').keyup(function(){
       name_check();
   });

    function name_check(){ 
      var name_val=$('#name').val();
      if(name_val.length == ''){
       $('#namecheck').show();
       $('#namecheck').html("*please fill the Name");
       $('#namecheck').focus();
       $('#namecheck').css("color","red");
       first_err=false;
        return false;
      }else{
        $('#namecheck').hide();
      }
    }

   $('#email').keyup(function(){
      email_check();
   });

    function email_check(){         
      var email_val=$('#email').val();
      if(email_val.length == ''){
       $('#emailcheck').show();
       $('#emailcheck').html("*please fill the Email");
       $('#emailcheck').focus();
       $('#emailcheck').css("color","red");
       email_err=false;
        return false;
      }else{
        $('#emailcheck').hide();
      }

      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(!regex.test(email_val) ){
        $('#emailcheck').show();
        $('#emailcheck').html("*please fill the Valid Email");
        $('#emailcheck').focus();
        $('#emailcheck').css("color","red");
        email_err=false;
        return false;
      }else{
        $('#emailcheck').hide();
      }
    }
     
    $('#birth').keyup(function(){
      birth_check();
    })

    function birth_check(){         
      var birth_val=$('#birth').val();
      if(birth_val.length == ''){
       $('#birthcheck').show();
       $('#birthcheck').html("*please fill the BirthDate");
       $('#birthcheck').focus();
       $('#birthcheck').css("color","red");
       birth_err=false;
        return false;
      }else{
        $('#birthcheck').hide();
      }
    } 

   $('#gender').keyup(function(){
       gender_check();
   })

    function gender_check(){         
      var gender_val=$('#gender').val();
      if(gender_val.length == ''){
       $('#gendercheck').show();
       $('#gendercheck').html("*please fill the Gender");
       $('#gendercheck').focus();
       $('#gendercheck').css("color","red");
       gender_err=false;
        return false;
      }else{
        $('#gendercheck').hide();
      }
    }


   $('#password').keyup(function(){
       password_check();
   })

    function password_check(){         
      var password_val=$('#password').val();
      if(password_val.length == ''){
       $('#passwordcheck').show();
       $('#passwordcheck').html("*please fill the Password");
       $('#passwordcheck').focus();
       $('#passwordcheck').css("color","red");
       password_err=false;
        return false;
      }else{
        $('#passwordcheck').hide();
      }

     var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
     if(!regex.test(password_val) ){
        $('#passwordcheck').show();
        $('#passwordcheck').html("*Password must contain between 8 to 15 characters in which at least one lowercase letter, one uppercase letter, one numeric digit, and one special character");
        $('#passwordcheck').focus();
        $('#passwordcheck').css("color","red");
        password_err=false;
        return false;
      }else{
        $('#passwordcheck').hide();
      }
    } 


    $('#confirm').keyup(function(){
      confirm_check();
    })

    function confirm_check(){    
      var confirm_val=$('#confirm').val();
      var passwo_val=$('#password').val();
      if( confirm_val != passwo_val ){
       $('#confirmcheck').show();
       $('#confirmcheck').html("*Password not matched");
       $('#confirmcheck').focus();
       $('#confirmcheck').css("color","red");
       confirm_err=false;
        return false;
      }else{
        $('#confirmcheck').hide();
      }
    }


   $('#address').keyup(function(){
      address_check();
   })

    function address_check(){      
      var address_val=$('#address').val();
      if(address_val.length == ''){
       $('#addresscheck').show();
       $('#addresscheck').html("*please fill the Address");
       $('#addresscheck').focus();
       $('#addresscheck').css("color","red");
        address_err=false;
        return false;
      }else{
        $('#addresscheck').hide();
      }
    }
      
     $('#blood').keyup(function(){
    blood_check();
    })

    function blood_check(){
       var bloodcheck = /^(A|B|AB|O)[+-]$/;
       var blood_val=$('#blood').val();
       if(!bloodcheck.test(blood_val)) {
       $('#bloodcheck').show();
       $('#bloodcheck').html("*please fill the BloodGroup or Enter a valid blood BloodGroup");
       $('#bloodcheck').focus();
       $('#bloodcheck').css("color","red");
       blood_err=false;
        return false;
      }else{
        $('#bloodcheck').hide();
      }
    } 

   $('#submitbtn').click(function(e){
      e.preventDefault();
      name_err=true; 
      email_err=true; 
      birth_err=true; 
      gender_err=true; 
      password_err=true; 
      confirm_err=true; 
      address_err=true;  
      blood_err=true;           

      name_check();
      email_check();
      birth_check();
      gender_check();
      password_check();
      confirm_check();
      address_check();
      blood_check()

      if((name_err == true) && (email_err == true) && (birth_err == true) && (gender_err == true) && (blood_err == true) && (password_err == true) && (confirm_err == true) && (address_err == true) ){            
        api.requestSignupService($('#register').serialize()).done(function(response){           
          if(response.status == true){
           $('#signup_error').addClass('signup_success');
           $('#signup_error').html(response.message);
           $('#register').trigger('reset');
          }else{
           $('#signup_error').addClass('signup_error');
           $('#signup_error').html(response.message);
          };
        })
        return true;
      }else{
        return false;
      }
    }); 
  });
})(window,document,$,api)
          