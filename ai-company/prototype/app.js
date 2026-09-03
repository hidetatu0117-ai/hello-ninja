/*
 * PHASE 0 試作品：すべてダミーデータです。
 * PHASE 1以降、この dummyData と同じ形のデータを
 * 実際のAPI/データベースから取得するように置き換えていきます。
 */

const dummyData = {
  ceoDecision: {
    task: "note販売ページの冒頭を修正してください",
    reasons: [
      "Instagramプロフィール訪問：増加（+18%）",
      "lit.linkクリック：増加（+12%）",
      "noteアクセス：増加（+9%）",
      "note購入：変化なし（0件のまま）",
    ],
    conclusion:
      "集客（SNS・lit.link）は順調に伸びていますが、noteへのアクセスが増えても購入に結びついていません。現在の問題は「集客」ではなく「note販売ページ」にある可能性が高いです。",
    updatedAt: "今日 6:00 に更新",
  },

  kpis: [
    { name: "今日の売上", value: "¥0", delta: "−¥12,800（前日比）", trend: "down" },
    { name: "今月のnote売上", value: "¥86,400", delta: "+¥8,200（前月同日比）", trend: "up" },
    { name: "note購入数", value: "14件", delta: "±0件（前日比）", trend: "flat" },
    { name: "LINE登録", value: "312人", delta: "+5人（前日比）", trend: "up" },
    { name: "Instagramフォロワー", value: "4,820人", delta: "+31人（前日比）", trend: "up" },
    { name: "TikTokフォロワー", value: "1,960人", delta: "+64人（前日比）", trend: "up" },
    { name: "YouTube登録者", value: "742人", delta: "+3人（前日比）", trend: "up" },
  ],

  funnel: {
    title: "Instagram → lit.link → note のファネル（直近7日）",
    weakStep: 4,
    steps: [
      { label: "SNS表示", value: "128,400" },
      { label: "プロフィール\nアクセス", value: "3,210" },
      { label: "lit.link\nクリック", value: "1,140" },
      { label: "noteアクセス", value: "402" },
      { label: "note購入", value: "3" },
    ],
    reason:
      "noteアクセス402人に対して購入が3人のみ（購入率0.7%）。SNSからlit.linkまでの各ステップは前週より改善しているため、集客経路ではなく販売ページ自体の説得力に課題がある可能性が高いです。",
  },

  changes: [
    { platform: "Instagram", desc: "保存率が平均より高い投稿が1件（+1.6倍）" },
    { platform: "TikTok", desc: "フォロー率が急上昇（+0.4pt）" },
    { platform: "YouTube", desc: "目立った変化なし" },
    { platform: "LINE", desc: "登録者+5人、開封率は横ばい" },
    { platform: "note", desc: "アクセスは増加も購入は0件のまま" },
  ],

  rankingByViews: [
    { title: "「実はChatGPTじゃありません」冒頭ネタ", sub: "Instagram Reels", metric: "再生 20,400" },
    { title: "AI社長との掛け合い企画 第3弾", sub: "Instagram Reels", metric: "再生 15,120" },
    { title: "収益公開（9月分）", sub: "TikTok", metric: "再生 11,860" },
  ],

  rankingBySales: [
    { title: "収益公開（9月分）", sub: "note購入 3件につながった投稿", metric: "売上 ¥8,940" },
    { title: "「値上げ前に読んでほしい話」", sub: "note購入 2件につながった投稿", metric: "売上 ¥5,960" },
    { title: "AI社長との掛け合い企画 第3弾", sub: "note購入 1件につながった投稿", metric: "売上 ¥2,980" },
  ],

  employees: [
    {
      id: "ceo",
      name: "AI社長",
      role: "全体統括・最終判断",
      icon: "👑",
      status: "done",
      statusLabel: "本日の判断完了",
      summary: "note販売ページの改善を本日の最優先タスクに設定しました。",
      meta: "更新：6:00",
      isCeo: true,
    },
    { id: "ig", name: "Instagram分析担当", role: "投稿・数字・動画分析", icon: "📸", status: "done", statusLabel: "分析完了", summary: "直近10投稿ではClaude系ネタの保存率が平均の1.8倍。", meta: "更新：10分前" },
    { id: "tiktok", name: "TikTok分析担当", role: "投稿分析・IG比較", icon: "🎵", status: "done", statusLabel: "分析完了", summary: "IGでは弱かった企画がTikTokではフォロー率で好反応。", meta: "更新：22分前" },
    { id: "youtube", name: "YouTube分析担当", role: "再生・維持率分析", icon: "▶️", status: "waiting", statusLabel: "データ待ち", summary: "直近投稿がないため分析待機中です。", meta: "更新：昨日" },
    { id: "note", name: "note販売改善担当", role: "販売ページ診断", icon: "🗒️", status: "proposal", statusLabel: "改善案あり", summary: "冒頭の実績提示が弱く、購入不安への回答が不足していると判断。", meta: "更新：18分前" },
    { id: "litlink", name: "lit.link導線分析担当", role: "導線ボトルネック分析", icon: "🔗", status: "done", statusLabel: "分析完了", summary: "クリック率は問題なし。note移動後の離脱が主課題。", meta: "更新：30分前" },
    { id: "line", name: "LINE分析担当", role: "配信・開封分析", icon: "💬", status: "done", statusLabel: "分析完了", summary: "登録は堅調。配信文からnote誘導が弱いため改善提案準備中。", meta: "更新：1時間前" },
    { id: "competitor", name: "競合分析担当", role: "規約範囲内の傾向分析", icon: "🔍", status: "waiting", statusLabel: "PHASE 4で稼働予定", summary: "現在は未稼働です。", meta: "―" },
    { id: "planning", name: "投稿企画担当", role: "企画ストック・横展開", icon: "💡", status: "proposal", statusLabel: "新企画3件あり", summary: "TikTokで好反応だった企画のIG横展開案を用意しました。", meta: "更新：40分前" },
    { id: "script", name: "台本改善担当", role: "冒頭・テンポ・CTA改善", icon: "📝", status: "done", statusLabel: "分析完了", summary: "冒頭3秒の引きを強めるとテスト投稿で維持率が改善傾向。", meta: "更新：55分前" },
    { id: "data", name: "データ分析担当", role: "相関分析・異常検知", icon: "📊", status: "waiting", statusLabel: "PHASE 4で稼働予定", summary: "現在は未稼働です。", meta: "―" },
    { id: "funnel", name: "売上導線分析担当", role: "ファネル全体のボトルネック判定", icon: "🧭", status: "done", statusLabel: "分析完了", summary: "現在のボトルネックはnote販売ページと判定しました。", meta: "更新：6:00" },
    { id: "admin", name: "AI管理担当", role: "AI社員の稼働状況管理", icon: "🛠️", status: "done", statusLabel: "全員の状況を集計済み", summary: "13名中9名が稼働中、4名はPHASE待機中です。", meta: "更新：たった今" },
  ],

  upcomingScreens: [
    "Instagram投稿一覧・詳細分析",
    "動画・サムネイル分析結果",
    "note分析・販売ページ改善提案",
    "lit.link導線分析",
    "LINE分析",
    "KPI管理",
    "投稿企画データベース",
    "A/Bテスト管理",
    "競合分析",
    "毎朝レポート／週次レポート",
    "AI社長チャット",
    "設定・API連携",
  ],
};

function trendSymbol(trend) {
  if (trend === "up") return { cls: "up", arrow: "↑" };
  if (trend === "down") return { cls: "down", arrow: "↓" };
  return { cls: "flat", arrow: "→" };
}

function renderDashboard() {
  const d = dummyData;

  const kpiHtml = d.kpis
    .map((k) => {
      const t = trendSymbol(k.trend);
      return `
      <div class="kpi-card">
        <div class="kpi-name">${k.name}</div>
        <div class="kpi-value">${k.value}</div>
        <div class="kpi-delta ${t.cls}">${t.arrow} ${k.delta}</div>
      </div>`;
    })
    .join("");

  const funnelStepsHtml = d.funnel.steps
    .map((s, i) => {
      const isWeak = i === d.funnel.weakStep - 1;
      const arrow = i < d.funnel.steps.length - 1 ? '<div class="funnel-arrow">→</div>' : "";
      return `
      <div class="funnel-step ${isWeak ? "weak" : ""}">
        <div class="funnel-step-label">${s.label.replace("\n", "<br>")}</div>
        <div class="funnel-step-value">${s.value}</div>
      </div>${arrow}`;
    })
    .join("");

  const changesHtml = d.changes
    .map(
      (c) => `
      <li class="change-row">
        <span class="change-platform">${c.platform}</span>
        <span class="change-desc">${c.desc}</span>
      </li>`
    )
    .join("");

  const rankHtml = (list, badge) =>
    list
      .map(
        (r, i) => `
      <li class="rank-item">
        <div class="rank-index">${i + 1}</div>
        <div class="rank-body">
          <div class="rank-title">${r.title}</div>
          <div class="rank-sub">${r.sub}</div>
        </div>
        <div class="rank-metric">${r.metric}</div>
      </li>`
      )
      .join("");

  const employeeMiniHtml = d.employees
    .slice(0, 6)
    .map(
      (e) => `
      <div class="employee-card ${e.isCeo ? "ceo" : ""}">
        <div class="employee-top">
          <div class="employee-avatar">${e.icon}</div>
          <div>
            <div class="employee-name">${e.name}</div>
            <div class="employee-role">${e.role}</div>
          </div>
        </div>
        <span class="status-badge ${e.status}">${e.statusLabel}</span>
        <div class="employee-summary">${e.summary}</div>
        <div class="employee-meta">${e.meta}</div>
      </div>`
    )
    .join("");

  return `
    <div class="ceo-hero">
      <div class="ceo-label">AI社長から今日の指示</div>
      <div class="ceo-task">${d.ceoDecision.task}</div>
      <ul class="ceo-reasons">
        ${d.ceoDecision.reasons.map((r) => `<li>${r}</li>`).join("")}
      </ul>
      <div class="ceo-meta">${d.ceoDecision.updatedAt}</div>
    </div>

    <div class="section-title">今日の数字</div>
    <div class="kpi-grid">${kpiHtml}</div>

    <div class="section-title">現在のボトルネック</div>
    <div class="card">
      <span class="bottleneck-flag">⚠ ${d.funnel.title}</span>
      <div class="funnel">${funnelStepsHtml}</div>
      <div class="bottleneck-reason">${d.funnel.reason}</div>
    </div>

    <div class="section-title">昨日からの変化 ／ 最近伸びている投稿</div>
    <div class="two-col">
      <div class="card">
        <ul class="change-list">${changesHtml}</ul>
      </div>
      <div class="card">
        <div class="rank-sub" style="margin-bottom:8px;font-weight:700;color:var(--text)">売上につながった投稿ランキング</div>
        <ul class="rank-list">${rankHtml(d.rankingBySales)}</ul>
        <div class="rank-sub" style="margin:16px 0 8px;font-weight:700;color:var(--text)">参考：再生数だけのランキング</div>
        <ul class="rank-list">${rankHtml(d.rankingByViews)}</ul>
      </div>
    </div>

    <div class="section-title">AI社員の状況</div>
    <div class="employee-grid">${employeeMiniHtml}</div>
  `;
}

function renderEmployees() {
  const cards = dummyData.employees
    .map(
      (e) => `
      <div class="employee-card ${e.isCeo ? "ceo" : ""}">
        <div class="employee-top">
          <div class="employee-avatar">${e.icon}</div>
          <div>
            <div class="employee-name">${e.name}</div>
            <div class="employee-role">${e.role}</div>
          </div>
        </div>
        <span class="status-badge ${e.status}">${e.statusLabel}</span>
        <div class="employee-summary">${e.summary}</div>
        <div class="employee-meta">${e.meta}</div>
      </div>`
    )
    .join("");

  return `
    <div class="section-title">AI社員一覧（13名）</div>
    <div class="employee-grid">${cards}</div>
  `;
}

function renderSoon() {
  const items = dummyData.upcomingScreens
    .map((s) => `<div class="soon-item">${s}</div>`)
    .join("");
  return `
    <div class="soon-wrap">
      <div style="font-size:15px;font-weight:700;color:var(--text)">これらの画面はPHASE 1以降で順番に追加していきます</div>
      <div class="soon-grid">${items}</div>
    </div>
  `;
}

const routes = {
  dashboard: renderDashboard,
  employees: renderEmployees,
  soon: renderSoon,
};

function setTab(tab) {
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  document.getElementById("app").innerHTML = routes[tab]();
}

document.getElementById("tabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  setTab(btn.dataset.tab);
});

setTab("dashboard");
