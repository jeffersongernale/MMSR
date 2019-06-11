var Print_Data = (function(){

    
    var this_data = {};

    this_data.Print_Info = function(){
        var id = $('.modal_view_data').attr('data-main');
        var after_id = $('.modal_view_data').attr('data-afterid');
        var randomnumber = Math.floor((Math.random()*100)+1);  
        // console.log('id')
        window.open("/MMSR/public/pdf/print/"+id+"/"+after_id,"_blank",'PopUp',randomnumber,'scrollbars=1,menubar=1,resizable=1,width=500,height=700'); 
    }

    this_data.Print_Info2 = function(){
        var id = $('.modal_view_data').attr('data-id');
        var randomnumber = Math.floor((Math.random()*100)+1);  
        // console.log('id')
        window.open("/MMSR/public/pdf/print2/"+id,"_blank",'PopUp',randomnumber,'scrollbars=1,menubar=1,resizable=1,width=500,height=700'); 
    }

    return this_data;

})();