
        <h3><b>EXTRUDER SETTING(±10% CONTROL)</b></h3><hr>
        <table class="table table-bordered text-center" >
                <thead>
                        <tr>
                            <th scope="col" width="20px">...</th>
                            <th scope="col" width="200px">EXTRUDER</th>
                            <th scope="col" width="100px">ON</th>
                            <th scope="col" width="100px">
                                    <input id="txt_Extruder" class="col-sm-4 form-control pull-right input_field" type="text" 
                                    placeholder="Input Here.." style="width:100px"   onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.CheckTolerance('txt_Extruder')">
                                </th>
                            <th scope="col" width="200px">
                                    STEP
                                    <div class="pull-right">
                                            <button class="btn btn-secondary" id="btn_add_extruder" 
                                            onclick="Reg_List.Add_Extrude_input()" 
                                            data-count="1"><i class="fa fa-plus"></i></button>
                                            <button class="btn btn-secondary" id="btn_remove_extruder" onclick="Reg_List.Remove_Input_Field('btn_add_extruder','tr_extruder')"><i class="fa fa-minus"></i></button>
                                    </div>
                            </th>
                        </tr>
                </thead>
                <tbody id="extruder_tbl">
                        <tr class="tr_extruder1">
                                <td>1</td>
                                <td>
                                        <label id="lbl_Ext_kg1" class="col-sm-4 control-label">±0</label>
                                        <input type="text" id="txt_Ext_kg1" placeholder="Input Here.." class="form-control col-sm-4 input_field" style="width: 60px;"
                                         onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Ext_kg1','','','lbl_ext_kg1');">
                                        <label id="lbl_static" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>
                                </td>
                                <td colspan="2">
                                        <label id="lbl_Ext_rpm1" class="col-sm-4 control-label">±0</label>
                                        <input type="text" id="txt_Ext_rpm1" placeholder="Input Here.." class="form-control col-sm-4 input_field" style="width: 60px;"
                                         onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Ext_rpm1','','','lbl_ext_rpm1')">
                                        <label id="lbl_static" class="col-sm-4 control-label">rpm</label>
                                </td>
                                <td>
                                        <label id="lbl_Ext_mm1" class="col-sm-4 control-label">±0</label>
                                        <input type="text" id="txt_Ext_mm1" placeholder="Input Here.." class="form-control col-sm-4 input_field" style="width: 60px;"
                                         onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Ext_mm1','','','lbl_Ext_mm1')">
                                        <label id="lbl_static" class="col-sm-4 control-label">mm</label>
                                </td>
                        </tr>
                </tbody>
            </table>
            <table class="table table-bordered text-center">
                    <tbody>
                        <tr>
                                <td colspan="3" class="bold-text">M-CUSHION</td>
                                <td colspan="2">
                                        <label id="lbl_mcushion" class="col-sm-4 control-label">±0</label>
                                        <input type="text" id="txt_Mcushion" placeholder="Input Here.." class="form-control col-sm-4 input_field" style="width: 60px;"
                                         onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Mcushion','','','lbl_mcushion');">
                                        <label id="lbl_static" class="col-sm-4 control-label">mm</label>
                                </td>
                        </tr>
                        <tr>
                                <td colspan="3" class="bold-text">SHOT SIZE</td>
                                <td colspan="2">
                                        <label id="lbl_shot_size" class="col-sm-4 control-label">±0</label>
                                        <input type="text" id="txt_Shot_Size" placeholder="Input Here.." class="form-control col-sm-4 input_field" style="width: 60px;"
                                         onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Shot_Size','','','lbl_shot_size')">
                                        <label id="lbl_static" class="col-sm-4 control-label">mm</label>
                                </td>
                        </tr>
                        <tr>
                                <td colspan="3" class="bold-text">DCMP DIST</td>
                                <td colspan="2">
                                        <label id="lbl_Dcmp_Dist" class="col-sm-4 control-label">±0</label>
                                        <input type="text" id="txt_Dcmp_Dist" placeholder="Input Here.." class="form-control col-sm-4 input_field" style="width: 60px;"
                                         onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Dcmp_Dist','','','lbl_Dcmp_Dist')">
                                        <label id="lbl_static" class="col-sm-4 control-label">mm</label>
                                </td>
                        </tr>
                        <tr>
                                <td colspan="3" class="bold-text">DCMP VEL</td>
                                <td colspan="2">
                                        <label id="lbl_Dcmp_Vel" class="col-sm-4 control-label">±0</label>
                                        <input type="text" id="txt_Dcmp_Vel" placeholder="Input Here.." class="form-control col-sm-4 input_field" style="width: 60px;"
                                         onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Dcmp_Vel','','','lbl_Dcmp_Vel')">
                                        <label id="lbl_static" class="col-sm-4 control-label">mm/s</label>
                                </td>
                        </tr>
                        <tr>
                                <td colspan="3" class="bold-text">COOL TIME</td>
                                <td colspan="2">
                                        <label id="lbl_Cool_Time" class="col-sm-4 control-label">±0</label>
                                        <input type="text" id="txt_Cool_Time" placeholder="Input Here.." class="form-control col-sm-4 input_field" style="width: 60px;"
                                         onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Cool_Time','','','lbl_Cool_Time')">
                                        <label id="lbl_static" class="col-sm-4 control-label">mm/s</label>
                                </td>
                        </tr>
                </tbody>
        </table>