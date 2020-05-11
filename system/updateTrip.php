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
    $id = $data['id']; 
    $status_id = $data['status_id']; 
    $qrcode = $data['qrcode']; 
    $addtime = $today; 
 }
 $id = mysqli_real_escape_string($con,$id);
 $id = stripslashes($id);
 $status_id = mysqli_real_escape_string($con,$status_id);
 $status_id = stripslashes($status_id);
 $qrcode = mysqli_real_escape_string($con,$qrcode);
 $qrcode = stripslashes($qrcode);

    $q = mysqli_query($con, "UPDATE `trips` SET status_id='$status_id', qrcode='$qrcode' Where id = '$id'");
    if($q){
   $error['error'] = false;
   }
    else{
    $error['error'] = true; 
    }
    echo json_encode($error); 
    
?>