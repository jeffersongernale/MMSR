{{-- @extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Login') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('E-Mail Address') }}</label>

                            <div class="col-md-6">
                                <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>

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
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Login') }}
                                </button>

                                @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                @endif
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection --}}

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
    <!-- Bootstrap 3.3.7 -->
<link rel="stylesheet" href="/MMSR/themes/bower_components/bootstrap/dist/css/bootstrap.min.css">
</head>
<body class="hold-transition login-page login_container">
        <div class="login-box" style="padding-top: 20px">
        <div class="login-box-body text-center">
            
                <img src="{{asset('images/LOGO-white.png')}}" style='height: 300px; width: 300px'>
                <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="form-group row pull-center">
                            {{-- <label for="username" class="col-md-4 col-form-label text-md-right">{{ __('Username') }}</label> --}}

                            <div class="col-md-12">
                                <input id="username" type="text" class="form-control{{ $errors->has('username') ? ' is-invalid' : '' }}" 
                                name="username" value="{{ old('username') }}" required autofocus placeholder="Username">

                                @if ($errors->has('username'))
                                    <span class="invalid-feedback" role="alert" style="color:#e24a69">
                                        *<strong>{{ $errors->first('username') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            {{-- <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('Password') }}</label> --}}

                            <div class="col-md-12">
                                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" 
                                name="password" required placeholder="Password">

                                @if ($errors->has('password'))
                                    <span class="invalid-feedback" role="alert"style="color:#e24a69">
                                        *<strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                       {{--  <div class="form-group row">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                    <label class="form-check-label" for="remember">
                                        {{ __('Remember Me') }}
                                    </label>
                                </div>
                            </div>
                        </div> --}}

                        <div class="form-group row mb-0">
                            <div class="col-md-12" style="text-align:center">
                                <button type="submit" class="btn btn-primary" style="width:90%">
                                    {{ __('Sign In') }}
                                </button>
                                <br>
                                @if (Route::has('password.request'))
                                    <a class="btn btn-link" href="{{ route('password.request') }}">
                                        {{ __('Forgot Your Password?') }}
                                    </a>
                                @endif
                                <br>
                                <a class="btn btn-link" href="{{ route('register') }}">
                                   Create an Account? 
                                </a>
                            </div>
                        </div>
                    </form>
            
            
              </div>
        </div>

</body>
</html>
