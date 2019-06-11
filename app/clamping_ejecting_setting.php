<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class clamping_ejecting_setting extends Model
{
    //
    protected $table = 'clamping_ejecting_tbl';
    public $primarykey = 'id';
    public $timestamps = true;

    public function reason_relation(){
        return $this->belongsTo('App\reason_change', 'reason_id');
    }
}
