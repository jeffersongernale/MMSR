<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInjPackSettingTbl extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inj_pack_setting_tbl', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('main_register_id')->unsigned();
            $table->foreign('main_register_id')->references('id')->on('main_register_tbl')->onDelete('cascade');
            $table->json('injection_step')->nullable();
            $table->string('max_inj_pressure')->nullable();
            $table->string('actual_pressure')->nullable();
            $table->string('max_inj_time')->nullable();
            $table->string('actual_time')->nullable();
            $table->string('max_pack_velo')->nullable();
            $table->string('pos_trans')->nullable();
            $table->json('pack_step')->nullable();
            $table->string('inj_step_mid')->nullable();
            $table->string('pack_step_mid')->nullable();
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
        Schema::dropIfExists('inj_pack_setting_tbl');
    }
}
