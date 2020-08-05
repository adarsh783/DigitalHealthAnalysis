(function(window,document,$,api){
  $(document).ready(function(){
    $('#passwordcheck').hide();
    $('#confirmcheck').hide();

    var password_err=true; 
    var confirm_err=true; 

    $('#newpassword').keyup(function(){
      password_check();
    })

    function password_check(){         
      var password_val=$('#newpassword').val();
      if(password_val.length == ''){
       $('#passwordcheck').show();
       $('#passwordcheck').html("*please fill the password");
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
    
    $('#password-field').keyup(function(){
      confirm_check();
    })

    function confirm_check(){    
      var confirm_val=$('#password-field').val();
      var passwo_val=$('#newpassword').val();
      if( confirm_val != passwo_val ){
       $('#confirmcheck').show();
       $('#confirmcheck').html("*password not matched");
       $('#confirmcheck').focus();
       $('#confirmcheck').css("color","red");
       confirm_err=false;
        return false;
      }else{
        $('#confirmcheck').hide();
      }
    }

      $(".toggles-passwords").click(function() {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });

    $(".toggle-password").click(function() {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });

    $("#token").val(api.getUrlParams("token"))
    
    $('#reset').click(function(e){
      e.preventDefault();
      password_err=true; 
      confirm_err=true;

      password_check();
      confirm_check();

     if((password_err == true) && (confirm_err == true)){            
        api.requestResetService($('#register').serialize()).done(function(response){ 
        console.log(response)          
          if(response.status == true){
           $('#signup_success').addClass('signup_success');
           $('#signup_success').html(response.message);
           $('#newpassword').val("");
           $('#password-field').val("");
          }else{
          $('#signup_success').removeClass('signup_success');
           $('#signup_success').addClass('signup_error');
           $('#signup_success').html(response.message);
          }
        }) 
      }else{
        return false;
      } 
    })
  });
})(window,document,$,api)