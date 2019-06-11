<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReasonofChangeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('reason_of_change_tbl')->insert(
            array(
                array('reason_desc' => 'N.G. inside Ø'),
                array('reason_desc' => 'N.G. outside Ø'),
                array('reason_desc' => 'N.G. thickness'),
                array('reason_desc' => 'N.G. gear test'),
                array('reason_desc' => 'N.G. perpendicularity'),
                array('reason_desc' => 'N.G. symmetry'),
                array('reason_desc' => 'N.G. parallelism'),
                array('reason_desc' => 'N.G. run-out'),
                array('reason_desc' => 'N.G. flatness'),
                array('reason_desc' => 'N.G. Go-Nogo'),
                array('reason_desc' => 'N.G. height'),
                array('reason_desc' => 'N.G. Gap-of-end-shift'),
                array('reason_desc' => 'N.G. length'),
                array('reason_desc' => 'N.G. depth'),
                array('reason_desc' => 'N.G. appearance (bubbles/voids)'),
                array('reason_desc' => 'N.G. appearance (flashging/burr)'),
                array('reason_desc' => 'N.G. appearance (flowmark)'),
                array('reason_desc' => 'N.G. appearance (burn)'),
                array('reason_desc' => 'N.G. appearance (splay mark)'),
                array('reason_desc' => 'N.G. appearance (short shot)'),
                array('reason_desc' => 'N.G. appearance (foreign mat.)'),
                array('reason_desc' => 'N.G. appearance (stain)'),
                array('reason_desc' => 'N.G. appearance (dent)'),
                array('reason_desc' => 'N.G. appearance (scratch)'),
                array('reason_desc' => 'N.G. appearance (weldline)'),
                array('reason_desc' => 'N.G. appearance (sink mark)'),
                array('reason_desc' => 'N.G. appearance (silver streak)'),
                array('reason_desc' => 'N.G. appearance (deformed)')
            )
        );
    }
}
