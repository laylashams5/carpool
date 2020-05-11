<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: content-type, Authorization, X-Requested-with');
header('Content-Type: application/json; charset=utf-8');
include "config.php"; 
$input = file_get_contents('php://input'); 
$data = json_decode($input, true); 
$today = date('Y-m-d h:m a');
$error = array(); 


 if(isset($input)) {
   $member_id = $data['member_id'];
   $status_id = $data['status_id'];
    $seats = $data['seats'];
    $carno = $data['carno'];
    $cityfrom = $data['cityfrom']; 
    $cityto = $data['cityto'];
    $arrivetime = $data['arrivetime'];
    $addtime = $today; 
 }
   $member_id = mysqli_real_escape_string($con,$member_id);
   $member_id = stripslashes($member_id);
    $seats = mysqli_real_escape_string($con,$seats);
    $seats = stripslashes($seats);
    $carno = mysqli_real_escape_string($con,$carno);
    $carno = stripslashes($carno);
    $cityfrom = mysqli_real_escape_string($con,$cityfrom);
    $cityfrom = stripslashes($cityfrom);
    $cityto = mysqli_real_escape_string($con,$cityto);
    $cityto = stripslashes($cityto);
    $arrivetime = mysqli_real_escape_string($con,$arrivetime);
    $arrivetime = stripslashes($arrivetime);

    $q = mysqli_query($con, "INSERT INTO `posted_trip` (`member_id`, `status_id`,  `seats` , `carno` , `cityfrom` , `cityto` , `arrivetime`, `addtime` ) VALUES ('$member_id', '$status_id', '$seats', '$carno', '$cityfrom', '$cityto', '$arrivetime', '$addtime')");
    if($q){
    $error['error'] = false;
    }
    else{
    $error['error'] = true; 
    }
    echo json_encode($error); 
    
?>