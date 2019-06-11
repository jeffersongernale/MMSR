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

class AjaxCheckListController extends Controller
{
    //
    use MainTraits;
    public function datatable(Request $request)
    {
        if(request('part_no')== "" && request('mold_no')== "" && request('machine_no')== "")
        {
            $data = DB::table('after_prod_tbl')
                        ->select('main_register_tbl.id','main_register_tbl.drawing_no','main_register_tbl.revision_no',
                        'main_register_tbl.drawing_name','main_register_tbl.mold_no','after_prod_tbl.updated_at',
                        'machine_tbl.machine_code','main_register_tbl.machine_id','main_register_tbl.record_type','after_prod_tbl.id AS after_prod_id','users.name')

                        ->join('main_register_tbl','after_prod_tbl.main_register_id','main_register_tbl.id')
                        ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
                        ->join('users','after_prod_tbl.user_id','users.id')
                        ->whereNull('after_prod_tbl.checker_id')
                        ->where('after_prod_tbl.active_status',1)
                        ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
        }
        else
        {
           
            

            $data = DB::table('after_prod_tbl')
                        ->select('main_register_tbl.id','main_register_tbl.ctrl_no','main_register_tbl.drawing_no','main_register_tbl.revision_no',
                        'main_register_tbl.drawing_name','main_register_tbl.mold_no','main_register_tbl.updated_at',
                        'machine_tbl.machine_code','main_register_tbl.machine_id', 'main_register_tbl.record_type','after_prod_tbl.id AS after_prod_id','users.name')

                        ->join('main_register_tbl','after_prod_tbl.main_register_id','main_register_tbl.id')
                        ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
                        ->join('users','after_prod_tbl.user_id','users.id')
                        ->where('main_register_tbl.drawing_no',request('part_no'))
                        ->where('main_register_tbl.mold_no',request('mold_no'))
                        ->where('main_register_tbl.machine_id',request('machine_no'))
                        ->whereNull('after_prod_tbl.checker_id')
                        ->where('after_prod_tbl.active_status',1)
                        ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
        }
       
        return datatables($data)->make(true);

    }

    public function load_record_info(Request $request)
    { 

        $data = main_register_tbl::where('main_register_tbl.id',request('id'))
                                    ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
                                    ->join('die_type_tbl','main_register_tbl.die_type_id','die_type_tbl.id')
                                    ->join('users','main_register_tbl.user_id','users.id')
                                    ->first();
        return $data;

    }

    public function load_after_data(Request $request)
    {
        $after_prod = After_Prod_Data::with('mct_setting_relation','clamp_eject_relation','cylinder_temp_relation',
                                'inj_pack_setting_relation','measuring_condition_relation','product_info_relation',
                                'control_no_relation','users_relation','checkby_relation','reviewby_relation','approveby_relation',
                                'before_mct_setting_relation','before_clamp_eject_relation','before_cylinder_temp_relation',
                                'before_inj_pack_setting_relation','before_measuring_condition_relation','before_product_info_relation')
                                ->where('id',request('id'))
                                ->first();

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

       /*  $ctrl_no = Control_No::where('main_register_id',request('main_register_id'))
                                
                                ->max('ctrl_no'); */
        
        return compact('after_prod','ctrl_no');

    }

    public function load_before_data(Request $request)
    {

    /* 
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
            
        
        
        
        
        return compact('ctrl_no','mct_setting','cylinder_temp','inj_pack_setting',
                        'measuring_condition_setting','clamping_ejecting_setting','product_info');
    */
        
    }

    public function mark_checked(Request $request)
    {

        $update_after_tbl = DB::table('after_prod_tbl')
                                ->where('id',request('after_id'))
                                ->update(['checker_id'=>Auth::user()->id]);

    }

    public function LoadAdj(Request $request)
    {
        if(request('parameter')=='mct_setting'){
            $query = $this->LoadAdjustments_mct_setting(request('main_register_id'));
        }
        else if(request('parameter')=='product_info'){
            $query =  $this->LoadAdjustments_prod_info(request('main_register_id'));
        }
        else if(request('parameter')=='clamp_eject_setting'){
            $query =  $this->LoadAdjustments_clamp_eject(request('main_register_id'));
        }
        else if(request('parameter')=='cylinder_temp_setting'){
            $query =  $this->LoadAdjustments_cylinder(request('main_register_id'));
        }
        else if(request('parameter')=='inj_pack_setting'){
            $query =  $this->LoadAdjustments_inj_pack(request('main_register_id'));
        }
        else if(request('parameter')=='measuring_condition_setting'){
            $query =  $this->LoadAdjustments_measuring_condition(request('main_register_id'));
        }
      
            return compact('query');
        
      
    }

    public function delete_record(Request $request){

        $data = After_Prod_Data::where('id',request('after_id'))
                                ->update(['active_status'=> 0]);
        if($data){
            return "true";
        }
        else{
            return "false";
        }
    }
    
}
