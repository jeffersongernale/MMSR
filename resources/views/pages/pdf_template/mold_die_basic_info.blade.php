
<table class="table table-bordered text-center table-striped tbl" border="1" style="width: 100%">
    <thead>
        <tr>
            <th colspan="4">MOLD DIE BASIC INFORMATION</th>
        </tr>
    </thead>
    <tbody>
        
        <tr>
            <td style="font-weight:bold">DIE TYPE:</td>
            <td><label class="form-control input_field" id="txt_die_type">{{$record_info->die_type}}</label></td>

            <td style="font-weight:bold">NUMBER OF CAVITY:</td>
            <td><label class="form-control input_field" id="txt_number_cav">{{$record_info->no_cavity}}</label></td>
        </tr>
        <tr>
            <td style="font-weight:bold">MOLD NUMBER:</td>
            <td><label class="form-control input_field" id="txt_mold_number">{{$record_info->mold_no}}</label></td>

            <td style="font-weight:bold">NUMBER OF GOOD CAVITY:</td>
            <td><label class="form-control input_field" id="txt_number_good_cav">{{$record_info->no_good_cavity}}</label></td>
        </tr>
        <tr>
            <td style="font-weight:bold">RELATED ITEMS IF FAMILY MOLD:</td>
            <td><label class="form-control input_field" id="txt_related_items">{{$record_info->related_items}}</label></td>

            <td style="font-weight:bold">MOLD LOCATION:</td>
            <td><label class="form-control input_field" id="txt_mold_location">{{$record_info->mold_location}}</label></td>
        </tr>
    </tbody>
</table>
