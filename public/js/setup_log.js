
$(document).ready(function(){

    $(document).ajaxStart(function(){
        $("#wait").css("display", "block");
    });

    $(document).ajaxComplete(function(){
        $("#wait").css("display", "none");
    });

    $('.select2').select2({width: '100%'});

    $('#adj_hist_btn').on('click',function()
    {
        $('.modal_adj_hist').modal('show');
    })

    $('#slc_parameter_setting').on('change',function(){
        var main_id =  $('.modal_view_data').attr('data-main');
        Adjustment_History.load_adjustments(main_id,$(this).val());
    })
    
});


var Setup_Logs = (function(){

    var this_data = {};

    this_data.loadtable = function(search='')
    {

       if(search!=""){
        $('#datatable').DataTable().destroy();
       }
       var part_no =  $('#slc_part_no').val();
       var mold_no =  $('#slc_mold_no').val();
       var machine_no =  $('#slc_machine_no').val();
       var date_from =  $('#date_from').val();
       var date_to =  $('#date_to').val();
       
       $('#datatable').DataTable({
            "processing":true,
            "serverSide":true,
            "searching":false,
            "order": [[ 7, "desc" ]],
            "pageLength": 15,
            "scrollY":"50vh",
            "language": 
            {          
            "processing": " <div style='background:white'><i class='fa fa-refresh fa-spin'></i><br><b>Please wait for a moment..</b></div>",
            },
            "ajax": {
                url:"setup_logs/datatable",
                type:"POST",
                data:{
                    'part_no': part_no,
                    'mold_no': mold_no,
                    'machine_no': machine_no,
                    'date_from': date_from,
                    'date_to':date_to
                }
            },
            "columns":[
                {
                    "data": "id",
                    "render": function ( data, type, row ) {
                        var btn =  '<button class="btn btn-primary btn-sm" title="View Data" '+
                        'onclick="Setup_Logs.ViewData('+"\'"+data+"\'"+','+"\'"+row['after_prod_id']+"\'"+
                        ')">'+
                        '<i class="fa fa-eye"></i>&nbsp VIEW</button>&nbsp';

                      
                       
                      return btn;
                    }
                },
                {"data":"parameter_change",
                "render": function ( data, type, row ) {
                    var value ='';
                    if(data=="0"){
                         value= "<span style='color: green; font-weight:bold'>WITHOUT CHANGE</span>";
                    }
                    else{
                        value="<span style='color: #dc3545; font-weight:bold'>WITH CHANGE</span>";
                    }
                    return value;
                }
            
                },
                {"data":"drawing_no"},
                {"data":"revision_no"},
                {"data":"drawing_name"},
                {"data":"machine_code"},
                {"data":"mold_no"},
                {"data":"record_type"},
                {"data":"updated_at"}
            ]
        }
        
        );
    }

    this_data.clear_search = function(){

        $('#slc_part_no').val('');
        $('#slc_mold_no').val('');
        $('#slc_machine_no').val('');
        $('#slc_part_no').select2().trigger('change');
        $('#slc_mold_no').select2().trigger('change');
        $('#slc_machine_no').select2().trigger('change');
        $('#date_from').val('');
        $('#date_to').val('');
        
         Setup_Logs.loadtable('destroy');
        
    }

    this_data.ViewData = function(main_reg_id,after_id){

        Setup_Logs.load_main_reg(main_reg_id); 
        Setup_Logs.load_after_data(after_id,main_reg_id);
        // Setup_Logs.load_before_data('',main_reg_id);
        $('.modal_view_data').attr('data-main',main_reg_id);
        $('.modal_view_data').attr('data-afterid',after_id);
        $('.modal_view_data').modal('show');
    }

    this_data.load_main_reg = function(id)
    {
        $.ajax({
            url:"check_list/load_record_info",
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

    this_data.load_after_data = function(id,main_register_id)
    {

        $.ajax({
            url:"check_list/load_after_data",
            type:"POST",
            data: {
                'id':id,
                'main_register_id':main_register_id
            },
            success:function(data){
                
                // ctrl_no
                // console.log(data['after_prod'].after_prod)
                $('#txt_after_ctrl_no').val(data['after_prod'].control_no_relation.ctrl_no);
                $('#txt_after_date').val(data['after_prod'].control_no_relation.created_at);

                // mct_setting
                $('#txt_after_die_temp_core').val(data['after_prod'].mct_setting_relation.die_temp_core);
                $('#txt_after_die_temp_cavity').val(data['after_prod'].mct_setting_relation.die_temp_cavity);
                $('#txt_after_mold_temp_ctrl').val(data['after_prod'].mct_setting_relation.mold_temp_control);

                //product_info
                var pweight = JSON.parse(data['after_prod'].product_info_relation.product_weight);
                $('#txt_after_machine_cycle_time').val(data['after_prod'].product_info_relation.machine_cycle_time);
                $('#txt_after_sprue_weight').val(data['after_prod'].product_info_relation.sprue_weight);
                $('#txt_after_sub_part_weight').val(data['after_prod'].product_info_relation.sub_part_weight);
                $('#txt_after_additional_cycle_time').val(data['after_prod'].product_info_relation.additional_cycle_time);
                var html_pweight = '<table class="table table-bordered text-center table-striped bold-text"><tbody>';
                for(a=0;a<pweight.length;a++)
                {
                    html_pweight += '<tr>'+
                                    '<td>PRODUCT WEIGHT:</td>'+
                                    '<td><input type="text" class="input_field txt_warn" readonly id="txt_after_product_weight'+a+'" '+
                                    'placeholder="Input Product Weight" value="'+pweight[a].x+'"></td>'+
                                    '</tr>'
                }
                html_pweight+='</tbody></table>'
                $('.tr_pweight').html(html_pweight);
                
                //clamp_eject
                
                $('#txt_after_OLFO_POS').val(data['after_prod'].clamp_eject_relation.open_limit_POS);
                $('#txt_after_OLFO_VEL').val(data['after_prod'].clamp_eject_relation.open_limit_VEL);
                $('#txt_after_CS1_POS').val(data['after_prod'].clamp_eject_relation.close_sw_POS);
                $('#txt_after_CS1_VEL').val(data['after_prod'].clamp_eject_relation.close_sw_VEL);
                $('#txt_after_CSMP_POS').val(data['after_prod'].clamp_eject_relation.close_slow_POS);
                $('#txt_after_CSMP_VEL').val(data['after_prod'].clamp_eject_relation.close_slow_VEL);
                $('#txt_after_CST_POS').val(data['after_prod'].clamp_eject_relation.close_sp_POS);
                $('#txt_after_MPPT_POS').val(data['after_prod'].clamp_eject_relation.mold_prtct_POS);
                $('#txt_after_BB_VEL').val(data['after_prod'].clamp_eject_relation.breakaway_VEL);
                $('#txt_after_O1_POS').val(data['after_prod'].clamp_eject_relation.open1_POS);
                $('#txt_after_O1_VEL').val(data['after_prod'].clamp_eject_relation.open1_VEL);
                $('#txt_after_O2_POS').val(data['after_prod'].clamp_eject_relation.open2_POS);
                $('#txt_after_O2_VEL').val(data['after_prod'].clamp_eject_relation.open2_VEL);
                $('#txt_after_FOFO_POS').val(data['after_prod'].clamp_eject_relation.full_open_POS);
                $('#txt_after_ESES_POS').val(data['after_prod'].clamp_eject_relation.eject_start_POS);
                $('#txt_after_Pulses').val(data['after_prod'].clamp_eject_relation.pulses);
                $('#txt_after_FWD_POS').val(data['after_prod'].clamp_eject_relation.FWD_POS);
                $('#txt_after_FWD_VEL').val(data['after_prod'].clamp_eject_relation.FWD_VEL);
                $('#txt_after_FWD_DWELL').val(data['after_prod'].clamp_eject_relation.FWD_DWELL);
                $('#txt_after_ADV_POS').val(data['after_prod'].clamp_eject_relation.ADV_POS);
                $('#txt_after_ADV_VEL').val(data['after_prod'].clamp_eject_relation.ADV_VEL);
                $('#txt_after_ADV_DWELL').val(data['after_prod'].clamp_eject_relation.ADV_DWELL);
                $('#txt_after_REV_POS').val(data['after_prod'].clamp_eject_relation.REV_POS);
                $('#txt_after_REV_VEL').val(data['after_prod'].clamp_eject_relation.REV_VEL);
                $('#txt_after_REV_DWELL').val(data['after_prod'].clamp_eject_relation.REV_DWELL);
                $('#txt_after_Ejector_Delay').val(data['after_prod'].clamp_eject_relation.ejector_delay);
                $('#txt_after_Die_Height').val(data['after_prod'].clamp_eject_relation.auto_die_height);

                Setup_Logs.Percentage_pn_on_load('txt_after_OLFO_POS','lbl_after_neg_OLFO_POS','lbl_after_pos_OLFO_POS');
                Setup_Logs.Percentage_pn_on_load('txt_after_OLFO_VEL','lbl_after_neg_OLFO_VEL','lbl_after_pos_OLFO_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_after_CS1_POS','lbl_after_neg_CS1_POS','lbl_after_pos_CS1_POS');
                Setup_Logs.Percentage_pn_on_load('txt_after_CS1_VEL','lbl_after_neg_CS1_VEL','lbl_after_pos_CS1_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_after_CSMP_POS','lbl_after_neg_CSMP_POS','lbl_after_pos_CSMP_POS');
                Setup_Logs.Percentage_pn_on_load('txt_after_CSMP_VEL','lbl_after_neg_CSMP_VEL','lbl_after_pos_CSMP_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_after_CST_POS','lbl_after_neg_CST_POS','lbl_after_pos_CST_POS');
                Setup_Logs.Percentage_pn_on_load('txt_after_MPPT_POS','lbl_after_neg_MPPT_POS','lbl_after_pos_MPPT_POS');
                Setup_Logs.Percentage_pn_on_load('txt_after_BB_VEL','lbl_after_neg_BB_VEL','lbl_after_pos_BB_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_after_O1_POS','lbl_after_neg_O1_POS','lbl_after_pos_O1_POS');
                Setup_Logs.Percentage_pn_on_load('txt_after_O1_VEL','lbl_after_neg_O1_VEL','lbl_after_pos_O1_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_after_O2_POS','lbl_after_neg_O2_POS','lbl_after_pos_O2_POS');
                Setup_Logs.Percentage_pn_on_load('txt_after_O2_VEL','lbl_after_neg_O2_VEL','lbl_after_pos_O2_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_after_FOFO_POS','lbl_after_neg_FOFO_POS','lbl_after_pos_FOFO_POS');
                Setup_Logs.Percentage_pn_on_load('txt_after_ESES_POS','lbl_after_neg_ESES_POS','lbl_after_pos_ESES_POS');
                Setup_Logs.Percentage_pn_on_load('txt_after_FWD_POS','lbl_after_neg_FWD_POS','lbl_after_pos_FWD_POS');
                Setup_Logs.Percentage_pn_on_load('txt_after_FWD_VEL','lbl_after_neg_FWD_VEL','lbl_after_pos_FWD_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_after_FWD_DWELL','lbl_after_neg_FWD_DWELL','lbl_after_pos_FWD_DWELL');
                Setup_Logs.Percentage_pn_on_load('txt_after_ADV_POS','lbl_after_neg_ADV_POS','lbl_after_pos_ADV_POS');
                Setup_Logs.Percentage_pn_on_load('txt_after_ADV_VEL','lbl_after_neg_ADV_VEL','lbl_after_pos_ADV_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_after_ADV_DWELL','lbl_after_neg_ADV_DWELL','lbl_after_pos_ADV_DWELL');
                Setup_Logs.Percentage_pn_on_load('txt_after_REV_POS','lbl_after_neg_REV_POS','lbl_after_pos_REV_POS');
                Setup_Logs.Percentage_pn_on_load('txt_after_REV_VEL','lbl_after_neg_REV_VEL','lbl_after_pos_REV_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_after_REV_DWELL','lbl_after_neg_REV_DWELL','lbl_after_pos_REV_DWELL');

                //cylinder_temp
                $('#txt_after_Nozzle').val(data['after_prod'].cylinder_temp_relation.nozzle);
                $('#txt_after_Barrel1').val(data['after_prod'].cylinder_temp_relation.barrel1);
                $('#txt_after_Barrel2').val(data['after_prod'].cylinder_temp_relation.barrel2);
                $('#txt_after_Barrel3').val(data['after_prod'].cylinder_temp_relation.barrel3);
                $('#txt_after_Feed_Throat').val(data['after_prod'].cylinder_temp_relation.feed_throat);

                Setup_Logs.Percentage_pn_on_load('txt_after_Nozzle','lbl_after_neg_Nozzle','lbl_after_pos_Nozzle','lbl_after_tol_Nozzle');
                Setup_Logs.Percentage_pn_on_load('txt_after_Barrel1','lbl_after_neg_Barrel1','lbl_after_pos_Barrel1','lbl_after_tol_Barrel1');
                Setup_Logs.Percentage_pn_on_load('txt_after_Barrel2','lbl_after_neg_Barrel2','lbl_after_pos_Barrel2','lbl_after_tol_Barrel2');
                Setup_Logs.Percentage_pn_on_load('txt_after_Barrel3','lbl_after_neg_Barrel3','lbl_after_pos_Barrel3','lbl_after_tol_Barrel3');
                Setup_Logs.Percentage_pn_on_load('txt_after_Feed_Throat','lbl_after_neg_Feed_Throat','lbl_after_pos_Feed_Throat','lbl_after_tol_Feed_Throat');

                //inj_pack
                var inj_pack_json = JSON.parse(data['after_prod'].inj_pack_setting_relation.injection_step);
                var html_inj_pack = '';
                $('table #injection_step_tbl').html('');
                for(b = 0; b<inj_pack_json.length;b++)
                {
                    html_inj_pack='<tr>'+
                                    '<td>1</td>'+
                                    '<td>'+
                                    '<label  id="lbl_after_Inj_Step'+b+'" class="col-sm-4 control-label ">0</label>'+
                                    '<input readonly id="txt_after_Inj_Step'+b+'" class="col-sm-4   input_field txt_warn" type="text"'+
                                    ' placeholder="Input Here.." value="'+inj_pack_json[b].Inj_Step+'" style="width: 60px;">'+
                                    '<label  id="lbl_after_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                                    '</td>'+
                                    '<td>'+
                                    ' <label  id="lbl_after_IStep'+b+'" class="col-sm-4 control-label">0</label>'+
                                    '<input readonly id="txt_after_IStep'+b+'" class="col-sm-4   input_field txt_warn" type="text" '+
                                    ' placeholder="Input Here.." value="'+inj_pack_json[b].IStep+'"  style="width: 60px;">'
                                    '<label  id="lbl_after_mm/s" class="col-sm-4 control-label">mm</label>'+
                                    '</td>'+
                                    '</tr>';
                   
                   
                                    $('table #injection_step_tbl').append(html_inj_pack);
                                    Setup_Logs.Percentage_pn_on_load('txt_after_Inj_Step'+b,'','','lbl_after_Inj_Step'+b,'table #injection_step_tbl');
                                    Setup_Logs.Percentage_pn_on_load('txt_after_IStep'+b,'','','lbl_after_IStep'+b,'table #injection_step_tbl');
                    
                }
                
                
                $('#txt_after_Inj_step').val(data['after_prod'].inj_pack_setting_relation.inj_step_mid);
                $('#txt_after_Max_Inj_Pres').val(data['after_prod'].inj_pack_setting_relation.max_inj_pressure);
                $('#txt_after_Act_Inj_Pres').val(data['after_prod'].inj_pack_setting_relation.actual_pressure);
                $('#txt_after_Max_Inj_Time').val(data['after_prod'].inj_pack_setting_relation.max_inj_time);
                $('#txt_after_Act_Time').val(data['after_prod'].inj_pack_setting_relation.actual_time);
                $('#txt_after_Max_Pack_Velo').val(data['after_prod'].inj_pack_setting_relation.max_pack_velo);
                $('#txt_after_POS_Trans').val(data['after_prod'].inj_pack_setting_relation.pos_trans);
                $('#txt_after_Pack_step').val(data['after_prod'].inj_pack_setting_relation.pack_step_mid);

                Setup_Logs.Percentage_pn_on_load('txt_after_Max_Inj_Pres','','','lbl_after_Max_Inj_Pres');
                Setup_Logs.Percentage_pn_on_load('txt_after_Max_Inj_Time','','','lbl_after_Max_Inj_Time');
                Setup_Logs.Percentage_pn_on_load('txt_after_Max_Pack_Velo','','','lbl_after_Max_Pack_Velo');
                Setup_Logs.Percentage_pn_on_load('txt_after_POS_Trans','','','lbl_after_POS_Trans');

                var pack_step_json = JSON.parse(data['after_prod'].inj_pack_setting_relation.pack_step)
                var html_pack_step=''
                $('.table #pack_step_tbl').html(html_pack_step);
                for(c=0;c<pack_step_json.length;c++){
                    html_pack_step='<tr>'+
                                    '<td>'+(c+1)+'</td>'+
                                    '<td><label  id="lbl_after_Pack_Step'+c+'" class="col-sm-4 control-label"></label></td>'+
                                    '<td><input readonly id="txt_after_Pack_Step'+c+'" class="col-sm-4   input_field" type="text" '+
                                    'placeholder="Input Here.." style="width: 60px;" value="'+pack_step_json[c].Pack_Step+'">'+
                                    '<label  id="lbl_after_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                                    '</td>'+
                                    '<td>'+
                                    '<td><label  id="lbl_after_PStep'+c+'" class="col-sm-4 control-label">0</label></td>'+
                                    '<td><input readonly id="txt_after_PStep'+c+'" class="col-sm-4   input_field" type="text" '+
                                    'placeholder="Input Here.." style="width: 60px;" value="'+pack_step_json[c].PStep+'">'+
                                    '<label  id="lbl_after_mm/s" class="col-sm-4 control-label">mm</label>'+
                                    '</td>'+
                                    '</tr>';
                                    $('.table #pack_step_tbl').append(html_pack_step);
                                    Setup_Logs.Percentage_pn_on_load('txt_after_Pack_Step'+c,'','','lbl_after_Pack_Step'+c);
                                    Setup_Logs.Percentage_pn_on_load('txt_after_PStep'+c,'','','lbl_after_PStep'+c);
                }
                
                //measuring_condition
                $('#txt_after_Extruder').val(data['after_prod'].measuring_condition_relation.extruder_on);
                var extruder_json = JSON.parse(data['after_prod'].measuring_condition_relation.extruder_json);
                var html_extruder = '';
                $('.table #extruder_tbl').html(html_extruder);
                for(d=0;d<extruder_json.length;d++)
                {
                    html_extruder = '<tr>'+
                                    '<td>'+(d+1)+'</td>'+
                                    '<td>'+
                                    '<label id="lbl_after_Ext_kg'+d+'" class="col-sm-4 control-label">±0</label>'+
                                    '<input type="text" readonly id="txt_after_Ext_kg'+d+'" placeholder="Input Here.." '+
                                    'class=" col-sm-4 input_field txt_warn" value="'+extruder_json[d].kg+'">'+
                                    '<label id="lbl_static" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>'+
                                    '</td>'+
                                    '<td colspan="2">'+
                                    '<label id="lbl_after_Ext_rpm'+d+'" class="col-sm-4 control-label">±0</label>'+
                                    '<input type="text" readonly id="txt_after_Ext_rpm'+d+'" placeholder="Input Here.." '+
                                    'class=" col-sm-4 input_field txt_warn" value="'+extruder_json[d].rpm+'">'+
                                    ' <label id="lbl_static" class="col-sm-4 control-label">rpm</label>'+
                                    '</td>'+
                                    '<td>'+
                                    '<label id="lbl_after_Ext_mm'+d+'" class="col-sm-4 control-label">±0</label>'+
                                    '<input type="text" readonly id="txt_after_Ext_mm'+d+'" placeholder="Input Here.." '+
                                    'class=" col-sm-4 input_field txt_warn" value="'+extruder_json[d].mm+'">'+
                                    '<label id="lbl_static" class="col-sm-4 control-label">mm</label>'+
                                    '</td>'+
                                    '</tr>';
                    $('.table #extruder_tbl').append(html_extruder);
                    Setup_Logs.Percentage_pn_on_load('txt_after_Ext_kg'+d,'','','lbl_after_Ext_kg'+d);
                    Setup_Logs.Percentage_pn_on_load('txt_after_Ext_rpm'+d,'','','lbl_after_Ext_rpm'+d);
                    Setup_Logs.Percentage_pn_on_load('txt_after_Ext_mm'+d,'','','lbl_after_Ext_mm'+d);
                }

                $('#txt_after_Mcushion').val(data['after_prod'].measuring_condition_relation.m_cushion);
                $('#txt_after_Shot_Size').val(data['after_prod'].measuring_condition_relation.shot_size);
                $('#txt_after_Dcmp_Dist').val(data['after_prod'].measuring_condition_relation.dcmp_dist);
                $('#txt_after_Dcmp_Vel').val(data['after_prod'].measuring_condition_relation.dcmp_vel);
                $('#txt_after_Cool_Time').val(data['after_prod'].measuring_condition_relation.cool_time);

                Setup_Logs.Percentage_pn_on_load('txt_after_Mcushion','','','lbl_after_mcushion');
                Setup_Logs.Percentage_pn_on_load('txt_after_Shot_Size','','','lbl_after_shot_size');
                Setup_Logs.Percentage_pn_on_load('txt_after_Dcmp_Dist','','','lbl_after_Dcmp_Dist');
                Setup_Logs.Percentage_pn_on_load('txt_after_Dcmp_Vel','','','lbl_after_Dcmp_Vel');
                Setup_Logs.Percentage_pn_on_load('txt_after_Cool_Time','','','lbl_after_Cool_Time');

                // mold checksheet
                var mold_checksheet_json = JSON.parse(data['after_prod'].mold_checksheet);
              
               mold_checksheet_json[0].input_1=="true"? $("#chk_input1").prop("checked", true) : $("#chk_input1").prop("checked", false);
               mold_checksheet_json[0].input_2=="OIL"? $("#slc_input2").val("OIL") : $("#slc_input2").val("WATER");
               mold_checksheet_json[0].input_3=="true"? $("#chk_input3").prop("checked", true) : $("#chk_input3").prop("checked", false);
               mold_checksheet_json[0].input_4=="true"? $("#chk_input4").prop("checked", true) : $("#chk_input4").prop("checked", false);
                $("#txt_input5").val( mold_checksheet_json[0].input_5) 
               mold_checksheet_json[0].input_6=="true"? $("#chk_input6").prop("checked", true) : $("#chk_input6").prop("checked", false);
               mold_checksheet_json[0].input_7=="true"? $("#chk_input7").prop("checked", true) : $("#chk_input7").prop("checked", false);
               mold_checksheet_json[0].input_8=="true"? $("#chk_input8").prop("checked", true) : $("#chk_input8").prop("checked", false);
               mold_checksheet_json[0].input_9=="true"? $("#chk_input9").prop("checked", true) : $("#chk_input9").prop("checked", false);

               //raw_mats
               $('#txt_dryer_no').val(data['after_prod'].dryer_no);
               $('#time_time_in').val(data['after_prod'].time_in);
               $('#time_time_use').val(data['after_prod'].time_use);
               $('#date_prepared').val(data['after_prod'].date_prepared);
               $('#txt_mat_lot_no').val(data['after_prod'].material_lot_no);
               $('#txt_actual_matl_use').val(data['after_prod'].actual_matl_use);
               $('#time_actual_use').val(data['after_prod'].actual_time_matl_use);
               $('#txt_material_code').val(data['after_prod'].material_code);

               //production data['after_prod']
               $('#txt_total_production').val(data['after_prod'].total_production);
               $('#date_process_start').val(data['after_prod'].date_process_start);
               $('#date_process_finish').val(data['after_prod'].date_process_finish);
               $('#txt_lot_number').val(data['after_prod'].lot_number);
               $('#txt_check_by').val(data['after_prod'].checked_by);
               $('#txt_check_date').val(data['after_prod'].date_checked);
               $('#txt_work_finish_qty').val(data['after_prod'].work_finish_qty);

                //    console.log(data['after_prod'].users_relation.name);
                var checker = data['after_prod'].checkby_relation;
                var reviewer = data['after_prod'].reviewby_relation;
                var approver = data['after_prod'].approveby_relation;

                if(checker != null){
                    checker = data['after_prod'].checkby_relation.name.toUpperCase();
                }
                else{
                    checker = '';
                }
                if(reviewer != null){
                    reviewer = data['after_prod'].reviewby_relation.name.toUpperCase();
                }
                else{
                    reviewer = '';
                }
                if(approver != null){
                    approver = data['after_prod'].approveby_relation.name.toUpperCase();
                }
                else{
                    approver = '';
                }
            
            
               $('.condition_set_name').html(data['after_prod'].users_relation.name.toUpperCase());
               $('.checked_by').html(checker);
               $('.reviewed_by').html(reviewer);
               $('.approved_by').html(approver);




               /* BEFORE DATA */

               $('#txt_before_ctrl_no').val(data['ctrl_no'].ctrl_no);
               $('#txt_before_date').val(data['ctrl_no'].created_at);

               // mct_setting
               $('#txt_before_die_temp_core').val(data['after_prod'].before_mct_setting_relation.die_temp_core);
               $('#txt_before_die_temp_cavity').val(data['after_prod'].before_mct_setting_relation.die_temp_cavity);
               $('#txt_before_mold_temp_ctrl').val(data['after_prod'].before_mct_setting_relation.mold_temp_control);

                //product_info
                var pweight = JSON.parse(data['after_prod'].before_product_info_relation.product_weight);
                $('#txt_before_machine_cycle_time').val(data['after_prod'].before_product_info_relation.machine_cycle_time);
                $('#txt_before_sprue_weight').val(data['after_prod'].before_product_info_relation.sprue_weight);
                $('#txt_before_sub_part_weight').val(data['after_prod'].before_product_info_relation.sub_part_weight);
                $('#txt_before_additional_cycle_time').val(data['after_prod'].before_product_info_relation.additional_cycle_time);
                var html_pweight = '<table class="table table-bordered text-center table-striped bold-text"><tbody>';
                for(a=0;a<pweight.length;a++)
                {
                    html_pweight += '<tr>'+
                                    '<td>PRODUCT WEIGHT:</td>'+
                                    '<td><input type="text" class="input_field" readonly id="txt_before_product_weight'+a+'" '+
                                    'placeholder="Input Product Weight" value="'+pweight[a].x+'"></td>'+
                                    '</tr>'
                }
                html_pweight+='</tbody></table>'
                $('.tr_pweight_before').html(html_pweight);

               //clamp_eject
               
               $('#txt_before_OLFO_POS').val(data['after_prod'].before_clamp_eject_relation.open_limit_POS);
               $('#txt_before_OLFO_VEL').val(data['after_prod'].before_clamp_eject_relation.open_limit_VEL);
               $('#txt_before_CS1_POS').val(data['after_prod'].before_clamp_eject_relation.close_sw_POS);
               $('#txt_before_CS1_VEL').val(data['after_prod'].before_clamp_eject_relation.close_sw_VEL);
               $('#txt_before_CSMP_POS').val(data['after_prod'].before_clamp_eject_relation.close_slow_POS);
               $('#txt_before_CSMP_VEL').val(data['after_prod'].before_clamp_eject_relation.close_slow_VEL);
               $('#txt_before_CST_POS').val(data['after_prod'].before_clamp_eject_relation.close_sp_POS);
               $('#txt_before_MPPT_POS').val(data['after_prod'].before_clamp_eject_relation.mold_prtct_POS);
               $('#txt_before_BB_VEL').val(data['after_prod'].before_clamp_eject_relation.breakaway_VEL);
               $('#txt_before_O1_POS').val(data['after_prod'].before_clamp_eject_relation.open1_POS);
               $('#txt_before_O1_VEL').val(data['after_prod'].before_clamp_eject_relation.open1_VEL);
               $('#txt_before_O2_POS').val(data['after_prod'].before_clamp_eject_relation.open2_POS);
               $('#txt_before_O2_VEL').val(data['after_prod'].before_clamp_eject_relation.open2_VEL);
               $('#txt_before_FOFO_POS').val(data['after_prod'].before_clamp_eject_relation.full_open_POS);
               $('#txt_before_ESES_POS').val(data['after_prod'].before_clamp_eject_relation.eject_start_POS);
               $('#txt_before_Pulses').val(data['after_prod'].before_clamp_eject_relation.pulses);
               $('#txt_before_FWD_POS').val(data['after_prod'].before_clamp_eject_relation.FWD_POS);
               $('#txt_before_FWD_VEL').val(data['after_prod'].before_clamp_eject_relation.FWD_VEL);
               $('#txt_before_FWD_DWELL').val(data['after_prod'].before_clamp_eject_relation.FWD_DWELL);
               $('#txt_before_ADV_POS').val(data['after_prod'].before_clamp_eject_relation.ADV_POS);
               $('#txt_before_ADV_VEL').val(data['after_prod'].before_clamp_eject_relation.ADV_VEL);
               $('#txt_before_ADV_DWELL').val(data['after_prod'].before_clamp_eject_relation.ADV_DWELL);
               $('#txt_before_REV_POS').val(data['after_prod'].before_clamp_eject_relation.REV_POS);
               $('#txt_before_REV_VEL').val(data['after_prod'].before_clamp_eject_relation.REV_VEL);
               $('#txt_before_REV_DWELL').val(data['after_prod'].before_clamp_eject_relation.REV_DWELL);
               $('#txt_before_Ejector_Delay').val(data['after_prod'].before_clamp_eject_relation.ejector_delay);
               $('#txt_before_Die_Height').val(data['after_prod'].before_clamp_eject_relation.auto_die_height);

               Setup_Logs.Percentage_pn_on_load('txt_before_OLFO_POS','lbl_before_neg_OLFO_POS','lbl_before_pos_OLFO_POS');
               Setup_Logs.Percentage_pn_on_load('txt_before_OLFO_VEL','lbl_before_neg_OLFO_VEL','lbl_before_pos_OLFO_VEL');
               Setup_Logs.Percentage_pn_on_load('txt_before_CS1_POS','lbl_before_neg_CS1_POS','lbl_before_pos_CS1_POS');
               Setup_Logs.Percentage_pn_on_load('txt_before_CS1_VEL','lbl_before_neg_CS1_VEL','lbl_before_pos_CS1_VEL');
               Setup_Logs.Percentage_pn_on_load('txt_before_CSMP_POS','lbl_before_neg_CSMP_POS','lbl_before_pos_CSMP_POS');
               Setup_Logs.Percentage_pn_on_load('txt_before_CSMP_VEL','lbl_before_neg_CSMP_VEL','lbl_before_pos_CSMP_VEL');
               Setup_Logs.Percentage_pn_on_load('txt_before_CST_POS','lbl_before_neg_CST_POS','lbl_before_pos_CST_POS');
               Setup_Logs.Percentage_pn_on_load('txt_before_MPPT_POS','lbl_before_neg_MPPT_POS','lbl_before_pos_MPPT_POS');
               Setup_Logs.Percentage_pn_on_load('txt_before_BB_VEL','lbl_before_neg_BB_VEL','lbl_before_pos_BB_VEL');
               Setup_Logs.Percentage_pn_on_load('txt_before_O1_POS','lbl_before_neg_O1_POS','lbl_before_pos_O1_POS');
               Setup_Logs.Percentage_pn_on_load('txt_before_O1_VEL','lbl_before_neg_O1_VEL','lbl_before_pos_O1_VEL');
               Setup_Logs.Percentage_pn_on_load('txt_before_O2_POS','lbl_before_neg_O2_POS','lbl_before_pos_O2_POS');
               Setup_Logs.Percentage_pn_on_load('txt_before_O2_VEL','lbl_before_neg_O2_VEL','lbl_before_pos_O2_VEL');
               Setup_Logs.Percentage_pn_on_load('txt_before_FOFO_POS','lbl_before_neg_FOFO_POS','lbl_before_pos_FOFO_POS');
               Setup_Logs.Percentage_pn_on_load('txt_before_ESES_POS','lbl_before_neg_ESES_POS','lbl_before_pos_ESES_POS');
               Setup_Logs.Percentage_pn_on_load('txt_before_FWD_POS','lbl_before_neg_FWD_POS','lbl_before_pos_FWD_POS');
               Setup_Logs.Percentage_pn_on_load('txt_before_FWD_VEL','lbl_before_neg_FWD_VEL','lbl_before_pos_FWD_VEL');
               Setup_Logs.Percentage_pn_on_load('txt_before_FWD_DWELL','lbl_before_neg_FWD_DWELL','lbl_before_pos_FWD_DWELL');
               Setup_Logs.Percentage_pn_on_load('txt_before_ADV_POS','lbl_before_neg_ADV_POS','lbl_before_pos_ADV_POS');
               Setup_Logs.Percentage_pn_on_load('txt_before_ADV_VEL','lbl_before_neg_ADV_VEL','lbl_before_pos_ADV_VEL');
               Setup_Logs.Percentage_pn_on_load('txt_before_ADV_DWELL','lbl_before_neg_ADV_DWELL','lbl_before_pos_ADV_DWELL');
               Setup_Logs.Percentage_pn_on_load('txt_before_REV_POS','lbl_before_neg_REV_POS','lbl_before_pos_REV_POS');
               Setup_Logs.Percentage_pn_on_load('txt_before_REV_VEL','lbl_before_neg_REV_VEL','lbl_before_pos_REV_VEL');
               Setup_Logs.Percentage_pn_on_load('txt_before_REV_DWELL','lbl_before_neg_REV_DWELL','lbl_before_pos_REV_DWELL');

                 //cylinder_temp
               $('#txt_before_Nozzle').val(data['after_prod'].before_cylinder_temp_relation.nozzle);
               $('#txt_before_Barrel1').val(data['after_prod'].before_cylinder_temp_relation.barrel1);
               $('#txt_before_Barrel2').val(data['after_prod'].before_cylinder_temp_relation.barrel2);
               $('#txt_before_Barrel3').val(data['after_prod'].before_cylinder_temp_relation.barrel3);
               $('#txt_before_Feed_Throat').val(data['after_prod'].before_cylinder_temp_relation.feed_throat);

               Setup_Logs.Percentage_pn_on_load('txt_before_Nozzle','lbl_before_neg_Nozzle','lbl_before_pos_Nozzle','lbl_before_tol_Nozzle');
               Setup_Logs.Percentage_pn_on_load('txt_before_Barrel1','lbl_before_neg_Barrel1','lbl_before_pos_Barrel1','lbl_before_tol_Barrel1');
               Setup_Logs.Percentage_pn_on_load('txt_before_Barrel2','lbl_before_neg_Barrel2','lbl_before_pos_Barrel2','lbl_before_tol_Barrel2');
               Setup_Logs.Percentage_pn_on_load('txt_before_Barrel3','lbl_before_neg_Barrel3','lbl_before_pos_Barrel3','lbl_before_tol_Barrel3');
               Setup_Logs.Percentage_pn_on_load('txt_before_Feed_Throat','lbl_before_neg_Feed_Throat','lbl_before_pos_Feed_Throat','lbl_before_tol_Feed_Throat');


                //inj_pack
                var inj_pack_json = JSON.parse(data['after_prod'].before_inj_pack_setting_relation.injection_step);
                var html_inj_pack = '';
                $('table #injection_step_tbl_before').html('');
                for(b = 0; b<inj_pack_json.length;b++)
                {
                    html_inj_pack='<tr>'+
                                    '<td>1</td>'+
                                    '<td>'+
                                    '<label  id="lbl_before_Inj_Step'+b+'" class="col-sm-4 control-label">0</label>'+
                                    '<input readonly id="txt_before_Inj_Step'+b+'" class="col-sm-4   input_field" type="text"'+
                                    ' placeholder="Input Here.." value="'+inj_pack_json[b].Inj_Step+'" style="width: 60px;">'+
                                    '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                                    '</td>'+
                                    '<td>'+
                                    ' <label  id="lbl_before_IStep'+b+'" class="col-sm-4 control-label">0</label>'+
                                    '<input readonly id="txt_before_IStep'+b+'" class="col-sm-4   input_field" type="text" '+
                                    ' placeholder="Input Here.." value="'+inj_pack_json[b].IStep+'"  style="width: 60px;">'
                                    '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm</label>'+
                                    '</td>'+
                                    '</tr>';
                   
                   
                                    $('table #injection_step_tbl_before').append(html_inj_pack);
                                    Setup_Logs.Percentage_pn_on_load('txt_before_Inj_Step'+b,'','','lbl_before_Inj_Step'+b,'table #pack_step_tbl_before');
                                    Setup_Logs.Percentage_pn_on_load('txt_before_IStep'+b,'','','lbl_before_IStep'+b,'table #pack_step_tbl_before');
                    
                }
                
                
                $('#txt_before_Inj_step').val(data['after_prod'].before_inj_pack_setting_relation.inj_step_mid);
                $('#txt_before_Max_Inj_Pres').val(data['after_prod'].before_inj_pack_setting_relation.max_inj_pressure);
                $('#txt_before_Act_Inj_Pres').val(data['after_prod'].before_inj_pack_setting_relation.actual_pressure);
                $('#txt_before_Max_Inj_Time').val(data['after_prod'].before_inj_pack_setting_relation.max_inj_time);
                $('#txt_before_Act_Time').val(data['after_prod'].before_inj_pack_setting_relation.actual_time);
                $('#txt_before_Max_Pack_Velo').val(data['after_prod'].before_inj_pack_setting_relation.max_pack_velo);
                $('#txt_before_POS_Trans').val(data['after_prod'].before_inj_pack_setting_relation.pos_trans);
                $('#txt_before_Pack_step').val(data['after_prod'].before_inj_pack_setting_relation.pack_step_mid);

                Setup_Logs.Percentage_pn_on_load('txt_before_Max_Inj_Pres','','','lbl_before_Max_Inj_Pres');
                Setup_Logs.Percentage_pn_on_load('txt_before_Max_Inj_Time','','','lbl_before_Max_Inj_Time');
                Setup_Logs.Percentage_pn_on_load('txt_before_Max_Pack_Velo','','','lbl_before_Max_Pack_Velo');
                Setup_Logs.Percentage_pn_on_load('txt_before_POS_Trans','','','lbl_before_POS_Trans');

                var pack_step_json = JSON.parse(data['after_prod'].before_inj_pack_setting_relation.pack_step)
                var html_pack_step=''
                $('.table #pack_step_tbl_before').html(html_pack_step);
                for(c=0;c<pack_step_json.length;c++){
                    html_pack_step='<tr>'+
                                    '<td>'+(c+1)+'</td>'+
                                    '<td><label  id="lbl_before_Pack_Step'+c+'" class="col-sm-4 control-label"></label></td>'+
                                    '<td><input readonly id="txt_before_Pack_Step'+c+'" class="col-sm-4   input_field" type="text" '+
                                    'placeholder="Input Here.." style="width: 60px;" value="'+pack_step_json[c].Pack_Step+'">'+
                                    '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                                    '</td>'+
                                    '<td>'+
                                    '<td><label  id="lbl_before_PStep'+c+'" class="col-sm-4 control-label">0</label></td>'+
                                    '<td><input readonly id="txt_before_PStep'+c+'" class="col-sm-4   input_field" type="text" '+
                                    'placeholder="Input Here.." style="width: 60px;" value="'+pack_step_json[c].PStep+'">'+
                                    '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm</label>'+
                                    '</td>'+
                                    '</tr>';
                                    $('.table #pack_step_tbl_before').append(html_pack_step);
                                    Setup_Logs.Percentage_pn_on_load('txt_before_Pack_Step'+c,'','','lbl_before_Pack_Step'+c);
                                    Setup_Logs.Percentage_pn_on_load('txt_before_PStep'+c,'','','lbl_before_PStep'+c);
                }

                //measuring_condition_setting
               $('#txt_before_Extruder').val(data['after_prod'].before_measuring_condition_relation.extruder_on);
               var extruder_json = JSON.parse(data['after_prod'].before_measuring_condition_relation.extruder_json);
               var html_extruder = '';
               $('.table #extruder_tbl_before').html(html_extruder);
               for(d=0;d<extruder_json.length;d++)
               {
                   html_extruder = '<tr>'+
                                   '<td>'+(d+1)+'</td>'+
                                   '<td>'+
                                   '<label id="lbl_before_Ext_kg'+d+'" class="col-sm-4 control-label">±0</label>'+
                                   '<input type="text" readonly id="txt_before_Ext_kg'+d+'" placeholder="Input Here.." '+
                                   'class=" col-sm-4 input_field" value="'+extruder_json[d].kg+'">'+
                                   '<label id="lbl_static" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>'+
                                   '</td>'+
                                   '<td colspan="2">'+
                                   '<label id="lbl_before_Ext_rpm'+d+'" class="col-sm-4 control-label">±0</label>'+
                                   '<input type="text" readonly id="txt_before_Ext_rpm'+d+'" placeholder="Input Here.." '+
                                   'class=" col-sm-4 input_field" value="'+extruder_json[d].rpm+'">'+
                                   ' <label id="lbl_static" class="col-sm-4 control-label">rpm</label>'+
                                   '</td>'+
                                   '<td>'+
                                   '<label id="lbl_before_Ext_mm'+d+'" class="col-sm-4 control-label">±0</label>'+
                                   '<input type="text" readonly id="txt_before_Ext_mm'+d+'" placeholder="Input Here.." '+
                                   'class=" col-sm-4 input_field" value="'+extruder_json[d].mm+'">'+
                                   '<label id="lbl_static" class="col-sm-4 control-label">mm</label>'+
                                   '</td>'+
                                   '</tr>';
                   $('.table #extruder_tbl_before').append(html_extruder);
                   Setup_Logs.Percentage_pn_on_load('txt_before_Ext_kg'+d,'','','lbl_before_Ext_kg'+d);
                   Setup_Logs.Percentage_pn_on_load('txt_before_Ext_rpm'+d,'','','lbl_before_Ext_rpm'+d);
                   Setup_Logs.Percentage_pn_on_load('txt_before_Ext_mm'+d,'','','lbl_before_Ext_mm'+d);
               }

               $('#txt_before_Mcushion').val(data['after_prod'].before_measuring_condition_relation.m_cushion);
               $('#txt_before_Shot_Size').val(data['after_prod'].before_measuring_condition_relation.shot_size);
               $('#txt_before_Dcmp_Dist').val(data['after_prod'].before_measuring_condition_relation.dcmp_dist);
               $('#txt_before_Dcmp_Vel').val(data['after_prod'].before_measuring_condition_relation.dcmp_vel);
               $('#txt_before_Cool_Time').val(data['after_prod'].before_measuring_condition_relation.cool_time);

               Setup_Logs.Percentage_pn_on_load('txt_before_Mcushion','','','lbl_before_mcushion');
               Setup_Logs.Percentage_pn_on_load('txt_before_Shot_Size','','','lbl_before_shot_size');
               Setup_Logs.Percentage_pn_on_load('txt_before_Dcmp_Dist','','','lbl_before_Dcmp_Dist');
               Setup_Logs.Percentage_pn_on_load('txt_before_Dcmp_Vel','','','lbl_before_Dcmp_Vel');
               Setup_Logs.Percentage_pn_on_load('txt_before_Cool_Time','','','lbl_before_Cool_Time');

               

            },
            error: function(data){
                console.log(data);                
            },
            complete: function(data){
                /*  $('.input_field').removeClass('txt_exceed');
                 $('.input_field').removeClass('txt_warn'); */
                 Setup_Logs.Check_changes();
                 // $("#wait").css("display", "none");
             }
        });
    }

    this_data.load_before_data = function(id,main_register_id){
      /*   $.ajax({
            url:"check_list/load_before_data",
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
                 var html_pweight = '<table class="table table-bordered text-center table-striped bold-text"><tbody>';
                 for(a=0;a<pweight.length;a++)
                 {
                     html_pweight += '<tr>'+
                                     '<td>PRODUCT WEIGHT:</td>'+
                                     '<td><input type="text" class="input_field" readonly id="txt_before_product_weight'+a+'" '+
                                     'placeholder="Input Product Weight" value="'+pweight[a].x+'"></td>'+
                                     '</tr>'
                 }
                 html_pweight+='</tbody></table>'
                 $('.tr_pweight_before').html(html_pweight);

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

                Setup_Logs.Percentage_pn_on_load('txt_before_OLFO_POS','lbl_before_neg_OLFO_POS','lbl_before_pos_OLFO_POS');
                Setup_Logs.Percentage_pn_on_load('txt_before_OLFO_VEL','lbl_before_neg_OLFO_VEL','lbl_before_pos_OLFO_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_before_CS1_POS','lbl_before_neg_CS1_POS','lbl_before_pos_CS1_POS');
                Setup_Logs.Percentage_pn_on_load('txt_before_CS1_VEL','lbl_before_neg_CS1_VEL','lbl_before_pos_CS1_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_before_CSMP_POS','lbl_before_neg_CSMP_POS','lbl_before_pos_CSMP_POS');
                Setup_Logs.Percentage_pn_on_load('txt_before_CSMP_VEL','lbl_before_neg_CSMP_VEL','lbl_before_pos_CSMP_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_before_CST_POS','lbl_before_neg_CST_POS','lbl_before_pos_CST_POS');
                Setup_Logs.Percentage_pn_on_load('txt_before_MPPT_POS','lbl_before_neg_MPPT_POS','lbl_before_pos_MPPT_POS');
                Setup_Logs.Percentage_pn_on_load('txt_before_BB_VEL','lbl_before_neg_BB_VEL','lbl_before_pos_BB_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_before_O1_POS','lbl_before_neg_O1_POS','lbl_before_pos_O1_POS');
                Setup_Logs.Percentage_pn_on_load('txt_before_O1_VEL','lbl_before_neg_O1_VEL','lbl_before_pos_O1_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_before_O2_POS','lbl_before_neg_O2_POS','lbl_before_pos_O2_POS');
                Setup_Logs.Percentage_pn_on_load('txt_before_O2_VEL','lbl_before_neg_O2_VEL','lbl_before_pos_O2_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_before_FOFO_POS','lbl_before_neg_FOFO_POS','lbl_before_pos_FOFO_POS');
                Setup_Logs.Percentage_pn_on_load('txt_before_ESES_POS','lbl_before_neg_ESES_POS','lbl_before_pos_ESES_POS');
                Setup_Logs.Percentage_pn_on_load('txt_before_FWD_POS','lbl_before_neg_FWD_POS','lbl_before_pos_FWD_POS');
                Setup_Logs.Percentage_pn_on_load('txt_before_FWD_VEL','lbl_before_neg_FWD_VEL','lbl_before_pos_FWD_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_before_FWD_DWELL','lbl_before_neg_FWD_DWELL','lbl_before_pos_FWD_DWELL');
                Setup_Logs.Percentage_pn_on_load('txt_before_ADV_POS','lbl_before_neg_ADV_POS','lbl_before_pos_ADV_POS');
                Setup_Logs.Percentage_pn_on_load('txt_before_ADV_VEL','lbl_before_neg_ADV_VEL','lbl_before_pos_ADV_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_before_ADV_DWELL','lbl_before_neg_ADV_DWELL','lbl_before_pos_ADV_DWELL');
                Setup_Logs.Percentage_pn_on_load('txt_before_REV_POS','lbl_before_neg_REV_POS','lbl_before_pos_REV_POS');
                Setup_Logs.Percentage_pn_on_load('txt_before_REV_VEL','lbl_before_neg_REV_VEL','lbl_before_pos_REV_VEL');
                Setup_Logs.Percentage_pn_on_load('txt_before_REV_DWELL','lbl_before_neg_REV_DWELL','lbl_before_pos_REV_DWELL');

                  //cylinder_temp
                $('#txt_before_Nozzle').val(data.cylinder_temp[0].nozzle);
                $('#txt_before_Barrel1').val(data.cylinder_temp[0].barrel1);
                $('#txt_before_Barrel2').val(data.cylinder_temp[0].barrel2);
                $('#txt_before_Barrel3').val(data.cylinder_temp[0].barrel3);
                $('#txt_before_Feed_Throat').val(data.cylinder_temp[0].feed_throat);

                Setup_Logs.Percentage_pn_on_load('txt_before_Nozzle','lbl_before_neg_Nozzle','lbl_before_pos_Nozzle','lbl_before_tol_Nozzle');
                Setup_Logs.Percentage_pn_on_load('txt_before_Barrel1','lbl_before_neg_Barrel1','lbl_before_pos_Barrel1','lbl_before_tol_Barrel1');
                Setup_Logs.Percentage_pn_on_load('txt_before_Barrel2','lbl_before_neg_Barrel2','lbl_before_pos_Barrel2','lbl_before_tol_Barrel2');
                Setup_Logs.Percentage_pn_on_load('txt_before_Barrel3','lbl_before_neg_Barrel3','lbl_before_pos_Barrel3','lbl_before_tol_Barrel3');
                Setup_Logs.Percentage_pn_on_load('txt_before_Feed_Throat','lbl_before_neg_Feed_Throat','lbl_before_pos_Feed_Throat','lbl_before_tol_Feed_Throat');


                 //inj_pack
                 var inj_pack_json = JSON.parse(data.inj_pack_setting[0].injection_step);
                 var html_inj_pack = '';
                 $('table #injection_step_tbl_before').html('');
                 for(b = 0; b<inj_pack_json.length;b++)
                 {
                     html_inj_pack='<tr>'+
                                     '<td>1</td>'+
                                     '<td>'+
                                     '<label  id="lbl_before_Inj_Step'+b+'" class="col-sm-4 control-label">0</label>'+
                                     '<input readonly id="txt_before_Inj_Step'+b+'" class="col-sm-4   input_field" type="text"'+
                                     ' placeholder="Input Here.." value="'+inj_pack_json[b].Inj_Step+'" style="width: 60px;">'+
                                     '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                                     '</td>'+
                                     '<td>'+
                                     ' <label  id="lbl_before_IStep'+b+'" class="col-sm-4 control-label">0</label>'+
                                     '<input readonly id="txt_before_IStep'+b+'" class="col-sm-4   input_field" type="text" '+
                                     ' placeholder="Input Here.." value="'+inj_pack_json[b].IStep+'"  style="width: 60px;">'
                                     '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm</label>'+
                                     '</td>'+
                                     '</tr>';
                    
                    
                                     $('table #injection_step_tbl_before').append(html_inj_pack);
                                     Setup_Logs.Percentage_pn_on_load('txt_before_Inj_Step'+b,'','','lbl_before_Inj_Step'+b,'table #pack_step_tbl_before');
                                     Setup_Logs.Percentage_pn_on_load('txt_before_IStep'+b,'','','lbl_before_IStep'+b,'table #pack_step_tbl_before');
                     
                 }
                 
                 
                 $('#txt_before_Inj_step').val(data.inj_pack_setting[0].inj_step_mid);
                 $('#txt_before_Max_Inj_Pres').val(data.inj_pack_setting[0].max_inj_pressure);
                 $('#txt_before_Act_Inj_Pres').val(data.inj_pack_setting[0].actual_pressure);
                 $('#txt_before_Max_Inj_Time').val(data.inj_pack_setting[0].max_inj_time);
                 $('#txt_before_Act_Time').val(data.inj_pack_setting[0].actual_time);
                 $('#txt_before_Max_Pack_Velo').val(data.inj_pack_setting[0].max_pack_velo);
                 $('#txt_before_POS_Trans').val(data.inj_pack_setting[0].pos_trans);
                 $('#txt_before_Pack_step').val(data.inj_pack_setting[0].pack_step_mid);
 
                 Setup_Logs.Percentage_pn_on_load('txt_before_Max_Inj_Pres','','','lbl_before_Max_Inj_Pres');
                 Setup_Logs.Percentage_pn_on_load('txt_before_Max_Inj_Time','','','lbl_before_Max_Inj_Time');
                 Setup_Logs.Percentage_pn_on_load('txt_before_Max_Pack_Velo','','','lbl_before_Max_Pack_Velo');
                 Setup_Logs.Percentage_pn_on_load('txt_before_POS_Trans','','','lbl_before_POS_Trans');
 
                 var pack_step_json = JSON.parse(data.inj_pack_setting[0].pack_step)
                 var html_pack_step=''
                 $('.table #pack_step_tbl_before').html(html_pack_step);
                 for(c=0;c<pack_step_json.length;c++){
                     html_pack_step='<tr>'+
                                     '<td>'+(c+1)+'</td>'+
                                     '<td><label  id="lbl_before_Pack_Step'+c+'" class="col-sm-4 control-label"></label></td>'+
                                     '<td><input readonly id="txt_before_Pack_Step'+c+'" class="col-sm-4   input_field" type="text" '+
                                     'placeholder="Input Here.." style="width: 60px;" value="'+pack_step_json[c].Pack_Step+'">'+
                                     '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                                     '</td>'+
                                     '<td>'+
                                     '<td><label  id="lbl_before_PStep'+c+'" class="col-sm-4 control-label">0</label></td>'+
                                     '<td><input readonly id="txt_before_PStep'+c+'" class="col-sm-4   input_field" type="text" '+
                                     'placeholder="Input Here.." style="width: 60px;" value="'+pack_step_json[c].PStep+'">'+
                                     '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm</label>'+
                                     '</td>'+
                                     '</tr>';
                                     $('.table #pack_step_tbl_before').append(html_pack_step);
                                     Setup_Logs.Percentage_pn_on_load('txt_before_Pack_Step'+c,'','','lbl_before_Pack_Step'+c);
                                     Setup_Logs.Percentage_pn_on_load('txt_before_PStep'+c,'','','lbl_before_PStep'+c);
                 }

                 //measuring_condition_setting
                $('#txt_before_Extruder').val(data.measuring_condition_setting[0].extruder_on);
                var extruder_json = JSON.parse(data.measuring_condition_setting[0].extruder_json);
                var html_extruder = '';
                $('.table #extruder_tbl_before').html(html_extruder);
                for(d=0;d<extruder_json.length;d++)
                {
                    html_extruder = '<tr>'+
                                    '<td>'+(d+1)+'</td>'+
                                    '<td>'+
                                    '<label id="lbl_before_Ext_kg'+d+'" class="col-sm-4 control-label">±0</label>'+
                                    '<input type="text" readonly id="txt_before_Ext_kg'+d+'" placeholder="Input Here.." '+
                                    'class=" col-sm-4 input_field" value="'+extruder_json[d].kg+'">'+
                                    '<label id="lbl_static" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>'+
                                    '</td>'+
                                    '<td colspan="2">'+
                                    '<label id="lbl_before_Ext_rpm'+d+'" class="col-sm-4 control-label">±0</label>'+
                                    '<input type="text" readonly id="txt_before_Ext_rpm'+d+'" placeholder="Input Here.." '+
                                    'class=" col-sm-4 input_field" value="'+extruder_json[d].rpm+'">'+
                                    ' <label id="lbl_static" class="col-sm-4 control-label">rpm</label>'+
                                    '</td>'+
                                    '<td>'+
                                    '<label id="lbl_before_Ext_mm'+d+'" class="col-sm-4 control-label">±0</label>'+
                                    '<input type="text" readonly id="txt_before_Ext_mm'+d+'" placeholder="Input Here.." '+
                                    'class=" col-sm-4 input_field" value="'+extruder_json[d].mm+'">'+
                                    '<label id="lbl_static" class="col-sm-4 control-label">mm</label>'+
                                    '</td>'+
                                    '</tr>';
                    $('.table #extruder_tbl_before').append(html_extruder);
                    Setup_Logs.Percentage_pn_on_load('txt_before_Ext_kg'+d,'','','lbl_before_Ext_kg'+d);
                    Setup_Logs.Percentage_pn_on_load('txt_before_Ext_rpm'+d,'','','lbl_before_Ext_rpm'+d);
                    Setup_Logs.Percentage_pn_on_load('txt_before_Ext_mm'+d,'','','lbl_before_Ext_mm'+d);
                }

                $('#txt_before_Mcushion').val(data.measuring_condition_setting[0].m_cushion);
                $('#txt_before_Shot_Size').val(data.measuring_condition_setting[0].shot_size);
                $('#txt_before_Dcmp_Dist').val(data.measuring_condition_setting[0].dcmp_dist);
                $('#txt_before_Dcmp_Vel').val(data.measuring_condition_setting[0].dcmp_vel);
                $('#txt_before_Cool_Time').val(data.measuring_condition_setting[0].cool_time);

                Setup_Logs.Percentage_pn_on_load('txt_before_Mcushion','','','lbl_before_mcushion');
                Setup_Logs.Percentage_pn_on_load('txt_before_Shot_Size','','','lbl_before_shot_size');
                Setup_Logs.Percentage_pn_on_load('txt_before_Dcmp_Dist','','','lbl_before_Dcmp_Dist');
                Setup_Logs.Percentage_pn_on_load('txt_before_Dcmp_Vel','','','lbl_before_Dcmp_Vel');
                Setup_Logs.Percentage_pn_on_load('txt_before_Cool_Time','','','lbl_before_Cool_Time');

                
               
            },
            error: function(data){
                console.log(data);
            },
            complete: function(data){
                $('.input_field').removeClass('txt_exceed');
                $('.input_field').removeClass('txt_warn');
                Setup_Logs.Check_changes();
                // $("#wait").css("display", "none");
            }
        }); */
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

    this_data.Check_changes = function(){

        var before_id = '';
        var before_val = '';
        var after_id = '';
        var after_val='';
        $.each($('.get_id *[id^="txt"]'), function(index, value){
            // console.log($(value).attr('id'));

            

             before_id = $(value).attr('id');
             before_val = $('#'+before_id).val();

             after_id = $(value).attr('id').replace("before", "after");
            // console.log(after_id);
            after_val = $('#'+after_id).val();
    
            if(before_val!=after_val){
                $('#'+after_id).addClass('txt_exceed');
                $('#'+before_id).addClass('txt_exceed');
                $('#'+after_id).removeClass('txt_warn');
                $('#'+before_id).removeClass('txt_warn');
            }
            else{
                $('#'+after_id).addClass('txt_warn');
                $('#'+after_id).removeClass('txt_exceed');
                $('#'+before_id).removeClass('txt_exceed');
            }

        });

       
        


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


var Adjustment_History = (function(){

    var this_data = {};

    this_data.load_adjustments = function(id,parameter_setting){

        if(parameter_setting==""){
            var row = '';
            row+='<tr><td style="text-align:center" colspan = "6"> <h1>Please Select a Parameter Setting</h1></td></tr>';
            $('table #adj_tbl').html(row);
        }
        else{
            $("#wait").css("display", "block");
            $.ajax({
                url:"check_list/adjustments",
                type:"POST",
                data: {
                    'main_register_id':id,
                    'parameter':parameter_setting
                },
                success:function(data){
                    var row = '';
                    console.log(data['query']['after_data']);
                if(data['query']['after_data'].length ==0){
                        row+='<tr><td style="text-align:center" colspan = "6"> <h1>No History to Display</h1></td></tr>';
                }
                else{
                    $.each(data,function(key,value){
                        // console.log(value);
                        
                        var loop_limit = value['after_data'].length;

                        for(a = 0; a< loop_limit; a++){

                            var reason = "";
                            if(value['after_data'][a]['reason_relation']!=null){
                                reason = value['after_data'][a]['reason_relation']['reason_desc'];
                            }
                            else{
                                reason="N/A";
                            }
                            var result ="";
                            if(value['after_data'][a].result=="unsolved"){
                                result ="Problem Still Exists";
                            }
                            else{
                                result = "<b>Problem Solved</b>"
                            }

                            row+='<tr>';
                            if(parameter_setting=='mct_setting'){
                                row+='<td> '+'MCT SETTING'+'</td>'+
                                    '<td> '+ value['after_data'][a].created_at+' </td>'+
                                    '<td>'+reason+'</td>'+'<td style="width: 35vw" id="original_condition">'+
                                            '<div class="table-responsive" >'+
                                            '<table class="table table-bordered text-center table-striped bold-text" >'+
                                            ' <thead>'+
                                                    '<tr>'+
                                                    ' <th colspan="2">DIE TEMPERATURE DATA</th>'+
                                                    '</tr>'+
                                                '</thead>'+
                                                '<tbody>'+
                                                    '<tr>'+
                                                        '<td><label for="lbl_die_temp_core" class=" control-label">Die Temp Core:&nbsp&nbsp</label></td>'+
                                                        '<td>'+
                                                                '<input type="text" class=" input_field" '+
                                                                'readonly id="txt_before_die_temp_core" placeholder="Input Die Temperature Core" value="'+value['before_data'][0].die_temp_core+'" >'+
                                                    ' </td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                    ' <td><label for="lbl_die_temp_cavity" class=" control-label">Die Temp Cavity:</label></td>'+
                                                    ' <td>'+
                                                            '<input type="text" class=" input_field" '+
                                                            'readonly id="txt_before_die_temp_cavity" placeholder="Input Die Temp Cavity" value="'+value['before_data'][0].die_temp_cavity+'">'+
                                                    ' </td>'+
                                                ' </tr>'+
                                                    '<tr>'+
                                                        '<td><label for="lbl_mold_temp_ctrl" class=" control-label">Mold Temp Control:</label></td>'+
                                                    ' <td>'+
                                                        ' <input type="text" class=" input_field" '+
                                                        '  readonly id="txt_before_mold_temp_ctrl" placeholder="Input Mold Temp Ctrl:" value="'+value['before_data'][0].mold_temp_control+'">'+
                                                    ' </td>'+
                                                    '</tr>'+
                                                '</tbody>'+
                                        ' </table>'+
                                    ' </div>'+
                                    '</td>'+
                                    '<td style="width: 35vw" id="adjusted_condition">'+
                                    '<div class="table-responsive" >'+
                                        '<table class="table table-bordered text-center table-striped bold-text" >'+
                                        ' <thead>'+
                                                '<tr>'+
                                                ' <th colspan="2">DIE TEMPERATURE DATA</th>'+
                                                '</tr>'+
                                            '</thead>'+
                                            '<tbody>'+
                                                '<tr>'+
                                                    '<td><label for="lbl_die_temp_core" class=" control-label">Die Temp Core:&nbsp&nbsp</label></td>'+
                                                    '<td>'+
                                                            '<input type="text" class=" input_field" '+
                                                            'readonly id="txt_before_die_temp_core" placeholder="Input Die Temperature Core" value="'+value['after_data'][a].die_temp_core+'" >'+
                                                ' </td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                ' <td><label for="lbl_die_temp_cavity" class=" control-label">Die Temp Cavity:</label></td>'+
                                                ' <td>'+
                                                        '<input type="text" class=" input_field" '+
                                                        'readonly id="txt_before_die_temp_cavity" placeholder="Input Die Temp Cavity" value="'+value['after_data'][a].die_temp_cavity+'">'+
                                                ' </td>'+
                                            ' </tr>'+
                                                '<tr>'+
                                                    '<td><label for="lbl_mold_temp_ctrl" class=" control-label">Mold Temp Control:</label></td>'+
                                                ' <td>'+
                                                    ' <input type="text" class=" input_field" '+
                                                    '  readonly id="txt_before_mold_temp_ctrl" placeholder="Input Mold Temp Ctrl:" value="'+value['after_data'][a].mold_temp_control+'">'+
                                                ' </td>'+
                                                '</tr>'+
                                            '</tbody>'+
                                    ' </table>'+
                                ' </div>'+
                                    '</td>'+
                                    '<td>'+result+'</td>';
                            }
                            else if(parameter_setting=="product_info"){
                                var pweight = JSON.parse(value['after_data'][a].product_weight);
                                var pweight2 = JSON.parse(value['before_data'][0].product_weight);
                                console.log(pweight.length);

                                row+='<td> '+'PRODUCT INFO'+'</td>'+
                                '<td> '+ value['after_data'][a].created_at+' </td>'+
                                '<td>'+reason+'</td>'+'<td style="width: 35vw" id="original_condition">'+
                                    '<table class="table table-bordered text-center table-striped bold-text" >'+
                                    '<thead>'+
                                        '<tr>'+
                                            '<th colspan="2">PRODUCT INFORMATION</th>'+
                                        '</tr>'+
                                    '</thead>'+
                                    '<tbody>'+
                                        '<tr>'+
                                            '<td>MACHINE CYCLE TIME:</td>'+
                                            '<td colspan="2"><input type="text" class="input_field" readonly id="txt_before_machine_cycle_time" '+
                                            'placeholder="Input Machine Cycle Time" value="'+value['before_data'][0].machine_cycle_time+'"></td>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td colspan="2" class="tr_pweight_before">'+
                                                '<table class="table table-bordered text-center table-striped bold-text">'+
                                                    '<tbody>';

                                            $.each(pweight2,function(key,value0){
                                            row+='<tr>'+
                                                ' <td>PRODUCT WEIGHT:</td>'+
                                                ' <td><input type="text" class="input_field" readonly id="txt_before_prod_weight" '+
                                                'placeholder="Input Product Weight" value="'+value0.x+'"></td>'+
                                                '</tr> ';
                                            });
                                                    
                                                        row+='</tbody>'+
                                                '</table>'+
                                            '</td>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td>SPRUE WEIGHT:</td>'+
                                            '<td colspan="2"><input type="text" class="input_field" readonly id="txt_before_sprue_weight" '+
                                            'placeholder="Input Sprue Weight" value="'+value['before_data'][0].sprue_weight+'"></td>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td>SUB-PART WEIGHT:</td>'+
                                            '<td colspan="2"><input type="text" class="input_field" readonly id="txt_before_sub_part_weight" '+
                                            'placeholder="Input Sub Part Weight" value="'+value['before_data'][0].sub_part_weight+'"></td>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td>ADDITIONAL CYCLE TIME:</td>'+
                                            '<td colspan="2"><input type="text" class="input_field" readonly id="txt_before_additional_cycle_time" '+
                                            'placeholder="Input Additional Cycle Time" value="'+value['before_data'][0].additional_cycle_time+'"></td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                    '</table>'+
                                '</td>'+

                                '<td style="width: 35vw" id="adjusted_condition">'+
                                    '<table class="table table-bordered text-center table-striped bold-text" >'+
                                    '<thead>'+
                                        '<tr>'+
                                            '<th colspan="2">PRODUCT INFORMATION</th>'+
                                        '</tr>'+
                                    '</thead>'+
                                    '<tbody>'+
                                        '<tr>'+
                                            '<td>MACHINE CYCLE TIME:</td>'+
                                            '<td colspan="2"><input type="text" class="input_field" readonly id="txt_before_machine_cycle_time" '+
                                            'placeholder="Input Machine Cycle Time" value="'+value['after_data'][a].machine_cycle_time+'"></td>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td colspan="2" class="tr_pweight_before">'+
                                                '<table class="table table-bordered text-center table-striped bold-text">'+
                                                    '<tbody>';

                                            $.each(pweight,function(key,value){
                                            row+='<tr>'+
                                                ' <td>PRODUCT WEIGHT:</td>'+
                                                ' <td><input type="text" class="input_field" readonly id="txt_before_prod_weight" '+
                                                'placeholder="Input Product Weight" value="'+value.x+'"></td>'+
                                                '</tr> ';
                                            });
                                                    
                                                        row+='</tbody>'+
                                                '</table>'+
                                            '</td>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td>SPRUE WEIGHT:</td>'+
                                            '<td colspan="2"><input type="text" class="input_field" readonly id="txt_before_sprue_weight" '+
                                            'placeholder="Input Sprue Weight" value="'+value['after_data'][a].sprue_weight+'"></td>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td>SUB-PART WEIGHT:</td>'+
                                            '<td colspan="2"><input type="text" class="input_field" readonly id="txt_before_sub_part_weight" '+
                                            'placeholder="Input Sub Part Weight" value="'+value['after_data'][a].sub_part_weight+'"></td>'+
                                        '</tr>'+
                                        '<tr>'+
                                            '<td>ADDITIONAL CYCLE TIME:</td>'+
                                            '<td colspan="2"><input type="text" class="input_field" readonly id="txt_before_additional_cycle_time" '+
                                            'placeholder="Input Additional Cycle Time" value="'+value['after_data'][a].additional_cycle_time+'"></td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                    '</table>'+
                                '</td>'+
                                '<td>'+result+'</td>';

                            }
                            else if(parameter_setting=="clamp_eject_setting"){
                                row+='<td> '+'CLAMPING EJECTING SETTING'+'</td>'+
                                '<td> '+ value['after_data'][a].created_at+' </td>'+
                                '<td>'+reason+'</td>'+'<td style="width: 35vw" id="original_condition">'+
                                        '<table class="table table-bordered text-center bold-text table-striped" style="font-size: 1em">'+
                                        '<thead>'+
                                                '<tr>'+
                                                    '<td colspan="4">SETTING FOR CLAMPING AND EJECTING(±10% CONTROL)</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                '<th scope="col" colspan="2">...</th>'+
                                                '<th scope="col">POS(mm)</th>'+
                                                '<th scope="col">VEL(mm/s)</th>'+
                                                '</tr>'+
                                        '</thead>'+
                                        '<tbody class="text-center">'+
                                                '<tr>'+
                                            ' <td >Open Limit</td>'+
                                                '<td >FULL OPEN</td>'+
                                                '<td>'+        
                                                    ' <input class="col-sm-4 input_field form-control" type="text" readonly id="txt_before_OLFO_POS" '+
                                                    'placeholder="Input" value="'+value['before_data'][0].open_limit_POS+'">'+
                                                '</td>'+
                                                '<td>'+
                                                    ' <input type="text" readonly id="txt_before_OLFO_VEL" placeholder="Input" '+
                                                    'class="col-sm-4 input_field form-control" value="'+value['before_data'][0].open_limit_VEL+'">'+
                                                '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                '<td>Close SW</td>'+
                                                '<td>1</td>'+
                                                '<td>'+
                                                        '<input readonly id="txt_before_CS1_POS" class="col-sm-4   input_field form-control" type="text" '+
                                                        'placeholder="Input" value="'+value['before_data'][0].close_sw_POS+'">'+
                                                '</td>'+
                                                '<td>'+
                                                    '<input readonly id="txt_before_CS1_VEL" type="text" placeholder="Input" '+
                                                    'class=" col-sm-4 input_field form-control" value="'+value['before_data'][0].close_sw_VEL+'">'+
                                            ' </td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                '<td>Close SLOW</td>'+
                                                '<td>MOLD PRTCT</td>'+
                                                '<td>'+
                                                    '<input readonly id="txt_before_CSMP_POS" class="col-sm-4   input_field form-control" '+
                                                    'type="text" placeholder="Input" value="'+value['before_data'][0].close_slow_POS+'">'+  
                                            ' </td>'+
                                                '<td>'+
                                                        '<input readonly id="txt_before_CSMP_VEL" type="text" placeholder="Input" '+
                                                        'class="col-sm-4 input_field form-control" value="'+value['before_data'][0].close_slow_VEL+'" >'+
                                                ' </td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                '<td>Close SP</td>'+
                                                '<td>TOUCH</td>'+
                                                '<td>'+
                                                    ' <input readonly id="txt_before_CST_POS" class="col-sm-4 input_field form-control" '+
                                                    'type="text" placeholder="Input" value="'+value['before_data'][0].close_sp_POS+'" >'+
                                            ' </td>'+
                                            '<td>'+'...'+
                                                '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                '<td>Mold Protect</td>'+
                                                '<td>PRTCT TOQ</td>'+
                                                '<td>'+
                                                        '<input readonly id="txt_before_MPPT_POS" class="col-sm-4   input_field form-control" '+
                                                        'type="text" placeholder="Input" value="'+value['before_data'][0].mold_prtct_POS+'">'+
                                            ' </td>'+
                                                '<td>'+ '...'+
                                                '</td>'+
                                            ' </tr>'+
                                            ' <tr>'+
                                                '<td>Breakaway</td>'+
                                                '<td>BREAKAWAY</td>'+
                                                '<td>'+
                                                    ' ...'+
                                                '</td>'+
                                                '<td>'+
                                                        '<input readonly id="txt_before_BB_VEL" type="text" placeholder="Input" '+
                                                        'class=" col-sm-4 input_field form-control" value="'+value['before_data'][0].breakaway_VEL+'">'+
                                                '</td>'+
                                                '</tr>'+
                                            ' <tr>'+
                                                '<td>Open 1st</td>'+
                                                '<td>1</td>'+
                                                '<td>'+
                                                    ' <input readonly id="txt_before_O1_POS" class="col-sm-4   input_field form-control" '+
                                                    'type="text" placeholder="Input" value="'+value['before_data'][0].open1_POS+'">'+
                                            ' </td>'+
                                                '<td>'+
                                                    ' <input readonly id="txt_before_O1_VEL" type="text" placeholder="Input" '+
                                                    'class=" col-sm-4 input_field form-control" value="'+value['before_data'][0].open1_VEL+'">'+
                                            ' </td>'+
                                            ' </tr>'+
                                                '<tr>'+
                                                '<td>Open 2nd</td>'+
                                                '<td>1</td>'+
                                            ' <td>'+
                                            '<input readonly id="txt_before_O2_POS" class="col-sm-4   input_field form-control" '+
                                            'type="text" placeholder="Input" value="'+value['before_data'][0].open2_POS+'">'+
                                                '</td>'+
                                                '<td>'+
                                                        '<input readonly id="txt_before_O2_VEL" type="text" placeholder="Input" '+
                                                        'class=" col-sm-4 input_field form-control" value="'+value['before_data'][0].open2_VEL+'">'+
                                                '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                '<td>Full Open</td>'+
                                                '<td>FULL OPEN</td>'+
                                            ' <td>'+
                                                    '<input readonly id="txt_before_FOFO_POS" class="col-sm-4   input_field form-control" '+
                                                    'type="text" placeholder="Input" value="'+value['before_data'][0].full_open_POS+'">'+
                                                '</td>'+
                                            ' <td>'+
                                                    ' ...'+
                                                '</td>'+
                                                '</tr>'+
                                            ' <tr>'+
                                                '<td>Eject Start</td>'+
                                                '<td>EJECT START</td>'+
                                            ' <td>'+
                                                    ' <input readonly id="txt_before_ESES_POS" class="col-sm-4   input_field form-control" '+
                                                    'type="text" placeholder="Input" value="'+value['before_data'][0].eject_start_POS+'">'+
                                                '</td>'+
                                            '  <td>'+
                                                        '...'+
                                                '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                '<td colspan="2">PULSES</td>'+
                                                '<td>'+
                                                    ' <input readonly id="txt_before_Pulses" class="col-sm-4   input_field form-control" '+
                                                    'type="text" placeholder="Input" value="'+value['before_data'][0].pulses+'">'+
                                            ' </td>'+
                                            ' <td>'+
                                                    ' COUNT'+
                                                '</td>'+
                                                '</tr>'+
                                        '</tbody>'+
                                ' </table> '+

                                    '<table class="table table-bordered text-center bold-text table-striped">'+
                                        '<thead>'+
                                                '<tr>'+
                                                '<th>EJECTOR</th>'+
                                                '<th>POS(mm)</th>'+
                                                '<th> VEL(mm/s)</th>'+
                                                '<th>DWELL(sec)</th>'+
                                                '</tr>'+
                                    ' </thead>'+
                                    '  <tbody>'+
                                                '<tr>'   +                
                                                '<td>FORWARD/ FWD</td>'+
                                                '<td>'+
                                                    ' <input readonly id="txt_before_FWD_POS" class="col-sm-4 input_field form-control" '+
                                                    'type="text" placeholder="Input" value="'+value['before_data'][0].FWD_POS+'">'+
                                                '</td>'+
                                                '<td>'+
                                                    ' <input readonly id="txt_before_FWD_VEL" class="col-sm-4   input_field form-control" '+
                                                    'type="text" placeholder="Input" value="'+value['before_data'][0].FWD_VEL+'">'+
                                                '</td>'+
                                            ' <td>'+
                                                    '<input readonly id="txt_before_FWD_DWELL" type="text" placeholder="Input" '+
                                                    'class=" col-sm-4 input_field form-control" value="'+value['before_data'][0].FWD_DWELL+'">'+
                                                '</td>'+
                                            ' </tr>'+

                                                '<tr>'+
                                                '<td>STOP/ADV.MID</td>'+
                                                '<td>'+
                                                '<input readonly id="txt_before_ADV_POS" class="col-sm-4   input_field form-control" '+
                                                'type="text" placeholder="Input" value="'+value['before_data'][0].ADV_POS+'">'+
                                                '</td>'+
                                            ' <td>'+
                                                    '<input readonly id="txt_before_ADV_VEL" class="col-sm-4   input_field form-control" '+
                                                    'type="text" placeholder="Input" value="'+value['before_data'][0].ADV_VEL+'">'+
                                                '</td>'+
                                                '<td>'+
                                                    ' <input readonly id="txt_before_ADV_DWELL" type="text" placeholder="Input" '+
                                                    'class=" col-sm-4 input_field form-control" value="'+value['before_data'][0].ADV_DWELL+'">'+
                                            '  </td>'+
                                            ' </tr>'+

                                            ' <tr>'+
                                                '<td>Reverse/REV</td>'+
                                            ' <td>'+
                                                    ' <input readonly id="txt_before_REV_POS" class="col-sm-4   input_field form-control" '+
                                                    'type="text" placeholder="Input" value="'+value['before_data'][0].REV_POS+'">'+
                                                '</td>'+
                                                '<td>'+
                                                        '<input readonly id="txt_before_REV_VEL" class="col-sm-4   input_field form-control" '+
                                                        'type="text" placeholder="Input" value="'+value['before_data'][0].REV_VEL+'">'+
                                                '</td>'+
                                                '<td>'+
                                                        '<input readonly id="txt_before_REV_DWELL" type="text" placeholder="Input" '+
                                                        'class=" col-sm-4 input_field form-control" value="'+value['before_data'][0].REV_DWELL+'">'+
                                                '</td>'+
                                                '</tr>'+

                                                '<tr>'+
                                                '<td colspan="2">EJECTOR DELAY</td>'+
                                                '<td colspan="2">'+
                                                    ' <input readonly id="txt_before_Ejector_Delay" class="col-sm-4 input_field form-control" type="text" '+
                                                        'placeholder="Input" value="'+value['before_data'][0].ejector_delay+'">'+
                                                    ' <label id="lbl_before_Ejector_Delay" class="col-sm-4 control-label">second/s</label>'+
                                                '</td>'+
                                            ' </tr>'+

                                                '<tr>'+
                                                '<td colspan="2">AUTO DIE HEIGHT(TON)</td>'+
                                                '<td colspan="2">'+
                                                    ' <input readonly id="txt_before_Die_Height" type="text" placeholder="Input" '+
                                                    'class=" col-sm-4 input_field form-control" value="'+value['before_data'][0].auto_die_height+'">'+   
                                                '</td>'+
                                            '  </tr>'+
                                    '  </tbody>'+
                                    '</table>'+
                                '</td>'+

                                '<td style="width: 35vw" id="adjusted_condition">'+
                                        '<table class="table table-bordered text-center bold-text table-striped" style="font-size: 1em">'+
                                            '<thead>'+
                                                    '<tr>'+
                                                        '<td colspan="4">SETTING FOR CLAMPING AND EJECTING(±10% CONTROL)</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                    '<th scope="col" colspan="2">...</th>'+
                                                    '<th scope="col">POS(mm)</th>'+
                                                    '<th scope="col">VEL(mm/s)</th>'+
                                                    '</tr>'+
                                            '</thead>'+
                                            '<tbody class="text-center">'+
                                                    '<tr>'+
                                                ' <td >Open Limit</td>'+
                                                    '<td >FULL OPEN</td>'+
                                                    '<td>'+        
                                                        ' <input class="col-sm-4 input_field form-control" type="text" readonly id="txt_before_OLFO_POS" '+
                                                        'placeholder="Input" value="'+value['after_data'][a].open_limit_POS+'">'+
                                                    '</td>'+
                                                    '<td>'+
                                                        ' <input type="text" readonly id="txt_before_OLFO_VEL" placeholder="Input" '+
                                                        'class="col-sm-4 input_field form-control" value="'+value['after_data'][a].open_limit_VEL+'">'+
                                                    '</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                    '<td>Close SW</td>'+
                                                    '<td>1</td>'+
                                                    '<td>'+
                                                            '<input readonly id="txt_before_CS1_POS" class="col-sm-4   input_field form-control" type="text" '+
                                                            'placeholder="Input" value="'+value['after_data'][a].close_sw_POS+'">'+
                                                    '</td>'+
                                                    '<td>'+
                                                        '<input readonly id="txt_before_CS1_VEL" type="text" placeholder="Input" '+
                                                        'class=" col-sm-4 input_field form-control" value="'+value['after_data'][a].close_sw_VEL+'">'+
                                                ' </td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                    '<td>Close SLOW</td>'+
                                                    '<td>MOLD PRTCT</td>'+
                                                    '<td>'+
                                                        '<input readonly id="txt_before_CSMP_POS" class="col-sm-4   input_field form-control" '+
                                                        'type="text" placeholder="Input" value="'+value['after_data'][a].close_slow_POS+'">'+  
                                                ' </td>'+
                                                    '<td>'+
                                                            '<input readonly id="txt_before_CSMP_VEL" type="text" placeholder="Input" '+
                                                            'class="col-sm-4 input_field form-control" value="'+value['after_data'][a].close_slow_VEL+'" >'+
                                                    ' </td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                    '<td>Close SP</td>'+
                                                    '<td>TOUCH</td>'+
                                                    '<td>'+
                                                        ' <input readonly id="txt_before_CST_POS" class="col-sm-4 input_field form-control" '+
                                                        'type="text" placeholder="Input" value="'+value['after_data'][a].close_sp_POS+'" >'+
                                                ' </td>'+
                                                '<td>'+'...'+
                                                    '</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                    '<td>Mold Protect</td>'+
                                                    '<td>PRTCT TOQ</td>'+
                                                    '<td>'+
                                                            '<input readonly id="txt_before_MPPT_POS" class="col-sm-4   input_field form-control" '+
                                                            'type="text" placeholder="Input" value="'+value['after_data'][a].mold_prtct_POS+'">'+
                                                ' </td>'+
                                                    '<td>'+ '...'+
                                                    '</td>'+
                                                ' </tr>'+
                                                ' <tr>'+
                                                    '<td>Breakaway</td>'+
                                                    '<td>BREAKAWAY</td>'+
                                                    '<td>'+
                                                        ' ...'+
                                                    '</td>'+
                                                    '<td>'+
                                                            '<input readonly id="txt_before_BB_VEL" type="text" placeholder="Input" '+
                                                            'class=" col-sm-4 input_field form-control" value="'+value['after_data'][a].breakaway_VEL+'">'+
                                                    '</td>'+
                                                    '</tr>'+
                                                ' <tr>'+
                                                    '<td>Open 1st</td>'+
                                                    '<td>1</td>'+
                                                    '<td>'+
                                                        ' <input readonly id="txt_before_O1_POS" class="col-sm-4   input_field form-control" '+
                                                        'type="text" placeholder="Input" value="'+value['after_data'][a].open1_POS+'">'+
                                                ' </td>'+
                                                    '<td>'+
                                                        ' <input readonly id="txt_before_O1_VEL" type="text" placeholder="Input" '+
                                                        'class=" col-sm-4 input_field form-control" value="'+value['after_data'][a].open1_VEL+'">'+
                                                ' </td>'+
                                                ' </tr>'+
                                                    '<tr>'+
                                                    '<td>Open 2nd</td>'+
                                                    '<td>1</td>'+
                                                ' <td>'+
                                                '<input readonly id="txt_before_O2_POS" class="col-sm-4   input_field form-control" '+
                                                'type="text" placeholder="Input" value="'+value['after_data'][a].open2_POS+'">'+
                                                    '</td>'+
                                                    '<td>'+
                                                            '<input readonly id="txt_before_O2_VEL" type="text" placeholder="Input" '+
                                                            'class=" col-sm-4 input_field form-control" value="'+value['after_data'][a].open2_VEL+'">'+
                                                    '</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                    '<td>Full Open</td>'+
                                                    '<td>FULL OPEN</td>'+
                                                ' <td>'+
                                                        '<input readonly id="txt_before_FOFO_POS" class="col-sm-4   input_field form-control" '+
                                                        'type="text" placeholder="Input" value="'+value['after_data'][a].full_open_POS+'">'+
                                                    '</td>'+
                                                ' <td>'+
                                                        ' ...'+
                                                    '</td>'+
                                                    '</tr>'+
                                                ' <tr>'+
                                                    '<td>Eject Start</td>'+
                                                    '<td>EJECT START</td>'+
                                                ' <td>'+
                                                        ' <input readonly id="txt_before_ESES_POS" class="col-sm-4   input_field form-control" '+
                                                        'type="text" placeholder="Input" value="'+value['after_data'][a].eject_start_POS+'">'+
                                                    '</td>'+
                                                '  <td>'+
                                                            '...'+
                                                    '</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                    '<td colspan="2">PULSES</td>'+
                                                    '<td>'+
                                                        ' <input readonly id="txt_before_Pulses" class="col-sm-4   input_field form-control" '+
                                                        'type="text" placeholder="Input" value="'+value['after_data'][a].pulses+'">'+
                                                ' </td>'+
                                                ' <td>'+
                                                        ' COUNT'+
                                                    '</td>'+
                                                    '</tr>'+
                                            '</tbody>'+
                                    ' </table> '+

                                        '<table class="table table-bordered text-center bold-text table-striped">'+
                                            '<thead>'+
                                                    '<tr>'+
                                                    '<th>EJECTOR</th>'+
                                                    '<th>POS(mm)</th>'+
                                                    '<th> VEL(mm/s)</th>'+
                                                    '<th>DWELL(sec)</th>'+
                                                    '</tr>'+
                                        ' </thead>'+
                                        '  <tbody>'+
                                                    '<tr>'   +                
                                                    '<td>FORWARD/ FWD</td>'+
                                                    '<td>'+
                                                        ' <input readonly id="txt_before_FWD_POS" class="col-sm-4 input_field form-control" '+
                                                        'type="text" placeholder="Input" value="'+value['after_data'][a].FWD_POS+'">'+
                                                    '</td>'+
                                                    '<td>'+
                                                        ' <input readonly id="txt_before_FWD_VEL" class="col-sm-4   input_field form-control" '+
                                                        'type="text" placeholder="Input" value="'+value['after_data'][a].FWD_VEL+'">'+
                                                    '</td>'+
                                                ' <td>'+
                                                        '<input readonly id="txt_before_FWD_DWELL" type="text" placeholder="Input" '+
                                                        'class=" col-sm-4 input_field form-control" value="'+value['after_data'][a].FWD_DWELL+'">'+
                                                    '</td>'+
                                                ' </tr>'+

                                                    '<tr>'+
                                                    '<td>STOP/ADV.MID</td>'+
                                                    '<td>'+
                                                    '<input readonly id="txt_before_ADV_POS" class="col-sm-4   input_field form-control" '+
                                                    'type="text" placeholder="Input" value="'+value['after_data'][a].ADV_POS+'">'+
                                                    '</td>'+
                                                ' <td>'+
                                                        '<input readonly id="txt_before_ADV_VEL" class="col-sm-4   input_field form-control" '+
                                                        'type="text" placeholder="Input" value="'+value['after_data'][a].ADV_VEL+'">'+
                                                    '</td>'+
                                                    '<td>'+
                                                        ' <input readonly id="txt_before_ADV_DWELL" type="text" placeholder="Input" '+
                                                        'class=" col-sm-4 input_field form-control" value="'+value['after_data'][a].ADV_DWELL+'">'+
                                                '  </td>'+
                                                ' </tr>'+

                                                ' <tr>'+
                                                    '<td>Reverse/REV</td>'+
                                                ' <td>'+
                                                        ' <input readonly id="txt_before_REV_POS" class="col-sm-4   input_field form-control" '+
                                                        'type="text" placeholder="Input" value="'+value['after_data'][a].REV_POS+'">'+
                                                    '</td>'+
                                                    '<td>'+
                                                            '<input readonly id="txt_before_REV_VEL" class="col-sm-4   input_field form-control" '+
                                                            'type="text" placeholder="Input" value="'+value['after_data'][a].REV_VEL+'">'+
                                                    '</td>'+
                                                    '<td>'+
                                                            '<input readonly id="txt_before_REV_DWELL" type="text" placeholder="Input" '+
                                                            'class=" col-sm-4 input_field form-control" value="'+value['after_data'][a].REV_DWELL+'">'+
                                                    '</td>'+
                                                    '</tr>'+

                                                    '<tr>'+
                                                    '<td colspan="2">EJECTOR DELAY</td>'+
                                                    '<td colspan="2">'+
                                                        ' <input readonly id="txt_before_Ejector_Delay" class="col-sm-4 input_field form-control" type="text" '+
                                                            'placeholder="Input" value="'+value['after_data'][a].ejector_delay+'">'+
                                                        ' <label id="lbl_before_Ejector_Delay" class="col-sm-4 control-label">second/s</label>'+
                                                    '</td>'+
                                                ' </tr>'+

                                                    '<tr>'+
                                                    '<td colspan="2">AUTO DIE HEIGHT(TON)</td>'+
                                                    '<td colspan="2">'+
                                                        ' <input readonly id="txt_before_Die_Height" type="text" placeholder="Input" '+
                                                        'class=" col-sm-4 input_field form-control" value="'+value['after_data'][a].auto_die_height+'">'+   
                                                    '</td>'+
                                                '  </tr>'+
                                        '  </tbody>'+
                                        '</table>'+
                                '</td>'+
                                '<td>'+result+'</td>';

                            }
                            else if(parameter_setting=="cylinder_temp_setting"){
                                row+='<td> '+'CYLINDER TEMPERATURE SETTING'+'</td>'+
                                '<td> '+ value['after_data'][a].created_at+' </td>'+
                                '<td>'+reason+'</td>'+
                                '<td style="width: 35vw" id="original_condition">'+
                                        '<table class="table table-bordered text-center inner_tbl table-striped">'+
                                        '<thead>'+
                                            '<tr>'+
                                                '<th colspan="3">MACHINE SETTING TEMPERATURE(±10% CONTROL)</th>'+
                                            '</tr>'+
                                                '<tr>'+
                                                '<th scope="col">CYLINDER</th>'+
                                                '<th scope="col" width="300px">TEMPERATURE</th>'+
                                                '<th scope="col" width="20px">TOLERANCE</th>'+
                                                '</tr>'+
                                        ' </thead>'+
                                        ' <tbody>'+
                                                    '<tr  id="inner_tr">'+
                                                    '<td>NOZZLE</td>'+
                                                    '<td> '+ 
                                                    ' <input readonly readonly id="txt_before_Nozzle" class="col-sm-4 input_field form-control" type="text" '+
                                                    'placeholder="Input Here.." value="'+value['before_data'][0].nozzle+'">'+  
                                                    '</td>'+
                                                    '<td>'+
                                                    ' <label  id="lbl_before_tol_Nozzle" class="control-label">± '+(value['before_data'][0].nozzle * .10)+'</label>'+     
                                                    '</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                    '<td>BARREL1</td>'+
                                                    '<td>'  +
                                                        '<input readonly readonly id="txt_before_Barrel1" class="col-sm-4   input_field form-control" type="text" '+
                                                        'placeholder="Input Here.." value="'+value['before_data'][0].barrel1+'">'+
                                                    '</td>'+
                                                ' <td>'+
                                                        '<label  id="lbl_before_tol_Barrel1" class="control-label">± '+(value['before_data'][0].barrel1 * .10)+'</label> '+
                                                    '</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                ' <td>BARREL2</td>'+
                                                    '<td>'+
                                                        ' <input readonly readonly id="txt_before_Barrel2" class="col-sm-4   input_field form-control" type="text" '+
                                                        'placeholder="Input Here.." value="'+value['before_data'][0].barrel2+'">'+
                                                    '</td>'+
                                                    '<td>'+
                                                        '<label  id="lbl_before_tol_Barrel2" class="control-label"> ± '+(value['before_data'][0].nozbarrel2zle * .10)+'</label>'+
                                                    '</td>'+
                                                ' </tr>'+
                                                    '<tr>'+
                                                    '<td>BARREL3</td>'+
                                                    '<td>'+
                                                        ' <input readonly readonly id="txt_before_Barrel3" class="col-sm-4   input_field form-control" type="text" '+
                                                        'placeholder="Input Here.." value="'+value['before_data'][0].barrel3+'">'+
                                                    '</td>'+
                                                    '<td>'+
                                                    ' <label  id="lbl_before_tol_Barrel3" class="control-label">± '+(value['before_data'][0].barrel3 * .10)+'</label>'+
                                                    '</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                    '<td>FEED THROAT</td>'+
                                                    '<td>'+
                                                        ' <input readonly readonly id="txt_before_Feed_Throat" class="col-sm-4   input_field form-control" type="text" '+
                                                        'placeholder="Input Here.." value="'+value['before_data'][0].feed_throat+'" >'+
                                                    '</td>'+
                                                    '<td>'+
                                                        '<label  id="lbl_before_tol_Feed_Throat" class="control-label">± '+(value['before_data'][0].feed_throat * .10)+'</label>'+
                                                ' </td>'+
                                                ' </tr>'+
                                        ' </tbody>'+
                                        '</table>'+
                                '</td>'+
                                '<td style="width: 35vw" id="adjusted_condition">'+
                                        '<table class="table table-bordered text-center inner_tbl table-striped">'+
                                        '<thead>'+
                                            '<tr>'+
                                                '<th colspan="3">MACHINE SETTING TEMPERATURE(±10% CONTROL)</th>'+
                                           ' </tr>'+
                                                '<tr>'+
                                                '<th scope="col">CYLINDER</th>'+
                                                '<th scope="col" width="300px">TEMPERATURE</th>'+
                                                '<th scope="col" width="20px">TOLERANCE</th>'+
                                                '</tr>'+
                                       ' </thead>'+
                                       ' <tbody>'+
                                                '<tr  id="inner_tr">'+
                                                '<td>NOZZLE</td>'+
                                                '<td> '+ 
                                                ' <input readonly readonly id="txt_before_Nozzle" class="col-sm-4 input_field form-control" type="text" '+
                                                'placeholder="Input Here.." value="'+value['after_data'][a].nozzle+'">'+  
                                                '</td>'+
                                                '<td>'+
                                                 ' <label  id="lbl_before_tol_Nozzle" class="control-label">± '+(value['after_data'][a].nozzle * .10)+'</label>'+     
                                                '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                '<td>BARREL1</td>'+
                                                '<td>'  +
                                                    '<input readonly readonly id="txt_before_Barrel1" class="col-sm-4   input_field form-control" type="text" '+
                                                    'placeholder="Input Here.." value="'+value['after_data'][a].barrel1+'">'+
                                                '</td>'+
                                               ' <td>'+
                                                    '<label  id="lbl_before_tol_Barrel1" class="control-label">± '+(value['after_data'][a].barrel1 * .10)+'</label> '+
                                                '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                               ' <td>BARREL2</td>'+
                                                '<td>'+
                                                       ' <input readonly readonly id="txt_before_Barrel2" class="col-sm-4   input_field form-control" type="text" '+
                                                       'placeholder="Input Here.." value="'+value['after_data'][a].barrel2+'">'+
                                                '</td>'+
                                                '<td>'+
                                                     '<label  id="lbl_before_tol_Barrel2" class="control-label"> ± '+(value['after_data'][a].nozbarrel2zle * .10)+'</label>'+
                                                '</td>'+
                                               ' </tr>'+
                                                '<tr>'+
                                                '<td>BARREL3</td>'+
                                                '<td>'+
                                                       ' <input readonly readonly id="txt_before_Barrel3" class="col-sm-4   input_field form-control" type="text" '+
                                                       'placeholder="Input Here.." value="'+value['after_data'][a].barrel3+'">'+
                                                '</td>'+
                                                '<td>'+
                                                   ' <label  id="lbl_before_tol_Barrel3" class="control-label">± '+(value['after_data'][a].barrel3 * .10)+'</label>'+
                                                '</td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                '<td>FEED THROAT</td>'+
                                                '<td>'+
                                                       ' <input readonly readonly id="txt_before_Feed_Throat" class="col-sm-4   input_field form-control" type="text" '+
                                                       'placeholder="Input Here.." value="'+value['after_data'][a].feed_throat+'" >'+
                                                '</td>'+
                                                '<td>'+
                                                    '<label  id="lbl_before_tol_Feed_Throat" class="control-label">± '+(value['after_data'][a].feed_throat * .10)+'</label>'+
                                               ' </td>'+
                                               ' </tr>'+
                                       ' </tbody>'+
                                    '</table>'+
                                '</td>'+
                                '<td>'+result+'</td>';
                            }
                            else if(parameter_setting=="inj_pack_setting"){
                                var inj_step = JSON.parse(value['after_data'][a].injection_step);
                                var pack_step = JSON.parse(value['after_data'][a].pack_step);
                                var inj_step2 = JSON.parse(value['before_data'][0].injection_step);
                                var pack_step2 = JSON.parse(value['before_data'][0].pack_step);

                                row+='<td> '+'INJECTION/PACK CONDITION SETTING'+'</td>'+
                                '<td> '+ value['after_data'][a].created_at+' </td>'+
                                '<td>'+reason+'</td>'+
                                '<td style="width: 35vw" id="original_condition">'+
                                        '<table class="table table-bordered text-center table-striped" >'+
                                        '<thead>'+
                                                '<tr>'+
                                                ' <th colspan="3">INJECTION/PACK CONDITION SETTING(±10% CONTROL)</th>'+
                                                '</tr>'+
                                                '<tr>'+
                                                '<th scope="col" width="50px">...</th>'+
                                                '<th scope="col" width="300px">±Injection Step'+
                                                '<input readonly id="txt_before_Inj_step" class="col-sm-4  pull-right input_field" type="text" '+
                                            ' placeholder="Input Here.." style="width:60px" value="'+value['before_data'][0].inj_step_mid+'"></th>'+
                                                '<th scope="col" width="300px">±Step'+
                                                '</th>'+
                                                '</tr>'+
                                    ' </thead>'+
                                        '<tbody id="injection_step_tbl_before">';
                                                ctr = 1;
                                                $.each(inj_step2,function(key,value1){
                                                    row+='<tr>'+
                                                    '<td>'+ctr+'</td>'+
                                                    '<td>  '      +
                                                        ' <label  id="lbl_before_Inj_Step1" class="col-sm-4 control-label">'+parseFloat(value1.Inj_Step*.10).toFixed(2)+'</label>'+
                                                            '<input readonly id="txt_before_Inj_Step1" class="col-sm-4   input_field" type="text" '+
                                                            'placeholder="Input Here.." style="width: 60px;" value="'+value1.Inj_Step+'">'+
                                                        ' <label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                                                    '</td>'+
                                                    '<td>' +
                                                            '<label  id="lbl_before_IStep1" class="col-sm-4 control-label">'+parseFloat(value1.IStep*.10).toFixed(2)+'</label>'+
                                                            '<input readonly id="txt_before_IStep1" class="col-sm-4   input_field" type="text" '+
                                                            'placeholder="Input Here.." style="width: 60px;" value="'+value1.IStep+'">'+
                                                            '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm</label>'+
                                                    '</td>'+
                                                ' </tr>';
                                                ctr+=1;
                                                });
                                            
                                    row+='</tbody>'+
                                        '</table>'+
                                
                                        '<table class="table table-bordered text-center table-striped">'+
                                        '<thead>'+
                                        '</thead>'+
                                        '<tbody>'+
                                        ' <tr>'+
                                            '<td colspan="2" class="bold-text">MAX INJECTION PRESSURE</td>'+
                                            
                                            '<td> '+       
                                                    '<label  id="lbl_before_Max_Inj_Pres" class="col-sm-4 control-label">'+parseFloat(value['before_data'][0].max_inj_pressure * .10).toFixed(2)+'</label>'+
                                                ' <input readonly id="txt_before_Max_Inj_Pres" class="col-sm-4   input_field" type="text" '+
                                                'placeholder="Input Here.." style="width: 60px;" value="'+value['before_data'][0].max_inj_pressure+'">'+
                                                    '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>'+
                                            '</td>'+
                                        ' </tr>'+
                                            '<tr>'+
                                            '<td colspan="2" class="bold-text">ACTUAL PRESSURE</td>'+
                                            '<td>' +   
                                                    '<label  id="lbl_before_indent" class="col-sm-4 control-label"></label> '   +
                                                    '<input readonly id="txt_before_Act_Inj_Pres" class="col-sm-4   input_field" type="text" '+
                                                    'placeholder="Input Here.." style="width: 60px;" value="'+value['before_data'][0].actual_pressure+'">'+
                                                    '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>'+
                                            '</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                            '<td colspan="2" class="bold-text">MAX INJECTION TIME</td>'+
                                            
                                            '<td>' +       
                                                    '<label  id="lbl_before_Max_Inj_Time" class="col-sm-4 control-label">'+parseFloat(value['before_data'][0].max_inj_time * .10).toFixed(2)+'</label>'+
                                                ' <input readonly id="txt_before_Max_Inj_Time" class="col-sm-4   input_field" type="text" '+
                                                'placeholder="Input Here.." style="width: 60px;" value="'+value['before_data'][0].max_inj_time+'">'+
                                                    '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">second/s</label>'+
                                            '</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                            '<td colspan="2" class="bold-text">ACTUAL TIME</td>'+
                                            
                                            '<td> '+       
                                                    '<label  id="lbl_before_indent" class="col-sm-4 control-label"></label>'+
                                                    '<input readonly id="txt_before_Act_Time" class="col-sm-4   input_field" type="text" '+
                                                    'placeholder="Input Here.." style="width: 60px;" value="'+value['before_data'][0].actual_time+'">'+
                                                    '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">second/s</label>'+
                                            '</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                            '<td colspan="2" class="bold-text">MAX PACK VELOCITY</td>'+
                                            '<td>' +       
                                                    '<label  id="lbl_before_Max_Pack_Velo" class="col-sm-4 control-label">'+parseFloat(value['before_data'][0].max_pack_velo * .10).toFixed(2)+'</label>'+
                                                    '<input readonly id="txt_before_Max_Pack_Velo" class="col-sm-4   input_field" type="text" '+
                                                    'placeholder="Input Here.." style="width: 60px;" value="'+value['before_data'][0].max_pack_velo+'">'+
                                                ' <label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                                            '</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                                    '<td colspan="3" class="bold-text">INJECTION PACK</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                                '<td colspan="2" class="bold-text">POS TRANS</td>'+
                                                '<td>'+
                                                        '<label  id="lbl_before_POS_Trans" class="col-sm-4 control-label">'+parseFloat(value['before_data'][0].pos_trans * .10).toFixed(2)+'</label>'+
                                                    ' <input readonly id="txt_before_POS_Trans" class="col-sm-4   input_field" type="text" '+
                                                    'placeholder="Input Here.." style="width: 60px;" value="'+value['before_data'][0].pos_trans+'">'+
                                                        '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm</label> '+
                                            ' </td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                '<td scope="col" width="50px">...</td>'+
                                                '<td scope="col" width="300px" class="bold-text">'+
                                                    ' ±Pack Step (kg/cm<sup>2</sup>)'+
                                                        '<input readonly id="txt_before_Pack_step" class="col-sm-4  pull-right input_field" '+
                                                        'type="text" placeholder="Input Here.." style="width:60px" value="'+value['before_data'][0].pack_step_mid+'"></td>'+
                                                        
                                                '<td scope="col" width="300px" class="bold-text">'+
                                                    ' ±Step (sec)'+
                                                        
                                                '</td>'+
                                                '</tr>'+
                                        '</tbody>'+
                                        '</table>'+
                                
                                        '<table class="table table-bordered text-center table-striped">'+
                                        '<thead>'+
                                        ' </thead>'+
                                        '<tbody id="pack_step_tbl_before">';
                                            ctr2 = 1;
                                            $.each(pack_step2,function(key,value2){
                                                row+='<tr  class="tr_pack_step1">'+
                                                '<td>'+ctr2+'</td>'+
                                            ' <td>'        +
                                                    ' <label  id="lbl_before_Pack_Step1" class="col-sm-4 control-label">'+parseFloat(value2.Pack_Step * .10).toFixed(2)+'</label>'+
                                                        '<input readonly id="txt_before_Pack_Step1" class="col-sm-4   input_field" type="text" '+
                                                        'placeholder="Input Here.." style="width: 60px;" value="'+value2.Pack_Step+'">'+
                                                    ' <label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                                            ' </td>'+
                                            ' <td>'+        
                                                        '<label  id="lbl_before_PStep1" class="col-sm-4 control-label">'+parseFloat(value2.PStep * .10).toFixed(2)+'</label>'+
                                                        '<input readonly id="txt_before_PStep1" class="col-sm-4   input_field" type="text" '+
                                                        'placeholder="Input Here.." style="width: 60px;" value="'+value2.PStep+'">'+
                                                        '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm</label>'+
                                            ' </td>'+
                                            '  </tr>';
                                            ctr2+=1;
                                            });
                                    row+='</tbody>'+
                                        '</table>'+
                                '</td>'+
                                '<td style="width: 35vw" id="adjusted_condition">'+
                                        '<table class="table table-bordered text-center table-striped" >'+
                                        '<thead>'+
                                                '<tr>'+
                                                   ' <th colspan="3">INJECTION/PACK CONDITION SETTING(±10% CONTROL)</th>'+
                                                '</tr>'+
                                                '<tr>'+
                                                '<th scope="col" width="50px">...</th>'+
                                                '<th scope="col" width="300px">±Injection Step'+
                                                '<input readonly id="txt_before_Inj_step" class="col-sm-4  pull-right input_field" type="text" '+
                                               ' placeholder="Input Here.." style="width:60px" value="'+value['after_data'][a].inj_step_mid+'"></th>'+
                                                '<th scope="col" width="300px">±Step'+
                                                '</th>'+
                                                '</tr>'+
                                       ' </thead>'+
                                        '<tbody id="injection_step_tbl_before">';
                                                ctr = 1;
                                                $.each(inj_step,function(key,value1){
                                                    row+='<tr>'+
                                                    '<td>'+ctr+'</td>'+
                                                    '<td>  '      +
                                                           ' <label  id="lbl_before_Inj_Step1" class="col-sm-4 control-label">'+parseFloat(value1.Inj_Step*.10).toFixed(2)+'</label>'+
                                                            '<input readonly id="txt_before_Inj_Step1" class="col-sm-4   input_field" type="text" '+
                                                            'placeholder="Input Here.." style="width: 60px;" value="'+value1.Inj_Step+'">'+
                                                           ' <label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                                                    '</td>'+
                                                    '<td>' +
                                                            '<label  id="lbl_before_IStep1" class="col-sm-4 control-label">'+parseFloat(value1.IStep*.10).toFixed(2)+'</label>'+
                                                            '<input readonly id="txt_before_IStep1" class="col-sm-4   input_field" type="text" '+
                                                            'placeholder="Input Here.." style="width: 60px;" value="'+value1.IStep+'">'+
                                                            '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm</label>'+
                                                    '</td>'+
                                                   ' </tr>';
                                                   ctr+=1;
                                                });
                                               
                                    row+='</tbody>'+
                                        '</table>'+
                                
                                        '<table class="table table-bordered text-center table-striped">'+
                                        '<thead>'+
                                        '</thead>'+
                                        '<tbody>'+
                                           ' <tr>'+
                                            '<td colspan="2" class="bold-text">MAX INJECTION PRESSURE</td>'+
                                            
                                            '<td> '+       
                                                    '<label  id="lbl_before_Max_Inj_Pres" class="col-sm-4 control-label">'+parseFloat(value['after_data'][a].max_inj_pressure * .10).toFixed(2)+'</label>'+
                                                   ' <input readonly id="txt_before_Max_Inj_Pres" class="col-sm-4   input_field" type="text" '+
                                                   'placeholder="Input Here.." style="width: 60px;" value="'+value['after_data'][a].max_inj_pressure+'">'+
                                                    '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>'+
                                            '</td>'+
                                           ' </tr>'+
                                            '<tr>'+
                                            '<td colspan="2" class="bold-text">ACTUAL PRESSURE</td>'+
                                            '<td>' +   
                                                    '<label  id="lbl_before_indent" class="col-sm-4 control-label"></label> '   +
                                                    '<input readonly id="txt_before_Act_Inj_Pres" class="col-sm-4   input_field" type="text" '+
                                                    'placeholder="Input Here.." style="width: 60px;" value="'+value['after_data'][a].actual_pressure+'">'+
                                                    '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>'+
                                            '</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                            '<td colspan="2" class="bold-text">MAX INJECTION TIME</td>'+
                                            
                                            '<td>' +       
                                                    '<label  id="lbl_before_Max_Inj_Time" class="col-sm-4 control-label">'+parseFloat(value['after_data'][a].max_inj_time * .10).toFixed(2)+'</label>'+
                                                   ' <input readonly id="txt_before_Max_Inj_Time" class="col-sm-4   input_field" type="text" '+
                                                   'placeholder="Input Here.." style="width: 60px;" value="'+value['after_data'][a].max_inj_time+'">'+
                                                    '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">second/s</label>'+
                                            '</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                            '<td colspan="2" class="bold-text">ACTUAL TIME</td>'+
                                            
                                            '<td> '+       
                                                    '<label  id="lbl_before_indent" class="col-sm-4 control-label"></label>'+
                                                    '<input readonly id="txt_before_Act_Time" class="col-sm-4   input_field" type="text" '+
                                                    'placeholder="Input Here.." style="width: 60px;" value="'+value['after_data'][a].actual_time+'">'+
                                                    '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">second/s</label>'+
                                            '</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                            '<td colspan="2" class="bold-text">MAX PACK VELOCITY</td>'+
                                            '<td>' +       
                                                    '<label  id="lbl_before_Max_Pack_Velo" class="col-sm-4 control-label">'+parseFloat(value['after_data'][a].max_pack_velo * .10).toFixed(2)+'</label>'+
                                                    '<input readonly id="txt_before_Max_Pack_Velo" class="col-sm-4   input_field" type="text" '+
                                                    'placeholder="Input Here.." style="width: 60px;" value="'+value['after_data'][a].max_pack_velo+'">'+
                                                   ' <label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                                            '</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                                    '<td colspan="3" class="bold-text">INJECTION PACK</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                                '<td colspan="2" class="bold-text">POS TRANS</td>'+
                                                '<td>'+
                                                        '<label  id="lbl_before_POS_Trans" class="col-sm-4 control-label">'+parseFloat(value['after_data'][a].pos_trans * .10).toFixed(2)+'</label>'+
                                                       ' <input readonly id="txt_before_POS_Trans" class="col-sm-4   input_field" type="text" '+
                                                       'placeholder="Input Here.." style="width: 60px;" value="'+value['after_data'][a].pos_trans+'">'+
                                                        '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm</label> '+
                                               ' </td>'+
                                                '</tr>'+
                                                '<tr>'+
                                                '<td scope="col" width="50px">...</td>'+
                                                '<td scope="col" width="300px" class="bold-text">'+
                                                       ' ±Pack Step (kg/cm<sup>2</sup>)'+
                                                        '<input readonly id="txt_before_Pack_step" class="col-sm-4  pull-right input_field" '+
                                                        'type="text" placeholder="Input Here.." style="width:60px" value="'+value['after_data'][a].pack_step_mid+'"></td>'+
                                                        
                                                '<td scope="col" width="300px" class="bold-text">'+
                                                       ' ±Step (sec)'+
                                                        
                                                '</td>'+
                                                '</tr>'+
                                        '</tbody>'+
                                        '</table>'+
                                
                                        '<table class="table table-bordered text-center table-striped">'+
                                        '<thead>'+
                                        ' </thead>'+
                                        '<tbody id="pack_step_tbl_before">';
                                            ctr2 = 1;
                                            $.each(pack_step,function(key,value2){
                                                row+='<tr  class="tr_pack_step1">'+
                                                '<td>'+ctr2+'</td>'+
                                               ' <td>'        +
                                                       ' <label  id="lbl_before_Pack_Step1" class="col-sm-4 control-label">'+parseFloat(value2.Pack_Step * .10).toFixed(2)+'</label>'+
                                                        '<input readonly id="txt_before_Pack_Step1" class="col-sm-4   input_field" type="text" '+
                                                        'placeholder="Input Here.." style="width: 60px;" value="'+value2.Pack_Step+'">'+
                                                       ' <label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                                               ' </td>'+
                                               ' <td>'+        
                                                        '<label  id="lbl_before_PStep1" class="col-sm-4 control-label">'+parseFloat(value2.PStep * .10).toFixed(2)+'</label>'+
                                                        '<input readonly id="txt_before_PStep1" class="col-sm-4   input_field" type="text" '+
                                                        'placeholder="Input Here.." style="width: 60px;" value="'+value2.PStep+'">'+
                                                        '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm</label>'+
                                               ' </td>'+
                                              '  </tr>';
                                              ctr2+=1;
                                            });
                                       row+='</tbody>'+
                                        '</table>'+
                                '</td>'+
                                '<td>'+result+'</td>';
                            }
                            else if(parameter_setting=='measuring_condition_setting'){

                                var extruder1 = JSON.parse(value['after_data'][a].extruder_json);
                                var extruder2 = JSON.parse(value['before_data'][0].extruder_json);

                                row+='<td> '+'MEASURING CONDITION SETTING'+'</td>'+
                                    '<td> '+ value['after_data'][a].created_at+' </td>'+
                                    '<td>'+reason+'</td>'+'<td style="width: 35vw" id="original_condition">'+
                                                    ' <table class="table table-bordered text-center table-striped bold-text" >'+
                                                    '<thead>'+
                                                        '<tr>'+
                                                            '<td colspan="5">MEASURING CONDITION SCREEN(±10% CONTROL)</td>'+
                                                        '</tr>'+
                                                    ' <tr>'+
                                                            '<td colspan="5">EXTRUDER SETTING</td>'+
                                                        '</tr>'+
                                                        '<tr>'+
                                                            '<th scope="col" width="20px">...</th>'+
                                                            '<th scope="col" width="200px">EXTRUDER</th>'+
                                                            '<th scope="col" width="100px">ON</th>'+
                                                            '<th scope="col" width="100px">'+
                                                                    '<input readonly id="txt_before_Extruder" class="col-sm-4  pull-right input_field" type="text" '+
                                                                    'placeholder="Input Here.." style="width:100px" value="'+value['before_data'][0].extruder_on+'">'+
                                                                '</th>'+
                                                            '<th scope="col" width="200px">'+
                                                                    'STEP'+
                                                                
                                                        ' </th>'+
                                                        '</tr>'+
                                                    '</thead>'+
                                                    '<tbody id="extruder_tbl_before">';
                                                            ctr3 = 1;
                                                            $.each(extruder2, function(key,value3){
                                                                row+=' <tr class="tr_extruder1">'+
                                                                ' <td>'+ctr3+'</td>'+
                                                                '<td>'+
                                                                        '<label id="lbl_before_Ext_kg1" class="col-sm-4 control-label">±'+parseFloat(value3.kg*.10).toFixed(2)+'</label>'+
                                                                        ' <input type="text" readonly id="txt_before_Ext_kg1" placeholder="Input Here.." '+
                                                                        'class=" col-sm-4 input_field" value="'+value3.kg+'">'+
                                                                        '<label id="lbl_before_static" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>'+
                                                            '  </td>'+
                                                                '<td colspan="2">'+
                                                                        ' <label id="lbl_before_Ext_rpm1" class="col-sm-4 control-label">±'+parseFloat(value3.rpm*.10).toFixed(2)+'</label>'+
                                                                        '<input type="text" readonly id="txt_before_Ext_rpm1" placeholder="Input Here.." '+
                                                                        'class=" col-sm-4 input_field" value="'+value3.rpm+'">'+
                                                                        '<label id="lbl_before_static" class="col-sm-4 control-label">rpm</label>'+
                                                                ' </td>'+
                                                                '<td>'+
                                                                        ' <label id="lbl_before_Ext_mm1" class="col-sm-4 control-label">±'+parseFloat(value3.mm*.10).toFixed(2)+'</label>'+
                                                                        ' <input type="text" readonly id="txt_before_Ext_mm1" placeholder="Input Here.." '+
                                                                        'class=" col-sm-4 input_field" value="'+value3.mm+'">'+
                                                                        '<label id="lbl_before_static" class="col-sm-4 control-label">mm</label>'+
                                                                '</td>'+
                                                        '</tr>';
                                                                ctr3+=1;
                                                            })
                                                        
                                                row+= '</tbody>'+
                                            ' </table>'+
                                                '<table class="table table-bordered text-center table-striped">'+
                                                            '<tbody>'+
                                                            ' <tr>'+
                                                                        '<td colspan="3" class="bold-text">M-CUSHION</td>'+
                                                                        '<td colspan="2">'+
                                                                            ' <label id="lbl_before_mcushion" class="col-sm-4 control-label">±'+
                                                                            parseFloat(value['before_data'][0].m_cushion*.10).toFixed(2)+'</label>'+
                                                                            ' <input type="text" readonly id="txt_before_Mcushion" placeholder="Input Here.." '+
                                                                            'class=" col-sm-4 input_field" value="'+value['before_data'][0].m_cushion+'">'+
                                                                                '<label id="lbl_before_static" class="col-sm-4 control-label">mm</label>'+
                                                                        '</td>'+
                                                                '</tr>'+
                                                            '  <tr>'+
                                                                    ' <td colspan="3" class="bold-text">SHOT SIZE</td>'+
                                                                        '<td colspan="2">'+
                                                                                '<label id="lbl_before_shot_size" class="col-sm-4 control-label">±'+
                                                                                parseFloat(value['before_data'][0].shot_size*.10).toFixed(2)+'</label>'+
                                                                                '<input type="text" readonly id="txt_before_Shot_Size" placeholder="Input Here.." '+
                                                                                'class=" col-sm-4 input_field" value="'+value['before_data'][0].shot_size+'">'+
                                                                                '<label id="lbl_before_static" class="col-sm-4 control-label">mm</label>'+
                                                                    ' </td>'+
                                                                '</tr>'+
                                                            ' <tr>'+
                                                                        '<td colspan="3" class="bold-text">DCMP DIST</td>'+
                                                                        '<td colspan="2">'+
                                                                                '<label id="lbl_before_Dcmp_Dist" class="col-sm-4 control-label">±'+
                                                                                parseFloat(value['before_data'][0].dcmp_dist*.10).toFixed(2)+'</label>'+
                                                                                '<input type="text" readonly id="txt_before_Dcmp_Dist" placeholder="Input Here.." '+
                                                                                'class=" col-sm-4 input_field" value="'+value['before_data'][0].dcmp_dist+'">'+
                                                                            ' <label id="lbl_before_static" class="col-sm-4 control-label">mm</label>'+
                                                                        '</td>'+
                                                                '</tr>'+
                                                            ' <tr>'+
                                                                        '<td colspan="3" class="bold-text">DCMP VEL</td>'+
                                                                        '<td colspan="2">'+
                                                                                '<label id="lbl_before_Dcmp_Vel" class="col-sm-4 control-label">±'+
                                                                                parseFloat(value['before_data'][0].dcmp_vel*.10).toFixed(2)+'</label>'+
                                                                                '<input type="text" readonly id="txt_before_Dcmp_Vel" placeholder="Input Here.." '+
                                                                                'class=" col-sm-4 input_field" value="'+value['before_data'][0].dcmp_vel+'">'+
                                                                            ' <label id="lbl_before_static" class="col-sm-4 control-label">mm/s</label>'+
                                                                        '</td>'+
                                                                '</tr>'+
                                                            ' <tr>'+
                                                                        '<td colspan="3" class="bold-text">COOL TIME</td>'+
                                                                    ' <td colspan="2">'+
                                                                            ' <label id="lbl_before_Cool_Time" class="col-sm-4 control-label">±'+
                                                                            parseFloat(value['before_data'][0].cool_time*.10).toFixed(2)+'</label>'+
                                                                            ' <input type="text" readonly id="txt_before_Cool_Time" placeholder="Input Here.." '+
                                                                            'class=" col-sm-4 input_field" value="'+value['before_data'][0].cool_time+'">'+
                                                                            ' <label id="lbl_before_static" class="col-sm-4 control-label">mm/s</label>'+
                                                                        '</td>'+
                                                                '</tr>'+
                                                    ' </tbody>'+
                                            ' </table>'+
                                    '</td>'+
                                    '<td style="width: 35vw" id="adjusted_condition">'+
                                               ' <table class="table table-bordered text-center table-striped bold-text" >'+
                                                '<thead>'+
                                                    '<tr>'+
                                                        '<td colspan="5">MEASURING CONDITION SCREEN(±10% CONTROL)</td>'+
                                                    '</tr>'+
                                                   ' <tr>'+
                                                        '<td colspan="5">EXTRUDER SETTING</td>'+
                                                    '</tr>'+
                                                    '<tr>'+
                                                        '<th scope="col" width="20px">...</th>'+
                                                        '<th scope="col" width="200px">EXTRUDER</th>'+
                                                        '<th scope="col" width="100px">ON</th>'+
                                                        '<th scope="col" width="100px">'+
                                                                '<input readonly id="txt_before_Extruder" class="col-sm-4  pull-right input_field" type="text" '+
                                                                'placeholder="Input Here.." style="width:100px" value="'+value['after_data'][a].extruder_on+'">'+
                                                            '</th>'+
                                                        '<th scope="col" width="200px">'+
                                                                'STEP'+
                                                               
                                                       ' </th>'+
                                                    '</tr>'+
                                                '</thead>'+
                                                '<tbody id="extruder_tbl_before">';
                                                        ctr3 = 1;
                                                        $.each(extruder1, function(key,value3){
                                                            row+=' <tr class="tr_extruder1">'+
                                                            ' <td>'+ctr3+'</td>'+
                                                             '<td>'+
                                                                     '<label id="lbl_before_Ext_kg1" class="col-sm-4 control-label">±'+parseFloat(value3.kg*.10).toFixed(2)+'</label>'+
                                                                    ' <input type="text" readonly id="txt_before_Ext_kg1" placeholder="Input Here.." '+
                                                                    'class=" col-sm-4 input_field" value="'+value3.kg+'">'+
                                                                     '<label id="lbl_before_static" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>'+
                                                           '  </td>'+
                                                             '<td colspan="2">'+
                                                                    ' <label id="lbl_before_Ext_rpm1" class="col-sm-4 control-label">±'+parseFloat(value3.rpm*.10).toFixed(2)+'</label>'+
                                                                     '<input type="text" readonly id="txt_before_Ext_rpm1" placeholder="Input Here.." '+
                                                                     'class=" col-sm-4 input_field" value="'+value3.rpm+'">'+
                                                                     '<label id="lbl_before_static" class="col-sm-4 control-label">rpm</label>'+
                                                            ' </td>'+
                                                             '<td>'+
                                                                    ' <label id="lbl_before_Ext_mm1" class="col-sm-4 control-label">±'+parseFloat(value3.mm*.10).toFixed(2)+'</label>'+
                                                                    ' <input type="text" readonly id="txt_before_Ext_mm1" placeholder="Input Here.." '+
                                                                    'class=" col-sm-4 input_field" value="'+value3.mm+'">'+
                                                                     '<label id="lbl_before_static" class="col-sm-4 control-label">mm</label>'+
                                                             '</td>'+
                                                     '</tr>';
                                                            ctr3+=1;
                                                        })
                                                      
                                               row+= '</tbody>'+
                                           ' </table>'+
                                            '<table class="table table-bordered text-center table-striped">'+
                                                        '<tbody>'+
                                                           ' <tr>'+
                                                                    '<td colspan="3" class="bold-text">M-CUSHION</td>'+
                                                                    '<td colspan="2">'+
                                                                           ' <label id="lbl_before_mcushion" class="col-sm-4 control-label">±'+
                                                                           parseFloat(value['after_data'][a].m_cushion*.10).toFixed(2)+'</label>'+
                                                                           ' <input type="text" readonly id="txt_before_Mcushion" placeholder="Input Here.." '+
                                                                           'class=" col-sm-4 input_field" value="'+value['after_data'][a].m_cushion+'">'+
                                                                            '<label id="lbl_before_static" class="col-sm-4 control-label">mm</label>'+
                                                                    '</td>'+
                                                            '</tr>'+
                                                          '  <tr>'+
                                                                   ' <td colspan="3" class="bold-text">SHOT SIZE</td>'+
                                                                    '<td colspan="2">'+
                                                                            '<label id="lbl_before_shot_size" class="col-sm-4 control-label">±'+
                                                                            parseFloat(value['after_data'][a].shot_size*.10).toFixed(2)+'</label>'+
                                                                            '<input type="text" readonly id="txt_before_Shot_Size" placeholder="Input Here.." '+
                                                                            'class=" col-sm-4 input_field" value="'+value['after_data'][a].shot_size+'">'+
                                                                            '<label id="lbl_before_static" class="col-sm-4 control-label">mm</label>'+
                                                                   ' </td>'+
                                                            '</tr>'+
                                                           ' <tr>'+
                                                                    '<td colspan="3" class="bold-text">DCMP DIST</td>'+
                                                                    '<td colspan="2">'+
                                                                            '<label id="lbl_before_Dcmp_Dist" class="col-sm-4 control-label">±'+
                                                                            parseFloat(value['after_data'][a].dcmp_dist*.10).toFixed(2)+'</label>'+
                                                                            '<input type="text" readonly id="txt_before_Dcmp_Dist" placeholder="Input Here.." '+
                                                                            'class=" col-sm-4 input_field" value="'+value['after_data'][a].dcmp_dist+'">'+
                                                                           ' <label id="lbl_before_static" class="col-sm-4 control-label">mm</label>'+
                                                                    '</td>'+
                                                            '</tr>'+
                                                           ' <tr>'+
                                                                    '<td colspan="3" class="bold-text">DCMP VEL</td>'+
                                                                    '<td colspan="2">'+
                                                                            '<label id="lbl_before_Dcmp_Vel" class="col-sm-4 control-label">±'+
                                                                            parseFloat(value['after_data'][a].dcmp_vel*.10).toFixed(2)+'</label>'+
                                                                            '<input type="text" readonly id="txt_before_Dcmp_Vel" placeholder="Input Here.." '+
                                                                            'class=" col-sm-4 input_field" value="'+value['after_data'][a].dcmp_vel+'">'+
                                                                           ' <label id="lbl_before_static" class="col-sm-4 control-label">mm/s</label>'+
                                                                    '</td>'+
                                                            '</tr>'+
                                                           ' <tr>'+
                                                                    '<td colspan="3" class="bold-text">COOL TIME</td>'+
                                                                   ' <td colspan="2">'+
                                                                           ' <label id="lbl_before_Cool_Time" class="col-sm-4 control-label">±'+
                                                                           parseFloat(value['after_data'][a].cool_time*.10).toFixed(2)+'</label>'+
                                                                           ' <input type="text" readonly id="txt_before_Cool_Time" placeholder="Input Here.." '+
                                                                           'class=" col-sm-4 input_field" value="'+value['after_data'][a].cool_time+'">'+
                                                                           ' <label id="lbl_before_static" class="col-sm-4 control-label">mm/s</label>'+
                                                                    '</td>'+
                                                            '</tr>'+
                                                   ' </tbody>'+
                                           ' </table>'+
                                    '</td>'+
                                    '<td>'+result+'</td>';
                            }

                            row+='</tr>'
                        }
                    
                    })
                }
                

                    $('table #adj_tbl').html(row);

                },
                error: function(data){

                },
                complete: function(data){
                    $("#wait").css("display", "none");
                }
            });
        }
    }
    return this_data;
})();



