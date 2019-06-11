

$(document).ready(function(){
    //UserMgmt.loadtable();

    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $('.select2').select2({width: '100%'});


        $(document).ajaxStart(function(){
            $("#wait").css("display", "block");
        });
    
        $(document).ajaxComplete(function(){
            $("#wait").css("display", "none");
    });
    
    $('#upload_form').on('submit',function(event){
        event.preventDefault();
        // UserMgmt.insert();
        var Name = $('#txt_name').val();
        var Email = $('#txt_email').val();
        var User_Type = $('#slc_user_type').val();
        var Username = $('#txt_username').val();
        var Password = $('#txt_password').val();
        var con_pwd = $('#txt_confirm_password').val();

        if(Password==con_pwd){
            $.ajax({
                url:'user/insert',
                method:"POST",
                data: new FormData(this),
                contentType:false,
                cache:false,
                processData: false,
            success:function(data){
                if(data=="true"){
                    Swal.fire({
                        title:'SUCCESS!',
                        text:'New User Added',
                        type: 'success'
                    });
                    $('#txt_name').val('');
                    $('#txt_email').val('');
                    $('#slc_user_type').val('User');
                    $('#txt_username').val('');
                    $('#txt_password').val('');
                    $('#file_picture').val('');
                    $('#txt_confirm_password').val('');
                    UserMgmt.loadtable('destroy');
                }
                else{
                    Swal.fire({
                        title:'ERROR!',
                        text:'Opps. Something went wrong. Please try again',
                        type: 'error'
                    });
                }
                
            },
            error:function(data){
                console.log(data);
                Swal.fire({
                    title:'ERROR!',
                    text:'Opps. Something went wrong. Please try again. Try changing your username or check the network connection',
                    type: 'error'
                });
            }
    
            })
        }
        else{
            Swal.fire({
                title: 'ERROR!',
                text: 'Password did not match',
                type:'error'
            });
        }
       
    }); 
    
    UserMgmt.loadtable();

});





var UserMgmt = (function(){
    var this_data = {};

    this_data.edit = function(id){

        $.ajax({
            url:"user/edit",
            type:"POST",
            data: {
                'id':id
            },
            success:function(data){
                $('#btn_update').attr('data-id',id);
                $('#txt_name').val(data.name);
                $('#txt_email').val(data.email);
                $('#slc_user_type').val(data.usertype);
                $('#txt_username').val(data.username);
                $('#chk_check').bootstrapToggle(data.checker);
                $('#chk_review').bootstrapToggle(data.reviewer);
                $('#chk_approve').bootstrapToggle(data.approver);
                var dp = data.picture.substring(13);
                $('#profile_pic').attr('src','/MMSR/public/upload/picture/'+dp);
            },
            error: function(){

            }
        });

    }

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
            "searching":true,
            "pageLength": 20,
            "scrollY":"600px",
            "language": 
            {          
            "processing": " <div style='background:white'><i class='fa fa-refresh fa-spin'></i><br><b>Please wait for a moment..</b></div>",
            },
            "ajax": {
                url:"user/loadtable",
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
                        'onclick="UserMgmt.edit('+"\'"+data+"\'"+')">'+'<i class="fa fa-eye"></i>&nbsp EDIT</button>&nbsp';

                        btn+='&nbsp&nbsp<button class="btn btn-danger btn-sm"'+'onclick="UserMgmt.delete('+"\'"+data+"\'"+
                        ')">'+'<i class="fa fa-exclamation-triangle"></i>&nbsp DELETE</button>'
                      return btn;
                    }
                },
                {"data": "picture",
                "render": function ( data, type, row ) {
                    var pic_name = data.substring(13);
                    var img  = '<img src="/MMSR/public/upload/picture/'+pic_name+'" style="height: 50px;width: 50px; border-radius: 100px">'
                  return img;
                }},
                
                {"data":"name"},
                {"data":"username"},
                {"data":"usertype"}
            ]
        });
    }

    this_data.update = function(){

        var id =  $('#btn_update').attr('data-id');
        var checker='off';
        var reviewer='off';
        var approver='off';
        // alert($('#chk_check').prop('checked'));
        
        if($('#chk_check').prop('checked')){
            checker='on';
        }
        if($('#chk_review').prop('checked')){
            reviewer='on';
        }
        if($('#chk_approve').prop('checked')){
            approver='on';
        }
        $.ajax({
            url:"user/update",
            type:"POST",
            data: {
                'id':id,
                'name': $('#txt_name').val(),
                'email': $('#txt_email').val(),
                'usertype':  $('#slc_user_type').val(),
                'username': $('#txt_username').val(),
                'checker': checker,
                'reviewer': reviewer,
                'approver': approver,
                'password': $('#txt_password').val()
            },
            success:function(data){
                Swal.fire({
                    title:'SUCCESS!',
                    text: 'Your record has been updated.',
                    type: 'success'
                });
                $('#btn_update').attr('data-id',0);
                UserMgmt.loadtable('destroy');
            },
            error: function(){
                console.log(data);
            }
        });

    }


    this_data.delete  = function(id){

        $.ajax({
            url:"user/delete",
            type:"POST",
            data: {
                'id':id,
            },
            success:function(data){
                Swal.fire({
                    title:'SUCCESS!',
                    text: 'Record has been deleted.',
                    type: 'success'
                });
                UserMgmt.loadtable('destroy');
            },
            error: function(){
                console.log(data);
            }
        });

    }

    return this_data;
})();


