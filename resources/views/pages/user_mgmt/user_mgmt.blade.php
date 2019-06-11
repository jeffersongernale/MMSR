@extends('template.app')

@section('additional_styles')
<link rel="stylesheet" href="/MMSR/node_modules/sweetalert2/dist/sweetalert2.min.css">
<link href="/MMSR/node_modules/bootstrap4-toggle/css/bootstrap4-toggle.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="/MMSR/node_modules/select2/dist/css/select2.min.css">
<link rel="stylesheet" href="/MMSR/node_modules/datatables.net-dt/css/jquery.dataTables.min.css">

@endsection

@section('content')

<section class="content-header">
        <h1>
           User Management
            <small>Control panel</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
            <li class="active">User Management</li>
        </ol>
</section>

<section class="content">
      
    <div class="row">
        <div class="col-lg-6">
                <div class="panel panel-black std_height" style="height: 85vh">
                        <div class="panel-heading">
                               <h4 class="box-title"> <i class="fa fa-users"></i> &nbsp<b>User Lists</b></h4></div>
                        <div class="panel-body">
                                <table class="table table-sm table-hover" id="datatable">
                                        <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">CTRLS</th>
                                            <th scope="col">PICTURE</th>
                                            <th scope="col">NAME</th>
                                            <th scope="col">USERNAME</th>
                                            <th scope="col">USER TYPE</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                </table>
                    
                        </div>
                </div>
        </div>
        <div class="col-lg-6">
                <div class="panel panel-black" style="height: 85vh">
                        <div class="panel-heading">
                               <h4 class="box-title"> <i class="fa fa-user-plus"></i> &nbsp<b>User Information</b></h4></div>
                        <div class="panel-body">
                        <form method="post" id="upload_form" enctype="multipart/form-data">
                        @csrf
                            <div class="row">
                                <div class="col-lg-3"></div>
                                <div class="col-lg-6" style="text-align:center">
                                    <img src="{{asset('upload/picture/default.png')}}" id="profile_pic" style="height: 100px; width:100px;border-radius: 100px">
                                </div>
                            </div>
                            <div class="row">
                                    <div class="col-lg-3"></div>
                                    <div class="col-lg-6" style="text-align:center"><b>Picture:(Optional)</b> 
                                        <input type="file" class="form-control" id="file_picture" name="file_picture"></div>
                            </div>
                            <hr>
                            <div class="row">
                                
                                    <div class="col-lg-6"><b>Complete Name:</b> 
                                        <input type="text" class="form-control" id="txt_name" placeholder="Input Complete Name" name="txt_name" required>
                                    </div>
                                    <div class="col-lg-6"><b>Email Address (Optional):</b> 
                                        <input type="text" class="form-control" id="txt_email" placeholder="Input Email Address" name="txt_email">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6"><b>User Type:</b> 
                                        <select id="slc_user_type" class="form-control" name='slc_user_type'>
                                            <option value="User">User</option>
                                            <option value="Administrator">Administrator</option>
                                            <option value="PIC">PIC</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-6"><b>Username:</b> 
                                        <input type="text" class="form-control" id="txt_username" placeholder="Input Username" name="txt_username" required>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6"><b>Password:</b> 
                                        <input type="password" class="form-control" id="txt_password" placeholder="Input Password" name="password" required>
                                    </div>
                                    <div class="col-lg-6"><b>Confirm Password:</b> 
                                        <input type="password" class="form-control" id="txt_confirm_password" placeholder="Confirm Password" name="password_confirmation" required>
                                    </div>
                                </div>
                            <hr>
                          
                                <h4 class="box-title"> <i class="fa fa-user-plus"></i> &nbsp<b>User's Role And Privilege</b></h4>
                            <hr>
                                <br>
                            <div class="row">
                                <div class="col-lg-6">
                                    <table style="width:500px;" class="table">
                                    <tr>
                                        <td>
                                            <input name="checker" id="chk_check" class="form-check-input" type="checkbox" data-toggle="toggle" data-on="YES" data-off="NO" data-offstyle="danger">
                                            <label for="chk_check" class="form-check-label"> CHECK</label>
                                        </td>
                                        <td>
                                            <input name="reviewer" id="chk_review" class="form-check-input" type="checkbox" data-toggle="toggle" data-on="YES" data-off="NO" data-offstyle="danger">
                                            <label for="chk_review" class="form-check-label"> REVIEW</label>
                                        </td>
                                        <td>
                                            <input name="approver" id="chk_approve" class="form-check-input" type="checkbox" data-toggle="toggle" data-on="YES" data-off="NO" data-offstyle="danger">
                                            <label for="chk_approve" class="form-check-label"> APPROVE</label>
                                        </td>
                                    </tr>
                                    </table>
                                         
                                </div>
                            </div>
                            <hr>
                            <br>
                            <button class="btn btn-danger btn_submit pull-right" style="margin-left: 10px"><span class="fa fa-times"></span> CANCEL</button> 
                            <button class="btn btn-success btn_submit pull-right" type="submit" style="margin-left: 10px"><span class="fa fa-save"></span> SAVE</button>                          
                        </form>
                        <button class="btn btn-primary btn_submit pull-right" style="margin-left: 10px" id="btn_update" data-id="0" onclick="UserMgmt.update()"><span class="fa fa-check-circle"></span> UPDATE</button>

                        </div>
                </div>
        </div>
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