<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Machine;
use App\Die_Type;
use App\main_register_tbl;
use App\reason_change;

use Illuminate\Support\Facades\Auth;


use App\mct_setting;
use App\cylinder_temp;

use App\inj_pack_setting;
use App\measuring_condition_setting;
use App\clamping_ejecting_setting;
use App\After_Prod_Data;
use App\product_info;
use App\Control_No;
use App\ReDsMaterial;

use Yajra\DataTables\DataTablesServiceProvider;
use App\Http\Controllers\Traits\MainTraits;
use Response;
use DB;
class PageController extends Controller
{
    //

    public function test(){
        return view('pages.test');
    }
    public function admin(){
        return view('pages.dashboard');
    }

    public function mold_setup_registration(){

        $Machine = Machine::all();
        $Die_Type = Die_Type::all();
        $matl_name = ReDsMaterial::select('matl_name')->distinct()->get();
        $matl_grade = ReDsMaterial::select('matl_grade')->distinct()->get();
        $matl_color = ReDsMaterial::select('matl_color')->distinct()->get();
        $Drawing_no =main_register_tbl::select('drawing_no')->whereNull('usage_status')->distinct()->get();

        return view('pages.mold_register.registration',compact('Machine','Die_Type','Drawing_no','matl_name','matl_grade','matl_color'));
    }
    public function login(){
        return view('pages.login.login');
    }
    public function usermgmt(){

        $data = User::paginate(20);
        return view('pages.user_mgmt.user_mgmt', compact('data'));
    }

    public function RegisterList(Request $request)
    {       
            $main = main_register_tbl::select('mold_no','drawing_no')
                                    ->where('record_type','PRODUCTION')
                                    ->whereNull('usage_status')
                                    ->distinct()->get();
            $Machine = Machine::all();
            $reason = reason_change::all();
            return view ('pages.registered_list.registered_list',compact('Machine','main','reason'));
    }

    public function TrialList(Request $request)
    {       
            $main = main_register_tbl::select('mold_no','drawing_no')
                                    ->where('record_type','TRIAL')
                                    ->whereNull('usage_status')
                                    ->distinct()->get();
            $Machine = Machine::all();
            $reason = reason_change::all();
            return view ('pages.trial_list.trial_list',compact('Machine','main','reason'));
    }

    public function CheckList(Request $request)
    {
        $main = main_register_tbl::select('mold_no','drawing_no')
                                    ->whereNull('usage_status')
                                    ->distinct()
                                    ->get();
        $Machine = Machine::all();
        
        $Die_Type = Die_Type::all();

        return view ('pages.approval_list.for_check.for_check',compact('Machine','main','Die_Type'));
    }

    public function ReviewList(Request $request)
    {
        $main = main_register_tbl::select('mold_no','drawing_no')
                                    ->whereNull('usage_status')
                                    ->distinct()
                                    ->get();
        $Machine = Machine::all();
        
        $Die_Type = Die_Type::all();

        return view ('pages.approval_list.for_review.for_review',compact('Machine','main','Die_Type'));
    }

    public function ApproveList(Request $request)
    {
        $main = main_register_tbl::select('mold_no','drawing_no')
                                    ->whereNull('usage_status')
                                    ->distinct()
                                    ->get();
        $Machine = Machine::all();
        
        $Die_Type = Die_Type::all();
        return view ('pages.approval_list.for_approval.for_approval',compact('Machine','main' ,'Die_Type'));
    }

    public function SetupLogs(Request $request)
    {
        $main = main_register_tbl::select('mold_no','drawing_no')
                                    ->whereNull('usage_status')
                                    ->distinct()
                                    ->get();
        $Machine = Machine::all();
        
        $Die_Type = Die_Type::all();

        return view ('pages.setup_logs.setup_logs',compact('Machine','main','Die_Type'));
    }

    public function MasterCopy(Request $request)
    {
        $main = main_register_tbl::select('mold_no','drawing_no')
                                    ->whereNull('usage_status')
                                    ->distinct()
                                    ->get();
        $Machine = Machine::all();
        $Die_Type = Die_Type::all();

        return view ('pages.master_copy.master_copy',compact('Machine','main','Die_Type'));
    }

    public function MoldRestriction(Request $request)
    {       
            $main = main_register_tbl::select('mold_no','drawing_no')
                                        ->distinct()->get();
            $Machine = Machine::all();
            $reason = reason_change::all();

            $Die_Type = Die_Type::all();
            return view ('pages.mold_restriction.mold_restriction',compact('Machine','main','reason','Die_Type'));
    }

    public function Draft(Request $request){
        $main = main_register_tbl::select('mold_no','drawing_no')
        ->where('record_type','PRODUCTION')
        ->whereNull('usage_status')
        ->distinct()->get();
        $Machine = Machine::all();
        $reason = reason_change::all();
        return view ('pages.registered_list.drafts.draft',compact('Machine','main','reason'));

    }



    public function print_preview(Request $request, $id, $after_id){

        /* MAIN RECORD */
        $record_info = main_register_tbl::where('main_register_tbl.id',$id)
                                        ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
                                        ->join('die_type_tbl','main_register_tbl.die_type_id','die_type_tbl.id')
                                        ->join('users','main_register_tbl.user_id','users.id')
                                        ->first();

        /* BEFORE MCT SETTING */
        $mct_setting_id = mct_setting::where('result','solved')
                                        ->where('usage_status','false')
                                        ->where('main_register_id',$id)
                                        ->max('id');

        if($mct_setting_id){
            $mct_setting = mct_setting::where('id',$mct_setting_id)->get();
        }
        else{
            $mct_setting = mct_setting::where('main_register_id',$id)
                                    ->where('adj_entry','false')
                                    ->get();
        }


        /* BEFORE CYLINDER TEMP */
        $cylinder_temp_id = cylinder_temp::where('result','solved')
                                            ->where('usage_status','false')
                                            ->where('main_register_id',$id)
                                            ->max('id');

        if($cylinder_temp_id){
            $cylinder_temp = cylinder_temp::where('id',$cylinder_temp_id)->get();
        }
        else{
            $cylinder_temp = cylinder_temp::where('main_register_id',$id)
                    ->where('adj_entry','false')
                    ->get();
        }

        /* BEFORE INJECTION PACK */
        $inj_pack_setting_id = inj_pack_setting::where('result','solved')
                        ->where('usage_status','false')
                        ->where('main_register_id',$id)
                        ->max('id');



        if($inj_pack_setting_id){
            $inj_pack_setting = inj_pack_setting::where('id',$inj_pack_setting_id)->get();
        }
        else{
            $inj_pack_setting = inj_pack_setting::where('main_register_id',$id)
                    ->where('adj_entry','false')
                    ->get();
        }


        /* BEFORE MEASURING CONDITION */
        $measuring_condition_setting_id = measuring_condition_setting::where('result','solved')
                                                ->where('usage_status','false')
                                                ->where('main_register_id',$id)
                                                ->max('id');

        if($measuring_condition_setting_id){
            $measuring_condition_setting = measuring_condition_setting::where('id',$measuring_condition_setting_id)->get();
        }
        else{
            $measuring_condition_setting = measuring_condition_setting::where('main_register_id',$id)
                                                    ->where('adj_entry','false')
                                                    ->get();
        }


        /* BEFORE CLAMPING EJECT */
        $clamping_ejecting_setting_id = clamping_ejecting_setting::where('result','solved')
                                        ->where('usage_status','false')
                                        ->where('main_register_id',$id)
                                        ->max('id');


        if($clamping_ejecting_setting_id){
            $clamping_ejecting_setting = clamping_ejecting_setting::where('id',$clamping_ejecting_setting_id)->get();
        }
        else{
            $clamping_ejecting_setting = clamping_ejecting_setting::where('main_register_id',$id)
                    ->where('adj_entry','false')
                    ->get();
        }


        
        /* BEFORE PRODUCT INFO */
        $product_info_id = product_info::where('result','solved')
                ->where('usage_status','false')
                ->where('main_register_id',$id)
                ->max('id');


        if($product_info_id){
            $product_info = product_info::where('id',$product_info_id)->get();
        }
        else{
            $product_info = product_info::where('main_register_id',$id)
                    ->where('adj_entry','false')
                    ->get();
        }

        /* DYNAMIC FIELDS LOADING BEFORE*/
        $prod_weight = array();
        foreach($product_info as $product_info_item){
            $prod_weight = json_decode($product_info_item->product_weight,true);
        }
       
        $inj_step = array();
        foreach($inj_pack_setting as $inj_pack_setting_item){
            $inj_step = json_decode($inj_pack_setting_item->injection_step,true);
        }

        $pack_step = array();
        foreach($inj_pack_setting as $inj_pack_setting_item){
            $pack_step = json_decode($inj_pack_setting_item->pack_step,true);
        }

        $extrude = array();
        foreach($measuring_condition_setting as $measuring_condition_setting_item){
            $extrude = json_decode($measuring_condition_setting_item->extruder_json,true);
        }
           
        /* ALL AFTER PRODUCTION DATA */
        $after_prod = After_Prod_Data::with('mct_setting_relation','clamp_eject_relation','cylinder_temp_relation',
        'inj_pack_setting_relation','measuring_condition_relation','product_info_relation',
        'control_no_relation','users_relation','checkby_relation','reviewby_relation','approveby_relation')
                                    ->where('id',$after_id)
                                    ->first();

        /* DYNAMIC FIELDS LOADING AFTER*/
        $prod_weight_after = json_decode($after_prod->product_info_relation->product_weight,true);
        $inj_step_after = json_decode($after_prod->inj_pack_setting_relation->injection_step,true);
        $pack_step_after = json_decode($after_prod->inj_pack_setting_relation->pack_step,true);
        $extrude_after = json_decode($after_prod->measuring_condition_relation->extruder_json,true);
        $mold_checksheet = json_decode($after_prod->mold_checksheet,true);

        return view ('pages.pdf_template.pdf_template',compact('record_info','mct_setting','cylinder_temp','inj_pack_setting',
                        'measuring_condition_setting','clamping_ejecting_setting','product_info','prod_weight','inj_step','pack_step','extrude',
                        'after_prod','prod_weight_after','inj_step_after','pack_step_after','extrude_after','mold_checksheet'));
    }

    public function print_preview2(Request $request, $id){

        /* MAIN RECORD */
        $record_info = main_register_tbl::where('main_register_tbl.id',$id)
                                        ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
                                        ->join('die_type_tbl','main_register_tbl.die_type_id','die_type_tbl.id')
                                        ->join('users','main_register_tbl.user_id','users.id')
                                        ->first();

        /* BEFORE MCT SETTING */
        $mct_setting_id = mct_setting::where('result','solved')
                                        ->where('usage_status','false')
                                        ->where('main_register_id',$id)
                                        ->max('id');

        if($mct_setting_id){
            $mct_setting = mct_setting::where('id',$mct_setting_id)->get();
        }
        else{
            $mct_setting = mct_setting::where('main_register_id',$id)
                                    ->where('adj_entry','false')
                                    ->get();
        }


        /* BEFORE CYLINDER TEMP */
        $cylinder_temp_id = cylinder_temp::where('result','solved')
                                            ->where('usage_status','false')
                                            ->where('main_register_id',$id)
                                            ->max('id');

        if($cylinder_temp_id){
            $cylinder_temp = cylinder_temp::where('id',$cylinder_temp_id)->get();
        }
        else{
            $cylinder_temp = cylinder_temp::where('main_register_id',$id)
                    ->where('adj_entry','false')
                    ->get();
        }

        /* BEFORE INJECTION PACK */
        $inj_pack_setting_id = inj_pack_setting::where('result','solved')
                        ->where('usage_status','false')
                        ->where('main_register_id',$id)
                        ->max('id');



        if($inj_pack_setting_id){
            $inj_pack_setting = inj_pack_setting::where('id',$inj_pack_setting_id)->get();
        }
        else{
            $inj_pack_setting = inj_pack_setting::where('main_register_id',$id)
                    ->where('adj_entry','false')
                    ->get();
        }


        /* BEFORE MEASURING CONDITION */
        $measuring_condition_setting_id = measuring_condition_setting::where('result','solved')
                                                ->where('usage_status','false')
                                                ->where('main_register_id',$id)
                                                ->max('id');

        if($measuring_condition_setting_id){
            $measuring_condition_setting = measuring_condition_setting::where('id',$measuring_condition_setting_id)->get();
        }
        else{
            $measuring_condition_setting = measuring_condition_setting::where('main_register_id',$id)
                                                    ->where('adj_entry','false')
                                                    ->get();
        }


        /* BEFORE CLAMPING EJECT */
        $clamping_ejecting_setting_id = clamping_ejecting_setting::where('result','solved')
                                        ->where('usage_status','false')
                                        ->where('main_register_id',$id)
                                        ->max('id');


        if($clamping_ejecting_setting_id){
            $clamping_ejecting_setting = clamping_ejecting_setting::where('id',$clamping_ejecting_setting_id)->get();
        }
        else{
            $clamping_ejecting_setting = clamping_ejecting_setting::where('main_register_id',$id)
                    ->where('adj_entry','false')
                    ->get();
        }


        
        /* BEFORE PRODUCT INFO */
        $product_info_id = product_info::where('result','solved')
                ->where('usage_status','false')
                ->where('main_register_id',$id)
                ->max('id');


        if($product_info_id){
            $product_info = product_info::where('id',$product_info_id)->get();
        }
        else{
            $product_info = product_info::where('main_register_id',$id)
                    ->where('adj_entry','false')
                    ->get();
        }

        /* DYNAMIC FIELDS LOADING BEFORE*/
        $prod_weight = array();
        foreach($product_info as $product_info_item){
            $prod_weight = json_decode($product_info_item->product_weight,true);
        }
       
        $inj_step = array();
        foreach($inj_pack_setting as $inj_pack_setting_item){
            $inj_step = json_decode($inj_pack_setting_item->injection_step,true);
        }

        $pack_step = array();
        foreach($inj_pack_setting as $inj_pack_setting_item){
            $pack_step = json_decode($inj_pack_setting_item->pack_step,true);
        }

        $extrude = array();
        foreach($measuring_condition_setting as $measuring_condition_setting_item){
            $extrude = json_decode($measuring_condition_setting_item->extruder_json,true);
        }
           
        

        return view ('pages.pdf_template.pdf_template2',compact('record_info','mct_setting','cylinder_temp','inj_pack_setting',
                        'measuring_condition_setting','clamping_ejecting_setting','product_info','prod_weight','inj_step','pack_step','extrude'
                        ));
    }
}
