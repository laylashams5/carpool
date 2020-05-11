<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: content-type, Authorization, X-Requested-with');
header('Content-Type: application/json; charset=utf-8');
include "config.php"; 
    $data = file_get_contents("php://input");
    $request = json_decode($data,true);
    $error = array(); 

    if (isset($data)) {
        $username = $request['username'];
        $password =  $request['password'];
        $password=md5($password);
    }
        $username = mysqli_real_escape_string($con,$username);
        $password = mysqli_real_escape_string($con,$password);
        $username = stripslashes($username);
        $password = stripslashes($password);
        $sql = "SELECT * FROM members WHERE username = '$username' AND password = '$password'";
        $result = mysqli_query($con,$sql);
        $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
        $count = mysqli_num_rows($result);
      if($count > 0) {
        $error['error'] = false;
        $error['data'] = $row;
      }else {
        $error['error'] = true;         
      }
      echo json_encode($error);
?>