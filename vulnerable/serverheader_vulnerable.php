<?php
// 模擬危險配置 (Apache 預設 ServerTokens Full)
header("Server: Apache/2.2.15 (CentOS) DAV/2 PHP/5.4.16");

// 取得當前的 headers 準備回傳 (為了在教學網頁前端顯示)
$headers = headers_list();

// 回傳 JSON
header('Content-Type: application/json');
echo json_encode([
    "status" => "success",
    "headers" => $headers
]);
?>
