<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Alarm_Logs extends Model
{
    //
    protected $table = 'alarm_logs_tbl';
    public $primarykey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'main_register_id', 'parameter_setting', 'user_id','status',
    ];

}
