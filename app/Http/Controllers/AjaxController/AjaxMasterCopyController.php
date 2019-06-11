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

class AjaxMasterCopyController extends Controller
{
    //
    public function datatable(Request $request)
    {
        if(request('part_no')== "" && request('mold_no')== "" && request('machine_no')== "")
        {
            $data = DB::table('main_register_tbl')
                        ->select('main_register_tbl.id','main_register_tbl.ctrl_no','main_register_tbl.drawing_no','main_register_tbl.revision_no',
                        'main_register_tbl.drawing_name','main_register_tbl.mold_no','main_register_tbl.created_at','main_register_tbl.record_type',
                        'machine_tbl.machine_code','main_register_tbl.machine_id')
                        ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
                        ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
        }
        else
        {
           
            

            $data = DB::table('main_register_tbl')
                        ->select('main_register_tbl.id','main_register_tbl.ctrl_no','main_register_tbl.drawing_no','main_register_tbl.revision_no',
                        'main_register_tbl.drawing_name','main_register_tbl.mold_no','main_register_tbl.created_at','main_register_tbl.record_type',
                        'machine_tbl.machine_code','main_register_tbl.machine_id')
                        ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
                        ->where('main_register_tbl.drawing_no',request('part_no'))
                        ->where('main_register_tbl.mold_no',request('mold_no'))
                        ->where('main_register_tbl.machine_id',request('machine_no'))
                        ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
        }
       
        return datatables($data)->make(true);

    }

    public function load_before_data(Request $request)
    {

        $ctrl_no = main_register_tbl:: select('ctrl_no','created_at')
                                ->where('id',request('main_register_id'))
                                ->first();
           
        $mct_setting = mct_setting::where('main_register_id',request('main_register_id'))
                                    ->where('adj_entry','false')
                                    ->get();
    
        $cylinder_temp = cylinder_temp::where('main_register_id',request('main_register_id'))
                                            ->where('adj_entry','false')
                                            ->get();
    
        $inj_pack_setting = inj_pack_setting::where('main_register_id',request('main_register_id'))
                                                ->where('adj_entry','false')
                                                ->get();
                
        $measuring_condition_setting = measuring_condition_setting::where('main_register_id',request('main_register_id'))
                                                                    ->where('adj_entry','false')
                                                                    ->get();
    
        $clamping_ejecting_setting = clamping_ejecting_setting::where('main_register_id',request('main_register_id'))
                                                                ->where('adj_entry','false')
                                                                ->get();

        $product_info = product_info::where('main_register_id',request('main_register_id'))
                                        ->where('adj_entry','false')
                                        ->get();
        
        
        
        return compact('ctrl_no','mct_setting','cylinder_temp','inj_pack_setting',
                        'measuring_condition_setting','clamping_ejecting_setting','product_info');

        
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

}
