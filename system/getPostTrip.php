<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: content-type, Authorization, X-Requested-with');
    header('Content-Type: application/json; charset=utf-8');
    include "config.php"; 
   $query = "SELECT * FROM post_trip";
   $dbresult = $con->query($query);
    $data = [];
   while($row = $dbresult->fetch_array(MYSQLI_ASSOC)){

    $data[] = array(
        'id'=>$row['id'],
        'seats'=>$row['seats'],
        'carno' => $row['carno'],
        'cityfrom' => $row['cityfrom'],
        'cityto' => $row['cityto'],
        'arrivetime' => $row['arrivetime'],
    );
    }

    if($dbresult){
        $result = '{"success":true}';    
        $result = $data;            
    }
    else {
        $result = "{'success':false}";
    }

    echo json_encode($result);
?>