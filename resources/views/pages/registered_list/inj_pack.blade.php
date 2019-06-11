
            <h3><b>INJECTION/PACK CONDITION SETTING(±10% CONTROL)</b></h3><hr>
            <table class="table table-bordered text-center" >
                    <thead>
                            <tr>
                            <th scope="col" width="50px">...</th>
                            <th scope="col" width="300px">±Injection Step<input id="txt_Inj_step" class="col-sm-4 form-control pull-right input_field" type="text" 
                            placeholder="Input Here.." style="width:60px"  onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.CheckTolerance('txt_Inj_step')"></th>
                            <th scope="col" width="300px">±Step
                                    <div class="pull-right">
                                            <button class="btn btn-secondary" id="btn_add_inj_step" 
                                            onclick="Reg_List.Add_Inj_Pack('btn_add_inj_step','injection_step_tbl','tr_inj_pack','Inj_Step','IStep')" 
                                            data-count="1"><i class="fa fa-plus"></i></button>
                                            <button class="btn btn-secondary" id="btn_remove_inj_step" onclick="Reg_List.Remove_Input_Field('btn_add_inj_step','tr_inj_pack')"><i class="fa fa-minus"></i></button>
                                    </div>
                            </th>
                            </tr>
                    </thead>
                    <tbody id="injection_step_tbl">
                            <tr class="tr_inj_pack1">
                            <td>1</td>
                            <td>        
                                    <label id="lbl_Inj_Step1" class="col-sm-4 control-label">0</label>
                                    <input id="txt_Inj_Step1" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"
                                     onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Inj_Step1','','','lbl_Inj_Step1')">
                                    <label id="lbl_mm/s" class="col-sm-4 control-label">mm/s</label>
                            </td>
                            <td>        
                                    <label id="lbl_IStep1" class="col-sm-4 control-label">0</label>
                                    <input id="txt_IStep1" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"
                                     onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_IStep1','','','lbl_IStep1')">
                                    <label id="lbl_mm/s" class="col-sm-4 control-label">mm</label>
                            </td>
                            </tr>
                    </tbody>
                    </table>
                    <table class="table table-bordered text-center">
                            <thead>
                            </thead>
                            <tbody>
                            <tr>
                            <td colspan="2" class="bold-text">MAX INJECTION PRESSURE</td>
                            
                            <td>        
                                    <label id="lbl_Max_Inj_Pres" class="col-sm-4 control-label">0</label>
                                    <input id="txt_Max_Inj_Pres" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"
                                     onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Max_Inj_Pres','','','lbl_Max_Inj_Pres')">
                                    <label id="lbl_mm/s" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>
                            </td>
                            </tr>
                            <tr>
                            <td colspan="2" class="bold-text">ACTUAL PRESSURE</td>
                            <td>    
                                    <label id="lbl_indent" class="col-sm-4 control-label"></label>    
                                    <input id="txt_Act_Inj_Pres" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"
                                    onkeyup="Reg_List.CheckTolerance('txt_Act_Inj_Pres');">
                                    <label id="lbl_mm/s" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>
                            </td>
                            </tr>
                            <tr>
                            <td colspan="2" class="bold-text">MAX INJECTION TIME</td>
                            
                            <td>        
                                    <label id="lbl_Max_Inj_Time" class="col-sm-4 control-label">0</label>
                                    <input id="txt_Max_Inj_Time" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"
                                     onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Max_Inj_Time','','','lbl_Max_Inj_Time')">
                                    <label id="lbl_mm/s" class="col-sm-4 control-label">second/s</label>
                            </td>
                            </tr>
                            <tr>
                            <td colspan="2" class="bold-text">ACTUAL TIME</td>
                            
                            <td>        
                                    <label id="lbl_indent" class="col-sm-4 control-label"></label>
                                    <input id="txt_Act_Time" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"
                                    onkeyup="Reg_List.CheckTolerance('txt_Act_Time');">
                                    <label id="lbl_mm/s" class="col-sm-4 control-label">second/s</label>
                            </td>
                            </tr>
                            <tr>
                            <td colspan="2" class="bold-text">MAX PACK VELOCITY</td>
                            <td>        
                                    <label id="lbl_Max_Pack_Velo" class="col-sm-4 control-label">0</label>
                                    <input id="txt_Max_Pack_Velo" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"
                                     onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Max_Pack_Velo','','','lbl_Max_Pack_Velo')">
                                    <label id="lbl_mm/s" class="col-sm-4 control-label">mm/s</label>
                            </td>
                            </tr>
                            <tr>
                                    <td colspan="3" class="bold-text">INJECTION PACK</td>
                            </tr>
                            <tr>
                                <td colspan="2" class="bold-text">POS TRANS</td>
                                <td>
                                        <label id="lbl_POS_Trans" class="col-sm-4 control-label">0</label>
                                        <input id="txt_POS_Trans" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"
                                         onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_POS_Trans','','','lbl_POS_Trans')">
                                        <label id="lbl_mm/s" class="col-sm-4 control-label">mm</label> 
                                </td>
                                </tr>
                                <tr>
                                <td scope="col" width="50px">...</td>
                                <td scope="col" width="300px" class="bold-text">
                                        ±Pack Step (kg/cm<sup>2</sup>)
                                        <input id="txt_Pack_step" class="col-sm-4 form-control pull-right input_field" 
                                        type="text" placeholder="Input Here.." style="width:60px"
                                         onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.CheckTolerance('txt_Pack_step')"></td>
                                        
                                <td scope="col" width="300px" class="bold-text">
                                        ±Step (sec)
                                        <div class="pull-right">
                                                        <button class="btn btn-secondary" id="btn_add_pack_step" 
                                                        onclick="Reg_List.Add_Inj_Pack('btn_add_pack_step','pack_step_tbl','tr_pack_step','Pack_Step','PStep')" 
                                                        data-count="1"><i class="fa fa-plus"></i></button>
                                                        <button class="btn btn-secondary" id="btn_remove_pack_step" onclick="Reg_List.Remove_Input_Field('btn_add_pack_step','tr_pack_step')"><i class="fa fa-minus"></i></button>
                                        </div>
                                </td>
                                </tr>
                        </tbody>
                </table>
                <table class="table table-bordered text-center">
                        <thead>
                        </thead>
                        <tbody id="pack_step_tbl">
                           
                            <tr  class="tr_pack_step1">
                            <td>1</td>
                            <td>        
                                    <label id="lbl_Pack_Step1" class="col-sm-4 control-label">0</label>
                                    <input id="txt_Pack_Step1" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"
                                     onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Pack_Step1','','','lbl_Pack_Step1')">
                                    <label id="lbl_mm/s" class="col-sm-4 control-label">mm/s</label>
                            </td>
                            <td>        
                                    <label id="lbl_PStep1" class="col-sm-4 control-label">0</label>
                                    <input id="txt_PStep1" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"
                                     onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_PStep1','','','lbl_PStep1')">
                                    <label id="lbl_mm/s" class="col-sm-4 control-label">mm</label>
                            </td>
                            </tr>
                    </tbody>
            </table>
