<?php
// 模擬安全配置 (Apache ServerTokens Prod 或 Nginx server_tokens off)
header("Server: Apache");

// 取得當前的 headers 準備回傳 (為了在教學網頁前端顯示)
$headers = headers_list();

// 回傳 JSON
header('Content-Type: application/json');
echo json_encode([
    "status" => "success",
    "headers" => $headers
]);
?>
