
// var myVar = setInterval(myTimer, 1000);
var check_id = 0;
var review_id = 0;
var approve_id = 0;

$(document).ready(function(){

    badges.loadbadge();
});

var badges = (function(){
    var this_data = {};

    this_data.checkbadge = function(){
        $.ajax({
            url:"timer/checklist",
            type:"GET",
            // global: false,
            success: function(data){
                $('#check_id').html(data);
                check_id=parseInt(data);

                if(check_id=="0"){
                    $('#check_id').css('display','none');
                }
                else{
                    $('#check_id').css('display','block');
                }
            },
            error:function(data){
                console.log(data);
            }
        });
    }
    
    this_data.reviewbadge = function(){
     
    
        $.ajax({
            url:"timer/reviewlist",
            type:"GET",
            // global: false,
            success: function(data){
                $('#review_id').html(data);
                review_id=parseInt(data);

                if(review_id=="0"){
                    $('#review_id').css('display','none');
                }
                else{
                    $('#review_id').css('display','block');
                }
                
            },
            error:function(data){
                console.log(data);
               
            }
        });
    
      
    
      

    }

    this_data.approvebadge = function(){
        $.ajax({
            url:"timer/approvelist",
            type:"GET",
            // global: false,
            success: function(data){
                $('#approve_id').html(data);
                approve_id=parseInt(data);

                if(approve_id=="0"){
                    $('#approve_id').css('display','none');
                }
                else{
                    $('#approve_id').css('display','block');
                }
            },
            error:function(data){
                console.log(data);
                
            }
        });
    }

    this_data.loadbadge = function(){
        badges.checkbadge();
        badges.reviewbadge();
        badges.approvebadge();
        // $('#total_id').html(check_id+review_id+approve_id);
    

    }

    return this_data;

})();

/* 
function myTimer() {
    
   
} */

