<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClampingEjectingTbl extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clamping_ejecting_tbl', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('main_register_id')->unsigned();
            $table->foreign('main_register_id')->references('id')->on('main_register_tbl')->onDelete('cascade');
            $table->string('open_limit_POS')->nullable();
            $table->string('open_limit_VEL')->nullable();
            $table->string('close_sw_POS')->nullable();
            $table->string('close_sw_VEL')->nullable();
            $table->string('close_slow_POS')->nullable();
            $table->string('close_slow_VEL')->nullable();
            $table->string('close_sp_POS')->nullable();
            $table->string('mold_prtct_POS')->nullable();
            $table->string('breakaway_VEL')->nullable();
            $table->string('open1_POS')->nullable();
            $table->string('open1_VEL')->nullable();
            $table->string('open2_POS')->nullable();
            $table->string('open2_VEL')->nullable();
            $table->string('full_open_POS')->nullable();
            $table->string('eject_start_POS')->nullable();
            $table->string('pulses')->nullable();
            $table->string('FWD_POS')->nullable();
            $table->string('FWD_VEL')->nullable();
            $table->string('FWD_DWELL')->nullable();
            $table->string('ADV_POS')->nullable();
            $table->string('ADV_VEL')->nullable();
            $table->string('ADV_DWELL')->nullable();
            $table->string('REV_POS')->nullable();
            $table->string('REV_VEL')->nullable();
            $table->string('REV_DWELL')->nullable();
            $table->string('ejector_delay')->nullable();
            $table->string('auto_die_height')->nullable();
            $table->string('adj_entry')->default('false');
            $table->string('usage_status')->default('false');
            $table->integer('reason_id')->nullable();
            $table->string('result')->nullable();
            $table->integer('user_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clamping_ejecting_tbl');
    }
}
