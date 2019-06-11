
var validate_field = (function(){

    var this_data = {};

    this_data.check_fields = function(){
        var val_result = "false";
        $('.required_field').each(function() {
            // console.log( this.id );
            // console.log($('#'+this.id).val());
            if($("#"+this.id).val()==""){
                
                val_result= $("#"+this.id).attr('name');
                return false;
            }
            else{
                val_result= "true";
                // console.log( 'true:'+this.id );
                // return true;
            }
        });
        return val_result;
    }

    this_data.clear_field = function(){
        console.log('trigger'); 
        $('.input_field').each(function() {
            // console.log(this.id);       
            $("#"+this.id).val('');
        });
    }

    return this_data;

})();