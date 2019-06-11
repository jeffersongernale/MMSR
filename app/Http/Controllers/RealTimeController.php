<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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


class RealTimeController extends Controller
{
    //

    public function checklist(Request $request){

       
        $data = After_Prod_Data::whereNull('after_prod_tbl.checker_id')->where('active_status',1)->get();
        $count  = $data->count();

        return $count;

    }

    public function reviewlist(Request $request){

       
        $data = After_Prod_Data::whereNotNull('after_prod_tbl.checker_id')
                                ->whereNull('after_prod_tbl.review_id')
                                ->where('active_status',1)
                                ->get();
        $count  = $data->count();

        return $count;

    }

    public function approvelist(Request $request){

       
        $data = After_Prod_Data::whereNotNull('after_prod_tbl.checker_id')
                                ->whereNotNull('after_prod_tbl.review_id')
                                ->whereNull('after_prod_tbl.approve_id')
                                ->where('active_status',1)
                                ->get();
        $count  = $data->count();

        return $count;

    }
}
