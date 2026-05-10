<?php
// Secure: SameSite attribute set to Strict
$cookie_options = [
    'expires' => time() + 3600,
    'path' => '/',
    'samesite' => 'Strict'
];
// PHP 7.3+ 支援此陣列設定方式
setcookie("shop_session_secure", "user123_secure", $cookie_options);
?>
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: monospace; background: #fff; padding: 20px; margin: 0; color: #333; }
        .box { border: 1px solid #ccc; padding: 10px; border-radius: 5px; background: #f9f9f9; }
    </style>
</head>
<body>
    <h3 style="margin-top: 0;">購物網站後台 <span style="font-size: 0.8em; color: #888;">(SameSite=Strict 保護中)</span></h3>
    <div class="box">
        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'delete') {
            // 在真實環境中，如果是跨站請求，瀏覽器根本不會帶上 Cookie，此處我們用文字模擬說明
            echo "<div style='color: #4dffb8; font-weight: bold;'>[攔截] 收到跨站刪除帳號請求！但在真實環境中，由於 SameSite=Strict，瀏覽器拒絕在跨站請求中帶上您的 Cookie，因此攻擊無效。</div>";
        } else {
            echo "<div>目前的 Session Cookie 已設置 (SameSite=Strict)。</div>";
            echo "<div style='margin-top: 10px; color: #666;'>跨站 POST 請求將無法攜帶此 Cookie。</div>";
        }
        ?>
    </div>
</body>
</html>
