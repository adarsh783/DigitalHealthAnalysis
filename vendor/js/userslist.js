(function(window,document,$,api){
  $(document).ready(function(){
    function renderUsers(data){
      var el=$('#studioUsersInnerContainer1');
      var html='';
      //el.html(html);
      if(data.length == 0){
        html=` <div style="color:red">No Records Founds</div>`
        el.append(html)
      }else{
        el.html('');
        console.log(data)
        for (var i = 0; i < data.length; i++) {
          var user=data[i];
           html=`<tr>
                  <td>${user.name}</td>
                  <td>${user.email}</td>
                  <td>${user.gender}</td>
                  <td>${user.address}</td>
                </tr>`;
                el.append(html);
        }    
      }
    }
   
   function searchUsers(){
     var data={};
      api.requestSearchUsersService(data).done(function(response){
        if(response.status == true){
         renderUsers(response.result);
        }else{
           renderUsers(response.data);
        }
      })  
    }
 
    searchUsers();
  });
})(window,document,$,api)