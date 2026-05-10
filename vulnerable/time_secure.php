<?php
// time_secure.php (Secure against Time-Based SQLi)
try {
    $pdo = new PDO("mysql:host=localhost;dbname=database;charset=utf8mb4", "db_user", "db_pass");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id = $_POST['id'] ?? '';

    // 步驟 A：編寫具備佔位符 (?) 的 SQL 模板
    $sql = "SELECT name FROM products WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    
    // 步驟 B：綁定參數並執行
    $stmt->execute([$id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $output = "";
    $output .= "<div style='margin-bottom: 15px;'><strong>🛡️ 預編譯的 SQL 模板：</strong> <br><code style='color: #4dffb8; display: block; margin-top: 5px;'>" . htmlspecialchars($sql) . "</code></div>";
    $output .= "<div style='margin-bottom: 15px;'><strong>📦 實際綁定的參數：</strong> <br><code style='color: #4dffb8; display: block; margin-top: 5px;'>['" . htmlspecialchars($id) . "']</code></div>";

    if ($row) {
        $output .= "<div style='color: #4dffb8; font-weight: bold;'>✅ 查詢成功！</div>";
        $output .= "<div style='color: #fff; margin-top: 5px;'>產品名稱：<span style='color: #4dffb8'>" . htmlspecialchars($row['name']) . "</span></div>";
    } else {
        $output .= "<div style='color: #fff; font-weight: bold;'>⚠️ 找不到該產品。</div>";
        $output .= "<div style='color: #fff; margin-top: 5px; font-size: 0.9em;'>即使輸入攻擊字串 (例如 SLEEP)，資料庫也只會將其視為一般字串（找尋 id 名為該字串的產品），因此不會觸發延遲。</div>";
    }
    
    echo $output;
} catch (PDOException $e) {
    echo "<div style='color: #ff4b4b; font-weight: bold;'>資料庫錯誤: </div><div style='color: #ff4b4b; margin-top: 5px;'>" . htmlspecialchars($e->getMessage()) . "</div>";
}
?>
