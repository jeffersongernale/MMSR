@extends('template.app')

@section('additional_styles')
{{-- <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css"> --}}
<link rel="stylesheet" href="/MMSR/node_modules/datatables.net-dt/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="/MMSR/node_modules/sweetalert2/dist/sweetalert2.min.css">
<link rel="stylesheet" href="/MMSR/node_modules/select2/dist/css/select2.min.css">
@endsection

@section('content')

<section class="content-header">
        <h1>
            Master Copy
            <small>Control panel</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
            <li class="active">Master Copy</li>
        </ol>
    </section>

    <section class="content">
            <div class="panel panel-black">
                <div class="panel-heading" data-toggle="collapse" data-target="#div_body_regsetup">
                        <h4 class="box-title"> <i class="fa  fa-list-ol"></i> &nbsp<b>MASTER LIST</b></h4></div>
                <div class="panel-body collapse in" id="div_body_regsetup">
                    <div class="row">
                        <div class="col-lg-3"></div>
                        <div class="col-lg-2"> 
                            PART NO: 
                                <select class="select2 form-control" id="slc_part_no">
                                    <option value=''>SELECT PART NO</option>
                                    @foreach ($main as $main_item)
                                    <option value="{{$main_item->drawing_no}}">{{$main_item->drawing_no}}</option>
                                    @endforeach
                                </select>
                        </div>
                        <div class="col-lg-2"> 
                            MOLD NO: 
                                <select class="select2 form-control" id="slc_mold_no">
                                        <option value=''>SELECT MOLD NO</option>
                                        @foreach ($main as $main_item)
                                        @if ($main_item->mold_no!=null)
                                        <option value="{{$main_item->mold_no}}">{{$main_item->mold_no}}</option>
                                        @endif
                                        @endforeach
                                </select>
                        </div>
                        <div class="col-lg-2"> 
                            MACHINE NO: 
                                <select class="select2 form-control" id="slc_machine_no">
                                        <option value=''>SELECT MACHINE NO</option>
                                    @foreach ($Machine as $machine_item)
                                        <option value="{{$machine_item->id}}">{{$machine_item->machine_code}}</option>
                                    @endforeach
                                </select>
                        </div>
                        <div class="col-lg-3" style="padding-top: 10px;">
                            <button class="btn_search btn btn-primary" onclick="Master_Copy.loadtable('destroy')">SEARCH</button>
                            <button class="btn_search btn btn-primary" id="btn_clear_search" onclick="Master_Copy.clear_search()">CLEAR SEARCH</button>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-sm table-hover" id="datatable">
                            <thead class="thead-dark">
                            <tr>
                                <th scope="col">CTRLS</th>
                                <th scope="col">DRAWING NO</th>
                                <th scope="col">REVISION NO</th>
                                <th scope="col">DRAWING NAME</th>
                                <th scope="col">MACHINE NO</th>
                                <th scope="col">MOLD NO</th>
                                <th scope="col">RECORD TYPE</th>
                                <th scope="col">DATE TIME</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
      
            @include('pages.master_copy.modal_master_copy')
    </section>
@endsection


@section('additional_scripts')
<script src="{{asset('js/master_copy.js')}}" defer></script>
<script src="{{asset('js/navbar.js')}}" defer></script>
<script src="{{asset('js/print.js')}}" defer></script>
<script src="/MMSR/node_modules/select2/dist/js/select2.min.js" defer></script>
<script src="{{asset('js/view_arrangement.js')}}" defer></script>

<script type="text/javascript" src="/MMSR/node_modules/datatables.net/js/jquery.dataTables.min.js" defer></script>
<script src="/MMSR/node_modules/sweetalert2/dist/sweetalert2.min.js" defer></script>
<script src="/MMSR/node_modules/select2/dist/js/select2.min.js" defer></script>

<script>
        $(document).ready(function(){
            $.ajaxSetup({
                headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            Master_Copy.loadtable();
        });
</script>



@endsection