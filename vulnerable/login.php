<?php
// login.php (Vulnerable Code)
$conn = mysqli_connect("localhost", "db_user", "db_pass", "database");

if (!$conn) {
    die("<div style='color: #ff4b4b;'>資料庫連線失敗: " . mysqli_connect_error() . "</div>");
}

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// 危險：直接將變數拼接到 SQL 字串中
$query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";

// 執行有漏洞的查詢
$result = mysqli_query($conn, $query);

$output = "";
$output .= "<div style='margin-bottom: 15px;'><strong>🤖 實際執行的 SQL 語句：</strong> <br><code style='color: #ffb84d; display: block; margin-top: 5px;'>" . htmlspecialchars($query) . "</code></div>";

if ($result) {
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $output .= "<div style='color: #4dffb8; font-weight: bold;'>🔓 登入成功！</div>";
        $output .= "<div style='color: #fff; margin-top: 5px;'>歡迎回來，<span style='color: #4dffb8'>" . htmlspecialchars($row['username']) . "</span> (權限: " . htmlspecialchars($row['role']) . ")</div>";
    } else {
        $output .= "<div style='color: #ff4b4b; font-weight: bold;'>❌ 登入失敗：帳號或密碼錯誤。</div>";
    }
} else {
    // 顯示資料庫語法錯誤 (方便學生學習 SQL Injection 測試時看到報錯)
    $output .= "<div style='color: #ff4b4b; font-weight: bold;'>💥 SQL 語法錯誤：</div>";
    $output .= "<div style='color: #ff4b4b; margin-top: 5px; font-family: monospace;'>" . htmlspecialchars(mysqli_error($conn)) . "</div>";
}

echo $output;
mysqli_close($conn);
?>
