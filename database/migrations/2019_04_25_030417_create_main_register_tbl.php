<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMainRegisterTbl extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('main_register_tbl', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('machine_id')->unsigned();
            $table->integer('die_type_id')->unsigned();
            $table->foreign('machine_id')->references('id')->on('machine_tbl');
            $table->foreign('die_type_id')->references('id')->on('die_type_tbl');
            $table->string('ctrl_no')->nullable();
            $table->string('drawing_no')->nullable();
            $table->string('revision_no')->nullable();
            $table->string('drawing_name')->nullable();
            $table->string('color_no')->nullable();
            $table->string('matl_name')->nullable();
            $table->string('matl_grade')->nullable();
            $table->string('matl_color')->nullable();
            $table->string('resin_temp')->nullable();
            $table->string('drying_temp')->nullable();
            $table->string('drying_hrs')->nullable();
            $table->string('related_items')->nullable();
            $table->string('mold_no')->nullable();
            $table->string('no_cavity')->nullable();
            $table->string('no_good_cavity')->nullable();
            $table->string('mold_location')->nullable();
            $table->string('product_size')->nullable();
            $table->string('qty_per_bag')->nullable();
            $table->string('remarks')->nullable();
            $table->string('packaging_class')->nullable();
            $table->string('pcase_max_qty')->nullable();
            $table->integer('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('users');
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
        Schema::dropIfExists('main_register_tbl');
    }
}
