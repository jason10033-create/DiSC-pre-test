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
        syncDataRealtime();
    }

    // --- 基本設定邏輯 ---
    async function loadSettings() {
        const configDoc = await db.collection('moxadisc_config').doc('general').get();
        let settings = { randomizeOptions: true, showDetailedResults: true };
        
        if (configDoc.exists) {
            settings = configDoc.data().settings || settings;
        }
        
        document.getElementById('setting-randomize').checked = settings.randomizeOptions;
        document.getElementById('setting-show-chart').checked = settings.showDetailedResults;
    }

    document.getElementById('save-settings-btn').addEventListener('click', async () => {
        try {
            const configDoc = await db.collection('moxadisc_config').doc('general').get();
            let data = configDoc.exists ? configDoc.data() : { settings: {}, questions: [] };
            
            data.settings.randomizeOptions = document.getElementById('setting-randomize').checked;
            data.settings.showDetailedResults = document.getElementById('setting-show-chart').checked;
            
            await db.collection('moxadisc_config').doc('general').set(data);
            alert('設定已同步至雲端！');
        } catch (e) {
            alert('儲存失敗: ' + e.message);
        }
    });

    // --- 內容編輯邏輯 ---
    async function loadContentEditor() {
        const configDoc = await db.collection('moxadisc_config').doc('general').get();
        let settings = { title: "-DiSC人際風格課前測評-", instructions: ["請以最「自然」的直覺反應作答，沒有對錯。", "", ""] };
        let questions = [];

        if (configDoc.exists) {
            const data = configDoc.data();
            if (data.settings) settings = data.settings;
            if (data.questions) questions = data.questions;
        }

        document.getElementById('edit-title').value = settings.title || '';
        document.getElementById('edit-inst-1').value = settings.instructions[0] || '';
        document.getElementById('edit-inst-2').value = settings.instructions[1] || '';
        document.getElementById('edit-inst-3').value = settings.instructions[2] || '';

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

    document.getElementById('save-content-btn').addEventListener('click', async () => {
        try {
            const configDoc = await db.collection('moxadisc_config').doc('general').get();
            let data = configDoc.exists ? configDoc.data() : { settings: {}, questions: [] };
            
            data.settings.title = document.getElementById('edit-title').value;
            data.settings.instructions = [
                document.getElementById('edit-inst-1').value,
                document.getElementById('edit-inst-2').value,
                document.getElementById('edit-inst-3').value
            ];

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
            data.questions = newQuestions;
            
            await db.collection('moxadisc_config').doc('general').set(data);
            alert('題目與設定已同步至雲端！');
        } catch (e) {
            alert('儲存失敗: ' + e.message);
        }
    });

    // --- 測評結果邏輯 (即時同步) ---
    let resultChart = null;
    let currentResponses = [];

    function syncDataRealtime() {
        db.collection('disc_responses').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            currentResponses = [];
            snapshot.forEach(doc => {
                const item = doc.data();
                item.id = doc.id;
                currentResponses.push(item);
            });
            renderResponses();
        });
    }

    function renderResponses() {
        const tbody = document.getElementById('responses-body');
        const emptyState = document.getElementById('empty-state');
        const tableResponsive = document.querySelector('.table-responsive');
        const chartContainer = document.getElementById('chart-container');
        
        tbody.innerHTML = '';
        document.getElementById('stat-total-users').innerText = currentResponses.length;

        if (currentResponses.length === 0) {
            emptyState.style.display = 'block';
            tableResponsive.style.display = 'none';
            if (chartContainer) chartContainer.style.display = 'none';
            return;
        }
        
        emptyState.style.display = 'none';
        tableResponsive.style.display = 'block';
        if (chartContainer) chartContainer.style.display = 'block';

        let totalD = 0, totalI = 0, totalS = 0, totalC = 0;

        currentResponses.forEach(record => {
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

        drawChart(totalD / currentResponses.length, totalI / currentResponses.length, totalS / currentResponses.length, totalC / currentResponses.length);

        // 綁定刪除按鈕
        document.querySelectorAll('.delete-record-btn').forEach(btn => {
            btn.onclick = (e) => {
                const id = e.target.getAttribute('data-id');
                if(confirm('確定要刪除此筆雲端紀錄嗎？')) {
                    db.collection('disc_responses').doc(id).delete();
                }
            };
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
                    backgroundColor: ['rgba(239, 68, 68, 0.7)', 'rgba(234, 179, 8, 0.7)', 'rgba(34, 197, 94, 0.7)', 'rgba(59, 130, 246, 0.7)'],
                    borderColor: ['rgb(239, 68, 68)', 'rgb(234, 179, 8)', 'rgb(34, 197, 94)', 'rgb(59, 130, 246)'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: { ticks: { color: textColor }, grid: { color: gridColor } },
                    y: { beginAtZero: true, max: 15, ticks: { color: textColor }, grid: { color: gridColor } }
                },
                plugins: {
                    legend: { labels: { color: textColor } },
                    title: { display: true, text: '所有受測者平均風格分數落差', font: { size: 16 }, color: textColor }
                }
            }
        });
    }

    document.getElementById('clear-btn').addEventListener('click', async () => {
        if (confirm('警告：這將刪除雲端所有測評紀錄！確定要執行嗎？')) {
            const snapshot = await db.collection('disc_responses').get();
            const batch = db.batch();
            snapshot.forEach(doc => batch.delete(doc.ref));
            await batch.commit();
            alert('已清空雲端資料。');
        }
    });

    document.getElementById('export-btn').addEventListener('click', () => {
        if (currentResponses.length === 0) {
            alert('沒有資料可匯出！');
            return;
        }
        let csvContent = "data:text/csv;charset=utf-8,\uFEFF";
        csvContent += "測驗時間,姓名,D分數,i分數,S分數,C分數,判定結果\n";
        currentResponses.forEach(row => {
            csvContent += `${row.date},${row.name},${row.scores.D},${row.scores.I},${row.scores.S},${row.scores.C},${row.mainType} 型\n`;
        });
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "DiSC_雲端測評結果.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
