
    <table class="table table-bordered text-center table-striped tbl" border="1" style="width: 100%">
        <thead>
            <tr>
                <th colspan="2">RAW MATERIAL HISTORY</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><b>DRYER NO:</b></td>
                <td>
                    <label class="form-control input_field" id="txt_dryer_no">{{$after_prod->dryer_no}}</label>
                </td>
            </tr>
            <tr>
                <td><b>TIME IN:</b></td>
                <td>
                    
                    <label class="form-control input_field" id="time_time_in">{{$after_prod->time_in}}</label>
                </td>
            </tr>
            <tr>
                <td><b>TIME CAN USE:</b></td>
                <td>
                      
                    <label class="form-control input_field" id="time_time_use">{{$after_prod->time_use}}</label>
                </td>
            </tr>
            <tr>
                <td><b>DATE PREPARED:</b></td>
                <td>
                    <label class="form-control input_field" id="date_prepared">{{$after_prod->date_prepared}}</label>
                </td>
            </tr>
            <tr>
                <td><b>MATERIAL LOT #:</b></td>
                <td>
                    <label class="form-control input_field" id="txt_mat_lot_no">{{$after_prod->material_lot_no}}</label>
                </td>
            </tr>
            <tr>
                <td><b>ACTUAL MATERIAL USE:</b></td>
                <td>
                    <label class="form-control input_field" id="txt_actual_matl_use">{{$after_prod->actual_matl_use}}</label>
                </td>
            </tr>
            <tr>
                <td><b>ACTUAL TIME MATERIAL USE:</b></td>
                <td>
                    <label class="form-control input_field" id="time_actual_use">{{$after_prod->actual_time_matl_use}}</label>
                </td>
            </tr>
            <tr>
                <td><b>MATERIAL CODE:</b></td>
                <td>
                    <label class="form-control input_field" id="txt_material_code">{{$after_prod->material_code}}</label>
                </td>
            </tr>
        </tbody>
    </table>
