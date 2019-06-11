@extends('template.app')

@section('additional_styles')
<link rel="stylesheet" href="/MMSR/node_modules/sweetalert2/dist/sweetalert2.min.css">
<link rel="stylesheet" href="/MMSR/node_modules/iziToast/dist/css/iziToast.min.css">
<link href="/MMSR/node_modules/bootstrap4-toggle/css/bootstrap4-toggle.css" rel="stylesheet" type="text/css">
@endsection

@section('content')
      <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            Mold Machine Set up Registration
            <small>Control panel</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
            <li class="active">Mold Machine Registration</li>
        </ol>
    </section>

    <section class="content">
      

        <div class="panel panel-black">
                <div class="panel-heading" data-toggle="collapse" data-target="#div_body_regsetup">
                       <h4 class="box-title"> <i class="ion ion-clipboard"></i> &nbsp<b>REGISTER SETUP</b></h4></div>
                <div class="panel-body collapse in" id="div_body_regsetup">
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
                        {{-- <button onclick="Registration.test()">go</button> --}}
                        <hr>
                        <table class="table table-bordered text-center">
                                <tbody>
                                        <tr>
                                                <td>
                                                <label for="lbl_drawing_no" class="col-sm-4 control-label">Drawing No:</label>
                                                <div class="col-sm-8">
                                                        <input type="text" class="form-control required_field input_field" 
                                                        id="txt_drawing_no" placeholder="Input Drawing No." tabindex="1" list="drawing_list" name="Drawing No">
                                                        <datalist id="drawing_list">
                                                                @foreach ($Drawing_no as $Drawing_no_item)
                                                                <option value="{{$Drawing_no_item->drawing_no}}">
                                                                @endforeach
                                                        </datalist>
                                                </div>
                                                </td>
                                                <td>
                                                <label for="lbl_machine_no" class="col-sm-4 control-label">Machine No:</label>
                                                <div class="col-sm-8">
                                                        <select class="form-control required_field input_field" id="slc_machine_no" onchange="Registration.slc_machine()" tabindex="4"  name="Machine No">
                                                        <option value="0">SELECT MACHINE</option>
                                                        @foreach ($Machine as $machine_item)
                                                        <option value="{{$machine_item->id}}" data-tonnage="{{$machine_item->machine_ton}}">{{$machine_item->machine_code}}</option>
                                                        @endforeach
                                                        </select>
                                                </div>
                                                </td>
                                                <td>
                                                <label for="lbl_matl_name" class="col-sm-4 control-label">Mat'l Name:</label>
                                                <div class="col-sm-8">
                                                        <input type="text" class="form-control required_field input_field" id="txt_matl_name" placeholder="Input Material No." tabindex="6" list="matl_name_list" name="Material Name"></div>
                                                        <datalist id="matl_name_list">
                                                                        @foreach ($matl_name as $matl_name_item)
                                                                        <option value="{{$matl_name_item->matl_name}}">
                                                                        @endforeach
                                                        </datalist>
                                                </td>
                                                <td>
                                                <label for="lbl_resin_temp" class="col-sm-4 control-label">Resin Temp:</label>
                                                <div class="col-sm-8"><input type="text" class="form-control  required_field input_field" id="txt_resin_temp" placeholder="Input Resin Temperature" tabindex="9"  name="Resin Temperature"></div>
                                                </td>
                                        </tr>
                                        <tr>
                                                <td>
                                                <label for="lbl_rev_no" class="col-sm-4 control-label">Revision No:</label>
                                                <div class="col-sm-8"><input type="text" class="form-control required_field input_field" id="txt_rev_no" placeholder="Input Revision No." tabindex="2"  name="Revision No"></div>
                                                </td>
                                                <td>
                                                <label for="lbl_machine_ton" class="col-sm-4 control-label">Machine Tonnage:</label>
                                                <div class="col-sm-8"><input readonly type="text" class="form-control input_field" id="txt_machine_tonnage" placeholder="Input Machine Tonnage"  name="Machine Tonnage"></div>
                                                </td>
                                                <td>
                                                <label for="lbl_matl_grade" class="col-sm-4 control-label">Mat'l Grade:</label>
                                                <div class="col-sm-8">
                                                        <input type="text" class="form-control required_field input_field" id="txt_matl_grade" placeholder="Input Material Grade" tabindex="7"  name="Material Grade" list = "matl_grade_list">
                                                        <datalist id="matl_grade_list">
                                                                @foreach ($matl_grade as $matl_grade_item)
                                                                <option value="{{$matl_grade_item->matl_grade}}">
                                                                @endforeach
                                                        </datalist>
                                                </div>
                                                </td>
                                                <td>
                                                <label for="lbl_drying_temp" class="col-sm-4 control-label">Drying Temp:</label>
                                                <div class="col-sm-8"><input type="text" class="form-control required_field input_field" id="txt_drying_temp" placeholder="Input Drying Temperature" tabindex="10"  name="Drying Temperature"></div>
                                                </td>
                                        </tr>
                                        <tr>
                                                <td>
                                                <label for="lbl_drawing_name" class="col-sm-4 control-label">Drawing Name:</label>
                                                <div class="col-sm-8"><input type="text" class="form-control required_field input_field" id="txt_drawing_name" placeholder="Input Drawing Name" tabindex="3"  name="Drying Name"></div>
                                                </td>
                                                <td>
                                                <label for="lbl_color_no" class="col-sm-4 control-label">Color No:</label>
                                                <div class="col-sm-8"><input type="text" class="form-control required_field input_field" id="txt_color_no" placeholder="Input Color No" tabindex="5"  name="Color No"></div>
                                                </td>
                                                <td>
                                                <label for="lbl_matl_color" class="col-sm-4 control-label">Mat'l Color:</label>
                                                <div class="col-sm-8">
                                                        <input type="text" class="form-control required_field input_field" id="txt_matl_color" placeholder="Input Material Color" tabindex="8"  name="Material Color" list = "matl_color_list"> 
                                                        <datalist id="matl_color_list">
                                                                @foreach ($matl_color as $matl_color_item)
                                                                <option value="{{$matl_color_item->matl_color}}">
                                                                @endforeach
                                                        </datalist>
                                                </div>
                                                </td>
                                                <td>
                                                <label for="lbl_drying_hours" class="col-sm-4 control-label">Drying Hours:</label>
                                                <div class="col-sm-8"><input type="text" class="form-control required_field input_field" id="txt_drying_hrs" placeholder="Input Drying Hours" tabindex="11"  name="Drying Hours"></div>
                                                </td>
                                        </tr>
                                </tbody>
                        </table>
                </div>
        </div>
        
        {{-- MOLD DIE BASIC INFO HTML && PRODUCTION STANDARD PACKAGING HTML --}}
        @include('pages.mold_register.mold_and_product_info')


        <div class="row">
                <div class="col-lg-12">
                        <div class="panel panel-black">
                                <div class="panel-heading" data-toggle="collapse" data-target="#div_body_before_prod"><h4 class="box-title"><i class="fa fa-clock-o"></i><b>&nbspRECORD BEFORE PRODUCTION</b></h4></div>
                                <div class="panel-body collapse in" id="div_body_before_prod">
                                        <div class="row">
                                                <div class="col-lg-6">
                                                        
                                                        {{-- MCT SETTING HTML --}}
                                                        @include('pages.mold_register.mct_setting')

                                                        {{-- CLAMPING AND EJECTING SETTING HTML --}}
                                                        @include('pages.mold_register.clamp_eject')

                                                        {{-- MEASURING AND CONDITION SETTING HTML --}}
                                                        @include('pages.mold_register.measuring_condition')

                                                </div>
                                                <div class="col-lg-6">
                                                       
                                                        {{-- PRODUCT INFORMATION HTML --}}
                                                        @include('pages.mold_register.product_info')

                                                        {{-- CYLINDER TEMPERATURE SETTING --}}
                                                        @include('pages.mold_register.cylinder_temp')

                                                        {{-- INJECTION PACKING SETTING --}}
                                                        @include('pages.mold_register.inj_pack')
                                                       
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        </div>

        <div class="row">
                <div class="col-lg-12">
                        <div class="panel panel-black">
                                <div class="panel-heading" data-toggle="collapse" data-target="#div_ctrls"><h4 class="box-title"><i class="fa fa-clock-o"></i><b>&nbspCONTROLS</b></h4></div>
                                <div class="panel-body collapse in" id="div_ctrls">
                                                <button class="btn btn-danger btn-lg btn_cancel pull-right" style="margin-left: 10px"><span class="fa fa-times"></span>&nbspCANCEL</button>
                                                <button class="btn btn-primary btn-lg btn_submit pull-right" style="margin-left: 10px" onclick="Registration.CheckCtrl()"><span class="fa fa-save"></span>&nbspSAVE</button> &nbsp

                                                <div class="form-check pl-0 pull-right" style="margin-right:40px;">
                                                        <input id="chk_trial" class="form-check-input" type="checkbox" data-toggle="toggle" data-on="YES" data-off="NO" data-offstyle="danger">
                                                        <label for="chk_trial" class="form-check-label"> FOR TRIAL</label>
                                                </div>

                                                <h4><b>REGISTERED BY: </b> {{strtoUpper(Auth::user()->name)}}</h4>
                                                
                                </div>
                        </div>
                </div>
        </div>        
        
       
    </section>
@endsection

@section('additional_scripts')

<script src="{{asset('js/registration.js')}}" defer></script>
<script src="{{asset('js/validation.js')}}" defer></script>
<script src="{{asset('js/navbar.js')}}" defer></script>
<script src="/MMSR/node_modules/iziToast/dist/js/iziToast.min.js" defer></script>
<script src="/MMSR/node_modules/bootstrap4-toggle/js/bootstrap4-toggle.js" defer></script>
{{-- <script src="/MMSR/node_modules/select2/dist/js/select2.min.js" defer></script> --}}
<script src="/MMSR/node_modules/sweetalert2/dist/sweetalert2.min.js" defer></script>

@endsection