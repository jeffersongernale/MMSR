
$(document).ready(function(){
    //UserMgmt.loadtable();
    $('.select2').select2({width: '100%'});
    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

});


var mold_restrict = (function(){

    var this_data = {};

    this_data.reg_loadtable = function(search='')
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
            "order": [[ 6, "desc" ]],
            "pageLength": 15,
            "scrollX":true,
            "scrollY":"500px",
            "language": 
            {          
            "processing": " <div style='background:white'><i class='fa fa-refresh fa-spin'></i><br><b>Please wait for a moment..</b></div>",
            },
            "ajax": {
                url:"mold_restrict/reg_datatable",
                type:"POST",
                data:{
                    'part_no': part_no,
                    'mold_no': mold_no,
                    'machine_no': machine_no
                }
            },
            
            "columns":[
                {
                    "width":"100%",
                    "data": "id",
                    "render": function ( data, type, row ) {
                        var btn =  '<button class="btn btn-primary btn-sm" title="View Data" '+
                        'onclick="mold_restrict.view_reg_list('+"\'"+data+"\'"+
                        ')">'+
                        '<i class="fa fa-eye"></i>&nbsp VIEW</button>&nbsp';
                        btn+='&nbsp&nbsp<button class="btn btn-danger btn-sm"'+
                        'onclick="mold_restrict.AddtoBlockList('+"\'"+data+"\'"+
                        ')">'+
                        '<i class="fa fa-exclamation-triangle"></i>&nbsp ADD TO BLOCKLIST</button>'
                      return btn;
                    }
                },
                {"data":"drawing_no"},
                {"data":"mold_no"},
                {"data":"machine_code"},
                {"data":"record_type"},
                {"data":"drawing_name"},
                {"data":"revision_no"},
                {"data":"updated_at"}
            ]
        });

    }

    this_data.block_loadtable = function(search='')
    {

       if(search!=""){
        $('#datatable_block').DataTable().destroy();
       }
       var part_no =  $('#slc_part_no_block').val();
       var mold_no =  $('#slc_mold_no_block').val();
       var machine_no =  $('#slc_machine_no_block').val();
       
       $('#datatable_block').DataTable({
            "processing":true,
            "serverSide":true,
            "searching":false,
            "order": [[ 6, "desc" ]],
            "pageLength": 15,
            "scrollX":true,
            "scrollY":"500px",
            "language": 
            {          
            "processing": " <div style='background:white'><i class='fa fa-refresh fa-spin'></i><br><b>Please wait for a moment..</b></div>",
            },
            "ajax": {
                url:"mold_restrict/block_datatable",
                type:"POST",
                data:{
                    'part_no': part_no,
                    'mold_no': mold_no,
                    'machine_no': machine_no
                }
            },
            
            "columns":[
                {
                    "width":"100%",
                    "data": "id",
                    "render": function ( data, type, row ) {
                        var btn =  '<button class="btn btn-primary btn-sm" title="View Data" '+
                        'onclick="mold_restrict.view_reg_list('+"\'"+data+"\'"+
                        ')">'+
                        '<i class="fa fa-eye"></i>&nbsp VIEW</button>&nbsp';
                        btn+='&nbsp&nbsp<button class="btn btn-danger btn-sm"'+
                        'onclick="mold_restrict.RemovetoBlockList('+"\'"+data+"\'"+
                        ')">'+
                        '<i class="fa fa-plus-square"></i>&nbsp REMOVE TO BLOCKLIST</button>'
                      return btn;
                    }
                },
                {"data":"drawing_no"},
                {"data":"mold_no"},
                {"data":"machine_code"},
                {"data":"record_type"},
                {"data":"drawing_name"},
                {"data":"revision_no"},
                {"data":"updated_at"}
            ]
        });
    }
    
    this_data.clear_search = function(module_name){

        

         if(module_name=="reglist"){
             
        $('#slc_part_no').val('');
        $('#slc_mold_no').val('');
         $('#slc_machine_no').val('');
         $('#slc_part_no').select2().trigger('change');
         $('#slc_mold_no').select2().trigger('change');
         $('#slc_machine_no').select2().trigger('change');

            mold_restrict.reg_loadtable('destroy');
         }
         else if(module_name=="blocklist"){
             
        $('#slc_part_no_block').val('');
        $('#slc_mold_no_block').val('');
         $('#slc_machine_no_block').val('');
         $('#slc_part_no_block').select2().trigger('change');
         $('#slc_mold_no_block').select2().trigger('change');
         $('#slc_machine_no_block').select2().trigger('change');

            mold_restrict.block_loadtable('destroy');
         }
         else{
             alert(module_name);
         }
    
    }

    this_data.AddtoBlockList = function(id){

        Swal.fire({
            title: 'Are you sure?',
            html: "This record will be moved to blocklist and will <b>NOT</b> appear in the registered list!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Add to BlockList!'
          }).then((result) => {
            if (result.value) {
                $.ajax({
                    url:"mold_restrict/addtoblocklist",
                    type:"POST",
                    data: {
                        
                        'id':id
                    },
                    success:function(data){
        
                        if(data=="true"){
                            Swal.fire({
                                type: 'success',
                                title:  'SUCCESS',
                                text: 'Added to blocklist',
                                timer: 1500
                              });

                        }
                        else{
                            Swal.fire({
                                type: 'error',
                                title:  'ERROR',
                                text:  'Ooops! Something went wrong. Please try again.',
                                timer: 1500
                              });
                        }
                        
                        mold_restrict.reg_loadtable('destroy');
                        mold_restrict.block_loadtable('destroy');
                    },
                    error:function(data){
                        console.log(data);
                    }
                });
                
            }
          })

        


    }

    this_data.RemovetoBlockList = function(id){

        Swal.fire({
            title: 'Are you sure?',
            text: "This record will be removed to blocklist and will appear in the registered list!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Remove to BlockList!'
          }).then((result) => {
            if (result.value) {
                $.ajax({
                    url:"mold_restrict/removetoblocklist",
                    type:"POST",
                    data: {
                        
                        'id':id
                    },
                    success:function(data){
                        if(data=="true"){

                            Swal.fire({
                                type: 'success',
                                title:  'SUCCESS',
                                text: 'Removed to blocklist',
                                timer: 1500
                              });

                        }
                        else{
                            Swal.fire({
                                type: 'error',
                                title:  'ERROR',
                                text:  'Ooops! Something went wrong. Please try again.',
                                timer: 1500
                              });
                        }
                        mold_restrict.reg_loadtable('destroy');
                        mold_restrict.block_loadtable('destroy');
                    },
                    error:function(data){
                        console.log(data);
                    }
                });
                
            }
          })



      


    }

    this_data.view_reg_list = function(id){

        $('.modal_view_data').modal('show');
        mold_restrict.load_reg_data(id);
    }

    this_data.load_reg_data = function(id){
        $.ajax({
            url:"mold_restrict/view_reg_data",
            type:"POST",
            data: {
                
                'main_register_id':id
            },
            success:function(data){

               console.log(data);

             //main_reg_details
             $('#txt_drawing_no').val(data.record_info[0].drawing_no);
             $('#txt_machine_no').val(data.record_info[0].machine_id);
             $('#txt_matl_name').val(data.record_info[0].matl_name);
             $('#txt_resin_temp').val(data.record_info[0].resin_temp);
             $('#txt_rev_no').val(data.record_info[0].revision_no);
             $('#txt_machine_tonnage').val(data.record_info[0].machine_ton);
             $('#txt_matl_grade').val(data.record_info[0].matl_grade);
             $('#txt_drying_temp').val(data.record_info[0].drying_temp);
             $('#txt_drawing_name').val(data.record_info[0].drawing_name);
             $('#txt_color_no').val(data.record_info[0].color_no);
             $('#txt_matl_color').val(data.record_info[0].matl_color);
             $('#txt_drying_hrs').val(data.record_info[0].drying_hrs);

               //mold die basic information
               $('#txt_die_type').val(data.record_info[0].die_type_id);
               $('#txt_number_cav').val(data.record_info[0].no_cavity);
               $('#txt_mold_number').val(data.record_info[0].mold_no);
               $('#txt_number_good_cav').val(data.record_info[0].no_good_cavity);
               $('#txt_related_items').val(data.record_info[0].related_items);
               $('#txt_mold_location').val(data.record_info[0].mold_location);

               //prod_SPQ
               $('#txt_product_size').val(data.record_info[0].product_size);
               $('#txt_packaging_class').val(data.record_info[0].packaging_class);
               $('#txt_quantity_per_bag').val(data.record_info[0].qty_per_bag);
               $('#txt_pcase_max_qty').val(data.record_info[0].pcase_max_qty);
               $('#txt_remarks').val(data.record_info[0].remarks);

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

               mold_restrict.Percentage_pn_on_load('txt_before_OLFO_POS','lbl_before_neg_OLFO_POS','lbl_before_pos_OLFO_POS');
               mold_restrict.Percentage_pn_on_load('txt_before_OLFO_VEL','lbl_before_neg_OLFO_VEL','lbl_before_pos_OLFO_VEL');
               mold_restrict.Percentage_pn_on_load('txt_before_CS1_POS','lbl_before_neg_CS1_POS','lbl_before_pos_CS1_POS');
               mold_restrict.Percentage_pn_on_load('txt_before_CS1_VEL','lbl_before_neg_CS1_VEL','lbl_before_pos_CS1_VEL');
               mold_restrict.Percentage_pn_on_load('txt_before_CSMP_POS','lbl_before_neg_CSMP_POS','lbl_before_pos_CSMP_POS');
               mold_restrict.Percentage_pn_on_load('txt_before_CSMP_VEL','lbl_before_neg_CSMP_VEL','lbl_before_pos_CSMP_VEL');
               mold_restrict.Percentage_pn_on_load('txt_before_CST_POS','lbl_before_neg_CST_POS','lbl_before_pos_CST_POS');
               mold_restrict.Percentage_pn_on_load('txt_before_MPPT_POS','lbl_before_neg_MPPT_POS','lbl_before_pos_MPPT_POS');
               mold_restrict.Percentage_pn_on_load('txt_before_BB_VEL','lbl_before_neg_BB_VEL','lbl_before_pos_BB_VEL');
               mold_restrict.Percentage_pn_on_load('txt_before_O1_POS','lbl_before_neg_O1_POS','lbl_before_pos_O1_POS');
               mold_restrict.Percentage_pn_on_load('txt_before_O1_VEL','lbl_before_neg_O1_VEL','lbl_before_pos_O1_VEL');
               mold_restrict.Percentage_pn_on_load('txt_before_O2_POS','lbl_before_neg_O2_POS','lbl_before_pos_O2_POS');
               mold_restrict.Percentage_pn_on_load('txt_before_O2_VEL','lbl_before_neg_O2_VEL','lbl_before_pos_O2_VEL');
               mold_restrict.Percentage_pn_on_load('txt_before_FOFO_POS','lbl_before_neg_FOFO_POS','lbl_before_pos_FOFO_POS');
               mold_restrict.Percentage_pn_on_load('txt_before_ESES_POS','lbl_before_neg_ESES_POS','lbl_before_pos_ESES_POS');
               mold_restrict.Percentage_pn_on_load('txt_before_FWD_POS','lbl_before_neg_FWD_POS','lbl_before_pos_FWD_POS');
               mold_restrict.Percentage_pn_on_load('txt_before_FWD_VEL','lbl_before_neg_FWD_VEL','lbl_before_pos_FWD_VEL');
               mold_restrict.Percentage_pn_on_load('txt_before_FWD_DWELL','lbl_before_neg_FWD_DWELL','lbl_before_pos_FWD_DWELL');
               mold_restrict.Percentage_pn_on_load('txt_before_ADV_POS','lbl_before_neg_ADV_POS','lbl_before_pos_ADV_POS');
               mold_restrict.Percentage_pn_on_load('txt_before_ADV_VEL','lbl_before_neg_ADV_VEL','lbl_before_pos_ADV_VEL');
               mold_restrict.Percentage_pn_on_load('txt_before_ADV_DWELL','lbl_before_neg_ADV_DWELL','lbl_before_pos_ADV_DWELL');
               mold_restrict.Percentage_pn_on_load('txt_before_REV_POS','lbl_before_neg_REV_POS','lbl_before_pos_REV_POS');
               mold_restrict.Percentage_pn_on_load('txt_before_REV_VEL','lbl_before_neg_REV_VEL','lbl_before_pos_REV_VEL');
               mold_restrict.Percentage_pn_on_load('txt_before_REV_DWELL','lbl_before_neg_REV_DWELL','lbl_before_pos_REV_DWELL');

                 //cylinder_temp
               $('#txt_before_Nozzle').val(data.cylinder_temp[0].nozzle);
               $('#txt_before_Barrel1').val(data.cylinder_temp[0].barrel1);
               $('#txt_before_Barrel2').val(data.cylinder_temp[0].barrel2);
               $('#txt_before_Barrel3').val(data.cylinder_temp[0].barrel3);
               $('#txt_before_Feed_Throat').val(data.cylinder_temp[0].feed_throat);

               mold_restrict.Percentage_pn_on_load('txt_before_Nozzle','lbl_before_neg_Nozzle','lbl_before_pos_Nozzle','lbl_before_tol_Nozzle');
               mold_restrict.Percentage_pn_on_load('txt_before_Barrel1','lbl_before_neg_Barrel1','lbl_before_pos_Barrel1','lbl_before_tol_Barrel1');
               mold_restrict.Percentage_pn_on_load('txt_before_Barrel2','lbl_before_neg_Barrel2','lbl_before_pos_Barrel2','lbl_before_tol_Barrel2');
               mold_restrict.Percentage_pn_on_load('txt_before_Barrel3','lbl_before_neg_Barrel3','lbl_before_pos_Barrel3','lbl_before_tol_Barrel3');
               mold_restrict.Percentage_pn_on_load('txt_before_Feed_Throat','lbl_before_neg_Feed_Throat','lbl_before_pos_Feed_Throat','lbl_before_tol_Feed_Throat');


                //inj_pack
                var inj_pack_json = JSON.parse(data.inj_pack_setting[0].injection_step);
                var html_inj_pack = '';
                $('table #injection_step_tbl_before').html('');
                for(b = 0; b<inj_pack_json.length;b++)
                {
                    html_inj_pack='<tr>'+
                                    '<td>'+(b+1)+'</td>'+
                                    '<td>'+
                                    '<label  id="lbl_before_Inj_Step'+(b+1)+'" class="col-sm-4 control-label">0</label>'+
                                    '<input readonly id="txt_before_Inj_Step'+(b+1)+'" class="col-sm-4   input_field" type="text"'+
                                    ' placeholder="Input Here.." value="'+inj_pack_json[b].Inj_Step+'" style="width: 60px;">'+
                                    '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm/s</label>'+
                                    '</td>'+
                                    '<td>'+
                                    ' <label  id="lbl_before_IStep'+(b+1)+'" class="col-sm-4 control-label">0</label>'+
                                    '<input readonly id="txt_before_IStep'+(b+1)+'" class="col-sm-4   input_field" type="text" '+
                                    ' placeholder="Input Here.." value="'+inj_pack_json[b].IStep+'"  style="width: 60px;">'
                                    '<label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm</label>'+
                                    '</td>'+
                                    '</tr>';
                   
                   
                                    $('table #injection_step_tbl_before').append(html_inj_pack);
                                    mold_restrict.Percentage_pn_on_load('txt_before_Inj_Step'+(b+1),'','','lbl_before_Inj_Step'+(b+1));
                                    mold_restrict.Percentage_pn_on_load('txt_before_IStep'+(b+1),'','','lbl_before_IStep'+(b+1));
                    
                }
                
                
                $('#txt_before_Inj_step').val(data.inj_pack_setting[0].inj_step_mid);
                $('#txt_before_Max_Inj_Pres').val(data.inj_pack_setting[0].max_inj_pressure);
                $('#txt_before_Act_Inj_Pres').val(data.inj_pack_setting[0].actual_pressure);
                $('#txt_before_Max_Inj_Time').val(data.inj_pack_setting[0].max_inj_time);
                $('#txt_before_Act_Time').val(data.inj_pack_setting[0].actual_time);
                $('#txt_before_Max_Pack_Velo').val(data.inj_pack_setting[0].max_pack_velo);
                $('#txt_before_POS_Trans').val(data.inj_pack_setting[0].pos_trans);
                $('#txt_before_Pack_step').val(data.inj_pack_setting[0].pack_step_mid);

                mold_restrict.Percentage_pn_on_load('txt_before_Max_Inj_Pres','','','lbl_before_Max_Inj_Pres');
                mold_restrict.Percentage_pn_on_load('txt_before_Max_Inj_Time','','','lbl_before_Max_Inj_Time');
                mold_restrict.Percentage_pn_on_load('txt_before_Max_Pack_Velo','','','lbl_before_Max_Pack_Velo');
                mold_restrict.Percentage_pn_on_load('txt_before_POS_Trans','','','lbl_before_POS_Trans');

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
                                    mold_restrict.Percentage_pn_on_load('txt_before_Pack_Step'+c,'','','lbl_before_Pack_Step'+c);
                                    mold_restrict.Percentage_pn_on_load('txt_before_PStep'+c,'','','lbl_before_PStep'+c);
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
                   mold_restrict.Percentage_pn_on_load('txt_before_Ext_kg'+d,'','','lbl_before_Ext_kg'+d);
                   mold_restrict.Percentage_pn_on_load('txt_before_Ext_rpm'+d,'','','lbl_before_Ext_rpm'+d);
                   mold_restrict.Percentage_pn_on_load('txt_before_Ext_mm'+d,'','','lbl_before_Ext_mm'+d);
               }

               $('#txt_before_Mcushion').val(data.measuring_condition_setting[0].m_cushion);
               $('#txt_before_Shot_Size').val(data.measuring_condition_setting[0].shot_size);
               $('#txt_before_Dcmp_Dist').val(data.measuring_condition_setting[0].dcmp_dist);
               $('#txt_before_Dcmp_Vel').val(data.measuring_condition_setting[0].dcmp_vel);
               $('#txt_before_Cool_Time').val(data.measuring_condition_setting[0].cool_time);

               mold_restrict.Percentage_pn_on_load('txt_before_Mcushion','','','lbl_before_mcushion');
               mold_restrict.Percentage_pn_on_load('txt_before_Shot_Size','','','lbl_before_shot_size');
               mold_restrict.Percentage_pn_on_load('txt_before_Dcmp_Dist','','','lbl_before_Dcmp_Dist');
               mold_restrict.Percentage_pn_on_load('txt_before_Dcmp_Vel','','','lbl_before_Dcmp_Vel');
               mold_restrict.Percentage_pn_on_load('txt_before_Cool_Time','','','lbl_before_Cool_Time');

                
            },
            error:function(data){
                console.log(data);
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