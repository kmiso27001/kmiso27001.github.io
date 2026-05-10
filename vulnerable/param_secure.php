<?php
session_start();
// 模擬後端資料庫
$mock_db = [
    '101' => ['name' => '高級電競筆電', 'price' => 50000],
    '102' => ['name' => '最新款 Smartphone', 'price' => 30000]
];

// ✨ 安全寫法：永遠不要信任用戶端的輸入
if (isset($_POST['item_id'])) {
    $item_id = $_POST['item_id'];
    $qty = (int)($_POST['qty'] ?? 1);
    
    // 從資料庫獲取真實價格，無視前端傳來的 $_POST['price']
    if (isset($mock_db[$item_id])) {
        $real_price = $mock_db[$item_id]['price'];
        $total = $real_price * $qty;
        
        $output = "<div style='color: #4dffb8; font-weight: bold;'>✅ 付款成功！</div>";
        $output .= "<div style='color: #fff; margin-top: 5px;'>已扣款總金額：<span style='color: #4dffb8; font-size: 1.2em;'>$" . htmlspecialchars($total) . "</span></div>";
        
        if (isset($_POST['price']) && $_POST['price'] != $real_price) {
            $output .= "<div style='color: #ffb84d; margin-top: 10px; font-size: 0.9em;'>🛡️ 安全機制攔截：偵測到嘗試修改價格為 {$_POST['price']}，已強制使用系統真實定價。</div>";
        }
        
        echo $output;
    } else {
        echo "<div style='color: #ff4b4b;'>商品不存在。</div>";
    }
} else {
    echo "<div style='color: #ffb84d;'>參數遺失。</div>";
}
?>
