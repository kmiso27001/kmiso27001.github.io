<?php
// 模擬危險配置 (通常是由 php.ini 的 expose_php = On 自動產生)
header("X-Powered-By: PHP/5.6.40");
// 模擬伺服器軟體版本洩漏
header("Server: Apache/2.4.6 (CentOS)");

// 取得當前的 headers 準備回傳 (為了在教學網頁前端顯示)
$headers = headers_list();

// 回傳 JSON
header('Content-Type: application/json');
echo json_encode([
    "status" => "success",
    "headers" => $headers
]);
?>
