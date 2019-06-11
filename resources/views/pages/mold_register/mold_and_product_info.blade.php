<div class="row">       
        <div class="col-lg-6">   
                <div class="panel panel-black">
                        <div class="panel-heading" data-toggle="collapse" data-target="#div_body_mold_die">
                            <h4 class="box-title"><i class="fa fa-info-circle"></i><b>&nbspMOLD DIE BASIC INFORMATION</b></h4>
                        </div>
                        <div class="panel-body collapse in" id="div_body_mold_die">
                                <div class="row std_padding">
                                        <div class="col-sm-6">
                                                <label for="lbl_die_type" class="col-sm-4 control-label">Die Type:</label>
                                                <div class="col-sm-8">
                                                        <select id="slc_die_type" class="form-control required_field" tabindex="12">
                                                                @foreach ($Die_Type as $Die_Type_item)
                                                                        <option value="{{$Die_Type_item->id}}">{{$Die_Type_item->die_type}}</option>
                                                                @endforeach
                                                        </select>
                                                </div>
                                        </div>
                                        
                                        <div class="col-sm-6">
                                                <label for="lbl_no_of_cav" class="col-sm-4 control-label">No of Cavity:</label>
                                                <div class="col-sm-8">
                                                        <input type="text" class="form-control required_field" id="txt_no_cavity" placeholder="Input No of Cavity" tabindex="15">
                                                </div>
                                        </div>
                                </div>
                                <div class="row std_padding">
                                        <div class="col-sm-6">
                                                <label for="lbl_rel_items" class="col-sm-4 control-label">Related items if family mold:</label>
                                                <div class="col-sm-8"><textarea id="txtarea_rel_items" class="form-control" rows="3" placeholder="Enter Related Items" tabindex="13"></textarea></div>
                                        </div>
                                        
                                        <div class="col-sm-6">
                                                <label for="lbl_good_cav" class="col-sm-4 control-label">No of Good Cavity:</label>
                                                <div class="col-sm-8"><input type="text" class="form-control required_field" id="txt_good_cav" placeholder="Input No of Good Cavity" tabindex="16"></div>
                                        </div>
                                </div>
                                <div class="row std_padding">
                                        <div class="col-sm-6">
                                                <label for="lbl_mold_no" class="col-sm-4 control-label">Mold No:</label>
                                                <div class="col-sm-8"><input type="text" class="form-control required_field" id="txt_mold_no" placeholder="Input Mold No" tabindex="14"></div>
                                        </div>
                                        
                                        <div class="col-sm-6">
                                                <label for="lbl_mold_loc" class="col-sm-4 control-label">Mold Location:</label>
                                                <div class="col-sm-8"><input type="text" class="form-control required_field" id="txt_mold_loc" placeholder="Input Mold Location"tabindex="17"> </div>
                                        </div>
                                </div>
                                <br><br><br>
                        </div>
                </div>
        </div>

        <div class="col-lg-6">
                <div class="panel panel-black">
                                <div class="panel-heading" data-toggle="collapse" data-target="#div_body_prod_SPQ">
                                    <h4 class="box-title"><i class="fa fa-info-circle"></i><b>&nbspPRODUCTION STANDARD PACKAGING</b></h4>
                                </div>
                                <div class="panel-body collapse in" id="div_body_prod_SPQ">
                                        <div class="row">
                                                <div class="col-sm-6">
                                                        <label for="lbl_product_size" class="col-sm-4 control-label">Product Size(Total Area):</label>
                                                        <div class="col-sm-8"><input type="text" class="form-control required_field" id="txt_product_size" placeholder="Input Product Size" tabindex="18"></div>
                                                </div>
                                                
                                                <div class="col-sm-6">
                                                        <label for="lbl_packaging_class" class="col-sm-4 control-label">Packaging Class:</label>
                                                        <div class="col-sm-8"><input type="text" class="form-control required_field" id="txt_packaging_class" placeholder="Input Packaging Class" tabindex="21"></div>
                                                </div>
                                        </div>
                                        <div class="row">
                                                <div class="col-sm-6">
                                                        <label for="lbl_qty_per_bag" class="col-sm-4 control-label">Quantity Per Bag:</label>
                                                        <div class="col-sm-8"><input type="text" class="form-control required_field" id="txt_qty_per_bag" placeholder="Input Quantity Per Bag" tabindex="19"></div>
                                                </div>
                                                
                                                <div class="col-sm-6">
                                                        <label for="lbl_pcase_max" class="col-sm-4 control-label">P-Case Max Quantity:</label>
                                                        <div class="col-sm-8"><input type="text" class="form-control required_field" id="txt_pcase_max" placeholder="Input P-Case Max Quantity" tabindex="22"></div>
                                                </div>
                                        </div>
                                        <div class="row">
                                                <div class="col-sm-6">
                                                        <label for="lbl_SPQ_Remarks" class="col-sm-4 control-label">Remarks:</label>
                                                        <div class="col-sm-8"><textarea id="txtarea_SPQ_Remarks" class="form-control" rows="5" placeholder="Input Remarks Here.." tabindex="20"></textarea></div>
                                                </div>
                                        </div>
                                </div>
                </div>
        </div>
   
</div>
