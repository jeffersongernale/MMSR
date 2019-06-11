<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class cylinder_temp extends Model
{
    //
    protected $table = 'cylinder_temp_tbl';
    public $primarykey = 'id';
    public $timestamps = true;

    public function reason_relation(){
        return $this->belongsTo('App\reason_change', 'reason_id');
    }
}
