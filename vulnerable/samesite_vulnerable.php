<?php
// Vulnerable: no SameSite attribute
setcookie("shop_session_vuln", "user123_vuln", time() + 3600, "/");
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
    <h3 style="margin-top: 0;">購物網站後台 <span style="font-size: 0.8em; color: #888;">(無 SameSite 保護)</span></h3>
    <div class="box">
        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'delete') {
            echo "<div style='color: #ff4b4b; font-weight: bold;'>[警告] 收到刪除帳號請求！如果這是來自第三方的跨站 POST 請求，您的帳號已被刪除 (CSRF 攻擊成功)。</div>";
        } else {
            echo "<div>目前的 Session Cookie 已設置 (欠缺 SameSite)。</div>";
            echo "<div style='margin-top: 10px; color: #666;'>由於沒有設定 SameSite，舊版瀏覽器在跨站請求時仍會夾帶此 Cookie。</div>";
        }
        ?>
    </div>
</body>
</html>
