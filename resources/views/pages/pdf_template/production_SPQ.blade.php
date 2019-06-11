
    <table class="table table-bordered text-center table-striped bold-text tbl" border="1" style="width:100%">
        <thead>
            <tr>
                <th colspan="2">PRODUCTION STANDARD PACKAGING</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>PRODUCT SIZE(Total Area): </td>
                <td><label class="form-control input_field" id="txt_product_size">{{$record_info->product_size}}</label></td>
            </tr>
            <tr>
                <td>PACKAGING CLASS: </td>
                <td><label class="form-control input_field" id="txt_packaging_class">{{$record_info->packaging_class}}</label></td>
            </tr>
            <tr>
                <td>QUANTITY PER BAG: </td>
                <td><label class="form-control input_field" id="txt_quantity_per_bag">{{$record_info->qty_per_bag}}</label></td>
            </tr>
            <tr>
                <td>PCASE MAX QUANTITY : </td>
                <td><label class="form-control input_field" id="txt_pcase_max_qty">{{$record_info->pcase_max_qty}}</label></td>
            </tr>
            <tr>
                <td>REMARKS: </td>
                <td><label class="form-control input_field" id="txt_remarks">{{$record_info->remarks}}</label></td>
            </tr>
        </tbody>
    </table>
