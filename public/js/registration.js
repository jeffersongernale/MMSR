$(document).ready(function(){
    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});


    $(document).ajaxStart(function(){
        $("#wait").css("display", "block");
    });

    $(document).ajaxComplete(function(){
        $("#wait").css("display", "none");
    });
});





var Registration = (function(){
    var this_data = {};


    this_data.Insert = function(id){

        var record_type = '';
        if($('#chk_trial').prop('checked')==true)
        {
            record_type='TRIAL';
        }
        else{
            record_type='PRODUCTION';
        }
        //main_register_tbl
        var drawing_no = $('#txt_drawing_no').val();
        var revision_no = $('#txt_rev_no').val();
        var drawing_name = $('#txt_drawing_name').val();
        var machine_no = $('#slc_machine_no').val();
        var color_no = $('#txt_color_no').val();
        var matl_name = $('#txt_matl_name').val();
        var matl_grade = $('#txt_matl_grade').val();
        var matl_color = $('#txt_matl_color').val();
        var resin_temp = $('#txt_resin_temp').val();
        var drying_temp = $('#txt_drying_temp').val();
        var drying_hrs = $('#txt_drying_hrs').val();
        var die_type = $('#slc_die_type').val();
        var no_cavity = $('#txt_no_cavity').val();
        var rel_items = $('#txtarea_rel_items').val();
        var good_cav = $('#txt_good_cav').val();
        var mold_no = $('#txt_mold_no').val();
        var mold_loc = $('#txt_mold_loc').val();
        var product_size = $('#txt_product_size').val();
        var packaging_class = $('#txt_packaging_class').val();
        var qty_per_bag = $('#txt_qty_per_bag').val();
        var pcase_max = $('#txt_pcase_max').val();
        var SPQ_Remarks = $('#txtarea_SPQ_Remarks').val();
        //mct_setting
        var die_temp_core = $('#txt_die_temp_core').val();
        var die_temp_cavity = $('#txt_die_temp_cavity').val();
        var mold_temp_control = $('#txt_mold_temp_ctrl').val();

        die_temp_core = (die_temp_core=='')? '0':die_temp_core;
        die_temp_cavity = (die_temp_cavity=='')? '0':die_temp_cavity;
        mold_temp_control = (mold_temp_control=='')? '0':mold_temp_control;

        //cylinder_temp_tbl
        var nozzle = $('#txt_Nozzle').val();
        var barrel1 = $('#txt_Barrel1').val();
        var barrel2 = $('#txt_Barrel2').val();
        var barrel3 = $('#txt_Barrel3').val();
        var feed_throat = $('#txt_Feed_Throat').val();
        nozzle = (nozzle=='')? '0':nozzle;
        barrel1 = (barrel1=='')? '0':barrel1;
        barrel2 = (barrel2=='')? '0':barrel2;
        barrel3 = (barrel3=='')? '0':barrel3;
        feed_throat = (feed_throat=='')? '0':feed_throat;
        // inj_pack_setting_tbl
        
        var inj_step_count = $('#btn_add_inj_step').attr('data-count');
        var inj_step = [];

         for(x=1;x<=inj_step_count;x++)
         {
            inj_step.push({
                "IStep": $('#txt_IStep'+x).val(),
                "Inj_Step": $('#txt_Inj_Step'+x).val()
                
            });
         }   

        inj_step_string = JSON.stringify(inj_step);

        var inj_step_mid = $('#txt_Inj_step').val();
        var max_inj_pressure = $('#txt_Max_Inj_Pres').val();
        var actual_pressure = $('#txt_Act_Inj_Pres').val();
        var max_inj_time = $('#txt_Max_Inj_Time').val();
        var actual_time = $('#txt_Act_Time').val();
        var max_pack_velo = $('#txt_Max_Pack_Velo').val();
        var pos_trans = $('#txt_POS_Trans').val();
        var pack_step_mid = $('#txt_Pack_step').val();

        var pack_step_count = $('#btn_add_pack_step').attr('data-count');
        var pack_step = [];
        for(x=1;x<=pack_step_count;x++)
        {
           pack_step.push({
            "Pack_Step": $('#txt_Pack_Step'+x).val(),
                "PStep": $('#txt_PStep'+x).val()
               
           });
        }   
        pack_step_string = JSON.stringify(pack_step);
        
        //measuring_condition_setting
        
        var extruder_on = $('#txt_Extruder').val();
        var m_cushion = $('#txt_Mcushion').val();
        var shot_size = $('#txt_Shot_Size').val();
        var dcmp_dist = $('#txt_Dcmp_Dist').val();
        var dcmp_vel = $('#txt_Dcmp_Vel').val();
        var cool_time = $('#txt_Cool_Time').val();

        var ext_step_count = $('#btn_add_extruder').attr('data-count');
        var extruder_json = [];
        for(x=1;x<=ext_step_count;x++)
        {
            extruder_json.push({
                
               
               "kg": $('#txt_Ext_kg'+x).val(),
               "rpm": $('#txt_Ext_rpm'+x).val(),
               "mm": $('#txt_Ext_mm'+x).val()
               
           });
        }   
        extruder_json_string = JSON.stringify(extruder_json);

        //clamping_ejecting_tbl
        var open_limit_POS = $('#txt_OLFO_POS').val();
        var open_limit_VEL = $('#txt_OLFO_VEL').val();
        var close_sw_POS = $('#txt_CS1_POS').val();
        var close_sw_VEL = $('#txt_CS1_VEL').val();
        var close_slow_POS = $('#txt_CSMP_POS').val();
        var close_slow_VEL = $('#txt_CSMP_VEL').val();
        var close_sp_POS = $('#txt_CST_POS').val();
        var mold_prtct_POS = $('#txt_MPPT_POS').val();
        var breakaway_VEL = $('#txt_BB_VEL').val();
        var open1_POS = $('#txt_O1_POS').val();
        var open1_VEL = $('#txt_O1_VEL').val();
        var open2_POS = $('#txt_O2_POS').val();
        var open2_VEL = $('#txt_O2_VEL').val();
        var full_open_POS = $('#txt_FOFO_POS').val();
        var eject_start_POS = $('#txt_ESES_POS').val();
        var pulses = $('#txt_Pulses').val();
        var FWD_POS = $('#txt_FWD_POS').val();
        var FWD_VEL = $('#txt_FWD_VEL').val();
        var FWD_DWELL = $('#txt_FWD_DWELL').val();
        var ADV_POS = $('#txt_ADV_POS').val();
        var ADV_VEL = $('#txt_ADV_VEL').val();
        var ADV_DWELL = $('#txt_ADV_DWELL').val();
        var REV_POS = $('#txt_REV_POS').val();
        var REV_VEL = $('#txt_REV_VEL').val();
        var REV_DWELL = $('#txt_REV_DWELL').val();
        var ejector_delay = $('#txt_Ejector_Delay').val();
        var auto_die_height = $('#txt_Die_Height').val();

        //product_info_tbl
        var machine_cycle_time = $('#txt_machine_cycle_time').val();
        var sprue_weight = $('#txt_sprue_weight').val();
        var sub_part_weight = $('#txt_sub_part_weight').val();
        var additional_cycle_time = $('#txt_additional_cycle_time').val();

        var count = parseInt($('#btn_add_weight').attr('data-count'));
        var pweight_json = [];
        for(var x = 1; x<=count;x++)
        {
            pweight_json.push({
                x: $('#txt_product_weight'+x).val()
            }); 
        }



        if(drawing_no=="" || mold_no=="" || machine_no=="0")
        {
            iziToast.error({
                title: 'ERROR!',
                position: 'topCenter',
                message: 'Oops! Something went wrong. Please fill out all the necessary fields <br> [DRAWING NUMBER, MOLD NUMBER, MACHINE]',
            });
        }
        else{
            $.ajax({
                url: 'registration/insert',
                type:'POST',
                data:{
                    'id':id,
                    'drawing_no': drawing_no,
                    'revision_no': revision_no,
                    'drawing_name': drawing_name,
                    'machine_no': machine_no,
                    'color_no':color_no,
                    'matl_name': matl_name,
                    'matl_grade': matl_grade,
                    'matl_color': matl_color,
                    'resin_temp': resin_temp,
                    'drying_temp': drying_temp,
                    'drying_hrs':drying_hrs,
                    'die_type': die_type,
                    'no_cavity': no_cavity,
                    'related_items': rel_items,
                    'no_good_cavity': good_cav,
                    'mold_no': mold_no,
                    'mold_location':mold_loc,
                    'product_size': product_size,
                    'packaging_class': packaging_class,
                    'qty_per_bag': qty_per_bag,
                    'pcase_max_qty': pcase_max,
                    'remarks':SPQ_Remarks,
                    'record_type': record_type,
                    //mct_settings
                    'die_temp_core':die_temp_core,
                    'die_temp_cavity':die_temp_cavity,
                    'mold_temp_control':mold_temp_control,
                    //cylinder
                    'nozzle':nozzle,
                    'barrel1':barrel1,
                    'barrel2':barrel2,
                    'barrel3':barrel3,
                    'feed_throat':feed_throat,
                    //inj_pack
                    'inj_step_mid':inj_step_mid,
                    'inj_step':inj_step_string,
                    'max_inj_pressure':max_inj_pressure,
                    'actual_pressure':actual_pressure,
                    'max_inj_time':max_inj_time,
                    'actual_time':actual_time,
                    'max_pack_velo':max_pack_velo,
                    'pos_trans':pos_trans,
                    'pack_step_mid':pack_step_mid,
                    'pack_step':pack_step_string,
                    //measuring_condition_setting_tbl
                    'extruder_on':extruder_on,
                    'extruder_json': extruder_json_string,
                    'm_cushion':m_cushion,
                    'shot_size':shot_size,
                    'dcmp_dist':dcmp_dist,
                    'dcmp_vel':dcmp_vel,
                    'cool_time':cool_time,
                    //clamping and ejecting 
                    'open_limit_POS':open_limit_POS,
                    'open_limit_VEL':open_limit_VEL,
                    'close_sw_POS':close_sw_POS,
                    'close_sw_VEL':close_sw_VEL,
                    'close_slow_POS':close_slow_POS,
                    'close_slow_VEL':close_slow_VEL,
                    'close_sp_POS':close_sp_POS,
                    'mold_prtct_POS':mold_prtct_POS,
                    'breakaway_VEL':breakaway_VEL,
                    'open1_POS':open1_POS,
                    'open1_VEL':open1_VEL,
                    'open2_POS':open2_POS,
                    'open2_VEL':open2_VEL,
                    'full_open_POS':full_open_POS,
                    'eject_start_POS':eject_start_POS,
                    'pulses':pulses,
                    'FWD_POS':FWD_POS,
                    'FWD_VEL':FWD_VEL,
                    'FWD_DWELL':FWD_DWELL,
                    'ADV_POS':ADV_POS,
                    'ADV_VEL':ADV_VEL,
                    'ADV_DWELL':ADV_DWELL,
                    'REV_POS':REV_POS,
                    'REV_VEL':REV_VEL,
                    'REV_DWELL':REV_DWELL,
                    'ejector_delay':ejector_delay,
                    'auto_die_height':auto_die_height,
                    //product_info
                    'machine_cycle_time':machine_cycle_time,
                    'sprue_weight':sprue_weight,
                    'sub_part_weight':sub_part_weight,
                    'additional_cycle_time':additional_cycle_time,
                    'product_weight':pweight_json
    
                },
                success: function (data) {
                    //alert(data);
                    
                    if(data=="true")
                    {
                       
                        Swal.fire(
                            'SUCCESS!',
                            'New Mold Machine Setup Record Added!',
                            'success'
                        );

                        validate_field.clear_field();

                    }
                    else
                    {
                        iziToast.error({
                            title: 'ERROR!',
                            icon:'fa fa-times',
                            position: 'topCenter',
                            message: 'Oops! Something went wrong. Please try again<br>',
                        });

                        Swal.fire(
                            'ERROR!',
                            'Oops! Something went wrong. Please try again',
                            'error'
                        );
                    }
                    
                },
                error: function (data) {
                    marker = JSON.stringify(data);
                    console.log(data);
                    Swal.fire(
                        'ERROR!',
                        'Oops! Something went wrong. Please try again',
                        'error'
                    );
                }
            });
        }
    }


    this_data.CheckCtrl = function(){
        var part_no = $('#txt_drawing_no').val();
        var mold_no = $('#txt_mold_no').val();
        var machine_no = $('#slc_machine_no').val();
        var record_type;

        if($('#chk_trial').prop('checked')==true)
        {
            record_type = "TRIAL";
        }
        else
        {
            record_type = "PRODUCTION";
        }
        //"sweetalert2": "^8.2.6"
        // console.log(validate_field.check_fields());
        var validate_req_field = validate_field.check_fields();
        if(validate_req_field=="true"){
            $.ajax({
                url: 'registration/check_ctrl',
                type:'POST',
                data:{
                    'part_no':part_no,
                    'mold_no':mold_no,
                    'machine_no':machine_no,
                    'record_type': record_type
                },
                success:function(data){
                    
                    if(data!="nomatch")
                    {
                        Swal.fire({
                            title: 'RECORD EXISTS',
                            text: "The system detects that the provided drawing no, mold no and machine already exists. "+
                                  "Please choose an option on what to do with this records.",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            cancelButtonText: 'Add to Blocklist',
                            confirmButtonText: 'Save New Ctrl Number'
                          }).then((result) => {
                            if (result.value) 
                            {
                                Registration.Insert(data);
                            }
                            else{
                                Registration.BlockList(data);
                            }
                          });
                    }
                    else
                    {
                        Registration.Insert(data);
                    }
                   
                    //console.log(data);
                },
                error:function(data){
                    console.log(data);
                }
                
            });
        }
        else{
            
            Swal.fire({
                title: 'ERROR!',
                html: "Please complete all neccessary fields! <br><b>"+validate_req_field+"</b> is <b>REQUIRED.</b>",
                type: 'error',
            });
        }
      

    }

    this_data.slc_machine = function(){
        var tonnage=$('#slc_machine_no').find(':selected').attr('data-tonnage');
        $('#txt_machine_tonnage').val(tonnage);
    }

    this_data.Percentage_pn = function(id,negativelbl,positivelbl,tolerance)
    {
        if($('#'+id).val()!="")
        {
            var base_value = parseFloat($('#'+id).val());
            var percentage = base_value * .10;
            var neg_value = base_value - percentage;
            var pos_value = base_value + percentage;
            if(negativelbl!="" && positivelbl!="")
            {
                $('#'+negativelbl).html((neg_value.toFixed(2)));
                $('#'+positivelbl).html((pos_value.toFixed(2)));
            }
            if(tolerance != "")
            {
                $('#'+tolerance).html('± '+percentage.toFixed(2));
            }
            
        }
        else
        { 
            if(negativelbl!="" && positivelbl!="")
            {
                $('#'+negativelbl).html('0');
                $('#'+positivelbl).html('0');
            }
            if(tolerance != "")
            {
                $('#'+tolerance).html('± 0');
            }
        }
    }

    this_data.Add_Input_Field = function(id_button,id_container,id_input1)
    {
        var count =parseInt($('#'+id_button).attr('data-count'));
        count+=1;
        $('#'+id_button).attr('data-count',count);
        var add_input = '<tr class="tr_pweight'+count+'">';
       
            add_input+='<td>'+
                        '<input type="text" class="form-control" id="'+id_input1+count+'" placeholder="Input Product Weight">'+
                        '</td>';
       
        add_input+="</tr>";
        $('#'+id_container).append(add_input);
        
    }

    

    this_data.Add_Inj_Pack = function(id_btn,id_container,id_tr,id_input1,id_input2)
    {
        var count =parseInt($('#'+id_btn).attr('data-count'));
        count+=1;
        $('#'+id_btn).attr('data-count',count);
        var add_input = '<tr class="'+id_tr+count+'">'+
                        '<td>'+count+'</td>'+
                        '<td>'+
                        '<label id="lbl_'+id_input1+count+'" class="col-sm-4 control-label">0</label>'+
                        '<input id="txt_'+id_input1+count+'" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"'+
                        'onkeyup="'+
                        "Registration.Percentage_pn('txt_"+id_input1+count+"','','','lbl_"+id_input1+count+"')"+'">'+
                        '<label id="lbl_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                        '</td>'+
                        '<td>'+
                        '<label id="lbl_'+id_input2+count+'" class="col-sm-4 control-label">0</label>'+
                        '<input id="txt_'+id_input2+count+'" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"'+
                        'onkeyup="'+
                        "Registration.Percentage_pn('txt_"+id_input2+count+"','','','lbl_"+id_input2+count+"')"+'">'+
                        '<label id="lbl_mm/s" class="col-sm-4 control-label">mm</label>'+
                        '</td>'+
                        '</tr>';

        $('#'+id_container).append(add_input);
    }

    this_data.Add_Extrude_input = function()
    {
        var count =parseInt($('#btn_add_extruder').attr('data-count'));
        count+=1;
        $('#btn_add_extruder').attr('data-count',count);
        var add_input = '<tr class="tr_extruder'+count+'">'+
                        '<td>'+count+'</td>'+
                        '<td>'+
                        '<label id="lbl_Ext_kg'+count+'" class="col-sm-4 control-label">±0</label>'+
                        '<input id="txt_Ext_kg'+count+'" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"'+
                        'onkeyup="'+
                        "Registration.Percentage_pn('txt_Ext_kg"+count+"','','','lbl_Ext_kg"+count+"')"+'">'+
                        '<label id="lbl_static" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>'+
                        '</td>'+
                        '<td colspan="2">'+
                        '<label id="lbl_Ext_rpm'+count+'" class="col-sm-4 control-label">±0</label>'+
                        '<input id="txt_Ext_rpm'+count+'" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"'+
                        'onkeyup="'+
                        "Registration.Percentage_pn('txt_Ext_rpm"+count+"','','','lbl_Ext_rpm"+count+"')"+'">'+
                        ' <label id="lbl_static" class="col-sm-4 control-label">rpm</label>'+
                        '</td>'+
                        '<td>'+
                        '<label id="lbl_Ext_mm'+count+'" class="col-sm-4 control-label">±0</label>'+
                        '<input id="txt_Ext_mm'+count+'" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"'+
                        'onkeyup="'+
                        "Registration.Percentage_pn('txt_Ext_mm"+count+"','','','lbl_Ext_mm"+count+"')"+'">'+
                       ' <label id="lbl_static" class="col-sm-4 control-label">mm</label>'+
                        '</td>'+
                        '</tr>';

        $('#extruder_tbl').append(add_input);
    }
    

    this_data.Remove_Input_Field = function(id_button,id_tr)
    {
        var count =parseInt($('#'+id_button).attr('data-count'));
        if(count!=1)
        {
        $('.'+id_tr+count).remove();   
        count-=1;
        $('#'+id_button).attr('data-count',count);
        }
    }
    

    this_data.test = function(){

       /*  var count = parseInt($('#btn_add_weight').attr('data-count'));
        var pweight_json = {};
        for(var x = 1; x<=count;x++)
        {
            pweight_json[x]= $('#txt_product_weight'+x).val();
        }

        console.log(pweight_json); */

       console.log($('#txt_drawing_no').attr('name'));
        // var record_type =  $('#chk_trial').prop('checked');
        // console.log(record_type);

    }    

    this_data.BlockList = function(ctrl_id){
        $.ajax({
            url: 'registration/blocklist',
            type:'POST',
            data:{
                'ctrl_id':ctrl_id
            },
            success:function(data){
                Swal.fire({
                    title: 'SUCCESS!',
                    html: 'Duplicate Record Added to Blocklist. Please Save <b>again</b> this record if you want to save this data',
                    type: 'success'
                });
                // validate_field.clear_field();
            },
            error: function(data){
                console.log(data);
            }
        });

    }


  
   

    return this_data;
})();

/* 
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

})(); */

