(function(window,document,$,api){
  $(document).ready(function(){

    $('#docfed_success').hide();
    var email_err=true;

    $('#docemail').keyup(function(){
      email_check();
    })

    function email_check(){         
      var email_val=$('#docemail').val();
      if(email_val.length == ''){
       $('#docfed_success').show();
       $('#docfed_success').html("*please fill the Email");
       $('#docfed_success').focus();
       $('#docfed_success').css("color","red");
       email_err=false;
        return false;
      }else{
        $('#docfed_success').hide();
      }

      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(!regex.test(email_val) ){
        $('#docfed_success').show();
        $('#docfed_success').html("*please fill the Valid Email");
        $('#docfed_success').focus();
        $('#docfed_success').css("color","red");
        email_err=false;
        return false;
      }else{
        $('#docfed_success').hide();
      }
    }
      

    $('#resetdocfed').click(function(e){
      e.preventDefault();
       
       email_err=true; 
      email_check();

      if(email_err == true){
        var data=$('#registerdocfed').serialize()
        api.requestSendFeedDoctorsService(data).done(function(response){
          if(response.status == true){
           $('#signdoc_success').addClass('fedd_success');
           $('#signdoc_success').html(response.message);
           $('#docname').val("");
           $('#docemail').val("");
           $('#doccomment').val("");
          }else{
           $('#signdoc_success').addClass('fedd_error');
           $('#signdoc_success').html(response.message);
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