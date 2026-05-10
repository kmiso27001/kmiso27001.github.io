<?php
// 模擬安全的 403 畫面 (或透過放置 index.php 所產生的拒絕存取畫面)
header('HTTP/1.1 403 Forbidden');
header("Content-Type: text/html; charset=utf-8");
?>
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>403 Forbidden</title>
</head><body style="background: #fff; color: #000; font-family: times, serif; margin: 8px;">
<h1>Forbidden</h1>
<p>You don't have permission to access this resource.</p>
<hr>
<address>Apache/2.4.41 (Win64) OpenSSL/1.1.1c PHP/7.4.3 Server at localhost Port 80</address>
</body></html>
