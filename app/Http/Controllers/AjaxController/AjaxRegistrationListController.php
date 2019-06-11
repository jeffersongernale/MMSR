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

class AjaxRegistrationListController extends Controller
{
    
    use MainTraits;
    public function datatable(Request $request)
    {
        if(request('part_no')== "" && request('mold_no')== "" && request('machine_no')== "")
        {
            $data = DB::table('main_register_tbl')
                        ->select('main_register_tbl.id','main_register_tbl.ctrl_no','main_register_tbl.drawing_no','main_register_tbl.revision_no',
                        'main_register_tbl.drawing_name','main_register_tbl.mold_no','main_register_tbl.updated_at',
                        'machine_tbl.machine_code','main_register_tbl.machine_id')
                        ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
                        ->whereNull('main_register_tbl.usage_status')
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

    public function ChangeParameter(Request $request)
    {
        if(request('param')=='mct_setting')
        {
            return view ('pages.registered_list.mct_setting');
        }
        else if(request('param')=='clamp_eject_setting')
        {
            return view ('pages.registered_list.clamp_eject');
        }
        else if(request('param')=='cylinder_temp_setting')
        {
            return view ('pages.registered_list.cylinder_temp');
        }
        else if(request('param')=='inj_pack_setting')
        {
            return view ('pages.registered_list.inj_pack');
        }
        else if(request('param')=='measuring_condition_setting')
        {
            return view ('pages.registered_list.measuring_condition');
        }
    }

    public function LoadSelected(Request $request)
    {
        if(request('param')=='mct_setting')
        {
            $prod_info = product_info::where('main_register_id',request('id'))
                                        ->where('usage_status','true')
                                        ->first();
            $mct_setting = mct_setting::where('main_register_id',request('id'))
                                        ->where('usage_status','true')
                                        ->first();
            $data=array_merge($mct_setting->toArray(),$prod_info->toArray());
        }
        else if(request('param')=='clamp_eject_setting')
        {
            $data = clamping_ejecting_setting::where('main_register_id',request('id')) ->where('usage_status','true')->first();
        }
        else if(request('param')=='cylinder_temp_setting')
        {
            $data = cylinder_temp::where('main_register_id',request('id')) ->where('usage_status','true')->first();
        }
        else if(request('param')=='inj_pack_setting')
        {
            $data = inj_pack_setting::where('main_register_id',request('id')) ->where('usage_status','true')->first();
        }
        else if(request('param')=='measuring_condition_setting')
        {
            $data = measuring_condition_setting::where('main_register_id',request('id')) ->where('usage_status','true')->first();
        }

        return Response::json($data);
    }

    public function Finished_without_change(Request $request,$ctrl_no='',$mct_before='',$prod_info_before='',$clamp_before='',$cylinder_before='',$inj_before='',$measuring_before='')
    {
       
       

            DB::beginTransaction();
            try
            {
                
                if($ctrl_no=='')
                {
                    $ctrl_no = Control_No::where('main_register_id',request('id'))
                                                ->max('id');
                }

                

               

                $mct =mct_setting::select('id')->where('usage_status','true')->where('main_register_id',request('id'))->first();
                $cylinder = cylinder_temp::select('id')->where('usage_status','true')->where('main_register_id',request('id'))->first();
                $inj = inj_pack_setting::select('id')->where('usage_status','true')->where('main_register_id',request('id'))->first();
                $measure = measuring_condition_setting::select('id')->where('usage_status','true')->where('main_register_id',request('id'))->first();
                $clamp =clamping_ejecting_setting::select('id')->where('usage_status','true')->where('main_register_id',request('id'))->first();
                $product_info = product_info::select('id')->where('usage_status','true')->where('main_register_id',request('id'))->first();

                if($mct_before==""){
                    $mct_before = $mct->id;
                }
                if($prod_info_before==""){
                    $prod_info_before = $product_info->id;
                }
                if($clamp_before==""){
                    $clamp_before = $clamp->id;
                }
                if($cylinder_before==""){
                    $cylinder_before = $cylinder->id;
                }
                if($inj_before==""){
                    $inj_before = $inj->id;
                }
                if($measuring_before==""){
                    $measuring_before = $measure->id;
                }

                $query = new After_Prod_Data();
                $query->main_register_id = request('id');
                $query->dryer_no = request('dryer_no');
                $query->time_in = request('time_in');
                $query->time_use = request('time_use');
                $query->date_prepared = request('date_prepared');
                $query->material_lot_no = request('material_lot_no');
                $query->actual_matl_use = request('actual_matl_use');
                $query->actual_time_matl_use = request('actual_time_matl_use');
                $query->material_code = request('material_code');
                $query->total_production = request('total_production');
                $query->date_process_start = request('date_process_start');
                $query->date_process_finish = request('date_process_finish');
                $query->lot_number = request('lot_number');
                $query->checked_by = request('checked_by');
                $query->date_checked = request('date_checked');
                $query->work_finish_qty = request('work_finish_qty');
                $query->main_register_id = request('id');
                $query->parameter_change =  request('param_change');
                $query->ctrl_id = $ctrl_no;
                $query->user_id = Auth::user()->id;

                $query->mct_setting_id = $mct->id;
                $query->cylinder_temp_id = $cylinder->id;
                $query->inj_pack_setting_id =$inj->id;
                $query->measuring_condition_id = $measure->id;
                $query->clamping_ejecting_id = $clamp->id;
                $query->product_info_id = $product_info->id;
                $query->mold_checksheet = json_encode(request('mold_set_up'));
                
                $query->before_mct_setting_id = $mct_before;
                $query->before_cylinder_temp_id = $cylinder_before;
                $query->before_inj_pack_setting_id =$inj_before;
                $query->before_measuring_condition_id = $measuring_before;
                $query->before_clamping_ejecting_id = $clamp_before;
                $query->before_product_info_id = $prod_info_before;
               
                $query->save();

                $delete_alarm_notif = AlarmNotification::where('main_register_id',request('id'))->delete();
                
                if($query)
                {
                    DB::commit();
                }
    
            }
            catch(Exception $ex)
            {
                    DB::rollback();
                    return $ex;
            }
    }

    public function Finished_with_change(Request $request)
    {
        $mct_setting = request('mct_setting');
        $clamp_eject = request('clamp_eject');
        $cylinder_temp = request('cylinder_temp');
        $inj_pack = request('inj_pack');
        $measuring_condition = request('measuring_condition');
        $ctrl_no = $this->GenerateCtrlNo('',request('machine_no'),request('id'));
        // return ($ctrl_no);
        try{
            DB::beginTransaction();
            //  return ($clamp_eject);
            // return ($ctrl_no);

            $insert_ctrl_no = new Control_No();
            $insert_ctrl_no->main_register_id = request('id');
            $insert_ctrl_no->ctrl_no = $ctrl_no;
            $insert_ctrl_no->user_id = Auth::user()->id;
            $insert_ctrl_no->save();

            $get_before_mct_setting = mct_setting::where('main_register_id',request('id'))
                                            ->where('usage_status','true')
                                            ->first()->id;
            $get_before_product_info = product_info::where('main_register_id',request('id'))
                                                    ->where('usage_status','true')
                                                    ->first()->id;

            $get_before_clamp_eject = clamping_ejecting_setting::where('main_register_id',request('id'))
                                                                ->where('usage_status','true')
                                                                ->first()->id;

            $get_before_cylinder_temp = cylinder_temp::where('main_register_id',request('id'))
                                                        ->where('usage_status','true')
                                                        ->first()->id;

            $get_before_inj_pack = inj_pack_setting::where('main_register_id',request('id'))
                                                    ->where('usage_status','true')
                                                    ->first()->id;

            $get_before_measuring_condition = measuring_condition_setting::where('main_register_id',request('id'))
                                                                            ->where('usage_status','true')
                                                                            ->first()->id;

            if($mct_setting)
            {
            
                    $mct_setting_query = new mct_setting();
                    $mct_setting_query ->die_temp_core = $mct_setting[0]['die_temp_core'];
                    $mct_setting_query ->die_temp_cavity = $mct_setting[0]['die_temp_cavity'];
                    $mct_setting_query ->mold_temp_control = $mct_setting[0]['mold_temp_control'];
                    $mct_setting_query ->main_register_id = request('id');
                    $mct_setting_query->user_id = Auth::user()->id;
                        

                    $prod_info_query = new product_info();
                    $prod_info_query->machine_cycle_time = $mct_setting[0]['machine_cycle_time'];
                    $prod_info_query->product_weight = json_encode($mct_setting[0]['product_weight']);
                    $prod_info_query->sprue_weight = $mct_setting[0]['sprue_weight'];
                    $prod_info_query->sub_part_weight = $mct_setting[0]['sub_part_weight'];
                    $prod_info_query->additional_cycle_time = $mct_setting[0]['additional_cycle_time'];
                    $prod_info_query ->main_register_id = request('id');
                    $prod_info_query->user_id = Auth::user()->id;
                        
                    if($mct_setting[0]['result']=="unsolved"){
                        $mct_setting_query ->reason_id = $mct_setting[0]['reason'];
                        $mct_setting_query ->result = $mct_setting[0]['result'];
                        $mct_setting_query ->adj_entry = 'true';

                        $prod_info_query ->reason_id = $mct_setting[0]['reason'];
                        $prod_info_query ->result = $mct_setting[0]['result'];
                        $prod_info_query ->adj_entry = 'true';
                    }
                    else{   
                        $update_mct_setting = DB::table('mct_setting')
                                                ->where('main_register_id',request('id'))
                                                ->where('usage_status','true')
                                                ->update(['usage_status'=>'false']);

                        $mct_setting_query ->adj_entry = 'true';
                        $mct_setting_query ->usage_status ='true';
                        $mct_setting_query ->reason_id = $mct_setting[0]['reason'];
                        $mct_setting_query ->result = $mct_setting[0]['result'];

                        $update_prod_info = DB::table('product_info_tbl')
                                                ->where('main_register_id',request('id'))
                                                ->where('usage_status','true')
                                                ->update(['usage_status'=>'false']);

                        $prod_info_query ->adj_entry = 'true';
                        $prod_info_query ->usage_status ='true';
                        $prod_info_query ->result = $mct_setting[0]['result'];
                        $prod_info_query ->reason_id = $mct_setting[0]['reason'];

                        if(!$update_mct_setting && !$update_prod_info){
                            DB::rollback();
                        }
                    }

                    $mct_setting_query->save();
                    $prod_info_query->save();
                
                
            }
            if($clamp_eject!="")
            {

                $clamp_eject_query = new clamping_ejecting_setting();
                $clamp_eject_query->open_limit_POS = $clamp_eject[0]['open_limit_POS'];
                $clamp_eject_query->open_limit_VEL = $clamp_eject[0]['open_limit_VEL'];
                $clamp_eject_query->close_sw_POS = $clamp_eject[0]['close_sw_POS'];
                $clamp_eject_query->close_sw_VEL =$clamp_eject[0]['close_sw_VEL'];
                $clamp_eject_query->close_slow_POS = $clamp_eject[0]['close_slow_POS'];
                $clamp_eject_query->close_slow_VEL = $clamp_eject[0]['close_slow_VEL'];
                $clamp_eject_query->close_sp_POS = $clamp_eject[0]['close_sp_POS'];
                $clamp_eject_query->mold_prtct_POS = $clamp_eject[0]['mold_prtct_POS'];
                $clamp_eject_query->breakaway_VEL = $clamp_eject[0]['breakaway_VEL'];
                $clamp_eject_query->open1_POS = $clamp_eject[0]['open1_POS'];
                $clamp_eject_query->open1_VEL = $clamp_eject[0]['open1_VEL'];
                $clamp_eject_query->open2_POS = $clamp_eject[0]['open2_POS'];
                $clamp_eject_query->open2_VEL = $clamp_eject[0]['open2_VEL'];
                $clamp_eject_query->full_open_POS = $clamp_eject[0]['full_open_POS'];
                $clamp_eject_query->eject_start_POS = $clamp_eject[0]['eject_start_POS'];
                $clamp_eject_query->pulses = $clamp_eject[0]['pulses'];
                $clamp_eject_query->FWD_POS = $clamp_eject[0]['FWD_POS'];
                $clamp_eject_query->FWD_VEL = $clamp_eject[0]['FWD_VEL'];
                $clamp_eject_query->FWD_DWELL =$clamp_eject[0]['FWD_DWELL'];
                $clamp_eject_query->ADV_POS = $clamp_eject[0]['ADV_POS'];
                $clamp_eject_query->ADV_VEL = $clamp_eject[0]['ADV_VEL'];
                $clamp_eject_query->ADV_DWELL = $clamp_eject[0]['ADV_DWELL'];
                $clamp_eject_query->REV_POS = $clamp_eject[0]['REV_POS'];
                $clamp_eject_query->REV_VEL =$clamp_eject[0]['REV_VEL'];
                $clamp_eject_query->REV_DWELL =$clamp_eject[0]['REV_DWELL'];
                $clamp_eject_query->ejector_delay = $clamp_eject[0]['ejector_delay'];
                $clamp_eject_query->auto_die_height = $clamp_eject[0]['auto_die_height'];
                $clamp_eject_query ->main_register_id =  request('id');
                $clamp_eject_query->user_id = Auth::user()->id;
                
                if($clamp_eject[0]['result']=="unsolved"){
                    $clamp_eject_query ->adj_entry = 'true';
                    $clamp_eject_query ->reason_id = $clamp_eject[0]['reason'];
                    $clamp_eject_query ->result = $clamp_eject[0]['result'];
                }
                else{
                    $update_clamp_eject = DB::table('clamping_ejecting_tbl')
                                            ->where('main_register_id',request('id'))
                                            ->where('usage_status','true')
                                            ->update(['usage_status'=>'false']);

                    $clamp_eject_query ->adj_entry = 'true';
                    $clamp_eject_query ->usage_status ='true';
                    $clamp_eject_query ->reason_id = $clamp_eject[0]['reason'];
                    $clamp_eject_query ->result = $clamp_eject[0]['result'];
                }
                $clamp_eject_query->save();
            }
            if($cylinder_temp!="")
            {
                
                $cylinder_temp_query = new cylinder_temp();
                $cylinder_temp_query ->nozzle =$cylinder_temp[0]['nozzle'];
                $cylinder_temp_query ->barrel1 =$cylinder_temp[0]['barrel1'];
                $cylinder_temp_query ->barrel2 =$cylinder_temp[0]['barrel2'];
                $cylinder_temp_query ->barrel3 =$cylinder_temp[0]['barrel3'];
                $cylinder_temp_query ->feed_throat = $cylinder_temp[0]['feed_throat'];
                $cylinder_temp_query ->main_register_id = request('id');
                $cylinder_temp_query->user_id = Auth::user()->id;
            

                if($cylinder_temp[0]['result']=="unsolved")
                {
                    $cylinder_temp_query ->adj_entry = 'true';
                    $cylinder_temp_query ->reason_id = $cylinder_temp[0]['reason'];
                    $cylinder_temp_query ->result = $cylinder_temp[0]['result'];
                }
                else
                {
                    $update_cylinder_temp = DB::table('cylinder_temp_tbl')
                                                ->where('main_register_id',request('id'))
                                                ->where('usage_status','true')
                                                ->update(['usage_status'=>'false']);

                    $cylinder_temp_query ->adj_entry = 'true';
                    $cylinder_temp_query ->usage_status ='true';
                    $cylinder_temp_query ->reason_id = $cylinder_temp[0]['reason'];
                    $cylinder_temp_query ->result = $cylinder_temp[0]['result'];
                }
                $cylinder_temp_query->save();
            }
            if($inj_pack!="")
            {
            
                $inj_step_query = new inj_pack_setting();
                $inj_step_query->inj_step_mid = $inj_pack[0]['inj_step_mid'];
                $inj_step_query->injection_step =json_encode($inj_pack[0]['inj_step']);
                $inj_step_query->max_inj_pressure = $inj_pack[0]['max_inj_pressure'];
                $inj_step_query->actual_pressure = $inj_pack[0]['actual_pressure'];
                $inj_step_query->max_inj_time = $inj_pack[0]['max_inj_time'];
                $inj_step_query->actual_time = $inj_pack[0]['actual_time'];
                $inj_step_query->max_pack_velo = $inj_pack[0]['max_pack_velo'];
                $inj_step_query->pack_step_mid =$inj_pack[0]['pack_step_mid'];
                $inj_step_query->pos_trans = $inj_pack[0]['pos_trans'];
                $inj_step_query->pack_step = json_encode($inj_pack[0]['pack_step']);
                $inj_step_query ->main_register_id = request('id');
                $inj_step_query->user_id = Auth::user()->id;

                if($inj_pack[0]['result']=="unsolved")
                {
                    $inj_step_query ->adj_entry = 'true';
                    $inj_step_query ->reason_id = $inj_pack[0]['reason'];
                    $inj_step_query ->result = $inj_pack[0]['result'];
                }
                else
                {
                    $update_inj_step = DB::table('inj_pack_setting_tbl')
                                        ->where('main_register_id',request('id'))
                                        ->where('usage_status','true')
                                        ->update(['usage_status'=>'false']);

                    $inj_step_query ->adj_entry = 'true';
                    $inj_step_query ->usage_status ='true';
                    $inj_step_query ->reason_id = $inj_pack[0]['reason'];
                    $inj_step_query ->result = $inj_pack[0]['result'];
                }
                $inj_step_query->save();

            }
            if($measuring_condition!="")
            {
                
                $measuring_condtion_query = new measuring_condition_setting();
                $measuring_condtion_query->extruder_on = $measuring_condition[0]['extruder_on'];
                $measuring_condtion_query->extruder_json = json_encode($measuring_condition[0]['extruder_json']);
                $measuring_condtion_query->m_cushion = $measuring_condition[0]['m_cushion'];
                $measuring_condtion_query->shot_size =$measuring_condition[0]['shot_size'];
                $measuring_condtion_query->dcmp_dist = $measuring_condition[0]['dcmp_dist'];
                $measuring_condtion_query->dcmp_vel = $measuring_condition[0]['dcmp_vel'];
                $measuring_condtion_query->cool_time = $measuring_condition[0]['cool_time'];
                $measuring_condtion_query ->main_register_id =  request('id');
                $measuring_condtion_query->user_id = Auth::user()->id;

                if($measuring_condition[0]['result']=="unsolved")
                {
                    $measuring_condtion_query ->adj_entry = 'true';
                    $measuring_condtion_query ->reason_id = $measuring_condition[0]['reason'];
                    $measuring_condtion_query ->result = $measuring_condition[0]['result'];
                }
                else
                {
                    $update_measuring_condition = DB::table('measuring_condition_setting_tbl')
                                                        ->where('main_register_id',request('id'))
                                                        ->where('usage_status','true')
                                                        ->update(['usage_status'=>'false']);

                    $measuring_condtion_query ->adj_entry = 'true';
                    $measuring_condtion_query ->usage_status ='true';
                    $measuring_condtion_query ->reason_id = $measuring_condition[0]['reason'];
                    $measuring_condtion_query ->result = $measuring_condition[0]['result'];
                }
                $measuring_condtion_query->save();
            }
            
            // $insert_ctrl_no->curr_prev_status = 'current';
 
            /* $update_main_register = DB::table('main_register_tbl')
                                        ->where('id',request('id'))
                                        ->update(['current_ctrl_id'=>$select_ctrl->id]); */
            //return ($ctrl_no);
            if(request('btn_status')=='for_approval'){
                if($mct_setting[0]['result']=="solved" || $clamp_eject[0]['result']=="solved" || $cylinder_temp[0]['result']=="solved" ||
                $inj_pack[0]['result']=="solved" || $measuring_condition[0]['result']=="solved")
                {
                    $select_ctrl = Control_No::select('id')
                                                ->where('main_register_id',request('id'))
                                                ->where('ctrl_no',$ctrl_no)
                                                ->where('user_id',Auth::user()->id)
                                                ->first();

                    $update_ctrl_no_prev = DB::table('ctrl_no_tbl')
                                                ->where('main_register_id',request('id'))
                                                ->where('curr_prev_status','current')
                                                ->update(['curr_prev_status'=>'previous']);
                    
                    $update_ctrl_no_curr = DB::table('ctrl_no_tbl')
                                                ->where('id',$select_ctrl->id)
                                                ->update(['curr_prev_status'=>'current']);
                    
                    $this->Finished_without_change($request,$select_ctrl->id,$get_before_mct_setting,$get_before_product_info,$get_before_clamp_eject,$get_before_cylinder_temp,
                    $get_before_inj_pack,$get_before_measuring_condition);
                
                }
            }

           DB::commit();

        }
        catch(Exception $ex){
            DB::rollback();
            echo $ex;
        }



    }

    public function SaveAsDrafts(Request $request)
    {
        $mct_setting = request('mct_setting');
        $clamp_eject = request('clamp_eject');
        $cylinder_temp = request('cylinder_temp');
        $inj_pack = request('inj_pack');
        $measuring_condition = request('measuring_condition');
        // $ctrl_no = $this->GenerateCtrlNo('',request('machine_no'),request('id'));
        // return ($ctrl_no);
        try{
            DB::beginTransaction();
            //  return ($clamp_eject);
            // return ($ctrl_no);

            // $insert_ctrl_no = new Control_No();
            // $insert_ctrl_no->main_register_id = request('id');
            // $insert_ctrl_no->ctrl_no = $ctrl_no;
            // $insert_ctrl_no->user_id = Auth::user()->id;
            // $insert_ctrl_no->save();

            if($mct_setting)
            {
            
                    $mct_setting_query = new mct_setting();
                    $mct_setting_query ->die_temp_core = $mct_setting[0]['die_temp_core'];
                    $mct_setting_query ->die_temp_cavity = $mct_setting[0]['die_temp_cavity'];
                    $mct_setting_query ->mold_temp_control = $mct_setting[0]['mold_temp_control'];
                    $mct_setting_query ->main_register_id = request('id');
                    $mct_setting_query ->reason_id = $mct_setting[0]['reason'];
                    $mct_setting_query ->result = $mct_setting[0]['result'];
                    $mct_setting_query ->adj_entry = 'draft';
                        

                    $prod_info_query = new product_info();
                    $prod_info_query->machine_cycle_time = $mct_setting[0]['machine_cycle_time'];
                    $prod_info_query->product_weight = json_encode($mct_setting[0]['product_weight']);
                    $prod_info_query->sprue_weight = $mct_setting[0]['sprue_weight'];
                    $prod_info_query->sub_part_weight = $mct_setting[0]['sub_part_weight'];
                    $prod_info_query->additional_cycle_time = $mct_setting[0]['additional_cycle_time'];
                    $prod_info_query ->main_register_id = request('id');
                    $prod_info_query ->reason_id = $mct_setting[0]['reason'];
                    $prod_info_query ->result = $mct_setting[0]['result'];
                    $prod_info_query ->adj_entry = 'draft';
                    

                    $mct_setting_query->save();
                    $prod_info_query->save();
                
                
            }
            if($clamp_eject!="")
            {

                $clamp_eject_query = new clamping_ejecting_setting();
                $clamp_eject_query->open_limit_POS = $clamp_eject[0]['open_limit_POS'];
                $clamp_eject_query->open_limit_VEL = $clamp_eject[0]['open_limit_VEL'];
                $clamp_eject_query->close_sw_POS = $clamp_eject[0]['close_sw_POS'];
                $clamp_eject_query->close_sw_VEL =$clamp_eject[0]['close_sw_VEL'];
                $clamp_eject_query->close_slow_POS = $clamp_eject[0]['close_slow_POS'];
                $clamp_eject_query->close_slow_VEL = $clamp_eject[0]['close_slow_VEL'];
                $clamp_eject_query->close_sp_POS = $clamp_eject[0]['close_sp_POS'];
                $clamp_eject_query->mold_prtct_POS = $clamp_eject[0]['mold_prtct_POS'];
                $clamp_eject_query->breakaway_VEL = $clamp_eject[0]['breakaway_VEL'];
                $clamp_eject_query->open1_POS = $clamp_eject[0]['open1_POS'];
                $clamp_eject_query->open1_VEL = $clamp_eject[0]['open1_VEL'];
                $clamp_eject_query->open2_POS = $clamp_eject[0]['open2_POS'];
                $clamp_eject_query->open2_VEL = $clamp_eject[0]['open2_VEL'];
                $clamp_eject_query->full_open_POS = $clamp_eject[0]['full_open_POS'];
                $clamp_eject_query->eject_start_POS = $clamp_eject[0]['eject_start_POS'];
                $clamp_eject_query->pulses = $clamp_eject[0]['pulses'];
                $clamp_eject_query->FWD_POS = $clamp_eject[0]['FWD_POS'];
                $clamp_eject_query->FWD_VEL = $clamp_eject[0]['FWD_VEL'];
                $clamp_eject_query->FWD_DWELL =$clamp_eject[0]['FWD_DWELL'];
                $clamp_eject_query->ADV_POS = $clamp_eject[0]['ADV_POS'];
                $clamp_eject_query->ADV_VEL = $clamp_eject[0]['ADV_VEL'];
                $clamp_eject_query->ADV_DWELL = $clamp_eject[0]['ADV_DWELL'];
                $clamp_eject_query->REV_POS = $clamp_eject[0]['REV_POS'];
                $clamp_eject_query->REV_VEL =$clamp_eject[0]['REV_VEL'];
                $clamp_eject_query->REV_DWELL =$clamp_eject[0]['REV_DWELL'];
                $clamp_eject_query->ejector_delay = $clamp_eject[0]['ejector_delay'];
                $clamp_eject_query->auto_die_height = $clamp_eject[0]['auto_die_height'];
                $clamp_eject_query ->main_register_id =  request('id');
                
                $clamp_eject_query ->adj_entry = 'draft';
                $clamp_eject_query ->reason_id = $clamp_eject[0]['reason'];
                $clamp_eject_query ->result = $clamp_eject[0]['result'];
                

                $clamp_eject_query->save();
            }
            if($cylinder_temp!="")
            {
                
                $cylinder_temp_query = new cylinder_temp();
                $cylinder_temp_query ->nozzle =$cylinder_temp[0]['nozzle'];
                $cylinder_temp_query ->barrel1 =$cylinder_temp[0]['barrel1'];
                $cylinder_temp_query ->barrel2 =$cylinder_temp[0]['barrel2'];
                $cylinder_temp_query ->barrel3 =$cylinder_temp[0]['barrel3'];
                $cylinder_temp_query ->feed_throat = $cylinder_temp[0]['feed_throat'];
                $cylinder_temp_query ->main_register_id = request('id');

                    $cylinder_temp_query ->adj_entry = 'draft';
                    $cylinder_temp_query ->reason_id = $cylinder_temp[0]['reason'];
                    $cylinder_temp_query ->result = $cylinder_temp[0]['result'];
                
                
                $cylinder_temp_query->save();
            }
            if($inj_pack!="")
            {
            
                $inj_step_query = new inj_pack_setting();
                $inj_step_query->inj_step_mid = $inj_pack[0]['inj_step_mid'];
                $inj_step_query->injection_step =json_encode($inj_pack[0]['inj_step']);
                $inj_step_query->max_inj_pressure = $inj_pack[0]['max_inj_pressure'];
                $inj_step_query->actual_pressure = $inj_pack[0]['actual_pressure'];
                $inj_step_query->max_inj_time = $inj_pack[0]['max_inj_time'];
                $inj_step_query->actual_time = $inj_pack[0]['actual_time'];
                $inj_step_query->max_pack_velo = $inj_pack[0]['max_pack_velo'];
                $inj_step_query->pack_step_mid =$inj_pack[0]['pack_step_mid'];
                $inj_step_query->pos_trans = $inj_pack[0]['pos_trans'];
                $inj_step_query->pack_step = json_encode($inj_pack[0]['pack_step']);
                $inj_step_query ->main_register_id = request('id');

                
                    $inj_step_query ->adj_entry = 'draft';
                    $inj_step_query ->reason_id = $inj_pack[0]['reason'];
                    $inj_step_query ->result = $inj_pack[0]['result'];
                
                
                $inj_step_query->save();

            }
            if($measuring_condition!="")
            {
                
                $measuring_condtion_query = new measuring_condition_setting();
                $measuring_condtion_query->extruder_on = $measuring_condition[0]['extruder_on'];
                $measuring_condtion_query->extruder_json = json_encode($measuring_condition[0]['extruder_json']);
                $measuring_condtion_query->m_cushion = $measuring_condition[0]['m_cushion'];
                $measuring_condtion_query->shot_size =$measuring_condition[0]['shot_size'];
                $measuring_condtion_query->dcmp_dist = $measuring_condition[0]['dcmp_dist'];
                $measuring_condtion_query->dcmp_vel = $measuring_condition[0]['dcmp_vel'];
                $measuring_condtion_query->cool_time = $measuring_condition[0]['cool_time'];
                $measuring_condtion_query ->main_register_id =  request('id');

            
                $measuring_condtion_query ->adj_entry = 'draft';
                $measuring_condtion_query ->reason_id = $measuring_condition[0]['reason'];
                $measuring_condtion_query ->result = $measuring_condition[0]['result'];
                
                
                $measuring_condtion_query->save();
            }
            
           DB::commit();

        }
        catch(Exception $ex){
            DB::rollback();
            echo $ex;
        }



    }


    public function add_reason(Request $request){
        
        $data = new reason_change();
        $data ->reason_desc = request('add_reason');
        $data->save();

        if($data){
            return $data->id;
        }
        else{
            return "false";
        }

    }
}
