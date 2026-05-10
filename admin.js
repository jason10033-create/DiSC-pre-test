document.addEventListener('DOMContentLoaded', () => {
    // 主題切換邏輯
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    function updateThemeIcon() {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            themeIcon.innerText = '☀️';
        } else {
            themeIcon.innerText = '🌙';
        }
    }
    
    if(themeToggleBtn) {
        updateThemeIcon();
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('moxadisc_theme', newTheme);
            updateThemeIcon();
            
            if(resultChart) {
                const textColor = newTheme === 'dark' ? '#f8fafc' : '#1e293b';
                const gridColor = newTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                
                if (resultChart.options.scales.x) {
                    resultChart.options.scales.x.ticks.color = textColor;
                    resultChart.options.scales.x.grid.color = gridColor;
                }
                if (resultChart.options.scales.y) {
                    resultChart.options.scales.y.ticks.color = textColor;
                    resultChart.options.scales.y.grid.color = gridColor;
                }
                if (resultChart.options.plugins.title) {
                    resultChart.options.plugins.title.color = textColor;
                }
                if (resultChart.options.plugins.legend) {
                    resultChart.options.plugins.legend.labels.color = textColor;
                }
                resultChart.update();
            }
        });
    }
    
    // --- 登入邏輯 ---
    const loginBtn = document.getElementById('login-btn');
    const pwdInput = document.getElementById('admin-pwd');
    const loginScreen = document.getElementById('admin-login-screen');
    const dashboard = document.getElementById('admin-dashboard');

    loginBtn.addEventListener('click', () => {
        if(pwdInput.value === 'moxadisc') {
            loginScreen.style.display = 'none';
            dashboard.style.display = 'block';
            initDashboard();
        } else {
            alert('密碼錯誤！');
        }
    });

    pwdInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') loginBtn.click();
    });

    // --- Tab 切換邏輯 ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(btn.getAttribute('data-target')).classList.add('active');
        });
    });

    // --- 儀表板初始化 ---
    function initDashboard() {
        loadSettings();
        loadContentEditor();
        loadData();
    }

    // --- 基本設定邏輯 ---
    function loadSettings() {
        const defaultSettings = {
            title: "-DiSC人際風格課前測評-",
            instructions: [
                "請以最「自然」的直覺反應作答，沒有對錯。",
                "請排除目前工作上的壓力或期望，以平常心的狀態填寫。",
                "測評約需 5 分鐘，請在不受打擾的環境下完成。"
            ],
            randomizeOptions: true,
            showDetailedResults: true
        };
        const settings = JSON.parse(localStorage.getItem('moxadisc_settings')) || defaultSettings;
        
        document.getElementById('setting-randomize').checked = settings.randomizeOptions;
        document.getElementById('setting-show-chart').checked = settings.showDetailedResults;
        
        const data = JSON.parse(localStorage.getItem('disc_responses')) || [];
        document.getElementById('stat-total-users').innerText = data.length;
    }

    document.getElementById('save-settings-btn').addEventListener('click', () => {
        let settings = JSON.parse(localStorage.getItem('moxadisc_settings')) || {};
        settings.randomizeOptions = document.getElementById('setting-randomize').checked;
        settings.showDetailedResults = document.getElementById('setting-show-chart').checked;
        localStorage.setItem('moxadisc_settings', JSON.stringify(settings));
        alert('設定已儲存！請重新整理前台以套用變更。');
    });

    // --- 內容編輯邏輯 ---
    function loadContentEditor() {
        // 首頁內容載入
        const settings = JSON.parse(localStorage.getItem('moxadisc_settings')) || {
            title: "-DiSC人際風格課前測評-",
            instructions: ["請以最「自然」的直覺反應作答，沒有對錯。", "請排除目前工作上的壓力或期望，以平常心的狀態填寫。", "測評約需 5 分鐘，請在不受打擾的環境下完成。"]
        };
        document.getElementById('edit-title').value = settings.title || '';
        document.getElementById('edit-inst-1').value = settings.instructions[0] || '';
        document.getElementById('edit-inst-2').value = settings.instructions[1] || '';
        document.getElementById('edit-inst-3').value = settings.instructions[2] || '';

        // 題目內容載入
        const defaultQuestions = [
            { text: "1. 你覺得自己是一位？", options: [{ text: "積極、有行動力的人", type: "D" }, { text: "開朗、活潑健談的人", type: "I" }, { text: "隨和、容易相處的人", type: "S" }, { text: "認真、專注細節的人", type: "C" }] },
            { text: "2. 以下哪一個可能是別人稱讚你的優點？", options: [{ text: "果斷", type: "D" }, { text: "樂觀", type: "I" }, { text: "體貼", type: "S" }, { text: "謹慎", type: "C" }] },
            { text: "3. 以下哪一個可能是你的小缺點？", options: [{ text: "沒耐性", type: "D" }, { text: "粗心", type: "I" }, { text: "沒主見", type: "S" }, { text: "冷淡", type: "C" }] },
            { text: "4. 在工作環境中，你最重視？", options: [{ text: "效率和結果", type: "D" }, { text: "團隊合作和人際關係", type: "I" }, { text: "穩定性與成員和諧", type: "S" }, { text: "準確性和品質", type: "C" }] },
            { text: "5. 和他人一起完成一件事情時，你優先在意的是？", options: [{ text: "是否有達到目標", type: "D" }, { text: "與成員的互動是否有趣愉快", type: "I" }, { text: "成員間的關係是否融洽", type: "S" }, { text: "流程與方法是否合理", type: "C" }] },
            { text: "6. 與他人一起執行任務時，甚麼情況容易讓你擔心？", options: [{ text: "失去掌控，無能為力", type: "D" }, { text: "被人排擠，不受肯定", type: "I" }, { text: "變動過度，無所適從", type: "S" }, { text: "標準不一，制度不清", type: "C" }] },
            { text: "7. 在一個團隊會議中，你比較常會？", options: [{ text: "主動提出解決方案並推動執行", type: "D" }, { text: "積極加入討論並鼓勵他人發言", type: "I" }, { text: "仔細聆聽並支持團隊決議", type: "S" }, { text: "認真分析各種方案的優缺點", type: "C" }] },
            { text: "8. 你個人的溝通風格比較像是：", options: [{ text: "直接、簡潔、重點明確", type: "D" }, { text: "熱情、生動、富有表現力", type: "I" }, { text: "溫和、耐心、善於傾聽", type: "S" }, { text: "精確、詳細、邏輯清晰", type: "C" }] },
            { text: "9. 別人與你溝通時，你比較期待？", options: [{ text: "直接切入主題，不拐彎抹角", type: "D" }, { text: "輕鬆愉快，不要太嚴肅", type: "I" }, { text: "不要一次講太多細節", type: "S" }, { text: "條列式說明，清楚解釋原因", type: "C" }] },
            { text: "10. 當需要說服他人時，你傾向於？", options: [{ text: "直接說明利益和必要性", type: "D" }, { text: "描繪成功景象影響他人", type: "I" }, { text: "耐心解釋並尋求共識", type: "S" }, { text: "提供詳細的事實和數據", type: "C" }] },
            { text: "11. 面對新的挑戰時，你的第一反應是？", options: [{ text: "立即採取行動解決問題", type: "D" }, { text: "找他人討論並尋求支持", type: "I" }, { text: "謹慎評估風險後再行動", type: "S" }, { text: "蒐集資料並制定詳細計畫", type: "C" }] },
            { text: "12. 面對衝突時，你通常會？", options: [{ text: "直接面對，快速解決", type: "D" }, { text: "嘗試緩解氣氛，尋求妥協", type: "I" }, { text: "避免當面衝突，私下溝通", type: "S" }, { text: "客觀分析衝突的問題", type: "C" }] },
            { text: "13. 面對變化時，你的態度是？", options: [{ text: "迅速調整以回應變化", type: "D" }, { text: "對新鮮感感到興奮", type: "I" }, { text: "需要時間適應變化", type: "S" }, { text: "希望瞭解變化的原因", type: "C" }] },
            { text: "14. 需要做決定時，你比較偏向？", options: [{ text: "能更有效率得到結果的方法", type: "D" }, { text: "跟他人討論過的方法", type: "I" }, { text: "多一點時間考慮或詢問經驗", type: "S" }, { text: "需要詳細資料做為依據", type: "C" }] },
            { text: "15. 在壓力下工作時，你會？", options: [{ text: "更加專注於目標達成", type: "D" }, { text: "尋求他人的協助和支持", type: "I" }, { text: "保持冷靜並按部按部就班", type: "S" }, { text: "更仔細地檢查每個細節", type: "C" }] }
        ];

        const questions = JSON.parse(localStorage.getItem('moxadisc_questions')) || defaultQuestions;
        const qContainer = document.getElementById('questions-editor-container');
        qContainer.innerHTML = '';

        questions.forEach((q, qIndex) => {
            const qDiv = document.createElement('div');
            qDiv.className = 'question-edit-block';
            
            let html = `
                <div class="form-group" style="margin-bottom: 10px;">
                    <label style="font-weight:600; color:var(--primary-color);">第 ${qIndex + 1} 題 題目：</label>
                    <input type="text" class="edit-q-text" data-qindex="${qIndex}" value="${q.text}">
                </div>
                <div class="options-edit-grid">
            `;
            
            q.options.forEach((opt, oIndex) => {
                html += `
                    <div class="option-edit-item">
                        <input type="text" class="edit-o-text" data-qindex="${qIndex}" data-oindex="${oIndex}" value="${opt.text}" placeholder="選項內容">
                        <select class="edit-o-type" data-qindex="${qIndex}" data-oindex="${oIndex}">
                            <option value="D" ${opt.type==='D'?'selected':''}>D</option>
                            <option value="I" ${opt.type==='I'?'selected':''}>I</option>
                            <option value="S" ${opt.type==='S'?'selected':''}>S</option>
                            <option value="C" ${opt.type==='C'?'selected':''}>C</option>
                        </select>
                    </div>
                `;
            });
            html += `</div>`;
            qDiv.innerHTML = html;
            qContainer.appendChild(qDiv);
        });
    }

    document.getElementById('save-content-btn').addEventListener('click', () => {
        // 儲存首頁內容
        let settings = JSON.parse(localStorage.getItem('moxadisc_settings')) || {};
        settings.title = document.getElementById('edit-title').value;
        settings.instructions = [
            document.getElementById('edit-inst-1').value,
            document.getElementById('edit-inst-2').value,
            document.getElementById('edit-inst-3').value
        ];
        localStorage.setItem('moxadisc_settings', JSON.stringify(settings));

        // 儲存題目修改
        const questionsCount = document.querySelectorAll('.question-edit-block').length;
        let newQuestions = [];

        for(let i=0; i<questionsCount; i++) {
            const qText = document.querySelector(`.edit-q-text[data-qindex="${i}"]`).value;
            let options = [];
            for(let j=0; j<4; j++) {
                const oText = document.querySelector(`.edit-o-text[data-qindex="${i}"][data-oindex="${j}"]`).value;
                const oType = document.querySelector(`.edit-o-type[data-qindex="${i}"][data-oindex="${j}"]`).value;
                options.push({ text: oText, type: oType });
            }
            newQuestions.push({ text: qText, options: options });
        }
        
        localStorage.setItem('moxadisc_questions', JSON.stringify(newQuestions));
        alert('內容與題目已儲存！請重新整理前台以套用變更。');
    });

    // --- 測評結果邏輯 ---
    let resultChart = null;

    function loadData() {
        const tbody = document.getElementById('responses-body');
        const emptyState = document.getElementById('empty-state');
        const tableResponsive = document.querySelector('.table-responsive');
        const chartContainer = document.getElementById('chart-container');
        
        const data = JSON.parse(localStorage.getItem('disc_responses')) || [];
        
        tbody.innerHTML = '';
        
        if (data.length === 0) {
            emptyState.style.display = 'block';
            tableResponsive.style.display = 'none';
            if (chartContainer) chartContainer.style.display = 'none';
            document.getElementById('stat-total-users').innerText = 0;
            return;
        }
        
        emptyState.style.display = 'none';
        tableResponsive.style.display = 'block';
        if (chartContainer) chartContainer.style.display = 'block';
        document.getElementById('stat-total-users').innerText = data.length;

        let totalD = 0, totalI = 0, totalS = 0, totalC = 0;

        // 反向排序顯示最新的在上面
        [...data].reverse().forEach(record => {
            totalD += parseInt(record.scores.D || 0);
            totalI += parseInt(record.scores.I || 0);
            totalS += parseInt(record.scores.S || 0);
            totalC += parseInt(record.scores.C || 0);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${record.date}</td>
                <td><strong>${record.name}</strong></td>
                <td>${record.scores.D}</td>
                <td>${record.scores.I}</td>
                <td>${record.scores.S}</td>
                <td>${record.scores.C}</td>
                <td><strong style="color:var(--primary-color);">${record.mainType} 型</strong></td>
                <td style="text-align: center;">
                    <button class="btn danger-btn small delete-record-btn" data-id="${record.id}">刪除</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // 繪製平均分數長條圖
        drawChart(totalD / data.length, totalI / data.length, totalS / data.length, totalC / data.length);

        // 綁定個別刪除按鈕
        document.querySelectorAll('.delete-record-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const recordId = e.target.getAttribute('data-id');
                if (confirm('確定要刪除這筆紀錄嗎？')) {
                    deleteRecord(recordId);
                }
            });
        });
    }

    function drawChart(avgD, avgI, avgS, avgC) {
        const ctx = document.getElementById('averageScoresChart');
        if (!ctx) return;
        
        if (resultChart) {
            resultChart.destroy();
        }
        
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? '#f8fafc' : '#1e293b';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

        resultChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['D (支配型)', 'i (影響型)', 'S (穩健型)', 'C (分析型)'],
                datasets: [{
                    label: '全體平均分數',
                    data: [avgD.toFixed(1), avgI.toFixed(1), avgS.toFixed(1), avgC.toFixed(1)],
                    backgroundColor: [
                        'rgba(239, 68, 68, 0.7)',
                        'rgba(234, 179, 8, 0.7)',
                        'rgba(34, 197, 94, 0.7)',
                        'rgba(59, 130, 246, 0.7)'
                    ],
                    borderColor: [
                        'rgb(239, 68, 68)',
                        'rgb(234, 179, 8)',
                        'rgb(34, 197, 94)',
                        'rgb(59, 130, 246)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        ticks: { color: textColor },
                        grid: { color: gridColor }
                    },
                    y: {
                        beginAtZero: true,
                        max: 15,
                        ticks: { color: textColor },
                        grid: { color: gridColor }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: textColor }
                    },
                    title: {
                        display: true,
                        text: '所有受測者平均風格分數落差',
                        font: { size: 16 },
                        color: textColor
                    }
                }
            }
        });
    }

    function deleteRecord(id) {
        let data = JSON.parse(localStorage.getItem('disc_responses')) || [];
        data = data.filter(r => r.id !== id);
        localStorage.setItem('disc_responses', JSON.stringify(data));
        loadData();
    }

    document.getElementById('clear-btn').addEventListener('click', () => {
        if (confirm('確定要清除所有測評紀錄嗎？此動作無法復原。')) {
            localStorage.removeItem('disc_responses');
            loadData();
        }
    });

    document.getElementById('export-btn').addEventListener('click', () => {
        const data = JSON.parse(localStorage.getItem('disc_responses')) || [];
        if (data.length === 0) {
            alert('沒有資料可匯出！');
            return;
        }

        let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
        csvContent += "測驗時間,姓名,D分數,i分數,S分數,C分數,判定結果\n";

        data.forEach(row => {
            csvContent += `${row.date},${row.name},${row.scores.D},${row.scores.I},${row.scores.S},${row.scores.C},${row.mainType} 型\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "DiSC_測評結果.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

});
