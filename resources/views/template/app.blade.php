<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>{{config('app.name') }}</title>
  @include('includes.header')
  @yield('additional_styles')
</head>
<body class="hold-transition skin-blue sidebar-mini">
    <div id="wait">
        <div class="loader">Loading...</div>
    </div>

<div class="wrapper">

 <!--Top navbar -->
  <header class="main-header">
    @include('template.top_navbar')
  </header>

  <!--  Control RIGHT Sidebar -->
  
    <!-- sidebar: style can be found in sidebar.less -->
    @include('template.left_side_navbar')
    <!-- /.sidebar -->


  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">

      @yield('content')
  

  
  </div>
  
  <!-- /.content-wrapper -->
  @include('includes.footer')
  

  <!-- Control RIGHT Sidebar -->
  @include('template.right_side_navbar')
  <!-- /.control-sidebar -->

  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->
</body>
@include('includes.temp_scripts')
@yield('additional_scripts')
</html>
