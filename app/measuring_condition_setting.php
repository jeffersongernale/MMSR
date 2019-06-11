<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class measuring_condition_setting extends Model
{
    //
    protected $table = 'measuring_condition_setting_tbl';
    public $primarykey = 'id';
    public $timestamps = true;
    
    public function reason_relation(){
        return $this->belongsTo('App\reason_change', 'reason_id');
    }
}
