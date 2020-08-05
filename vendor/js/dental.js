(function(window,document,$,api){
  $(document).ready(function(){

     $('#den_success').hide();
    var email_err=true;

    $('#denemail').keyup(function(){
      email_check();
   });

    function email_check(){         
      var email_val=$('#denemail').val();
      if(email_val.length == ''){
       $('#den_success').show();
       $('#den_success').html("*please fill the Email");
       $('#den_success').focus();
       $('#den_success').css("color","red");
       email_err=false;
        return false;
      }else{
        $('#ped_success').hide();
      }

      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(!regex.test(email_val) ){
        $('#den_success').show();
        $('#den_success').html("*please fill the Valid Email");
        $('#den_success').focus();
        $('#den_success').css("color","red");
        email_err=false;
        return false;
      }else{
        $('#den_success').hide();
      }
    }

    $('#denreset').click(function(e){
      e.preventDefault();

      email_err=true; 
      email_check();
      
      if(email_err == true){
        var data=$('#dentalregis').serialize()
        api.requestDentalService(data).done(function(response){
          if(response.status == true){
           $('#dental_success').addClass('signup_success');
           $('#dental_success').html(response.message);
           $('#denname').val("");
           $('#denemail').val("");
           $('#dencomment').val("");
          }else{
           $('#dental_success').addClass('signup_error');
           $('#dental_success').html(response.message);
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