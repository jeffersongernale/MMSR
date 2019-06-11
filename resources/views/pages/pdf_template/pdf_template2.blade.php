<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="/MMSR/public/css/custom.css">

    <style>
    .tbl{
        border-collapse:collapse;
        text-align:center;
        font-size: 0.8em;
    }
    </style>
</head>
<body style="font-family:Arial, Helvetica, sans-serif;font-size: 0.8em">

@include('pages.pdf_template.record_info')
<br>
{{-- <table class="tbl" style="width: 100%" border="1">
    <tr>
        <td width="30%">
                @include('pages.pdf_template.mold_die_basic_info')

                @include('pages.pdf_template.mold_set_up_checksheet')
        </td>
        
        <td width="30%" valign="top">
            @include('pages.pdf_template.before_production.mct_setting')
            asda
        </td>
        <td width="30%">
                @include('pages.pdf_template.before_production.mct_setting')
        </td>
    </tr>

    <tr>
        <td>
                @include('pages.pdf_template.raw_mats')
                <br>
                @include('pages.pdf_template.production_data')
                <br>
                @include('pages.pdf_template.production_SPQ')
        </td>
    </tr>
</table> --}}
<table class="tbl" style="width: 100%" border="1">
        <tr>
            <td width="30" valign="top">
                    @include('pages.pdf_template.mold_die_basic_info')
                    <br>
                    @include('pages.pdf_template.production_SPQ')
            </td>
            
            <td width="60%" valign="top">
                @include('pages.pdf_template.before_production.mct_setting')
                <br>
                @include('pages.pdf_template.before_production.product_info')
                <br>
                @include('pages.pdf_template.before_production.clamp_eject')
                <br>
                @include('pages.pdf_template.before_production.cylinder_temp')
                <br>
                @include('pages.pdf_template.before_production.inj_pack')
                <br>
                @include('pages.pdf_template.before_production.measuring_condition')
            </td>
        </tr>
    </table>



<script>
// window.print();
</script>

</body>
</html>