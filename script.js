const games = [
  {
    title: "星环远征",
    genre: "RPG",
    platform: "PC / 主机",
    score: 9.2,
    hours: "60+ 小时",
    image: "assets/star-expedition.svg",
    color: "linear-gradient(135deg, #2367a3, #1f7a5f)",
    desc: "开放星域探索 RPG，核心体验是舰队养成、分支剧情和遗迹解谜。",
    guide: ["优先升级扫描器，前期可多拿两条隐藏支线。", "舰队编成保持一艘护卫、一艘补给、一艘火力船。", "第三区域前保存稀有矿石，用于解锁跃迁核心。"]
  },
  {
    title: "赤刃回响",
    genre: "动作",
    platform: "PC / PS5",
    score: 8.8,
    hours: "24 小时",
    image: "assets/red-blade-echo.svg",
    color: "linear-gradient(135deg, #b73f35, #24272b)",
    desc: "高速动作冒险，强调格挡节奏、连段路线和 Boss 机制拆解。",
    guide: ["把轻攻击第三段取消接闪避，可稳定规避反击。", "Boss 红光招式不能格挡，蓝光招式适合弹反。", "先点体力上限，再补处决伤害，容错更高。"]
  },
  {
    title: "王国工坊",
    genre: "策略",
    platform: "PC / Switch",
    score: 8.5,
    hours: "40 小时",
    image: "assets/kingdom-workshop.svg",
    color: "linear-gradient(135deg, #d79a2b, #1f7a5f)",
    desc: "城镇经营与轻策略战斗结合，玩家需要管理资源、工匠和防线。",
    guide: ["前 10 天不要扩张太快，木材和粮食要保持正收益。", "夜袭前把工匠切换到维修，能降低建筑损失。", "市场升到 2 级后再集中发展武器链。"]
  },
  {
    title: "雨巷谜影",
    genre: "独立",
    platform: "PC / 移动端",
    score: 9.0,
    hours: "8 小时",
    image: "assets/rain-alley-mystery.svg",
    color: "linear-gradient(135deg, #4b5563, #2367a3)",
    desc: "叙事解谜游戏，用环境线索、录音和选择分支推进悬疑故事。",
    guide: ["每章先检查墙面海报，日期通常对应保险箱密码。", "录音线索需要倒放一次，会出现另一组关键词。", "结局分支取决于第三章是否归还怀表。"]
  },
  {
    title: "极限漂移社",
    genre: "动作",
    platform: "PC / Xbox",
    score: 8.2,
    hours: "30 小时",
    image: "assets/drift-club.svg",
    color: "linear-gradient(135deg, #101215, #d79a2b)",
    desc: "街机赛车游戏，包含车队挑战、零件调校和多人计时赛。",
    guide: ["新手车优先换轮胎，再升级涡轮，收益更稳定。", "入弯前轻点刹车触发漂移，比长按更容易控线。", "雨天赛道降低 5% 胎压，抓地更顺。"]
  },
  {
    title: "边境指令",
    genre: "策略",
    platform: "PC",
    score: 8.7,
    hours: "50 小时",
    image: "assets/frontier-command.svg",
    color: "linear-gradient(135deg, #1f7a5f, #15171a)",
    desc: "回合制战术游戏，围绕小队站位、补给线和情报侦察构建战局。",
    guide: ["侦察兵每回合保留 2 点行动值，可应对伏击。", "高地视野比纯火力更重要，先抢视野再推进。", "补给车不要贴前线，保持两格距离可避免连锁爆炸。"]
  }
];

const gameGrid = document.querySelector("#gameGrid");
const guideList = document.querySelector("#guideList");
const ratingBoard = document.querySelector("#ratingBoard");
const searchInput = document.querySelector("#searchInput");
const chips = document.querySelectorAll(".chip");
const dialog = document.querySelector("#gameDialog");
const dialogContent = document.querySelector("#dialogContent");
const closeButton = document.querySelector(".dialog-close");

let currentFilter = "all";

function renderGames() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = games.filter((game) => {
    const matchesFilter = currentFilter === "all" || game.genre === currentFilter;
    const text = `${game.title} ${game.genre} ${game.platform} ${game.desc}`.toLowerCase();
    return matchesFilter && text.includes(query);
  });

  gameGrid.innerHTML = filtered.map((game, index) => `
    <article class="game-card">
      <div class="cover" style="--cover: ${game.color}">
        <img src="${game.image}" alt="${game.title} 游戏封面">
      </div>
      <div class="game-body">
        <div class="meta">
          <span class="tag">${game.genre}</span>
          <span class="tag">${game.platform}</span>
        </div>
        <h3>${game.title}</h3>
        <p>${game.desc}</p>
        <div class="game-footer">
          <span class="score">${game.score.toFixed(1)}</span>
          <button class="details-button" type="button" data-index="${index}">详情</button>
        </div>
      </div>
    </article>
  `).join("") || `<p class="empty">没有找到匹配的游戏。</p>`;

  document.querySelectorAll(".details-button").forEach((button) => {
    button.addEventListener("click", () => openDialog(filtered[Number(button.dataset.index)]));
  });
}

function renderGuides() {
  guideList.innerHTML = games.slice(0, 4).map((game, index) => `
    <article class="guide-card">
      <div class="guide-stripe" style="--stripe: ${["#2367a3", "#b73f35", "#1f7a5f", "#d79a2b"][index]}"></div>
      <div class="guide-content">
        <div class="meta">
          <span class="tag">${game.genre}</span>
          <span class="tag">${game.hours}</span>
        </div>
        <h3>${game.title} 入门路线</h3>
        <p>${game.desc}</p>
        <ol class="guide-steps">
          ${game.guide.map((step, stepIndex) => `<li><span>${stepIndex + 1}</span>${step}</li>`).join("")}
        </ol>
      </div>
    </article>
  `).join("");
}

function renderRatings() {
  ratingBoard.innerHTML = games.map((game) => {
    const width = `${Math.round(game.score * 10)}%`;
    const stars = "★★★★★".slice(0, Math.round(game.score / 2));
    return `
      <article class="score-card">
        <div class="score-row">
          <h3>${game.title}</h3>
          <span class="score">${game.score.toFixed(1)}</span>
        </div>
        <div class="bar" aria-label="${game.title} 评分 ${game.score.toFixed(1)}">
          <span style="--width: ${width}"></span>
        </div>
        <p class="stars" aria-hidden="true">${stars}</p>
        <p>${ratingSummary(game.score)}</p>
      </article>
    `;
  }).join("");
}

function ratingSummary(score) {
  if (score >= 9) return "玩家反馈集中在世界观、沉浸感和关卡完成度。";
  if (score >= 8.6) return "核心玩法稳定，适合喜欢系统深度的玩家。";
  return "节奏轻快，上手成本低，适合短时间游玩。";
}

function openDialog(game) {
  dialogContent.innerHTML = `
    <div class="dialog-hero" style="--cover: ${game.color}; --image: url('${game.image}')">
      <div class="meta">
        <span class="tag">${game.genre}</span>
        <span class="tag">${game.platform}</span>
      </div>
      <h2>${game.title}</h2>
    </div>
    <div class="dialog-body">
      <p>${game.desc}</p>
      <h3>推荐攻略</h3>
      <ol class="guide-steps">
        ${game.guide.map((step, index) => `<li><span>${index + 1}</span>${step}</li>`).join("")}
      </ol>
      <dl>
        <div><dt>玩家评分</dt><dd>${game.score.toFixed(1)} / 10</dd></div>
        <div><dt>预计时长</dt><dd>${game.hours}</dd></div>
        <div><dt>游戏类型</dt><dd>${game.genre}</dd></div>
      </dl>
    </div>
  `;
  dialog.showModal();
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
    currentFilter = chip.dataset.filter;
    renderGames();
  });
});

searchInput.addEventListener("input", renderGames);
closeButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

renderGames();
renderGuides();
renderRatings();
