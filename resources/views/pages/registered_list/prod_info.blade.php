
        <h3><b>PRODUCT INFORMATION</b></h3>
        <hr>
        <div class="row std_padding">
                <div class="col-sm-12">
                        <label for="lbl_machine_cycle_time" class="col-sm-4 control-label">Machine Cycle Time:</label>
                        <div class="col-lg-6"><input type="text" class="form-control input_field" 
                                id="txt_machine_cycle_time" placeholder="Input Machine Cycle Time"   onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.CheckTolerance('txt_machine_cycle_time')">
                        </div>
                        <div class="col-lg-2 pull-left">second(s)</div>
                </div>
        </div>
        <div class="row std_padding">
                <div class="col-sm-12">
                        <label for="lbl_product_weight" class="col-sm-4 control-label">Product Weight(per cavity):</label>
                        <div class="col-lg-6">
                                      
                                    <div class="row">
                                            <div class="col-lg-7">
                                                <table class="table text-center ">
                                                        <tbody id="prod_weight">
                                                                <tr class="tr_pweight1">
                                                                <td>  
                                                                        <input type="text" class="form-control input_field" id="txt_product_weight1" 
                                                                        placeholder="Input Product Weight"   onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.CheckTolerance('txt_product_weight1')">
                                                                </td>
                                                                </tr>
                                                        </tbody>
                                                </table>
                                            </div>
                                            <div class="col-lg-5">
                                                <button class="btn btn-secondary" id="btn_add_weight" onclick="Reg_List.Add_Input_Field('btn_add_weight','prod_weight','txt_product_weight')" data-count="1"><i class="fa fa-plus"></i></button>
                                                <button class="btn btn-secondary" id="btn_remove_weight" onclick="Reg_List.Remove_Input_Field('btn_add_weight','tr_pweight')"><i class="fa fa-minus"></i></button>
                                            </div>
                                    </div>
                                        
                              
                            </div>
                            
                        <div class="col-lg-2 pull-left">gram(s)</div>
                </div>
        </div>  
        <div class="row std_padding">
                <div class="col-sm-12">
                        <label for="lbl_sprue_weight" class="col-sm-4 control-label">Sprue Weight:  &nbsp&nbsp&nbsp</label>
                        <div class="col-lg-6">
                                <input type="text" class="form-control input_field" id="txt_sprue_weight" 
                                placeholder="Input Sprue Weight"  onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.CheckTolerance('txt_sprue_weight')">
                        </div>
                        <div class="col-lg-2 pull-left">gram(s)</div>
                </div>
        </div>    
        <div class="row std_padding">
                <div class="col-sm-12">
                        <label for="lbl_sub_part_weight" class="col-sm-4 control-label">SubPart Weight:</label>
                        <div class="col-lg-6">
                                <input type="text" class="form-control input_field" id="txt_sub_part_weight" 
                                placeholder="Input Sub-Part Weight"   onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.CheckTolerance('txt_sub_part_weight')">
                        </div>
                        <div class="col-lg-2 pull-left">gram(s)</div>
                </div>
        </div>   
        <div class="row std_padding">
            <div class="col-sm-12">
                    <label for="lbl_additional_cycle_time" class="col-sm-4 control-label">Additional Cycle Time:</label>
                    <div class="col-lg-6">
                            <input type="text" class="form-control input_field" id="txt_additional_cycle_time" 
                            placeholder="Input Additional Cycle Time"  onchange="Alarm.CheckInput(this.id);"  onkeyup="Reg_List.CheckTolerance('txt_additional_cycle_time')">
                        </div>
                    <div class="col-lg-2 pull-left">second(s)</div>
            </div>
         </div> 
                    
 