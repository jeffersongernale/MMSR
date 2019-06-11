<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlarmLogsTbl extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alarm_logs_tbl', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('main_register_id');
            $table->string('parameter_setting');
            $table->integer('user_id');
            $table->integer('PIC')->nullable();
            $table->string('status')->default('ISSUE');
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
        Schema::dropIfExists('alarm_logs_tbl');
    }
}
