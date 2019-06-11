@foreach ($mold_checksheet as $item)
    <table class="table table-bordered text-center table-striped tbl" border="1" style="width: 100%">
        <thead>
            <tr>
                <th colspan="3">DURING SET-UP</th>
            </tr>
            <tr>
                <th>CHECK ITEMS</th>
                <th>REQUIRED</th>
                <th>ACTUAL</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <p>Check the clamps if properly attached and well tightened. It should not block any parts of the mold die.</p>
                </td>
                <td>
                    <p>required</p>
                </td>
                <td>
                        <label class="form-control input_field" id="chk_input1">
                            @if ($item['input_1']=="true")
                                OK
                            @else
                                --
                            @endif
                        </label>
                </td>
            </tr>
            <tr>
                <td>
                    <p>Check the Medium used.</p>
                </td>
                <td>
                    <p>Oil/Water</p>
                </td>
                <td>
                    
                    <label class="form-control input_field" id="slc_input2">{{$item['input_2']}}</label>
                </td>
            </tr>
            <tr>
                <td>
                    <p>Check the hose and fittings for leak</p>
                </td>
                <td>
                    <p>required</p>
                </td>
                <td>
                        <label class="form-control input_field" id="chk_input3">
                            @if ($item['input_3']=="true")
                                OK
                            @else
                                --
                            @endif
                        </label>
                </td>
            </tr>
            <tr>
                <td>
                    <p>Check the circulation of medium by tounching the actual hose on die. The circulation pressure must be feel by hand.</p>
                </td>
                <td>
                    <p>required</p>
                </td>
                <td>
                    <label class="form-control input_field" id="chk_input4">
                        @if ($item['input_4']=="true")
                            OK
                        @else
                            --
                        @endif
                    </label>
                </td>
            </tr>
            <tr>
                <td>
                    <p>Check the actual pressure reading of medium on MTC gauge.</p>
                </td>
                <td>
                    <p>0.1~0.5</p>
                </td>
                <td>
                    <label class="form-control input_field" id="txt_input5">{{$item['input_5']}}</label>
                </td>
            </tr>
        </tbody>
    </table>
   <br>
    <table class="table table-bordered text-center table-striped tbl" border="1" style="width: 100%">
        <thead>
            <tr>
                <th colspan="3">BEFORE PRODUCTION/TRIAL</th>
            </tr>
            <tr>
                <th>CHECK ITEMS</th>
                <th>REQUIRED</th>
                <th>ACTUAL</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <p>Check the master copy or the old parameter for reference.</p>
                </td>
                <td>
                    <p>required</p>
                </td>
                <td>
                    <label class="form-control input_field" id="chk_input6">
                        @if ($item['input_6']=="true")
                            OK
                        @else
                            --
                        @endif
                    </label>
                </td>
            </tr>
            <tr>
                <td>
                    <p>If parameter is not present, carefully set the clamping position to appropriate value.</p>
                </td>
                <td>
                    <p>required</p>
                </td>
                <td>
                <label class="form-control input_field" id="chk_input7">
                    @if ($item['input_7']=="true")
                        OK
                    @else
                        --
                    @endif
                </label>
                </td>
            </tr>
            <tr>
                <td>
                    <p>Execute AUTO DIE HEIGHT</p>
                </td>
                <td>
                    <p>required</p>
                </td>
                <td>
                    <label class="form-control input_field" id="chk_input8">
                        @if ($item['input_8']=="true")
                            OK
                        @else
                            --
                        @endif
                    </label>
                </td>
            </tr>
            <tr>
                <td>
                    <p>Clean Core and cavity insert using IPA and airgun if necessary.</p>
                </td>
                <td>
                    <p>required</p>
                </td>
                <td>
                    <label class="form-control input_field" id="chk_input9">
                        @if ($item['input_9']=="true")
                            OK
                        @else
                            --
                        @endif
                    </label>
                </td>
            </tr>
        </tbody>
    </table>
{{-- <div style="text-align:left">
    <b>Note:</b>
    <ul>
        <li>It is allowed to use "before production" or "after production" or both when trial is concluded.</li>
        <li>If appearance problem occur during initial shots (stains, dirt, etc.), call the attention on DPM personnel.</li>
        <li>DPM on mold die is always apply every after production.</li>
    </ul>
</div> --}}

@endforeach