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
                <label class="form-control input_field" id="txt_after_Nozzle">{{$after_prod->cylinder_temp_relation->nozzle}}</label>

        </td>
        <td>
                <label  id="lbl_after_tol_Nozzle" class="control-label">± {{($after_prod->cylinder_temp_relation->nozzle)* .10}}</label>
                
        </td>
        </tr>
        <tr>
        <td>BARREL1</td>
        <td>        
                
                <label class="form-control input_field" id="txt_after_Barrel1">{{$after_prod->cylinder_temp_relation->barrel1}}</label>

        </td>
        <td>
                <label  id="lbl_after_tol_Barrel1" class="control-label">± {{($after_prod->cylinder_temp_relation->barrel1)*.10}}</label>
                
        </td>
        </tr>
        <tr>
        <td>BARREL2</td>
        <td>        
                
                <label class="form-control input_field" id="txt_after_Barrel2">{{$after_prod->cylinder_temp_relation->barrel2}}</label>

        </td>
        <td>
                <label  id="lbl_after_tol_Barrel2" class="control-label"> ± {{($after_prod->cylinder_temp_relation->barrel3)*.10}}</label>
                
        </td>
        </tr>
        <tr>
        <td>BARREL3</td>
        <td>        
                
                <label class="form-control input_field" id="txt_after_Barrel3">{{$after_prod->cylinder_temp_relation->barrel3}}</label>

        </td>
        <td>
                <label  id="lbl_after_tol_Barrel3" class="control-label">± {{($after_prod->cylinder_temp_relation->barrel3)*.10}}</label>
                
        </td>
        </tr>
        <tr>
        <td>FEED THROAT</td>
        <td>        
                
                <label class="form-control input_field" id="txt_after_Feed_Throat">{{$after_prod->cylinder_temp_relation->feed_throat}}</label>

        </td>
        <td>
                <label  id="lbl_after_tol_Feed_Throat" class="control-label">± {{($after_prod->cylinder_temp_relation->feed_throat)*.10}}</label>
                
        </td>
        </tr>
</tbody>
</table>