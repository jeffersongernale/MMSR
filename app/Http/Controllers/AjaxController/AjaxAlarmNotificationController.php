<?php

namespace App\Http\Controllers\AjaxController;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\User;
use DB;
use Crypt;

use App\AlarmNotification;

class AjaxAlarmNotificationController extends Controller
{
    //

    public function Check_Alarm_tbl(Request $request)
    {

        $data = AlarmNotification::select('id')
                                ->where('main_register_id',request('main_register_id'))
                                ->where('parameter_setting',request('parameter_setting'))
                                ->first();
        
        if($data)
        {
            return $data->id;
        }
        else{
            return "false";
        }

    }

    public function Check_User(Request $request)
    {

        if (Auth::validate(['username' => request('username'), 'password' => request('password'),'usertype'=>'PIC']))
        {

            $user = User::where('username',request('username'))
                        ->first();
                        
            $insert_alarm_query = new AlarmNotification();
            $insert_alarm_query->parameter_setting = request('parameter');
            $insert_alarm_query->main_register_id=request('main_reg_id');
            $insert_alarm_query->user_id=Auth::user()->id;
            $insert_alarm_query->PIC=$user->id;
            $insert_alarm_query->save();

            return  request('username');


        }
        else{
            return "nomatch";
        }

    }
}
