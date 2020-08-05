(function(window,document,$,api){
  $(document).ready(function(){

     $('#gen_success').hide();
    var email_err=true;

    $('#genemail').keyup(function(){
      email_check();
   });

    function email_check(){         
      var email_val=$('#genemail').val();
      if(email_val.length == ''){
       $('#gen_success').show();
       $('#gen_success').html("*please fill the Email");
       $('#gen_success').focus();
       $('#gen_success').css("color","red");
       email_err=false;
        return false;
      }else{
        $('#gen_success').hide();
      }

      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(!regex.test(email_val) ){
        $('#gen_success').show();
        $('#gen_success').html("*please fill the Valid Email");
        $('#gen_success').focus();
        $('#gen_success').css("color","red");
        email_err=false;
        return false;
      }else{
        $('#gen_success').hide();
      }
    }

    $('#genreset').click(function(e){
      e.preventDefault();

      email_err=true; 
      email_check();
      
      if(email_err == true){
        var data=$('#generalregis').serialize()
        api.requestGeneralService(data).done(function(response){
          if(response.status == true){
           $('#general_success').addClass('general_success');
           $('#general_success').html(response.message);
           $('#genname').val("");
           $('#genemail').val("");
           $('#gencomment').val("");
          }else{
           $('#general_success').addClass('general_error');
           $('#general_success').html(response.message);
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