document.addEventListener('DOMContentLoaded', () => {
    // 1. 打字機特效 (Typewriter Effect)
    const text = "Hello, Antigravity 🚀";
    const element = document.getElementById("greeting");
    
    if (element) {
        let index = 0;
        
        // 建立一個會閃爍的游標
        element.innerHTML = '<span id="cursor" style="animation: blink 1s step-end infinite; border-right: 3px solid #333; padding-right: 5px;"></span>';
        const cursor = document.getElementById("cursor");
        
        function typeWriter() {
            if (index < text.length) {
                // 將字元插入游標之前
                cursor.insertAdjacentText('beforebegin', text.charAt(index));
                index++;
                setTimeout(typeWriter, 100); // 調整打字速度 (毫秒)
            }
        }
        
        // 延遲一點點再開始播放特效，效果更好
        setTimeout(typeWriter, 500);
    }

    // 2. 顯示日期與時間的功能 (24小時制，每秒更新)
    const dateElement = document.getElementById("date-display");
    if (dateElement) {
        function updateDateTime() {
            const now = new Date();
            const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
            // 使用 hour12: false 強制 24 小時制
            const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
            
            const dateStr = now.toLocaleDateString(undefined, dateOptions);
            const timeStr = now.toLocaleTimeString(undefined, timeOptions);
            
            dateElement.textContent = `${dateStr} | ${timeStr}`;
        }
        
        // 立即執行一次避免延遲空白，然後設定每秒(1000毫秒)更新
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }
});
