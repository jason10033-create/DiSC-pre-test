// --- 預設資料設定 ---
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

const discDescriptions = {
    "D": "支配型 (Dominance)：您注重結果、果斷且具競爭力。喜歡接受挑戰，追求效率與目標達成。",
    "I": "影響型 (Influence)：您熱情、擅長溝通且具說服力。重視人際互動，能帶動團隊氣氛。",
    "S": "穩健型 (Steadiness)：您可靠、隨和且是好的傾聽者。重視團隊和諧，行事按部就班。",
    "C": "遵從型 (Conscientiousness)：您謹慎、精確且注重邏輯。重視品質與準確性，決策基於事實與數據。"
};

// --- 初始化系統狀態 ---
let questions = [...defaultQuestions];
let settings = {...defaultSettings};

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);
let userName = "";

// DOM 元素
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const nameInput = document.getElementById('userName');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

let radarChartInstance = null;

// --- 雲端配置載入 ---
async function initCloudConfig() {
    try {
        const configDoc = await db.collection('moxadisc_config').doc('general').get();
        if (configDoc.exists) {
            const data = configDoc.data();
            if (data.settings) settings = data.settings;
            if (data.questions) questions = data.questions;
            userAnswers = new Array(questions.length).fill(null);
        }
    } catch (e) {
        console.warn("無法載入雲端設定，使用預設值:", e);
    }
    applyConfigUI();
}

function applyConfigUI() {
    document.getElementById('site-title').innerText = settings.title;
    document.title = settings.title;

    const instructionsContainer = document.getElementById('site-instructions');
    instructionsContainer.innerHTML = '';
    settings.instructions.forEach(inst => {
        if (inst.trim() !== '') {
            const li = document.createElement('li');
            li.innerText = inst;
            instructionsContainer.appendChild(li);
        }
    });

    if (settings.instructions.length === 0 || (settings.instructions.length === 1 && settings.instructions[0].trim() === '')) {
        document.querySelector('.instructions').style.display = 'none';
    } else {
        document.querySelector('.instructions').style.display = 'block';
    }
}

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
            
            if(radarChartInstance) {
                const textColor = newTheme === 'dark' ? '#f8fafc' : '#1e293b';
                const gridColor = newTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                const bgColor = newTheme === 'dark' ? '#1e293b' : '#ffffff';
                radarChartInstance.options.scales.r.pointLabels.color = textColor;
                radarChartInstance.options.scales.r.grid.color = gridColor;
                radarChartInstance.options.scales.r.angleLines.color = gridColor;
                radarChartInstance.options.scales.r.ticks.backdropColor = bgColor;
                radarChartInstance.options.scales.r.ticks.color = textColor;
                radarChartInstance.update();
            }
        });
    }

    // 初始化雲端配置
    initCloudConfig();
});

// 開始測評
startBtn.addEventListener('click', () => {
    userName = nameInput.value.trim();
    if (!userName) {
        alert("請輸入您的姓名以開始測評！");
        return;
    }
    welcomeScreen.classList.remove('active');
    quizScreen.classList.add('active');
    loadQuestion();
});

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    questionText.innerText = q.text;

    // 更新進度條
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.innerText = `${currentQuestionIndex + 1} / ${questions.length}`;

    // 清空並生成選項
    optionsContainer.innerHTML = '';

    let currentOptions = [...q.options];
    if (settings.randomizeOptions) {
        currentOptions = currentOptions.sort(() => Math.random() - 0.5);
    }

    currentOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt.text;

        if (userAnswers[currentQuestionIndex] === opt.type) {
            btn.classList.add('selected');
        }

        btn.onclick = () => {
            document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            userAnswers[currentQuestionIndex] = opt.type;
            updateNavButtons();
        };
        optionsContainer.appendChild(btn);
    });

    updateNavButtons();
}

function updateNavButtons() {
    prevBtn.disabled = currentQuestionIndex === 0;
    const hasAnswered = userAnswers[currentQuestionIndex] !== null;

    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
        submitBtn.disabled = !hasAnswered;
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
        nextBtn.disabled = !hasAnswered;
    }
}

prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

submitBtn.addEventListener('click', () => {
    calculateResults();
});

async function calculateResults() {
    const scores = { D: 0, I: 0, S: 0, C: 0 };
    userAnswers.forEach(ans => {
        if (ans) scores[ans]++;
    });

    // 陣列排序：分數由高到低
    const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    const primaryType = sortedScores[0][0]; // 分數最高
    const primaryScore = sortedScores[0][1];

    const secondaryType = sortedScores[1][0]; // 分數次高
    const secondaryScore = sortedScores[1][1];

    const thirdScore = sortedScores[2][1]; // 分數第三高

    let resultType = primaryType;
    let hasSecondary = false;

    // 判斷輔型邏輯：
    if (secondaryScore > 3 && secondaryScore > thirdScore) {
        let pStr = primaryType === 'I' ? 'i' : primaryType;
        let sStr = secondaryType === 'I' ? 'i' : secondaryType;
        resultType = pStr + sStr; 
        hasSecondary = true;
    } else {
        resultType = primaryType === 'I' ? 'i' : primaryType;
    }

    // 儲存至雲端資料庫
    saveToDatabase(userName, scores, resultType);

    document.getElementById('result-name').innerText = userName;

    if (hasSecondary) {
        document.getElementById('disc-result-type').innerText = `${resultType} 型`;
        document.getElementById('disc-result-desc').innerHTML = `
            <strong>主型：${discDescriptions[primaryType].split('：')[0]}</strong><br>
            ${discDescriptions[primaryType].split('：')[1]}<br><br>
            <strong>輔型：${discDescriptions[secondaryType].split('：')[0]}</strong><br>
            ${discDescriptions[secondaryType].split('：')[1]}
        `;
    } else {
        document.getElementById('disc-result-type').innerText = `${resultType} 型`;
        document.getElementById('disc-result-desc').innerHTML = `
            <strong>主型：${discDescriptions[primaryType].split('：')[0]}</strong><br>
            ${discDescriptions[primaryType].split('：')[1]}
        `;
    }

    if (settings.showDetailedResults) {
        document.getElementById('chart-container').style.display = 'block';
        const ctx = document.getElementById('resultRadarChart');
        
        if (radarChartInstance) {
            radarChartInstance.destroy();
        }
        
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const textColor = isDark ? '#f8fafc' : '#1e293b';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        const bgColor = isDark ? '#1e293b' : '#ffffff';

        radarChartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['D (支配)', 'i (影響)', 'S (穩健)', 'C (服從)'],
                datasets: [{
                    label: '風格分數',
                    data: [scores.D, scores.I, scores.S, scores.C],
                    backgroundColor: 'rgba(59, 130, 246, 0.3)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: questions.length, 
                        min: 0,
                        ticks: {
                            stepSize: 3,
                            backdropColor: bgColor,
                            color: textColor
                        },
                        pointLabels: {
                            font: { size: 14, family: "'Inter', sans-serif" },
                            color: textColor
                        },
                        grid: { color: gridColor },
                        angleLines: { color: gridColor }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    } else {
        document.getElementById('chart-container').style.display = 'none';
    }

    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
}

async function saveToDatabase(name, scores, mainType) {
    const record = {
        date: new Date().toLocaleString(),
        name: name,
        scores: scores,
        mainType: mainType,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
        await db.collection('disc_responses').add(record);
        console.log("資料成功同步至雲端");
    } catch (e) {
        console.error("雲端同步失敗:", e);
    }
}

document.getElementById('restart-btn').addEventListener('click', () => {
    currentQuestionIndex = 0;
    userAnswers.fill(null);
    nameInput.value = '';
    resultScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
});
