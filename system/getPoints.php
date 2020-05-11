<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: content-type, Authorization, X-Requested-with');
    header('Content-Type: application/json; charset=utf-8');
    include "config.php"; 
   $q=mysqli_query($con, "SELECT * FROM `points`ORDER BY id DESC"); 
   $data=array(); 

   while($row = mysqli_fetch_object($q)){

    $data[] = $row;
    }

    if($q){
        $result = "{'error':false}";  
        $result = $data;  
    }
    else {
        $result = "{'error':true}";
    }

    echo json_encode($result);
?>