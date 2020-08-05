(function(window,document,$,api){
  $(document).ready(function(){

     $('#gas_success').hide();
    var email_err=true;

    $('#gasemail').keyup(function(){
      email_check();
   });

    function email_check(){         
      var email_val=$('#gasemail').val();
      if(email_val.length == ''){
       $('#gas_success').show();
       $('#gas_success').html("*please fill the Email");
       $('#gas_success').focus();
       $('#gas_success').css("color","red");
       email_err=false;
        return false;
      }else{
        $('#gas_success').hide();
      }

      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(!regex.test(email_val) ){
        $('#gas_success').show();
        $('#gas_success').html("*please fill the Valid Email");
        $('#gas_success').focus();
        $('#gas_success').css("color","red");
        email_err=false;
        return false;
      }else{
        $('#gas_success').hide();
      }
    }

    $('#gasreset').click(function(e){
      e.preventDefault();

      email_err=true; 
      email_check();
      
      if(email_err == true){
      var data=$('#gasregister').serialize()
        api.requestGastroService(data).done(function(response){
          if(response.status == true){
           $('#gastro_success').addClass('gastro_success');
           $('#gastro_success').html(response.message);
           $('#gasname').val("");
           $('#gasemail').val("");
           $('#gascomment').val("");
          }else{
           $('#gastro_success').addClass('gastro_error');
           $('#gastro_success').html(response.message);
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