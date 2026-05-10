<?php
// Secure: HttpOnly flag is true
setcookie("session_id_secure", "secure_token_" . rand(1000, 9999), time() + 3600, "/", "", false, true);
?>
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: monospace; background: #fff; padding: 20px; margin: 0; color: #333; }
        .comment-box { border: 1px solid #ccc; padding: 10px; border-radius: 5px; background: #f9f9f9; }
        .safe-text { color: #4dffb8; font-weight: bold; }
    </style>
</head>
<body>
    <h3 style="margin-top: 0;">使用者留言板 <span style="font-size: 0.8em; color: #888;">(HttpOnly 保護中)</span></h3>
    <div class="comment-box">
        <?php
        if (isset($_GET['comment'])) {
            // 這裡依然保留 XSS 漏洞，用來證明即使 XSS 發生，Cookie 也偷不走
            echo "<div><b>匿名訪客：</b> " . $_GET['comment'] . "</div>";
        } else {
            echo "<div>目前沒有留言。</div>";
        }
        ?>
    </div>
</body>
</html>
