<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class main_register_tbl extends Model
{
    //
    protected $table = 'main_register_tbl';
    public $primarykey = 'id';
    public $timestamps = true;

    public function machine_link()
    {
        return $this->belongsTo('Machine', 'machine_id','id');
    }
}
