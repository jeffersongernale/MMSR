@extends('template.app')

@section('additional_styles')
{{-- <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css"> --}}
<link rel="stylesheet" href="/MMSR/node_modules/datatables.net-dt/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="/MMSR/node_modules/sweetalert2/dist/sweetalert2.min.css">
<link rel="stylesheet" href="/MMSR/node_modules/animate.css/animate.min.css">
<link rel="stylesheet" href="/MMSR/node_modules/select2/dist/css/select2.min.css">
@endsection

@section('content')

    <section class="content-header">
        <h1>
            Set up Logs
            <small>Control panel</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
            <li class="active">Setup Log</li>
        </ol>
    </section>
    <section class="content">
        <div class="panel panel-black">
                <div class="panel-heading" data-toggle="collapse" data-target="#div_body_regsetup">
                       <h4 class="box-title"> <i class="ion ion-clipboard"></i> &nbsp<b>SET UP LIST</b></h4></div>
                <div class="panel-body collapse in" id="div_body_regsetup">
                    <div class="table-responsive"  id="setup_tbl_cont">
                        
                    </div>
                </div>
        </div>
</section>


@endsection

@section('additional_scripts')
<script src="{{asset('js/setup_logs.js')}}" defer></script>
<script src="/MMSR/node_modules/select2/dist/js/select2.min.js" defer></script>


{{-- <script type="text/javascript" src="/MMSR/node_modules/datatables.net/js/jquery.dataTables.min.js"></script> --}}
<script src="/MMSR/node_modules/sweetalert2/dist/sweetalert2.min.js"></script>

<script>
        $(document).ready(function(){

            $.ajaxSetup({
            headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }

        });
            Setup_Logs.loadtable();
           
          });
</script>


@endsection