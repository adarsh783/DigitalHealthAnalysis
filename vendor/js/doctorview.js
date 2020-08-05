(function(window,document,$,api){
  $(document).ready(function(){
    function renderDoctors(data){
      var el=$('#studioUsersInnerContainer1');
      var html='';
      el.html(html);
      if(data.length == 0){
        html=` <div style="color:red">No Records Found</div>`
        el.append(html)
      }else{
        for (var i = 0; i < data.length; i++) {
          var doctor=data[i];
           html=`
                <tr>
                  <td><b>${doctor.description}</b></td>
                  <td><b>${doctor.image}<a href="/presapi/download/${doctor.image}">&nbsp<i class="fa fa-download"></i></b></td>
                  <td><a href="javascript:void(0)" class="delete-doctors" data-docid=${doctor._id}><i class="fa fa-trash-o" style="font-size:24px;color:red"></i></td>
                </tr>
                  `;
                el.append(html);
        }
        $('.delete-doctors').unbind('click').on('click',function(e){
          var doc_id=$(this).data('docid');
          api.requestDeleteUsersDocService(doc_id).done(function(response){
            if(response.status == true){
              searchDoctors()
            }
          })
        })
      }
    }
   
   function searchDoctors(){
     var data={};
      api.requestViewUsersDocService(data).done(function(response){
          renderDoctors(response.result);
         $('#signup_success').html(response.message);
      })  
    }
 
    searchDoctors();
  });
})(window,document,$,api)