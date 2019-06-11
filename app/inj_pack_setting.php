<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class inj_pack_setting extends Model
{
    //
    protected $table = 'inj_pack_setting_tbl';
    public $primarykey = 'id';
    public $timestamps = true;
    
    public function reason_relation(){
        return $this->belongsTo('App\reason_change', 'reason_id');
    }
}
