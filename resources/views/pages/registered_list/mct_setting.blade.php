
        <h3><b>DIE TEMPERATURE DATA</b></h3>
        <hr>
        <div class="row std_padding">
            <div class="col-sm-12">
                <label for="lbl_die_temp_core" class="col-sm-4 control-label">Die Temp Core:&nbsp&nbsp</label>
                <div class="col-sm-8"><input type="text" class="form-control input_field" name="Die Temp Core" 
                    id="txt_die_temp_core" placeholder="Input Die Temperature Core" onkeyup="Reg_List.CheckTolerance('txt_die_temp_core');" 
                    onchange="Alarm.CheckInput(this.id);"></div>
            </div>
        </div>
        <div class="row std_padding">
            <div class="col-sm-12">
                <label for="lbl_die_temp_cavity" class="col-sm-4 control-label">Die Temp Cavity:</label>
                <div class="col-sm-8"><input type="text" class="form-control input_field" name="Die Temp Cavity"
                    id="txt_die_temp_cavity" placeholder="Input Die Temp Cavity" onkeyup="Reg_List.CheckTolerance('txt_die_temp_cavity');"
                    onchange="Alarm.CheckInput(this.id);"></div>
            </div>
        </div>  
        <div class="row std_padding">
            <div class="col-sm-12">
                <label for="lbl_mold_temp_ctrl" class="col-sm-4 control-label">Mold Temp Control:</label>
                <div class="col-sm-8"><input type="text" class="form-control input_field" name="Mold Temp Ctrl"
                    id="txt_mold_temp_ctrl" placeholder="Input Mold Temp Ctrl:" onkeyup="Reg_List.CheckTolerance('txt_mold_temp_ctrl');"
                    onchange="Alarm.CheckInput(this.id);"></div>
            </div>
        </div>

    <br>
        @include('pages.registered_list.prod_info')


        