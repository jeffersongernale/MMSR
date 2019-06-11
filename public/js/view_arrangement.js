

var view_pdf = (function(){

    var this_data = {};

  this_data.copy_pdf = function(){

    var pdf_name = $('#txt_drawing_no').val() + "_" +$('#txt_rev_no').val();
    console.log(pdf_name);
    $.ajax({
        url:"view_pdf/copy",
        type:"POST",
        data: {
            'pdf_name':pdf_name
        },
        success:function(data){
           console.log(data);
           if(data=="fail"){
            Swal.fire({
                title: 'ERROR!',
                html: 'No such file exists. Please check the path if the corresponding PDF is already saved in the shared folder.',
                type: 'error'
            });
        }
        else{
        window.open('/MMSR/public/upload/view_arrangement/'+pdf_name+'.pdf', '_blank');

        }
        },
        error: function (data) {
            console.log(data);
            Swal.fire({
                title: 'ERROR!',
                html: 'No such file exists. Please check the path if the corresponding PDF is already saved in the shared folder.',
                type: 'error'
            });
           
        },
        complete: function(data){
            
        }
    });


  }


    return this_data;


})();