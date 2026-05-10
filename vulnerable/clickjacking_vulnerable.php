<?php
session_start();
// 🚨 危險：缺乏 X-Frame-Options 或 CSP frame-ancestors 標頭
// 這使得網頁可以被任何第三方網站無條件嵌入 (iframe)
?>
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <style>
        body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: rgba(255, 75, 75, 0.9); }
        .btn-delete { padding: 15px 30px; font-size: 1.2rem; background: #000; color: #ff4b4b; border: 2px solid #ff4b4b; cursor: pointer; border-radius: 8px; font-weight: bold; }
        .btn-delete:hover { background: #ff4b4b; color: #fff; }
    </style>
</head>
<body>
    <!-- 這是真實目標網站的按鈕 -->
    <button class="btn-delete" onclick="alert('【🚨 嚴重警告】\n您剛剛點擊了銀行網站的「刪除帳號」按鈕！\n因為沒有防護，駭客成功利用了點擊劫持！');">刪除帳號</button>
</body>
</html>
