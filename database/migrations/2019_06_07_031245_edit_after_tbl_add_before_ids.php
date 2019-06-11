<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditAfterTblAddBeforeIds extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('after_prod_tbl',function (Blueprint $table) {
            $table->integer('before_mct_setting_id')->nullable();
            $table->integer('before_cylinder_temp_id')->nullable();
            $table->integer('before_inj_pack_setting_id')->nullable();
            $table->integer('before_measuring_condition_id')->nullable();
            $table->integer('before_clamping_ejecting_id')->nullable();
            $table->integer('before_product_info_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
