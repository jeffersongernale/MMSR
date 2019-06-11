
var max_pweight = 0;

var Setup_Logs = (function(){

    var this_data = {};

    this_data.loadtable = function()
    {
        
        $.ajax({
            url:"setup_logs/datatable",
            type:"POST",
            data: {

                
            },
            success:function(data){
                console.log(data)
                var tbl = '';
                var tbl_head1 = '';
                var tbl_head2 = '';
                var pweight_head = ''
                // console.log(data);
                var ctr = 1;

                tbl_head1 = '<table class="table table-sm table-hover text-center table-bordered" id="datatable">'+
                '<thead>'+
                    '<tr  id="tbl_header">'+
                        '<th class="text-nowrap">DRAWING NO</th>'+
                        '<th class="text-nowrap">REVISION NO</th>'+
                        '<th class="text-nowrap">DRAWING NAME</th>'+
                        '<th class="text-nowrap">MACHINE NO</th>'+
                        '<th class="text-nowrap">MACHINE TONNAGE</th>'+
                        '<th class="text-nowrap">COLOR NO</th>'+
                        '<th class="text-nowrap">MATERIAL NAME</th>'+
                        '<th class="text-nowrap">MATERIAL GRADE</th>'+
                        '<th class="text-nowrap">MATERIAL COLOR</th>'+
                        '<th class="text-nowrap">RESIN TEMPERATURE</th>'+
                        '<th class="text-nowrap">DRYING TEMPERATURE</th>'+
                        '<th class="text-nowrap">DRYING HOURS</th>'+
                        '<th class="text-nowrap">DIE TYPE</th>'+
                        '<th class="text-nowrap">FAMILY MOLD</th>'+
                        '<th class="text-nowrap">MOLD NO</th>'+
                        '<th class="text-nowrap">NO OF CAVITY</th>'+
                        '<th class="text-nowrap">NO OF GOOD CAVITY</th>'+
                        '<th class="text-nowrap">MOLD LOCATION</th>'+
                        '<th class="text-nowrap">RECORD TYPE</th>'+
                        '<th class="text-nowrap">DATE</th>'+
                        '<th class="text-nowrap">CONTROL NO</th>'+
                        '<th class="text-nowrap">DIE TEMP CORE</th>'+
                        '<th class="text-nowrap">DIE TEMP CAVITY</th>'+
                        '<th class="text-nowrap">MOLD TEMP CTRL</th>'+
                        '<th class="text-nowrap">MC CYCLE TIME</th>';
                        pweight_head = '<th style="width: 500px" class="text-nowrap">PRODUCT WEIGHT</th>';
                        tbl_head1+='<th class="text-nowrap">SPRUE WEIGHT</th>'+
                        '<th class="text-nowrap">SUB PART WEIGHT</th>'+
                        '<th class="text-nowrap">ADDITIONAL CYCLE TIME</th>'+

                        '<th class="text-nowrap">OPEN_LIMIT_FULLOPEN_POS</th>'+
                        '<th class="text-nowrap">CLOSE SW 1 POS</th>'+
                        '<th class="text-nowrap">CloseSLOW_Mold PRTCT_POS</th>'+
                        '<th class="text-nowrap">CloseSP_Touch_POS</th>'+
                        '<th class="text-nowrap">PRTCT_TOQ_POS(%)</th>'+
                        '<th class="text-nowrap">Open_1st_1_POS</th>'+
                        '<th class="text-nowrap">Open_2nd_2_POS</th>'+
                        '<th class="text-nowrap">Full_Open_Pos</th>'+
                        '<th class="text-nowrap">Eject_Start_POS</th>'+
                        '<th class="text-nowrap">FullOpen_VEL</th>'+
                        '<th class="text-nowrap">Close_SW_1_VEL</th>'+
                        '<th class="text-nowrap">Mold_PRTCT_VEL</th>'+
                        '<th class="text-nowrap">BREAKAWAY_VEL</th>'+
                        '<th class="text-nowrap">Open_1st_1_VEL</th>'+
                        '<th class="text-nowrap">Open_2st_2_VEL</th>'+
                        '<th class="text-nowrap">Pulses</th>'+
                        '<th class="text-nowrap">FORWARD/PWD POS</th>'+
                        '<th class="text-nowrap">STOP/ADV.MID POS</th>'+
                        '<th class="text-nowrap">REVERSE POS</th>'+
                        '<th class="text-nowrap">FORWARD/PWD VEL</th>'+
                        '<th class="text-nowrap">STOP/ADV.MID VEL</th>'+
                        '<th class="text-nowrap">REVERSE VEL</th>'+
                        '<th class="text-nowrap">FORWARD/PWD DWELL</th>'+
                        '<th class="text-nowrap">STOP/ADV.MID DWELL</th>'+
                        '<th class="text-nowrap">REVERSE DWELL</th>'+
                        '<th class="text-nowrap">EJECTOR DELAY</th>'+
                        '<th class="text-nowrap">AUTO DIE</th>'+
                        
                        
                        '</tr>'+
                '</thead>'+
                '<tbody id="setup_tbl1">'+
                '</tbody>'+
                '</table>';

                $('#setup_tbl_cont').html(tbl_head1);
                pweight_head = '';
                $.each(data,function(key,value){
                    // console.log('key:'+key+' value: '+value.mct_setting_relation.die_temp_cavity+'--');

                tbl +=   '<tr class="before_tr">'+
                        '<td rowspan="2">'+value.drawing_no+'</td>'+
                        '<td rowspan="2">'+value.revision_no+'</td>'+
                        '<td rowspan="2">'+value.drawing_name+'</td>'+
                        '<td rowspan="2">'+value.machine_code+'</td>'+
                        '<td rowspan="2">'+value.machine_ton+'</td>'+
                        '<td rowspan="2">'+value.color_no+'</td>'+
                        '<td rowspan="2">'+value.matl_name+'</td>'+
                        '<td rowspan="2">'+value.matl_grade+'</td>'+
                        '<td rowspan="2">'+value.matl_color+'</td>'+
                        '<td rowspan="2">'+value.resin_temp+'</td>'+
                        '<td rowspan="2">'+value.drying_temp+'</td>'+
                        '<td rowspan="2">'+value.drying_hrs+'</td>'+
                        '<td rowspan="2">'+value.die_type+'</td>'+
                        '<td rowspan="2">'+value.related_items+'</td>'+
                        '<td rowspan="2">'+value.mold_no+'</td>'+
                        '<td rowspan="2">'+value.no_cavity+'</td>'+
                        '<td rowspan="2">'+value.no_good_cavity+'</td>'+
                        '<td rowspan="2">'+value.mold_location+'</td>';
                        
                        // tbl+='<td>AFTER</td>'+
                        // '<td class="text-nowrap">'+value.control_no_relation.created_at+'</td>'+
                        // '<td>'+value.control_no_relation.ctrl_no+'</td>'+
                        // '<td id="input_die_temp_after_'+ctr+'">'+value.mct_setting_relation.die_temp_core+'</td>'+
                        // '<td id="input_dt_cavity_after_'+ctr+'">'+value.mct_setting_relation.die_temp_cavity+'</td>'+
                        // '<td id="input_mold_ctrl_after_'+ctr+'">'+value.mct_setting_relation.mold_temp_control+'</td>'+
                        // '<td  class="text-nowrap"  id="input_mc_ct_after_'+ctr+'">'+value.product_info_relation.machine_cycle_time+'</td>';
                        // var pweight_json = JSON.parse(value.product_info_relation.product_weight)
                        // var ctr2 = 1;
                        
                        // $.each(pweight_json,function(key,value){
                        //     // console.log(value.x);
                        //     if(max_pweight < pweight_json.length){
                        //         for(x=1; x<= pweight_json.length;x++){
                        //             pweight_head += '<th style="width: 500px" class="text-nowrap">PRODUCT WEIGHT'+x+'</th>';
                        //         }
                        //         max_pweight = pweight_json.length;
                        //     }
                        //     tbl+='<td width="200" id="input_pweight_after_'+ctr+'_'+ctr2+'">'+value.x+'</td>';
                        //     ctr2+=1;
                            
                        // });

                        
                        //     var for_ctr = max_pweight - pweight_json.length;
                        //     for(a = 1; a <= for_ctr;a++){
                        //         tbl+='<td width="200" id="input_pweight_after_'+ctr+'_'+ctr2+'">-</td>';
                        //     }
                     
                        
                        // tbl+='<td id="input_sprue_weight_after_'+ctr+'">'+value.product_info_relation.sprue_weight+'</td>'+
                        // '<td id="input_subpart_weight_after_'+ctr+'">'+value.product_info_relation.sub_part_weight+'</td>'+
                        // '<td id="input_add_ct_after_'+ctr+'">'+value.product_info_relation.additional_cycle_time+'</td>';
                        Setup_Logs.get_before_data(value.main_register_id,tbl,ctr,value); 
                        ctr+=1;
                        tbl = '';
                      

                })
                
                
                
            },
            
            error: function (data) {
                console.log(data);
            }
        })
      
    }

    this_data.get_before_data = function(main_register_id,tbl,ctr,value1){
        pweight_head = '';

        $.ajax({
            url:"setup_logs/before_data",
            type:"POST",
            data: {

                'main_register_id': main_register_id
            },
            success:function(data){
                
              
                
                
                    // console.log('key:'+key+' value: '+value.mct_setting_relation.die_temp_cavity+'--');
                    // console.log(data.ctrl_no);
                    tbl+='<td>BEFORE</td>'+
                            '<td class="text-nowrap">'+data.ctrl_no.created_at+'</td>'+
                            '<td>'+data.ctrl_no.ctrl_no+'</td>'+
                            '<td id="input_die_temp_before_'+ctr+'">'+data.mct_setting[0].die_temp_core+'</td>'+
                            '<td id="input_dt_cavity_before_'+ctr+'">'+data.mct_setting[0].die_temp_cavity+'</td>'+
                            '<td id="input_mold_ctrl_before_'+ctr+'">'+data.mct_setting[0].mold_temp_control+'</td>'+
                            '<td class="text-nowrap"  id="input_mc_ct_before_'+ctr+'">'+data.product_info[0].machine_cycle_time+'</td>';
                            
                    /* var pweight_json = JSON.parse(data.product_info[0].product_weight)
                    var ctr2 = 1;
                    pweight_head = '';
                    $.each(pweight_json,function(key,value){
                        if(max_pweight < pweight_json.length){
                            for(x=max_pweight; x< pweight_json.length;x++){
                                pweight_head += '<th style="width: 500px" class="text-nowrap">PRODUCT WEIGHT'+(x+1)+'</th>';
                            }
                            max_pweight = pweight_json.length;
                          
                        }
                    });
                   
                    $.each(pweight_json,function(key,value){
                        // console.log(value.x);
                       
                        tbl+='<td width="200" id="input_pweight_after_'+ctr+'_'+ctr2+'">'+value.x+'</td>';
                        ctr2+=1;
                     
                    });

                    
                    var for_ctr = max_pweight - pweight_json.length;
                    for(a = 1; a <= for_ctr;a++){
                        tbl+='<td width="200" id="input_pweight_after_'+ctr+'_'+ctr2+'">-</td>';
                    }

                    tbl+="</tr>"; */
                   
                    tbl+='<td id="input_sprue_weight_after_'+ctr+'">'+data.product_info[0].sprue_weight+'</td>'+
                    '<td id="input_subpart_weight_after_'+ctr+'">'+data.product_info[0].sub_part_weight+'</td>'+
                    '<td id="input_add_ct_after_'+ctr+'">'+data.product_info[0].additional_cycle_time+'</td>'+

                    '<td id="input_die_temp_before_'+ctr+'">'+data.clamping_ejecting_setting[0].open_limit_POS+'</td>'+
                    '<td id="input_dt_cavity_before_'+ctr+'">'+data.clamping_ejecting_setting[0].close_sw_POS+'</td>'+
                    '<td id="input_mold_ctrl_before_'+ctr+'">'+data.clamping_ejecting_setting[0].close_slow_POS+'</td>'+
                    
                    '<td id="input_die_temp_before_'+ctr+'">'+data.clamping_ejecting_setting[0].close_sp_POS+'</td>'+
                    '<td id="input_dt_cavity_before_'+ctr+'">'+data.clamping_ejecting_setting[0].mold_prtct_POS+'</td>'+
                    '<td id="input_mold_ctrl_before_'+ctr+'">'+data.clamping_ejecting_setting[0].open1_POS+'</td>'+
                    '<td id="input_die_temp_before_'+ctr+'">'+data.clamping_ejecting_setting[0].open2_POS+'</td>'+
                    '<td id="input_dt_cavity_before_'+ctr+'">'+data.clamping_ejecting_setting[0].full_open_POS+'</td>'+
                    '<td id="input_mold_ctrl_before_'+ctr+'">'+data.clamping_ejecting_setting[0].eject_start_POS+'</td>'+
                    '<td id="input_die_temp_before_'+ctr+'">'+data.clamping_ejecting_setting[0].open_limit_VEL+'</td>'+
                    '<td id="input_dt_cavity_before_'+ctr+'">'+data.clamping_ejecting_setting[0].close_sw_VEL+'</td>'+
                    '<td id="input_mold_ctrl_before_'+ctr+'">'+data.clamping_ejecting_setting[0].close_slow_VEL+'</td>'+
                    '<td id="input_die_temp_before_'+ctr+'">'+data.clamping_ejecting_setting[0].breakaway_VEL+'</td>'+
                    '<td id="input_dt_cavity_before_'+ctr+'">'+data.clamping_ejecting_setting[0].open1_VEL+'</td>'+
                    '<td id="input_mold_ctrl_before_'+ctr+'">'+data.clamping_ejecting_setting[0].open2_VEL+'</td>'+
                    
                    '<td id="input_mold_ctrl_before_'+ctr+'">'+data.clamping_ejecting_setting[0].pulses+'</td>'+
                    '<td id="input_die_temp_before_'+ctr+'">'+data.clamping_ejecting_setting[0].FWD_POS+'</td>'+
                    '<td id="input_dt_cavity_before_'+ctr+'">'+data.clamping_ejecting_setting[0].ADV_POS+'</td>'+
                    '<td id="input_mold_ctrl_before_'+ctr+'">'+data.clamping_ejecting_setting[0].REV_POS+'</td>'+
                    '<td id="input_die_temp_before_'+ctr+'">'+data.clamping_ejecting_setting[0].FWD_VEL+'</td>'+
                    '<td id="input_dt_cavity_before_'+ctr+'">'+data.clamping_ejecting_setting[0].ADV_VEL+'</td>'+
                    '<td id="input_mold_ctrl_before_'+ctr+'">'+data.clamping_ejecting_setting[0].REV_VEL+'</td>'+
                    '<td id="input_die_temp_before_'+ctr+'">'+data.clamping_ejecting_setting[0].FWD_DWELL+'</td>'+
                    '<td id="input_dt_cavity_before_'+ctr+'">'+data.clamping_ejecting_setting[0].ADV_DWELL+'</td>'+
                    '<td id="input_mold_ctrl_before_'+ctr+'">'+data.clamping_ejecting_setting[0].REV_DWELL+'</td>'+
                    
                    '<td id="input_dt_cavity_before_'+ctr+'">'+data.clamping_ejecting_setting[0].ejector_delay+'</td>'+
                    '<td id="input_mold_ctrl_before_'+ctr+'">'+data.clamping_ejecting_setting[0].auto_die_height+'</td>';

                    '</tr>'; 
                            
                Setup_Logs.get_after_data(tbl,ctr,value1,max_pweight,pweight_head);
                Setup_Logs.check_changes();
                
                 
            
                
            },
            error: function (data) {
                console.log(data);
            }
        })

        
        
    }

    this_data.get_after_data = function(tbl,ctr,value,max_pweight,pweight_head){
       
        // console.log(value);
        // var max_pweight = 0;
        var pweight_json = JSON.parse(value.product_info_relation.product_weight)

        tbl+='<tr><td>AFTER</td>'+
                        '<td class="text-nowrap">'+value.control_no_relation.created_at+'</td>'+
                        '<td>'+value.control_no_relation.ctrl_no+'</td>'+
                        '<td id="input_die_temp_after_'+ctr+'">'+value.mct_setting_relation.die_temp_core+'</td>'+
                        '<td id="input_dt_cavity_after_'+ctr+'">'+value.mct_setting_relation.die_temp_cavity+'</td>'+
                        '<td id="input_mold_ctrl_after_'+ctr+'">'+value.mct_setting_relation.mold_temp_control+'</td>'+
                        '<td  class="text-nowrap"  id="input_mc_ct_after_'+ctr+'">'+value.product_info_relation.machine_cycle_time+'</td>';

                        /* var pweight_json = JSON.parse(value.product_info_relation.product_weight)
                        var ctr2 = 1;
                        //  $.each(pweight_json,function(key,value){
                        //     if(max_pweight < pweight_json.length){
                        //         for(x=1; x<= pweight_json.length;x++){
                        //             pweight_head += '<th style="width: 500px" class="text-nowrap">PRODUCT WEIGHT'+x+'</th>';
                        //         }
                        //         max_pweight = pweight_json.length;
                               
                        //     }
                        //  });
                        $.each(pweight_json,function(key,value){
                            // console.log(value.x);
                           
                            tbl+='<td width="200" id="input_pweight_after_'+ctr+'_'+ctr2+'">'+value.x+'</td>';
                            ctr2+=1;
                         
                        });

                        

                            var for_ctr = max_pweight - pweight_json.length;
                            // alert(for_ctr);
                            for(a = 1; a <= for_ctr;a++){
                                tbl+='<td width="200" id="input_pweight_after_'+ctr+'_'+ctr2+'">-</td>';
                            }
                      */
                        
                        tbl+='<td id="input_sprue_weight_after_'+ctr+'">'+value.product_info_relation.sprue_weight+'</td>'+
                        '<td id="input_subpart_weight_after_'+ctr+'">'+value.product_info_relation.sub_part_weight+'</td>'+
                        '<td id="input_add_ct_after_'+ctr+'">'+value.product_info_relation.additional_cycle_time+'</td>'+
                        '<td id="input_die_temp_before_'+ctr+'">'+value.clamp_eject_relation.open_limit_POS+'</td>'+
                        '<td id="input_dt_cavity_before_'+ctr+'">'+value.clamp_eject_relation.close_sw_POS+'</td>'+
                        '<td id="input_mold_ctrl_before_'+ctr+'">'+value.clamp_eject_relation.close_slow_POS+'</td>'+
                        
                        '<td id="input_die_temp_before_'+ctr+'">'+value.clamp_eject_relation.close_sp_POS+'</td>'+
                        '<td id="input_dt_cavity_before_'+ctr+'">'+value.clamp_eject_relation.mold_prtct_POS+'</td>'+
                        '<td id="input_mold_ctrl_before_'+ctr+'">'+value.clamp_eject_relation.open1_POS+'</td>'+
                        '<td id="input_die_temp_before_'+ctr+'">'+value.clamp_eject_relation.open2_POS+'</td>'+
                        '<td id="input_dt_cavity_before_'+ctr+'">'+value.clamp_eject_relation.full_open_POS+'</td>'+
                        '<td id="input_mold_ctrl_before_'+ctr+'">'+value.clamp_eject_relation.eject_start_POS+'</td>'+
                        '<td id="input_die_temp_before_'+ctr+'">'+value.clamp_eject_relation.open_limit_VEL+'</td>'+
                        '<td id="input_dt_cavity_before_'+ctr+'">'+value.clamp_eject_relation.close_sw_VEL+'</td>'+
                        '<td id="input_mold_ctrl_before_'+ctr+'">'+value.clamp_eject_relation.close_slow_VEL+'</td>'+
                        '<td id="input_die_temp_before_'+ctr+'">'+value.clamp_eject_relation.breakaway_VEL+'</td>'+
                        '<td id="input_dt_cavity_before_'+ctr+'">'+value.clamp_eject_relation.open1_VEL+'</td>'+
                        '<td id="input_mold_ctrl_before_'+ctr+'">'+value.clamp_eject_relation.open2_VEL+'</td>'+
                        
                        '<td id="input_mold_ctrl_before_'+ctr+'">'+value.clamp_eject_relation.pulses+'</td>'+
                        '<td id="input_die_temp_before_'+ctr+'">'+value.clamp_eject_relation.FWD_POS+'</td>'+
                        '<td id="input_dt_cavity_before_'+ctr+'">'+value.clamp_eject_relation.ADV_POS+'</td>'+
                        '<td id="input_mold_ctrl_before_'+ctr+'">'+value.clamp_eject_relation.REV_POS+'</td>'+
                        '<td id="input_die_temp_before_'+ctr+'">'+value.clamp_eject_relation.FWD_VEL+'</td>'+
                        '<td id="input_dt_cavity_before_'+ctr+'">'+value.clamp_eject_relation.ADV_VEL+'</td>'+
                        '<td id="input_mold_ctrl_before_'+ctr+'">'+value.clamp_eject_relation.REV_VEL+'</td>'+
                        '<td id="input_die_temp_before_'+ctr+'">'+value.clamp_eject_relation.FWD_DWELL+'</td>'+
                        '<td id="input_dt_cavity_before_'+ctr+'">'+value.clamp_eject_relation.ADV_DWELL+'</td>'+
                        '<td id="input_mold_ctrl_before_'+ctr+'">'+value.clamp_eject_relation.REV_DWELL+'</td>'+
                        
                        '<td id="input_dt_cavity_before_'+ctr+'">'+value.clamp_eject_relation.ejector_delay+'</td>'+
                        '<td id="input_mold_ctrl_before_'+ctr+'">'+value.clamp_eject_relation.auto_die_height+'</td></tr>';;

                        
                        $('#setup_tbl1').append(tbl);
                        $('#tbl_header').append(pweight_head);
          
           
        
    }

    this_data.check_changes = function(){

        $.each($('#setup_tbl1 .before_tr *[id^="input"]'), function(index, value){
            
            
            before_id = $(value).attr('id');
            before_val = $('#'+before_id).html();
            console.log(before_id);
            // before_val = $('#'+before_id).val();

            after_id = $(value).attr('id').replace("before", "after");
            after_val = $('#'+after_id).html();
            
         

           if(before_val!=after_val){
                $('#'+after_id).addClass('txt_exceed');
                // $('#'+after_id).removeClass('txt_warn');
            }
            else{
                // $('#'+after_id).addClass('txt_warn');
                $('#'+after_id).removeClass('txt_exceed');
            }

        });

    }

    return this_data;

})();