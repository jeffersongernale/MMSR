<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DieTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('die_type_tbl')->insert(
            array(
                array('die_type' => 'SINGLE DIE'),
                array('die_type' => 'FAMILY DIE'),
                array('die_type' => 'ROUND CASSETTE'),
                array('die_type' => 'SQUARE CASSETTE'),
                array('die_type' => 'COMMON DIE'),
                array('die_type' => 'FAMILY DIE-SC')
            )
        );
    }
}
