<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MachineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('machine_tbl')->insert(
            array(
                array('machine_code' => '01','machine_ton' => '100T'),
                array('machine_code' => '02','machine_ton' => '50T'),
                array('machine_code' => '03','machine_ton' => '100T'),
                array('machine_code' => '04','machine_ton' => '50T'),
                array('machine_code' => '05','machine_ton' => '250T'),
                array('machine_code' => '06','machine_ton' => '100T'),
                array('machine_code' => '07','machine_ton' => '100T'),
                array('machine_code' => '08','machine_ton' => '100T')
            )
        );
    }
}
