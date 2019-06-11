
<table class="tbl" border="1" style="width: 100%" >
    <thead>
        <tr>
            <th colspan="2">PRODUCT INFORMATION</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>MACHINE CYCLE TIME:</td>
            <td colspan="2">
                <label class="form-control input_field" id="txt_after_machine_cycle_time">{{$after_prod->product_info_relation->machine_cycle_time}}</label>
            </td>
        </tr>
        
        <tr>
            
            <td colspan="2" class="tr_pweight_after">
             
                @foreach ($prod_weight_after as $item)
                <tr>
                    <td width="74%">PRODUCT WEIGHT:</td>
                    <td>
                    <label class="form-control input_field" id="txt_after_prod_weight">{{$item['x']}}</label>
                    </td>
                </tr> 
                        
                @endforeach
                
            </td>
        </tr>
       
        <tr>
            <td>SPRUE WEIGHT:</td>
            <td colspan="2">
                <label class="form-control input_field" id="txt_after_sprue_weight">{{$after_prod->product_info_relation->sprue_weight}}</label>
            </td>
        </tr>
        <tr>
            <td>SUB-PART WEIGHT:</td>
            <td colspan="2">
                <label class="form-control input_field" id="txt_after_sub_part_weight">{{$after_prod->product_info_relation->sub_part_weight}}</label>
            </td>
        </tr>
        <tr>
            <td>ADDITIONAL CYCLE TIME:</td>
            <td colspan="2">
                
                <label class="form-control input_field" id="txt_after_additional_cycle_time">{{$after_prod->product_info_relation->additional_cycle_time}}</label>
            </td>
        </tr>
    </tbody>
    </table>
