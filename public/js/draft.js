


var Draft = (function(){

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
            "language": 
            {          
            "processing": " <div style='background:white'><i class='fa fa-refresh fa-spin'></i><br><b>Please wait for a moment..</b></div>",
            },
            "ajax": {
                url:"draft/datatable",
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
                        'onclick="Draft.ViewData('+"\'"+data+"\'"+','+"\'"+row['machine_id']+"\'"+','+"\'"+row['ctrl_no']
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
        Draft.loadSelectedDraft(id);
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
        $('#lbl_ctrl').html(ctrlno);
        $('#lbl_rev').html(rev_no);
        $('#lbl_mold').html(mold_no);
        $('#lbl_machine').html(machine_code);
        $('#lbl_draw_no').html(draw_no);
        $('#lbl_draw_name').html(draw_name);

    }
    
    this_data.loadSelectedDraft = function(id){

        var parameter_change = $('#slc_parameter_setting').val();
        
        $.ajax({
            url:"draft/draftdata",
            type:"POST",
            data: {
                'param': parameter_change,
                'id':id
            },
            success:function(data){
                var base_orig = '.table td#adjusted_condition';
                    // console.log(data);
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

            
                $('.table td#adjusted_condition .input_field').addClass('txt_warn');
            },
            error:function(data){
                console.log(data);
            },
            complete: function(data){
                Reg_List.With_or_Without_Change();
                Reg_List.check_array();
               
            }
        });
    }
    return this_data;
})();