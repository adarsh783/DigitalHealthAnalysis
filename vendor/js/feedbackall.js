(function(window,document,$,api){
  $(document).ready(function(){

    $('#feed_success').hide();
    var email_err=true;

    $('#feedemail').keyup(function(){
      email_check();
    })

    function email_check(){         
      var email_val=$('#feedemail').val();
      if(email_val.length == ''){
       $('#feed_success').show();
       $('#feed_success').html("*please fill the Email");
       $('#feed_success').focus();
       $('#feed_success').css("color","red");
       email_err=false;
        return false;
      }else{
        $('#feed_success').hide();
      }

      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(!regex.test(email_val) ){
        $('#feed_success').show();
        $('#feed_success').html("*please fill the Valid Email");
        $('#feed_success').focus();
        $('#feed_success').css("color","red");
        email_err=false;
        return false;
      }else{
        $('#feed_success').hide();
      }
    }
      

    $('#resetfeed').click(function(e){
      e.preventDefault();
       
       email_err=true; 
      email_check();

      if(email_err == true){
        var data=$('#registerfeed').serialize()
        api.requestSendFeedService(data).done(function(response){
          if(response.status == true){
           $('#signup_success').addClass('feed_success');
           $('#signup_success').html(response.message);
           $('#feedname').val("");
           $('#feedemail').val("");
           $('#feedcomment').val("");
          }else{
            $('#signup_success').removeClass('feed_success');
           $('#signup_success').addClass('feed_error');
           $('#signup_success').html(response.message);
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