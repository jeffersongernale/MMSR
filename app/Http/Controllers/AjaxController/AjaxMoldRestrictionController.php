<?php

namespace App\Http\Controllers\AjaxController;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use App\main_register_tbl;
use App\mct_setting;
use App\cylinder_temp;
use App\User;
use App\inj_pack_setting;
use App\measuring_condition_setting;
use App\clamping_ejecting_setting;
use App\After_Prod_Data;
use App\product_info;
use App\Control_No;
use App\AlarmNotification;

use Yajra\DataTables\DataTablesServiceProvider;
use App\Http\Controllers\Traits\MainTraits;
use Response;
use DB;


class AjaxMoldRestrictionController extends Controller
{
    //
    public function registered_list_datatable(Request $request)
    {
        if(request('part_no')== "" && request('mold_no')== "" && request('machine_no')== "")
        {
            $data = DB::table('main_register_tbl')
                        ->select('main_register_tbl.id','main_register_tbl.ctrl_no','main_register_tbl.drawing_no','main_register_tbl.revision_no',
                        'main_register_tbl.drawing_name','main_register_tbl.mold_no','main_register_tbl.updated_at','main_register_tbl.record_type',
                        'machine_tbl.machine_code','main_register_tbl.machine_id')
                        ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
                        ->whereNull('usage_status')
                        ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
        }
        else
        {
           
            

            $data = DB::table('main_register_tbl')
                        ->select('main_register_tbl.id','main_register_tbl.ctrl_no','main_register_tbl.drawing_no','main_register_tbl.revision_no',
                        'main_register_tbl.drawing_name','main_register_tbl.mold_no','main_register_tbl.updated_at','main_register_tbl.record_type',
                        'machine_tbl.machine_code','main_register_tbl.machine_id')
                        ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
                        ->where('main_register_tbl.drawing_no',request('part_no'))
                        ->where('main_register_tbl.mold_no',request('mold_no'))
                        ->where('main_register_tbl.machine_id',request('machine_no'))
                        ->whereNull('usage_status')
                        ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
        }
       
        return datatables($data)->make(true);

    }

    public function block_list_datatable(Request $request)
    {
        if(request('part_no')== "" && request('mold_no')== "" && request('machine_no')== "")
        {
            $data = DB::table('main_register_tbl')
                        ->select('main_register_tbl.id','main_register_tbl.ctrl_no','main_register_tbl.drawing_no','main_register_tbl.revision_no',
                        'main_register_tbl.drawing_name','main_register_tbl.mold_no','main_register_tbl.updated_at','main_register_tbl.record_type',
                        'machine_tbl.machine_code','main_register_tbl.machine_id')
                        ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
                        ->where('main_register_tbl.usage_status','block')
                        ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
        }
        else
        {
           
            

            $data = DB::table('main_register_tbl')
                        ->select('main_register_tbl.id','main_register_tbl.ctrl_no','main_register_tbl.drawing_no','main_register_tbl.revision_no',
                        'main_register_tbl.drawing_name','main_register_tbl.mold_no','main_register_tbl.updated_at','main_register_tbl.record_type',
                        'machine_tbl.machine_code','main_register_tbl.machine_id')
                        ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
                        ->where('main_register_tbl.drawing_no',request('part_no'))
                        ->where('main_register_tbl.mold_no',request('mold_no'))
                        ->where('main_register_tbl.machine_id',request('machine_no'))
                        ->where('main_register_tbl.usage_status','block')
                        ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
        }
       
        return datatables($data)->make(true);

    }

    public function AddToBlackList(Request $request){

        $update_block = DB::table('main_register_tbl')
                                ->where('id',request('id'))
                                ->update(['usage_status'=>'block']);

        if($update_block)
        {
            return "true";
        }
        else{
            return "false";
        }

    }

    public function RemoveToBlackList(Request $request){

        $update_block = DB::table('main_register_tbl')
                                ->where('id',request('id'))
                                ->update(['usage_status'=>null]);
        if($update_block)
        {
            return "true";
        }
        else{
            return "false";
        }


    }

    public function ViewRegData(Request $request){


        $record_info = main_register_tbl::where('id',request('main_register_id'))
                                    ->get();

        
            $ctrl_no = Control_No::select('ctrl_no','created_at')
            ->where('main_register_id',request('main_register_id'))
            ->where('curr_prev_status','previous')
            ->orderBy('id','DESC')
            ->first();

            if(!$ctrl_no)
            {
            $ctrl_no = Control_No:: select('ctrl_no','created_at')
                                    ->where('main_register_id',request('main_register_id'))
                                    ->where('curr_prev_status','current')
                                    ->first();
            
            }
    
            $mct_setting_id = mct_setting::where('result','solved')
                                        ->where('usage_status','false')
                                        ->where('main_register_id',request('main_register_id'))
                                        ->max('id');
        
            if($mct_setting_id){
                $mct_setting = mct_setting::where('id',$mct_setting_id)->get();
            }
            else{
                $mct_setting = mct_setting::where('main_register_id',request('main_register_id'))
                                            ->where('adj_entry','false')
                                            ->get();
            }
    
    

            $cylinder_temp_id = cylinder_temp::where('result','solved')
                                                ->where('usage_status','false')
                                                ->where('main_register_id',request('main_register_id'))
                                                ->max('id');

            if($cylinder_temp_id){
                $cylinder_temp = cylinder_temp::where('id',$cylinder_temp_id)->get();
            }
            else{
                $cylinder_temp = cylinder_temp::where('main_register_id',request('main_register_id'))
                                            ->where('adj_entry','false')
                                            ->get();
            }
    
            $inj_pack_setting_id = inj_pack_setting::where('result','solved')
                                                    ->where('usage_status','false')
                                                    ->where('main_register_id',request('main_register_id'))
                                                    ->max('id');

            if($inj_pack_setting_id){
                $inj_pack_setting = inj_pack_setting::where('id',$inj_pack_setting_id)->get();
            }
            else{
                $inj_pack_setting = inj_pack_setting::where('main_register_id',request('main_register_id'))
                                            ->where('adj_entry','false')
                                            ->get();
            }
    
            $measuring_condition_setting_id = measuring_condition_setting::where('result','solved')
                                                                            ->where('usage_status','false')
                                                                            ->where('main_register_id',request('main_register_id'))
                                                                            ->max('id');
    
            if($measuring_condition_setting_id){
                $measuring_condition_setting = measuring_condition_setting::where('id',$measuring_condition_setting_id)->get();
            }
            else{
                $measuring_condition_setting = measuring_condition_setting::where('main_register_id',request('main_register_id'))
                                                                            ->where('adj_entry','false')
                                                                            ->get();
            }
    
            $clamping_ejecting_setting_id = clamping_ejecting_setting::where('result','solved')
                                                                    ->where('usage_status','false')
                                                                    ->where('main_register_id',request('main_register_id'))
                                                                    ->max('id');
    

            if($clamping_ejecting_setting_id){
                $clamping_ejecting_setting = clamping_ejecting_setting::where('id',$clamping_ejecting_setting_id)->get();
            }
            else{
                $clamping_ejecting_setting = clamping_ejecting_setting::where('main_register_id',request('main_register_id'))
                                            ->where('adj_entry','false')
                                            ->get();
            }
    
    
            $product_info_id = product_info::where('result','solved')
                                            ->where('usage_status','false')
                                            ->where('main_register_id',request('main_register_id'))
                                            ->max('id');
    

            if($product_info_id){
                $product_info = product_info::where('id',$product_info_id)->get();
            }
            else{
                $product_info = product_info::where('main_register_id',request('main_register_id'))
                                            ->where('adj_entry','false')
                                            ->get();
            }
                
            
        return compact('record_info','ctrl_no','mct_setting','cylinder_temp','inj_pack_setting',
        'measuring_condition_setting','clamping_ejecting_setting','product_info');
    }


    
}
