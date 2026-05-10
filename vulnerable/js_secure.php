<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <style>
        body { margin: 0; padding: 20px; font-family: monospace; background: #1a1a1a; color: #eee; border-radius: 8px; }
        .box { padding: 15px; border: 1px solid #4dffb8; background: rgba(77,255,184,0.1); border-radius: 8px; }
        .version { color: #4dffb8; font-weight: bold; font-size: 1.2em; }
    </style>
    <!-- ✨ 安全：引用了官方維護的 LTS 版本，且加入了 SRI (integrity) 驗證 -->
    <script 
        src="https://code.jquery.com/jquery-3.7.1.min.js" 
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" 
        crossorigin="anonymous">
    </script>
</head>
<body>
    <div class="box">
        <h3>系統狀態：運作中</h3>
        <p>目前載入的 jQuery 版本：<span class="version" id="jq-version">讀取中...</span></p>
        <p style="color: #aaa; font-size: 0.9em;">(新版 jQuery 已經修復了選擇器 XSS 漏洞)</p>
    </div>

    <script>
        $(document).ready(function() {
            $('#jq-version').text($.fn.jquery + " (✅ 安全)");
            
            if (location.hash) {
                try {
                    console.log("嘗試解析 hash: " + location.hash);
                    // 在 jQuery 3.x，除非字串嚴格以 '<' 開頭且是單純標籤，
                    // 否則不會隨意執行裡面的 HTML/JS。惡意 hash 將會被視為普通選擇器並拋出語法錯誤。
                    $(location.hash);
                } catch(e) {
                    console.error("jQuery 攔截或解析為選擇器失敗: ", e.message);
                }
            }
        });
        
        $(window).on('hashchange', function() {
            try {
                $(location.hash);
            } catch(e) {
                console.error("jQuery 攔截或解析為選擇器失敗: ", e.message);
            }
        });
    </script>
</body>
</html>
