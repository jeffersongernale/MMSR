<div class="row">
    <div class="col-sm-12">
            <span class="text-header pull-left" style="float:left; font-size: 1em;">
            Fujitsu Die Tech Corp of the Phils. <br>
            Manufacturing Division<br>
            Press 2-Shaft and Mold
            </span>
            <img src="{{asset('images/fujitsu.jpg')}}" style="width: 80px; height: 80px; float: right" class="pull-right img-responsive image_file_logo">
    </div>
</div>
<div style="clear:both"></div>
<hr>

<table class="tbl" border="1" style="width: 100%" >
        <tbody>
                <tr>
                        <td><label for="lbl_drawing_no" class="col-sm-4 control-label" style="font-weight:bold">Drawing No:</label> </td>
                        <td><label class="form-control input_field" id="txt_drawing_no">{{$record_info->drawing_no}}</label></td>

                        <td><label for="lbl_machine_no" class="col-sm-4 control-label" style="font-weight:bold">Machine No:</label></td>
                        <td><label class="form-control input_field" id="txt_machine_no" >{{$record_info->machine_code}}</label></td>

                        <td> <label for="lbl_matl_name" class="col-sm-4 control-label" style="font-weight:bold">Mat'l Name:</label></td>
                        <td><label class="form-control input_field" id="txt_matl_name" >{{$record_info->matl_name}}</label></td>

                        <td><label for="lbl_resin_temp" class="col-sm-4 control-label" style="font-weight:bold">Resin Temp:</label></td>
                        <td><label class="form-control input_field" id="txt_resin_temp" >{{$record_info->resin_temp}}</label></td>

                </tr>
                <tr>
                        <td><label for="lbl_rev_no" class="col-sm-4 control-label" style="font-weight:bold">Revision No:</label></td>
                        <td><label class="form-control input_field" id="txt_rev_no" >{{$record_info->revision_no}}</label></td>
                        <td><label for="lbl_machine_ton" class="col-sm-4 control-label" style="font-weight:bold">Machine Tonnage:</label></td>
                        <td><label class="form-control input_field" id="txt_machine_tonnage" >{{$record_info->machine_ton}}</label></td>
                        <td> <label for="lbl_matl_grade" class="col-sm-4 control-label" style="font-weight:bold" >Mat'l Grade:</label></td>
                        <td><label class="form-control input_field" id="txt_matl_grade" >{{$record_info->matl_grade}}</label></td>
                        <td><label for="lbl_drying_temp" class="col-sm-4 control-label" style="font-weight:bold">Drying Temp:</label></td>
                        <td><label class="form-control input_field" id="txt_drying_temp" >{{$record_info->drying_temp}}</label></td>
                </tr>
                <tr>
                        <td><label for="lbl_drawing_name" class="col-sm-4 control-label" style="font-weight:bold">Drawing Name:</label></td>
                        <td><label class="form-control input_field" id="txt_drawing_name" >{{$record_info->drawing_name}}</label></td>
                        <td><label for="lbl_color_no" class="col-sm-4 control-label" style="font-weight:bold" style="font-weight:bold">Color No:</label></td>
                        <td><label class="form-control input_field" id="txt_color_no" >{{$record_info->color_no}}</label></td>
                        <td><label for="lbl_matl_color" class="col-sm-4 control-label" style="font-weight:bold">Mat'l Color:</label></td>
                        <td><label class="form-control input_field" id="txt_matl_color" >{{$record_info->matl_color}}</label></td>
                        <td><label for="lbl_drying_hours" class="col-sm-4 control-label" style="font-weight:bold">Drying Hours:</label></td>
                        <td><label class="form-control input_field" id="txt_drying_hrs" >{{$record_info->drying_hrs}}</label></td>
                </tr>
        </tbody>
</table>