

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
                    <label class="form-control input_field" id="txt_after_OLFO_POS">{{$after_prod->clamp_eject_relation->open_limit_POS}}</label>
            </td>
            <td>
                    <label class="form-control input_field" id="txt_after_OLFO_VEL">{{$after_prod->clamp_eject_relation->open_limit_VEL}}</label>
            </td>
            </tr>
            <tr>
            <td>Close SW</td>
            <td>1</td>
            <td>
                    <label class="form-control input_field" id="txt_after_CS1_POS">{{$after_prod->clamp_eject_relation->close_sw_POS}}</label>
            </td>
            <td>
                    <label class="form-control input_field" id="txt_after_CS1_VEL">{{$after_prod->clamp_eject_relation->close_sw_VEL}}</label>
            </td>
            </tr>
            <tr>
            <td>Close SLOW</td>
            <td>MOLD PRTCT</td>
            <td>
                    <label class="form-control input_field" id="txt_after_CSMP_POS">{{$after_prod->clamp_eject_relation->close_slow_POS}}</label>
            </td>
            <td>
                    <label class="form-control input_field" id="txt_after_CSMP_VEL">{{$after_prod->clamp_eject_relation->close_slow_VEL}}</label>
            </td>
            </tr>
            <tr>
            <td>Close SP</td>
            <td>TOUCH</td>
            <td>
                    <label class="form-control input_field" id="txt_after_CST_POS">{{$after_prod->clamp_eject_relation->close_sp_POS}}</label>
            </td>
            <td>
                    {{--  <label id="lbl_after_neg_CST_VEL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_after_CST_VEL" type="text" placeholder="Input" class=" col-sm-4 " 
                    onkeyup="Reg_List.Percentage_pn('txt_CST_VEL','lbl_neg_CST_VEL','lbl_pos_CST_VEL')">
                    <label id="lbl_after_pos_CST_VEL" class="col-sm-4 control-label">0</label> --}}
                    ...
            </td>
            </tr>
            <tr>
            <td>Mold Protect</td>
            <td>PRTCT TOQ</td>
            <td>
                    <label class="form-control input_field" id="txt_after_MPPT_POS">{{$after_prod->clamp_eject_relation->mold_prtct_POS}}</label>
            </td>
            <td>
                    {{-- <label id="lbl_after_neg_MPPT_VEL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_after_MPPT_VEL" type="text" placeholder="Input" class=" col-sm-4 " 
                    onkeyup="Reg_List.Percentage_pn('txt_MPPT_VEL','lbl_neg_MPPT_VEL','lbl_pos_MPPT_VEL')">
                    <label id="lbl_after_pos_MPPT_VEL" class="col-sm-4 control-label">0</label> --}}
                    ...
            </td>
            </tr>
            <tr>
            <td>Breakaway</td>
            <td>BREAKAWAY</td>
            <td>
                    {{--  <label id="lbl_after_neg_BB_POS" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_after_BB_POS" class="col-sm-4  " type="text" placeholder="Input" 
                    onkeyup="Reg_List.Percentage_pn('txt_BB_POS','lbl_neg_BB_POS','lbl_pos_BB_POS')">
                    <label id="lbl_after_pos_BB_POS" class="col-sm-4 control-label">0</label> --}}
                    ...
            </td>
            <td>
                   
                    <label class="form-control input_field" id="txt_after_BB_VEL">{{$after_prod->clamp_eject_relation->breakaway_VEL}}</label>
            </td>
            </tr>
            <tr>
            <td>Open 1st</td>
            <td>1</td>
            <td>
                 
                    <label class="form-control input_field" id="txt_after_O1_POS">{{$after_prod->clamp_eject_relation->open1_POS}}</label>
            </td>
            <td>
                   
                    <label class="form-control input_field" id="txt_after_O1_VEL">{{$after_prod->clamp_eject_relation->open1_VEL}}</label>
            </td>
            </tr>
            <tr>
            <td>Open 2nd</td>
            <td>1</td>
            <td>
                 
                    <label class="form-control input_field" id="txt_after_O2_POS">{{$after_prod->clamp_eject_relation->open2_POS}}</label>
            </td>
            <td>
                    
                    <label class="form-control input_field" id="txt_after_O2_VEL">{{$after_prod->clamp_eject_relation->open2_VEL}}</label>
            </td>
            </tr>
            <tr>
            <td>Full Open</td>
            <td>FULL OPEN</td>
            <td>
                    
                    <label class="form-control input_field" id="txt_after_FOFO_POS">{{$after_prod->clamp_eject_relation->full_open_POS}}</label>
            </td>
            <td>
                    {{--  <label id="lbl_after_neg_FOFO_VEL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_after_FOFO_VEL" type="text" placeholder="Input" class=" col-sm-4 " 
                    onkeyup="Reg_List.Percentage_pn('txt_FOFO_VEL','lbl_neg_FOFO_VEL','lbl_pos_FOFO_VEL')">
                    <label id="lbl_after_pos_FOFO_VEL" class="col-sm-4 control-label">0</label> --}}
                    ...
            </td>
            </tr>
            <tr>
            <td>Eject Start</td>
            <td>EJECT START</td>
            <td>
                   
                    <label class="form-control input_field" id="txt_after_ESES_POS">{{$after_prod->clamp_eject_relation->eject_start_POS}}</label>
            </td>
            <td>
                    {{--  <label id="lbl_after_neg_ESES_VEL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_after_ESES_VEL" type="text" placeholder="Input" class=" col-sm-4 " 
                    onkeyup="Reg_List.Percentage_pn('txt_ESES_VEL','lbl_neg_ESES_VEL','lbl_pos_ESES_VEL')">
                    <label id="lbl_after_pos_ESES_VEL" class="col-sm-4 control-label">0</label> --}}
                    ...
            </td>
            </tr>
            <tr>
            <td colspan="2">PULSES</td>
            <td>
                   
                    <label class="form-control input_field" id="txt_after_Pulses">{{$after_prod->clamp_eject_relation->pulses}}</label>
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
                    <label class="form-control input_field" id="txt_after_FWD_POS">{{$after_prod->clamp_eject_relation->FWD_POS}}</label>
            </td>
            <td>
                    <label class="form-control input_field" id="txt_after_FWD_VEL">{{$after_prod->clamp_eject_relation->FWD_VEL}}</label>
            </td>
            <td>
                    <label class="form-control input_field" id="txt_after_FWD_DWELL">{{$after_prod->clamp_eject_relation->FWD_DWELL}}</label>
            </td>
            </tr>
            <tr>
            <td>STOP/ADV.MID</td>
            <td>
                    <label class="form-control input_field" id="txt_after_ADV_POS">{{$after_prod->clamp_eject_relation->ADV_POS}}</label>
            </td>
            <td>
                    <label class="form-control input_field" id="txt_after_ADV_VEL">{{$after_prod->clamp_eject_relation->ADV_VEL}}</label>
            </td>
            <td>
                   
                    <label class="form-control input_field" id="txt_after_ADV_DWELL">{{$after_prod->clamp_eject_relation->ADV_DWELL}}</label>
            </td>
            </tr>
            <tr>
            <td>Reverse/REV</td>
            <td>
                    <label class="form-control input_field" id="txt_after_REV_POS">{{$after_prod->clamp_eject_relation->REV_POS}}</label>
            </td>
            <td>
                 
                    <label class="form-control input_field" id="txt_after_REV_VEL">{{$after_prod->clamp_eject_relation->REV_VEL}}</label>
            </td>
            <td>
                   
                    <label class="form-control input_field" id="txt_after_REV_DWELL">{{$after_prod->clamp_eject_relation->REV_DWELL}}</label>
            </td>
            </tr>
            <tr>
            <td colspan="2">EJECTOR DELAY</td>
            
            <td colspan="2">
                    <label class="form-control input_field" id="txt_after_Ejector_Delay">{{$after_prod->clamp_eject_relation->ejector_delay}}</label>

                    <label id="lbl_after_Ejector_Delay" class="col-sm-4 control-label">second/s</label>
            </td>
            
            </tr>
            <tr>
            <td colspan="2">AUTO DIE HEIGHT(TON)</td>
            
            <td colspan="2">
                    <label class="form-control input_field" id="txt_after_Die_Height">{{$after_prod->clamp_eject_relation->auto_die_height}}</label>
            </td>
            
            </tr>
    </tbody>
</table>


