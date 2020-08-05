(function(window,document,$,api){
  $(document).ready(function(){
    $('#imagecheck').hide();

    var image_err=true;

    $('#img').keyup(function(){
    image_check();
    })

    function image_check(){
      var image_val=$('#img').val();
      if(image_val.length == ''){
       $('#imagecheck').show();
       $('#imagecheck').html("*please upload the document");
       $('#imagecheck').focus();
       $('#imagecheck').css("color","red");
       image_err=false;
        return false;
      }else{
        $('#imagecheck').hide();
      }
    }

    $('#submitbtn').click(function(e){
      e.preventDefault();
      image_err=true;
      image_check();

      if((image_err == true)){
        var formData = new FormData(document.getElementById('register'));
        api.requestUploadService(formData).done(function(response){
          if(response.status == true){
           $('#signup_error').addClass('signup_success');
           $('#signup_error').html(response.message);
           $('#register').trigger('reset');
          }else{
           $('#signup_error').addClass('signup_error');
           $('#signup_error').html(response.message);
          }setTimeout(function(){
         window.location.reload(1);
         }, 3000);
        })
        return true;
      }else{
       return false;
      }
    }); 
  });
})(window,document,$,api)
          