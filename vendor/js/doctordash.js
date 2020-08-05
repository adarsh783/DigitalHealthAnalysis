(function(window,document,$,api){
  $(document).ready(function(){
    function renderDetails(data){
      var el=$('#details');
      var html='';
      for (var i = 0; i < data.length; i++) {
        var doctor=data[i];
        html=` <div>Logged as:<b>${doctor.name}</b></div>`
        el.append(html);
      }
    }
    
   function searchDetails(){
     var data={};
      api.requestSearchDoctorsDetailsService(data).done(function(response){
        if(response.status == true){
          console.log(response.result)
          renderDetails(response.result);
        }
      })  
    }
 
    searchDetails();
  });
})(window,document,$,api)