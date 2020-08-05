(function(window,document,$,api){

  $('#ortho_success').hide();
    var email_err=true;

    $('#ortemail').keyup(function(){
      email_check();
   });

    function email_check(){         
      var email_val=$('#ortemail').val();
      if(email_val.length == ''){
       $('#ortho_success').show();
       $('#ortho_success').html("*please fill the Email");
       $('#ortho_success').focus();
       $('#ortho_success').css("color","red");
       email_err=false;
        return false;
      }else{
        $('#ortho_success').hide();
      }

      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(!regex.test(email_val) ){
        $('#ortho_success').show();
        $('#ortho_success').html("*please fill the Valid Email");
        $('#ortho_success').focus();
        $('#ortho_success').css("color","red");
        email_err=false;
        return false;
      }else{
        $('#ortho_success').hide();
      }
    }

  $(document).ready(function(){
    $('#ortreset').click(function(e){
      e.preventDefault();

      email_err=true; 
      email_check();

      if(email_err == true){
        var data=$('#ortregister').serialize()
        api.requestOrthoService(data).done(function(response){
          if(response.status == true){
           $('#orth_success').addClass('orth_success');
           $('#orth_success').html(response.message);
           $('#ortname').val("");
           $('#ortemail').val("");
           $('#ortcomment').val("");
          }else{
           $('#orth_success').addClass('orth_success');
           $('#orth_success').html(response.message);
          }setTimeout(function(){
         window.location.reload(1);
         }, 3000);
        })  
      }else{
        return false;
      }        
    })
  });
})(window,document,$,api)