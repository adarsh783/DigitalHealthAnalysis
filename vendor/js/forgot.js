(function(window,document,$,api){
  $(document).ready(function(){
    
    $('#reset').click(function(e){
      e.preventDefault();
      var data=$('#register').serialize()
      api.requestForgotService(data).done(function(response){
        if(response.status == true){
         $('#signup_success').addClass('success');
         $('#signup_success').html(response.message);
         $('#email').val(" ");
        }else{
          $('#signup_success').removeClass('success');
         $('#signup_success').addClass('error');
         $('#signup_success').html(response.message);
        }
      })  
    })
  });
})(window,document,$,api)