<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
        <iframe id="my_iframe" style="display:none;"></iframe>
        <a href="{{asset('upload/CA02284-Y511_02.pdf')}}">link</a>
        <script>
        Download();
        function Download() {
            document.getElementById('my_iframe').src = 'file://10.164.20.211/PartsManufacturing_Guidance/Standard%20Packaging%20Arrangement/PMA%20-%20MOLD/CA02284-Y511_02.pdf';
        };
        </script>

</body>
</html>