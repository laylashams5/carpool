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
    $type_id = $data['type_id']; 
    $points = $data['points'];
    $addtime = $today; 
 }
    $member_id = mysqli_real_escape_string($con,$member_id);
    $member_id = stripslashes($member_id);
    $type_id = mysqli_real_escape_string($con,$type_id);
    $type_id = stripslashes($type_id);
    $points = mysqli_real_escape_string($con,$points);
    $points = stripslashes($points);

    $q = mysqli_query($con, "INSERT INTO `points` ( `type_id`, `member_id` , `points` , `addtime` ) VALUES ('$type_id', '$member_id', '$points', '$addtime')");
    if($q){
    $error['error'] = false;
    $sql = mysqli_query($con,"SELECT * FROM points WHERE member_id = '$member_id'");
    $r = mysqli_fetch_array($sql,MYSQLI_ASSOC);
    $error['data'] = $r;
    }
    else{
    $error['error'] = true; 
    }
    echo json_encode($error); 
    
?>