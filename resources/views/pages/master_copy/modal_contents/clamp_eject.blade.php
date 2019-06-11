

<table class="table table-bordered text-center bold-text table-striped" style="font-size: 1em">
    <thead>
            <tr>
                <td colspan="4">SETTING FOR CLAMPING AND EJECTING(±10% CONTROL)</td>
            </tr>
            <tr>
            <th scope="col" colspan="2">...</th>
            <th scope="col">POS(mm)</th>
            <th scope="col">VEL(mm/s)</th>
            </tr>
    </thead>
    <tbody>
            <tr>
            <td >Open Limit</td>
            <td >FULL OPEN</td>
            <td>        
                    <label id="lbl_before_neg_OLFO_POS" class="col-sm-4 control-label">0</label>
                    <input class="col-sm-4 input_field" type="text" readonly id="txt_before_OLFO_POS" placeholder="Input" 
                    onkeyup="Master_Copy.Percentage_pn('txt_before_OLFO_POS','lbl_before_neg_OLFO_POS','lbl_before_pos_OLFO_POS')">
                    <label id="lbl_before_pos_OLFO_POS" class="col-sm-4 control-label">0</label>
            </td>
            <td>
                    <label id="lbl_before_neg_OLFO_VEL" class="col-sm-4 control-label">0</label>
                    <input type="text" readonly id="txt_before_OLFO_VEL" placeholder="Input" class=" col-sm-4 input_field"
                    onkeyup="Master_Copy.Percentage_pn('txt_before_OLFO_VEL','lbl_before_neg_OLFO_VEL','lbl_before_pos_OLFO_VEL')">
                    <label id="lbl_before_pos_OLFO_VEL" class="col-sm-4 control-label">0</label>
            </td>
            </tr>
            <tr>
            <td>Close SW</td>
            <td>1</td>
            <td>
                    <label id="lbl_before_neg_CS1_POS" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_CS1_POS" class="col-sm-4   input_field" type="text" placeholder="Input"
                    onkeyup="Master_Copy.Percentage_pn('txt_before_CS1_POS','lbl_before_neg_CS1_POS','lbl_before_pos_CS1_POS')">
                    <label id="lbl_before_pos_CS1_POS" class="col-sm-4 control-label">0</label>
            </td>
            <td>
                    <label id="lbl_before_neg_CS1_VEL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_CS1_VEL" type="text" placeholder="Input" class=" col-sm-4 input_field"
                    onkeyup="Master_Copy.Percentage_pn('txt_before_CS1_VEL','lbl_before_neg_CS1_VEL','lbl_before_pos_CS1_VEL')">
                    <label id="lbl_before_pos_CS1_VEL" class="col-sm-4 control-label">0</label>
            </td>
            </tr>
            <tr>
            <td>Close SLOW</td>
            <td>MOLD PRTCT</td>
            <td>
                    <label id="lbl_before_neg_CSMP_POS" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_CSMP_POS" class="col-sm-4   input_field" type="text" placeholder="Input"
                    onkeyup="Master_Copy.Percentage_pn('txt_before_CSMP_POS','lbl_before_neg_CSMP_POS','lbl_before_pos_CSMP_POS')">
                    <label id="lbl_before_pos_CSMP_POS" class="col-sm-4 control-label">0</label>
            </td>
            <td>
                    <label id="lbl_before_neg_CSMP_VEL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_CSMP_VEL" type="text" placeholder="Input" class=" col-sm-4 input_field" 
                    onkeyup="Master_Copy.Percentage_pn('txt_before_CSMP_VEL','lbl_before_neg_CSMP_VEL','lbl_before_pos_CSMP_VEL')">
                    <label id="lbl_before_pos_CSMP_VEL" class="col-sm-4 control-label">0</label>
            </td>
            </tr>
            <tr>
            <td>Close SP</td>
            <td>TOUCH</td>
            <td>
                    <label id="lbl_before_neg_CST_POS" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_CST_POS" class="col-sm-4   input_field" type="text" placeholder="Input" 
                    onkeyup="Master_Copy.Percentage_pn('txt_before_CST_POS','lbl_before_neg_CST_POS','lbl_before_pos_CST_POS')">
                    <label id="lbl_before_pos_CST_POS" class="col-sm-4 control-label">0</label>
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
                    <label id="lbl_before_neg_MPPT_POS" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_MPPT_POS" class="col-sm-4   input_field" type="text" placeholder="Input" 
                    onkeyup="Master_Copy.Percentage_pn('txt_before_MPPT_POS','lbl_before_neg_MPPT_POS','lbl_before_pos_MPPT_POS')">
                    <label id="lbl_before_pos_MPPT_POS" class="col-sm-4 control-label">0</label>
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
                    <label id="lbl_before_neg_BB_VEL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_BB_VEL" type="text" placeholder="Input" class=" col-sm-4 input_field"  
                    onkeyup="Master_Copy.Percentage_pn('txt_before_BB_VEL','lbl_before_neg_BB_VEL','lbl_before_pos_BB_VEL')">
                    <label id="lbl_before_pos_BB_VEL" class="col-sm-4 control-label">0</label>
            </td>
            </tr>
            <tr>
            <td>Open 1st</td>
            <td>1</td>
            <td>
                    <label id="lbl_before_neg_O1_POS" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_O1_POS" class="col-sm-4   input_field" type="text" placeholder="Input"  
                    onkeyup="Master_Copy.Percentage_pn('txt_before_O1_POS','lbl_before_neg_O1_POS','lbl_before_pos_O1_POS')">
                    <label id="lbl_before_pos_O1_POS" class="col-sm-4 control-label">0</label>
            </td>
            <td>
                    <label id="lbl_before_neg_O1_VEL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_O1_VEL" type="text" placeholder="Input" class=" col-sm-4 input_field"  
                    onkeyup="Master_Copy.Percentage_pn('txt_before_O1_VEL','lbl_before_neg_O1_VEL','lbl_before_pos_O1_VEL')">
                    <label id="lbl_before_pos_O1_VEL" class="col-sm-4 control-label">0</label>
            </td>
            </tr>
            <tr>
            <td>Open 2nd</td>
            <td>1</td>
            <td>
                    <label id="lbl_before_neg_O2_POS" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_O2_POS" class="col-sm-4   input_field" type="text" placeholder="Input"  
                    onkeyup="Master_Copy.Percentage_pn('txt_before_O2_POS','lbl_before_neg_O2_POS','lbl_before_pos_O2_POS')">
                    <label id="lbl_before_pos_O2_POS" class="col-sm-4 control-label">0</label>
            </td>
            <td>
                    <label id="lbl_before_neg_O2_VEL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_O2_VEL" type="text" placeholder="Input" class=" col-sm-4 input_field"   
                    onkeyup="Master_Copy.Percentage_pn('txt_before_O2_VEL','lbl_before_neg_O2_VEL','lbl_before_pos_O2_VEL')">
                    <label id="lbl_before_pos_O2_VEL" class="col-sm-4 control-label">0</label>
            </td>
            </tr>
            <tr>
            <td>Full Open</td>
            <td>FULL OPEN</td>
            <td>
                    <label id="lbl_before_neg_FOFO_POS" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_FOFO_POS" class="col-sm-4   input_field" type="text" placeholder="Input"   
                    onkeyup="Master_Copy.Percentage_pn('txt_before_FOFO_POS','lbl_before_neg_FOFO_POS','lbl_before_pos_FOFO_POS')">
                    <label id="lbl_before_pos_FOFO_POS" class="col-sm-4 control-label">0</label>
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
                    <label id="lbl_before_neg_ESES_POS" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_ESES_POS" class="col-sm-4   input_field" type="text" placeholder="Input"   
                    onkeyup="Master_Copy.Percentage_pn('txt_before_ESES_POS','lbl_before_neg_ESES_POS','lbl_before_pos_ESES_POS')">
                    <label id="lbl_before_pos_ESES_POS" class="col-sm-4 control-label">0</label>
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
                    <input readonly id="txt_before_Pulses" class="col-sm-4   input_field" 
                    type="text" placeholder="Input">
            </td>
            <td>
                    COUNT
            </td>
            </tr>
    </tbody>
</table> 

<table class="table table-bordered text-center bold-text table-striped">
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
                    <label id="lbl_before_neg_FWD_POS" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_FWD_POS" class="col-sm-4 input_field" type="text" placeholder="Input"  
                    onkeyup="Master_Copy.Percentage_pn('txt_before_FWD_POS','lbl_before_neg_FWD_POS','lbl_before_pos_FWD_POS')">
                    <label id="lbl_before_pos_FWD_POS" class="col-sm-4 control-label">0</label>
            </td>
            <td>
                    <label id="lbl_before_neg_FWD_VEL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_FWD_VEL" class="col-sm-4   input_field" type="text" placeholder="Input" 
                    onkeyup="Master_Copy.Percentage_pn('txt_before_FWD_VEL','lbl_before_neg_FWD_VEL','lbl_before_pos_FWD_VEL')">
                    <label id="lbl_before_pos_FWD_VEL" class="col-sm-4 control-label">0</label>
            </td>
            <td>
                    <label id="lbl_before_neg_FWD_DWELL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_FWD_DWELL" type="text" placeholder="Input" class=" col-sm-4 input_field" 
                    onkeyup="Master_Copy.Percentage_pn('txt_before_FWD_DWELL','lbl_before_neg_FWD_DWELL','lbl_before_pos_FWD_DWELL')">
                    <label id="lbl_before_pos_FWD_DWELL" class="col-sm-4 control-label">0</label>
            </td>
            </tr>
            <tr>
            <td>STOP/ADV.MID</td>
            <td>
                    <label id="lbl_before_neg_ADV_POS" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_ADV_POS" class="col-sm-4   input_field" type="text" placeholder="Input"
                    onkeyup="Master_Copy.Percentage_pn('txt_before_ADV_POS','lbl_before_neg_ADV_POS','lbl_before_pos_ADV_POS')">
                    <label id="lbl_before_pos_ADV_POS" class="col-sm-4 control-label">0</label>
            </td>
            <td>
                    <label id="lbl_before_neg_ADV_VEL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_ADV_VEL" class="col-sm-4   input_field" type="text" placeholder="Input"
                    onkeyup="Master_Copy.Percentage_pn('txt_before_ADV_VEL','lbl_before_neg_ADV_VEL','lbl_before_pos_ADV_VEL')">
                    <label id="lbl_before_pos_ADV_VEL" class="col-sm-4 control-label">0</label>
            </td>
            <td>
                    <label id="lbl_before_neg_ADV_DWELL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_ADV_DWELL" type="text" placeholder="Input" class=" col-sm-4 input_field"
                    onkeyup="Master_Copy.Percentage_pn('txt_before_ADV_DWELL','lbl_before_neg_ADV_DWELL','lbl_before_pos_ADV_DWELL')">
                    <label id="lbl_before_pos_ADV_DWELL" class="col-sm-4 control-label">0</label>
            </td>
            </tr>
            <tr>
            <td>Reverse/REV</td>
            <td>
                    <label id="lbl_before_neg_REV_POS" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_REV_POS" class="col-sm-4   input_field" type="text" placeholder="Input"
                    onkeyup="Master_Copy.Percentage_pn('txt_before_REV_POS','lbl_before_neg_REV_POS','lbl_before_pos_REV_POS')">
                    <label id="lbl_before_pos_REV_POS" class="col-sm-4 control-label">0</label>
            </td>
            <td>
                    <label id="lbl_before_neg_REV_VEL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_REV_VEL" class="col-sm-4   input_field" type="text" placeholder="Input"
                    onkeyup="Master_Copy.Percentage_pn('txt_before_REV_VEL','lbl_before_neg_REV_VEL','lbl_before_pos_REV_VEL')">
                    <label id="lbl_before_pos_REV_VEL" class="col-sm-4 control-label">0</label>
            </td>
            <td>
                    <label id="lbl_before_neg_REV_DWELL" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_REV_DWELL" type="text" placeholder="Input" class=" col-sm-4 input_field"
                    onkeyup="Master_Copy.Percentage_pn('txt_before_REV_DWELL','lbl_before_neg_REV_DWELL','lbl_before_pos_REV_DWELL')">
                    <label id="lbl_before_pos_REV_DWELL" class="col-sm-4 control-label">0</label>
            </td>
            </tr>
            <tr>
            <td colspan="2">EJECTOR DELAY</td>
            
            <td colspan="2">
                    <input readonly id="txt_before_Ejector_Delay" class="col-sm-4 input_field" type="text" 
                    placeholder="Input">
                    <label id="lbl_before_Ejector_Delay" class="col-sm-4 control-label">second/s</label>
            </td>
            
            </tr>
            <tr>
            <td colspan="2">AUTO DIE HEIGHT(TON)</td>
            
            <td colspan="2">
                    <label id="lbl_before_neg_Die_Height" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_before_Die_Height" type="text" placeholder="Input" class=" col-sm-4 input_field"
                    onkeyup="Master_Copy.Percentage_pn('txt_before_Die_Height','lbl_before_neg_Die_Height','lbl_before_pos_Die_Height')">
                    <label id="lbl_before_pos_Die_Height" class="col-sm-4 control-label">0</label>
            </td>
            
            </tr>
    </tbody>
</table>
