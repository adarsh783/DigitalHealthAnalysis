(function(window,document,$,api){
  $(document).ready(function(){
    function renderDoctors(data){
      var el=$('#studioUsersInnerContainer1');
      var html='';
      //el.html(html);
      if(data.length == 0){
        html=` <div style="color:red">No Records Founds</div>`
        el.append(html)
      }else{
        el.html('');
        for (var i = 0; i < data.length; i++) {
          var doctor=data[i];
           html=`<tr>
                  <td>${doctor.name}</td>
                  <td>${doctor.email}</td>
                  <td>${doctor.city}</td>
                  <td>${doctor.specialization}</td>
                  <td>${doctor.contact_number}</td>
                  <td>${doctor.license_number}</td>
                  <td><b><a href="/presapi/doctordown/${doctor.image}">${doctor.image}<i class="fa fa-download"></i></b></td>
                </tr>`;  
              el.append(html);
        }
      }
    }
   
   function searchDoctors(){
     var data={};
      api.requestSearchDoctorsService(data).done(function(response){
        if(response.status == true){
         renderDoctors(response.result);
        }else{
           renderDoctors(response.data);
        }
      })  
    }
 
    searchDoctors();
  });
})(window,document,$,api)