<?php
session_start();

// 若是 GET 請求，回傳 Token 供前端抓取（模擬前端渲染時取得 Token）
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    echo $_SESSION['csrf_token'];
    exit;
}

// 若是 POST 請求，執行轉帳並驗證 Token
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $_SESSION['user_id'] = 1; // 模擬已登入

    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        die("<div style='color: #ff4b4b; font-weight: bold;'>🛡️ CSRF 攻擊檢測：無效的請求來源。</div><div style='color: #bbb; margin-top: 5px;'>您的 Token 不符或遺失，已阻擋轉帳。</div>");
    }

    $to = $_POST['to'] ?? '';
    $amount = $_POST['amount'] ?? '';
    
    if ($to && $amount) {
        $output = "<div style='color: #4dffb8; font-weight: bold;'>✅ 轉帳成功！</div>";
        $output .= "<div style='color: #fff; margin-top: 5px;'>成功轉出 \$" . htmlspecialchars($amount) . " 給 <span style='color: #4dffb8'>" . htmlspecialchars($to) . "</span>。 <br><span style='color:#4dffb8; font-size:0.9em;'>(有 CSRF 防護)</span></div>";
        echo $output;
    } else {
        echo "<div style='color: #ffb84d;'>請填寫轉帳資訊。</div>";
    }
}
?>
