
            <h3><b>MACHINE SETTING TEMPERATURE(±10% CONTROL)</b></h3><hr>
            <table class="table table-bordered text-center inner_tbl">
                <thead>
                        <tr>
                        <th scope="col">CYLINDER</th>
                        <th scope="col" width="300px">TEMPERATURE</th>
                        <th scope="col" width="20px">TOLERANCE</th>
                        </tr>
                </thead>
                <tbody>
                        <tr  id="inner_tr">
                        <td>NOZZLE</td>
                        <td>        
                                <label id="lbl_neg_Nozzle" class="col-sm-4 control-label">0</label>
                                <input id="txt_Nozzle" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"
                                 onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Nozzle','lbl_neg_Nozzle','lbl_pos_Nozzle','lbl_tol_Nozzle')">
                                <label id="lbl_pos_Nozzle" class="col-sm-4 control-label">0</label>
                        </td>
                        <td>
                                <label id="lbl_tol_Nozzle" class="control-label">± 0</label>
                                
                        </td>
                        </tr>
                        <tr>
                        <td>BARREL1</td>
                        <td>        
                                <label id="lbl_neg_Barrel1" class="col-sm-4 control-label">0</label>
                                <input id="txt_Barrel1" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"
                                 onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Barrel1','lbl_neg_Barrel1','lbl_pos_Barrel1','lbl_tol_Barrel1')">
                                <label id="lbl_pos_Barrel1" class="col-sm-4 control-label">0</label>
                        </td>
                        <td>
                                <label id="lbl_tol_Barrel1" class="control-label">± 0</label>
                                
                        </td>
                        </tr>
                        <tr>
                        <td>BARREL2</td>
                        <td>        
                                <label id="lbl_neg_Barrel2" class="col-sm-4 control-label">0</label>
                                <input id="txt_Barrel2" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"
                                 onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Barrel2','lbl_neg_Barrel2','lbl_pos_Barrel2','lbl_tol_Barrel2')">
                                <label id="lbl_pos_Barrel2" class="col-sm-4 control-label">0</label>
                        </td>
                        <td>
                                <label id="lbl_tol_Barrel2" class="control-label"> ± 0</label>
                                
                        </td>
                        </tr>
                        <tr>
                        <td>BARREL3</td>
                        <td>        
                                <label id="lbl_neg_Barrel3" class="col-sm-4 control-label">0</label>
                                <input id="txt_Barrel3" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"
                                 onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Barrel3','lbl_neg_Barrel3','lbl_pos_Barrel3','lbl_tol_Barrel3')">
                                <label id="lbl_pos_Barrel3" class="col-sm-4 control-label">0</label>
                        </td>
                        <td>
                                <label id="lbl_tol_Barrel3" class="control-label">± 0</label>
                                
                        </td>
                        </tr>
                        <tr>
                        <td>FEED THROAT</td>
                        <td>        
                                <label id="lbl_neg_Feed_Throat" class="col-sm-4 control-label">0</label>
                                <input id="txt_Feed_Throat" class="col-sm-4  form-control input_field" type="text" placeholder="Input Here.." style="width: 60px;"
                                 onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.Percentage_pn('txt_Feed_Throat','lbl_neg_Feed_Throat','lbl_pos_Feed_Throat','lbl_tol_Feed_Throat')">
                                <label id="lbl_pos_Feed_Throat" class="col-sm-4 control-label">0</label>
                        </td>
                        <td>
                                <label id="lbl_tol_Feed_Throat" class="control-label">± 0</label>
                                
                        </td>
                        </tr>
                </tbody>
            </table>