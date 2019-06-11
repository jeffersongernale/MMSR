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

use Yajra\DataTables\DataTablesServiceProvider;
use App\Http\Controllers\Traits\MainTraits;
use Response;
use DB;

class AjaxSetupLogsController extends Controller
{
    //control_no_relation product_info_relation

    // public function loadtable(Request $request){

        
    //     $after_prod = After_Prod_Data::with('mct_setting_relation','product_info_relation','control_no_relation','clamp_eject_relation')
    //                                     ->join('main_register_tbl','after_prod_tbl.main_register_id','main_register_tbl.id')
    //                                     ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
    //                                     ->join('die_type_tbl','main_register_tbl.die_type_id','die_type_tbl.id')
    //                                     ->whereNotNull('after_prod_tbl.checker_id')
    //                                     ->whereNotNull('after_prod_tbl.review_id')
    //                                     ->whereNotNull('after_prod_tbl.approve_id')
    //                                     ->limit(10)
    //                                     ->get();
    //     /* $data =array();
    //     if($after_prod)
    //     {
    //         foreach($after_prod as $after_data){

    //             $data=array_push($data,$this->get_before($after_data->main_register_id));
    //         }
    //     } */
    //     return $after_prod;

    // }

    // public function before_data(Request $request){

    //     $ctrl_no = Control_No::select('ctrl_no','created_at')
    //     ->where('main_register_id',request('main_register_id'))
    //     ->where('curr_prev_status','previous')
    //     ->orderBy('id','DESC')
    //     ->first();
    //     if(!$ctrl_no)
    //     {
    //     $ctrl_no = Control_No:: select('ctrl_no','created_at')
    //             ->where('main_register_id',request('main_register_id'))
    //             ->where('curr_prev_status','current')
    //             ->first();

    //     }


    //     $mct_setting_id = mct_setting::where('result','solved')
    //                                     ->where('usage_status','false')
    //                                     ->where('main_register_id',request('main_register_id'))
    //                                     ->max('id');

    //     if($mct_setting_id){
    //     $mct_setting = mct_setting::where('id',$mct_setting_id)->get();
    //     }
    //     else{
    //     $mct_setting = mct_setting::where('main_register_id',request('main_register_id'))
    //                                 ->where('adj_entry','false')
    //                                 ->get();
    //     }

    //     $cylinder_temp_id = cylinder_temp::where('result','solved')
    //                                         ->where('usage_status','false')
    //                                         ->where('main_register_id',request('main_register_id'))
    //                                         ->max('id');

    //     if($cylinder_temp_id){
    //     $cylinder_temp = cylinder_temp::where('id',$cylinder_temp_id)->get();
    //     }
    //     else{
    //     $cylinder_temp = cylinder_temp::where('main_register_id',request('main_register_id'))
    //                                     ->where('adj_entry','false')
    //                                     ->get();
    //     }

    //     $product_info_id = product_info::where('result','solved')
    //                                     ->where('usage_status','false')
    //                                     ->where('main_register_id',request('main_register_id'))
    //                                     ->max('id');


    //     if($product_info_id){
    //         $product_info = product_info::where('id',$product_info_id)->get();
    //     }
    //     else{
    //         $product_info = product_info::where('main_register_id',request('main_register_id'))
    //                                         ->where('adj_entry','false')
    //                                         ->get();
    //     }


    //     $clamping_ejecting_setting_id = clamping_ejecting_setting::where('result','solved')
    //                                                             ->where('usage_status','false')
    //                                                             ->where('main_register_id',request('main_register_id'))
    //                                                             ->max('id');


    //         if($clamping_ejecting_setting_id){
    //             $clamping_ejecting_setting = clamping_ejecting_setting::where('id',$clamping_ejecting_setting_id)->get();
    //         }
    //         else{
    //             $clamping_ejecting_setting = clamping_ejecting_setting::where('main_register_id',request('main_register_id'))
    //                                         ->where('adj_entry','false')
    //                                         ->get();
    //         }

    //     return compact('ctrl_no','mct_setting','cylinder_temp','product_info','clamping_ejecting_setting');


    // }

    // public function get_before($id){

    //     $mct_setting_id = mct_setting::where('result','solved')
    //     ->where('usage_status','false')
    //     ->where('main_register_id',$id)
    //     ->max('id');

    //     if($mct_setting_id){
    //     $mct_setting = mct_setting::where('id',$mct_setting_id)->get();
    //     }
    //     else{
    //     $mct_setting = mct_setting::where('main_register_id',$id)
    //         ->where('adj_entry','false')
    //         ->get();
    //     }

    //     return $mct_setting;

    // }

    public function datatable(Request $request)
    {

        $data = DB::table('after_prod_tbl')
        ->select('main_register_tbl.id','main_register_tbl.drawing_no','main_register_tbl.revision_no',
        'main_register_tbl.drawing_name','main_register_tbl.mold_no','after_prod_tbl.updated_at',
        'machine_tbl.machine_code','main_register_tbl.machine_id','main_register_tbl.record_type',
        'after_prod_tbl.id AS after_prod_id','after_prod_tbl.parameter_change')

        ->join('main_register_tbl','after_prod_tbl.main_register_id','main_register_tbl.id')
        ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
        ->where('after_prod_tbl.active_status',1);

        if(request('part_no')== "" && request('mold_no')== "" && request('machine_no')== "")
        {
            if(request('date_from')!="" && request('date_to')!="")
            {
                $data ->whereNotNull('after_prod_tbl.checker_id')
                        ->whereNotNull('after_prod_tbl.review_id')
                        ->whereNotNull('after_prod_tbl.approve_id')
                        ->whereBetween('after_prod_tbl.updated_at',array(request('date_from')." 00:00:00",request('date_to')." 23:59:59"))
                        ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
            }
            else if(request('date_from')!=""){
                $data ->whereNotNull('after_prod_tbl.checker_id')
                        ->whereNotNull('after_prod_tbl.review_id')
                        ->whereNotNull('after_prod_tbl.approve_id')
                        ->whereDate('after_prod_tbl.updated_at','=',request('date_from'))
                        ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
            }
            else{
                $data ->whereNotNull('after_prod_tbl.checker_id')
                      ->whereNotNull('after_prod_tbl.review_id')
                      ->whereNotNull('after_prod_tbl.approve_id')
                      ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
            }
         
        }

        else
        {
            if(request('date_from')!="" && request('date_to')!="")
            {
                $data->where('main_register_tbl.drawing_no',request('part_no'))
                    ->where('main_register_tbl.mold_no',request('mold_no'))
                    ->where('main_register_tbl.machine_id',request('machine_no'))
                    ->whereNotNull('after_prod_tbl.checker_id')
                    ->whereNotNull('after_prod_tbl.review_id')
                    ->whereNotNull('after_prod_tbl.approve_id') 
                    ->whereBetween('after_prod_tbl.updated_at',array(request('date_from')." 00:00:00",request('date_to')." 23:59:59"))
                    ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
            }
            else if(request('date_from')!=""){

                $data->where('main_register_tbl.drawing_no',request('part_no'))
                        ->where('main_register_tbl.mold_no',request('mold_no'))
                        ->where('main_register_tbl.machine_id',request('machine_no'))
                        ->whereNotNull('after_prod_tbl.checker_id')
                        ->whereNotNull('after_prod_tbl.review_id')
                        ->whereNotNull('after_prod_tbl.approve_id')
                        ->whereDate('after_prod_tbl.updated_at','=',request('date_from'))
                        ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
            }
            else{
                $data->where('main_register_tbl.drawing_no',request('part_no'))
                    ->where('main_register_tbl.mold_no',request('mold_no'))
                    ->where('main_register_tbl.machine_id',request('machine_no'))
                    ->whereNotNull('after_prod_tbl.checker_id')
                    ->whereNotNull('after_prod_tbl.review_id')
                    ->whereNotNull('after_prod_tbl.approve_id')
                    ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
            }
        
        }
       
        return datatables($data)->make(true);

    }
}
