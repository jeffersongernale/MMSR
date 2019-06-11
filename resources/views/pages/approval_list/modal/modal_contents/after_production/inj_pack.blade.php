
<table class="table table-bordered text-center table-striped" >
        <thead>
                <tr>
                    <th colspan="3">INJECTION/PACK CONDITION SETTING(±10% CONTROL)</th>
                </tr>
                <tr>
                <th scope="col" width="50px">...</th>
                <th scope="col" width="300px">±Injection Step
                <input readonly id="txt_after_Inj_step" class="col-sm-4  pull-right input_field" type="text" 
                placeholder="Input Here.." style="width:60px" onkeyup="Reg_List.CheckTolerance('txt_Inj_step')"></th>
                <th scope="col" width="300px">±Step</th>
                </tr>
        </thead>
        <tbody id="injection_step_tbl">
                <tr>
                <td>1</td>
                <td>        
                        <label  id="lbl_after_Inj_Step1" class="col-sm-4 control-label">0</label>
                        <input readonly id="txt_after_Inj_Step1" class="col-sm-4   input_field" type="text" placeholder="Input Here.." style="width: 60px;">
                        <label  id="lbl_after_mm/s" class="col-sm-4 control-label">mm/s</label>
                </td>
                <td>        
                        <label  id="lbl_after_IStep1" class="col-sm-4 control-label">0</label>
                        <input readonly id="txt_after_IStep1" class="col-sm-4   input_field" type="text" placeholder="Input Here.." style="width: 60px;">
                        <label  id="lbl_after_mm/s" class="col-sm-4 control-label">mm</label>
                </td>
                </tr>
        </tbody>
        </table>

<table class="table table-bordered text-center table-striped">
            <thead>
            </thead>
            <tbody>
            <tr>
            <td colspan="2" class="bold-text">MAX INJECTION PRESSURE</td>
            
            <td>        
                    <label  id="lbl_after_Max_Inj_Pres" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_after_Max_Inj_Pres" class="col-sm-4   input_field" type="text" placeholder="Input Here.." style="width: 60px;">
                    <label  id="lbl_after_mm/s" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>
            </td>
            </tr>
            <tr>
            <td colspan="2" class="bold-text">ACTUAL PRESSURE</td>
            <td>    
                    <label  id="lbl_after_indent" class="col-sm-4 control-label"></label>    
                    <input readonly id="txt_after_Act_Inj_Pres" class="col-sm-4   input_field" type="text" placeholder="Input Here.." style="width: 60px;">
                    <label  id="lbl_after_mm/s" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>
            </td>
            </tr>
            <tr>
            <td colspan="2" class="bold-text">MAX INJECTION TIME</td>
            
            <td>        
                    <label  id="lbl_after_Max_Inj_Time" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_after_Max_Inj_Time" class="col-sm-4   input_field" type="text" placeholder="Input Here.." style="width: 60px;">
                    <label  id="lbl_after_mm/s" class="col-sm-4 control-label">second/s</label>
            </td>
            </tr>
            <tr>
            <td colspan="2" class="bold-text">ACTUAL TIME</td>
            
            <td>        
                    <label  id="lbl_after_indent" class="col-sm-4 control-label"></label>
                    <input readonly id="txt_after_Act_Time" class="col-sm-4   input_field" type="text" placeholder="Input Here.." style="width: 60px;">
                    <label  id="lbl_after_mm/s" class="col-sm-4 control-label">second/s</label>
            </td>
            </tr>
            <tr>
            <td colspan="2" class="bold-text">MAX PACK VELOCITY</td>
            <td>        
                    <label  id="lbl_after_Max_Pack_Velo" class="col-sm-4 control-label">0</label>
                    <input readonly id="txt_after_Max_Pack_Velo" class="col-sm-4   input_field" type="text" placeholder="Input Here.." style="width: 60px;">
                    <label  id="lbl_after_mm/s" class="col-sm-4 control-label">mm/s</label>
            </td>
            </tr>
            <tr>
                    <td colspan="3" class="bold-text">INJECTION PACK</td>
            </tr>
            <tr>
                <td colspan="2" class="bold-text">POS TRANS</td>
                <td>
                        <label  id="lbl_after_POS_Trans" class="col-sm-4 control-label">0</label>
                        <input readonly id="txt_after_POS_Trans" class="col-sm-4   input_field" type="text" placeholder="Input Here.." style="width: 60px;">
                        <label  id="lbl_after_mm/s" class="col-sm-4 control-label">mm</label> 
                </td>
                </tr>
                <tr>
                <td scope="col" width="50px">...</td>
                <td scope="col" width="300px" class="bold-text">
                        ±Pack Step (kg/cm<sup>2</sup>)
                        <input readonly id="txt_after_Pack_step" class="col-sm-4  pull-right input_field" 
                        type="text" placeholder="Input Here.." style="width:60px"></td>
                        
                <td scope="col" width="300px" class="bold-text">
                        ±Step (sec)
                       
                </td>
                </tr>
        </tbody>
</table>

<table class="table table-bordered text-center table-striped">
            <thead>
            </thead>
            <tbody id="pack_step_tbl">
                
                <tr  class="tr_pack_step1">
                <td>1</td>
                <td>        
                        <label  id="lbl_after_Pack_Step1" class="col-sm-4 control-label">0</label>
                        <input readonly id="txt_after_Pack_Step1" class="col-sm-4   input_field" type="text" placeholder="Input Here.." style="width: 60px;">
                        <label  id="lbl_after_mm/s" class="col-sm-4 control-label">mm/s</label>
                </td>
                <td>        
                        <label  id="lbl_after_PStep1" class="col-sm-4 control-label">0</label>
                        <input readonly id="txt_after_PStep1" class="col-sm-4   input_field" type="text" placeholder="Input Here.." style="width: 60px;">
                        <label  id="lbl_after_mm/s" class="col-sm-4 control-label">mm</label>
                </td>
                </tr>
        </tbody>
</table>
