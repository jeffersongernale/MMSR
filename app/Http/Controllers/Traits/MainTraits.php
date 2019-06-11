<?php

namespace App\Http\Controllers\Traits;
use App\machine;
use App\main_register_tbl;
use App\Control_No;

use Illuminate\Support\Facades\Auth;
use App\mct_setting;
use App\cylinder_temp;
use App\User;
use App\inj_pack_setting;
use App\measuring_condition_setting;
use App\clamping_ejecting_setting;
use App\After_Prod_Data;
use App\product_info;

use Response;
use DB;

trait MainTraits
{
    public function GenerateCtrlNo($ctrl_id,$machine_id,$main_reg_id='')
    {
        $ctrl_no = '';
        
        if($ctrl_id!="nomatch")
        {
            if($main_reg_id!='')
            {
                $data = Control_No::select('id')
                                    ->where('main_register_id',$main_reg_id)
                                    ->max('id');
                $ctrl_id = $data;                  
            }
            $get_ctrl_no = Control_No::where('id',$ctrl_id)->first();
            $series = substr($get_ctrl_no->ctrl_no,8);
            $series = (int)$series;
            $series+=1;
            $machine = Machine::where('id',$machine_id)->first();
            $machine_code = $machine->machine_code;
            $machine_code = (int)$machine_code;

            if($series<10)
            {
                $series='00'.$series;
            }
            else if($series<99)
            {
                $series="0".$series;
            }
            $ctrl_no = "M".$machine_code."PS-".date('y')."-".$series;
        }
        else
        {
            
            $series="001";
            $machine = Machine::where('id',$machine_id)->first();
            $machine_code = $machine->machine_code;
            $machine_code = (int)$machine_code;
            
            $ctrl_no = "M".$machine_code."PS-".date('y')."-".$series;
        }
       

        return $ctrl_no;
    }

    public function LoadAdjustments_mct_setting($id){

        $after_data = mct_setting::with('reason_relation')
                                    ->where('main_register_id',$id)
                                    ->where('adj_entry','true')
                                    ->orderBy('created_at','ASC')
                                    ->get();
    
        $before_data =  mct_setting::where('main_register_id',$id)
                                    ->where('adj_entry','false')
                                    ->orderBy('created_at','ASC')
                                    ->get();
                                    
            return compact('after_data','before_data');
    }


    public function LoadAdjustments_prod_info($id){

        $after_data = product_info::with('reason_relation')
                                    ->where('main_register_id',$id)
                                    ->where('adj_entry','true')
                                    ->orderBy('created_at','ASC')
                                    ->get();
        
        $before_data =  product_info::where('main_register_id',$id)
                                    ->where('adj_entry','false')
                                    ->orderBy('created_at','ASC')
                                    ->get();
            return compact('after_data','before_data'); 
    }

    public function LoadAdjustments_clamp_eject($id){

        $after_data = clamping_ejecting_setting::with('reason_relation')
                                    ->where('main_register_id',$id)
                                    ->where('adj_entry','true')
                                    ->orderBy('created_at','ASC')
                                    ->get();
       
        $before_data =  clamping_ejecting_setting::where('main_register_id',$id)
                                                    ->where('adj_entry','false')
                                                    ->orderBy('created_at','ASC')
                                                    ->get();
        return compact('after_data','before_data');  
    }

    public function LoadAdjustments_cylinder($id){

        $after_data = cylinder_temp::with('reason_relation')
                                    ->where('main_register_id',$id)
                                    ->where('adj_entry','true')
                                    ->orderBy('created_at','ASC')
                                    ->get();
     
        $before_data =  cylinder_temp::where('main_register_id',$id)
                                        ->where('adj_entry','false')
                                        ->orderBy('created_at','ASC')
                                        ->get();
        return compact('after_data','before_data');
    }

    public function LoadAdjustments_inj_pack($id){

        $after_data = inj_pack_setting::with('reason_relation')
                                    ->where('main_register_id',$id)
                                    ->where('adj_entry','true')
                                    ->orderBy('created_at','ASC')
                                    ->get();
     
        $before_data =  inj_pack_setting::where('main_register_id',$id)
                                        ->where('adj_entry','false')
                                        ->orderBy('created_at','ASC')
                                        ->get();
        return compact('after_data','before_data');
    }

    public function LoadAdjustments_measuring_condition($id){

        $after_data = measuring_condition_setting::with('reason_relation')
                                    ->where('main_register_id',$id)
                                    ->where('adj_entry','true')
                                    ->orderBy('created_at','ASC')
                                    ->get();
     
        $before_data =  measuring_condition_setting::where('main_register_id',$id)
                                        ->where('adj_entry','false')
                                        ->orderBy('created_at','ASC')
                                        ->get();
        return compact('after_data','before_data');
    }


}