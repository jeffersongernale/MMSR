<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class product_info extends Model
{
    //
    protected $table = 'product_info_tbl';
    public $primarykey = 'id';
    public $timestamps = true;

    public function reason_relation(){
        return $this->belongsTo('App\reason_change', 'reason_id');
    }
}
