@extends('template.app')

@section('additional_styles')
<link rel="stylesheet" href="/MMSR/node_modules/sweetalert2/dist/sweetalert2.min.css">
<link href="/MMSR/node_modules/bootstrap4-toggle/css/bootstrap4-toggle.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="/MMSR/node_modules/select2/dist/css/select2.min.css">
<link rel="stylesheet" href="/MMSR/node_modules/datatables.net-dt/css/jquery.dataTables.min.css">

@endsection

@section('content')
<section class="content">
{{-- <div class="panel panel-black std_height">
    
<div class="panel-body">

       
            
    
</div>
</div> --}}
<div style="width: 30vw; margin: 0 auto">
        <img src="{{asset('images/LOGO-black.png')}}" class="img-responsive">

</div>
</section>
@endsection


@section('additional_scripts')


<script src="/MMSR/node_modules/sweetalert2/dist/sweetalert2.min.js" defer></script>
<script src="/MMSR/node_modules/bootstrap4-toggle/js/bootstrap4-toggle.js" defer></script>
<script src="/MMSR/node_modules/select2/dist/js/select2.min.js" defer></script>
<script src="{{asset('js/usermgmt.js')}}" defer></script>
<script src="{{asset('js/navbar.js')}}" defer></script>
<script type="text/javascript" src="/MMSR/node_modules/datatables.net/js/jquery.dataTables.min.js"></script>

@endsection