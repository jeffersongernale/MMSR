
<br>
<div class="table-responsive-xl">
    <table class="table table-bordered text-center">
        <thead>
            <tr>
                <th>PARAMETER SETTING CHANGE</th>
                <th>REASON OF ADJUSTMENT</th>
                <th>ORIGINAL CONDITION</th>
                <th>ADJUSTED CONDITION</th>
                <th>RESULT OF ADJUSTMENT</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="width: 100px"> 
                    <select id="slc_parameter_setting" class="form-control select2" onchange="Reg_List.Change_Parameter();">
                        <option value="mct_setting">MCT SETTING</option>
                        <option value="clamp_eject_setting"> CLAMPING AND EJECTING SETTING</option>
                        <option value="cylinder_temp_setting">CYLINDER TEMPERATURE SETTING</option>
                        <option value="inj_pack_setting">INJECTION/PACK SETTING</option>
                        <option value="measuring_condition_setting">MEASURING CONDITION SETTING</option>
                    </select>
                </td>
                <td style="width: 200px">
                    <select id="slc_reason_of_change" class="form-control select2" onchange="After_Prod.Save_to_temp();">
                        
                        @foreach ($reason as $reason_item)
                        <option value="{{$reason_item->id}}">{{$reason_item->reason_desc}}</option>
                        @endforeach
                        <option value="others">Add Reason?Please Specify..</option>
                    </select>
                </td>
                <td  id="original_condition">
                    @include('pages.registered_list.mct_setting')
                </td>
                <td  id="adjusted_condition">
                    @include('pages.registered_list.mct_setting')
                </td>
                <td class="text-no-wrap" style="width: 100px">
                    <select id="slc_result" class="form-control select2" style="width:100px" onchange = "After_Prod.Save_to_temp();">
                        <option value='unsolved'>PROBLEM STILL EXISTS</option>
                        <option value='solved'>PROBLEM SOLVED</option>
                    </select>
                </td>
            </tr>

        </tbody>
    </table> 
</div>
