(function(window,document,$,api){
  $(document).ready(function(){

    $('#fed_success').hide();
    var email_err=true;

    $('#usemail').keyup(function(){
      email_check();
    })

    function email_check(){         
      var email_val=$('#usemail').val();
      if(email_val.length == ''){
       $('#fed_success').show();
       $('#fed_success').html("*please fill the Email");
       $('#fed_success').focus();
       $('#fed_success').css("color","red");
       email_err=false;
        return false;
      }else{
        $('#fed_success').hide();
      }

      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(!regex.test(email_val) ){
        $('#fed_success').show();
        $('#fed_success').html("*please fill the Valid Email");
        $('#fed_success').focus();
        $('#fed_success').css("color","red");
        email_err=false;
        return false;
      }else{
        $('#fed_success').hide();
      }
    }
      

    $('#resetusefed').click(function(e){
      e.preventDefault();
       
       email_err=true; 
      email_check();

      if(email_err == true){
        var data=$('#registeruserfed').serialize()
        api.requestSendFeedUsersService(data).done(function(response){
          if(response.status == true){
           $('#userfed_success').addClass('fed_success');
           $('#userfed_success').html(response.message);
           $('#usname').val("");
           $('#usemail').val("");
           $('#uscomment').val("");
          }else{
           $('#userfed_success').addClass('fed_error');
           $('#userfed_success').html(response.message);
          }setTimeout(function(){
         window.location.reload(1);
         }, 3000);
        })  
      }else{
        return false;
      }    
    })
  })
})(window,document,$,api)