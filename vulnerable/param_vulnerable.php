<?php
session_start();
// 模擬危險寫法：直接信任前端傳來的價格
if (isset($_POST['item_id']) && isset($_POST['price'])) {
    $item_id = $_POST['item_id'];
    $price = $_POST['price']; // 🚨 致命錯誤：直接使用前端傳來的價格
    $qty = $_POST['qty'] ?? 1;
    $total = $price * $qty;
    
    // 執行扣款邏輯
    $output = "<div style='color: #ff4b4b; font-weight: bold;'>🚨 付款成功！</div>";
    $output .= "<div style='color: #fff; margin-top: 5px;'>已扣款總金額：<span style='color: #ff4b4b; font-size: 1.2em;'>$" . htmlspecialchars($total) . "</span></div>";
    
    if ($price < 5000) {
        $output .= "<div style='color: #ffb84d; margin-top: 10px; font-size: 0.9em;'>⚠️ 系統警告：商品以異常低價被購買，公司產生財務損失！</div>";
    }
    
    echo $output;
} else {
    echo "<div style='color: #ffb84d;'>參數遺失。</div>";
}
?>
