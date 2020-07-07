<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: content-type, Authorization, X-Requested-with');
    header('Content-Type: application/json; charset=utf-8');
    include "config.php"; 
   $q=mysqli_query($con, "SELECT * FROM trips ORDER BY id DESC"); 
   $data= [];
   while($row = mysqli_fetch_object($q)){

    $data[] = $row;
    }

    if($q){
        $result = '{"success":true}';    
        $result = $data;            
    }
    else {
        $result = "{'success':false}";
    }

    echo json_encode($result);
?>