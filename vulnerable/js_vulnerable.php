<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <style>
        body { margin: 0; padding: 20px; font-family: monospace; background: #1a1a1a; color: #eee; border-radius: 8px; }
        .box { padding: 15px; border: 1px solid #ff4b4b; background: rgba(255,75,75,0.1); border-radius: 8px; }
        .version { color: #ff4b4b; font-weight: bold; font-size: 1.2em; }
    </style>
    <!-- 🚨 危險：引用了已知存在漏洞的老舊 jQuery 1.10.2 -->
    <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
</head>
<body>
    <div class="box">
        <h3>系統狀態：運作中</h3>
        <p>目前載入的 jQuery 版本：<span class="version" id="jq-version">讀取中...</span></p>
        <p style="color: #aaa; font-size: 0.9em;">(嘗試在網址列加入惡意 hash 來觸發漏洞)</p>
    </div>

    <script>
        $(document).ready(function() {
            $('#jq-version').text($.fn.jquery + " (⚠️ 極度危險)");
            
            // 模擬業務邏輯中常見的錯誤寫法
            // 老舊的 jQuery 在把字串丟進 $() 時，如果字串看起來像 HTML 標籤，
            // 就會直接解析並建立 DOM 元素，從而導致 XSS！
            if (location.hash) {
                try {
                    console.log("嘗試解析 hash: " + location.hash);
                    // 這行程式碼在 jQuery 1.x 會觸發 XSS
                    $(location.hash);
                } catch(e) {
                    console.error("解析失敗", e);
                }
            }
        });
        
        // 為了讓單頁應用在不重新整理的情況下也能觸發，我們監聽 hashchange
        $(window).on('hashchange', function() {
            try {
                $(location.hash);
            } catch(e) {}
        });
    </script>
</body>
</html>
