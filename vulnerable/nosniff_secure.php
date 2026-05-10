<?php
// 安全配置：強制加入 nosniff 標頭
header("X-Content-Type-Options: nosniff");
header("Content-Type: text/plain; charset=UTF-8");

// 這是駭客上傳的偽裝內容
echo "alert('這段腳本不會被執行，因為伺服器設定了 nosniff，且 MIME 類型不符 (text/plain)。');";
?>
