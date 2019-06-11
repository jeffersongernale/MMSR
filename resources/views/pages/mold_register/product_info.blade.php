<div class="panel panel-black">
        <div class="panel-heading" data-toggle="collapse" data-target="#div_Product_Info"><i class="fa fa-clock-o"></i><b>&nbspPRODUCT INFORMATION</b></div>
        <div class="panel-body text-center collapse in" id="div_Product_Info">
            <h3><b>PRODUCT INFORMATION</b></h3>
            <hr>
            <div class="row std_padding">
                        <div class="col-sm-12">
                                <label for="lbl_machine_cycle_time" class="col-sm-4 control-label">Machine Cycle Time:</label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control input_field required_field" id="txt_machine_cycle_time" placeholder="Input Machine Cycle Time">
                                </div>
                                <div class="col-lg-2 pull-left">second(s)</div>
                         </div>
            </div>
            <div class="row std_padding">
                        <div class="col-sm-12">
                            <label for="lbl_product_weight" class="col-sm-4 control-label">Product Weight(per cavity):</label>
                                <div class="col-lg-6">
                                        <table class="table text-center " id="prod_weight">
                                            <tr class="tr_pweight1">
                                                <td>  
                                                        <input type="text" class="form-control input_field required_field" id="txt_product_weight1" placeholder="Input Product Weight">
                                                </td>
                                                <td>  
                                                        <button class="btn btn-secondary" id="btn_add_weight" onclick="Registration.Add_Input_Field('btn_add_weight','prod_weight','txt_product_weight');" data-count="1"> <i class="fa fa-plus"></i></button>
                                                        <button class="btn btn-secondary" id="btn_add_weight" onclick="Registration.Remove_Input_Field('btn_add_weight','tr_pweight');" >
                                                        <i class="fa fa-minus"></i></button>
                                                </td>
                                            </tr>
                                    </table>
                                  
                                </div>
                                
                                <div class="col-lg-2 pull-left">gram(s)</div>
                        </div>
            </div>  
            <div class="row std_padding">
                    <div class="col-sm-12">
                            <label for="lbl_sprue_weight" class="col-sm-4 control-label">Sprue Weight:  &nbsp&nbsp&nbsp</label>
                            <div class="col-lg-6"><input type="text" class="form-control input_field required_field" id="txt_sprue_weight" placeholder="Input Sprue Weight"></div>
                            <div class="col-lg-2 pull-left">gram(s)</div>
                    </div>
            </div>    
            <div class="row std_padding">
                    <div class="col-sm-12">
                            <label for="lbl_sub_part_weight" class="col-sm-4 control-label">SubPart Weight:</label>
                            <div class="col-lg-6"><input type="text" class="form-control input_field required_field" id="txt_sub_part_weight" placeholder="Input Sub-Part Weight"></div>
                            <div class="col-lg-2 pull-left">gram(s)</div>
                    </div>
            </div>   
            <div class="row std_padding">
                <div class="col-sm-12">
                        <label for="lbl_additional_cycle_time" class="col-sm-4 control-label">Additional Cycle Time:</label>
                        <div class="col-lg-6"><input type="text" class="form-control input_field required_field" id="txt_additional_cycle_time" placeholder="Input Additional Cycle Time"></div>
                        <div class="col-lg-2 pull-left">second(s)</div>
                </div>
             </div> 
                        
        </div>
</div>