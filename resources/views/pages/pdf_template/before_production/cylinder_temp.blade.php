@foreach ($cylinder_temp as $cylinder_temp_item)
        <table class="tbl" border="1" style="width: 100%" >
        <thead>
                <tr>
                <th colspan="3">MACHINE SETTING TEMPERATURE(±10% CONTROL)</th>
                </tr>
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
                        <label class="form-control input_field" id="txt_before_Nozzle">{{$cylinder_temp_item->nozzle}}</label>

                </td>
                <td>
                        <label  id="lbl_before_tol_Nozzle" class="control-label">± {{ ($cylinder_temp_item->nozzle) *.10}}</label>
                        
                </td>
                </tr>
                <tr>
                <td>BARREL1</td>
                <td>        
                        
                        <label class="form-control input_field" id="txt_before_Barrel1">{{$cylinder_temp_item->barrel1}}</label>

                </td>
                <td>
                        <label  id="lbl_before_tol_Barrel1" class="control-label">± {{($cylinder_temp_item->barrel1)*.10}}</label>
                        
                </td>
                </tr>
                <tr>
                <td>BARREL2</td>
                <td>        
                        
                        <label class="form-control input_field" id="txt_before_Barrel2">{{$cylinder_temp_item->barrel2}}</label>

                </td>
                <td>
                        <label  id="lbl_before_tol_Barrel2" class="control-label"> ± {{($cylinder_temp_item->barrel3)*.10}}</label>
                        
                </td>
                </tr>
                <tr>
                <td>BARREL3</td>
                <td>        
                        
                        <label class="form-control input_field" id="txt_before_Barrel3">{{$cylinder_temp_item->barrel3}}</label>

                </td>
                <td>
                        <label  id="lbl_before_tol_Barrel3" class="control-label">± {{($cylinder_temp_item->barrel3)*.10}}</label>
                        
                </td>
                </tr>
                <tr>
                <td>FEED THROAT</td>
                <td>        
                        
                        <label class="form-control input_field" id="txt_before_Feed_Throat">{{$cylinder_temp_item->feed_throat}}</label>

                </td>
                <td>
                        <label  id="lbl_before_tol_Feed_Throat" class="control-label">± {{($cylinder_temp_item->feed_throat)*.10}}</label>
                        
                </td>
                </tr>
        </tbody>
        </table>
@endforeach