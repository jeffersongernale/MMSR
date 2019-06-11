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

class AjaxApproveListController extends Controller
{
    //
    public function datatable(Request $request)
    {
        if(request('part_no')== "" && request('mold_no')== "" && request('machine_no')== "")
        {
            $data = DB::table('after_prod_tbl')
                        ->select('main_register_tbl.id','main_register_tbl.drawing_no','main_register_tbl.revision_no',
                        'main_register_tbl.drawing_name','main_register_tbl.mold_no','after_prod_tbl.updated_at',
                        'machine_tbl.machine_code','main_register_tbl.machine_id','main_register_tbl.record_type',
                        'after_prod_tbl.id AS after_prod_id','users.name')

                        ->join('main_register_tbl','after_prod_tbl.main_register_id','main_register_tbl.id')
                        ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
                        ->join('users','after_prod_tbl.user_id','users.id')
                        ->whereNotNull('after_prod_tbl.checker_id')
                        ->whereNotNull('after_prod_tbl.review_id')
                        ->whereNull('after_prod_tbl.approve_id')
                        ->where('after_prod_tbl.active_status',1)                        
                        ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
        }
        else
        {
           
            

            $data = DB::table('after_prod_tbl')
                        ->select('main_register_tbl.id','main_register_tbl.ctrl_no','main_register_tbl.drawing_no','main_register_tbl.revision_no',
                        'main_register_tbl.drawing_name','main_register_tbl.mold_no','main_register_tbl.updated_at',
                        'machine_tbl.machine_code','main_register_tbl.machine_id', 'main_register_tbl.record_type',
                        'after_prod_tbl.id AS after_prod_id','users.name')

                        ->join('main_register_tbl','after_prod_tbl.main_register_id','main_register_tbl.id')
                        ->join('users','after_prod_tbl.user_id','users.id')
                        ->join('machine_tbl','main_register_tbl.machine_id','machine_tbl.id')
                        ->where('main_register_tbl.drawing_no',request('part_no'))
                        ->where('main_register_tbl.mold_no',request('mold_no'))
                        ->where('main_register_tbl.machine_id',request('machine_no'))
                        ->whereNotNull('after_prod_tbl.checker_id')
                        ->whereNotNull('after_prod_tbl.review_id')
                        ->whereNull('after_prod_tbl.approve_id')
                        ->where('after_prod_tbl.active_status',1)                        
                        ->orderBy('main_register_tbl.id','DESC')->limit(1500)->get();
        }
       
        return datatables($data)->make(true);

    }

    public function mark_approve(Request $request)
    {

        $update_after_tbl = DB::table('after_prod_tbl')
                                ->where('id',request('after_id'))
                                ->update(['approve_id'=>Auth::user()->id]);

    }
}
