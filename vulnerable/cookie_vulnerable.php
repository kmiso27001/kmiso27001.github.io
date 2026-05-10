<?php
// Vulnerable: no HttpOnly flag
setcookie("session_id_vuln", "vuln_token_" . rand(1000, 9999), time() + 3600, "/");
?>
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: monospace; background: #fff; padding: 20px; margin: 0; color: #333; }
        .comment-box { border: 1px solid #ccc; padding: 10px; border-radius: 5px; background: #f9f9f9; }
        .danger-text { color: #ff4b4b; font-weight: bold; }
    </style>
</head>
<body>
    <h3 style="margin-top: 0;">使用者留言板 <span style="font-size: 0.8em; color: #888;">(無 HttpOnly 保護)</span></h3>
    <div class="comment-box">
        <?php
        if (isset($_GET['comment'])) {
            // 反射型 XSS 漏洞：未過濾使用者輸入直接輸出
            echo "<div><b>匿名訪客：</b> " . $_GET['comment'] . "</div>";
        } else {
            echo "<div>目前沒有留言。</div>";
        }
        ?>
    </div>
</body>
</html>
