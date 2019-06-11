<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeasuringConditionSetting extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('measuring_condition_setting_tbl', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('main_register_id')->unsigned();
            $table->foreign('main_register_id')->references('id')->on('main_register_tbl')->onDelete('cascade');
            $table->string('extruder_on')->nullable();
            $table->json('extruder_json')->nullable();
            $table->string('m_cushion')->nullable();
            $table->string('shot_size')->nullable();
            $table->string('dcmp_dist')->nullable();
            $table->string('dcmp_vel')->nullable();
            $table->string('cool_time')->nullable();
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
        Schema::dropIfExists('measuring_condition_setting');
    }
}
