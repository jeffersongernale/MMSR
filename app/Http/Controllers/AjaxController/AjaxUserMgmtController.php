<?php

namespace App\Http\Controllers\AjaxController;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Yajra\DataTables\DataTablesServiceProvider;
use Response;
use App\User;


class AjaxUserMgmtController extends Controller
{
    //

    public function __construct(){
        
    }

    public function LoadTable()
    {
        $data = User::where('active_status',1)->get();
        return datatables($data)->make(true);
        
    }

    public function Insert(Request $request)
    {

            if($request->hasFile('file_picture')){
                $file = $request->file('file_picture');
                $newname = $file->getClientOriginalName();
                $file->move(public_path('upload/picture',$newname));
                $newname = $file;
            }
            else{
                $newname = 'C:\xampp\tmp\default.png';
            }
      
            
            $insert_user=new User();
            $insert_user->name= request('txt_name');
            $insert_user->email= request('txt_email');
            $insert_user->password=Hash::make( request('password'));
            $insert_user->username= request('txt_username');
            $insert_user->usertype= request('slc_user_type');
            $insert_user->picture= $newname;
            $insert_user->checker= request('checker');
            $insert_user->reviewer=request('reviewer');
            $insert_user->approver= request('approver');
            $insert_user->save();

            if($insert_user){
                return "true";
            }
            else{
                return "false";
            }
            
      
       

    }

    public function edit(Request $request){

        $data = User::where('id',request('id'))->first();
        return $data;
    }

    public function update(Request $request){

        $pwd = Hash::make(request('password'));

        if(request('password')==""){
            $data =User::where('id',request('id'))
            ->update([
                'name'=>request('name'),
                'email'=>request('email'),
                'usertype'=>request('usertype'),
                'username'=>request('username'),
                'checker'=>request('checker'),
                'reviewer'=>request('reviewer'),
                'approver'=>request('approver')
                ]);
        }
        else{
            $data =User::where('id',request('id'))
            ->update([
                'name'=>request('name'),
                'email'=>request('email'),
                'usertype'=>request('usertype'),
                'username'=>request('username'),
                'checker'=>request('checker'),
                'reviewer'=>request('reviewer'),
                'approver'=>request('approver'),
                'password'=>$pwd

            ]);
        }
    }

    public function delete(Request $request){

        $data =User::where('id',request('id'))
                    ->update(['active_status'=> 0 ]);
        if($data){
            return "true";
        }
        else{
            return "false";
        }
    }


}
