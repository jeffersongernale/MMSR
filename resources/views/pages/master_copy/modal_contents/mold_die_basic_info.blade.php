<div class="table-responsive" >
<table class="table table-bordered text-center table-striped bold-text">
    <tbody>
        <tr>
            <td class="bold-text" colspan="4">MOLD DIE BASIC INFORMATION</td>
        </tr>
        <tr>
            <td>DIE TYPE:</td>
            <td>
                {{-- <input type="text" class="input_field" placeholder="Die Type" readonly id="txt_die_type"> --}}
                <select id="txt_die_type" class="form-control" tabindex="12" disabled>
                        @foreach ($Die_Type as $Die_Type_item)
                                <option value="{{$Die_Type_item->id}}">{{$Die_Type_item->die_type}}</option>
                        @endforeach
                </select>
            </td>
            <td>NUMBER OF CAVITY:</td>
            <td><input class="input_field" placeholder="Number of Cavity" readonly id="txt_number_cav" style="width: 100px"></td>
        </tr>
        <tr>
            <td>MOLD NUMBER:</td>
            <td><input type="text" class="input_field" placeholder="Mold Number" readonly id="txt_mold_number"></td>
            <td>NUMBER OF GOOD CAVITY:</td>
            <td><input class="input_field" placeholder="Number of Good Cavity" readonly id="txt_number_good_cav" style="width: 100px"></td>
        </tr>
        <tr>
            <td>RELATED ITEMS IF FAMILY MOLD:</td>
            <td><textarea class="input_field" readonly id="txt_related_items"></textarea></td>
            <td>MOLD LOCATION:</td>
            <td><input type="text" class="input_field" placeholder="Mold Location" readonly id="txt_mold_location" style="width: 100px"></td>
        </tr>
    </tbody>
</table>
</div>