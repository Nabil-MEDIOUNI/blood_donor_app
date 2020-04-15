<?php

header("Access-Control-Request-Method: *");
header("Access-Control-Request-Headers: *");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=utf-8");

include 'config.php';

$postjson =json_decode(file_get_contents('php://input'), true);
 
    // TODO: Create Account
if($postjson['aksi']=='add_register'){

        //Declare Variables
    $password = $postjson['password'];
    $username = $postjson['username'];
    $phone = $postjson['phone'];
    $email = $postjson['email'];
    $bloodType = $postjson['bloodType'];
    $passwordConfirmation = $postjson['passwordConfirmation'];
    $sex = $postjson['sex'];
    $village = $postjson['village'];
    $date = $postjson['date'];
    $myphoto = $postjson['myphoto'];
    
        //Variables check
    $username_check = preg_match('~^[A-Za-z0-9_]{3,20}$~i', $username);
    $phone_check = preg_match("/^([0-9]){3}[0-9]{3}-[0-9]{4}$/", $phone);
    $email_check = preg_match('~^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$~i', $email);
    $password_check = preg_match('~^[A-Za-z0-9!@#$%^&*()_]{6,20}$~i', $password);
    $phone_check = strlen($phone);    
    
    $result = [];

        // Get Variables from database
    $sql_u =  "SELECT * FROM users WHERE username = '$postjson[username]'";
    $res_u = mysqli_query($mysqli, $sql_u) or die(mysqli_error($mysqli));
    $sql_e =  "SELECT * FROM users WHERE email = '$postjson[email]'";
    $res_e = mysqli_query($mysqli, $sql_e) or die(mysqli_error($mysqli));
    $sql_i =  "SELECT * FROM users WHERE phone = '$postjson[phone]'";
    $res_i = mysqli_query($mysqli, $sql_i) or die(mysqli_error($mysqli));

    if($email_check == 0){
      $result = array('success'=>false, 'msg'=>'Email invalide !');
    }
    elseif($username_check == 0){
      $result = array('success'=>false, 'msg'=>"Nom d'utilisateur invalide !");
    }
    elseif(mysqli_num_rows($res_u) > 0){
        $result = array('success'=>false, 'msg'=>"Le nom d'utilisateur existe déjà !");
    }
    elseif(mysqli_num_rows($res_e) > 0){
        $result = array('success'=>false, 'msg'=>"L'email existe déjà !");
    }
    elseif(mysqli_num_rows($res_i) > 0 && mysqli_num_rows($res_e) > 0){
        $result = array('success'=>false, 'msg'=>"Numero de telephone existe déjà !");
    }
    elseif($phone_check < 8 || $phone_check > 8){
        $result = array('success'=>false, 'msg'=>'Numéro de téléphone invalide !');
    }
    else{
        $query = mysqli_query($mysqli, "INSERT INTO users SET 
        phone = '$phone',
        email = '$email',
        username = '$username',
        password = '$password',
        bloodType = '$bloodType',
        passwordConfirmation = '$passwordConfirmation',
        sex = '$sex',
        village = '$village',
        date = '$date',
        myphoto = '$myphoto'
        ");
        // $tab = ['msg'=>'here login'];
        // echo json_encode($query) ; die;
        if($query) $result = array('success'=>true);
        else $result = array('success'=>false, 'msg'=>'Error insert !');
        
    }

    echo json_encode($result);
}

    // TODO: Login 
else if($postjson['aksi']=='login'){
    
    $email = $postjson['email'];
    $password = $postjson['password'];
    $query = mysqli_query($mysqli, "SELECT * FROM users WHERE
    email = '$email' AND password = '$password'");
    $check = mysqli_num_rows($query);
    $email_check = preg_match('~^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{2,4})$~i', $email);
    
    if($check > 0){
        
        $data = mysqli_fetch_array($query);
        
            $datauser = array(
                'user_id' => $data['user_id'],
                'email' => $data['email'],
                'username' => $data['username'],
                'password' => $data['password'],
                'phone' => $data['phone'],
                'passwordConfirmation' => $data['passwordConfirmation'],
                'bloodType' => $data['bloodType'],
                'sex' => $data['sex'],
                'village' => $data['village'],
                'date' => $data['date'],
                'myphoto' => $data['myphoto']
            );
            
            $result = json_encode(array('success' => true,"datas"=>$datauser));  
        
    }
    else{
        $result = json_encode(array('success'=> false, 'msg'=>'Compte non enregistré !'));
    }

    echo $result;   
}

    // TODO: Login with facebook
else if($postjson['aksi']=='loginWithFb'){
    
    $email = $postjson['email'];
    $query = mysqli_query($mysqli, "SELECT * FROM users WHERE email = '$email'");
    $check = mysqli_num_rows($query);

    if($check > 0){
        
        $data = mysqli_fetch_array($query);
        
            $datauser = array(
                'user_id' => $data['user_id'],
                'email' => $data['email'],
                'username' => $data['username'],
                'password' => $data['password'],
                'phone' => $data['phone'],
                'passwordConfirmation' => $data['passwordConfirmation'],
                'bloodType' => $data['bloodType'],
                'sex' => $data['sex'],
                'village' => $data['village'],
                'date' => $data['date'],
                'myphoto' => $data['myphoto']
            );
            
            $result = json_encode(array('success' => true,"datas"=>$datauser));  
        
    }
    else{
        $result = json_encode(array('success'=> false, 'msg'=>'Compte non enregistré !'));
    }

    echo $result;   
}

    // TODO: Login with email if you forgot your password 
else if($postjson['aksi']=='loginWithEmail'){
    
    $email = $postjson['email'];

    $query = mysqli_query($mysqli, "SELECT * FROM users WHERE email = '$email'");
    $check = mysqli_num_rows($query);
    
    if($check > 0){
        
        $data = mysqli_fetch_array($query);
        $datauser = array(
                'user_id' => $data['user_id'],
                'email' => $data['email'],
                'username' => $data['username'],
                'password' => $data['password'],
                'passwordConfirmation' => $data['passwordConfirmation'],
                'bloodType' => $data['bloodType'],
                'sex' => $data['sex'],
                'village' => $data['village'],
                'date' => $data['date'],
                'myphoto' => $data['myphoto']
        );

        // $tab = ['ms'=>'here login'];
        // echo json_encode($tab) ; die;
        
        if($query) $result = json_encode(array('success' => true,"datas"=>$datauser));

    }else{
        $result = json_encode(array('success'=> false, 'msg'=>'Compte non enregistré !'));
    }

    echo $result;   
}

    // TODO: Update your profil 
elseif($postjson['aksi']=="profile"){
    
    $username = $postjson['username'];
    $email = $postjson['email'];
    $password = $postjson['password'];
    $user_id = $postjson['user_id'];
    $passwordConfirmation = $postjson['passwordConfirmation'];
    $bloodType = $postjson['bloodType'];
    $sex = $postjson['sex'];
    $village = $postjson['village'];
    $date = $postjson['date'];
    $myphoto = $postjson['myphoto'];

      $querys = mysqli_query($mysqli, "UPDATE users SET
      username = '$username',email = '$email',password = '$password',
      passwordConfirmation = '$passwordConfirmation',bloodType = '$bloodType',sex = '$sex',
      village = '$village',date = '$date',myphoto = '$myphoto'
      WHERE user_id = '$user_id'");
  
        if($querys) $result = json_encode(array('success' => true));
        else $result = json_encode(array('success'=> false)); 
  
      echo $result;
}

    // TODO: Create List
elseif($postjson['aksi']=="feed"){
    
        //Declare Variables
    
    $name = $postjson['name'];
    $phone = $postjson['phone'];
    $bloodType = $postjson['bloodType'];
    $village = $postjson['village'];
    $description = $postjson['description'];
    $date = $postjson['date'];
    $photo = $postjson['photo'];
    $user_id = $postjson['user_id'];
    $feed_id = $postjson['feed_id'];
    
    
    $result = [];
    
        // Get Variables from database
    $id =  "SELECT * FROM users WHERE user_id = '$postjson[user_id]'";
    $phoneCheck =  "SELECT * FROM users WHERE phone = '$postjson[phone]'";
    $sql_a =  "SELECT * FROM feed WHERE name = '$postjson[name]'";
    $res_a = mysqli_query($mysqli, $sql_a) or die(mysqli_error($mysqli));
    $sql_b =  "SELECT * FROM feed WHERE phone = '$postjson[phone]'";
    $res_b = mysqli_query($mysqli, $sql_b) or die(mysqli_error($mysqli));
    $sql_c =  "SELECT * FROM feed WHERE bloodType = '$postjson[bloodType]'";
    $res_c = mysqli_query($mysqli, $sql_c) or die(mysqli_error($mysqli));
    $sql_d =  "SELECT * FROM feed WHERE village = '$postjson[village]'";
    $res_d = mysqli_query($mysqli, $sql_d) or die(mysqli_error($mysqli));
    
    $phone_check = strlen($phone);
    
    if($phone_check < 8 || $phone_check > 8){
        $result = array('success'=>false, 'msg'=>'Numéro de téléphone invalide ! !');
    }
    elseif((mysqli_num_rows($res_a) > 0 && mysqli_num_rows($res_c) > 0 &&mysqli_num_rows($res_d) > 0)){
        $result = array('success'=>false, 'msg'=>"List existe déjà !");
    }
    else{
        $query = mysqli_query($mysqli, "INSERT INTO feed SET 
        feed_id = '$feed_id',
        phone = '$phone',
        name = '$name',
        bloodType = '$bloodType',
        village = '$village',
        description = '$description',
        photo = '$photo',
        date = '$date', 
        user_id = '$user_id'
        ");

        if($query) $result = array('success'=>true);
        else $result = array('success'=>false, 'msg'=>'Error insert !');
    }
    echo json_encode($result);
}

    // TODO: Feed delete
elseif($postjson['aksi']=='feed-delete'){    
        
    $feed_id = $postjson['feed_id'];
    $sql = mysqli_query($mysqli, "DELETE FROM feed WHERE feed_id = '$feed_id'");    
            
    if($sql) $result = json_encode(array('success' => true));  
                 
        echo $result;    
}

    // TODO: Feed details 
elseif($postjson['aksi']=='feed-details'){    
        
    $phone = $postjson['phone'];
    $user_id = $postjson['user_id'];
    $querys = mysqli_query($mysqli, "SELECT * FROM feed WHERE user_id = '$user_id'");
    $check = mysqli_num_rows($querys);     
        
        $data = mysqli_fetch_array($querys);
        // $tab = ['msg'=>'here login'];
        // echo json_encode($tab) ; die;
        $datauser = array(
            'feed_id' => $data['feed_id'],
            'user_id' => $data['user_id'],
            'name' => $data['name'],
            'description' => $data['description'],
            'bloodType' => $data['bloodType'],
            'village' => $data['village'],
            'phone' => $data['phone'],
            'photo' => $data['photo'],
            'date' => $data['date']
        );
                
    if($querys) $result = json_encode(array('success' => true,"datass"=>$datauser));
    else  $result = json_encode(array('success' => false)); 
                 
    echo $result;    
}

    // TODO: Update your feed
elseif($postjson['aksi']=="feed-update"){

    $name = $postjson['name'];
    $user_id = $postjson['user_id'];
    $bloodType = $postjson['bloodType'];
    $village = $postjson['village'];
    $description = $postjson['description'];
    $phone = $postjson['phone'];
    
    $query = mysqli_query($mysqli, "UPDATE feed SET
        name = '$name',bloodType = '$bloodType',
        village = '$village',myphoto = '$myphoto',
        description = '$description'
        WHERE user_id = '$user_id'");
      
        if($query) $result = json_encode(array('success' => true));
        else $result = json_encode(array('success'=> false)); 
            
        echo $result;
}