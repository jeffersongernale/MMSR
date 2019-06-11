
@foreach ($clamping_ejecting_setting as $clamping_eject_item)
<table class="tbl" border="1" style="width: 100%" >
    <thead>
            <tr>
                <th colspan="4">SETTING FOR CLAMPING AND EJECTING(±10% CONTROL)</th>
            </tr>
            <tr>
            <th scope="col" colspan="2">...</th>
            <th scope="col">POS(mm)</th>
            <th scope="col">VEL(mm/s)</th>
            </tr>
    </thead>
    <tbody class="text-center">
            <tr>
            <td >Open Limit</td>
            <td >FULL OPEN</td>
            <td>     
                    <label class="form-control input_field" id="txt_before_OLFO_POS">{{$clamping_eject_item->open_limit_POS}}</label>
            </td>
            <td>
                    <label class="form-control input_field" id="txt_before_OLFO_VEL">{{$clamping_eject_item->open_limit_VEL}}</label>
            </td>
            </tr>
            <tr>
            <td>Close SW</td>
            <td>1</td>
            <td>
                    <label class="form-control input_field" id="txt_before_CS1_POS">{{$clamping_eject_item->close_sw_POS}}</label>
            </td>
            <td>
                    <label class="form-control input_field" id="txt_before_CS1_VEL">{{$clamping_eject_item->close_sw_VEL}}</label>
            </td>
            </tr>
            <tr>
            <td>Close SLOW</td>
            <td>MOLD PRTCT</td>
            <td>
                    <label class="form-control input_field" id="txt_before_CSMP_POS">{{$clamping_eject_item->close_slow_POS}}</label>
            </td>
            <td>
                    <label class="form-control input_field" id="txt_before_CSMP_VEL">{{$clamping_eject_item->close_slow_VEL}}</label>
            </td>
            </tr>
            <tr>
            <td>Close SP</td>
            <td>TOUCH</td>
            <td>
                    <label class="form-control input_field" id="txt_before_CST_POS">{{$clamping_eject_item->close_sp_POS}}</label>
            </td>
            <td>
                    {{--  <label id="lbl_before_neg_CST_VEL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_CST_VEL" type="text" placeholder="Input" class=" col-sm-4 " 
                    onkeyup="Reg_List.Percentage_pn('txt_CST_VEL','lbl_neg_CST_VEL','lbl_pos_CST_VEL')">
                    <label id="lbl_before_pos_CST_VEL" class="col-sm-4 control-label">0</label> --}}
                    ...
            </td>
            </tr>
            <tr>
            <td>Mold Protect</td>
            <td>PRTCT TOQ</td>
            <td>
                    <label class="form-control input_field" id="txt_before_MPPT_POS">{{$clamping_eject_item->mold_prtct_POS}}</label>
            </td>
            <td>
                    {{-- <label id="lbl_before_neg_MPPT_VEL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_MPPT_VEL" type="text" placeholder="Input" class=" col-sm-4 " 
                    onkeyup="Reg_List.Percentage_pn('txt_MPPT_VEL','lbl_neg_MPPT_VEL','lbl_pos_MPPT_VEL')">
                    <label id="lbl_before_pos_MPPT_VEL" class="col-sm-4 control-label">0</label> --}}
                    ...
            </td>
            </tr>
            <tr>
            <td>Breakaway</td>
            <td>BREAKAWAY</td>
            <td>
                    {{--  <label id="lbl_before_neg_BB_POS" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_BB_POS" class="col-sm-4  " type="text" placeholder="Input" 
                    onkeyup="Reg_List.Percentage_pn('txt_BB_POS','lbl_neg_BB_POS','lbl_pos_BB_POS')">
                    <label id="lbl_before_pos_BB_POS" class="col-sm-4 control-label">0</label> --}}
                    ...
            </td>
            <td>
                   
                    <label class="form-control input_field" id="txt_before_BB_VEL">{{$clamping_eject_item->breakaway_VEL}}</label>
            </td>
            </tr>
            <tr>
            <td>Open 1st</td>
            <td>1</td>
            <td>
                 
                    <label class="form-control input_field" id="txt_before_O1_POS">{{$clamping_eject_item->open1_POS}}</label>
            </td>
            <td>
                   
                    <label class="form-control input_field" id="txt_before_O1_VEL">{{$clamping_eject_item->open1_VEL}}</label>
            </td>
            </tr>
            <tr>
            <td>Open 2nd</td>
            <td>1</td>
            <td>
                 
                    <label class="form-control input_field" id="txt_before_O2_POS">{{$clamping_eject_item->open2_POS}}</label>
            </td>
            <td>
                    
                    <label class="form-control input_field" id="txt_before_O2_VEL">{{$clamping_eject_item->open2_VEL}}</label>
            </td>
            </tr>
            <tr>
            <td>Full Open</td>
            <td>FULL OPEN</td>
            <td>
                    
                    <label class="form-control input_field" id="txt_before_FOFO_POS">{{$clamping_eject_item->full_open_POS}}</label>
            </td>
            <td>
                    {{--  <label id="lbl_before_neg_FOFO_VEL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_FOFO_VEL" type="text" placeholder="Input" class=" col-sm-4 " 
                    onkeyup="Reg_List.Percentage_pn('txt_FOFO_VEL','lbl_neg_FOFO_VEL','lbl_pos_FOFO_VEL')">
                    <label id="lbl_before_pos_FOFO_VEL" class="col-sm-4 control-label">0</label> --}}
                    ...
            </td>
            </tr>
            <tr>
            <td>Eject Start</td>
            <td>EJECT START</td>
            <td>
                   
                    <label class="form-control input_field" id="txt_before_ESES_POS">{{$clamping_eject_item->eject_start_POS}}</label>
            </td>
            <td>
                    {{--  <label id="lbl_before_neg_ESES_VEL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_ESES_VEL" type="text" placeholder="Input" class=" col-sm-4 " 
                    onkeyup="Reg_List.Percentage_pn('txt_ESES_VEL','lbl_neg_ESES_VEL','lbl_pos_ESES_VEL')">
                    <label id="lbl_before_pos_ESES_VEL" class="col-sm-4 control-label">0</label> --}}
                    ...
            </td>
            </tr>
            <tr>
            <td colspan="2">PULSES</td>
            <td>
                   
                    <label class="form-control input_field" id="txt_before_Pulses">{{$clamping_eject_item->pulses}}</label>
            </td>
            <td>
                    COUNT
            </td>
            </tr>
    </tbody>
</table> 

<table class="tbl" border="1" style="width: 100%" >
    <thead>
            <tr>
            <th>EJECTOR</th>
            <th>POS(mm)</th>
            <th> VEL(mm/s)</th>
            <th>DWELL(sec)</th>
            </tr>
    </thead>
    <tbody>
            <tr>                   
            <td>FORWARD/ FWD</td>
            <td>
                    <label class="form-control input_field" id="txt_before_FWD_POS">{{$clamping_eject_item->FWD_POS}}</label>
            </td>
            <td>
                    <label class="form-control input_field" id="txt_before_FWD_VEL">{{$clamping_eject_item->FWD_VEL}}</label>
            </td>
            <td>
                    <label class="form-control input_field" id="txt_before_FWD_DWELL">{{$clamping_eject_item->FWD_DWELL}}</label>
            </td>
            </tr>
            <tr>
            <td>STOP/ADV.MID</td>
            <td>
                    <label class="form-control input_field" id="txt_before_ADV_POS">{{$clamping_eject_item->ADV_POS}}</label>
            </td>
            <td>
                    <label class="form-control input_field" id="txt_before_ADV_VEL">{{$clamping_eject_item->ADV_VEL}}</label>
            </td>
            <td>
                   
                    <label class="form-control input_field" id="txt_before_ADV_DWELL">{{$clamping_eject_item->ADV_DWELL}}</label>
            </td>
            </tr>
            <tr>
            <td>Reverse/REV</td>
            <td>
                    <label class="form-control input_field" id="txt_before_REV_POS">{{$clamping_eject_item->REV_POS}}</label>
            </td>
            <td>
                 
                    <label class="form-control input_field" id="txt_before_REV_VEL">{{$clamping_eject_item->REV_VEL}}</label>
            </td>
            <td>
                   
                    <label class="form-control input_field" id="txt_before_REV_DWELL">{{$clamping_eject_item->REV_DWELL}}</label>
            </td>
            </tr>
            <tr>
            <td colspan="2">EJECTOR DELAY</td>
            
            <td colspan="2">
                    <label class="form-control input_field" id="txt_before_Ejector_Delay">{{$clamping_eject_item->ejector_delay}}</label>

                    <label id="lbl_before_Ejector_Delay" class="col-sm-4 control-label">second/s</label>
            </td>
            
            </tr>
            <tr>
            <td colspan="2">AUTO DIE HEIGHT(TON)</td>
            
            <td colspan="2">
                    <label class="form-control input_field" id="txt_before_Die_Height">{{$clamping_eject_item->auto_die_height}}</label>
            </td>
            
            </tr>
    </tbody>
</table>

@endforeach