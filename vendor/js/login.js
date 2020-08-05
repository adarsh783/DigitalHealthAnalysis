
(function ($) {
  "use strict";

    
  /*==================================================================
  [ Validate ]*/
  var input = $('.validate-input .input100');

  $('#login').on('click',function(){
    var check = true;
    for(var i=0; i<input.length; i++) {
      if(validate(input[i]) == false){
        showValidate(input[i]);
        check=false;
      }
    }
    
    if(check){
      var data=$('#register').serialize()
      auth.requestLoginService(data).done(function(response){
        if(response.status == true){
         $('#signup_error').addClass('signup_success');
         $('#signup_error').html(response.message);
         $('#register').trigger('reset');
        }else{
         $('#signup_error').addClass('signup_error');
         $('#signup_error').html(response.message);
         $('#register').trigger('reset');
        }
       setTimeout(function(){
          location.href=response.redirectTo;
        },500)
      })
      return false;
    }
    return check;
  });
  
  function mouseoverPass(obj) {
  var obj = document.getElementById('myPassword');
  obj.type = "text";
}
function mouseoutPass(obj) {
  var obj = document.getElementById('myPassword');
  obj.type = "password";
}

  $('.validate-form .input100').each(function(){
    $(this).focus(function(){
       hideValidate(this);
    });
  });

  function validate (input) {
    if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
      if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        return false;
      }
    }
    else{
      if($(input).val().trim() == ''){
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).addClass('alert-validate');
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass('alert-validate');
  }
  
  var auth={
    requestLoginService:function(data){
      return $.ajax({
        url:"/userapi/login",
        method:"POST",
        cache:false,
        data:data,
        processData: false
      })
    }
  }  
})(jQuery);

