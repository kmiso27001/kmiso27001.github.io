<?php
// 模擬安全配置 (在 php.ini 中 expose_php = Off，或在代碼中手動移除)
// 確保沒有 X-Powered-By 標頭
header_remove('X-Powered-By');
// 模擬安全的 Server 標頭 (隱藏具體版本號與作業系統，僅顯示伺服器軟體名稱)
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
