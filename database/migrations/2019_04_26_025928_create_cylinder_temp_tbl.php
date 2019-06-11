<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCylinderTempTbl extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cylinder_temp_tbl', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('main_register_id')->unsigned();
            $table->foreign('main_register_id')->references('id')->on('main_register_tbl')->onDelete('cascade');
            $table->string('nozzle')->nullable();
            $table->string('barrel1')->nullable();
            $table->string('barrel2')->nullable();
            $table->string('barrel3')->nullable();
            $table->string('feed_throat')->nullable();
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
        Schema::dropIfExists('cylinder_temp_tbl');
    }
}
