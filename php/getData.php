<?php 

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
if ($contentType === "application/json") {
    $data = json_decode(file_get_contents('php://input'), true);
  if(! is_array($data)) {
    echo json_encode("fail");
  } else {
  	// var_dump($data);
    // $sid = $data['sid']; $token = $data['token']; $sicd1 = $data['sicd1']; $sod = $data['sod']; $siam1 = $data['siam1'];
    $itemName = $data['itemName'];
    // echo $itemName;
    // var_dump($itemName);
    // $paymentResponse = sendPayment($sid, $token, $sicd1, $sod, $siam1);
    $curlResponse = getData($itemName);
    print_r($curlResponse);
    // var_dump(json_decode($curlResponse, true));
    // $paymentResponse = explode('&', $paymentResponse);
    // // var_dump($paymentResponse);
    // for( $i = 0; $i < count( $paymentResponse ); $i++ )  
    // {  
    //     $payment_status = explode( '=', $paymentResponse[$i] );  
    //     if( $payment_status[0] == "rst" ) {break;}  
    // }  

    // if ( (int)$payment_status[1] == 1 ) {  
    //     /* 決済処理成功の場合はここに処理内容を記載 */  
    //     echo json_encode( 'success' );  
    // } else {  
    //     /* 決済処理失敗の場合はここに処理内容を記載 */  
    //     echo json_encode( 'fail' );  
    // }  

    // echo json_encode("fail");

  }
}



// function sendPayment($sid, $token, $sicd1, $sod, $siam1){
//     /* 接続URLの設定 */  
//     $url = 'https://gw.ccps.jp/memberpay.aspx?';  
//     $url = $url . 'sid=' . $sid . '&svid=1&ptype=1&job=CAPTURE&rt=2'; 
//     $url = $url . '&upcmemberid='. $token;  
//     $url = $url . '&sod='. $sod;   
//     // $url = $url . '&siam1='. $siam1;
//     $url = $url . '&sicd1=' . $sicd1;
//     // var_dump($url);
//     $curl = curl_init();
//     curl_setopt_array($curl, array(
//         CURLOPT_RETURNTRANSFER => 1,
//         CURLOPT_URL => $url
//     ));
//     $response = curl_exec($curl);
//     $info = curl_getinfo($curl);
//     curl_close($curl);
//     // var_dump($info);
//     return $response;
//     // echo json_encode($response);
// }

function getData($itemName){
	// echo $itemName;
	$itemName = urlencode($itemName);
	$url = 'https://www.romexchange.com/api?item=' . $itemName . '&exact=false&sort_server=sea&sort_range=week';
	// $curl = curl_init();
	// curl_setopt_array($curl, array(
	// 	// CURLOPT_RETURNTRANSFER => true,
	// 	CURLOPT_URL => $url
	// ));
	// $response = curl_exec($curl);
	// $info = curl_getinfo($curl);
	// curl_close($curl);
	$response = file_get_contents($url);
	// print_r(json_decode($response));
	// echo $response;
	return $response;
}

?>