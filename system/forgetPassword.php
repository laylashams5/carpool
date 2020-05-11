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
    $email = $data['email']; 
    $password = $data['password']; 
    $password=md5($password);    
    $addtime = $today; 
 }
 $email = mysqli_real_escape_string($con,$email);
 $email = stripslashes($email);
 $password = mysqli_real_escape_string($con,$password);
 $password = stripslashes($password);

    $q = mysqli_query($con, "UPDATE `members` SET password='$password' Where  email = '$email'");
    if($q){
   // $to = $email;
   // $subject = "Your Recovered Password";
   // $message = "Please use this password to login ";
   // $headers = "From : hashsemi20@gmail.com";
   // mail($to, $subject, $message, $headers);
   $error['error'] = false;
   }
    else{
    $error['error'] = true; 
    }
    echo json_encode($error); 
    
?>