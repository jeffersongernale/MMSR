<table class="tbl" border="1" style="width: 100%" >
                <tr>
                        <th colspan="5">MEASURING CONDITION SCREEN(±10% CONTROL)</th>
                </tr>
                <tr>
                        <th colspan="5">EXTRUDER SETTING</th>
                </tr>
                <tr>
                        <th scope="col" width="20px">...</th>
                        <th scope="col" width="200px">EXTRUDER</th>
                        <th scope="col" width="100px">ON</th>
                        <th scope="col" width="100px">
                                
                        <label class="form-control input_field" id="txt_after_Extruder">{{$after_prod->measuring_condition_relation->extruder_on}}</label>
        
                        </th>
                        <th scope="col" width="200px">
                                STEP
                        </th>
                </tr>
                </thead>
                <tbody id="extruder_tbl_after">
                        @foreach ($extrude_after as $extrude_item)
                                <tr class="tr_extruder1">
                                        <td>{{$loop->index+1}}</td>
                                        <td>
                                                
                                                <label class="form-control input_field" id="txt_after_Ext_kg1">{{$extrude_item['kg']}}</label>
                        
                                                <label id="lbl_after_static" class="col-sm-4 control-label">kg/cm<sup>2</sup></label>
                                        </td>
                                        <td colspan="2">
                                                
                                                <label class="form-control input_field" id="txt_after_Ext_rpm1">{{$extrude_item['rpm']}}</label>
                                                
                                                <label id="lbl_after_static" class="col-sm-4 control-label">rpm</label>
                                        </td>
                                        <td>
                                                
                                                <label class="form-control input_field" id="txt_after_Ext_mm1">{{$extrude_item['mm']}}</label>
                                                
                                                <label id="lbl_after_static" class="col-sm-4 control-label">mm</label>
                                        </td>
                                </tr>
                        @endforeach
                        
                </tbody>
        </table>
        <table class="tbl" border="1" style="width: 100%" >
                        <tbody>
                        <tr>
                                <td colspan="3" class="bold-text">M-CUSHION</td>
                                <td colspan="2">
                                        
                                        <label class="form-control input_field" id="txt_after_Mcushion">{{$after_prod->measuring_condition_relation->m_cushion}}</label>
                                        
                                        <label id="lbl_after_static" class="col-sm-4 control-label">mm</label>
                                </td>
                        </tr>
                        <tr>
                                <td colspan="3" class="bold-text">SHOT SIZE</td>
                                <td colspan="2">
                                        
                                        <label class="form-control input_field" id="txt_after_Shot_Size">{{$after_prod->measuring_condition_relation->shot_size}}</label>
                                        
                                        <label id="lbl_after_static" class="col-sm-4 control-label">mm</label>
                                </td>
                        </tr>
                        <tr>
                                <td colspan="3" class="bold-text">DCMP DIST</td>
                                <td colspan="2">
                                        
                                        <label class="form-control input_field" id="txt_after_Dcmp_Dist">{{$after_prod->measuring_condition_relation->dcmp_dist}}</label>
                                        
                                        <label id="lbl_after_static" class="col-sm-4 control-label">mm</label>
                                </td>
                        </tr>
                        <tr>
                                <td colspan="3" class="bold-text">DCMP VEL</td>
                                <td colspan="2">
                                        
                                        <label class="form-control input_field" id="txt_after_Dcmp_Vel">{{$after_prod->measuring_condition_relation->dcmp_vel}}</label>
                                        
                                        <label id="lbl_after_static" class="col-sm-4 control-label">mm/s</label>
                                </td>
                        </tr>
                        <tr>
                                <td colspan="3" class="bold-text">COOL TIME</td>
                                <td colspan="2">
                                        
                                        <label class="form-control input_field" id="txt_after_Cool_Time">{{$after_prod->measuring_condition_relation->cool_time}}</label>
                                        
                                        <label id="lbl_after_static" class="col-sm-4 control-label">mm/s</label>
                                </td>
                        </tr>
                </tbody>
        </table>
        