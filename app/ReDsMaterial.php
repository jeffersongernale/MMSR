<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ReDsMaterial extends Model
{
    //
    protected $connection = 'pgsql2';
    protected $table = 'materials';
    public $primarykey = 'id';
    public $timestamps = true;
}
