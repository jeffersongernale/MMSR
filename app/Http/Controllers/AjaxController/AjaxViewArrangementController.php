<?php

namespace App\Http\Controllers\AjaxController;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AjaxViewArrangementController extends Controller
{
    //


    public function copypdf(Request $request){

        $file = '\\\\10.164.20.211/PartsManufacturing_Guidance/Standard Packaging Arrangement/PMA - MOLD/'.request('pdf_name').'.pdf';
        $newfile = '\\\\10.164.30.175/htdocs/MMSR/public/upload/view_arrangement/'.request('pdf_name').'.pdf';
         
        
            if (!copy($file, $newfile)) {
                return "fail";
            }
            else{
                return "success";
            }
    }
    
}
