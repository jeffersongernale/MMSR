<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditMainRegisterTbl extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('main_register_tbl', function (Blueprint $table) {
           
            $table->string('record_type')->nullable()->after('user_id');
            $table->string('usage_status')->nullable();
            $table->integer('current_ctrl_id')->nullable();
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
        Schema::dropIfExists('main_register_tbl');
    }
}
