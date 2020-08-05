
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
   
    
 var api={
    //api for login service
    requestLoginService:function(data){
        return $.ajax({
            url:"/userapi/login",
            method:"POST",
            cache:false,
            data:data
        })
    },

    requestSignupService:function(data){
        return $.ajax({
           url: "/userapi/signup",
           method: "POST",
           cache:false,
           data: data
        })
    },
    
    requestSearchService:function(data){
        return $.ajax({
           url: "/userapi/search",
           method: "GET",
           cache:false,
           data: data
        })
    },

     //api for userslist and email search based on users
    requestSearchUsersService:function(data){
        return $.ajax({
           url: "/userapi/searchusers",
           method: "GET",
           cache:false,
           data:data
        })
    },
    
    //api for user details to show their name when logged
    requestSearchUsersDetailsService:function(data){
        return $.ajax({
           url: "/userapi/userdetails",
           method: "GET",
           cache:false
        })
    },

    //api for admin details to show their name when logged
    requestSearchAdminDetailsService:function(data){
        return $.ajax({
           url: "/userapi/admindetails",
           method: "GET",
           cache:false
        })
    },
   
    //api for doctor details at d tym of login
     requestSearchDoctorsDetailsService:function(data){
        return $.ajax({
           url: "/userapi/doctorDetails",
           method: "GET",
           cache:false
        })
    },

    //api for doctorslist and email based search on doctors
    requestSearchDoctorsService:function(data){
        return $.ajax({
           url: "/userapi/searchdoctors",
           method: "GET",
           cache:false,
           data:data
        })
    },
    
     requestViewUsersDocService:function(data){
        return $.ajax({
           url: "/presapi/searchusersdoc",
           method: "GET",
           cache:false
        })
    },

    requestDeleteUsersDocService:function(id){
        return $.ajax({
           url: "/presapi/deletepres/"+id,
           method: "DELETE",
           cache:false
        })
    },
    
   //view doctor list in new page 
   requestViewDocService:function(id){
        return $.ajax({
           url: "/userapi/updatedoc/"+id,
           method: "GET",
           cache:false,
           data:data
        })
    },

    requestAdminUserEnableService:function(id,status){
        return $.ajax({
           url: "/userapi/user-enable/"+id,
           method: "PUT",
           data:{status},
           cache:false
        })
    },
    
    requestAdminUserDisableService:function(id){
        return $.ajax({
           url: "/userapi/user-disable/"+id,
           method: "PUT",
           cache:false
        })
    },

    requestAdminDoctorEnableService:function(id,status){
        return $.ajax({
           url: "/userapi/doctor-enable/"+id,
           method: "PUT",
           data:{status},
           cache:false
        })
    },
    
    requestAdminDoctorDisableService:function(id){
        return $.ajax({
           url: "/userapi/doctor-disable/"+id,
           method: "PUT",
           cache:false
        })
    },

    requestAdminService:function(id){
        return $.ajax({
           url: "/userapi/deletedoctor/"+id,
           method: "DELETE",
           cache:false
        })
    },

    requestDocSignService:function(formData){
        return $.ajax({
          url: "/userapi/signdoc",
          method: "POST",
          cache:false,
          data: formData,
          cache: false,
          contentType: false,
          processData: false
        })
    },
    
    //for uploading file
    requestUploadService:function(formData){
        return $.ajax({
          url: "/presapi/userpres",
          method: "POST",
          cache:false,
          data: formData,
          cache: false,
          contentType: false,
          processData: false
        })
    },

    requestForgotService:function(data){
        return $.ajax({
           url: "/forgotapi/forgot-password",
           method: "PUT",
           cache:false,
           data: data
        })
    },
    
    //feedback service for all
    requestSendFeedService:function(data){
        return $.ajax({
           url: "/forgotapi/feedback",
           method: "POST",
           cache:false,
           data: data
        })
    },
    
    //feedback service for users
    requestSendFeedUsersService:function(data){
        return $.ajax({
           url: "/forgotapi/feedback",
           method: "POST",
           cache:false,
           data: data
        })
    },

    //feedback service for doctors
    requestSendFeedDoctorsService:function(data){
        return $.ajax({
           url: "/forgotapi/feedback",
           method: "POST",
           cache:false,
           data: data
        })
    },

    //dental service
    requestDentalService:function(data){
        return $.ajax({
           url: "/forgotapi/dental",
           method: "POST",
           cache:false,
           data: data
        })
    },

    //general service
    requestGeneralService:function(data){
        return $.ajax({
           url: "/forgotapi/general",
           method: "POST",
           cache:false,
           data: data
        })
    },
    
    //gastro service
    requestGastroService:function(data){
        return $.ajax({
           url: "/forgotapi/gastro",
           method: "POST",
           cache:false,
           data: data
        })
    },

    //ortho service
    requestOrthoService:function(data){
        return $.ajax({
           url: "/forgotapi/Orthologist",
           method: "POST",
           cache:false,
           data: data
        })
    },

    //pedia service
    requestPediaService:function(data){
        return $.ajax({
           url: "/forgotapi/pedia",
           method: "POST",
           cache:false,
           data: data
        })
    },

    requestLogoutService:function(){
        return $.ajax({
           url: "/userapi/logout",
           method: "GET",
           cache:false
        })
    },

    requestResetService:function(data){
        return $.ajax({
           url: "/forgotapi/reset-password",
           method: "PUT",
           cache:false,
           data: data
        })
    },
    
    getUrlParams:function(name){ 
      var url_string = window.location.href;
      var url = new URL(url_string);
      var c = url.searchParams.get(name);
      return c;
    }  
  }
    
  window.api=api;
})(jQuery);

