<?php
session_start();
// ✨ 安全做法 A：使用傳統的 X-Frame-Options 標頭
header("X-Frame-Options: DENY");

// ✨ 安全做法 B：使用現代的 Content Security Policy 標頭
header("Content-Security-Policy: frame-ancestors 'none';");
?>
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <style>
        body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: rgba(77, 255, 184, 0.9); }
        .btn-delete { padding: 15px 30px; font-size: 1.2rem; background: #000; color: #4dffb8; border: 2px solid #4dffb8; cursor: pointer; border-radius: 8px; font-weight: bold; }
        .btn-delete:hover { background: #4dffb8; color: #000; }
    </style>
</head>
<body>
    <!-- 由於有設定安全標頭，瀏覽器會拒絕在 iframe 中載入此頁面 -->
    <!-- 所以這個按鈕根本不會出現在惡意網站上 -->
    <button class="btn-delete" onclick="alert('【安全】您點擊了正常的刪除帳號按鈕');">刪除帳號</button>
</body>
</html>
