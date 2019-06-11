<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AlarmNotification extends Model
{
    //
    protected $table = 'alarm_tbl';
    public $primarykey = 'id';
    public $timestamps = true;
}
