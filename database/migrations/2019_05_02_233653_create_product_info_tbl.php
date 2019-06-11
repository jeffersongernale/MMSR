<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductInfoTbl extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_info_tbl', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('machine_cycle_time')->nullable();
            $table->json('product_weight')->nullable();
            $table->string('sprue_weight')->nullable();
            $table->string('sub_part_weight')->nullable();
            $table->string('additional_cycle_time')->nullable();
            $table->integer('main_register_id')->unsigned();
            $table->foreign('main_register_id')->references('id')->on('main_register_tbl')->onDelete('cascade');
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
        Schema::dropIfExists('product_info_tbl');
    }
}
