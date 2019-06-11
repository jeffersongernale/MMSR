  

    <table class="tbl" border="1" style="width: 100%" >
        <thead>
            <tr>
                <th colspan="2">DIE TEMPERATURE DATA</th>
            </tr>
        </thead>
        <tbody>
           
            <tr>
                <td><label for="lbl_die_temp_core_after" class=" control-label">Die Temp Core:</label></td>
                <td>
                    <label class="form-control input_field" id="txt_after_die_temp_core">{{$after_prod->mct_setting_relation->die_temp_core}}</label>
                </td>
            </tr>
            <tr>
                <td><label for="lbl_die_temp_cavity" class=" control-label">Die Temp Cavity:</label></td>
                <td> <label class="form-control input_field" id="txt_after_die_temp_cavity">{{$after_prod->mct_setting_relation->die_temp_cavity}}</label></td>
            </tr>
            <tr>
                <td><label for="lbl_mold_temp_ctrl" class=" control-label">Mold Temp Control:</label></td>
                <td>
                    <label class="form-control input_field" id="txt_after_mold_temp_ctrl">{{$after_prod->mct_setting_relation->mold_temp_control}}</label>
                </td>
            </tr>
        </tbody>
    </table>

