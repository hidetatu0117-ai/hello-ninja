/*
 * ダッシュボード・AI社員一覧は、まだPHASE 0のダミーデータのままです。
 * 「Instagram投稿一覧」タブだけは、PHASE 1で作ったバックエンド
 * （ai-company/backend）に接続し、実際のInstagramデータを表示します。
 * バックエンドが起動していない・接続情報が未設定の場合は、その旨を
 * 分かりやすく案内する画面になります。
 *
 * PC幅とスマホ幅では画面の組み立て方そのものを変えているため、
 * 同じデータから「デスクトップ用のHTML」と「スマホ用のHTML」の
 * 両方を作り、CSS（720px以下）でどちらを表示するか切り替えています。
 */

const BACKEND_URL = "http://127.0.0.1:8001";

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

  // note購入までの中間指標。KPIカードには存在しなかったのでスマホの
  // 優先度別表示のために追加（今月のnote売上・note購入数と整合する数字）。
  noteAccessMonth: { value: "1,940", delta: "+9%（前日比）", trend: "up" },
  litlinkClickMonth: { value: "4,860", delta: "+12%（前日比）", trend: "up" },
  notePurchaseRateMonth: { value: "0.72%", delta: "±0.0pt（前日比）", trend: "flat" },

  funnel: {
    title: "Instagram → lit.link → note のファネル（直近7日）",
    weakStep: 4,
    // スマホの縦型ステップ表示で「どこが最大の離脱ポイントか」を
    // 明示するためのインデックス（0始まり）。note購入への転換が
    // 最も悪いという funnel.reason の内容と一致させている。
    mobileCriticalIndex: 4,
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
    { platform: "note", desc: "アクセスは増加も購入は0件のまま" },
    { platform: "Instagram", desc: "保存率が平均より高い投稿が1件（+1.6倍）" },
    { platform: "TikTok", desc: "フォロー率が急上昇（+0.4pt）" },
    { platform: "YouTube", desc: "目立った変化なし" },
    { platform: "LINE", desc: "登録者+5人、開封率は横ばい" },
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

  // スマホでは最初にこの5名だけを表示し、残りは「もっと見る」に格納する。
  mobilePriorityEmployeeIds: ["ceo", "ig", "note", "funnel", "litlink"],

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

function parseNum(str) {
  return Number(String(str).replace(/,/g, ""));
}

function kpiCardHtml(k, sizeClass) {
  const t = trendSymbol(k.trend);
  return `
      <div class="kpi-card ${sizeClass || ""}">
        <div class="kpi-name">${k.name}</div>
        <div class="kpi-value">${k.value}</div>
        <div class="kpi-delta ${t.cls}">${t.arrow} ${k.delta}</div>
      </div>`;
}

function rankItemHtml(r, index) {
  return `
      <li class="rank-item">
        <div class="rank-index">${index}</div>
        <div class="rank-body">
          <div class="rank-title">${r.title}</div>
          <div class="rank-sub">${r.sub}</div>
        </div>
        <div class="rank-metric">${r.metric}</div>
      </li>`;
}

function rankListHtml(list, offset) {
  return list.map((r, i) => rankItemHtml(r, i + 1 + (offset || 0))).join("");
}

function employeeCardHtml(e) {
  return `
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
      </div>`;
}

// 優先度の高いAI社員だけを先に表示し、残りは <details> でたたむ。
// ダッシュボードの「AI社員の状況」とAI社員一覧タブの両方で使う。
function employeeListMobileHtml(employees, priorityIds) {
  const priority = priorityIds.map((id) => employees.find((e) => e.id === id)).filter(Boolean);
  const rest = employees.filter((e) => !priorityIds.includes(e.id));
  return `
    <div class="employee-grid">${priority.map(employeeCardHtml).join("")}</div>
    <details class="m-details">
      <summary>その他のAI社員を見る（${rest.length}名）</summary>
      <div class="employee-grid" style="margin-top:12px">${rest.map(employeeCardHtml).join("")}</div>
    </details>`;
}

/* ---------------- デスクトップ（PC）向けダッシュボード ---------------- */

function desktopDashboardHtml(d) {
  const kpiHtml = d.kpis.map((k) => kpiCardHtml(k)).join("");

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

  const employeeMiniHtml = d.employees.slice(0, 6).map(employeeCardHtml).join("");

  return `
  <div class="only-desktop">
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
        <ul class="rank-list">${rankListHtml(d.rankingBySales)}</ul>
        <div class="rank-sub" style="margin:16px 0 8px;font-weight:700;color:var(--text)">参考：再生数だけのランキング</div>
        <ul class="rank-list">${rankListHtml(d.rankingByViews)}</ul>
      </div>
    </div>

    <div class="section-title">AI社員の状況</div>
    <div class="employee-grid">${employeeMiniHtml}</div>
  </div>`;
}

/* ---------------- スマホ向けダッシュボード ---------------- */
/* 表示順は「今日の指示 → ボトルネック → note売上関連KPI →
   直近の重要変化 → 売上につながった投稿 → AI社員の状況」の固定。 */

function mobileHeroHtml(d) {
  return `
    <div class="m-hero">
      <div class="m-hero-label">AI社長から今日の指示</div>
      <div class="m-hero-task">${d.ceoDecision.task}</div>
      <p class="m-hero-reason">${d.ceoDecision.conclusion}</p>
      <div class="m-hero-time">${d.ceoDecision.updatedAt}</div>
    </div>`;
}

function mobileBottleneckHtml(funnel) {
  const nums = funnel.steps.map((s) => parseNum(s.value));

  let html = "";
  funnel.steps.forEach((s, i) => {
    if (i > 0) {
      const rate = nums[i] / nums[i - 1];
      const pct = rate * 100;
      const pctLabel = pct < 1 ? pct.toFixed(1) : Math.round(pct);
      const isCritical = i === funnel.mobileCriticalIndex;
      const fillWidth = Math.min(Math.max(pct, 3), 100);
      html += `
      <div class="step-v-connector ${isCritical ? "critical" : ""}">
        <div class="connector-bar"><div class="connector-fill" style="width:${fillWidth}%"></div></div>
        <div class="connector-rate">通過率 ${pctLabel}%${isCritical ? "・大きく離脱" : ""}</div>
      </div>`;
    }
    const isCriticalStep = i === funnel.mobileCriticalIndex;
    html += `
      <div class="step-v ${isCriticalStep ? "critical" : ""}">
        <div class="step-v-row">
          <span class="step-v-label">${s.label.replace("\n", " ")}</span>
          <span class="step-v-value">${s.value}</span>
        </div>
        ${isCriticalStep ? '<span class="critical-tag">⚠ ここが最大の離脱ポイント</span>' : ""}
      </div>`;
  });

  return `
    <div class="card">
      <span class="bottleneck-flag">⚠ ${funnel.title}</span>
      <div class="step-v-list">${html}</div>
      <div class="bottleneck-reason">${funnel.reason}</div>
    </div>`;
}

function mobileKpiHtml(d) {
  const primary = [
    { ...d.kpis.find((k) => k.name === "今日の売上") },
    { ...d.kpis.find((k) => k.name === "今月のnote売上") },
    { ...d.kpis.find((k) => k.name === "note購入数") },
    { name: "note購入率", ...d.notePurchaseRateMonth },
  ];
  const secondary = [
    { name: "noteアクセス", ...d.noteAccessMonth },
    { name: "lit.linkクリック", ...d.litlinkClickMonth },
    { ...d.kpis.find((k) => k.name === "LINE登録") },
  ];
  const reference = [
    { ...d.kpis.find((k) => k.name === "Instagramフォロワー") },
    { ...d.kpis.find((k) => k.name === "TikTokフォロワー") },
    { ...d.kpis.find((k) => k.name === "YouTube登録者") },
  ];

  return `
    <div class="kpi-primary-grid">${primary.map((k) => kpiCardHtml(k, "primary")).join("")}</div>
    <div class="kpi-secondary-grid">${secondary.map((k) => kpiCardHtml(k, "secondary")).join("")}</div>
    <details class="m-details">
      <summary>参考：SNSのフォロワー数を見る</summary>
      <div class="kpi-reference-grid" style="margin-top:10px">${reference.map((k) => kpiCardHtml(k, "reference")).join("")}</div>
    </details>`;
}

function mobileChangesHtml(changes) {
  const keyPlatforms = ["note", "Instagram"];
  const key = changes.filter((c) => keyPlatforms.includes(c.platform));
  const rest = changes.filter((c) => !keyPlatforms.includes(c.platform));
  const rowHtml = (c) => `
      <li class="change-row">
        <span class="change-platform">${c.platform}</span>
        <span class="change-desc">${c.desc}</span>
      </li>`;

  return `
    <div class="card">
      <ul class="change-list">${key.map(rowHtml).join("")}</ul>
      <details class="m-details">
        <summary>その他の変化を見る（${rest.length}件）</summary>
        <ul class="change-list" style="margin-top:10px">${rest.map(rowHtml).join("")}</ul>
      </details>
    </div>`;
}

function mobileRankingHtml(d) {
  const [top, ...restSales] = d.rankingBySales;

  return `
    <div class="card">
      <div class="rank-sub" style="margin-bottom:8px;font-weight:700;color:var(--text)">売上につながった投稿ランキング</div>
      <ul class="rank-list">${rankItemHtml(top, 1)}</ul>
      <details class="m-details">
        <summary>あと${restSales.length}件を見る</summary>
        <ul class="rank-list" style="margin-top:10px">${rankListHtml(restSales, 1)}</ul>
      </details>
      <details class="m-details" style="margin-top:10px">
        <summary>参考：再生数だけのランキングを見る</summary>
        <ul class="rank-list" style="margin-top:10px">${rankListHtml(d.rankingByViews)}</ul>
      </details>
    </div>`;
}

function mobileDashboardHtml(d) {
  return `
  <div class="only-mobile">
    ${mobileHeroHtml(d)}

    <div class="section-title">現在のボトルネック</div>
    ${mobileBottleneckHtml(d.funnel)}

    <div class="section-title">note売上に関わる数字</div>
    ${mobileKpiHtml(d)}

    <div class="section-title">直近の重要な変化</div>
    ${mobileChangesHtml(d.changes)}

    <div class="section-title">売上につながった投稿</div>
    ${mobileRankingHtml(d)}

    <div class="section-title">AI社員の状況</div>
    ${employeeListMobileHtml(d.employees, d.mobilePriorityEmployeeIds)}
  </div>`;
}

function renderDashboard() {
  const d = dummyData;
  return desktopDashboardHtml(d) + mobileDashboardHtml(d);
}

function renderEmployees() {
  const d = dummyData;
  const desktopCards = d.employees.map(employeeCardHtml).join("");

  return `
    <div class="only-desktop">
      <div class="section-title">AI社員一覧（13名）</div>
      <div class="employee-grid">${desktopCards}</div>
    </div>
    <div class="only-mobile">
      <div class="section-title">AI社員一覧（13名）</div>
      ${employeeListMobileHtml(d.employees, d.mobilePriorityEmployeeIds)}
    </div>`;
}

/* ---------------- Instagram投稿一覧（実データ / バックエンド接続） ---------------- */

function igNumber(v) {
  return v === null || v === undefined ? "—" : Number(v).toLocaleString("ja-JP");
}

function igDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" });
}

function igPostCardHtml(p) {
  const caption = (p.caption || "（キャプションなし）").slice(0, 60);
  const thumb = p.thumbnail_url
    ? `<img class="ig-post-thumb" src="${p.thumbnail_url}" alt="">`
    : `<div class="ig-post-thumb"></div>`;
  return `
    <div class="ig-post-card">
      ${thumb}
      <div class="ig-post-body">
        <div class="ig-post-date">${igDate(p.posted_at)}・${p.media_type || ""}</div>
        <div class="ig-post-caption">${caption}${(p.caption || "").length > 60 ? "…" : ""}</div>
        <div class="ig-post-metrics">
          <span>リーチ <strong>${igNumber(p.reach)}</strong></span>
          <span>いいね <strong>${igNumber(p.likes)}</strong></span>
          <span>コメント <strong>${igNumber(p.comments)}</strong></span>
          <span>保存 <strong>${igNumber(p.saved)}</strong></span>
          <span>シェア <strong>${igNumber(p.shares)}</strong></span>
          <span>再生 <strong>${igNumber(p.plays)}</strong></span>
        </div>
      </div>
    </div>`;
}

function igSyncButtonHtml() {
  return `<button class="btn-primary" data-action="sync-instagram">今すぐ同期する</button>`;
}

function igMessageCardHtml(title, body, showSyncButton) {
  return `
    <div class="soon-wrap">
      <div style="font-size:15px;font-weight:700;color:var(--text)">${title}</div>
      <div style="margin-top:8px;font-size:13px;color:var(--text-muted);max-width:520px;margin-left:auto;margin-right:auto;line-height:1.7">${body}</div>
      ${showSyncButton ? `<div style="margin-top:16px">${igSyncButtonHtml()}</div>` : ""}
    </div>`;
}

async function renderInstagram() {
  const app = document.getElementById("app");
  app.innerHTML = `<div class="soon-wrap">読み込み中…</div>`;

  let res;
  try {
    res = await fetch(`${BACKEND_URL}/api/instagram/posts`);
  } catch (err) {
    app.innerHTML = igMessageCardHtml(
      "バックエンドサーバーに接続できませんでした",
      "ai-company/backend のサーバーが起動していない可能性があります。README「PHASE 1: Instagram接続」の手順でサーバーを起動してから、もう一度このタブを開いてください。",
      false
    );
    return;
  }

  if (!res.ok) {
    app.innerHTML = igMessageCardHtml("投稿データの取得に失敗しました", "少し時間をおいて再度お試しください。", false);
    return;
  }

  const data = await res.json();
  const posts = data.posts || [];

  if (posts.length === 0) {
    app.innerHTML = igMessageCardHtml(
      "まだInstagramのデータが同期されていません",
      "README「PHASE 1: Instagram接続」の手順で .env にアクセストークンを設定したら、下のボタンから同期してください。",
      true
    );
    return;
  }

  app.innerHTML = `
    <div class="section-title">Instagram投稿一覧（${posts.length}件）</div>
    <div style="margin-bottom:14px">${igSyncButtonHtml()}</div>
    <div class="ig-post-grid">${posts.map(igPostCardHtml).join("")}</div>
  `;
}

document.addEventListener("click", async (e) => {
  const btn = e.target.closest("[data-action='sync-instagram']");
  if (!btn) return;
  const originalLabel = btn.textContent;
  btn.disabled = true;
  btn.textContent = "同期中…";

  try {
    const res = await fetch(`${BACKEND_URL}/api/instagram/sync`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) {
      const message = (data.detail && data.detail.message) || data.detail || "同期に失敗しました。";
      document.getElementById("app").innerHTML = igMessageCardHtml("同期できませんでした", message, false);
      return;
    }
  } catch (err) {
    document.getElementById("app").innerHTML = igMessageCardHtml(
      "バックエンドサーバーに接続できませんでした",
      "サーバーが起動しているか確認してください。",
      false
    );
    return;
  } finally {
    btn.disabled = false;
    btn.textContent = originalLabel;
  }

  renderInstagram();
});

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
  instagram: renderInstagram,
  soon: renderSoon,
};

function setTab(tab) {
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  const result = routes[tab]();
  // renderInstagram は非同期でDOMを直接更新するため、
  // 文字列を返すルート（ダッシュボード等）のときだけここで反映する。
  if (typeof result === "string") {
    document.getElementById("app").innerHTML = result;
  }
}

document.getElementById("tabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  setTab(btn.dataset.tab);
});

setTab("dashboard");
