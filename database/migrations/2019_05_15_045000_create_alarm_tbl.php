<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlarmTbl extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alarm_tbl', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('main_register_id')->nullable();
            $table->string('parameter_setting')->nullable();
            $table->integer('user_id');
            $table->integer('PIC');
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
        Schema::dropIfExists('alarm_tbl');
    }
}
