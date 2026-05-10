<?php
// time_login.php (Vulnerable to Time-Based SQLi)
$conn = mysqli_connect("localhost", "db_user", "db_pass", "database");

if (!$conn) {
    die("<div style='color: #ff4b4b;'>資料庫連線失敗: " . mysqli_connect_error() . "</div>");
}

$id = $_POST['id'] ?? '';

// 危險：直接將變數拼接到 SQL 字串中
$query = "SELECT name FROM products WHERE id = $id";

// 執行有漏洞的查詢
$result = mysqli_query($conn, $query);

$output = "";
$output .= "<div style='margin-bottom: 15px;'><strong>🤖 實際執行的 SQL 語句：</strong> <br><code style='color: #ffb84d; display: block; margin-top: 5px;'>" . htmlspecialchars($query) . "</code></div>";

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $output .= "<div style='color: #4dffb8; font-weight: bold;'>✅ 查詢成功！</div>";
        $output .= "<div style='color: #fff; margin-top: 5px;'>產品名稱：<span style='color: #4dffb8'>" . htmlspecialchars($row['name']) . "</span></div>";
    } else {
        $output .= "<div style='color: #fff; font-weight: bold;'>⚠️ 找不到該產品。</div>";
    }
} else {
    // 在真實盲注環境中，通常不會顯示錯誤訊息。
    // 但為了教學目的，我們還是印出來讓學生知道發生什麼事。
    $output .= "<div style='color: #ff4b4b; font-weight: bold;'>💥 SQL 執行出錯（但通常在盲注環境中您看不到這段訊息）：</div>";
    $output .= "<div style='color: #ff4b4b; margin-top: 5px; font-family: monospace;'>" . htmlspecialchars(mysqli_error($conn)) . "</div>";
}

echo $output;
mysqli_close($conn);
?>
