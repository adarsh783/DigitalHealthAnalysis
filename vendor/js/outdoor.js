(function(window,document,$,api){
  $(document).ready(function(){
    function renderDoctors(data){
      console.log(data);
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
          var doctor=data[i];
           html=`
              <tr>
                <td>${doctor.name}
                <td>${doctor.specialization}</td>
                <td>${doctor.city}</td>
                <td>${doctor.hospital_address}</td>
                <td>${doctor.hospital_working_hour}</td>
                <td>${doctor.clinic_address}</td>
                <td>${doctor.clinic_working_hour}</td>
                <td>${doctor.contact_number}</td>
              </tr>
                `;
                
            el.append(html);
        }
        $('.view-doctors').unbind('click').on('click',function(e){
          var doc_id=$(this).data('docsid');
          api.requestViewDocService(doc_id).done(function(response){
            if(response.status == true){
              viewDoctors(response.result);
              
            }
          })
        })
      }
    }

    function viewDoctors(data){
      console.log(data);
      var el=$('#studioUsersInnerContainer2');
      var html='';
      el.html(html);
      if(data.length<1){
        html=` <div>No Records Found</div>`
        el.append(html)
      }else{
        el.html('');
        console.log(data)
        for (var i = 0; i < data.length; i++) {
          var doctor=data[i];
          html=`
            <tr>
              <td>${doctor.name}
              <td>${doctor.specialization}</td>
              <td>${doctor.city}</td>
              <td>${doctor.hospital_address}</td>
              <td>${doctor.hospital_working_hour}</td>
              <td>${doctor.clinic_address}</td>
              <td>${doctor.clinic_working_hour}</td>
              <td>${doctor.contact_number}</td>
            </tr>
              `;
                
          el.append(html);
        }
      }
    }  
   
   $('#check').hide();
   $('#check').hide();

   var city_err=true; 
   var specialization_err=true;

   $('#city').keyup(function(){
    city_check();
    })

    function city_check(){
      var city_val=$('#city').val();
      if(city_val.length == ''){
       city_err=false;
        return false;
      }
    }

     $('#specia').keyup(function(){
    specia_check();
    })

    function specia_check(){
    var specia_val=$('#specia').val();
      if(specia_val.length == ''){
       specialization_err=false;
        return false;
      }
    }

   function searchDoctors(data){
     data=data||{};
      api.requestSearchService(data).done(function(response){
         $('#specia').val("");
         $('#city').val("");
         renderDoctors(response.result);
         $('#signup_success').html(response.message);
      })  
    }
 
    searchDoctors();

    $('#search').click(function(e){
      e.preventDefault();
      city_err=true; 
      specialization_err=true;
      city_check();
      specia_check();
      if((city_err == true) || (specialization_err == true)){
        $('#check').hide();
        var data=$('#register').serialize()
        searchDoctors(data)
      }else{
       $('#check').show();
       $('#check').html("*please fill the field");
       $('#check').focus();
       $('#check').css("color","red");
        return false;
      }  
    })
  });
})(window,document,$,api)