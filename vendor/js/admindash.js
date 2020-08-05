(function(window,document,$,api){
  $(document).ready(function(){
    function renderDetails(data){
      var el=$('#details');
      var html='';
      for (var i = 0; i < data.length; i++) {
        var admin=data[i];
        html=` <div>Logged as:<b>${admin.name}</b></div>`
        el.append(html);
      }
    }
    
   function searchAdmin(){
     var data={};
      api.requestSearchAdminDetailsService(data).done(function(response){
        if(response.status == true){
          renderDetails(response.result);
        }
      })  
    }
 
    searchAdmin();
  });
})(window,document,$,api)