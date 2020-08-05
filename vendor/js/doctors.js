(function(window,document,$,api){
  $(document).ready(function(){
    $('#namecheck').hide();
    $('#emailcheck').hide();
    $('#passwordcheck').hide();
    $('#confirmcheck').hide();
    $('#bloodcheck').hide();
    $('#contactcheck').hide();
    $('#citycheck').hide();
    $('#statecheck').hide();
    $('#licensecheck').hide();
    $('#imagecheck').hide();
    $('#speciacheck').hide();
    $('#hospitalcheck').hide();
    $('#hoshourcheck').hide();
    $('#cliniccheck').hide();
    $('#clihourcheck').hide();
    $('#condcheck').hide();

    var name_err=true; 
    var email_err=true; 
    var password_err=true; 
    var confirm_err=true; 
    var blood_err=true; 
    var city_err=true; 
    var state_err=true;
    var license_err=true;
    var image_err=true;
    var specialization_err=true;
    var hospital_err=true;
    var hos_work_err=true;
    var cond_err=true


    $('#name').keyup(function(){
      name_check();
    });

    function name_check(){
      var name_val=$('#name').val();
      if(name_val.length == ''){
       $('#namecheck').show();
       $('#namecheck').html("*please fill the Name");
       $('#namecheck').focus();
       $('#namecheck').css("color","red");
       name_err=false;
        return false;
      }else{
        $('#namecheck').hide();
      }
    }


    $('#email').keyup(function(){
      email_check();
    })

    function email_check(){
      var email_val=$('#email').val();
      if(email_val.length == ''){
       $('#emailcheck').show();
       $('#emailcheck').html("*please fill the Email");
       $('#emailcheck').focus();
       $('#emailcheck').css("color","red");
       email_err=false;
        return false;
      }else{
        $('#emailcheck').hide();
      }

      var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if(!regex.test(email_val) ){
        $('#emailcheck').show();
        $('#emailcheck').html("*please fill the Valid Email");
        $('#emailcheck').focus();
        $('#emailcheck').css("color","red");
        email_err=false;
        return false;
      }else{
        $('#emailcheck').hide();
      }
    } 

    $('#birth').keyup(function(){
    birth_check();
    })

    function birth_check(){
      var birth_val=$('#birth').val();
      if(birth_val.length == ''){
       $('#birthcheck').show();
       $('#birthcheck').html("*please fill the BirthDate");
       $('#birthcheck').focus();
       $('#birthcheck').css("color","red");
       birth_err=false;
        return false;
      }else{
        $('#birthcheck').hide();
      }
    }


    $('#gender').keyup(function(){
    gender_check();
    })

    function gender_check(){
      var gender_val=$('#gender').val();
      if(gender_val.length == ''){
       $('#gendercheck').show();
       $('#gendercheck').html("*please fill the Gender");
       $('#gendercheck').focus();
       $('#gendercheck').css("color","red");
       gender_err=false;
        return false;
      }else{
        $('#gendercheck').hide();
      }
    }
     
    $('#phone').keyup(function(){
    phone_check();
    })

    function phone_check(){
      var phocheck = /^\(?(\d{3})\)?[-\. ]?(\d{3})[-\. ]?(\d{4})$/;
      var phone_val=$('#phone').val();
      if(!phocheck.test(phone_val) ){
       $('#contactcheck').show();
       $('#contactcheck').html("*please fill the Correct format");
       $('#contactcheck').focus();
       $('#contactcheck').css("color","red");
      }else{
        $('#contactcheck').hide();
      }
    }

    $('#blood').keyup(function(){
    blood_check();
    })

    function blood_check(){
       var bloodcheck = /^(A|B|AB|O)[+-]$/;
       var blood_val=$('#blood').val();
       if(!bloodcheck.test(blood_val)) {
       $('#bloodcheck').show();
       $('#bloodcheck').html("*please fill the BloodGroup or Enter a valid blood BloodGroup");
       $('#bloodcheck').focus();
       $('#bloodcheck').css("color","red");
       blood_err=false;
        return false;
      }else{
        $('#bloodcheck').hide();
      }
    } 


    $('#password').keyup(function(){
      password_check();
    })

    function password_check(){
      var password_val=$('#password').val();
      if(password_val.length == ''){
       $('#passwordcheck').show();
       $('#passwordcheck').html("*please fill the Password");
       $('#passwordcheck').focus();
       $('#passwordcheck').css("color","red");
       password_err=false;
        return false;
      }else{
        $('#passwordcheck').hide();
      }

      var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      if(!regex.test(password_val) ){
        $('#passwordcheck').show();
        $('#passwordcheck').html("*Password must contain between 8 to 15 characters in which at least one lowercase letter, one uppercase letter, one numeric digit, and one special character");
        $('#passwordcheck').focus();
        $('#passwordcheck').css("color","red");
        password_err=false;
        return false;
      }else{
        $('#passwordcheck').hide();
      }
    } 


    $('#confirm').keyup(function(){
     confirm_check();
    })

    function confirm_check(){
     var confirm_val=$('#confirm').val();
     var passwo_val=$('#password').val();
      if( confirm_val != passwo_val ){
       $('#confirmcheck').show();
       $('#confirmcheck').html("*Password not matched");
       $('#confirmcheck').focus();
       $('#confirmcheck').css("color","red");
       confirm_err=false;
        return false;
      }else{
        $('#confirmcheck').hide();
      }
    }


    $('#city').keyup(function(){
    city_check();
    })

    function city_check(){
      var city_val=$('#city').val();
      if(city_val.length == ''){
       $('#citycheck').show();
       $('#citycheck').html("*please fill the City");
       $('#citycheck').focus();
       $('#citycheck').css("color","red");
       city_err=false;
        return false;
      }else{
        $('#citycheck').hide();
      }
    }


    $('#state').keyup(function(){
    state_check();
    })

    function state_check(){
      var state_val=$('#state').val();
      if(state_val.length == ''){
       $('#statecheck').show();
       $('#statecheck').html("*please fill the State");
       $('#statecheck').focus();
       $('#statecheck').css("color","red");
       state_err=false;
        return false;
      }else{
        $('#statecheck').hide();
      }
    }

    $('#license').keyup(function(){
    license_check();
    })

    function license_check(){
      var license_val=$('#license').val();
      if(license_val.length == ''){
       $('#licensecheck').show();
       $('#licensecheck').html("*please fill the License Number");
       $('#licensecheck').focus();
       $('#licensecheck').css("color","red");
       license_err=false;
        return false;
      }else{
        $('#licensecheck').hide();
      }
    }


    $('#img').keyup(function(){
    image_check();
    })

    function image_check(){
      var image_val=$('#img').val();
      if(image_val.length == ''){
       $('#imagecheck').show();
       $('#imagecheck').html("*please upload the License Certificate");
       $('#imagecheck').focus();
       $('#imagecheck').css("color","red");
       image_err=false;
        return false;
      }else{
        $('#imagecheck').hide();
      }
    }


    $('#specia').keyup(function(){
    specia_check();
    })

    function specia_check(){
    var specia_val=$('#specia').val();
      if(specia_val.length == ''){
       $('#speciacheck').show();
       $('#speciacheck').html("*please fill the Specialization");
       $('#speciacheck').focus();
       $('#speciacheck').css("color","red");
       specialization_err=false;
        return false;
      }else{
        $('#speciacheck').hide();
      }
    }

    $('#hospital').keyup(function(){
    hospital_check();
    })

    function hospital_check(){
      var hospital_val=$('#hospital').val();
      if(hospital_val.length == ''){
       $('#hospitalcheck').show();
       $('#hospitalcheck').html("*please fill the Hospital Address");
       $('#hospitalcheck').focus();
       $('#hospitalcheck').css("color","red");
       hospital_err=false;
        return false;
      }else{
        $('#hospitalcheck').hide();
      }
    }

    $('#hoshour').keyup(function(){
    hoshour_check();
    })

    function hoshour_check(){
      var hoshour_val=$('#hoshour').val();
      if(hoshour_val.length == ''){
       $('#hoshourcheck').show();
       $('#hoshourcheck').html("*please fill the Hospital Working Hour");
       $('#hoshourcheck').focus();
       $('#hoshourcheck').css("color","red");
       hos_work_err=false;
        return false;
      }else{
        $('#hoshourcheck').hide();
      }
    }


    $('#clinic').keyup(function(){
    clinic_check();
    })

    function clinic_check(){
      var clinic_val=$('#clinic').val();
      if(clinic_val.length == ''){
       $('#cliniccheck').show();
       $('#cliniccheck').html("*please fill the Clinic Address");
       $('#cliniccheck').focus();
       $('#cliniccheck').css("color","red");
       clinic_err=false;
        return false;
      }else{
        $('#cliniccheck').hide();
      }
    }


    $('#clihour').keyup(function(){
    clihour_check();
    })

    function clihour_check(){
      var cliwork_val=$('#clihour').val();
      if(cliwork_val.length == ''){
       $('#clihourcheck').show();
       $('#clihourcheck').html("*please fill the Clinic Working Hour");
       $('#clihourcheck').focus();
       $('#clihourcheck').css("color","red");
       cli_work_err=false;
        return false;
      }else{
        $('#clihourcheck').hide();
      }
    }

    function checkbox_check(){
      if($('#checkbox').is(':checked')){
        $('#condcheck').hide();
      }
       else{
      $('#condcheck').show();
       $('#condcheck').html("please agree the terms and condition");
       $('#condcheck').focus();
       $('#condcheck').css("color","red");
        cond_err=false;
        return false;
      }
    } 

    $('#submitbtn').click(function(e){
      e.preventDefault();
      name_err=true; 
      email_err=true; 
      emaifl_err=true; 
      password_err=true; 
      confirm_err=true; 
      blood_err=true; 
      address_err=true;           
      city_err=true; 
      state_err=true;
      license_err=true;
      image_err=true;
      specialization_err=true;
      hospital_err=true;
      hos_work_err=true;
      cond_err=true;

      name_check();
      email_check();
      password_check();
      confirm_check();
      blood_check();
      city_check();
      state_check();
      license_check();
      image_check();
      specia_check();
      hospital_check();
      hoshour_check();
      checkbox_check()

      if((cond_err == true) && (name_err == true) && (email_err == true) && (password_err == true) && (confirm_err == true) && (blood_err == true) && (city_err == true) && (state_err == true) && (license_err == true) && (image_err == true) && (specialization_err == true) && (hospital_err == true) && (hos_work_err == true) ){
        var formData = new FormData(document.getElementById('register'));
        api.requestDocSignService(formData).done(function(response){
          if(response.status == true){
           $('#signup_error').addClass('signup_success');
           $('#signup_error').html(response.message);
           $('#register').trigger('reset');
          }else{
           $('#signup_error').addClass('signup_error');
           $('#signup_error').html(response.message);
          };
        })
        return true;
      }else{
       return false;
      }
    }); 
  });
})(window,document,$,api)
          