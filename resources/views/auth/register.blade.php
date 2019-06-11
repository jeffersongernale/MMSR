

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    {{-- @include('includes.header') --}}
    <link rel="stylesheet" href="/MMSR/themes/dist/css/AdminLTE.css">
    <link rel="stylesheet" href="{{asset('css/custom.css')}}">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="/MMSR/themes/bower_components/font-awesome/css/font-awesome.min.css">
    <!-- Bootstrap 3.3.7 -->
<link rel="stylesheet" href="/MMSR/themes/bower_components/bootstrap/dist/css/bootstrap.min.css">
</head>
<body class="hold-transition login-page login_container" style="overflow: auto">
    <div class="login-box" style="padding-top: 20px">
        <div class="login-box-body text-center">
                <div class="login-box-msg" style=" height: 200px">
                    <img src="{{asset('images/LOGO-white.png')}}" style='height: 250px; width: 250px'>
                </div>
               
                <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">{{ __('Name') }}</label>

                            <div class="col-md-6">
                                <input id="name" type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }}" name="name" value="{{ old('name') }}" required autofocus>

                                @if ($errors->has('name'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                                <label for="username" class="col-md-4 col-form-label text-md-right">{{ __('Username') }}</label>
    
                                <div class="col-md-6">
                                    <input id="username" type="text" class="form-control{{ $errors->has('username') ? ' is-invalid' : '' }}" name="username" value="{{ old('username') }}" required autofocus>
    
                                    @if ($errors->has('username'))
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $errors->first('username') }}</strong>
                                        </span>
                                    @endif
                                </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}">

                                @if ($errors->has('email'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>

                                @if ($errors->has('password'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('Confirm Password') }}</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4 text-center" style=" width: 100%">
                                <button type="submit" class="btn btn-lg btn-primary btn_sub" >
                                    <i class="fa  fa-user-plus"></i>&nbsp{{ __('REGISTER') }}
                                </button>
                                <a class="btn btn-lg btn-danger btn_sub" href="/MMSR/public/login">
                                    <i class="fa fa-undo"></i> &nbspRETURN
                                </a>
                            </div>
                        </div>
                </form>
                
                
                <span style="font-weight:bold; font-size:1em;font-family:Nunito;">
                        <b>NOTE:</b>&nbspRegistering an account through this module will automatically allocate this as a basic user level. If you want to add a new administrator/PIC account, please request it to the authorized system admin.
                        </span>
            
            
        </div>
        </div>

</body>
</html>
