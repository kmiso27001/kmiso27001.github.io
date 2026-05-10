<?php
session_start();
// 模擬已登入狀態
$_SESSION['user_id'] = 1;

// 接收來自 POST 的參數
$to = $_POST['to'] ?? '';
$amount = $_POST['amount'] ?? '';

// 僅驗證 Session，未驗證請求來源的唯一性
if (isset($_SESSION['user_id'])) {
    if ($to && $amount) {
        // 執行轉帳邏輯（此處極易受 CSRF 攻擊）
        $output = "<div style='color: #ff4b4b; font-weight: bold;'>🚨 警告：發生轉帳！</div>";
        $output .= "<div style='color: #fff; margin-top: 5px;'>成功轉出 \$" . htmlspecialchars($amount) . " 給 <span style='color: #ff4b4b'>" . htmlspecialchars($to) . "</span>。 <br><span style='color:#ffb84d; font-size:0.9em;'>(無 CSRF 防護)</span></div>";
        echo $output;
    } else {
        echo "<div style='color: #ffb84d;'>請填寫轉帳資訊。</div>";
    }
} else {
    echo "<div style='color: #ff4b4b;'>尚未登入。</div>";
}
?>
