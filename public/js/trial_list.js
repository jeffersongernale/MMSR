$(document).ready(function(){

    $(document).ajaxStart(function(){
        $("#wait").css("display", "block");
    });

    $(document).ajaxComplete(function(){
        $("#wait").css("display", "none");
    });
});

var Trial_List = (function(){
    var this_data = {};


    this_data.loadtable = function(search='')
    {

       if(search!=""){
        $('#datatable').DataTable().destroy();
       }
       var part_no =  $('#slc_part_no').val();
       var mold_no =  $('#slc_mold_no').val();
       var machine_no =  $('#slc_machine_no').val();
       
       $('#datatable').DataTable({
            "processing":true,
            "serverSide":true,
            "searching":false,
            "order": [[ 7, "desc" ]],
            "pageLength": 15,
            "scrollY":"500px",
            "language": 
            {          
            "processing": " <div style='background:white'><i class='fa fa-refresh fa-spin'></i><br><b>Please wait for a moment..</b></div>",
            },
            "ajax": {
                url:"trial_list/datatable",
                type:"POST",
                data:{
                    'part_no': part_no,
                    'mold_no': mold_no,
                    'machine_no': machine_no
                }
            },
            "columns":[
                {
                    "data": "id",
                    "render": function ( data, type, row ) {
                        var btn =  '<button class="btn btn-primary btn-sm" title="View Data" '+
                        'onclick="Reg_List.ViewData('+"\'"+data+"\'"+','+"\'"+row['machine_id']+"\'"+','+"\'"+row['ctrl_no']
                        +"\'"+','+"\'"+row['revision_no']+"\'"+','+"\'"+row['mold_no']+"\'"+','+"\'"+row['drawing_no']+"\'"+
                        ','+"\'"+row['drawing_name']+"\'"+','+"\'"+row['machine_code']+"\'"+
                        ')">'+
                        '<i class="fa fa-eye"></i>&nbsp VIEW</button>&nbsp';
                       
                      return btn;
                    }
                },
                {"data":"ctrl_no"},
                {"data":"drawing_no"},
                {"data":"revision_no"},
                {"data":"drawing_name"},
                {"data":"machine_code"},
                {"data":"mold_no"},
                {"data":"updated_at"}
            ]
        });
    }



    return this_data;
})();