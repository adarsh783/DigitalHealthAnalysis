(function(window,document,$,api){
  $(document).ready(function(){

     $('#ped_success').hide();
    var email_err=true;

    $('#pedemail').keyup(function(){
      email_check();
   });

    function email_check(){         
      var email_val=$('#pedemail').val();
      if(email_val.length == ''){
       $('#ped_success').show();
       $('#ped_success').html("*please fill the Email");
       $('#ped_success').focus();
       $('#ped_success').css("color","red");
       email_err=false;
        return false;
      }else{
        $('#ped_success').hide();
      }

      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(!regex.test(email_val) ){
        $('#ped_success').show();
        $('#ped_success').html("*please fill the Valid Email");
        $('#ped_success').focus();
        $('#ped_success').css("color","red");
        email_err=false;
        return false;
      }else{
        $('#ped_success').hide();
      }
    }

    $('#pedreset').click(function(e){
      e.preventDefault();

      email_err=true; 
      email_check();
      
      if(email_err == true){
        var data=$('#pedregister').serialize()
        api.requestGeneralService(data).done(function(response){
          if(response.status == true){
           $('#pedia_success').addClass('pedia_success');
           $('#pedia_success').html(response.message);
           $('#pedname').val("");
           $('#pedemail').val("");
           $('#pedcomment').val("");
          }else{
           $('#pedia_success').addClass('pedia_error');
           $('#pedia_success').html(response.message);
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