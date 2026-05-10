<?php
// 模擬危險配置：伺服器宣告為純文字，但缺少 nosniff 標頭
// 瀏覽器若偵測到內容為 JavaScript，可能會忽略 text/plain 並執行它
header("Content-Type: text/plain; charset=UTF-8");

// 這是駭客上傳的偽裝內容
echo "alert('🚨 警告：MIME 嗅探成功！\\n\\n瀏覽器無視了 text/plain 標頭，自作主張將此檔案作為 JavaScript 執行了！這就是 MIME 嗅探造成的 XSS 漏洞！');";
?>
