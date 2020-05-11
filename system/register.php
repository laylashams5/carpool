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
   $username = $data['username']; 
    $password = $data['password']; 
    $password=md5($password);
    $image = $data['image'];
    if($image)
		{

			$imagename = isset($data['imagename']) ? $data['imagename'] :null;

			
			$ext = $imagename ? pathinfo($imagename, PATHINFO_EXTENSION) : 'jpg';
			
			$uploadDirectory = 'images/';
			$filekey = md5(uniqid());
			$path = $uploadDirectory . DIRECTORY_SEPARATOR . $filekey . '.' . $ext;
	
			//get image content from image64 decoded (javascript)
	
			$image = base64_decode($image);
            file_put_contents($path, $image);
            if (is_file($path)) {
				$image= $path;
			}
		}
    $email = $data['email']; 
    $phone = $data['phone']; 
    $address = $data['address'];
    $carmodel = $data['carmodel'];
    $typeid = $data['typeid'];
    $addtime = $today; 
 }
    $username = mysqli_real_escape_string($con,$username);
    $username = stripslashes($username);
    $password = mysqli_real_escape_string($con,$password);
    $password = stripslashes($password);
    $image = mysqli_real_escape_string($con,$image);
    $image = stripslashes($image);
    $email = mysqli_real_escape_string($con,$email);
    $email = stripslashes($email);
    $phone = mysqli_real_escape_string($con,$phone);
    $phone = stripslashes($phone);
    $address = mysqli_real_escape_string($con,$address);
    $address = stripslashes($address);
    $carmodel = mysqli_real_escape_string($con,$carmodel);
    $carmodel = stripslashes($carmodel);
    $typeid = mysqli_real_escape_string($con,$typeid);
    $typeid = stripslashes($typeid);

  	$sql_u = "SELECT * FROM members WHERE username='$username'";
  	$sql_e = "SELECT * FROM members WHERE email='$email'";
  	$res_u = mysqli_query($con, $sql_u);
  	$res_e = mysqli_query($con, $sql_e);
  
  	if (mysqli_num_rows($res_u) > 0) {
      $error['error'] = "username already taken";
      echo json_encode($error);  	
  	}else if(mysqli_num_rows($res_e) > 0){
      $error['error'] = "email already taken"; 
      echo json_encode($error); 	
    }else{
    $q = mysqli_query($con, "INSERT INTO `members` ( `username` , `password` , `image`, `email` , `phone` , `address` , `carmodel`, `typeid`, `addtime` ) VALUES ('$username', '$password', '$image',  '$email', '$phone', '$address', '$carmodel', '$typeid','$addtime')");
    if($q){
    $error['error'] = false;
    $sql = mysqli_query($con,"SELECT * FROM members WHERE username = '$username' AND password = '$password'");
    $r = mysqli_fetch_array($sql,MYSQLI_ASSOC);
    $error['data'] = $r;
    }
    else{
    $error['error'] = true; 
    }
    echo json_encode($error); 
    }
?>