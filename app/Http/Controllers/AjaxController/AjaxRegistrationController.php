<?php

namespace App\Http\Controllers\AjaxController;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\main_register_tbl;
use App\mct_setting;
use App\cylinder_temp;
use App\User;
use App\inj_pack_setting;
use App\measuring_condition_setting;
use App\clamping_ejecting_setting;
use App\machine;
use App\product_info;
use Illuminate\Support\Facades\Auth;
use App\Control_No;

use App\Http\Controllers\Traits\MainTraits;
use DB;


class AjaxRegistrationController extends Controller
{
    //
    use MainTraits;

    public function Insert(Request $request)
    {

        $x=0;
        //3 Attempts for DB::Transaction
        for($x=0;$x<3;$x++)
        {
            DB::beginTransaction();
            try
            {
               
                
                $ctrl_no = $this->GenerateCtrlNo(request('id'),request('machine_no'));

                $insert_register = new main_register_tbl();
                $insert_register->ctrl_no = $ctrl_no;
                $insert_register->drawing_no = request('drawing_no');
                $insert_register->revision_no = request('revision_no');
                $insert_register->drawing_name = request('drawing_name');
                $insert_register->machine_id = request('machine_no');
                $insert_register->color_no = request('color_no');
                $insert_register->matl_name = request('matl_name');
                $insert_register->matl_grade = request('matl_grade');
                $insert_register->matl_color = request('matl_color');
                $insert_register->resin_temp = request('resin_temp');
                $insert_register->drying_temp = request('drying_temp');
                $insert_register->drying_hrs = request('drying_hrs');
                $insert_register->die_type_id = request('die_type');
                $insert_register->no_cavity = request('no_cavity');
                $insert_register->related_items = request('related_items');
                $insert_register->no_good_cavity = request('no_good_cavity');
                $insert_register->mold_no = request('mold_no');
                $insert_register->mold_location = request('mold_location');
                $insert_register->product_size = request('product_size');
                $insert_register->packaging_class = request('packaging_class');
                $insert_register->qty_per_bag = request('qty_per_bag');
                $insert_register->pcase_max_qty = request('pcase_max_qty');
                $insert_register->remarks = request('remarks');
                $insert_register->user_id = Auth::user()->id;
                $insert_register->remarks = request('remarks');
                $insert_register->record_type = request('record_type');
                $insert_register->save();
        
                $insert_mct_setting = new mct_setting();
                $insert_mct_setting ->die_temp_core = request('die_temp_core');
                $insert_mct_setting ->die_temp_cavity = request('die_temp_cavity');
                $insert_mct_setting ->mold_temp_control = request('mold_temp_control');
                $insert_mct_setting ->main_register_id = $insert_register->id;
                $insert_mct_setting->usage_status = "true";
                $insert_mct_setting->user_id = Auth::user()->id;
                $insert_mct_setting->save();

                $insert_cylinder_temp = new cylinder_temp();
                $insert_cylinder_temp ->nozzle = request('nozzle');
                $insert_cylinder_temp ->barrel1 = request('barrel1');
                $insert_cylinder_temp ->barrel2 = request('barrel2');
                $insert_cylinder_temp ->barrel3 = request('barrel3');
                $insert_cylinder_temp ->feed_throat = request('feed_throat');
                $insert_cylinder_temp ->main_register_id = $insert_register->id;
                $insert_cylinder_temp->usage_status = "true";
                $insert_cylinder_temp->user_id = Auth::user()->id;
                $insert_cylinder_temp->save();

                $insert_inj_step = new inj_pack_setting();
                $insert_inj_step->inj_step_mid = request('inj_step_mid');
                $insert_inj_step->injection_step = request('inj_step');
                $insert_inj_step->max_inj_pressure = request('max_inj_pressure');
                $insert_inj_step->actual_pressure = request('actual_pressure');
                $insert_inj_step->max_inj_time = request('max_inj_time');
                $insert_inj_step->actual_time = request('actual_time');
                $insert_inj_step->max_pack_velo = request('max_pack_velo');
                $insert_inj_step->pack_step_mid = request('pack_step_mid');
                $insert_inj_step->pos_trans = request('pos_trans');
                $insert_inj_step->pack_step = request('pack_step');
                $insert_inj_step ->main_register_id = $insert_register->id;
                $insert_inj_step->usage_status = "true";
                $insert_inj_step->user_id = Auth::user()->id;
                $insert_inj_step->save();

                $insert_measuring_condtion = new measuring_condition_setting();
                $insert_measuring_condtion->extruder_on = request('extruder_on');
                $insert_measuring_condtion->extruder_json = request('extruder_json');
                $insert_measuring_condtion->m_cushion = request('m_cushion');
                $insert_measuring_condtion->shot_size = request('shot_size');
                $insert_measuring_condtion->dcmp_dist = request('dcmp_dist');
                $insert_measuring_condtion->dcmp_vel = request('dcmp_vel');
                $insert_measuring_condtion->cool_time = request('cool_time');
                $insert_measuring_condtion ->main_register_id = $insert_register->id;
                $insert_measuring_condtion->usage_status = "true";
                $insert_measuring_condtion->user_id = Auth::user()->id;
                $insert_measuring_condtion->save();

                $insert_clamp_eject = new clamping_ejecting_setting();
                $insert_clamp_eject->open_limit_POS = request('open_limit_POS');
                $insert_clamp_eject->open_limit_VEL = request('open_limit_VEL');
                $insert_clamp_eject->close_sw_POS = request('close_sw_POS');
                $insert_clamp_eject->close_sw_VEL = request('close_sw_VEL');
                $insert_clamp_eject->close_slow_POS = request('close_slow_POS');
                $insert_clamp_eject->close_slow_VEL = request('close_slow_VEL');
                $insert_clamp_eject->close_sp_POS = request('close_sp_POS');
                $insert_clamp_eject->mold_prtct_POS = request('mold_prtct_POS');
                $insert_clamp_eject->breakaway_VEL = request('breakaway_VEL');
                $insert_clamp_eject->open1_POS = request('open1_POS');
                $insert_clamp_eject->open1_VEL = request('open1_VEL');
                $insert_clamp_eject->open2_POS = request('open2_POS');
                $insert_clamp_eject->open2_VEL = request('open2_VEL');
                $insert_clamp_eject->full_open_POS = request('full_open_POS');
                $insert_clamp_eject->eject_start_POS = request('eject_start_POS');
                $insert_clamp_eject->pulses = request('pulses');
                $insert_clamp_eject->FWD_POS = request('FWD_POS');
                $insert_clamp_eject->FWD_VEL = request('FWD_VEL');
                $insert_clamp_eject->FWD_DWELL = request('FWD_DWELL');
                $insert_clamp_eject->ADV_POS = request('ADV_POS');
                $insert_clamp_eject->ADV_VEL = request('ADV_VEL');
                $insert_clamp_eject->ADV_DWELL = request('ADV_DWELL');
                $insert_clamp_eject->REV_POS = request('REV_POS');
                $insert_clamp_eject->REV_VEL = request('REV_VEL');
                $insert_clamp_eject->REV_DWELL = request('REV_DWELL');
                $insert_clamp_eject->ejector_delay = request('ejector_delay');
                $insert_clamp_eject->auto_die_height = request('auto_die_height');
                $insert_clamp_eject ->main_register_id = $insert_register->id;
                $insert_clamp_eject->usage_status = "true";
                $insert_clamp_eject->user_id = Auth::user()->id;
                $insert_clamp_eject->save();

                $insert_product_info = new product_info();
                $insert_product_info->machine_cycle_time = request('machine_cycle_time');
                $insert_product_info->product_weight = json_encode(request('product_weight'));
                $insert_product_info->sprue_weight = request('sprue_weight');
                $insert_product_info->sub_part_weight = request('sub_part_weight');
                $insert_product_info->additional_cycle_time = request('additional_cycle_time');
                $insert_product_info ->main_register_id = $insert_register->id;
                $insert_product_info->usage_status = "true";
                $insert_product_info->user_id = Auth::user()->id;
                $insert_product_info->save();

                $insert_ctrl_no = new Control_No();
                $insert_ctrl_no->ctrl_no = $ctrl_no;
                $insert_ctrl_no ->main_register_id = $insert_register->id;
                $insert_ctrl_no->user_id = Auth::user()->id;
                $insert_ctrl_no->curr_prev_status = 'current';
                $insert_ctrl_no->save();

                if($insert_register && $insert_mct_setting && $insert_cylinder_temp && 
                $insert_inj_step && $insert_clamp_eject && $insert_product_info && $insert_ctrl_no){
                    DB::commit();
                    echo "true";
                    break;
                }
                
            }
            catch(Exception $ex)
            {
                DB::rollback();
                echo $ex;
            }
        }
       
       
    }

    public function CheckCtrlNo(Request $request)
    {
        $checker = '';
     
        $data = DB::table('ctrl_no_tbl')
                    ->select('ctrl_no_tbl.id')
                    ->join('main_register_tbl','ctrl_no_tbl.main_register_id','main_register_tbl.id')
                    ->where('main_register_tbl.drawing_no',request('part_no'))
                    ->where('main_register_tbl.mold_no',request('mold_no'))
                    ->where('main_register_tbl.machine_id',request('machine_no'))
                    ->where('main_register_tbl.record_type',request('record_type'))
                    ->whereNull('main_register_tbl.usage_status')
                    ->max('ctrl_no_tbl.id');
        
        if($data)
        {
            $checker = $data;
        }
        else
        {
            $checker = 'nomatch';
        }
        return $checker;

    }

    public function AddtoBlockList(Request $request){

        $main_reg_id = Control_No::select('main_register_id')->where('id',request('ctrl_id'))->first();

         $update_main_register = DB::table('main_register_tbl')
                                        ->where('id', $main_reg_id->main_register_id)
                                        ->update(['usage_status'=>'block']);
        if($update_main_register){
            return "true";
        }
        else{
            return "false";
        }
        
    }

   

}
