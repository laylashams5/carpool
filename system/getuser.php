<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: content-type, Authorization, X-Requested-with');
    header('Content-Type: application/json; charset=utf-8');
    include "config.php"; 
   $query = "SELECT * FROM members WHERE typeid=2";
   $dbresult = $con->query($query);
    $data = [];
   while($row = $dbresult->fetch_array(MYSQLI_ASSOC)){

    $data[] = array(
        'id'=>$row['id'],
        'points'=>$row['points'],
        'username' => $row['username'],
        'image' => $row['image'],
        'email' => $row['email'],
        'phone' => $row['phone'],
        'address' => $row['address'],
        'carmodel' => $row['carmodel'],
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