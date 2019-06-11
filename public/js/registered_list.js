$(document).ready(function(){
    //UserMgmt.loadtable();
    $('.select2').select2({width: '150px'});
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


  
   /*  DB_CONNECTION=pgsql
DB_HOST=10.164.30.175
DB_PORT=5432
DB_DATABASE=mmsr_db
DB_USERNAME=postgres
DB_PASSWORD=PressUser@345 */

// composer remove barryvdh/laravel-dompdf
// composer require barryvdh/laravel-dompdf

    // Reg_List.loadtable();
    
    $('.modal_alarm').on('hidden.bs.modal', function () {
        $('.modal_view_data').focus();
    });

    $('.modal_alarm').on('shown.bs.modal', function () {
        $('#txt_username').focus();
    });

    $('.modal_view_data').on('hidden.bs.modal', function () {
        arr_mct_setting = [];
        arr_clamp_eject = [];
        arr_cylinder_temp = [];
        arr_inj_pack = [];
        arr_measuring_condition = [];
        arr_param_with_change = [];
    });

    $('#btn_clear_search').click(function(){
        $('#slc_part_no').val('');
        $('#slc_mold_no').val('');
        $('#slc_machine_no').val('');
        $('#slc_part_no').select2().trigger('change');
        $('#slc_mold_no').select2().trigger('change');
        $('#slc_machine_no').select2().trigger('change');
        Reg_List.loadtable('destroy');
    });

    $('#slc_reason_of_change').on('select2:select', function (e) {
        if($('#slc_reason_of_change').val()=="others")
        {
            $('.modal_reason').modal('show');
        }
    });
   
});

function EnterEvent(e) {
    if (e.keyCode == 13) {
        Alarm.CheckPICPassword();
    }
}

var arr_mct_setting = [];
var arr_clamp_eject = [];
var arr_cylinder_temp = [];
var arr_inj_pack = [];
var arr_measuring_condition = [];
var arr_param_with_change = [];

var Reg_List = (function(){
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
            "scrollY":"53vh",
            "language": 
            {          
            "processing": " <div style='background:white'><i class='fa fa-refresh fa-spin'></i><br><b>Please wait for a moment..</b></div>",
            },
            "ajax": {
                url:"reglist/datatable",
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
    
    this_data.ViewData = function(id,machine_id,ctrlno,rev_no,mold_no,draw_no,draw_name,machine_code)
    {
        $('.table td#original_condition .input_field').attr('readonly', true);
        $('.table td#adjusted_condition .input_field').attr('readonly', true);
        Reg_List.LoadSelectedid(id);
        $('.modal_view_data').attr('data-id',id);
        $('.modal_view_data').attr('data-machine',machine_id);
        Reg_List.With_or_Without_Change();
        $('.modal_view_data').modal('show');

        ctrlno = (ctrlno!='null') ? ctrlno :'N/A';
        rev_no = (rev_no!='null') ? rev_no :'N/A';
        mold_no = (mold_no!='null') ? mold_no :'N/A';
        machine_id = (machine_id!='null') ? machine_id :'N/A';
        draw_no = (draw_no!='null') ? draw_no :'N/A';
        draw_name = (draw_name!='null') ? draw_name :'N/A';
        $('#lbl_ctrl').val(ctrlno);
        $('#txt_rev_no').val(rev_no);
        $('#lbl_mold').val(mold_no);
        $('#lbl_machine').val(machine_code);
        $('#txt_drawing_no').val(draw_no);
        $('#lbl_draw_name').val(draw_name);

    }

    this_data.Change_Parameter= function(){
        var parameter_change = $('#slc_parameter_setting').val();
        
        $.ajax({
            url:"reglist/change_parameter",
            type:"POST",
            data: {
                'param': parameter_change
            },
            success:function(data){
                // //console.log('drp by change param-->'+parameter_change);
                // Reg_List.Check_if_has_change();
                
                
               $('#original_condition').html(data);
               $('#adjusted_condition').html(data);
               $('.table td#original_condition .input_field').attr('readonly', true);
               var id = $('.modal_view_data').attr('data-id');
               
               if(window.location.pathname=="/MMSR/public/draft"){
                    Draft.loadSelectedDraft(id);
                }
                else{
                    Reg_List.LoadSelectedid(id);

                }
               /* //console.log('-mct:-'+JSON.stringify(arr_mct_setting)+'-clamp:-'+JSON.stringify(arr_clamp_eject)+'-cylinder:-'+
                JSON.stringify(arr_cylinder_temp)+'-inj:-'+JSON.stringify(arr_inj_pack)+'-mea-'+JSON.stringify(arr_measuring_condition)); */
            },
            error: function (data) {
                //console.log(data);
            },
            complete: function(data){
                
            }
        })
    }

    this_data.LoadSelectedid = function(id)
    {
        var parameter_change = $('#slc_parameter_setting').val();
        $("#wait").css("display", "block");
        $.ajax({
            url:"reglist/loadselected",
            type:"POST",
            data: {
                'param': parameter_change,
                'id':id
            },
            success:function(data){
                var base_orig = '.table td#original_condition';
                //console.log(data);
                var x = 0;
                for(x=0;x<2;x++)
                {
                    if(parameter_change=="mct_setting")
                    {
                        
                        $(base_orig+" #txt_die_temp_core").val(data.die_temp_core);
                        $(base_orig+" #txt_die_temp_cavity").val(data.die_temp_cavity);
                        $(base_orig+" #txt_mold_temp_ctrl").val(data.mold_temp_control);
                        $(base_orig+" #txt_machine_cycle_time").val(data.machine_cycle_time);
                        $(base_orig+" #txt_sprue_weight").val(data.sprue_weight);
                        $(base_orig+" #txt_sub_part_weight").val(data.sub_part_weight);
                        $(base_orig+" #txt_additional_cycle_time").val(data.additional_cycle_time);
                        // $(base_orig+" #txt_product_weight1").val(data.mold_temp_control);

                        var prod_weight = JSON.parse(data.product_weight);
                        $(base_orig+' #prod_weight').html('');
                        var count=1;

                        $.each(prod_weight,function(key,value){
                          
                            var add_input = '<tr class="tr_pweight'+count+'">'+
                                        '<td>'+
                                        '<input type="text" class="form-control input_field txt_warn" onchange="Alarm.CheckInput(this.id);"'+
                                        ' id="txt_product_weight'+count+'" placeholder="Input Product Weight" readonly onkeyup = "'+
                                        "Reg_List.CheckTolerance(this.id)"+'">'+
                                        '</td>'+
                                        "</tr>";
    
                            $(base_orig+' #prod_weight').append(add_input);
                            $(base_orig+' #btn_add_weight').attr('data-count',count);
                            $(base_orig+' #txt_product_weight'+count).val(value.x)
                            
                        count+=1;
                        });


                    }
                    else  if(parameter_change=="clamp_eject_setting")
                    {
                        $(base_orig+" #txt_OLFO_POS").val(data.open_limit_POS);
                        $(base_orig+" #txt_OLFO_VEL").val(data.open_limit_VEL);
                        $(base_orig+" #txt_CS1_POS").val(data.close_sw_POS);
                        $(base_orig+" #txt_CS1_VEL").val(data.close_sw_VEL);
                        $(base_orig+" #txt_CSMP_POS").val(data.close_slow_POS);
                        $(base_orig+" #txt_CSMP_VEL").val(data.close_slow_VEL);
                        $(base_orig+" #txt_CST_POS").val(data.close_sp_POS);
                        $(base_orig+" #txt_MPPT_POS").val(data.mold_prtct_POS);
                        $(base_orig+" #txt_BB_VEL").val(data.breakaway_VEL);
                        $(base_orig+" #txt_O1_POS").val(data.open1_POS);
                        $(base_orig+" #txt_O1_VEL").val(data.open1_VEL);
                        $(base_orig+" #txt_O2_POS").val(data.open2_POS);
                        $(base_orig+" #txt_O2_VEL").val(data.open2_VEL);
                        $(base_orig+" #txt_FOFO_POS").val(data.full_open_POS);
                        $(base_orig+" #txt_ESES_POS").val(data.eject_start_POS);
                        $(base_orig+" #txt_Pulses").val(data.pulses);
                        $(base_orig+" #txt_FWD_POS").val(data.FWD_POS);
                        $(base_orig+" #txt_FWD_VEL").val(data.FWD_VEL);
                        $(base_orig+" #txt_FWD_DWELL").val(data.FWD_DWELL);
                        $(base_orig+" #txt_ADV_POS").val(data.ADV_POS);
                        $(base_orig+" #txt_ADV_VEL").val(data.ADV_VEL);
                        $(base_orig+" #txt_ADV_DWELL").val(data.ADV_DWELL);
                        $(base_orig+" #txt_REV_POS").val(data.REV_POS);
                        $(base_orig+" #txt_REV_VEL").val(data.REV_VEL);
                        $(base_orig+" #txt_REV_DWELL").val(data.REV_DWELL);
                        $(base_orig+" #txt_Ejector_Delay").val(data.ejector_delay);
                        $(base_orig+" #txt_Die_Height").val(data.auto_die_height);

                        Reg_List.Percentage_pn_on_load('txt_OLFO_POS','lbl_neg_OLFO_POS','lbl_pos_OLFO_POS');
                        Reg_List.Percentage_pn_on_load('txt_OLFO_VEL','lbl_neg_OLFO_VEL','lbl_pos_OLFO_VEL');
                        Reg_List.Percentage_pn_on_load('txt_CS1_POS','lbl_neg_CS1_POS','lbl_pos_CS1_POS');
                        Reg_List.Percentage_pn_on_load('txt_CS1_VEL','lbl_neg_CS1_VEL','lbl_pos_CS1_VEL');
                        Reg_List.Percentage_pn_on_load('txt_CSMP_POS','lbl_neg_CSMP_POS','lbl_pos_CSMP_POS');
                        Reg_List.Percentage_pn_on_load('txt_CSMP_VEL','lbl_neg_CSMP_VEL','lbl_pos_CSMP_VEL');
                        Reg_List.Percentage_pn_on_load('txt_CST_POS','lbl_neg_CST_POS','lbl_pos_CST_POS');
                        Reg_List.Percentage_pn_on_load('txt_MPPT_POS','lbl_neg_MPPT_POS','lbl_pos_MPPT_POS');
                        Reg_List.Percentage_pn_on_load('txt_BB_VEL','lbl_neg_BB_VEL','lbl_pos_BB_VEL');
                        Reg_List.Percentage_pn_on_load('txt_O1_POS','lbl_neg_O1_POS','lbl_pos_O1_POS');
                        Reg_List.Percentage_pn_on_load('txt_O1_VEL','lbl_neg_O1_VEL','lbl_pos_O1_VEL');
                        Reg_List.Percentage_pn_on_load('txt_O2_POS','lbl_neg_O2_POS','lbl_pos_O2_POS');
                        Reg_List.Percentage_pn_on_load('txt_O2_VEL','lbl_neg_O2_VEL','lbl_pos_O2_VEL');
                        Reg_List.Percentage_pn_on_load('txt_FOFO_POS','lbl_neg_FOFO_POS','lbl_pos_FOFO_POS');
                        Reg_List.Percentage_pn_on_load('txt_ESES_POS','lbl_neg_ESES_POS','lbl_pos_ESES_POS');
                        Reg_List.Percentage_pn_on_load('txt_FWD_POS','lbl_neg_FWD_POS','lbl_pos_FWD_POS');
                        Reg_List.Percentage_pn_on_load('txt_FWD_VEL','lbl_neg_FWD_VEL','lbl_pos_FWD_VEL');
                        Reg_List.Percentage_pn_on_load('txt_FWD_DWELL','lbl_neg_FWD_DWELL','lbl_pos_FWD_DWELL');
                        Reg_List.Percentage_pn_on_load('txt_ADV_POS','lbl_neg_ADV_POS','lbl_pos_ADV_POS');
                        Reg_List.Percentage_pn_on_load('txt_ADV_VEL','lbl_neg_ADV_VEL','lbl_pos_ADV_VEL');
                        Reg_List.Percentage_pn_on_load('txt_ADV_DWELL','lbl_neg_ADV_DWELL','lbl_pos_ADV_DWELL');
                        Reg_List.Percentage_pn_on_load('txt_REV_POS','lbl_neg_REV_POS','lbl_pos_REV_POS');
                        Reg_List.Percentage_pn_on_load('txt_REV_VEL','lbl_neg_REV_VEL','lbl_pos_REV_VEL');
                        Reg_List.Percentage_pn_on_load('txt_REV_DWELL','lbl_neg_REV_DWELL','lbl_pos_REV_DWELL');


                    }
                    else  if(parameter_change=="cylinder_temp_setting")
                    {
                        $(base_orig+" #txt_Nozzle").val(data.nozzle);
                        $(base_orig+" #txt_Barrel1").val(data.barrel1);
                        $(base_orig+" #txt_Barrel2").val(data.barrel2);
                        $(base_orig+" #txt_Barrel3").val(data.barrel3);
                        $(base_orig+" #txt_Feed_Throat").val(data.feed_throat);

                        Reg_List.Percentage_pn_on_load('txt_Nozzle','lbl_neg_Nozzle','lbl_pos_Nozzle','lbl_tol_Nozzle');
                        Reg_List.Percentage_pn_on_load('txt_Barrel1','lbl_neg_Barrel1','lbl_pos_Barrel1','lbl_tol_Barrel1');
                        Reg_List.Percentage_pn_on_load('txt_Barrel2','lbl_neg_Barrel2','lbl_pos_Barrel2','lbl_tol_Barrel2');
                        Reg_List.Percentage_pn_on_load('txt_Barrel3','lbl_neg_Barrel3','lbl_pos_Barrel3','lbl_tol_Barrel3');
                        Reg_List.Percentage_pn_on_load('txt_Feed_Throat','lbl_neg_Feed_Throat','lbl_pos_Feed_Throat','lbl_tol_Feed_Throat');
                    }
                    else  if(parameter_change=="inj_pack_setting")
                    {
                        
                        var inj_pack = JSON.parse(data.injection_step);
                        // var inj_pack_length = Object.keys(inj_pack).length;
                        //alert(data.injection_step);
                        $(base_orig+' #injection_step_tbl').html('');
                    
                        var count=1;
                        $.each(inj_pack,function(key,value){
                            var add_input = '<tr class="tr_inj_pack'+count+'">'+
                            '<td>'+count+'</td>'+
                            '<td>'+
                            '<label id="lbl_Inj_Step'+count+'" class="col-sm-4 control-label">0</label>'+
                            '<input id="txt_Inj_Step'+count+'" class="col-sm-4  form-control input_field txt_warn" type="text" placeholder="Input Here.." style="width: 60px;"'+
                            ' readonly value="'+value.Inj_Step+'" onkeyup="'+
                            "Reg_List.Percentage_pn('txt_Inj_Step"+count+"','','','lbl_Inj_Step"+count+"')"+'">'+
                            '<label id="lbl_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                            '</td>'+
                            '<td>'+
                            '<label id="lbl_IStep'+count+'" class="col-sm-4 control-label">0</label>'+
                            '<input id="txt_IStep'+count+'" class="col-sm-4  form-control input_field txt_warn" type="text" placeholder="Input Here.." style="width: 60px;"'+
                            '" readonly value="'+value.IStep+'" onkeyup="'+
                            "Reg_List.Percentage_pn('txt_IStep"+count+"','','','lbl_IStep"+count+"')"+'">'+
                            '<label id="lbl_mm/s" class="col-sm-4 control-label">mm</label>'+
                            '</td>'+
                            '</tr>';
                        $(base_orig+' #injection_step_tbl').append(add_input);
                        
                        Reg_List.Percentage_pn_on_load('txt_Inj_Step'+count,'','','lbl_Inj_Step'+count);
                        Reg_List.Percentage_pn_on_load('txt_IStep'+count,'','','lbl_IStep'+count);

                        $(base_orig+' #btn_add_inj_step').attr('data-count',count);
                        count+=1;
                        
                        });

                        var pack_step = JSON.parse(data.pack_step);
                        $(base_orig+' #pack_step_tbl').html('');
                        var count_pack_step=1;
                        $.each(pack_step,function(key,value){
                            var add_input_pack_step = '<tr class="tr_pack_step'+count_pack_step+'">'+
                            '<td>'+count_pack_step+'</td>'+
                            '<td>'+
                            '<label id="lbl_Pack_Step'+count_pack_step+'" class="col-sm-4 control-label">0</label>'+
                            '<input id="txt_Pack_Step'+count_pack_step+'" class="col-sm-4  form-control input_field txt_warn" type="text" placeholder="Input Here.." style="width: 60px;"'+
                            '" readonly value="'+value.Pack_Step+'" onkeyup="'+
                            "Reg_List.Percentage_pn('txt_Pack_Step"+count_pack_step+"','','','lbl_Pack_Step"+count_pack_step+"')"+'">'+
                            '<label id="lbl_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                            '</td>'+
                            '<td>'+
                            '<label id="lbl_PStep'+count_pack_step+'" class="col-sm-4 control-label">0</label>'+
                            '<input id="txt_PStep'+count_pack_step+'" class="col-sm-4  form-control input_field txt_warn" type="text" placeholder="Input Here.." style="width: 60px;"'+
                            '" readonly value="'+value.PStep+'" onkeyup="'+
                            "Reg_List.Percentage_pn('txt_PStep"+count_pack_step+"','','','lbl_PStep"+count_pack_step+"')"+'">'+
                            '<label id="lbl_mm/s" class="col-sm-4 control-label">mm</label>'+
                            '</td>'+
                            '</tr>';
                        $(base_orig+' #pack_step_tbl').append(add_input_pack_step);

                        Reg_List.Percentage_pn_on_load('txt_Pack_Step'+count_pack_step,'','','lbl_Pack_Step'+count_pack_step);
                        Reg_List.Percentage_pn_on_load('txt_PStep'+count_pack_step,'','','lbl_PStep'+count_pack_step);
                        $(base_orig+' #btn_add_pack_step').attr('data-count',count_pack_step);
                        count_pack_step+=1;
                        
                        });
                        $(base_orig+" #txt_Inj_step").val(data.inj_step_mid);
                        $(base_orig+" #txt_Max_Inj_Pres").val(data.max_inj_pressure);
                        $(base_orig+" #txt_Act_Inj_Pres").val(data.actual_pressure);
                        $(base_orig+" #txt_Max_Inj_Time").val(data.max_inj_time);
                        $(base_orig+" #txt_Act_Time").val(data.actual_time);
                        $(base_orig+" #txt_Max_Pack_Velo").val(data.max_pack_velo);
                        $(base_orig+" #txt_POS_Trans").val(data.pos_trans);
                        $(base_orig+" #txt_Pack_step").val(data.pack_step_mid);

                        Reg_List.Percentage_pn_on_load('txt_Max_Inj_Pres','','','lbl_Max_Inj_Pres');
                        Reg_List.Percentage_pn_on_load('txt_Max_Inj_Time','','','lbl_Max_Inj_Time');
                        Reg_List.Percentage_pn_on_load('txt_Max_Pack_Velo','','','lbl_Max_Pack_Velo');
                        Reg_List.Percentage_pn_on_load('txt_POS_Trans','','','lbl_POS_Trans');
                        // Reg_List.With_or_Without_Change();
                    }
                    else  if(parameter_change=="measuring_condition_setting")
                    {
                        $(base_orig+" #txt_Extruder").val(data.extruder_on);
                        $(base_orig+" #txt_Mcushion").val(data.m_cushion);
                        $(base_orig+" #txt_Shot_Size").val(data.shot_size);
                        $(base_orig+" #txt_Dcmp_Dist").val(data.dcmp_dist);
                        $(base_orig+" #txt_Dcmp_Vel").val(data.dcmp_vel);
                        $(base_orig+" #txt_Cool_Time").val(data.cool_time);

                        Reg_List.Percentage_pn_on_load('txt_Mcushion','','','lbl_mcushion');
                        Reg_List.Percentage_pn_on_load('txt_Shot_Size','','','lbl_shot_size');
                        Reg_List.Percentage_pn_on_load('txt_Dcmp_Dist','','','lbl_Dcmp_Dist');
                        Reg_List.Percentage_pn_on_load('txt_Dcmp_Vel','','','lbl_Dcmp_Vel');
                        Reg_List.Percentage_pn_on_load('txt_Cool_Time','','','lbl_Cool_Time');

                        var extruder_json = JSON.parse(data.extruder_json);
                        $(base_orig+' #extruder_tbl').html('');
                        var count_extruder=1;
                        // console.log(x);
                        $.each(extruder_json,function(key,value){
                            var add_input_extruder = '<tr class="tr_extruder'+count_extruder+'">'+
                            '<td>'+count_extruder+'</td>'+
                            '<td>'+
                            ' <label id="lbl_Ext_kg'+count_extruder+'" class="col-sm-4 control-label">±0</label>'+
                            '<input type="text" id="txt_Ext_kg'+count_extruder+'" placeholder="Input Here.." class="form-control col-sm-4 input_field txt_warn" style="width: 60px;"'+
                            '" readonly value="'+value.kg+'" onkeyup="'+
                            "Reg_List.Percentage_pn('txt_Ext_kg"+count_extruder+"','','','lbl_Ext_kg"+count_extruder+"')"+'">'+
                            '<label id="lbl_static" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>'+
                            '</td>'+
                            '<td colspan="2">'+
                            '<label id="lbl_Ext_rpm'+count_extruder+'" class="col-sm-4 control-label">±0</label>'+
                            '<input type="text" id="txt_Ext_rpm'+count_extruder+'" placeholder="Input Here.." class="form-control col-sm-4 input_field txt_warn" style="width: 60px;"'+
                            '" readonly value="'+value.rpm+'" onkeyup="'+
                            "Reg_List.Percentage_pn('txt_Ext_rpm"+count_extruder+"','','','lbl_Ext_rpm"+count_extruder+"')"+'">'+
                            '<label id="lbl_static" class="col-sm-4 control-label">rpm</label>'+
                            '</td>'+
                            '<td>'+
                            '<label id="lbl_Ext_mm'+count_extruder+'" class="col-sm-4 control-label">±0</label>'+
                            '<input type="text" id="txt_Ext_mm'+count_extruder+'" placeholder="Input Here.." class="form-control col-sm-4 input_field txt_warn" style="width: 60px;"'+
                            '" readonly value="'+value.mm+'" onkeyup="'+
                            "Reg_List.Percentage_pn('txt_Ext_mm"+count_extruder+"','','','lbl_Ext_mm"+count_extruder+"')"+'">'+
                            '<label id="lbl_static" class="col-sm-4 control-label">mm</label>'+
                            '</td>'+
                            '</tr>';
                        $(base_orig+' #extruder_tbl').append(add_input_extruder);
                        Reg_List.Percentage_pn_on_load('txt_Ext_kg'+count_extruder,'','','lbl_Ext_kg'+count_extruder);
                        Reg_List.Percentage_pn_on_load('txt_Ext_rpm'+count_extruder,'','','lbl_Ext_rpm'+count_extruder);
                        Reg_List.Percentage_pn_on_load('txt_Ext_mm'+count_extruder,'','','lbl_Ext_mm'+count_extruder);
                        $(base_orig+' #btn_add_extruder').attr('data-count',count_extruder);
                        count_extruder+=1;
                        
                        });
                       
                        // Reg_List.With_or_Without_Change();
                    }

                   base_orig = '.table td#adjusted_condition ';
              
                }

                $('.table td#adjusted_condition .input_field').addClass('txt_warn');
                

            },
            error: function (data) {
                //console.log(data);
            },
            complete: function(data){
                Reg_List.With_or_Without_Change();
                Reg_List.check_array();
                $("#wait").css("display", "none");
               
            }
        })
    }

    this_data.Percentage_pn_on_load = function(id,negativelbl,positivelbl,tolerance)
    {
        var base_orig = '.table td#adjusted_condition ';
        for(x=0;x<2;x++){
            if($(base_orig+' #'+id).val()!="")
            {
                var base_value = parseInt($(base_orig+' #'+id).val());
                var percentage = base_value * .10;
                var neg_value = base_value - percentage;
                var pos_value = base_value + percentage;
                if(negativelbl!="" && positivelbl!="")
                {
                    $(base_orig+ ' #'+negativelbl).html(neg_value);
                    $(base_orig+ ' #'+positivelbl).html(pos_value);
                }
                if(tolerance != "")
                {
                    $(base_orig +' #'+tolerance).html('± '+percentage.toFixed(2));
                }
                
            }
            else
            { 
                if(negativelbl!="" && positivelbl!="")
                {
                    $(base_orig+' #'+negativelbl).html('0');
                    $(base_orig+' #'+positivelbl).html('0');
                }
                if(tolerance != "")
                {
                    $(base_orig+' #'+tolerance).html('± 0');
                }
            }
        var base_orig = '.table td#original_condition ';

        }
     
        // Reg_List.CheckTolerance(id);
    }

    this_data.Percentage_pn = function(id,negativelbl,positivelbl,tolerance)
    {
        var base_orig = '.table td#adjusted_condition ';
        if($(base_orig+' #'+id).val()!="")
        {
            var base_value = parseInt($(base_orig+' #'+id).val());
            var percentage = base_value * .10;
            var neg_value = base_value - percentage;
            var pos_value = base_value + percentage;
            if(negativelbl!="" && positivelbl!="")
            {
                $(base_orig+ ' #'+negativelbl).html(neg_value);
                $(base_orig+ ' #'+positivelbl).html(pos_value);
            }
            if(tolerance != "")
            {
                $(base_orig +' #'+tolerance).html('± '+percentage.toFixed(2));
            }
            
        }
        else
        { 
            if(negativelbl!="" && positivelbl!="")
            {
                $(base_orig+' #'+negativelbl).html('0');
                $(base_orig+' #'+positivelbl).html('0');
            }
            if(tolerance != "")
            {
                $(base_orig+' #'+tolerance).html('± 0');
            }
        }

        Reg_List.CheckTolerance(id);
    }

    this_data.Add_Inj_Pack = function(id_btn,id_container,id_tr,id_input1,id_input2)
    {
        var base_orig = '.table td#adjusted_condition';
        var count =parseInt($(base_orig+' #'+id_btn).attr('data-count'));
        count+=1;
        $(base_orig+' #'+id_btn).attr('data-count',count);
        var add_input = '<tr class='+id_tr+count+'>'+
                        '<td>'+count+'</td>'+
                        '<td>'+
                        '<label id="lbl_'+id_input1+count+'" class="col-sm-4 control-label">0</label>'+
                        '<input id="txt_'+id_input1+count+'" class="col-sm-4  form-control input_field txt_warn" type="text" placeholder="Input Here.." style="width: 60px;"'+
                        ' onchange="Alarm.CheckInput(this.id);"  onkeyup="'+
                        "Reg_List.Percentage_pn('txt_"+id_input1+count+"','','','lbl_"+id_input1+count+"')"+'">'+
                        '<label id="lbl_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                        '</td>'+
                        '<td>'+
                        '<label id="lbl_'+id_input2+count+'" class="col-sm-4 control-label">0</label>'+
                        '<input id="txt_'+id_input2+count+'" class="col-sm-4  form-control input_field txt_warn" type="text" placeholder="Input Here.." style="width: 60px;"'+
                        ' onchange="Alarm.CheckInput(this.id);"  onkeyup="'+
                        "Reg_List.Percentage_pn('txt_"+id_input2+count+"','','','lbl_"+id_input2+count+"')"+'">'+
                        '<label id="lbl_mm/s" class="col-sm-4 control-label">mm</label>'+
                        '</td>'+
                        '</tr>';

        $(base_orig+' #'+id_container).append(add_input);
    }

    this_data.Add_Extrude_input = function()
    {
        var base_orig = '.table td#adjusted_condition';
        var count =parseInt($(base_orig+' #btn_add_extruder').attr('data-count'));
        count+=1;
        $(base_orig+' #btn_add_extruder').attr('data-count',count);
        var add_input = '<tr class=tr_extruder'+count+'>'+
                        '<td>'+count+'</td>'+
                        '<td>'+
                        '<label id="lbl_Ext_kg'+count+'" class="col-sm-4 control-label">±0</label>'+
                        '<input id="txt_Ext_kg'+count+'" class="col-sm-4  form-control input_field txt_warn" type="text" placeholder="Input Here.." style="width: 60px;"'+
                        ' onchange="Alarm.CheckInput(this.id);"  onkeyup="'+
                        "Reg_List.Percentage_pn('txt_Ext_kg"+count+"','','','lbl_Ext_kg"+count+"')"+'">'+
                        '<label id="lbl_static" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>'+
                        '</td>'+
                        '<td colspan="2">'+
                        '<label id="lbl_Ext_rpm'+count+'" class="col-sm-4 control-label">±0</label>'+
                        '<input id="txt_Ext_rpm'+count+'" class="col-sm-4  form-control input_field txt_warn" type="text" placeholder="Input Here.." style="width: 60px;"'+
                        ' onchange="Alarm.CheckInput(this.id);"  onkeyup="'+
                        "Reg_List.Percentage_pn('txt_Ext_rpm"+count+"','','','lbl_Ext_rpm"+count+"')"+'">'+
                        ' <label id="lbl_static" class="col-sm-4 control-label">rpm</label>'+
                        '</td>'+
                        '<td>'+
                        '<label id="lbl_Ext_mm'+count+'" class="col-sm-4 control-label">±0</label>'+
                        '<input id="txt_Ext_mm'+count+'" class="col-sm-4  form-control input_field txt_warn" type="text" placeholder="Input Here.." style="width: 60px;"'+
                        ' onchange="Alarm.CheckInput(this.id);"  onkeyup="'+
                        "Reg_List.Percentage_pn('txt_Ext_mm"+count+"','','','lbl_Ext_mm"+count+"')"+'">'+
                       ' <label id="lbl_static" class="col-sm-4 control-label">mm</label>'+
                        '</td>'+
                        '</tr>';

        $(base_orig+' #extruder_tbl').append(add_input);
    }

    this_data.Add_Input_Field = function(id_button,id_container,id_input1)
    {
        var base_orig = '.table td#adjusted_condition ';
        var count =parseInt($(base_orig+'#'+id_button).attr('data-count'));
        count+=1;
        $(base_orig+'#'+id_button).attr('data-count',count);
        var add_input = '<tr class=tr_pweight'+count+'>';
       
            add_input+='<td>'+
                        '<input type="text" class="form-control input_field txt_warn" id="'+id_input1+count+'" '+
                        ' placeholder="Input Product Weight" '+
                        ' onchange="Alarm.CheckInput(this.id);"  onkeyup="'+
                        "Reg_List.CheckTolerance('"+id_input1+count+"')"+'">'+
                        
                        '</td>';
       
        add_input+="</tr>";
        $(base_orig+'#'+id_container).append(add_input);
    }

    this_data.Remove_Input_Field = function(id_button,id_tr)
    {
        var base_orig = '.table td#adjusted_condition';
        var count =parseInt($(base_orig+' #'+id_button).attr('data-count'));
        if(count!=1)
        {
        $(base_orig+' .'+id_tr+count).remove();   
        count-=1;
        $(base_orig+' #'+id_button).attr('data-count',count);
        }
    }

    this_data.ShowAlarm = function()
    {
        $('.modal_alarm').modal('show');
    }

    this_data.With_or_Without_Change = function()
    {
        var param_status = $("input[name='change_status']:checked").val();
        if(param_status=="with_change"){
            $('.table td#adjusted_condition .input_field').attr('readonly', false);
            $('#slc_result').val('unsolved');
            $('#slc_result').select2().trigger('change');
            // $('.table td#adjusted_condition .input_field').removeClass('txt_exceed');
            // $('.table td#adjusted_condition  .input_field').removeClass('has_change');
        }
        else{
            $('.table td#adjusted_condition .input_field').attr('readonly', true);
            $('#slc_result').val('solved');
            $('#slc_result').select2().trigger('change');
            // var id = $('.modal_view_data').attr('data-id');
            //Reg_List.LoadSelectedid(id);
        }
    }

    this_data.CheckTolerance = function(id){
        // alert('triggered');
        // console.log('trigger');
        base_orig = '.table td#original_condition ';
        base_adj = '.table td#adjusted_condition ';
        data=parseFloat($(base_orig+'#'+id).val());
        input=parseFloat($(base_adj+'#'+id).val());
        /* percentage= data*.10;
        positive=data+percentage;
        negative = data-percentage;
        if(input>positive || input<negative)
        {
           $('.modal_alarm').modal('show');
            
        } */
        
        if(input!=data)
        {
            $('.table td#adjusted_condition  #'+id).removeClass('txt_warn');
            $('.table td#adjusted_condition  #'+id).addClass('txt_exceed');
            $('.table td#adjusted_condition  #'+id).addClass('has_change');
        }
        else{
            $('.table td#adjusted_condition  #'+id).removeClass('txt_exceed');
            $('.table td#adjusted_condition  #'+id).addClass('txt_warn');
            $('.table td#adjusted_condition  #'+id).removeClass('has_change');
        }

        After_Prod.Save_to_temp();
        
        
    }

    this_data.Check_if_has_change = function(){
        var base_adj = '.table td#adjusted_condition .input_field';
        var has_change = $(base_adj).hasClass('has_change');
        var parameter_change = $('#slc_parameter_setting').val();
        //console.log(has_change);
        if(has_change==false)
        {
            if(parameter_change=="mct_setting")
            {
                arr_mct_setting = [];
            }
            else  if(parameter_change=="clamp_eject_setting")
            {
                arr_clamp_eject = [];

            }
            else  if(parameter_change=="cylinder_temp_setting")
            {
                arr_cylinder_temp = [];
            }
            else  if(parameter_change=="inj_pack_setting")
            {
                arr_inj_pack = [];
                
            }
            else  if(parameter_change=="measuring_condition_setting")
            {
                arr_measuring_condition = [];
            }
        }

        

    }

    this_data.check_array = function(){
        var base_adj = '.table td#adjusted_condition';
        // console.log( arr_mct_setting);
        // console.log(arr_inj_pack);
        // console.log('clamp->length:' +arr_clamp_eject.length);
        if(arr_mct_setting.length>0){
            // data = arr_mct_setting[0];
            // console.log(data);
            // console.log(arr_mct_setting[0].product_weight);
            $(base_adj+" #txt_die_temp_core").val(arr_mct_setting[0].die_temp_core);
            $(base_adj+" #txt_die_temp_cavity").val(arr_mct_setting[0].die_temp_cavity);
            $(base_adj+" #txt_mold_temp_ctrl").val(arr_mct_setting[0].mold_temp_control);
            $(base_adj+" #txt_machine_cycle_time").val(arr_mct_setting[0].machine_cycle_time);
            $(base_adj+" #txt_sprue_weight").val(arr_mct_setting[0].sprue_weight);
            $(base_adj+" #txt_sub_part_weight").val(arr_mct_setting[0].sub_part_weight);
            $(base_adj+" #txt_additional_cycle_time").val(arr_mct_setting[0].additional_cycle_time);
         

        //     // var prod_weight1 = arr_mct_setting[0]['product_weight'];
        //     $(base_adj+' #prod_weight').html('');
            var count=1;
        //     // console.log(arr_mct_setting[0]['product_weight']);
            
            $(base_adj+' #prod_weight').html('');
            $.each(arr_mct_setting[0]['product_weight'],function(key,value1){
            //    console.log(value1);
                var add_input = '<tr class="tr_pweight'+count+'">'+
                            '<td>'+
                            '<input type="text" class="form-control input_field txt_warn has_change" onchange="Alarm.CheckInput(this.id);"'+
                            ' id="txt_product_weight'+count+'" placeholder="Input Product Weight" value="'+value1.x+'">'+
                            '</td>'+
                            "</tr>";

                $(base_adj+' #prod_weight').append(add_input);
                $(base_adj+' #btn_add_weight').attr('data-count',count);
                // Reg_List.CheckTolerance('txt_product_weight'+count);
            count+=1;
            });
            // Reg_List.CheckTolerance('txt_die_temp_core');
            // Reg_List.CheckTolerance('txt_die_temp_cavity');
            // Reg_List.CheckTolerance('txt_mold_temp_ctrl');
            // Reg_List.CheckTolerance('txt_machine_cycle_time');
            // Reg_List.CheckTolerance('txt_sprue_weight');
            // Reg_List.CheckTolerance('txt_sub_part_weight');
            // Reg_List.CheckTolerance('txt_additional_cycle_time');
         
        }
        
        if(arr_clamp_eject.length>0){
            // console.log(arr_clamp_eject[0]);
            $(base_adj+" #txt_OLFO_POS").val(arr_clamp_eject[0].open_limit_POS);
            $(base_adj+" #txt_OLFO_VEL").val(arr_clamp_eject[0].open_limit_VEL);
            $(base_adj+" #txt_CS1_POS").val(arr_clamp_eject[0].close_sw_POS);
            $(base_adj+" #txt_CS1_VEL").val(arr_clamp_eject[0].close_sw_VEL);
            $(base_adj+" #txt_CSMP_POS").val(arr_clamp_eject[0].close_slow_POS);
            $(base_adj+" #txt_CSMP_VEL").val(arr_clamp_eject[0].close_slow_VEL);
            $(base_adj+" #txt_CST_POS").val(arr_clamp_eject[0].close_sp_POS);
            $(base_adj+" #txt_MPPT_POS").val(arr_clamp_eject[0].mold_prtct_POS);
            $(base_adj+" #txt_BB_VEL").val(arr_clamp_eject[0].breakaway_VEL);
            $(base_adj+" #txt_O1_POS").val(arr_clamp_eject[0].open1_POS);
            $(base_adj+" #txt_O1_VEL").val(arr_clamp_eject[0].open1_VEL);
            $(base_adj+" #txt_O2_POS").val(arr_clamp_eject[0].open2_POS);
            $(base_adj+" #txt_O2_VEL").val(arr_clamp_eject[0].open2_VEL);
            $(base_adj+" #txt_FOFO_POS").val(arr_clamp_eject[0].full_open_POS);
            $(base_adj+" #txt_ESES_POS").val(arr_clamp_eject[0].eject_start_POS);
            $(base_adj+" #txt_Pulses").val(arr_clamp_eject[0].pulses);
            $(base_adj+" #txt_FWD_POS").val(arr_clamp_eject[0].FWD_POS);
            $(base_adj+" #txt_FWD_VEL").val(arr_clamp_eject[0].FWD_VEL);
            $(base_adj+" #txt_FWD_DWELL").val(arr_clamp_eject[0].FWD_DWELL);
            $(base_adj+" #txt_ADV_POS").val(arr_clamp_eject[0].ADV_POS);
            $(base_adj+" #txt_ADV_VEL").val(arr_clamp_eject[0].ADV_VEL);
            $(base_adj+" #txt_ADV_DWELL").val(arr_clamp_eject[0].ADV_DWELL);
            $(base_adj+" #txt_REV_POS").val(arr_clamp_eject[0].REV_POS);
            $(base_adj+" #txt_REV_VEL").val(arr_clamp_eject[0].REV_VEL);
            $(base_adj+" #txt_REV_DWELL").val(arr_clamp_eject[0].REV_DWELL);
            $(base_adj+" #txt_Ejector_Delay").val(arr_clamp_eject[0].ejector_delay);
            $(base_adj+" #txt_Die_Height").val(arr_clamp_eject[0].auto_die_height);
            // Reg_List.CheckTolerance('txt_OLFO_POS');
            // $('.table td#adjusted_condition  #txt_OLFO_POS').addClass('has_change');
            // Reg_List.Percentage_pn_on_load('txt_OLFO_POS','lbl_neg_OLFO_POS','lbl_pos_OLFO_POS');
            // Reg_List.Percentage_pn_on_load('txt_OLFO_VEL','lbl_neg_OLFO_VEL','lbl_pos_OLFO_VEL');
            // Reg_List.Percentage_pn_on_load('txt_CS1_POS','lbl_neg_CS1_POS','lbl_pos_CS1_POS');
            // Reg_List.Percentage_pn_on_load('txt_CS1_VEL','lbl_neg_CS1_VEL','lbl_pos_CS1_VEL');
            // Reg_List.Percentage_pn_on_load('txt_CSMP_POS','lbl_neg_CSMP_POS','lbl_pos_CSMP_POS');
            // Reg_List.Percentage_pn_on_load('txt_CSMP_VEL','lbl_neg_CSMP_VEL','lbl_pos_CSMP_VEL');
            // Reg_List.Percentage_pn_on_load('txt_CST_POS','lbl_neg_CST_POS','lbl_pos_CST_POS');
            // Reg_List.Percentage_pn_on_load('txt_MPPT_POS','lbl_neg_MPPT_POS','lbl_pos_MPPT_POS');
            // Reg_List.Percentage_pn_on_load('txt_BB_VEL','lbl_neg_BB_VEL','lbl_pos_BB_VEL');
            // Reg_List.Percentage_pn_on_load('txt_O1_POS','lbl_neg_O1_POS','lbl_pos_O1_POS');
            // Reg_List.Percentage_pn_on_load('txt_O1_VEL','lbl_neg_O1_VEL','lbl_pos_O1_VEL');
            // Reg_List.Percentage_pn_on_load('txt_O2_POS','lbl_neg_O2_POS','lbl_pos_O2_POS');
            // Reg_List.Percentage_pn_on_load('txt_O2_VEL','lbl_neg_O2_VEL','lbl_pos_O2_VEL');
            // Reg_List.Percentage_pn_on_load('txt_FOFO_POS','lbl_neg_FOFO_POS','lbl_pos_FOFO_POS');
            // Reg_List.Percentage_pn_on_load('txt_ESES_POS','lbl_neg_ESES_POS','lbl_pos_ESES_POS');
            // Reg_List.Percentage_pn_on_load('txt_FWD_POS','lbl_neg_FWD_POS','lbl_pos_FWD_POS');
            // Reg_List.Percentage_pn_on_load('txt_FWD_VEL','lbl_neg_FWD_VEL','lbl_pos_FWD_VEL');
            // Reg_List.Percentage_pn_on_load('txt_FWD_DWELL','lbl_neg_FWD_DWELL','lbl_pos_FWD_DWELL');
            // Reg_List.Percentage_pn_on_load('txt_ADV_POS','lbl_neg_ADV_POS','lbl_pos_ADV_POS');
            // Reg_List.Percentage_pn_on_load('txt_ADV_VEL','lbl_neg_ADV_VEL','lbl_pos_ADV_VEL');
            // Reg_List.Percentage_pn_on_load('txt_ADV_DWELL','lbl_neg_ADV_DWELL','lbl_pos_ADV_DWELL');
            // Reg_List.Percentage_pn_on_load('txt_REV_POS','lbl_neg_REV_POS','lbl_pos_REV_POS');
            // Reg_List.Percentage_pn_on_load('txt_REV_VEL','lbl_neg_REV_VEL','lbl_pos_REV_VEL');
            // Reg_List.Percentage_pn_on_load('txt_REV_DWELL','lbl_neg_REV_DWELL','lbl_pos_REV_DWELL');

            
        }
        
        if(arr_cylinder_temp.length>0){

            $(base_adj+" #txt_Nozzle").val(arr_cylinder_temp[0].nozzle);
            $(base_adj+" #txt_Barrel1").val(arr_cylinder_temp[0].barrel1);
            $(base_adj+" #txt_Barrel2").val(arr_cylinder_temp[0].barrel2);
            $(base_adj+" #txt_Barrel3").val(arr_cylinder_temp[0].barrel3);
            $(base_adj+" #txt_Feed_Throat").val(arr_cylinder_temp[0].feed_throat);

        }

        if(arr_inj_pack.length > 0){
            // console.log(arr_inj_pack);
            
            // var inj_pack_length = Object.keys(inj_pack).length;
            //alert(arr_inj_pack[0].injection_step);
            
            var inj_pack = arr_inj_pack[0].inj_step;
            $(base_adj+' #injection_step_tbl').html('');
            var count=1;
            // console.log(arr_inj_pack);

            $.each(inj_pack,function(key,value){
                var add_input = '<tr class="tr_inj_pack'+count+'">'+
                '<td>'+count+'</td>'+
                '<td>'+
                '<label id="lbl_Inj_Step'+count+'" class="col-sm-4 control-label">0</label>'+
                '<input id="txt_Inj_Step'+count+'" class="col-sm-4  form-control input_field txt_warn" type="text" placeholder="Input Here.." style="width: 60px;"'+
                '  value="'+value.Inj_Step+'">'+
                '<label id="lbl_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                '</td>'+
                '<td>'+
                '<label id="lbl_IStep'+count+'" class="col-sm-4 control-label">0</label>'+
                '<input id="txt_IStep'+count+'" class="col-sm-4  form-control input_field txt_warn" type="text" placeholder="Input Here.." style="width: 60px;"'+
                '"  value="'+value.IStep+'">'+
                '<label id="lbl_mm/s" class="col-sm-4 control-label">mm</label>'+
                '</td>'+
                '</tr>';
            $(base_adj+' #injection_step_tbl').append(add_input);
            
            $(base_adj+' #btn_add_inj_step').attr('data-count',count);
            count+=1;
            
            });

            var pack_step = arr_inj_pack[0].pack_step;
            $(base_adj+' #pack_step_tbl').html('');
            var count_pack_step=1;
            $.each(pack_step,function(key,value){
                var add_input_pack_step = '<tr class="tr_pack_step'+count_pack_step+'">'+
                '<td>'+count_pack_step+'</td>'+
                '<td>'+
                '<label id="lbl_Pack_Step'+count_pack_step+'" class="col-sm-4 control-label">0</label>'+
                '<input id="txt_Pack_Step'+count_pack_step+'" class="col-sm-4  form-control input_field txt_warn" type="text" placeholder="Input Here.." style="width: 60px;"'+
                '"  value="'+value.Pack_Step+'">'+
                '<label id="lbl_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                '</td>'+
                '<td>'+
                '<label id="lbl_PStep'+count_pack_step+'" class="col-sm-4 control-label">0</label>'+
                '<input id="txt_PStep'+count_pack_step+'" class="col-sm-4  form-control input_field txt_warn" type="text" placeholder="Input Here.." style="width: 60px;"'+
                '"  value="'+value.PStep+'">'+
                '<label id="lbl_mm/s" class="col-sm-4 control-label">mm</label>'+
                '</td>'+
                '</tr>';
            $(base_adj+' #pack_step_tbl').append(add_input_pack_step);

            $(base_adj+' #btn_add_pack_step').attr('data-count',count_pack_step);
            count_pack_step+=1;
            
            });
            $(base_adj+" #txt_Inj_step").val(arr_inj_pack[0].inj_step_mid);
            $(base_adj+" #txt_Max_Inj_Pres").val(arr_inj_pack[0].max_inj_pressure);
            $(base_adj+" #txt_Act_Inj_Pres").val(arr_inj_pack[0].actual_pressure);
            $(base_adj+" #txt_Max_Inj_Time").val(arr_inj_pack[0].max_inj_time);
            $(base_adj+" #txt_Act_Time").val(arr_inj_pack[0].actual_time);
            $(base_adj+" #txt_Max_Pack_Velo").val(arr_inj_pack[0].max_pack_velo);
            $(base_adj+" #txt_POS_Trans").val(arr_inj_pack[0].pos_trans);
            $(base_adj+" #txt_Pack_step").val(arr_inj_pack[0].pack_step_mid);

        }

        if(arr_measuring_condition.length>0){
            // console.log(arr_measuring_condition);
                $(base_adj+" #txt_Extruder").val(arr_measuring_condition[0].extruder_on);
                $(base_adj+" #txt_Mcushion").val(arr_measuring_condition[0].m_cushion);
                $(base_adj+" #txt_Shot_Size").val(arr_measuring_condition[0].shot_size);
                $(base_adj+" #txt_Dcmp_Dist").val(arr_measuring_condition[0].dcmp_dist);
                $(base_adj+" #txt_Dcmp_Vel").val(arr_measuring_condition[0].dcmp_vel);
                $(base_adj+" #txt_Cool_Time").val(arr_measuring_condition[0].cool_time);
                

                var extruder_json = arr_measuring_condition[0].extruder_json;
                $(base_adj+' #extruder_tbl').html('');
                var count_extruder=1;
                // console.log(x);
                $.each(extruder_json,function(key,value){
                    var add_input_extruder = '<tr class="tr_extruder'+count_extruder+'">'+
                    '<td>'+count_extruder+'</td>'+
                    '<td>'+
                    ' <label id="lbl_Ext_kg'+count_extruder+'" class="col-sm-4 control-label">±0</label>'+
                    '<input type="text" id="txt_Ext_kg'+count_extruder+'" placeholder="Input Here.." class="form-control col-sm-4 input_field txt_warn" style="width: 60px;"'+
                    '"  value="'+value.kg+'">'+
                    '<label id="lbl_static" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>'+
                    '</td>'+
                    '<td colspan="2">'+
                    '<label id="lbl_Ext_rpm'+count_extruder+'" class="col-sm-4 control-label">±0</label>'+
                    '<input type="text" id="txt_Ext_rpm'+count_extruder+'" placeholder="Input Here.." class="form-control col-sm-4 input_field txt_warn" style="width: 60px;"'+
                    '"  value="'+value.rpm+'">'+
                    '<label id="lbl_static" class="col-sm-4 control-label">rpm</label>'+
                    '</td>'+
                    '<td>'+
                    '<label id="lbl_Ext_mm'+count_extruder+'" class="col-sm-4 control-label">±0</label>'+
                    '<input type="text" id="txt_Ext_mm'+count_extruder+'" placeholder="Input Here.." class="form-control col-sm-4 input_field txt_warn" style="width: 60px;"'+
                    '"  value="'+value.mm+'">'+
                    '<label id="lbl_static" class="col-sm-4 control-label">mm</label>'+
                    '</td>'+
                    '</tr>';
                $(base_adj+' #extruder_tbl').append(add_input_extruder);
                $(base_adj+' #btn_add_extruder').attr('data-count',count_extruder);
                count_extruder+=1;
                
                });
        }

        
    }

    return this_data;
})();


var After_Prod = (function(){
    var this_data = {};

    this_data.Finished = function()
    {
        // After_Prod.Save_to_temp();
        // console.log(arr_mct_setting);
        var validate_req_field = validate_field.check_fields();
        if(validate_req_field=="true"){
                     
                var param_status = $("input[name='change_status']:checked").val(); //with or without change
                if($('#slc_result').val()=='solved')
                {
                    result = 'PROBLEM SOLVED!';
                }
                else
                {
                    result = "PROBLEM STILL EXISTS!";
                }

                
                Swal.fire({
                    title: 'Are you sure? ',
                    html: "Please ensure that all the necessary fields are updated. "+
                        "All <b>SOLVED</b> results will be the basis of after production data. <br>",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'Cancel',
                    confirmButtonText: 'Yes, this is for approval'
                }).then((result) => {
                    if (result.value) 
                    {
                        if(param_status=="without_change")
                        {
                                After_Prod.Finish_Without_Change();
                        }
                        else
                        {
                            // //console.log(arr_mct_setting);
                            if(arr_mct_setting.length == 0 && arr_clamp_eject.length == 0 && arr_cylinder_temp.length==0 && arr_inj_pack.length ==0 && arr_measuring_condition.length==0 ){
                                Swal.fire({
                                    title: 'ERROR',
                                    html: 'No changes to commit. Please set the parameter status to <b>WITHOUT CHANGE</b> to save this record.',
                                    type: 'error'
                                })
                            }
                            else{
                                After_Prod.Finish_With_Change('for_approval');
                            }
                        
                        }
                    }
                })
        }
        else{
            Swal.fire({
                title: 'ERROR!',
                html: "Please complete all neccessary fields! <br><b>"+validate_req_field+"</b> is <b>REQUIRED.</b>",
                type: 'error',
            });
        }
       

        
     
       
    }

    this_data.ForAdjustment = function(){
        var param_status = $("input[name='change_status']:checked").val(); //with or without change
        Swal.fire({
            title: 'Are you sure? ',
            html: "This record will be saved in the <b>ADJUSTMENT HISTORY</b> and will not appear in the approval list",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, this is for ADJUSTMENT'
        }).then((result) => {
            if (result.value) 
            {
                if(param_status=="without_change")
                {
                    Swal.fire({
                        title: 'ERROR!',
                        html: "No adjustments to saved because parameter is set to <b>WITHOUT CHANGE</b>",
                        type: 'error',
                    });
                    
                }
                else
                {
                    // //console.log(arr_mct_setting);
                    
                    After_Prod.Finish_With_Change('for_adjustment');
                
                }
            }
        })

    }

    this_data.Save_to_temp = function()
    {
        
        var base_orig = '.table td#adjusted_condition ';
        var parameter_change = $('#slc_parameter_setting').val();

        //console.log('drp by saved to temp: -->'+parameter_change);
        if(parameter_change=="mct_setting")
        {

            arr_mct_setting=[];
            var prod_weight_count = $(base_orig+'#btn_add_weight').attr('data-count');
            var prod_weight_json = [];
            for(x=1;x<=prod_weight_count;x++)
            {
                prod_weight_json.push({
                "x": $(base_orig+'#txt_product_weight'+x).val(),
                })

            }   

            arr_mct_setting.push({
                "die_temp_core":$(base_orig+" #txt_die_temp_core").val(),
                "die_temp_cavity":$(base_orig+" #txt_die_temp_cavity").val(),
                "mold_temp_control": $(base_orig+" #txt_mold_temp_ctrl").val(),
                "reason":$('#slc_reason_of_change').val(),
                "result":$('#slc_result').val(),
                "machine_cycle_time":$(base_orig+'#txt_machine_cycle_time').val(),
                "product_weight":prod_weight_json,
                "sprue_weight":$(base_orig+'#txt_sprue_weight').val(),
                "sub_part_weight":$(base_orig+'#txt_sub_part_weight').val(),
                "additional_cycle_time":$(base_orig+'#txt_additional_cycle_time').val()
            });
          
        }
        else  if(parameter_change=="clamp_eject_setting")
        {
            arr_clamp_eject = [];
            var open_limit_POS = $(base_orig+" #txt_OLFO_POS").val();
            var open_limit_VEL = $(base_orig+" #txt_OLFO_VEL").val();
            var close_sw_POS = $(base_orig+" #txt_CS1_POS").val();
            var close_sw_VEL = $(base_orig+" #txt_CS1_VEL").val();
            var close_slow_POS = $(base_orig+" #txt_CSMP_POS").val();
            var close_slow_VEL = $(base_orig+" #txt_CSMP_VEL").val();
            var close_sp_POS = $(base_orig+" #txt_CST_POS").val();
            var mold_prtct_POS = $(base_orig+" #txt_MPPT_POS").val();
            var breakaway_VEL = $(base_orig+" #txt_BB_VEL").val();
            var open1_POS = $(base_orig+" #txt_O1_POS").val();
            var open1_VEL = $(base_orig+" #txt_O1_VEL").val();
            var open2_POS = $(base_orig+" #txt_O2_POS").val();
            var open2_VEL = $(base_orig+" #txt_O2_VEL").val();
            var full_open_POS = $(base_orig+" #txt_FOFO_POS").val();
            var eject_start_POS = $(base_orig+" #txt_ESES_POS").val();
            var pulses = $(base_orig+" #txt_Pulses").val();
            var FWD_POS = $(base_orig+" #txt_FWD_POS").val();
            var FWD_VEL = $(base_orig+" #txt_FWD_VEL").val();
            var FWD_DWELL = $(base_orig+" #txt_FWD_DWELL").val();
            var ADV_POS = $(base_orig+" #txt_ADV_POS").val();
            var ADV_VEL = $(base_orig+" #txt_ADV_VEL").val();
            var ADV_DWELL = $(base_orig+" #txt_ADV_DWELL").val();
            var REV_POS = $(base_orig+" #txt_REV_POS").val();
            var REV_VEL = $(base_orig+" #txt_REV_VEL").val();
            var REV_DWELL = $(base_orig+" #txt_REV_DWELL").val();
            var ejector_delay = $(base_orig+" #txt_Ejector_Delay").val();
            var auto_die_height = $(base_orig+" #txt_Die_Height").val();

            arr_clamp_eject.push({
                "open_limit_POS":open_limit_POS,
                "open_limit_VEL":open_limit_VEL,
                "close_sw_POS" :close_sw_POS ,
                "close_sw_VEL" :close_sw_VEL ,
                "close_slow_POS":close_slow_POS,
                "close_slow_VEL":close_slow_VEL,
                "close_sp_POS" :close_sp_POS ,
                "mold_prtct_POS":mold_prtct_POS,
                "breakaway_VEL" :breakaway_VEL ,
                "open1_POS":open1_POS,
                "open1_VEL":open1_VEL,
                "open2_POS":open2_POS,
                "open2_VEL":open2_VEL,
                "full_open_POS" :full_open_POS ,
                "eject_start_POS":eject_start_POS,
                "pulses"  :pulses  ,
                "FWD_POS" :FWD_POS ,
                "FWD_VEL" :FWD_VEL ,
               "FWD_DWELL":FWD_DWELL,
                "ADV_POS" :ADV_POS ,
                "ADV_VEL" :ADV_VEL ,
                "ADV_DWELL" :ADV_DWELL, 
                "REV_POS" :REV_POS, 
                "REV_VEL" :REV_VEL, 
                "REV_DWELL":REV_DWELL,
                "ejector_delay" :ejector_delay, 
                "auto_die_height":auto_die_height,
                "reason":$('#slc_reason_of_change').val(),
                "result":$('#slc_result').val()
            });

        }
        else  if(parameter_change=="cylinder_temp_setting")
        {
            arr_cylinder_temp = [];
            var nozzle = $(base_orig+'#txt_Nozzle').val();
            var barrel1 = $(base_orig+'#txt_Barrel1').val();
            var barrel2 = $(base_orig+'#txt_Barrel2').val();
            var barrel3 = $(base_orig+'#txt_Barrel3').val();
            var feed_throat = $(base_orig+'#txt_Feed_Throat').val();

            arr_cylinder_temp.push({
                "nozzle":nozzle,
                "barrel1":barrel1,
                "barrel2":barrel2,
                "barrel3":barrel3,
                "feed_throat":feed_throat,
                "reason":$('#slc_reason_of_change').val(),
                "result":$('#slc_result').val()
            });

        }
        else  if(parameter_change=="inj_pack_setting")
        {
            arr_inj_pack = [];

            var inj_step_count = $(base_orig+'#btn_add_inj_step').attr('data-count');
            var inj_step = [];
    
             for(x=1;x<=inj_step_count;x++)
             {
                inj_step.push({
                    "IStep": $(base_orig+'#txt_IStep'+x).val(),
                    "Inj_Step": $(base_orig+'#txt_Inj_Step'+x).val()
                    
                })
             }   
            var inj_step_mid = $(base_orig+'#txt_Inj_step').val();
            var max_inj_pressure = $(base_orig+'#txt_Max_Inj_Pres').val();
            var actual_pressure = $(base_orig+'#txt_Act_Inj_Pres').val();
            var max_inj_time = $(base_orig+'#txt_Max_Inj_Time').val();
            var actual_time = $(base_orig+'#txt_Act_Time').val();
            var max_pack_velo = $(base_orig+'#txt_Max_Pack_Velo').val();
            var pos_trans = $(base_orig+'#txt_POS_Trans').val();
            var pack_step_mid = $(base_orig+'#txt_Pack_step').val();

            var pack_step_count = $(base_orig+'#btn_add_pack_step').attr('data-count');
            var pack_step = [];
            for(x=1;x<=pack_step_count;x++)
            {
               pack_step.push({
                "Pack_Step": $(base_orig+'#txt_Pack_Step'+x).val(),
                    "PStep": $(base_orig+'#txt_PStep'+x).val()
                   
               })
            }   

            arr_inj_pack.push({
                "inj_step":inj_step,
                "inj_step_mid":inj_step_mid,
                "max_inj_pressure":max_inj_pressure,
                "actual_pressure":actual_pressure,
                "max_inj_time":max_inj_time,
                "actual_time":actual_time,
                "max_pack_velo":max_pack_velo,
                "pos_trans":pos_trans,
                "pack_step_mid":pack_step_mid,
                "pack_step":pack_step,
                "reason":$('#slc_reason_of_change').val(),
                "result":$('#slc_result').val()
            });
            
           
        }
        else  if(parameter_change=="measuring_condition_setting")
        {
            arr_measuring_condition = [];

            var extruder_on = $(base_orig+'#txt_Extruder').val();
            var m_cushion = $(base_orig+'#txt_Mcushion').val();
            var shot_size = $(base_orig+'#txt_Shot_Size').val();
            var dcmp_dist = $(base_orig+'#txt_Dcmp_Dist').val();
            var dcmp_vel = $(base_orig+'#txt_Dcmp_Vel').val();
            var cool_time = $(base_orig+'#txt_Cool_Time').val();

            var ext_step_count = $(base_orig+'#btn_add_extruder').attr('data-count');
            var extruder_json = [];
            for(x=1;x<=ext_step_count;x++)
            {
                extruder_json.push({
                "kg": $(base_orig+'#txt_Ext_kg'+x).val(),
                "rpm": $(base_orig+'#txt_Ext_rpm'+x).val(),
                "mm": $(base_orig+'#txt_Ext_mm'+x).val()
                })

            }   

            arr_measuring_condition.push({
                "extruder_on":extruder_on,
                "m_cushion":m_cushion,
                "shot_size":shot_size,
                "dcmp_dist":dcmp_dist,
                "dcmp_vel":dcmp_vel,
                "cool_time":cool_time,
                "extruder_json":extruder_json,
                "reason":$('#slc_reason_of_change').val(),
                "result":$('#slc_result').val()
            });

        }

        Reg_List.Check_if_has_change();
        
        
    }

    this_data.Finish_Without_Change = function()
    {
       
      
        var id = $('.modal_view_data').attr('data-id');
        //raw_mats_hist
        var dryer_no = $('#txt_dryer_no').val();
        var time_in = $('#time_time_in').val();
        var time_use = $('#time_time_use').val();
        var date_prepared = $('#date_prepared').val();
        var material_lot_no = $('#txt_mat_lot_no').val();
        var actual_matl_use = $('#txt_actual_matl_use').val();
        var actual_time_matl_use = $('#time_actual_use').val();
        var material_code = $('#txt_material_code').val();

        //production_tbl
        var total_production = $('#txt_total_production').val();
        var date_process_start = $('#date_process_start').val();
        var date_process_finish = $('#date_process_finish').val();
        var lot_number = $('#txt_lot_number').val();
        var checked_by = $('#txt_check_by').val();
        var date_checked = $('#txt_check_date').val();
        var work_finish_qty = $('#txt_work_finish_qty').val();
        var mold_setup = After_Prod.mold_set_up_checksheet();

        var param_status = $("input[name='change_status']:checked").val(); //with ot without change
       //  alert(param_status);
       var param_change = '';
       if(param_status=='without_change'){
        param_change = '0';
        }
        else{
            param_change = '1';
        }
        
               $.ajax({
                   url:"reglist/finishedwochange",
                   type:"POST",
                   data: {
                       'id':id,
                       'param_status': param_status,
                       'dryer_no':dryer_no,
                       'time_in':time_in,
                       'time_use':time_use,
                       'date_prepared':date_prepared,
                       'material_lot_no':material_lot_no,
                       'actual_matl_use':actual_matl_use,
                       'actual_time_matl_use':actual_time_matl_use,
                       'material_code':material_code,
                       //prod
                       'total_production':total_production,
                       'date_process_start':date_process_start,
                       'date_process_finish':date_process_finish,
                       'lot_number':lot_number,
                       'checked_by':checked_by,
                       'date_checked':date_checked,
                       'work_finish_qty':work_finish_qty,
                       'mold_set_up': mold_setup,
                       'param_change':param_change
                   },
                   success:function(data){
                    //    console.log(data);
                       Swal.fire(
                           'Success!',
                           'Your record has been saved!',
                           'success'
                       )
                   },
                   error:function(data){
                       //console.log(data);
                   }
               });          

          
    }

    this_data.Finish_With_Change = function(btn_status)
    {
        //console.log($('.modal_view_data').attr('data-id'));
         //raw_mats_hist
         var dryer_no = $('#txt_dryer_no').val();
         var time_in = $('#time_time_in').val();
         var time_use = $('#time_time_use').val();
         var date_prepared = $('#date_prepared').val();
         var material_lot_no = $('#txt_mat_lot_no').val();
         var actual_matl_use = $('#txt_actual_matl_use').val();
         var actual_time_matl_use = $('#time_actual_use').val();
         var material_code = $('#txt_material_code').val();
            
         //production_tbl
         var total_production = $('#txt_total_production').val();
         var date_process_start = $('#date_process_start').val();
         var date_process_finish = $('#date_process_finish').val();
         var lot_number = $('#txt_lot_number').val();
         var checked_by = $('#txt_check_by').val();
         var date_checked = $('#txt_check_date').val();
         var work_finish_qty = $('#txt_work_finish_qty').val();
         var mold_setup = After_Prod.mold_set_up_checksheet();

        var param_status = $("input[name='change_status']:checked").val(); //with ot without change
        var param_change = '';
        if(param_status=='without_change'){
         param_change = '0';
         }
         else{
             param_change = '1';
         }
         
        $.ajax({
            url:"reglist/finishedwithchange",
            type:"POST",
            data: {
                'mct_setting':arr_mct_setting,
                'clamp_eject':arr_clamp_eject,
                'cylinder_temp':arr_cylinder_temp,
                'inj_pack':arr_inj_pack,
                'measuring_condition':arr_measuring_condition,
                'id': $('.modal_view_data').attr('data-id'),
                'machine_no': $('.modal_view_data').attr('data-machine'),
                //raw mats
                'dryer_no':dryer_no,
                'time_in':time_in,
                'time_use':time_use,
                'date_prepared':date_prepared,
                'material_lot_no':material_lot_no,
                'actual_matl_use':actual_matl_use,
                'actual_time_matl_use':actual_time_matl_use,
                'material_code':material_code,
                //prod
                'total_production':total_production,
                'date_process_start':date_process_start,
                'date_process_finish':date_process_finish,
                'lot_number':lot_number,
                'checked_by':checked_by,
                'date_checked':date_checked,
                'work_finish_qty':work_finish_qty,
                'mold_set_up':mold_setup,
                'param_change':param_change,
                'btn_status':btn_status
                
            },
            success: function(data)
            {
                //console.log(data);
            
                    Swal.fire(
                        'Success!',
                        'Your record has been saved!',
                        'success'
                    );

            },
            error: function(data){
                
            }
        });
    }

    this_data.mold_set_up_checksheet = function(){

     $('#chk_input1').prop('checked');
     
        var mold_setup = [];

        mold_setup.push({
            "input_1":  $('#chk_input1').prop('checked'),
            "input_2":  $('#slc_input2').val(),
            "input_3":  $('#chk_input3').prop('checked'),
            "input_4":  $('#chk_input4').prop('checked'),
            "input_5":  $('#txt_input5').val(),
            "input_6":  $('#chk_input6').prop('checked'),
            "input_7":  $('#chk_input7').prop('checked'),
            "input_8":  $('#chk_input8').prop('checked'),
            "input_9":  $('#chk_input9').prop('checked')
            });
        return mold_setup;
    }

    this_data.SubmitDraft = function(){

        var param_status = $("input[name='change_status']:checked").val(); //with or without change
        if($('#slc_result').val()=='solved')
        {
            result = 'PROBLEM SOLVED!';
        }
        else
        {
            result = "PROBLEM STILL EXISTS!";
        }

        
        Swal.fire({
            title: 'Are you sure? ',
            html: "This will save your current changes to drafts",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Save as draft'
          }).then((result) => {
            if (result.value) 
            {
                if(param_status=="without_change")
                {
                    Swal.fire(
                        'ERROR!',
                        'Saving a draft record can only be accessible when parameter status is set to WITH CHANGE',
                        'error'
                    )
                    
                }
                else
                {
                    After_Prod.SaveDrafts();
                   
                }
            }
          })

    }

    this_data.SaveDrafts = function(){
        //console.log($('.modal_view_data').attr('data-id'));
         //raw_mats_hist
         var dryer_no = $('#txt_dryer_no').val();
         var time_in = $('#time_time_in').val();
         var time_use = $('#time_time_use').val();
         var date_prepared = $('#date_prepared').val();
         var material_lot_no = $('#txt_mat_lot_no').val();
         var actual_matl_use = $('#txt_actual_matl_use').val();
         var actual_time_matl_use = $('#time_actual_use').val();
         var material_code = $('#txt_material_code').val();
 
         //production_tbl
         var total_production = $('#txt_total_production').val();
         var date_process_start = $('#date_process_start').val();
         var date_process_finish = $('#date_process_finish').val();
         var lot_number = $('#txt_lot_number').val();
         var checked_by = $('#txt_check_by').val();
         var date_checked = $('#txt_check_date').val();
         var work_finish_qty = $('#txt_work_finish_qty').val();
         var mold_setup = After_Prod.mold_set_up_checksheet();
        // //console.log(" mct: "+arr_mct_setting+
        //             " clamp"+arr_clamp_eject+
        //             " cylinder: "+arr_cylinder_temp+
        //             " inj_pack: "+arr_inj_pack);

        var param_status = $("input[name='change_status']:checked").val(); //with ot without change
        var param_change = '';
        if(param_status=='without_change'){
         param_change = '0';
         }
         else{
             param_change = '1';
         }
         
        $.ajax({
            url:"reglist/drafts",
            type:"POST",
            data: {
                'mct_setting':arr_mct_setting,
                'clamp_eject':arr_clamp_eject,
                'cylinder_temp':arr_cylinder_temp,
                'inj_pack':arr_inj_pack,
                'measuring_condition':arr_measuring_condition,
                'id': $('.modal_view_data').attr('data-id'),
                'machine_no': $('.modal_view_data').attr('data-machine'),
                //raw mats
                'dryer_no':dryer_no,
                'time_in':time_in,
                'time_use':time_use,
                'date_prepared':date_prepared,
                'material_lot_no':material_lot_no,
                'actual_matl_use':actual_matl_use,
                'actual_time_matl_use':actual_time_matl_use,
                'material_code':material_code,
                //prod
                'total_production':total_production,
                'date_process_start':date_process_start,
                'date_process_finish':date_process_finish,
                'lot_number':lot_number,
                'checked_by':checked_by,
                'date_checked':date_checked,
                'work_finish_qty':work_finish_qty,
                'mold_set_up':mold_setup,
                'param_change':param_change
                
            },
            success: function(data)
            {
                //console.log(data);
                Swal.fire(
                    'Success!',
                    'Your record has been saved!',
                    'success'
                )

            },
            error: function(data){
                console.log(data);
            }
        });

    }
    return this_data;
})();



var Alarm = (function(){

    var this_data = {};

    this_data.CheckInput = function(id){
        base_orig = '.table td#original_condition ';
        base_adj = '.table td#adjusted_condition ';
        data=parseFloat($(base_orig+'#'+id).val());
        input=parseFloat($(base_adj+'#'+id).val());

        //console.log(input);
        percentage= data*.10;
        positive=data+percentage;
        negative = data-percentage;
        if(input>positive || input<negative)
        {
           Alarm.CheckAlarmRecord();
            
        }

    }

    this_data.CheckAlarmRecord = function(){

        var main_reg_id = $('.modal_view_data').attr('data-id');
        var parameter= $('#slc_parameter_setting').val();

        $.ajax({
            url:"alarm/checktbl",
            type:"POST",
            global:false,
            data: { 
                'main_register_id': main_reg_id,
                'parameter_setting':parameter
            },
            success: function(data){
                if(data=="false"){
                    $('.modal_alarm').modal('show');
                    var today = new Date();
                    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var dateTime = date+' '+time;

                    var main_reg_id = $('.modal_view_data').attr('data-id');
                    var parameter_setting = $('#slc_parameter_setting').val();
                    $.ajax({
                        url:"checktolerance",
                        type:"GET",
                        global:false,
                        data:{
                            'start_time': dateTime,
                            'main_reg_id':main_reg_id,
                            'parameter_setting':parameter_setting
                        },
                        success: function(data){
                            console.log('email sent');
                           
                            $('.modal_alarm').attr('data-start-time',dateTime)
                        },
                        error: function(data){
                            console.log(data);
                        }
                    });

                }
            },
            error: function(data)
            {
                //console.log(data);
            }
        });

    }
    
    this_data.CheckPICPassword = function(){

        var password = $('#pwd_PIC').val();
        var username = $('#txt_username').val();
        var main_reg_id = $('.modal_view_data').attr('data-id');
        var parameter= $('#slc_parameter_setting').val();
        // alert(password);

        $.ajax({
            url:"alarm/check_pwd",
            type:"POST",
            data: { 
                'password': password,
                'username':username,
                'main_reg_id':main_reg_id,
                'parameter': parameter
            },
            success: function(data){
            //    alert(data);
                if(data=="nomatch"){
                    /* Swal.fire({
                        title: 'ERROR!',
                        text: 'Incorrect Password or Invalid User Type. Please Try Again.',
                        type: 'error',
                        timer: 1500
                    }); */
                    $('.alert_error').css('display','block');
                    $('#pwd_PIC').val('');
                    $('#pwd_PIC').focus();
                }
                else{
                    
                    Swal.fire({
                        title: 'SUCCESS!',
                        text: 'System validated by the user:'+data+'. Record of approval is recorded.',
                        type: 'success',
                        timer: 1500
                    });
                    $('.alert_error').css('display','none');
                    $('.modal_alarm').modal('hide');
                    $('#pwd_PIC').val('');
                    $('#txt_username').val('');

                    var main_reg_id = $('.modal_view_data').attr('data-id');
                    var parameter_setting = $('#slc_parameter_setting').val();
                    $.ajax({
                        url:"alarm_dismiss",
                        type:"GET",
                        global:false,
                        data:{
                            'main_reg_id':main_reg_id,
                            'parameter_setting':parameter_setting,
                            'username': data
                        },
                        success: function(data){
                            console.log(data);
                           
                        },
                        error: function(data){
                            console.log(data);
                        }
                    });
                }
                
            },
            error: function(data)
            {
                console.log(data);
            }
        });
    }

    return this_data;
})();


var Check_Solve_Unsolve = (function(){

    var this_data = {};
    this_data.check_modal = function(){
        var  mct_setting_param = "false";
        var  clamp_eject_param = "false";
        var  cylinder_param = "false";
        var  inj_pack_param = "false";
        var  measuring_condition_param = "false";

        if(arr_mct_setting.length>0){
            mct_setting_param = "true";
        }
        if(arr_clamp_eject.length>0){
            clamp_eject_param = "true";
        }
        if(arr_cylinder_temp.length>0){
            cylinder_param = "true";
        }
        if(arr_inj_pack.length>0){
            inj_pack_param = "true";
        }
        if(arr_measuring_condition.length>0){
            measuring_condition_param = "true";
        }


            
        $.ajax({
            url:"alarm/check_pwd",
            type:"POST",
            data: { 
                'mct_setting_param': mct_setting_param,
                'clamp_eject_param':clamp_eject_param,
                'cylinder_param':cylinder_param,
                'inj_pack_param': inj_pack_param,
                'measuring_condition_param': measuring_condition_param,
            },
            success: function(data){
            
            },
            error:function(data){

            }
        });

    }
    
    return this_data;

})();



var reason = (function(){
    var this_data ={};


    this_data.add_reason = function(){
        var add_reason = $('#txt_other_reason').val();
        $.ajax({
            url:"reason/add",
            type:"POST",
            data: { 
                'add_reason': add_reason
            },
            success: function(data){
             
                // alert(data);
                Swal.fire({
                    title: 'SUCCESS',
                    text: add_reason+' was added to the reason adjustment options.',
                    type: 'success',
                    timer: 1500
                });
                $('#slc_reason_of_change').append($('<option>', {
                    value: data,
                    text: add_reason
                }));
                $('.select2').select2({width: '100%'});
                $('#slc_reason_of_change').val(data);
                $('#slc_reason_of_change').select2().trigger('change');
                $('.modal_reason').modal('hide');
                $('#txt_other_reason').val('');
            },
            error: function(data)
            {
                console.log(data);
            }
        });


    }
    return this_data;
})();


