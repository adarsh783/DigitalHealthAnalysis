(function(window,document,$,api){
  $(document).ready(function(){
    function renderDoctors(data){
      var el=$('#studioUsersInnerContainer1');
      var html='';
      el.html(html);
      if(data.length<1){
        html=` <div style="color:red">No Records Found</div>`
        el.append(html)
      }else{
        el.html('');
        console.log(data)
        for (var i = 0; i < data.length; i++) {
          var user=data[i];
          var status=`<td><a href="javascript:void(0)"  class="enable-doctor" data-status="INACTIVE" data-id=${user._id}><i id="enable" class="fa fa-unlock" style="font-size:24px;color:green"></i></td>`;
          if(user.sessio != "ACTIVE"){
           status=`<td><a href="javascript:void(0)"  class="enable-doctor" data-status="ACTIVE" data-id=${user._id}><i id="disable" class="fa fa-lock" style="font-size:24px;color:red"></i></td>`;
          }
           html=`<tr>
                  <td>${user.name}</td>
                  <td>${user.email}</td>
                  ${status}
                </tr>`;

                
                el.append(html);
        }
        $('.enable-doctor').unbind('click').on('click',function(e){
          var doctor_id=$(this).data('id');
          var status=$(this).data('status');
          api.requestAdminDoctorEnableService(doctor_id,status).done(function(response){
            
                  searchDoctors();
          })
        })      
      }
    }
    
    $('#emailcheck').hide();
    var email_err=true;

    $('#email').keyup(function(){
      email_check();
   });

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

   function searchDoctors(data){
     var data=data || {};
      api.requestSearchDoctorsService(data).done(function(response){
        if(response.status == true){
          $('#email').val("");
         renderDoctors(response.result);
        }else{
           renderDoctors(response.result);
        }
      })  
    }
    searchDoctors();

    $('#search').click(function(e){
      e.preventDefault();
      email_err=true; 
      email_check();
      if(email_err == true){
        var data=$('#register').serialize()
        searchDoctors(data)
      }else{
        return false;
      }  
    })

  });
})(window,document,$,api)