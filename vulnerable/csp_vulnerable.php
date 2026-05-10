<?php
session_start();
// 缺乏安全性標頭的配置 (No CSP Header)
header("Content-Type: text/html; charset=utf-8");

// 接收來自 GET 的參數
$q = $_GET['q'] ?? '歡迎！';
?>
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Courier New', Courier, monospace; color: #eee; background: #1a1a1a; padding: 20px; border-radius: 8px; }
        .highlight { color: #ffb84d; font-weight: bold; background: rgba(255, 184, 77, 0.2); padding: 2px 5px; border-radius: 4px; }
    </style>
</head>
<body>
    <h2 style="color: #ff4b4b; margin-top: 0;">❌ 無 CSP 防護頁面</h2>
    <p style="color: #aaa; font-size: 0.9em; border-bottom: 1px solid #333; padding-bottom: 10px;">此頁面未設定 Content-Security-Policy 標頭，任何被注入的腳本都會被瀏覽器執行。</p>
    
    <p>您搜尋的字詞是: <span class="highlight"><?= $q ?></span></p> <!-- 此處存在反射型 XSS 漏洞 -->
    
    <script>
        console.log("【無防護頁面】內建腳本執行成功。");
    </script>
</body>
</html>
