const questions = [
  {
    question: "1年で最も日照時間が短い日を何と呼ぶ？",
    choices: ["夏至", "冬至", "春分", "秋分"],
    answer: 1,
  },
  {
    question: "日本で一番面積が広い都道府県はどこ？",
    choices: ["岩手県", "福島県", "北海道", "長野県"],
    answer: 2,
  },
  {
    question: "「三権分立」に含まれないものはどれ？",
    choices: ["立法権", "行政権", "司法権", "選挙権"],
    answer: 3,
  },
  {
    question: "水の化学式はどれ？",
    choices: ["CO2", "H2O", "NaCl", "O2"],
    answer: 1,
  },
  {
    question: "1年は何日？（うるう年を除く）",
    choices: ["364日", "365日", "366日", "360日"],
    answer: 1,
  },
  {
    question: "日本の国花の一つとされる花はどれ？",
    choices: ["バラ", "チューリップ", "桜", "ひまわり"],
    answer: 2,
  },
  {
    question: "虹は一般的に何色からできているとされる？",
    choices: ["5色", "6色", "7色", "8色"],
    answer: 2,
  },
];

let currentIndex = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const progressEl = document.getElementById("progress");
const nextBtn = document.getElementById("next-btn");
const quizCard = document.getElementById("quiz-card");
const resultCard = document.getElementById("result-card");
const scoreEl = document.getElementById("score");
const retryBtn = document.getElementById("retry-btn");
const chartCanvas = document.getElementById("score-chart");

let scoreChart = null;

// バーの上に件数を直接描画するプラグイン（色だけに頼らず数値を明示するため）
const valueLabelPlugin = {
  id: "valueLabel",
  afterDatasetsDraw(chart) {
    const { ctx } = chart;
    chart.getDatasetMeta(0).data.forEach((bar, index) => {
      const value = chart.data.datasets[0].data[index];
      ctx.save();
      ctx.fillStyle = "#2c2c2c";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(`${value}問`, bar.x, bar.y - 6);
      ctx.restore();
    });
  },
};

function renderScoreChart() {
  const incorrect = questions.length - score;
  chartCanvas.setAttribute(
    "aria-label",
    `正解 ${score}問、不正解 ${incorrect}問の棒グラフ`
  );

  if (scoreChart) {
    scoreChart.data.datasets[0].data = [score, incorrect];
    scoreChart.update();
    return;
  }

  scoreChart = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: ["正解", "不正解"],
      datasets: [
        {
          data: [score, incorrect],
          backgroundColor: ["#22c55e", "#ef4444"],
          borderRadius: 4,
          maxBarThickness: 64,
        },
      ],
    },
    options: {
      responsive: true,
      layout: {
        padding: { top: 24 },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (item) => `${item.raw}問`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
          grace: 1,
          ticks: { stepSize: 1, precision: 0 },
        },
      },
    },
    plugins: [valueLabelPlugin],
  });
}

function renderQuestion() {
  answered = false;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  nextBtn.disabled = true;

  const q = questions[currentIndex];
  progressEl.textContent = `問題 ${currentIndex + 1} / ${questions.length}`;
  questionEl.textContent = q.question;

  choicesEl.innerHTML = "";
  q.choices.forEach((choiceText, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choiceText;
    btn.addEventListener("click", () => handleAnswer(index, btn));
    choicesEl.appendChild(btn);
  });
}

function handleAnswer(selectedIndex, selectedBtn) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const buttons = choicesEl.querySelectorAll(".choice-btn");
  buttons.forEach((btn) => (btn.disabled = true));

  if (selectedIndex === q.answer) {
    score++;
    selectedBtn.classList.add("correct");
    feedbackEl.textContent = "正解！";
    feedbackEl.classList.add("correct");
  } else {
    selectedBtn.classList.add("wrong");
    buttons[q.answer].classList.add("correct");
    feedbackEl.textContent = "不正解…";
    feedbackEl.classList.add("wrong");
  }

  nextBtn.disabled = false;
}

function handleNext() {
  currentIndex++;
  if (currentIndex < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizCard.classList.add("hidden");
  resultCard.classList.remove("hidden");
  scoreEl.textContent = `${questions.length}問中${score}問正解！`;
  renderScoreChart();
}

function restart() {
  currentIndex = 0;
  score = 0;
  resultCard.classList.add("hidden");
  quizCard.classList.remove("hidden");
  renderQuestion();
}

nextBtn.addEventListener("click", handleNext);
retryBtn.addEventListener("click", restart);

renderQuestion();
