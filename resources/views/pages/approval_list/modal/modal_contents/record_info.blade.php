<div class="row">
    <div class="col-sm-12">
            <span class="text-header pull-left">
            Fujitsu Die Tech Corp of the Phils. <br>
            Manufacturing Division<br>
            Press 2-Shaft and Mold
            </span>
            <img src="{{asset('images/fujitsu.jpg')}}" class="pull-right img-responsive image_file_logo">
    </div>
</div>

<hr>

<table class="table table-bordered text-center table-striped record_info_cont">
        <tbody>
                <tr>
                        <td>
                        <label for="lbl_drawing_no" class="col-sm-4 control-label">Drawing No:</label>
                        <div class="col-sm-8">
                                <input type="text" class="form-control input_field" readonly id="txt_drawing_no" placeholder="Input Drawing No." tabindex="1" list="drawing_list">
                                <datalist id="drawing_list">
                                        @foreach ($main as $main_item)
                                        <option value="{{$main_item->drawing_no}}">
                                        @endforeach
                                </datalist>
                        </div>
                        </td>
                        <td>
                        <label for="lbl_machine_no" class="col-sm-4 control-label">Machine No:</label>
                        <div class="col-sm-8">
                                {{-- <input type="text" class="form-control input_field" readonly id="txt_machine_no" placeholder="Input Machine No." tabindex="1" list="drawing_list"> --}}
                                <select class="form-control" id="txt_machine_no" onchange="Registration.slc_machine()" tabindex="4" disabled>
                                        <option value="0">SELECT MACHINE</option>
                                        @foreach ($Machine as $machine_item)
                                        <option value="{{$machine_item->id}}" data-tonnage="{{$machine_item->machine_ton}}">{{$machine_item->machine_code}}</option>
                                        @endforeach
                                </select>
                        </div>
                        </td>
                        <td>
                        <label for="lbl_matl_name" class="col-sm-4 control-label">Mat'l Name:</label>
                        <div class="col-sm-8"><input type="text" class="form-control input_field" readonly id="txt_matl_name" placeholder="Input Material No." tabindex="6"></div>
                        </td>
                        <td>
                        <label for="lbl_resin_temp" class="col-sm-4 control-label">Resin Temp:</label>
                        <div class="col-sm-8"><input type="text" class="form-control input_field" readonly id="txt_resin_temp" placeholder="Input Resin Temperature" tabindex="9"></div>
                        </td>
                </tr>
                <tr>
                        <td>
                        <label for="lbl_rev_no" class="col-sm-4 control-label">Revision No:</label>
                        <div class="col-sm-8">
                                <input type="text" class="form-control input_field" readonly id="txt_rev_no" placeholder="Input Revision No." tabindex="2">
                        </div>
                        </td>
                        <td>
                        <label for="lbl_machine_ton" class="col-sm-4 control-label">Machine Tonnage:</label>
                        <div class="col-sm-8"><input readonly type="text" class="form-control input_field" readonly id="txt_machine_tonnage" placeholder="Input Machine Tonnage"></div>
                        </td>
                        <td>
                        <label for="lbl_matl_grade" class="col-sm-4 control-label">Mat'l Grade:</label>
                        <div class="col-sm-8"><input type="text" class="form-control input_field" readonly id="txt_matl_grade" placeholder="Input Material Grade" tabindex="7"></div>
                        </td>
                        <td>
                        <label for="lbl_drying_temp" class="col-sm-4 control-label">Drying Temp:</label>
                        <div class="col-sm-8"><input type="text" class="form-control input_field" readonly id="txt_drying_temp" placeholder="Input Drying Temperature" tabindex="10"></div>
                        </td>
                </tr>
                <tr>
                        <td>
                        <label for="lbl_drawing_name" class="col-sm-4 control-label">Drawing Name:</label>
                        <div class="col-sm-8"><input type="text" class="form-control input_field" readonly id="txt_drawing_name" placeholder="Input Drawing Name" tabindex="3"></div>
                        </td>
                        <td>
                        <label for="lbl_color_no" class="col-sm-4 control-label">Color No:</label>
                        <div class="col-sm-8"><input type="text" class="form-control input_field" readonly id="txt_color_no" placeholder="Input Color No" tabindex="5"></div>
                        </td>
                        <td>
                        <label for="lbl_matl_color" class="col-sm-4 control-label">Mat'l Color:</label>
                        <div class="col-sm-8"><input type="text" class="form-control input_field" readonly id="txt_matl_color" placeholder="Input Material Color" tabindex="8"></div>
                        </td>
                        <td>
                        <label for="lbl_drying_hours" class="col-sm-4 control-label">Drying Hours:</label>
                        <div class="col-sm-8"><input type="text" class="form-control input_field" readonly id="txt_drying_hrs" placeholder="Input Drying Hours" tabindex="11"></div>
                        </td>
                </tr>
        </tbody>
</table>