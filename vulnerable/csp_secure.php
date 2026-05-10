<?php
session_start();

// 步驟 B：生成隨機 Nonce
if (empty($_SESSION['csp_nonce'])) {
    $_SESSION['csp_nonce'] = bin2hex(random_bytes(16));
}
$nonce = $_SESSION['csp_nonce'];

// 步驟 A：發送嚴謹的 CSP 策略標頭
// - default-src 'self': 預設僅允許同源資源
// - script-src 'self' 'nonce-...': 腳本僅允許同源或帶有正確 nonce 的 inline script
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-$nonce';");
header("Content-Type: text/html; charset=utf-8");

$q = $_GET['q'] ?? '歡迎！';
?>
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Courier New', Courier, monospace; color: #eee; background: #1a1a1a; padding: 20px; border-radius: 8px; }
        .highlight { color: #4dffb8; font-weight: bold; background: rgba(77, 255, 184, 0.2); padding: 2px 5px; border-radius: 4px; }
    </style>
</head>
<body>
    <h2 style="color: #4dffb8; margin-top: 0;">✅ 有 CSP 防護頁面</h2>
    <p style="color: #aaa; font-size: 0.9em; border-bottom: 1px solid #333; padding-bottom: 10px;">此頁面已設定嚴謹的 CSP 標頭。即使存在 XSS 漏洞，未授權的腳本也無法執行！</p>
    
    <p>您搜尋的字詞是: <span class="highlight"><?= $q ?></span></p> <!-- 漏洞依舊存在，但 CSP 會擋下腳本執行 -->
    
    <!-- 這是受信任的腳本，帶有伺服器核發的 Nonce -->
    <script nonce="<?= $nonce ?>">
        console.log("【安全頁面】此腳本帶有正確 Nonce (<?= $nonce ?>)，因此獲准執行。");
    </script>
</body>
</html>
