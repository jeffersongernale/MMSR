<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    @include('includes.header')
</head>
<body class="hold-transition login-page login_container">
        <div class="login-box">
        <div class="login-box-body">
                <p class="login-box-msg">Sign in to MMSR</p>
            
                <form action="../../index2.html" method="post">
                  <div class="form-group has-feedback">
                    <input type="text" class="form-control" placeholder="Username">
                    <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                  </div>
                  <div class="form-group has-feedback">
                    <input type="password" class="form-control" placeholder="Password">
                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                  </div>
                  <div class="row">
                    <div class="col-xs-8">
                        <a href="#">I forgot my password</a>
                    </div>
                    <!-- /.col -->
                    <div class="col-xs-4">
                      <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
                    </div>
                    <!-- /.col -->
                  </div>
                </form>
            
            
              </div>
        </div>

</body>
</html>