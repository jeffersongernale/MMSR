<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Alarm_Logs;
use DateTime;
use Mail;
use App\User;
class EmailController extends Controller
{
    //

    public function check_tolerance_email(Request $request){


        $check_logs = Alarm_Logs::where('parameter_setting',request('parameter_setting'))
                                ->where('main_register_id',request('main_reg_id'))
                                ->where('status','ISSUE')
                                ->first();
        
        if(!$check_logs){

            $insert_logs = new Alarm_Logs();
            $insert_logs->parameter_setting = request('parameter_setting');
            $insert_logs->main_register_id = request('main_reg_id');
            $insert_logs->user_id = Auth::user()->id;
            $insert_logs->save();

            $data = [
                'user' => Auth::user()->name,
                'start_time' => $insert_logs->created_at,
                'id'=>$insert_logs->id
            ];
    
            $email_from = User::where('email_receive',1)->get();
            foreach($email_from as $value){
                Mail::send(['html'=>'pages.mail.alarm_mail'],['data'=>$data],function($message){
                    $message->to($value->email)->subject('MMSR - Check Tolerance (ISSUE)');
                });
            }
          
        }
    }

    public function alarm_dismiss(Request $request){

        $user = User::where('username',request('username'))->first();

        $update_logs = Alarm_Logs::where('parameter_setting',request('parameter_setting'))
                                    ->where('main_register_id',request('main_reg_id'))
                                    ->where('status','ISSUE')
                                    ->update(['PIC'=> $user->id,'status'=>'RESOLVE']);

        
        $select_logs = Alarm_Logs::where('parameter_setting',request('parameter_setting'))
                                    ->where('main_register_id',request('main_reg_id'))
                                    ->orderBy('updated_at','DESC')
                                    ->first();

      /*   $date1 = new DateTime($select_logs->created_at);
        $date2 = new DateTime($select_logs->updated_at);

        $diff_date = $date2-$date1; */

        $data = [
            'user' => Auth::user()->name,
            'start_time' =>$select_logs->created_at,
            'resolve_time' =>$select_logs->updated_at,
            'id'=>$select_logs->id,
            'resolve_user'=>$user->name
        ];

        $email_from = User::where('email_receive',1)->get();
        foreach($email_from as $value){
            $email_name = $value->email;
            Mail::send(['html'=>'pages.mail.alarm_dismiss'],['data'=>$data],function($message) use($email_name){
                $message->to($email_name)->subject('MMSR - Check Tolerance (RESOLVED)');
            });
        }
    }
}
