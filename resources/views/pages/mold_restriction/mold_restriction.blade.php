@extends('template.app')

@section('additional_styles')
{{-- <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css"> --}}
<link rel="stylesheet" href="/MMSR/node_modules/datatables.net-dt/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="/MMSR/node_modules/sweetalert2/dist/sweetalert2.min.css">
<link rel="stylesheet" href="/MMSR/node_modules/select2/dist/css/select2.min.css">
@endsection

@section('content')
<!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            Mold Restriction
            <small>Control panel</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
            <li class="active">Mold Restriction List</li>
        </ol>
    </section>

    <section class="content">

        <div class="row">
            <div class="col-sm-6">
                <div class="panel panel-black">
                        <div class="panel-heading" data-toggle="collapse" data-target="#div_body_regsetup">
                                <h4 class="box-title"> <i class="fa  fa-list-ol"></i> &nbsp<b>REGISTERED MOLD LIST</b></h4></div>
                        <div class="panel-body collapse in" id="div_body_regsetup">
                                <div class="row">
                                    <div class="col-sm-3"> 
                                        PART NO: 
                                            <select class="select2" id="slc_part_no">
                                                <option value=''>SELECT PART NO</option>
                                                @foreach ($main as $main_item)
                                                <option value="{{$main_item->drawing_no}}">{{$main_item->drawing_no}}</option>
                                                @endforeach
                                            </select>
                                    </div>
                                    <div class="col-sm-3"> 
                                        MOLD NO: 
                                            <select class="select2" id="slc_mold_no">
                                                    <option value=''>SELECT MOLD NO</option>
                                                    @foreach ($main as $main_item)
                                                    @if ($main_item->mold_no!=null)
                                                    <option value="{{$main_item->mold_no}}">{{$main_item->mold_no}}</option>
                                                    @endif
                                                    @endforeach
                                            </select>
                                    </div>
                                    <div class="col-sm-2"> 
                                        MACHINE NO: 
                                            <select class="select2" id="slc_machine_no">
                                                    <option value=''>SELECT MACHINE NO</option>
                                                @foreach ($Machine as $machine_item)
                                                    <option value="{{$machine_item->id}}">{{$machine_item->machine_code}}</option>
                                                @endforeach
                                            </select>
                                    </div>
                                    <div class="col-sm-4" style="padding-top: 15px;text-align:right">
                                        <button class="btn_search btn btn-primary btn-sm" onclick="mold_restrict.reg_loadtable('destroy')" title="SEARCH"><i class="fa fa-search"></i>SEARCH</button>&nbsp&nbsp
                                        <button class="btn_search btn btn-danger btn-sm" id="btn_clear_search" onclick="mold_restrict.clear_search('reglist')" title="CANCEL SEARCH"><i class="fa fa-times-circle"></i>CANCEL</button>
                                    </div>
                                </div><br>
                            <div class="table-responsive">
                                <table class="table table-sm table-hover" id="datatable">
                                        <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">CTRLS</th>
                                            <th scope="col">DRAWING NO</th>
                                            <th scope="col">MOLD NO</th>
                                            <th scope="col">MACHINE NO</th>
                                            <th scope="col">RECORD TYPE</th>
                                            <th scope="col">DRAWING NAME</th>
                                            <th scope="col">REVISION NO</th>
                                            <th scope="col">DATE TIME</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                </table>
                            </div>
                            
                        </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="panel panel-black">
                        <div class="panel-heading" data-toggle="collapse" data-target="#div_body_regsetup">
                                <h4 class="box-title"> <i class="fa fa-exclamation-triangle"></i> &nbsp<b>RESTRICTED MOLD LIST</b></h4></div>
                        <div class="panel-body collapse in" id="div_body_regsetup">
                        
                            <div class="row">
                                <div class="col-sm-3"> 
                                    PART NO: 
                                        <select class="select2" id="slc_part_no_block">
                                            <option value=''>SELECT PART NO</option>
                                            @foreach ($main as $main_item)
                                            <option value="{{$main_item->drawing_no}}">{{$main_item->drawing_no}}</option>
                                            @endforeach
                                        </select>
                                </div>
                                <div class="col-sm-3"> 
                                    MOLD NO: 
                                        <select class="select2" id="slc_mold_no_block">
                                                <option value=''>SELECT MOLD NO</option>
                                                @foreach ($main as $main_item)
                                                @if ($main_item->mold_no!=null)
                                                <option value="{{$main_item->mold_no}}">{{$main_item->mold_no}}</option>
                                                @endif
                                                @endforeach
                                        </select>
                                </div>
                                <div class="col-sm-3"> 
                                    MACHINE NO: 
                                        <select class="select2" id="slc_machine_no_block">
                                                <option value=''>SELECT MACHINE NO</option>
                                            @foreach ($Machine as $machine_item)
                                                <option value="{{$machine_item->id}}">{{$machine_item->machine_code}}</option>
                                            @endforeach
                                        </select>
                                </div>
                                <div class="col-sm-3" style="padding-top: 15px;text-align:right">
                                    <button class="btn_search btn btn-primary btn-sm" onclick="mold_restrict.block_loadtable('destroy')" title="SEARCH"><i class="fa fa-search"></i>SEARCH</button>
                                    &nbsp&nbsp
                                    <button class="btn_search btn btn-danger btn-sm" id="btn_clear_search" onclick="mold_restrict.clear_search('blocklist')" title="CANCEL SEARCH"><i class="fa fa-times-circle"></i>CANCEL</button>
                                </div>
                            </div><br>
                        <div class="table-responsive">
                            <table class="table table-sm table-hover" id="datatable_block">
                                    <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">CTRLS</th>
                                        <th scope="col">DRAWING NO</th>
                                        <th scope="col">MOLD NO</th>
                                        <th scope="col">MACHINE NO</th>
                                        <th scope="col">RECORD TYPE</th>
                                        <th scope="col">DRAWING NAME</th>
                                        <th scope="col">REVISION NO</th>
                                        <th scope="col">DATE TIME</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                            </table>
                        </div>
                            
                        </div>
                </div>
            </div>
        </div>
            
    </section>

    @include('pages.mold_restriction.modal_view')

@endsection

@section('additional_scripts')
<script src="{{asset('js/mold_restricted.js')}}" defer></script>
<script src="{{asset('js/navbar.js')}}" defer></script>
<script src="/MMSR/node_modules/iziToast/dist/js/iziToast.min.js" defer></script>
<script src="/MMSR/node_modules/select2/dist/js/select2.min.js" defer></script>

<script type="text/javascript" src="/MMSR/node_modules/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="/MMSR/node_modules/sweetalert2/dist/sweetalert2.min.js"></script>

<script>
        $(document).ready(function(){
            $.ajaxSetup({
                headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            mold_restrict.reg_loadtable();
            mold_restrict.block_loadtable();

        });
</script>

@endsection