<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    //
    
    protected $table = 'machine_tbl';
    public $primarykey = 'id';
    public $timestamps = true;
}
