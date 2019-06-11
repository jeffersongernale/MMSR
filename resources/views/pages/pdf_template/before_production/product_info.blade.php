@foreach ($product_info as $product_info_item)
    

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
                <label class="form-control input_field" id="txt_before_machine_cycle_time">{{$product_info_item->machine_cycle_time}}</label>
            </td>
        </tr>
        
        <tr>
            
            <td colspan="2" class="tr_pweight_before">
             
                @foreach ($prod_weight as $item)
                <tr>
                    <td width="74%">PRODUCT WEIGHT:</td>
                    <td>
                    <label class="form-control input_field" id="txt_before_prod_weight">{{$item['x']}}</label>
                    </td>
                </tr> 
                        
                @endforeach
                
            </td>
        </tr>
       
        <tr>
            <td>SPRUE WEIGHT:</td>
            <td colspan="2">
                <label class="form-control input_field" id="txt_before_sprue_weight">{{$product_info_item->sprue_weight}}</label>
            </td>
        </tr>
        <tr>
            <td>SUB-PART WEIGHT:</td>
            <td colspan="2">
                <label class="form-control input_field" id="txt_before_sub_part_weight">{{$product_info_item->sub_part_weight}}</label>
            </td>
        </tr>
        <tr>
            <td>ADDITIONAL CYCLE TIME:</td>
            <td colspan="2">
                
                <label class="form-control input_field" id="txt_before_additional_cycle_time">{{$product_info_item->additional_cycle_time}}</label>
            </td>
        </tr>
    </tbody>
    </table>

@endforeach