<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class mct_setting extends Model
{
    //
    protected $table = 'mct_setting';
    public $primarykey = 'id';
    public $timestamps = true;

    public function reason_relation(){
        return $this->belongsTo('App\reason_change', 'reason_id');
    }
}
