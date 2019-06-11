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
use App\reason_change;

use Yajra\DataTables\DataTablesServiceProvider;
use App\Http\Controllers\Traits\MainTraits;
use Response;
use DB;

class AjaxDraftController extends Controller
{
    //
    public function datatable(Request $request)
    {
        if(request('part_no')== "" && request('mold_no')== "" && request('machine_no')== "")
        {
            $data = DB::table('main_register_tbl')
                        ->select('main_register_tbl.id','main_register_tbl.ctrl_no','main_register_tbl.drawing_no','main_register_tbl.revision_no',
                        'main_register_tbl.drawing_name','main_register_tbl.mold_no','main_register_tbl.updated_at',
                        'machine_tbl.machine_code','main_register_tbl.machine_id')
                        ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
                        ->join('mct_setting','main_register_tbl.id','mct_setting.main_register_id')
                        ->whereNull('main_register_tbl.usage_status')
                        ->where('mct_setting.adj_entry','draft')
                        ->where('main_register_tbl.record_type','PRODUCTION')
                        ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
        }
        else
        {

            $data = DB::table('main_register_tbl')
                        ->select('main_register_tbl.id','main_register_tbl.ctrl_no','main_register_tbl.drawing_no','main_register_tbl.revision_no',
                        'main_register_tbl.drawing_name','main_register_tbl.mold_no','main_register_tbl.updated_at',
                        'machine_tbl.machine_code','main_register_tbl.machine_id')
                        ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
                        ->where('main_register_tbl.drawing_no',request('part_no'))
                        ->where('main_register_tbl.mold_no',request('mold_no'))
                        ->where('main_register_tbl.machine_id',request('machine_no'))
                        ->where('main_register_tbl.record_type','PRODUCTION')
                        ->whereNull('main_register_tbl.usage_status')
                        ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
        }
       
        return datatables($data)->make(true);

    }

    public function loadDraftData(Request $request){

        if(request('param')=='mct_setting')
        {
            $prod_info = product_info::where('main_register_id',request('id'))
                                        ->where('adj_entry','draft')
                                        ->first();
            if(empty($prod_info)){
                $prod_info = product_info::where('main_register_id',request('id'))
                                        ->where('usage_status','true')
                                        ->first();
            }
            $mct_setting = mct_setting::where('main_register_id',request('id'))
                                        ->where('adj_entry','draft')
                                        ->first();
            if(empty($mct_setting)){
                $mct_setting = mct_setting::where('main_register_id',request('id'))
                                        ->where('usage_status','true')
                                        ->first();
            }
            $data=array_merge($mct_setting->toArray(),$prod_info->toArray());
            
        }
        else if(request('param')=='clamp_eject_setting')
        {
            $data = clamping_ejecting_setting::where('main_register_id',request('id')) 
                                                ->where('adj_entry','draft')
                                                ->first();
            if(!$data){
                $data = clamping_ejecting_setting::where('main_register_id',request('id')) ->where('usage_status','true')->first();
            }
        }
        else if(request('param')=='cylinder_temp_setting')
        {
            $data = cylinder_temp::where('main_register_id',request('id')) 
                                     ->where('adj_entry','draft')
                                    ->first();
            if(!$data){
                $data = cylinder_temp::where('main_register_id',request('id')) ->where('usage_status','true')->first();
            }
        }
        else if(request('param')=='inj_pack_setting')
        {
            $data = inj_pack_setting::where('main_register_id',request('id')) 
                                        ->where('adj_entry','draft')
                                        ->first();
            if(!$data){
                $data = inj_pack_setting::where('main_register_id',request('id')) ->where('usage_status','true')->first();
            }
        }
        else if(request('param')=='measuring_condition_setting')
        {
            $data = measuring_condition_setting::where('main_register_id',request('id'))
                                                ->where('adj_entry','draft')
                                                ->first();
            if(!$data){
                $data = measuring_condition_setting::where('main_register_id',request('id')) ->where('usage_status','true')->first();
            }
        }

        return Response::json($data);


    }
}
