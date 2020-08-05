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
                <td>${doctor.contact_number}</td>
              </tr>
                `;
                
            el.append(html);
        }
      }
    }

   function searchDoctors(){
     data={};
      api.requestViewDocService(data).done(function(response){
         renderDoctors(response.result);
      })  
    }
 
    searchDoctors();
  });
})(window,document,$,api)