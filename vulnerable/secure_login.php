<?php
// secure_login.php (Secure Code)
try {
    $pdo = new PDO("mysql:host=localhost;dbname=database;charset=utf8mb4", "db_user", "db_pass");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    // 步驟 A：編寫具備佔位符 (?) 的 SQL 模板
    $sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    $stmt = $pdo->prepare($sql);
    
    // 步驟 B：綁定參數並執行（資料與指令分離）
    $stmt->execute([$username, $password]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $output = "";
    $output .= "<div style='margin-bottom: 15px;'><strong>🛡️ 預編譯的 SQL 模板：</strong> <br><code style='color: #4dffb8; display: block; margin-top: 5px;'>" . htmlspecialchars($sql) . "</code></div>";
    $output .= "<div style='margin-bottom: 15px;'><strong>📦 實際綁定的參數：</strong> <br><code style='color: #4dffb8; display: block; margin-top: 5px;'>['" . htmlspecialchars($username) . "', '" . htmlspecialchars($password) . "']</code></div>";

    if ($user) {
        $output .= "<div style='color: #4dffb8; font-weight: bold;'>🔓 登入成功！</div>";
        $output .= "<div style='color: #fff; margin-top: 5px;'>歡迎回來，<span style='color: #4dffb8'>" . htmlspecialchars($user['username']) . "</span> (權限: " . htmlspecialchars($user['role']) . ")</div>";
    } else {
        $output .= "<div style='color: #ff4b4b; font-weight: bold;'>❌ 登入失敗：帳號或密碼錯誤。</div>";
        $output .= "<div style='color: #fff; margin-top: 5px; font-size: 0.9em;'>即使輸入攻擊字串，資料庫也只會將其視為一般字串處理，因此不會觸發邏輯篡改。</div>";
    }
    
    echo $output;
} catch (PDOException $e) {
    echo "<div style='color: #ff4b4b; font-weight: bold;'>資料庫錯誤: </div><div style='color: #ff4b4b; margin-top: 5px;'>" . htmlspecialchars($e->getMessage()) . "</div>";
}
?>
