@foreach ($inj_pack_setting as $inj_pack_setting_item)
    
<table class="tbl" border="1" style="width: 100%" >
        <thead>
                <tr>
                    <th colspan="3">INJECTION/PACK CONDITION SETTING(±10% CONTROL)</th>
                </tr>
                <tr>
                <th scope="col" width="50px">...</th>
                <th scope="col" width="300px">±Injection Step
                        
                <label class="form-control input_field" id="txt_before_Inj_step">{{$inj_pack_setting_item->inj_step_mid}}</label>

                </th>
                <th scope="col" width="300px">±Step </th>
                </tr>
        </thead>
        <tbody id="injection_step_tbl_before">
                @foreach ($inj_step as $inj_step_item)
                
                <tr>
                <td>{{$loop->index+1}}</td>
                <td>        
                        <label class="form-control input_field" id="txt_before_Inj_Step1">{{$inj_step_item['Inj_Step']}}</label>
                        <label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm/s</label>
                </td>
                <td>        
                      
                        <label class="form-control input_field" id="txt_before_IStep1">{{$inj_step_item['IStep']}}</label>
                        <label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm</label>
                </td>
                </tr>
               
                @endforeach
        </tbody>
        </table>

<table class="tbl" border="1" style="width: 100%" >
            <thead>
            </thead>
            <tbody>
            <tr>
            <td colspan="2" class="bold-text">MAX INJECTION PRESSURE</td>
            
            <td>        
                   
                    <label class="form-control input_field" id="txt_before_Max_Inj_Pres">{{$inj_pack_setting_item->max_inj_pressure}}</label>
                    <label  id="lbl_before_mm/s" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>
            </td>
            </tr>
            <tr>
            <td colspan="2" class="bold-text">ACTUAL PRESSURE</td>
            <td>  
                    <label class="form-control input_field" id="txt_before_Act_Inj_Pres">{{$inj_pack_setting_item->actual_pressure}}</label>

                    <label  id="lbl_before_mm/s" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>
            </td>
            </tr>
            <tr>
            <td colspan="2" class="bold-text">MAX INJECTION TIME</td>
            
            <td>        
                 
                    <label class="form-control input_field" id="txt_before_Max_Inj_Time">{{$inj_pack_setting_item->max_inj_time}}</label>
                    
                    <label  id="lbl_before_mm/s" class="col-sm-4 control-label">second/s</label>
            </td>
            </tr>
            <tr>
            <td colspan="2" class="bold-text">ACTUAL TIME</td>
            
            <td>        
                 
                    <label class="form-control input_field" id="txt_before_Act_Time">{{$inj_pack_setting_item->actual_time}}</label>
                    
                    <label  id="lbl_before_mm/s" class="col-sm-4 control-label">second/s</label>
            </td>
            </tr>
            <tr>
            <td colspan="2" class="bold-text">MAX PACK VELOCITY</td>
            <td>        
                
                    <label class="form-control input_field" id="txt_before_Max_Pack_Velo">{{$inj_pack_setting_item->max_pack_velo}}</label>
                    
                    <label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm/s</label>
            </td>
            </tr>
            <tr>
                    <td colspan="3" class="bold-text">INJECTION PACK</td>
            </tr>
            <tr>
                <td colspan="2" class="bold-text">POS TRANS</td>
                <td>
                      
                         <label class="form-control input_field" id="txt_before_POS_Trans">{{$inj_pack_setting_item->pos_trans}}</label>
                        
                        <label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm</label> 
                </td>
                </tr>
                <tr>
                <td scope="col" width="50px">...</td>
                <td scope="col" width="300px" class="bold-text">
                        ±Pack Step (kg/cm<sup>2</sup>)
                      
                        <label class="form-control input_field" id="txt_before_Pack_step">{{$inj_pack_setting_item->pack_step_mid}}</label>
                        
                        </td>
                        
                <td scope="col" width="300px" class="bold-text">
                        ±Step (sec)
                        
                </td>
                </tr>
        </tbody>
</table>

<table class="tbl" border="1" style="width: 100%" >
            <thead>
            </thead>
            <tbody id="pack_step_tbl_before">
                @foreach ($pack_step as $pack_step_item)
                        <tr  class="tr_pack_step1">
                                <td>{{$loop->index+1}}</td>
                                <td>        
                                        
                                        <label class="form-control input_field" id="txt_before_Pack_Step1">{{$pack_step_item['Pack_Step']}}</label>
                                        
                                        <label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm/s</label>
                                </td>
                                <td>        
                                        
                                        <label class="form-control input_field" id="txt_before_PStep1">{{$pack_step_item['PStep']}}</label>
                                        
                                        <label  id="lbl_before_mm/s" class="col-sm-4 control-label">mm</label>
                                </td>
                        </tr>
                @endforeach
                
        </tbody>
</table>

@endforeach
