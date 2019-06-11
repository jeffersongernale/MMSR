<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class After_Prod_Data extends Model
{
    //
    protected $table = 'after_prod_tbl';
    public $primarykey = 'id';
    public $timestamps = true;


    public function mct_setting_relation(){
        return $this->belongsTo('App\mct_setting','mct_setting_id');
    }
    public function clamp_eject_relation(){
        return $this->belongsTo('App\clamping_ejecting_setting','clamping_ejecting_id');
    }
    public function cylinder_temp_relation(){
        return $this->belongsTo('App\cylinder_temp','cylinder_temp_id');
    }
    public function inj_pack_setting_relation(){
        return $this->belongsTo('App\inj_pack_setting','inj_pack_setting_id');
    }
    public function measuring_condition_relation(){
        return $this->belongsTo('App\measuring_condition_setting','measuring_condition_id');
    }
    public function product_info_relation(){
        return $this->belongsTo('App\product_info','product_info_id');
    }

    public function control_no_relation(){
        return $this->belongsTo('App\Control_No','ctrl_id');
    }

    public function users_relation(){
        return $this->belongsTo('App\User','user_id');
    }

    public function checkby_relation(){
        return $this->belongsTo('App\User','checker_id');
    }

    public function reviewby_relation(){
        return $this->belongsTo('App\User','review_id');
    }
    public function approveby_relation(){
        return $this->belongsTo('App\User','approve_id');
    }
    public function before_mct_setting_relation(){
        return $this->belongsTo('App\mct_setting','before_mct_setting_id');
    }
    public function before_clamp_eject_relation(){
        return $this->belongsTo('App\clamping_ejecting_setting','before_clamping_ejecting_id');
    }
    public function before_cylinder_temp_relation(){
        return $this->belongsTo('App\cylinder_temp','before_cylinder_temp_id');
    }
    public function before_inj_pack_setting_relation(){
        return $this->belongsTo('App\inj_pack_setting','before_inj_pack_setting_id');
    }
    public function before_measuring_condition_relation(){
        return $this->belongsTo('App\measuring_condition_setting','before_measuring_condition_id');
    }
    public function before_product_info_relation(){
        return $this->belongsTo('App\product_info','before_product_info_id');
    }


}
