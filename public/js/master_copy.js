
$(document).ready(function(){

    $(document).ajaxStart(function(){
        $("#wait").css("display", "block");
    });

    $(document).ajaxComplete(function(){
        $("#wait").css("display", "none");
    });

    $('.select2').select2({width: '100%'});

    
});


var Master_Copy = (function(){

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
            "scrollY":"55vh",
            "language": 
            {          
            "processing": " <div style='background:white'><i class='fa fa-refresh fa-spin'></i><br><b>Please wait for a moment..</b></div>",
            },
            "ajax": {
                url:"master_copy/datatable",
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
                        'onclick="Master_Copy.ViewData('+"\'"+data+"\'"+
                        ')">'+
                        '<i class="fa fa-eye"></i>&nbsp VIEW</button>&nbsp';

                        // btn+='<button class="btn btn-danger btn-sm" title="Mark as Checked"><i class="fa fa-check-square"></i>&nbsp MARK CHECKED</button>'
                       
                      return btn;
                    }
                },
                
                {"data":"drawing_no"},
                {"data":"revision_no"},
                {"data":"drawing_name"},
                {"data":"machine_code"},
                {"data":"mold_no"},
                {"data":"record_type"},
                {"data":"created_at"}
            ]
        });
    }

    this_data.clear_search = function(){

        $('#slc_part_no').val('');
        $('#slc_mold_no').val('');
         $('#slc_machine_no').val('');
         $('#slc_part_no').select2().trigger('change');
         $('#slc_mold_no').select2().trigger('change');
         $('#slc_machine_no').select2().trigger('change');
        
        
            Master_Copy.loadtable('destroy');
       
    }

    this_data.ViewData = function(main_reg_id,after_id){

        Master_Copy.load_main_reg(main_reg_id);
        // Master_Copy.load_after_data(after_id,main_reg_id);
        Master_Copy.load_before_data('',main_reg_id);
        
        $('.get_id .input_field').attr('readonly', false);
        $('.mold_sheet .input_field').attr('readonly', false);
        $('.record_info_cont .input_field').attr('readonly', false);
        $("#slc_input2").removeAttr("disabled");
        $("#txt_machine_no").removeAttr("disabled");
        $("#txt_die_type").removeAttr("disabled");
        $('.modal_view_data').attr('data-id',main_reg_id);
        $('.modal_view_data').modal('show');
    }

    this_data.load_main_reg = function(id)
{
    $.ajax({
        url:"master_copy/load_record_info",
        type:"POST",
        data: {
            'id':id
        },
        success:function(data){
           
            //main_reg_details
            $('#txt_drawing_no').val(data.drawing_no);
            $('#txt_machine_no').val(data.machine_id);
            $('#txt_matl_name').val(data.matl_name);
            $('#txt_resin_temp').val(data.resin_temp);
            $('#txt_rev_no').val(data.revision_no);
            $('#txt_machine_tonnage').val(data.machine_ton);
            $('#txt_matl_grade').val(data.matl_grade);
            $('#txt_drying_temp').val(data.drying_temp);
            $('#txt_drawing_name').val(data.drawing_name);
            $('#txt_color_no').val(data.color_no);
            $('#txt_matl_color').val(data.matl_color);
            $('#txt_drying_hrs').val(data.drying_hrs);

            //mold die basic information
            $('#txt_die_type').val(data.die_type_id);
            $('#txt_number_cav').val(data.no_cavity);
            $('#txt_mold_number').val(data.mold_no);
            $('#txt_number_good_cav').val(data.no_good_cavity);
            $('#txt_related_items').val(data.related_items);
            $('#txt_mold_location').val(data.mold_location);

            //prod_SPQ
            $('#txt_product_size').val(data.product_size);
            $('#txt_packaging_class').val(data.packaging_class);
            $('#txt_quantity_per_bag').val(data.qty_per_bag);
            $('#txt_pcase_max_qty').val(data.pcase_max_qty);
            $('#txt_remarks').val(data.remarks);
            $('.reg_name').html(data.name.toUpperCase());
            
            
           
        },
        error:function(data){
            console.log(data);
        }
    });
    }

    this_data.load_before_data = function(id,main_register_id){
        $.ajax({
            url:"master_copy/load_before_data",
            type:"POST",
            data: {
                
                'main_register_id':main_register_id
            },
            success:function(data){
                // console.log(data.mct_setting.die_temp_core);

               
                // $("#wait").css("display", "block");
                
                $('#txt_before_ctrl_no').val(data.ctrl_no.ctrl_no);
                $('#txt_before_date').val(data.ctrl_no.created_at);

                // mct_setting
                $('#txt_before_die_temp_core').val(data.mct_setting[0].die_temp_core);
                $('#txt_before_die_temp_cavity').val(data.mct_setting[0].die_temp_cavity);
                $('#txt_before_mold_temp_ctrl').val(data.mct_setting[0].mold_temp_control);

                 //product_info
                 var pweight = JSON.parse(data.product_info[0].product_weight);
                 $('#txt_before_machine_cycle_time').val(data.product_info[0].machine_cycle_time);
                 $('#txt_before_sprue_weight').val(data.product_info[0].sprue_weight);
                 $('#txt_before_sub_part_weight').val(data.product_info[0].sub_part_weight);
                 $('#txt_before_additional_cycle_time').val(data.product_info[0].additional_cycle_time);
                 var html_pweight = '<table class="table table-bordered text-center table-striped bold-text pweight"><tbody>'+
                                    '<tr><td></td>'+
                                    '<td>'+
                                    '<button class="btn btn-secondary" id="btn_add_weight" onclick="Master_Copy.Add_Input_Field('+"\'"+'btn_add_weight'+"\'"+','+"\'"+'pweight'+"\'"+
                                    ','+"\'"+'txt_before_product_weight'+"\'"+')"'+ 
                                    'data-count="1"><i class="fa fa-plus"></i></button>'+
                                    ' <button class="btn btn-secondary" id="btn_add_weight" onclick="Master_Copy.Remove_Input_Field('+"\'"+'btn_add_weight'+"\'"+','+"\'"+'tr_pweight'+"\'"+')"><i class="fa fa-minus"></i></button>'+
                                    '</td>'+
                                    '</tr>';
                
                 for(a=0;a<pweight.length;a++)
                 {
                     html_pweight += '<tr class="tr_pweight'+(a+1)+'">'+
                                     '<td>PRODUCT WEIGHT:</td>'+
                                     '<td><input type="text" class="input_field" readonly id="txt_before_product_weight'+a+'" '+
                                     'placeholder="Input Product Weight" value="'+pweight[a].x+'" onkeypress="Master_Copy.Percentage_pn()"></td>'+
                                     '</tr>';
                 }
                 html_pweight+='</tbody></table>'
                 $('.tr_pweight_before').html(html_pweight);
                 $('#btn_add_weight').attr('data-count',pweight.length);
                //clamp_eject
                
                $('#txt_before_OLFO_POS').val(data.clamping_ejecting_setting[0].open_limit_POS);
                $('#txt_before_OLFO_VEL').val(data.clamping_ejecting_setting[0].open_limit_VEL);
                $('#txt_before_CS1_POS').val(data.clamping_ejecting_setting[0].close_sw_POS);
                $('#txt_before_CS1_VEL').val(data.clamping_ejecting_setting[0].close_sw_VEL);
                $('#txt_before_CSMP_POS').val(data.clamping_ejecting_setting[0].close_slow_POS);
                $('#txt_before_CSMP_VEL').val(data.clamping_ejecting_setting[0].close_slow_VEL);
                $('#txt_before_CST_POS').val(data.clamping_ejecting_setting[0].close_sp_POS);
                $('#txt_before_MPPT_POS').val(data.clamping_ejecting_setting[0].mold_prtct_POS);
                $('#txt_before_BB_VEL').val(data.clamping_ejecting_setting[0].breakaway_VEL);
                $('#txt_before_O1_POS').val(data.clamping_ejecting_setting[0].open1_POS);
                $('#txt_before_O1_VEL').val(data.clamping_ejecting_setting[0].open1_VEL);
                $('#txt_before_O2_POS').val(data.clamping_ejecting_setting[0].open2_POS);
                $('#txt_before_O2_VEL').val(data.clamping_ejecting_setting[0].open2_VEL);
                $('#txt_before_FOFO_POS').val(data.clamping_ejecting_setting[0].full_open_POS);
                $('#txt_before_ESES_POS').val(data.clamping_ejecting_setting[0].eject_start_POS);
                $('#txt_before_Pulses').val(data.clamping_ejecting_setting[0].pulses);
                $('#txt_before_FWD_POS').val(data.clamping_ejecting_setting[0].FWD_POS);
                $('#txt_before_FWD_VEL').val(data.clamping_ejecting_setting[0].FWD_VEL);
                $('#txt_before_FWD_DWELL').val(data.clamping_ejecting_setting[0].FWD_DWELL);
                $('#txt_before_ADV_POS').val(data.clamping_ejecting_setting[0].ADV_POS);
                $('#txt_before_ADV_VEL').val(data.clamping_ejecting_setting[0].ADV_VEL);
                $('#txt_before_ADV_DWELL').val(data.clamping_ejecting_setting[0].ADV_DWELL);
                $('#txt_before_REV_POS').val(data.clamping_ejecting_setting[0].REV_POS);
                $('#txt_before_REV_VEL').val(data.clamping_ejecting_setting[0].REV_VEL);
                $('#txt_before_REV_DWELL').val(data.clamping_ejecting_setting[0].REV_DWELL);
                $('#txt_before_Ejector_Delay').val(data.clamping_ejecting_setting[0].ejector_delay);
                $('#txt_before_Die_Height').val(data.clamping_ejecting_setting[0].auto_die_height);

                Master_Copy.Percentage_pn_on_load('txt_before_OLFO_POS','lbl_before_neg_OLFO_POS','lbl_before_pos_OLFO_POS');
                Master_Copy.Percentage_pn_on_load('txt_before_OLFO_VEL','lbl_before_neg_OLFO_VEL','lbl_before_pos_OLFO_VEL');
                Master_Copy.Percentage_pn_on_load('txt_before_CS1_POS','lbl_before_neg_CS1_POS','lbl_before_pos_CS1_POS');
                Master_Copy.Percentage_pn_on_load('txt_before_CS1_VEL','lbl_before_neg_CS1_VEL','lbl_before_pos_CS1_VEL');
                Master_Copy.Percentage_pn_on_load('txt_before_CSMP_POS','lbl_before_neg_CSMP_POS','lbl_before_pos_CSMP_POS');
                Master_Copy.Percentage_pn_on_load('txt_before_CSMP_VEL','lbl_before_neg_CSMP_VEL','lbl_before_pos_CSMP_VEL');
                Master_Copy.Percentage_pn_on_load('txt_before_CST_POS','lbl_before_neg_CST_POS','lbl_before_pos_CST_POS');
                Master_Copy.Percentage_pn_on_load('txt_before_MPPT_POS','lbl_before_neg_MPPT_POS','lbl_before_pos_MPPT_POS');
                Master_Copy.Percentage_pn_on_load('txt_before_BB_VEL','lbl_before_neg_BB_VEL','lbl_before_pos_BB_VEL');
                Master_Copy.Percentage_pn_on_load('txt_before_O1_POS','lbl_before_neg_O1_POS','lbl_before_pos_O1_POS');
                Master_Copy.Percentage_pn_on_load('txt_before_O1_VEL','lbl_before_neg_O1_VEL','lbl_before_pos_O1_VEL');
                Master_Copy.Percentage_pn_on_load('txt_before_O2_POS','lbl_before_neg_O2_POS','lbl_before_pos_O2_POS');
                Master_Copy.Percentage_pn_on_load('txt_before_O2_VEL','lbl_before_neg_O2_VEL','lbl_before_pos_O2_VEL');
                Master_Copy.Percentage_pn_on_load('txt_before_FOFO_POS','lbl_before_neg_FOFO_POS','lbl_before_pos_FOFO_POS');
                Master_Copy.Percentage_pn_on_load('txt_before_ESES_POS','lbl_before_neg_ESES_POS','lbl_before_pos_ESES_POS');
                Master_Copy.Percentage_pn_on_load('txt_before_FWD_POS','lbl_before_neg_FWD_POS','lbl_before_pos_FWD_POS');
                Master_Copy.Percentage_pn_on_load('txt_before_FWD_VEL','lbl_before_neg_FWD_VEL','lbl_before_pos_FWD_VEL');
                Master_Copy.Percentage_pn_on_load('txt_before_FWD_DWELL','lbl_before_neg_FWD_DWELL','lbl_before_pos_FWD_DWELL');
                Master_Copy.Percentage_pn_on_load('txt_before_ADV_POS','lbl_before_neg_ADV_POS','lbl_before_pos_ADV_POS');
                Master_Copy.Percentage_pn_on_load('txt_before_ADV_VEL','lbl_before_neg_ADV_VEL','lbl_before_pos_ADV_VEL');
                Master_Copy.Percentage_pn_on_load('txt_before_ADV_DWELL','lbl_before_neg_ADV_DWELL','lbl_before_pos_ADV_DWELL');
                Master_Copy.Percentage_pn_on_load('txt_before_REV_POS','lbl_before_neg_REV_POS','lbl_before_pos_REV_POS');
                Master_Copy.Percentage_pn_on_load('txt_before_REV_VEL','lbl_before_neg_REV_VEL','lbl_before_pos_REV_VEL');
                Master_Copy.Percentage_pn_on_load('txt_before_REV_DWELL','lbl_before_neg_REV_DWELL','lbl_before_pos_REV_DWELL');

                  //cylinder_temp
                $('#txt_before_Nozzle').val(data.cylinder_temp[0].nozzle);
                $('#txt_before_Barrel1').val(data.cylinder_temp[0].barrel1);
                $('#txt_before_Barrel2').val(data.cylinder_temp[0].barrel2);
                $('#txt_before_Barrel3').val(data.cylinder_temp[0].barrel3);
                $('#txt_before_Feed_Throat').val(data.cylinder_temp[0].feed_throat);

                Master_Copy.Percentage_pn_on_load('txt_before_Nozzle','lbl_before_neg_Nozzle','lbl_before_pos_Nozzle','lbl_before_tol_Nozzle');
                Master_Copy.Percentage_pn_on_load('txt_before_Barrel1','lbl_before_neg_Barrel1','lbl_before_pos_Barrel1','lbl_before_tol_Barrel1');
                Master_Copy.Percentage_pn_on_load('txt_before_Barrel2','lbl_before_neg_Barrel2','lbl_before_pos_Barrel2','lbl_before_tol_Barrel2');
                Master_Copy.Percentage_pn_on_load('txt_before_Barrel3','lbl_before_neg_Barrel3','lbl_before_pos_Barrel3','lbl_before_tol_Barrel3');
                Master_Copy.Percentage_pn_on_load('txt_before_Feed_Throat','lbl_before_neg_Feed_Throat','lbl_before_pos_Feed_Throat','lbl_before_tol_Feed_Throat');


                 //inj_pack
                 var inj_pack_json = JSON.parse(data.inj_pack_setting[0].injection_step);
                 var html_inj_pack = '';
                 $('table #injection_step_tbl_before').html('');
                 for(b = 0; b<inj_pack_json.length;b++)
                 {
                     html_inj_pack='<tr class="tr_inj_pack'+(b+1)+'">'+
                                     '<td>'+(b+1)+'</td>'+
                                     '<td>'+
                                     '<label  id="lbl_before_Inj_Step'+(b+1)+'" class="col-sm-4 control-label">0</label>'+
                                     '<input  id="txt_before_Inj_Step'+(b+1)+'" class="col-sm-4   input_field" type="text"'+
                                     ' placeholder="Input Here.." value="'+inj_pack_json[b].Inj_Step+'" style="width: 60px;" onkeyup="'+
                                     "Master_Copy.Percentage_pn('txt_before_Inj_Step"+(b+1)+"','','','lbl_before_Inj_Step"+(b+1)+"')"+'">'+
                                     '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                                     '</td>'+
                                     '<td>'+
                                     ' <label  id="lbl_before_IStep'+(b+1)+'" class="col-sm-4 control-label">0</label>'+
                                     '<input  id="txt_before_IStep'+(b+1)+'" class="col-sm-4   input_field" type="text" '+
                                     ' placeholder="Input Here.." value="'+inj_pack_json[b].IStep+'"  style="width: 60px;" onkeyup="'+
                                     "Master_Copy.Percentage_pn('txt_before_IStep"+(b+1)+"','','','lbl_before_IStep"+(b+1)+"')"+'">'+
                                     '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm</label>'+
                                     '</td>'+
                                     '</tr>';
                    
                    
                                     $('table #injection_step_tbl_before').append(html_inj_pack);
                                     Master_Copy.Percentage_pn_on_load('txt_before_Inj_Step'+(b+1),'','','lbl_before_Inj_Step'+(b+1));
                                     Master_Copy.Percentage_pn_on_load('txt_before_IStep'+(b+1),'','','lbl_before_IStep'+(b+1));
                     
                 }
                 
                 
                 $('#txt_before_Inj_step').val(data.inj_pack_setting[0].inj_step_mid);
                 $('#txt_before_Max_Inj_Pres').val(data.inj_pack_setting[0].max_inj_pressure);
                 $('#txt_before_Act_Inj_Pres').val(data.inj_pack_setting[0].actual_pressure);
                 $('#txt_before_Max_Inj_Time').val(data.inj_pack_setting[0].max_inj_time);
                 $('#txt_before_Act_Time').val(data.inj_pack_setting[0].actual_time);
                 $('#txt_before_Max_Pack_Velo').val(data.inj_pack_setting[0].max_pack_velo);
                 $('#txt_before_POS_Trans').val(data.inj_pack_setting[0].pos_trans);
                 $('#txt_before_Pack_step').val(data.inj_pack_setting[0].pack_step_mid);
 
                 Master_Copy.Percentage_pn_on_load('txt_before_Max_Inj_Pres','','','lbl_before_Max_Inj_Pres');
                 Master_Copy.Percentage_pn_on_load('txt_before_Max_Inj_Time','','','lbl_before_Max_Inj_Time');
                 Master_Copy.Percentage_pn_on_load('txt_before_Max_Pack_Velo','','','lbl_before_Max_Pack_Velo');
                 Master_Copy.Percentage_pn_on_load('txt_before_POS_Trans','','','lbl_before_POS_Trans');
 
                 var pack_step_json = JSON.parse(data.inj_pack_setting[0].pack_step)
                 var html_pack_step=''
                 $('.table #pack_step_tbl_before').html(html_pack_step);
                 for(c=0;c<pack_step_json.length;c++){
                     html_pack_step='<tr class="tr_pack_step'+(c+1)+'">'+
                                     '<td>'+(c+1)+'</td>'+
                                     '<td><label  id="lbl_before_Pack_Step'+(c+1)+'" class="col-sm-4 control-label"></label>'+
                                     '<input  id="txt_before_Pack_Step'+(c+1)+'" class="col-sm-4   input_field" type="text" '+
                                     'placeholder="Input Here.." style="width: 60px;" value="'+pack_step_json[c].Pack_Step+'" onkeyup="'+
                                     "Master_Copy.Percentage_pn('txt_before_Pack_Step"+(c+1)+"','','','lbl_before_Pack_Step"+(c+1)+"')"+'">'+
                                     '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                                     '</td>'+
                                     '<td><label  id="lbl_before_PStep'+(c+1)+'" class="col-sm-4 control-label">0</label>'+
                                     '<input  id="txt_before_PStep'+(c+1)+'" class="col-sm-4   input_field" type="text" '+
                                     'placeholder="Input Here.." style="width: 60px;" value="'+pack_step_json[c].PStep+'" onkeyup="'+
                                     "Master_Copy.Percentage_pn('txt_before_PStep"+(c+1)+"','','','lbl_before_PStep"+(c+1)+"')"+'">'+
                                     '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm</label>'+
                                     '</td>'+
                                     '</tr>';
                                     $('.table #pack_step_tbl_before').append(html_pack_step);
                                     Master_Copy.Percentage_pn_on_load('txt_before_Pack_Step'+(c+1),'','','lbl_before_Pack_Step'+(c+1));
                                     Master_Copy.Percentage_pn_on_load('txt_before_PStep'+(c+1),'','','lbl_before_PStep'+(c+1));
                 }

                 $('#btn_add_inj_step').attr('data-count',inj_pack_json.length);
                 $('#btn_add_pack_step').attr('data-count',pack_step_json.length);

                 //measuring_condition_setting
                $('#txt_before_Extruder').val(data.measuring_condition_setting[0].extruder_on);
                var extruder_json = JSON.parse(data.measuring_condition_setting[0].extruder_json);
                var html_extruder = '';
                $('.table #extruder_tbl_before').html(html_extruder);
                for(d=0;d<extruder_json.length;d++)
                {
                    html_extruder = '<tr class="tr_extruder'+(d+1)+'">'+
                                    '<td>'+(d+1)+'</td>'+
                                    '<td>'+
                                    '<label id="lbl_before_Ext_kg'+(d+1)+'" class="col-sm-4 control-label">±0</label>'+
                                    '<input type="text"  id="txt_before_Ext_kg'+(d+1)+'" placeholder="Input Here.." '+
                                    'class=" col-sm-4 input_field" value="'+extruder_json[d].kg+'" onkeyup="'+
                                    "Master_Copy.Percentage_pn('txt_before_Ext_kg"+(d+1)+"','','','lbl_before_Ext_kg"+(d+1)+"')"+'">'+
                                    '<label id="lbl_static" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>'+
                                    '</td>'+
                                    '<td colspan="2">'+
                                    '<label id="lbl_before_Ext_rpm'+(d+1)+'" class="col-sm-4 control-label">±0</label>'+
                                    '<input type="text"  id="txt_before_Ext_rpm'+(d+1)+'" placeholder="Input Here.." '+
                                    'class=" col-sm-4 input_field" value="'+extruder_json[d].rpm+'"  onkeyup="'+
                                    "Master_Copy.Percentage_pn('txt_before_Ext_rpm"+(d+1)+"','','','lbl_before_Ext_rpm"+(d+1)+"')"+'">'+
                                    ' <label id="lbl_static" class="col-sm-4 control-label">rpm</label>'+
                                    '</td>'+
                                    '<td>'+
                                    '<label id="lbl_before_Ext_mm'+(d+1)+'" class="col-sm-4 control-label">±0</label>'+
                                    '<input type="text"  id="txt_before_Ext_mm'+(d+1)+'" placeholder="Input Here.." '+
                                    'class=" col-sm-4 input_field" value="'+extruder_json[d].mm+'" onkeyup="'+
                                    "Master_Copy.Percentage_pn('txt_before_Ext_mm"+(d+1)+"','','','lbl_before_Ext_mm"+(d+1)+"')"+'">'+
                                    '<label id="lbl_static" class="col-sm-4 control-label">mm</label>'+
                                    '</td>'+
                                    '</tr>';
                    $('.table #extruder_tbl_before').append(html_extruder);
                    Master_Copy.Percentage_pn_on_load('txt_before_Ext_kg'+(d+1),'','','lbl_before_Ext_kg'+(d+1));
                    Master_Copy.Percentage_pn_on_load('txt_before_Ext_rpm'+(d+1),'','','lbl_before_Ext_rpm'+(d+1));
                    Master_Copy.Percentage_pn_on_load('txt_before_Ext_mm'+(d+1),'','','lbl_before_Ext_mm'+(d+1));
                }
                
                $('#txt_before_Mcushion').val(data.measuring_condition_setting[0].m_cushion);
                $('#txt_before_Shot_Size').val(data.measuring_condition_setting[0].shot_size);
                $('#txt_before_Dcmp_Dist').val(data.measuring_condition_setting[0].dcmp_dist);
                $('#txt_before_Dcmp_Vel').val(data.measuring_condition_setting[0].dcmp_vel);
                $('#txt_before_Cool_Time').val(data.measuring_condition_setting[0].cool_time);

                Master_Copy.Percentage_pn_on_load('txt_before_Mcushion','','','lbl_before_mcushion');
                Master_Copy.Percentage_pn_on_load('txt_before_Shot_Size','','','lbl_before_shot_size');
                Master_Copy.Percentage_pn_on_load('txt_before_Dcmp_Dist','','','lbl_before_Dcmp_Dist');
                Master_Copy.Percentage_pn_on_load('txt_before_Dcmp_Vel','','','lbl_before_Dcmp_Vel');
                Master_Copy.Percentage_pn_on_load('txt_before_Cool_Time','','','lbl_before_Cool_Time');
                $('#btn_add_extruder').attr('data-count',extruder_json.length);
                
               
            },
            error: function(data){
                console.log(data);
            },
            complete: function(data){
               /*  $('.input_field').removeClass('txt_exceed');
                $('.input_field').removeClass('txt_warn'); */
                // Check_List.Check_changes();
                // $("#wait").css("display", "none");
            }
        });
    }

    this_data.Percentage_pn_on_load = function(id,negativelbl,positivelbl,tolerance,prefix='')
    {
       
        if($(prefix+' #'+id).val()!="")
        {
            var base_value = parseInt($(prefix+' #'+id).val());
            var percentage = base_value * .10;
            var neg_value = base_value - percentage;
            var pos_value = base_value + percentage;
            if(negativelbl!="" && positivelbl!="")
            {
                $(prefix+' #'+negativelbl).html(neg_value);
                $(prefix+' #'+positivelbl).html(pos_value);
            }
            if(tolerance != "")
            {
                $(prefix+' #'+tolerance).html('± '+percentage.toFixed(2));
            }
            
        }
        else
        { 
            if(negativelbl!="" && positivelbl!="")
            {
                $(prefix+' #'+negativelbl).html('0');
                $(prefix+' #'+positivelbl).html('0');
            }
            if(tolerance != "")
            {
                $(prefix+' #'+tolerance).html('± 0');
            }
        }
    }


    this_data.Percentage_pn = function(id,negativelbl,positivelbl,tolerance)
    {
        
        if($('#'+id).val()!="")
        {
            var base_value = parseInt($('#'+id).val());
            var percentage = base_value * .10;
            var neg_value = base_value - percentage;
            var pos_value = base_value + percentage;
            if(negativelbl!="" && positivelbl!="")
            {
                $('#'+negativelbl).html(neg_value);
                $('#'+positivelbl).html(pos_value);
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

    this_data.save_changes = function(){
        //main_reg_details
        var drawing_no = $('#txt_drawing_no').val(data.drawing_no);
        var machine_no = $('#txt_machine_no').val(data.machine_code);
        var matl_name = $('#txt_matl_name').val(data.matl_name);
        var resin_temp= $('#txt_resin_temp').val(data.resin_temp);
        var revision_no =$('#txt_rev_no').val(data.revision_no);
        var matl_grade = $('#txt_matl_grade').val(data.matl_grade);
        var drying_temp= $('#txt_drying_temp').val(data.drying_temp);
        var drawing_name = $('#txt_drawing_name').val(data.drawing_name);
        var color_no = $('#txt_color_no').val(data.color_no);
        var matl_color= $('#txt_matl_color').val(data.matl_color);
        var drying_hrs= $('#txt_drying_hrs').val(data.drying_hrs);

        //mold die basic information
        var die_type= $('#txt_die_type').val(data.die_type);
        var no_cavity = $('#txt_number_cav').val(data.no_cavity);
        var mold_no= $('#txt_mold_number').val(data.mold_no);
        var good_cav = $('#txt_number_good_cav').val(data.no_good_cavity);
        var rel_items = $('#txt_related_items').val(data.related_items);
        var mold_loc = $('#txt_mold_location').val(data.mold_location);

        //prod_SPQ
        var product_size= $('#txt_product_size').val(data.product_size);
        var packaging_class= $('#txt_packaging_class').val(data.packaging_class);
        var qty_per_bag = $('#txt_quantity_per_bag').val(data.qty_per_bag);
        var pcase_max= $('#txt_pcase_max_qty').val(data.pcase_max_qty);
        var SPQ_Remarks= $('#txt_remarks').val(data.remarks);

        


    }

    this_data.Add_Input_Field = function(id_button,id_container,id_input1)
    {
        var count =parseInt($('#'+id_button).attr('data-count'));
        count+=1;
        $('#'+id_button).attr('data-count',count);
        var add_input = '<tr class=tr_pweight'+count+'>';
       
            add_input+= '<td>PRODUCT WEIGHT:</td>'+
                        '<td>'+
                        '<input type="text" class="input_field" id="'+id_input1+count+'" placeholder="Input Product Weight">'+
                        '</td>';
       
        add_input+="</tr>";
        $('.'+id_container).append(add_input);
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

    this_data.Add_Inj_Pack = function(id_btn,id_container,id_tr,id_input1,id_input2)
    {
        var count =parseInt($('#'+id_btn).attr('data-count'));
        count+=1;
        $('#'+id_btn).attr('data-count',count);
        var add_input = '<tr class='+id_tr+count+'>'+
                        '<td>'+count+'</td>'+
                        '<td>'+
                        '<label id="lbl_'+id_input1+count+'" class="col-sm-4 control-label">0</label>'+
                        '<input id="txt_'+id_input1+count+'" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"'+
                        'onkeyup="'+
                        "Master_Copy.Percentage_pn('txt_"+id_input1+count+"','','','lbl_"+id_input1+count+"')"+'">'+
                        '<label id="lbl_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                        '</td>'+
                        '<td>'+
                        '<label id="lbl_'+id_input2+count+'" class="col-sm-4 control-label">0</label>'+
                        '<input id="txt_'+id_input2+count+'" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"'+
                        'onkeyup="'+
                        "Master_Copy.Percentage_pn('txt_"+id_input2+count+"','','','lbl_"+id_input2+count+"')"+'">'+
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
        var add_input = '<tr class=tr_extruder'+count+'>'+
                        '<td>'+count+'</td>'+
                        '<td>'+
                        '<label id="lbl_Ext_kg'+count+'" class="col-sm-4 control-label">±0</label>'+
                        '<input id="txt_Ext_kg'+count+'" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"'+
                        'onkeyup="'+
                        "Master_Copy.Percentage_pn('txt_Ext_kg"+count+"','','','lbl_Ext_kg"+count+"')"+'">'+
                        '<label id="lbl_static" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>'+
                        '</td>'+
                        '<td colspan="2">'+
                        '<label id="lbl_Ext_rpm'+count+'" class="col-sm-4 control-label">±0</label>'+
                        '<input id="txt_Ext_rpm'+count+'" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"'+
                        'onkeyup="'+
                        "Master_Copy.Percentage_pn('txt_Ext_rpm"+count+"','','','lbl_Ext_rpm"+count+"')"+'">'+
                        ' <label id="lbl_static" class="col-sm-4 control-label">rpm</label>'+
                        '</td>'+
                        '<td>'+
                        '<label id="lbl_Ext_mm'+count+'" class="col-sm-4 control-label">±0</label>'+
                        '<input id="txt_Ext_mm'+count+'" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"'+
                        'onkeyup="'+
                        "Master_Copy.Percentage_pn('txt_Ext_mm"+count+"','','','lbl_Ext_mm"+count+"')"+'">'+
                       ' <label id="lbl_static" class="col-sm-4 control-label">mm</label>'+
                        '</td>'+
                        '</tr>';

        $('#extruder_tbl_before').append(add_input);
    }
    
    return this_data;

})();


var Scrolling =(function(){

    var this_data = {};

    this_data.onscrolling = function(){

        var container = document.getElementById("exampleModal");
        var topscroll = container.scrollTop;

        if(topscroll>500){
            $('.top_btn').css("display","block");
            $('.bot_btn').css("display","none");
        }
        else{
            $('.top_btn').css("display","none");
            $('.bot_btn').css("display","block");
        }
    }

    this_data.scroll_btn_click = function(){
        var container = document.getElementById("exampleModal");
        container.scrollTop = 0;
    }

    this_data.scroll_btn_click_bot = function(){
        var container = document.getElementById("exampleModal");
        container.scrollTop = container.scrollHeight;
    }
    return this_data;

})();

