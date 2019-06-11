
<table class="table table-bordered text-center table-striped bold-text" >
    <thead>
        <tr>
            <td colspan="5">MEASURING CONDITION SCREEN(±10% CONTROL)</td>
        </tr>
        <tr>
            <td colspan="5">EXTRUDER SETTING</td>
        </tr>
        <tr>
            <th scope="col" width="20px">...</th>
            <th scope="col" width="200px">EXTRUDER</th>
            <th scope="col" width="100px">ON</th>
            <th scope="col" width="100px">
                    <input readonly id="txt_before_Extruder" class="col-sm-4  pull-right input_field" type="text" 
                    placeholder="Input Here.." style="width:100px" >
                </th>
            <th scope="col" width="200px">
                    STEP
                    <div class="pull-right">
                        <button class="btn btn-secondary" id="btn_add_extruder" 
                        onclick="Master_Copy.Add_Extrude_input()" 
                        data-count="1"><i class="fa fa-plus"></i></button>
                        <button class="btn btn-secondary" id="btn_remove_extruder" onclick="Master_Copy.Remove_Input_Field('btn_add_extruder','tr_extruder')"><i class="fa fa-minus"></i></button>
                    </div>
            </th>
        </tr>
    </thead>
    <tbody id="extruder_tbl_before">
            <tr class="tr_extruder1">
                    <td>1</td>
                    <td>
                            <label id="lbl_before_Ext_kg1" class="col-sm-4 control-label">±0</label>
                            <input type="text" readonly id="txt_before_Ext_kg1" placeholder="Input Here.." class=" col-sm-4 input_field"
                            onkeyup="Master_Copy.Percentage_pn('txt_before_Ext_kg1','','','lbl_before_Ext_kg1')">
                            <label id="lbl_before_static" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>
                    </td>
                    <td colspan="2">
                            <label id="lbl_before_Ext_rpm1" class="col-sm-4 control-label">±0</label>
                            <input type="text" readonly id="txt_before_Ext_rpm1" placeholder="Input Here.." class=" col-sm-4 input_field"
                            onkeyup="Master_Copy.Percentage_pn('txt_before_Ext_rpm1','','','lbl_before_Ext_rpm1')">
                            <label id="lbl_before_static" class="col-sm-4 control-label">rpm</label>
                    </td>
                    <td>
                            <label id="lbl_before_Ext_mm1" class="col-sm-4 control-label">±0</label>
                            <input type="text" readonly id="txt_before_Ext_mm1" placeholder="Input Here.." class=" col-sm-4 input_field" 
                            onkeyup="Master_Copy.Percentage_pn('txt_before_Ext_mm1','','','lbl_before_Ext_mm1')">
                            <label id="lbl_before_static" class="col-sm-4 control-label">mm</label>
                    </td>
            </tr>
    </tbody>
</table>
<table class="table table-bordered text-center table-striped">
            <tbody>
                <tr>
                        <td colspan="3" class="bold-text">M-CUSHION</td>
                        <td colspan="2">
                                <label id="lbl_before_mcushion" class="col-sm-4 control-label">±0</label>
                                <input type="text" readonly id="txt_before_Mcushion" placeholder="Input Here.." class=" col-sm-4 input_field"
                                onkeyup="Master_Copy.Percentage_pn('txt_before_Mcushion','','','lbl_before_mcushion')">
                                <label id="lbl_before_static" class="col-sm-4 control-label">mm</label>
                        </td>
                </tr>
                <tr>
                        <td colspan="3" class="bold-text">SHOT SIZE</td>
                        <td colspan="2">
                                <label id="lbl_before_shot_size" class="col-sm-4 control-label">±0</label>
                                <input type="text" readonly id="txt_before_Shot_Size" placeholder="Input Here.." class=" col-sm-4 input_field"
                                onkeyup="Master_Copy.Percentage_pn('txt_before_Shot_Size','','','lbl_before_shot_size')">
                                <label id="lbl_before_static" class="col-sm-4 control-label">mm</label>
                        </td>
                </tr>
                <tr>
                        <td colspan="3" class="bold-text">DCMP DIST</td>
                        <td colspan="2">
                                <label id="lbl_before_Dcmp_Dist" class="col-sm-4 control-label">±0</label>
                                <input type="text" readonly id="txt_before_Dcmp_Dist" placeholder="Input Here.." class=" col-sm-4 input_field"
                                onkeyup="Master_Copy.Percentage_pn('txt_before_Dcmp_Dist','','','lbl_before_Dcmp_Dist')">
                                <label id="lbl_before_static" class="col-sm-4 control-label">mm</label>
                        </td>
                </tr>
                <tr>
                        <td colspan="3" class="bold-text">DCMP VEL</td>
                        <td colspan="2">
                                <label id="lbl_before_Dcmp_Vel" class="col-sm-4 control-label">±0</label>
                                <input type="text" readonly id="txt_before_Dcmp_Vel" placeholder="Input Here.." class=" col-sm-4 input_field" 
                                onkeyup="Master_Copy.Percentage_pn('txt_before_Dcmp_Vel','','','lbl_before_Dcmp_Vel')">
                                <label id="lbl_before_static" class="col-sm-4 control-label">mm/s</label>
                        </td>
                </tr>
                <tr>
                        <td colspan="3" class="bold-text">COOL TIME</td>
                        <td colspan="2">
                                <label id="lbl_before_Cool_Time" class="col-sm-4 control-label">±0</label>
                                <input type="text" readonly id="txt_before_Cool_Time" placeholder="Input Here.." class=" col-sm-4 input_field"
                                onkeyup="Master_Copy.Percentage_pn('txt_before_Cool_Time','','','lbl_before_Cool_Time')">
                                <label id="lbl_before_static" class="col-sm-4 control-label">mm/s</label>
                        </td>
                </tr>
        </tbody>
</table>