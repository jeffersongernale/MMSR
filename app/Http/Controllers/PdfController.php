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
use App\Machine;
use App\Die_Type;

// use Yajra\DataTables\DataTablesServiceProvider;
// use App\Http\Controllers\Traits\MainTraits;
use Response;
use DB;
// use PDF;

class PdfController extends Controller
{
    //
    function pdf(){

        // $pdf = \App::make('dompdf.wrapper');
        // $pdf=\PDF::loadHTML('<h1>Hello World</h1>');
        // $pdf = PDF::loadView("pages.pdf_template");
        // $pdf->stream();
        $main = main_register_tbl::select('mold_no','drawing_no')
        ->whereNull('usage_status')
        ->distinct()
        ->get();
        $Machine = Machine::all();

        // $Die_Type = Die_Type::all();
        // $pdf = \App::make('dompdf.wrapper');
        // $pdf->loadHTML($this->convert_to_pdf());
        // $pdf = PDF::loadView("pages.pdf_template.pdf_template",compact('main','Machine','Die_Type'));
        // return $pdf->stream();
    }

    function convert_to_pdf(){

        $output = '<html>
                    <head>
                        <link rel="stylesheet" href="/MMSR/public/css/custom.css">
                    </head>
                    <table class="table" border="1">
                    <thead>
                    <tr>
                    <th>test</th>
                    <th>test</th>
                    <th>test</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    </tbody>
                    </table>';

        return $output;
    }
}
