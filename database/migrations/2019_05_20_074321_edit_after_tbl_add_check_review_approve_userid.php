<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditAfterTblAddCheckReviewApproveUserid extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('after_prod_tbl', function (Blueprint $table) {
            $table->integer('user_id')->nullable();
            $table->integer('checker_id')->nullable();
            $table->integer('review_id')->nullable();
            $table->integer('approve_id')->nullable();
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
    }
}
