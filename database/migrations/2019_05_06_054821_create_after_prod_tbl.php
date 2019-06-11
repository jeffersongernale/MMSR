<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAfterProdTbl extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('after_prod_tbl', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('main_register_id')->unsigned();
            $table->foreign('main_register_id')->references('id')->on('main_register_tbl')->onDelete('cascade');
            $table->string('dryer_no')->nullable();
            $table->string('time_in')->nullable();
            $table->string('time_use')->nullable();
            $table->string('date_prepared')->nullable();
            $table->string('material_lot_no')->nullable();
            $table->string('actual_matl_use')->nullable();
            $table->string('actual_time_matl_use')->nullable();
            $table->string('material_code')->nullable();
            $table->string('total_production')->nullable();
            $table->string('date_process_start')->nullable();
            $table->string('date_process_finish')->nullable();
            $table->string('lot_number')->nullable();
            $table->string('checked_by')->nullable();
            $table->string('date_checked')->nullable();
            $table->string('work_finish_qty')->nullable();
            $table->integer('mct_setting_id')->nullable();
            $table->integer('cylinder_temp_id')->nullable();
            $table->integer('inj_pack_setting_id')->nullable();
            $table->integer('measuring_condition_id')->nullable();
            $table->integer('clamping_ejecting_id')->nullable();
            $table->integer('product_info_id')->nullable();
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
        Schema::dropIfExists('after_prod_tbl');
    }
}
