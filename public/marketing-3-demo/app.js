const DEMO_DATE = new Date("2026-06-17T10:00:00+08:00");
const DAYS_IN_MONTH = 30;
const MTD_DAYS = 17;
const THIS_WEEK_DAYS = 3;
const LAST_WEEK_DAYS = 7;

function getStoredSidebarState() {
  try {
    return localStorage.getItem("marketing3-sidebar-collapsed") === "true";
  } catch {
    return false;
  }
}

function storeSidebarState(isCollapsed) {
  try {
    localStorage.setItem("marketing3-sidebar-collapsed", String(isCollapsed));
  } catch {
    // The demo still works when local file storage is unavailable.
  }
}

const state = {
  view: "leader",
  brandId: "glowsicha-id",
  month: "2026-06",
  picId: "nadia",
  selectedProductId: "tone-up-sunscreen",
  sidebarCollapsed: getStoredSidebarState(),
  picPublishingView: "product",
  picPublishingResultView: "product",
  picPublishingResultsOpen: false,
  videoPlanFilters: {
    products: [],
    grades: [],
  },
  publishedVideoView: "detail",
  publishedVideoFilters: {
    period: "month",
  },
  brandVideoPlanFilters: {
    products: [],
    grades: [],
    pics: [],
  },
};

const demoData = {
  brands: [
    {
      id: "glowsicha-id",
      name: "Glowsicha Indonesia",
      market: "Indonesia",
      leader: "Maya - Brand Leader",
    },
  ],
  months: [
    {
      id: "2026-06",
      label: "June 2026",
    },
  ],
  gstBrands: [
    {
      id: "glowsicha-id",
      name: "Glowsicha Indonesia",
      market: "Indonesia",
      leader: "Maya",
      target: { budget: 24000, videos: 300, gmv: 203000, views: 13700000, s: 30, a: 88, b: 182 },
      mtd: { budget: 13880, videos: 156, gmv: 100700, views: 7300000, s: 12, a: 43, b: 101 },
      lastWeek: { budget: 5620, videos: 63, gmv: 42100, views: 3082000, s: 6, a: 17, b: 40 },
      lmLastWeek: { budget: 4960, videos: 58, gmv: 40300, views: 2662000, s: 5, a: 17, b: 36 },
      ai: "规模最大，但GMV低于时间进度；应优先修复Hero产品转化和A/S级视频结构。",
    },
    {
      id: "glowvita-th",
      name: "Glowvita Thailand",
      market: "Thailand",
      leader: "Ploy",
      target: { budget: 16500, videos: 210, gmv: 138000, views: 8900000, s: 20, a: 62, b: 128 },
      mtd: { budget: 8700, videos: 126, gmv: 82600, views: 5480000, s: 13, a: 38, b: 75 },
      lastWeek: { budget: 3450, videos: 48, gmv: 34600, views: 2250000, s: 5, a: 15, b: 28 },
      lmLastWeek: { budget: 3260, videos: 41, gmv: 30100, views: 1910000, s: 4, a: 12, b: 25 },
      ai: "目标节奏健康，ROI与Views均优于计划；可以作为本周加码候选市场。",
    },
    {
      id: "dermabloom-ph",
      name: "DermaBloom Philippines",
      market: "Philippines",
      leader: "Ana",
      target: { budget: 13200, videos: 180, gmv: 103000, views: 7200000, s: 16, a: 48, b: 116 },
      mtd: { budget: 8300, videos: 89, gmv: 45100, views: 3650000, s: 6, a: 19, b: 64 },
      lastWeek: { budget: 3180, videos: 35, gmv: 17800, views: 1410000, s: 2, a: 8, b: 25 },
      lmLastWeek: { budget: 2500, videos: 38, gmv: 22400, views: 1520000, s: 3, a: 10, b: 25 },
      ai: "预算消耗偏快但GMV落后，上周同比下滑；需要CEO/CMO关注预算效率。",
    },
  ],
  pics: [
    { id: "nadia", name: "Nadia", role: "Senior PIC" },
    { id: "bima", name: "Bima", role: "PIC" },
    { id: "clara", name: "Clara", role: "PIC" },
    { id: "dinda", name: "Dinda", role: "PIC" },
  ],
  products: [
    {
      id: "tone-up-sunscreen",
      name: "Tone-Up Sunscreen SPF50",
      priority: "Hero",
      picId: "nadia",
      ai: "视频数达成较好，但S级视频不足；如果补足2条S级内容，GMV和Views都有机会追平时间进度。",
      target: { budget: 7200, videos: 84, gmv: 64000, views: 4200000, s: 10, a: 25, b: 49 },
      mtd: { budget: 4300, videos: 45, gmv: 33300, views: 2190000, s: 4, a: 12, b: 29 },
      thisWeek: { budget: 970, videos: 10, gmv: 8200, views: 548000, s: 1, a: 3, b: 6 },
      lastWeek: { budget: 1720, videos: 18, gmv: 14100, views: 918000, s: 2, a: 5, b: 11 },
      lmSamePeriod: { budget: 3900, videos: 41, gmv: 30200, views: 1980000, s: 4, a: 11, b: 26 },
      lmSameWeek: { budget: 850, videos: 9, gmv: 6900, views: 468000, s: 1, a: 2, b: 6 },
      lmLastWeek: { budget: 1580, videos: 16, gmv: 12100, views: 812000, s: 2, a: 4, b: 10 },
    },
    {
      id: "glow-day-cream",
      name: "Glow Day Cream",
      priority: "Growth",
      picId: "bima",
      ai: "视频数达成低于时间进度，GMV同步落后；优先推动已收样达人发布，先补B级内容密度。",
      target: { budget: 5600, videos: 70, gmv: 42000, views: 3100000, s: 6, a: 20, b: 44 },
      mtd: { budget: 2700, videos: 30, gmv: 17800, views: 1320000, s: 2, a: 8, b: 20 },
      thisWeek: { budget: 620, videos: 6, gmv: 3900, views: 282000, s: 0, a: 2, b: 4 },
      lastWeek: { budget: 1120, videos: 13, gmv: 7800, views: 582000, s: 1, a: 3, b: 9 },
      lmSamePeriod: { budget: 2500, videos: 34, gmv: 20100, views: 1460000, s: 3, a: 9, b: 22 },
      lmSameWeek: { budget: 680, videos: 8, gmv: 5200, views: 348000, s: 1, a: 2, b: 5 },
      lmLastWeek: { budget: 1080, videos: 15, gmv: 9000, views: 636000, s: 1, a: 5, b: 9 },
    },
    {
      id: "lip-serum",
      name: "Hydra Lip Serum",
      priority: "Test",
      picId: "clara",
      ai: "ROI健康但GMV规模偏小，是可以小幅加码的测试品；优先增加A/B级达人短视频。",
      target: { budget: 3600, videos: 58, gmv: 27000, views: 1900000, s: 3, a: 16, b: 39 },
      mtd: { budget: 1780, videos: 32, gmv: 15100, views: 1080000, s: 1, a: 9, b: 22 },
      thisWeek: { budget: 390, videos: 7, gmv: 3750, views: 260000, s: 0, a: 2, b: 5 },
      lastWeek: { budget: 710, videos: 12, gmv: 6300, views: 452000, s: 1, a: 3, b: 8 },
      lmSamePeriod: { budget: 1520, videos: 28, gmv: 11100, views: 820000, s: 1, a: 7, b: 20 },
      lmSameWeek: { budget: 330, videos: 6, gmv: 2500, views: 188000, s: 0, a: 2, b: 4 },
      lmLastWeek: { budget: 600, videos: 10, gmv: 4400, views: 336000, s: 0, a: 3, b: 7 },
    },
    {
      id: "pdrn-repair",
      name: "PDRN Repair Serum",
      priority: "Hero",
      picId: "dinda",
      ai: "Views达成好于视频数，但ROI低于目标；说明有流量但转化弱，需要优化Offer和购买引导。",
      target: { budget: 7600, videos: 88, gmv: 70000, views: 4500000, s: 11, a: 27, b: 50 },
      mtd: { budget: 5100, videos: 49, gmv: 34500, views: 2710000, s: 5, a: 14, b: 30 },
      thisWeek: { budget: 1160, videos: 11, gmv: 7500, views: 612000, s: 1, a: 3, b: 7 },
      lastWeek: { budget: 2070, videos: 20, gmv: 13900, views: 1130000, s: 2, a: 6, b: 12 },
      lmSamePeriod: { budget: 4300, videos: 42, gmv: 35200, views: 2210000, s: 4, a: 12, b: 26 },
      lmSameWeek: { budget: 930, videos: 9, gmv: 7800, views: 462000, s: 1, a: 3, b: 5 },
      lmLastWeek: { budget: 1700, videos: 17, gmv: 14800, views: 878000, s: 2, a: 5, b: 10 },
    },
  ],
};

const picDashboardDemoProducts = {
  nadia: [
    {
      id: "serum-spray",
      name: "Serum Spray",
      priority: "Hero",
      picId: "nadia",
      ai: "发布节奏接近时间进度，GMV和ROI优于Day Cream。建议优先复用高转化的即时补水Hook，并补1条A级达人内容。",
      target: { budget: 4300, videos: 52, gmv: 39000, views: 2600000, s: 6, a: 16, b: 30 },
      mtd: { budget: 1900, videos: 38, gmv: 21300, views: 1390000, s: 3, a: 11, b: 24 },
      thisWeek: { budget: 620, videos: 6, gmv: 5200, views: 350000, s: 1, a: 2, b: 3 },
      lastWeek: { budget: 1050, videos: 11, gmv: 8900, views: 570000, s: 1, a: 3, b: 7 },
      lmSamePeriod: { budget: 2400, videos: 26, gmv: 19000, views: 1250000, s: 2, a: 7, b: 17 },
      lmSameWeek: { budget: 520, videos: 5, gmv: 4300, views: 295000, s: 1, a: 1, b: 3 },
      lmLastWeek: { budget: 980, videos: 10, gmv: 7600, views: 505000, s: 1, a: 3, b: 6 },
    },
    {
      id: "day-cream",
      name: "Day Cream",
      priority: "Growth",
      picId: "nadia",
      ai: "发布量略低于计划且ROI偏弱。需要同时补发布和修复转化，避免只追视频数量。",
      target: { budget: 2900, videos: 32, gmv: 25000, views: 1600000, s: 4, a: 9, b: 19 },
      mtd: { budget: 1000, videos: 7, gmv: 12000, views: 800000, s: 1, a: 2, b: 4 },
      thisWeek: { budget: 200, videos: 2, gmv: 3000, views: 198000, s: 0, a: 1, b: 1 },
      lastWeek: { budget: 450, videos: 3, gmv: 5200, views: 348000, s: 1, a: 1, b: 1 },
      lmSamePeriod: { budget: 1500, videos: 15, gmv: 11200, views: 730000, s: 2, a: 4, b: 9 },
      lmSameWeek: { budget: 330, videos: 4, gmv: 2600, views: 173000, s: 0, a: 1, b: 3 },
      lmLastWeek: { budget: 600, videos: 6, gmv: 4500, views: 307000, s: 1, a: 1, b: 4 },
    },
  ],
};

const brandPublishingPicBreakdown = {
  "serum-spray": [
    {
      id: "nisa",
      name: "Nisa",
      target: { budget: 2500, videos: 30, gmv: 23000, views: 1550000, s: 4, a: 9, b: 17 },
      mtd: { budget: 1100, videos: 22, gmv: 13200, views: 850000, s: 2, a: 6, b: 14 },
      ai: "发布进度相对稳定，GMV贡献领先。下一步补1条A级内容，并复用即时补水Hook。",
    },
    {
      id: "cilla",
      name: "Cilla",
      target: { budget: 1800, videos: 22, gmv: 16000, views: 1050000, s: 2, a: 7, b: 13 },
      mtd: { budget: 800, videos: 16, gmv: 8100, views: 540000, s: 1, a: 5, b: 10 },
      ai: "视频达成接近节奏，但ROI偏弱。优先检查达人质量和购买CTA。",
    },
  ],
  "day-cream": [
    {
      id: "nisa",
      name: "Nisa",
      target: { budget: 1650, videos: 18, gmv: 14000, views: 900000, s: 2, a: 5, b: 11 },
      mtd: { budget: 600, videos: 4, gmv: 6900, views: 460000, s: 1, a: 1, b: 2 },
      ai: "发布数量达到50%，但转化仍需修复。建议更换利益点表达并加强CTA。",
    },
    {
      id: "cilla",
      name: "Cilla",
      target: { budget: 1250, videos: 14, gmv: 11000, views: 700000, s: 2, a: 4, b: 8 },
      mtd: { budget: 400, videos: 3, gmv: 5100, views: 340000, s: 0, a: 1, b: 2 },
      ai: "当前规模较小且ROI偏低。先解决审核和发布时间，再决定是否继续补量。",
    },
  ],
};

const gstProductBlueprints = {
  "glowvita-th": [
    {
      id: "bright-barrier-sunscreen",
      name: "Bright Barrier Sunscreen",
      priority: "Hero",
      picId: "ploy",
      picName: "Ploy",
      targetShare: 0.42,
      mtdShares: { budget: 0.39, videos: 0.42, gmv: 0.47, views: 0.45, s: 0.46, a: 0.44, b: 0.4 },
      ai: "GMV和Views贡献领先，发布后转化健康。建议验证增量预算，并复用高转化防晒场景。",
    },
    {
      id: "vita-c-glow-serum",
      name: "Vita-C Glow Serum",
      priority: "Growth",
      picId: "mint",
      picName: "Mint",
      targetShare: 0.34,
      mtdShares: { budget: 0.36, videos: 0.35, gmv: 0.35, views: 0.34, s: 0.38, a: 0.35, b: 0.34 },
      ai: "发布节奏稳定，ROI接近品牌平均。下一步应提高A级达人占比，验证能否继续放量。",
    },
    {
      id: "soft-blur-tint",
      name: "Soft Blur Tint",
      priority: "Test",
      picId: "fah",
      picName: "Fah",
      targetShare: 0.24,
      mtdShares: { budget: 0.25, videos: 0.23, gmv: 0.18, views: 0.21, s: 0.16, a: 0.21, b: 0.26 },
      ai: "发布数量尚可但GMV贡献偏低。先修复产品卖点和购买CTA，再决定是否补量。",
    },
  ],
  "dermabloom-ph": [
    {
      id: "cica-repair-ampoule",
      name: "Cica Repair Ampoule",
      priority: "Hero",
      picId: "ana",
      picName: "Ana",
      targetShare: 0.43,
      mtdShares: { budget: 0.46, videos: 0.38, gmv: 0.34, views: 0.36, s: 0.33, a: 0.36, b: 0.4 },
      ai: "预算投入最高但GMV贡献不足，需立即检查达人质量、Offer和落地页转化。",
    },
    {
      id: "daily-uv-fluid",
      name: "Daily UV Fluid",
      priority: "Growth",
      picId: "bea",
      picName: "Bea",
      targetShare: 0.34,
      mtdShares: { budget: 0.34, videos: 0.36, gmv: 0.37, views: 0.39, s: 0.34, a: 0.38, b: 0.35 },
      ai: "流量效率相对较好，是品牌内优先修复转化并测试加码的产品。",
    },
    {
      id: "peptide-cloud-cream",
      name: "Peptide Cloud Cream",
      priority: "Test",
      picId: "cara",
      picName: "Cara",
      targetShare: 0.23,
      mtdShares: { budget: 0.2, videos: 0.26, gmv: 0.29, views: 0.25, s: 0.33, a: 0.26, b: 0.25 },
      ai: "规模较小但相对效率更健康，可保留为小额增长测试，避免被主产品风险拖累。",
    },
  ],
};

const metricConfig = [
  { key: "budget", label: "Budget", type: "currency", lowerIsBetter: false },
  { key: "videos", label: "Videos", type: "number", lowerIsBetter: false },
  { key: "gmv", label: "GMV", type: "currency", lowerIsBetter: false },
  { key: "roi", label: "ROI", type: "ratio", lowerIsBetter: false },
  { key: "views", label: "Views", type: "compact", lowerIsBetter: false },
  { key: "cpm", label: "CPM", type: "currencySmall", lowerIsBetter: true },
];

const picPublishingGrades = [
  { key: "s", label: "S Tier", shortLabel: "S", costWeight: 4, gmvWeight: 5, viewWeight: 3.2 },
  { key: "a", label: "A Tier", shortLabel: "A", costWeight: 2, gmvWeight: 2.4, viewWeight: 1.8 },
  { key: "b", label: "B Tier", shortLabel: "B", costWeight: 1, gmvWeight: 1, viewWeight: 1 },
];

const publishingResultMetricGroups = [
  { keys: ["videos", "budget"] },
  { keys: ["gmv", "roi"] },
  { keys: ["views", "cpm"] },
];

const publishingResultMetricConfig = [
  { key: "budget", label: "Budget", type: "currency" },
  { key: "videos", label: "Post", type: "number" },
  { key: "gmv", label: "GMV", type: "currency" },
  { key: "roi", label: "ROI", type: "ratio" },
  { key: "views", label: "Views", type: "compact" },
  { key: "cpm", label: "CPM", type: "currencySmall" },
];

const videoStatusConfig = [
  { key: "planning", label: "Planning" },
  { key: "delaySoon", label: "Delay Soon" },
  { key: "delayed", label: "Delayed" },
  { key: "posted", label: "Posted" },
];

const videoPlanPeriods = {
  monthly: [
    { key: "2026-01", label: "Jan", totals: { planning: 1, delaySoon: 1, delayed: 2, posted: 68 } },
    { key: "2026-02", label: "Feb", totals: { planning: 1, delaySoon: 2, delayed: 2, posted: 71 } },
    { key: "2026-03", label: "Mar", totals: { planning: 2, delaySoon: 2, delayed: 2, posted: 75 } },
    { key: "2026-04", label: "Apr", totals: { planning: 2, delaySoon: 3, delayed: 3, posted: 71 } },
    { key: "2026-05", label: "May", totals: { planning: 7, delaySoon: 8, delayed: 5, posted: 68 } },
    { key: "2026-06", label: "Jun MTD", totals: { planning: 22, delaySoon: 11, delayed: 6, posted: 45 } },
  ],
  weekly: [
    { key: "2026-05-11", label: "May 11", totals: { planning: 2, delaySoon: 1, delayed: 1, posted: 8 } },
    { key: "2026-05-18", label: "May 18", totals: { planning: 2, delaySoon: 2, delayed: 1, posted: 10 } },
    { key: "2026-05-25", label: "May 25", totals: { planning: 3, delaySoon: 2, delayed: 2, posted: 11 } },
    { key: "2026-06-01", label: "Jun 1", totals: { planning: 4, delaySoon: 3, delayed: 2, posted: 9 } },
    { key: "2026-06-08", label: "Jun 8", totals: { planning: 5, delaySoon: 3, delayed: 2, posted: 8 } },
    { key: "2026-06-15", label: "Jun 15", totals: { planning: 4, delaySoon: 3, delayed: 1, posted: 10 } },
  ],
};

const publishedVideoContentTypes = [
  { key: "seeding", label: "Seeding" },
  { key: "seeding-entertainment", label: "Seeding Entertainment" },
  { key: "entertainment", label: "Entertainment" },
];

const publishedVideoAngles = ["Content Angle A", "Content Angle B", "Content Angle C"];

const publishedVideoDemoRows = [
  {
    videoId: "76060218451001",
    creatorName: "nisa.hydrate",
    grade: "A",
    productId: "serum-spray",
    postDate: "2026-06-02",
    cost: 360,
    gmv: 3400,
    views: 175000,
    contentType: "seeding",
    angle: "Content Angle A",
  },
  {
    videoId: "76060420378012",
    creatorName: "cilla.glow",
    grade: "B",
    productId: "serum-spray",
    postDate: "2026-06-04",
    cost: 180,
    gmv: 1420,
    views: 92000,
    contentType: "seeding-entertainment",
    angle: "Content Angle B",
  },
  {
    videoId: "76060615192031",
    creatorName: "rani.skin",
    grade: "B",
    productId: "day-cream",
    postDate: "2026-06-06",
    cost: 140,
    gmv: 760,
    views: 70000,
    contentType: "entertainment",
    angle: "Content Angle C",
  },
  {
    videoId: "76060821964044",
    creatorName: "mega.beauty",
    grade: "S",
    productId: "serum-spray",
    postDate: "2026-06-08",
    cost: 780,
    gmv: 7200,
    views: 340000,
    contentType: "seeding",
    angle: "Content Angle A",
  },
  {
    videoId: "76061017325055",
    creatorName: "naya.daily",
    grade: "A",
    productId: "day-cream",
    postDate: "2026-06-10",
    cost: 300,
    gmv: 2250,
    views: 150000,
    contentType: "seeding-entertainment",
    angle: "Content Angle B",
  },
  {
    videoId: "76061222871068",
    creatorName: "lani.review",
    grade: "B",
    productId: "serum-spray",
    postDate: "2026-06-12",
    cost: 160,
    gmv: 1320,
    views: 88000,
    contentType: "entertainment",
    angle: "Content Angle A",
  },
  {
    videoId: "76061419483072",
    creatorName: "fira.skin",
    grade: "A",
    productId: "day-cream",
    postDate: "2026-06-14",
    cost: 280,
    gmv: 1800,
    views: 132000,
    contentType: "seeding",
    angle: "Content Angle C",
  },
  {
    videoId: "76061523741083",
    creatorName: "putri.glow",
    grade: "A",
    productId: "serum-spray",
    postDate: "2026-06-15",
    cost: 320,
    gmv: 2880,
    views: 168000,
    contentType: "seeding-entertainment",
    angle: "Content Angle B",
  },
  {
    videoId: "76061616592094",
    creatorName: "dea.daily",
    grade: "B",
    productId: "day-cream",
    postDate: "2026-06-16",
    cost: 150,
    gmv: 900,
    views: 76000,
    contentType: "entertainment",
    angle: "Content Angle C",
  },
  {
    videoId: "76061721453106",
    creatorName: "bella.skin",
    grade: "S",
    productId: "day-cream",
    postDate: "2026-06-17",
    cost: 850,
    gmv: 5100,
    views: 260000,
    contentType: "seeding",
    angle: "Content Angle A",
  },
];

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function pct(value, digits = 0) {
  if (!Number.isFinite(value)) return "-";
  return `${(value * 100).toFixed(digits)}%`;
}

function signedPct(value, digits = 0) {
  if (!Number.isFinite(value)) return "-";
  if (Math.abs(value) < 0.005) return "0%";
  return `${value > 0 ? "+" : "−"}${pct(Math.abs(value), digits)}`;
}

function statusLabelEn(status) {
  if (status === "green") return "On Track";
  if (status === "yellow") return "Watch";
  return "At Risk";
}

function deltaPct(current, previous) {
  if (!previous) return 0;
  return (current - previous) / previous;
}

function fmt(value, type = "number") {
  if (!Number.isFinite(value)) return "-";
  if (type === "currency") return `$${compact(value)}`;
  if (type === "currencySmall") return `$${value.toFixed(2)}`;
  if (type === "compact") return compact(value);
  if (type === "ratio") return value.toFixed(2);
  if (type === "percent") return pct(value);
  return Math.round(value).toLocaleString("en-US");
}

function compact(value) {
  const abs = Math.abs(value);
  if (abs >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (abs >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return Math.round(value).toLocaleString("en-US");
}

function formatDate(date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).format(date);
}

function withDerived(metrics) {
  const safe = { budget: 0, videos: 0, gmv: 0, views: 0, s: 0, a: 0, b: 0, ...metrics };
  return {
    ...safe,
    roi: safe.budget > 0 ? safe.gmv / safe.budget : 0,
    cpm: safe.views > 0 ? (safe.budget / safe.views) * 1000 : 0,
  };
}

function sumMetrics(products, periodKey) {
  return withDerived(
    products.reduce(
      (acc, product) => {
        const item = product[periodKey];
        acc.budget += item.budget;
        acc.videos += item.videos;
        acc.gmv += item.gmv;
        acc.views += item.views;
        acc.s += item.s;
        acc.a += item.a;
        acc.b += item.b;
        return acc;
      },
      { budget: 0, videos: 0, gmv: 0, views: 0, s: 0, a: 0, b: 0 },
    ),
  );
}

function sumTargets(products) {
  return withDerived(
    products.reduce(
      (acc, product) => {
        acc.budget += product.target.budget;
        acc.videos += product.target.videos;
        acc.gmv += product.target.gmv;
        acc.views += product.target.views;
        acc.s += product.target.s;
        acc.a += product.target.a;
        acc.b += product.target.b;
        return acc;
      },
      { budget: 0, videos: 0, gmv: 0, views: 0, s: 0, a: 0, b: 0 },
    ),
  );
}

function periodTarget(target, days) {
  const ratio = days / DAYS_IN_MONTH;
  return withDerived({
    budget: target.budget * ratio,
    videos: target.videos * ratio,
    gmv: target.gmv * ratio,
    views: target.views * ratio,
    s: target.s * ratio,
    a: target.a * ratio,
    b: target.b * ratio,
  });
}

function sumGst(rows, periodKey) {
  return withDerived(
    rows.reduce(
      (acc, row) => {
        const item = row[periodKey];
        acc.budget += item.budget;
        acc.videos += item.videos;
        acc.gmv += item.gmv;
        acc.views += item.views;
        acc.s += item.s;
        acc.a += item.a;
        acc.b += item.b;
        return acc;
      },
      { budget: 0, videos: 0, gmv: 0, views: 0, s: 0, a: 0, b: 0 },
    ),
  );
}

function sumGstTargets(rows) {
  return withDerived(
    rows.reduce(
      (acc, row) => {
        acc.budget += row.target.budget;
        acc.videos += row.target.videos;
        acc.gmv += row.target.gmv;
        acc.views += row.target.views;
        acc.s += row.target.s;
        acc.a += row.target.a;
        acc.b += row.target.b;
        return acc;
      },
      { budget: 0, videos: 0, gmv: 0, views: 0, s: 0, a: 0, b: 0 },
    ),
  );
}

function getBrand() {
  return demoData.brands.find((brand) => brand.id === state.brandId);
}

function getProducts() {
  return demoData.products;
}

function getPic(picId = state.picId) {
  return demoData.pics.find((pic) => pic.id === picId);
}

function getPicProducts(picId = state.picId) {
  return getProducts().filter((product) => product.picId === picId);
}

function getPicDashboardProducts(picId = state.picId) {
  return picDashboardDemoProducts[picId] || getPicProducts(picId);
}

function getBrandPublishingProducts() {
  return picDashboardDemoProducts.nadia.map((product) => ({
    ...product,
    picBreakdown: brandPublishingPicBreakdown[product.id] || [],
  }));
}

function allocateMetrics(total, blueprints, periodKey) {
  const metricKeys = ["budget", "videos", "gmv", "views", "s", "a", "b"];
  const allocated = blueprints.map(() => ({}));

  metricKeys.forEach((metricKey) => {
    const weights = blueprints.map((blueprint) =>
      periodKey === "target"
        ? blueprint.targetShare
        : blueprint.mtdShares?.[metricKey] ?? blueprint.targetShare,
    );
    const weightTotal = weights.reduce((sum, weight) => sum + weight, 0) || 1;
    let remaining = Math.round(total[metricKey] || 0);

    blueprints.forEach((blueprint, index) => {
      const value =
        index === blueprints.length - 1
          ? remaining
          : Math.round((total[metricKey] || 0) * (weights[index] / weightTotal));
      allocated[index][metricKey] = value;
      remaining -= value;
    });
  });

  return allocated;
}

function getGstProducts(rows) {
  return rows.flatMap((brand) => {
    if (brand.id === "glowsicha-id") {
      return demoData.products.map((product) => ({
        ...product,
        brandId: brand.id,
        brandName: brand.name,
        market: brand.market,
        picName: getPic(product.picId).name,
        target: withDerived(product.target),
        mtd: withDerived(product.mtd),
      }));
    }

    const blueprints = gstProductBlueprints[brand.id] || [];
    const targets = allocateMetrics(brand.target, blueprints, "target");
    const actuals = allocateMetrics(brand.mtd, blueprints, "mtd");

    return blueprints.map((blueprint, index) => ({
      ...blueprint,
      brandId: brand.id,
      brandName: brand.name,
      market: brand.market,
      target: withDerived(targets[index]),
      mtd: withDerived(actuals[index]),
    }));
  });
}

function getPublishingResultAction(actual, target) {
  const timeProgress = MTD_DAYS / DAYS_IN_MONTH;
  if (actual.videos / target.videos < timeProgress * 0.85) return "补发布排期";
  if (actual.gmv / target.gmv < timeProgress * 0.85) return "修复内容与Offer";
  if (actual.roi < target.roi * 0.9) return "复盘达人质量与CTA";
  if (actual.cpm > target.cpm * 1.08) return "控制高CPM内容";
  return "进入加码候选";
}

function getGstPicRows(products) {
  const picMap = new Map();

  products.forEach((product) => {
    const key = `${product.brandId}:${product.picId}`;
    if (!picMap.has(key)) {
      picMap.set(key, {
        id: product.picId,
        name: product.picName,
        brandId: product.brandId,
        brandName: product.brandName,
        market: product.market,
        products: [],
        target: { budget: 0, videos: 0, gmv: 0, views: 0, s: 0, a: 0, b: 0 },
        mtd: { budget: 0, videos: 0, gmv: 0, views: 0, s: 0, a: 0, b: 0 },
      });
    }

    const pic = picMap.get(key);
    pic.products.push(product.name);
    ["budget", "videos", "gmv", "views", "s", "a", "b"].forEach((metricKey) => {
      pic.target[metricKey] += product.target[metricKey];
      pic.mtd[metricKey] += product.mtd[metricKey];
    });
  });

  return Array.from(picMap.values()).map((pic) => ({
    ...pic,
    target: withDerived(pic.target),
    mtd: withDerived(pic.mtd),
  }));
}

function trendSeries(finalValue, days = MTD_DAYS, bias = 0) {
  const values = [];
  let last = 0;
  for (let day = 1; day <= days; day += 1) {
    const progress = day / days;
    const curve = progress * (0.78 + progress * 0.22);
    const wave = 1 + Math.sin(day * 1.37 + bias) * 0.035;
    const value = Math.max(last, finalValue * curve * wave);
    values.push(value);
    last = value;
  }
  values[values.length - 1] = finalValue;
  return values;
}

function svgPolyline(values, maxValue, color) {
  const width = 640;
  const height = 190;
  const padX = 22;
  const padY = 18;
  const points = values
    .map((value, index) => {
      const x = padX + (index / Math.max(values.length - 1, 1)) * (width - padX * 2);
      const y = height - padY - (value / maxValue) * (height - padY * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return `<polyline points="${points}" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline>`;
}

function renderTrendPanel(title, description, actualValue, targetValue, previousValue, type = "currency") {
  const actualSeries = trendSeries(actualValue, MTD_DAYS, 0.2);
  const targetSeries = Array.from({ length: MTD_DAYS }, (_, index) => targetValue * ((index + 1) / DAYS_IN_MONTH));
  const previousSeries = trendSeries(previousValue, MTD_DAYS, 1.7);
  const maxValue = Math.max(...actualSeries, ...targetSeries, ...previousSeries) * 1.12;

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${title}</h2>
          <p>${description}</p>
        </div>
        <span class="pill blue">Marketing 2.5 style</span>
      </div>
      <div class="line-chart" role="img" aria-label="${title}">
        <svg viewBox="0 0 640 190" preserveAspectRatio="none">
          <line x1="22" y1="154" x2="618" y2="154" class="chart-grid"></line>
          <line x1="22" y1="94" x2="618" y2="94" class="chart-grid"></line>
          <line x1="22" y1="34" x2="618" y2="34" class="chart-grid"></line>
          ${svgPolyline(targetSeries, maxValue, "#94a3b8")}
          ${svgPolyline(previousSeries, maxValue, "#0f9f6e")}
          ${svgPolyline(actualSeries, maxValue, "#2563eb")}
        </svg>
      </div>
      <div class="chart-legend">
        <span><i class="legend-blue"></i>MTD ${fmt(actualValue, type)}</span>
        <span><i class="legend-gray"></i>Target pace ${fmt(targetValue * (MTD_DAYS / DAYS_IN_MONTH), type)}</span>
        <span><i class="legend-green"></i>Last month same period ${fmt(previousValue, type)}</span>
      </div>
    </section>
  `;
}

function renderContributionChart(title, description, rows, type = "currency") {
  const maxValue = Math.max(...rows.map((row) => row.value), 1);
  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${title}</h2>
          <p>${description}</p>
        </div>
      </div>
      <div class="big-bars">
        ${rows
          .map((row) => `
            <div class="big-bar-row">
              <div>
                <strong>${row.label}</strong>
                <span>${row.sub}</span>
              </div>
              <div class="big-bar-track">
                <div class="big-bar-fill ${row.status}" style="width:${Math.max(6, (row.value / maxValue) * 100)}%"></div>
              </div>
              <strong>${fmt(row.value, type)}</strong>
            </div>
          `)
          .join("")}
      </div>
    </section>
  `;
}

function renderMatrixPanel(title, description, rows) {
  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${title}</h2>
          <p>${description}</p>
        </div>
      </div>
      <div class="matrix-grid">
        ${rows
          .map((row) => `
            <article class="matrix-card ${row.status}">
              <div class="matrix-top">
                <strong>${row.title}</strong>
                ${riskPill(row.status)}
              </div>
              <p>${row.subtitle}</p>
              <div class="matrix-metrics">
                <span>GMV ${row.gmv}</span>
                <span>ROI ${row.roi}</span>
                <span>Video ${row.videos}</span>
              </div>
            </article>
          `)
          .join("")}
      </div>
    </section>
  `;
}

function renderAiReports(role, weekly, monthly) {
  const reports = [
    { label: "AI周报", ...weekly },
    { label: "AI月报", ...monthly },
  ];
  const statusLabel = {
    green: "健康",
    yellow: "需关注",
    red: "高风险",
    blue: "总结",
  };

  return `
    <section class="panel ai-panel">
      <div class="panel-header">
        <div>
          <h2>${role} AI周报 / AI月报</h2>
          <p class="muted">默认展示汇报摘要；点击卡片展开后，按 1/2/3 查看目标达成、Gap诊断和行动建议。</p>
        </div>
      </div>
      <div class="ai-report-grid">
        ${reports
          .map((report) => `
            <details class="ai-report-card">
              <summary>
                <div class="report-card-head">
                  <span class="report-label">${report.label}</span>
                  <span class="report-status ${report.status || "blue"}">${statusLabel[report.status || "blue"]}</span>
                </div>
                <h3>${report.title}</h3>
                <p>${report.summary}</p>
                <div class="report-summary-list">
                  ${report.sections
                    .map((section, index) => `
                      <span>
                        <b>${index + 1}</b>
                        <em>${section.icon}</em>
                        ${section.summary}
                      </span>
                    `)
                    .join("")}
                </div>
                ${
                  report.perspectives
                    ? `
                      <div class="report-focus-strip">
                        <span>重点透视</span>
                        ${report.perspectives
                          .map((item) => `<b>${item.icon}</b>`)
                          .join("")}
                      </div>
                    `
                    : ""
                }
                <span class="expand-hint">点击展开详细分析</span>
              </summary>
              <div class="report-detail">
                <ol class="report-steps">
                  ${report.sections
                    .map((section, index) => `
                      <li>
                        <div class="step-badge">${index + 1}</div>
                        <div>
                          <h4>${section.icon} · ${section.title}</h4>
                          <p>${section.body}</p>
                          <ul>
                            ${section.details.map((detail) => `<li>${detail}</li>`).join("")}
                          </ul>
                        </div>
                      </li>
                    `)
                    .join("")}
                </ol>
                ${
                  report.perspectives
                    ? `
                      <div class="report-focus">
                        <div class="report-focus-header">
                          <h4>重点管理透视</h4>
                          <p>从关键对象、诊断结论和管理动作三个层面形成可执行意见。</p>
                        </div>
                        <div class="focus-table">
                          <div class="focus-table-head">
                            <span>透视对象</span>
                            <span>关键诊断</span>
                            <span>管理动作</span>
                            <span>优先级</span>
                          </div>
                          ${report.perspectives
                            .map((item) => `
                              <div class="focus-row ${item.status || "blue"}">
                                <div class="focus-object">
                                  <b>${item.icon}</b>
                                  <span>${item.title}</span>
                                </div>
                                <div class="focus-diagnosis">
                                  <strong>${item.headline}</strong>
                                  <p>${item.body}</p>
                                </div>
                                <div class="focus-action">${item.action}</div>
                                <div><span class="focus-priority ${item.status || "blue"}">${statusLabel[item.status || "blue"]}</span></div>
                              </div>
                            `)
                            .join("")}
                        </div>
                      </div>
                    `
                    : ""
                }
                ${
                  report.managementOpinion
                    ? `
                      <div class="management-opinion">
                        <h4>${report.managementOpinion.title}</h4>
                        <p>${report.managementOpinion.body}</p>
                        <ul>
                          ${report.managementOpinion.points.map((point) => `<li>${point}</li>`).join("")}
                        </ul>
                      </div>
                    `
                    : ""
                }
              </div>
            </details>
          `)
          .join("")}
      </div>
    </section>
  `;
}


function achievement(actual, target, key) {
  if (key === "roi") return actual.roi / target.roi;
  if (key === "cpm") return target.cpm / actual.cpm;
  return actual[key] / target[key];
}

function rawTargetRatio(actual, target, key) {
  if (key === "roi") return actual.roi / target.roi;
  if (key === "cpm") return actual.cpm / target.cpm;
  return actual[key] / target[key];
}

function statusFor(actual, target, key, timeProgress = MTD_DAYS / DAYS_IN_MONTH) {
  if (key === "budget") {
    const usage = actual.budget / target.budget;
    const roiHealthy = actual.roi >= target.roi * 0.95;
    if (usage <= timeProgress + 0.08 && roiHealthy) return "green";
    if (usage <= timeProgress + 0.14) return "yellow";
    return "red";
  }

  if (key === "cpm") {
    const ratio = actual.cpm / target.cpm;
    if (ratio <= 1) return "green";
    if (ratio <= 1.12) return "yellow";
    return "red";
  }

  if (key === "roi") {
    const ratio = actual.roi / target.roi;
    if (ratio >= 1) return "green";
    if (ratio >= 0.9) return "yellow";
    return "red";
  }

  const ratio = actual[key] / target[key];
  if (ratio >= timeProgress) return "green";
  if (ratio >= timeProgress * 0.85) return "yellow";
  return "red";
}

function riskPill(status) {
  const label = status === "green" ? "健康" : status === "yellow" ? "关注" : "风险";
  return `<span class="pill ${status}">${label}</span>`;
}

function riskPillEn(status) {
  return `<span class="pill ${status}">${statusLabelEn(status)}</span>`;
}

function renderProgress(value, status = "green") {
  const safeValue = Math.max(0, Math.min(1.2, value));
  return `<div class="progress ${status}"><span style="width:${Math.min(safeValue, 1) * 100}%"></span></div>`;
}

function renderKpiCards(actual, target, comparison) {
  return `
    <div class="kpi-grid">
      ${metricConfig
        .map((metric) => {
          const key = metric.key;
          const status = statusFor(actual, target, key);
          const actualValue = key === "roi" || key === "cpm" ? actual[key] : actual[key];
          const targetValue = key === "roi" || key === "cpm" ? target[key] : target[key];
          const ach = rawTargetRatio(actual, target, key);
          const compareValue = comparison
            ? deltaPct(actualValue, comparison[key] || 0)
            : 0;
          const deltaClass = compareValue > 0 ? "up" : compareValue < 0 ? "down" : "neutral";
          const comparisonLabel =
            key === "cpm"
              ? compareValue <= 0
                ? `较上月 ${pct(compareValue)}`
                : `较上月 +${pct(compareValue)}`
              : compareValue >= 0
                ? `较上月 +${pct(compareValue)}`
                : `较上月 ${pct(compareValue)}`;

          return `
            <article class="kpi-card">
              <div class="kpi-top">
                <span class="kpi-name">${metric.label}</span>
                <span class="status-dot status-${status}" aria-label="${status}"></span>
              </div>
              <div class="kpi-value">${fmt(actualValue, metric.type)}</div>
              <div class="kpi-meta">
                <span>Target ${fmt(targetValue, metric.type)}</span>
                ${renderProgress(Math.min(ach, 1), status)}
                <span>${key === "cpm" ? "目标比" : "达成率"} ${pct(ach)}</span>
                <span class="delta ${deltaClass}">${comparisonLabel}</span>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderMtdPanel(actual, target) {
  const timeProgress = MTD_DAYS / DAYS_IN_MONTH;
  const rows = [
    ["Budget", actual.budget / target.budget, fmt(actual.budget, "currency"), fmt(target.budget, "currency")],
    ["Videos", actual.videos / target.videos, fmt(actual.videos), fmt(target.videos)],
    ["GMV", actual.gmv / target.gmv, fmt(actual.gmv, "currency"), fmt(target.gmv, "currency")],
    ["ROI", actual.roi / target.roi, fmt(actual.roi, "ratio"), fmt(target.roi, "ratio")],
    ["Views", actual.views / target.views, fmt(actual.views, "compact"), fmt(target.views, "compact")],
    ["CPM", target.cpm / actual.cpm, fmt(actual.cpm, "currencySmall"), fmt(target.cpm, "currencySmall")],
    ["S Videos", actual.s / target.s, fmt(actual.s), fmt(target.s)],
    ["A Videos", actual.a / target.a, fmt(actual.a), fmt(target.a)],
    ["B Videos", actual.b / target.b, fmt(actual.b), fmt(target.b)],
  ];

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>月度 MTD 达成</h2>
          <p>截至 ${formatDate(DEMO_DATE)}，时间进度 ${pct(timeProgress)}。蓝线代表当前应有进度。</p>
        </div>
        <span class="time-marker">Day ${MTD_DAYS}/${DAYS_IN_MONTH}</span>
      </div>
      <div class="metric-list">
        ${rows
          .map(([label, value, actualText, targetText]) => {
            const status = value >= timeProgress ? "green" : value >= timeProgress * 0.85 ? "yellow" : "red";
            return `
              <div class="metric-row">
                <strong>${label}</strong>
                ${renderProgress(value, status)}
                <span class="num">${actualText}</span>
                <span class="num">${targetText}</span>
              </div>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function renderComparison(title, description, current, previous, target) {
  const items = [
    { key: "videos", label: "Videos", type: "number" },
    { key: "gmv", label: "GMV", type: "currency" },
    { key: "roi", label: "ROI", type: "ratio" },
    { key: "views", label: "Views", type: "compact" },
    { key: "cpm", label: "CPM", type: "currencySmall" },
    { key: "budget", label: "Budget", type: "currency" },
  ];

  const bars = items
    .slice(0, 4)
    .map((item) => {
      const ach = item.key === "roi" || item.key === "cpm" ? current[item.key] / target[item.key] : current[item.key] / target[item.key];
      const status = item.key === "cpm" ? (current.cpm <= target.cpm ? "green" : "yellow") : ach >= 1 ? "green" : ach >= 0.85 ? "yellow" : "red";
      return `
        <div class="bar-row">
          <span>${item.label}</span>
          <div class="bar-track"><div class="bar-fill ${status}" style="width:${Math.min(ach, 1.15) * 100}%"></div></div>
          <strong>${pct(ach)}</strong>
        </div>
      `;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${title}</h2>
          <p>${description}</p>
        </div>
      </div>
      <div class="comparison-grid">
        ${items
          .map((item) => {
            const d = deltaPct(current[item.key], previous[item.key]);
            const goodDown = item.key === "cpm";
            const deltaClass = Math.abs(d) < 0.001 ? "neutral" : goodDown ? (d <= 0 ? "up" : "down") : d >= 0 ? "up" : "down";
            const sign = d > 0 ? "+" : "";
            return `
              <div class="compare-item">
                <div class="compare-label">${item.label}</div>
                <div class="compare-values">
                  <strong>${fmt(current[item.key], item.type)}</strong>
                  <span class="delta ${deltaClass}">${sign}${pct(d)}</span>
                </div>
                <p class="muted">上月 ${fmt(previous[item.key], item.type)}</p>
              </div>
            `;
          })
          .join("")}
      </div>
      <div class="bars">${bars}</div>
    </section>
  `;
}

function renderProductTable(products) {
  const rows = products
    .map((product) => {
      const actual = withDerived(product.mtd);
      const target = withDerived(product.target);
      const pic = getPic(product.picId);
      const risk = overallStatus(actual, target);
      return `
        <tr class="clickable" data-product-id="${product.id}">
          <td><strong>${product.name}</strong></td>
          <td>${product.priority}</td>
          <td>${pic.name}</td>
          <td>${pct(actual.budget / target.budget)}</td>
          <td>${pct(actual.videos / target.videos)}</td>
          <td>${pct(actual.gmv / target.gmv)}</td>
          <td>${fmt(actual.roi, "ratio")}</td>
          <td>${pct(actual.views / target.views)}</td>
          <td>${fmt(actual.cpm, "currencySmall")}</td>
          <td>${actual.s}/${target.s} · ${actual.a}/${target.a} · ${actual.b}/${target.b}</td>
          <td>${riskPill(risk)}</td>
        </tr>
      `;
    })
    .join("");

  const selected = products.find((product) => product.id === state.selectedProductId) || products[0];

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>产品透视</h2>
          <p>默认展示所有产品，点击行可查看产品AI诊断。</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Priority</th>
              <th>PIC</th>
              <th>Budget</th>
              <th>Videos</th>
              <th>GMV</th>
              <th>ROI</th>
              <th>Views</th>
              <th>CPM</th>
              <th>S/A/B</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <div class="product-note">
        <p class="muted"><strong>${selected.name} AI Insight：</strong>${selected.ai}</p>
      </div>
    </section>
  `;
}

function renderPicTable(products) {
  const rows = demoData.pics
    .map((pic) => {
      const picProducts = products.filter((product) => product.picId === pic.id);
      const actual = sumMetrics(picProducts, "mtd");
      const target = sumTargets(picProducts);
      const score = target.gmv ? (actual.gmv / target.gmv) * 0.45 + (actual.videos / target.videos) * 0.25 + (actual.roi / target.roi) * 0.2 + (actual.views / target.views) * 0.1 : 0;
      const risk = overallStatus(actual, target);
      const riskProducts = picProducts
        .filter((product) => overallStatus(withDerived(product.mtd), withDerived(product.target)) !== "green")
        .map((product) => product.name)
        .join("、") || "暂无";
      return `
        <tr>
          <td><strong>${pic.name}</strong></td>
          <td>${picProducts.map((p) => p.name).join("、")}</td>
          <td>${fmt(actual.budget, "currency")}</td>
          <td>${fmt(actual.videos)}</td>
          <td>${fmt(actual.gmv, "currency")}</td>
          <td>${fmt(actual.roi, "ratio")}</td>
          <td>${fmt(actual.views, "compact")}</td>
          <td>${fmt(actual.cpm, "currencySmall")}</td>
          <td>${pct(score)}</td>
          <td>${riskProducts}</td>
          <td>${riskPill(risk)}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>PIC透视</h2>
          <p>默认按风险识别管理重点，帮助 Brand Leader 快速找到需要支持的人。</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>PIC</th>
              <th>Products</th>
              <th>Budget</th>
              <th>Videos</th>
              <th>GMV</th>
              <th>ROI</th>
              <th>Views</th>
              <th>CPM</th>
              <th>Score</th>
              <th>Risk Products</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function overallStatus(actual, target) {
  const checks = [
    statusFor(actual, target, "videos"),
    statusFor(actual, target, "gmv"),
    statusFor(actual, target, "roi"),
    statusFor(actual, target, "views"),
    statusFor(actual, target, "cpm"),
  ];
  if (checks.includes("red")) return "red";
  if (checks.includes("yellow")) return "yellow";
  return "green";
}

function renderGradeStructure(actual, target) {
  const totalActual = actual.s + actual.a + actual.b;
  const totalTarget = target.s + target.a + target.b;
  const targetSegs = [
    ["S", target.s, "seg-s"],
    ["A", target.a, "seg-a"],
    ["B", target.b, "seg-b"],
  ];
  const actualSegs = [
    ["S", actual.s, "seg-s"],
    ["A", actual.a, "seg-a"],
    ["B", actual.b, "seg-b"],
  ];

  const renderStack = (label, rows, total) => `
    <div class="stacked-bar">
      <strong>${label}</strong>
      <div class="stack">
        ${rows
          .map(([name, value, klass]) => `<span class="${klass}" title="${name}: ${Math.round(value)}" style="width:${(value / total) * 100}%"></span>`)
          .join("")}
      </div>
      <span>${Math.round(total)} videos</span>
    </div>
  `;

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>S/A/B 达人等级视频结构</h2>
          <p>达人等级目标以视频数拆解，用来判断内容结构是否健康。</p>
        </div>
      </div>
      <div class="stacked-bars">
        ${renderStack("Target", targetSegs, totalTarget)}
        ${renderStack("Actual", actualSegs, totalActual)}
      </div>
      <div class="legend">
        <span><i class="seg-s"></i>S级视频 ${Math.round(actual.s)}/${Math.round(target.s)}</span>
        <span><i class="seg-a"></i>A级视频 ${Math.round(actual.a)}/${Math.round(target.a)}</span>
        <span><i class="seg-b"></i>B级视频 ${Math.round(actual.b)}/${Math.round(target.b)}</span>
      </div>
    </section>
  `;
}

function renderProductContribution(products) {
  const rows = products
    .map((product) => {
      const actual = withDerived(product.mtd);
      const target = withDerived(product.target);
      return {
        label: product.name,
        sub: `${getPic(product.picId).name} · ${product.priority} · GMV ${pct(actual.gmv / target.gmv)}`,
        value: actual.gmv,
        status: overallStatus(actual, target),
      };
    })
    .sort((a, b) => b.value - a.value);

  return renderContributionChart(
    "产品GMV贡献",
    "模仿 Marketing 2.5 的贡献排行视图：先看谁贡献最大，再看是否健康。",
    rows,
    "currency",
  );
}

function renderPicContribution(products) {
  const rows = demoData.pics
    .map((pic) => {
      const picProducts = products.filter((product) => product.picId === pic.id);
      const actual = sumMetrics(picProducts, "mtd");
      const target = sumTargets(picProducts);
      return {
        label: pic.name,
        sub: `${picProducts.map((product) => product.name).join("、")} · ROI ${fmt(actual.roi, "ratio")}`,
        value: actual.gmv,
        status: overallStatus(actual, target),
      };
    })
    .sort((a, b) => b.value - a.value);

  return renderContributionChart(
    "PIC GMV贡献",
    "高层和Brand Leader都需要快速看到执行贡献与风险PIC。",
    rows,
    "currency",
  );
}

function renderProductPicMatrix(products) {
  const rows = products.map((product) => {
    const actual = withDerived(product.mtd);
    const target = withDerived(product.target);
    return {
      title: product.name,
      subtitle: `${getPic(product.picId).name} · ${product.priority}`,
      status: overallStatus(actual, target),
      gmv: pct(actual.gmv / target.gmv),
      roi: fmt(actual.roi, "ratio"),
      videos: `${actual.videos}/${target.videos}`,
    };
  });

  return renderMatrixPanel(
    "产品 x PIC 执行矩阵",
    "适合复刻 Marketing 2.5 的品牌/PIC分析经验：一眼看清产品、负责人、风险状态。",
    rows,
  );
}

function renderLeaderAiReports(actual, target, products, lastWeek, lmLastWeek) {
  const worstProduct = [...products].sort((a, b) => a.mtd.gmv / a.target.gmv - b.mtd.gmv / b.target.gmv)[0];
  const bestProduct = [...products].sort((a, b) => b.mtd.gmv / b.target.gmv - a.mtd.gmv / a.target.gmv)[0];
  const weekDelta = deltaPct(lastWeek.gmv, lmLastWeek.gmv);
  const worstPic = getPic(worstProduct.picId);
  const picRows = demoData.pics.map((pic) => {
    const picProducts = products.filter((product) => product.picId === pic.id);
    const picActual = sumMetrics(picProducts, "mtd");
    const picTarget = sumTargets(picProducts);
    return { pic, actual: picActual, target: picTarget, score: picActual.gmv / picTarget.gmv };
  });
  const strongestPic = [...picRows].sort((a, b) => b.score - a.score)[0];
  const weakestPic = [...picRows].sort((a, b) => a.score - b.score)[0];
  const sGap = Math.max(target.s - actual.s, 0);
  const aGap = Math.max(target.a - actual.a, 0);
  const bGap = Math.max(target.b - actual.b, 0);

  return renderAiReports(
    "Brand Leader",
    {
      status: weekDelta >= 0 ? "yellow" : "red",
      title: "上周品牌增长有亮点，但结构性Gap仍需管理介入",
      summary: `上周品牌GMV为 ${fmt(lastWeek.gmv, "currency")}，较上月对应周 ${weekDelta >= 0 ? "增长" : "下降"} ${pct(Math.abs(weekDelta))}。本周重点不是单纯补视频，而是修复A/S级内容结构与低ROI产品。`,
      sections: [
        {
          icon: "Target",
          title: "目标达成",
          summary: `周GMV ${fmt(lastWeek.gmv, "currency")}`,
          body: `上周GMV ${fmt(lastWeek.gmv, "currency")}，与上月对应周相比${weekDelta >= 0 ? "提升" : "下降"} ${pct(Math.abs(weekDelta))}。${bestProduct.name} 是当前相对健康产品。`,
          details: [
            `${bestProduct.name} 可作为本周内容结构和达人组合的复用样本。`,
            `视频数量基本能支撑周度节奏，但质量结构仍不均衡。`,
            `Views增长需要继续和GMV、ROI一起判断，避免只看曝光。`,
          ],
        },
        {
          icon: "Gap",
          title: "Gap诊断",
          summary: `${worstProduct.name} 拖累GMV`,
          body: `${worstProduct.name} 是主要Gap来源，说明问题集中在产品/PIC组合，而不是全品牌执行失效。`,
          details: [
            `A/S级视频不足会影响信任背书和稳定转化。`,
            `低ROI视频需要单独复盘达人等级、Hook、CTA和Offer。`,
            `如果只补B级视频，可能提升Views但不能解决GMV缺口。`,
          ],
        },
        {
          icon: "Action",
          title: "行动建议",
          summary: "先修复风险产品",
          body: "本周建议先把管理动作集中到风险产品和风险PIC，不建议平均分配资源。",
          details: [
            `要求 ${getPic(worstProduct.picId).name} 提交 ${worstProduct.name} 的本周补量和转化修复计划。`,
            `把预算从高CPM低ROI视频转向ROI更稳定的达人组合。`,
            `复用 ${bestProduct.name} 的有效内容结构，形成下周Brief模板。`,
          ],
        },
      ],
      perspectives: [
        {
          icon: "Product",
          status: "red",
          title: "重点产品透视",
          headline: `${worstProduct.name} 是周度管理优先级`,
          body: `该产品GMV达成 ${pct(worstProduct.mtd.gmv / worstProduct.target.gmv)}，低于品牌平均，说明问题集中在产品目标拆解、达人等级结构或Offer转化。`,
          action: `要求 ${worstPic.name} 在本周提交3项恢复动作：补视频、换内容角度、修正购买引导。`,
        },
        {
          icon: "Creator",
          status: sGap + aGap > 0 ? "yellow" : "green",
          title: "达人结构透视",
          headline: `S级缺口 ${Math.ceil(sGap)} 条，A级缺口 ${Math.ceil(aGap)} 条`,
          body: `当前不能只看视频总数，S/A级内容不足会导致信任背书和稳定转化不足，B级内容只能解决密度，不能独立解决GMV Gap。`,
          action: "本周Brief应区分S级背书、A级转化、B级测试，避免所有达人使用同一套脚本。",
        },
        {
          icon: "PIC",
          status: "yellow",
          title: "PIC管理透视",
          headline: `${weakestPic.pic.name} 需要管理跟进，${strongestPic.pic.name} 可提炼打法`,
          body: `${weakestPic.pic.name} 的GMV达成 ${pct(weakestPic.score)}，低于团队平均；${strongestPic.pic.name} 的执行节奏更健康，适合作为复盘样本。`,
          action: "Brand Leader应组织一次15分钟站会：风险PIC讲阻塞，健康PIC讲可复制动作。",
        },
      ],
      managementOpinion: {
        title: "Brand Leader管理意见",
        body: "本周管理重点应从“催发布”升级为“按产品和PIC修复增长链路”。不要平均要求所有人补视频，而是对风险产品建立单独恢复计划。",
        points: [
          `对 ${worstProduct.name} 建立红色跟进：每天更新视频、GMV、ROI、S/A/B结构。`,
          `对 ${bestProduct.name} 提炼可复制Brief，作为下周达人合作模板。`,
          `把PIC会议从结果复盘改成行动复盘：每人只汇报Gap、阻塞、下一步。`,
        ],
      },
    },
    {
      status: actual.gmv / target.gmv >= MTD_DAYS / DAYS_IN_MONTH ? "green" : "yellow",
      title: "MTD进度接近目标节奏，但月底达成仍依赖转化修复",
      summary: `截至MTD，品牌GMV达成 ${pct(actual.gmv / target.gmv)}，按当前速度预计月底完成 ${pct((actual.gmv / MTD_DAYS) * DAYS_IN_MONTH / target.gmv)}。月报应重点解释GMV、ROI和达人等级结构。`,
      sections: [
        {
          icon: "Target",
          title: "目标达成",
          summary: `GMV达成 ${pct(actual.gmv / target.gmv)}`,
          body: `当前GMV达成 ${pct(actual.gmv / target.gmv)}，时间进度为 ${pct(MTD_DAYS / DAYS_IN_MONTH)}，整体处于需要追赶的状态。`,
          details: [
            `视频达成率为 ${pct(actual.videos / target.videos)}，需要判断发布量是否转化为有效GMV。`,
            `当前ROI为 ${fmt(actual.roi, "ratio")}，目标ROI为 ${fmt(target.roi, "ratio")}。`,
            `Views达成 ${pct(actual.views / target.views)}，仍需结合CPM判断获量质量。`,
          ],
        },
        {
          icon: "Gap",
          title: "Gap诊断",
          summary: "GMV和ROI未同步放大",
          body: "月度核心风险是GMV和ROI没有跟上视频数，说明不是单纯补量问题，而是内容质量、达人等级或Offer转化问题。",
          details: [
            `S级视频达成 ${pct(actual.s / target.s)}，不足会影响品牌背书。`,
            `A级视频达成 ${pct(actual.a / target.a)}，会影响稳定转化和中腰部放量。`,
            `B级内容过多但转化弱时，应优化Brief而不是继续盲目补量。`,
          ],
        },
        {
          icon: "Action",
          title: "行动建议",
          summary: "月底按产品分层复盘",
          body: "月报建议按产品角色分层复盘，避免所有产品使用同一套评价标准。",
          details: [
            `Hero产品重点看GMV、ROI、S/A级达人视频结构。`,
            `Test产品重点看ROI、CPM和内容角度是否可复制。`,
            `下月目标拆解时，把风险产品的预算和达人等级结构重新校准。`,
          ],
        },
      ],
      perspectives: [
        {
          icon: "Product",
          status: "yellow",
          title: "产品组合透视",
          headline: "Hero产品看转化，Test产品看可复制性",
          body: `月度目标不能只按GMV排名管理。${bestProduct.name} 应沉淀成功模板，${worstProduct.name} 应判断是否继续加码或调整目标。`,
          action: "月底复盘按Hero/Growth/Test分组，每组给出保留、加码、修复或降级判断。",
        },
        {
          icon: "Creator",
          status: sGap + aGap > 0 ? "yellow" : "green",
          title: "达人资产透视",
          headline: `月底仍需补齐 S ${Math.ceil(sGap)} / A ${Math.ceil(aGap)} / B ${Math.ceil(bGap)} 条`,
          body: "达人资产评估要从一次性发布转向复投能力：看谁能稳定带Views、谁能带GMV、谁适合Spark Ads放大。",
          action: "月报中新增达人池分层：复投名单、观察名单、停止名单。",
        },
        {
          icon: "PIC",
          status: "yellow",
          title: "PIC绩效透视",
          headline: "PIC评价要同时看结果和过程",
          body: "只看GMV会忽略产品难度和目标分配差异；需要结合预算使用、视频进度、ROI、达人结构和阻塞解决速度。",
          action: "下月目标分配时，给每个PIC增加产品难度系数和资源需求备注。",
        },
      ],
      managementOpinion: {
        title: "月度管理意见",
        body: "月报应服务下月目标拆解，而不是只总结过去。Brand Leader需要给出产品优先级调整、达人结构调整和PIC资源配置建议。",
        points: [
          "对GMV达标但ROI偏弱的产品，限制预算增长，先修正转化效率。",
          "对ROI健康但规模小的产品，安排小额加码，验证是否能放量。",
          "对连续两周低于时间进度的PIC，要求明确阻塞来源和需要Leader协调的资源。",
        ],
      },
    },
  );
}

function renderLeaderAi(actual, target, products) {
  const gmvGap = target.gmv * (MTD_DAYS / DAYS_IN_MONTH) - actual.gmv;
  const videoGap = target.videos * (MTD_DAYS / DAYS_IN_MONTH) - actual.videos;
  const worstProduct = [...products].sort((a, b) => a.mtd.gmv / a.target.gmv - b.mtd.gmv / b.target.gmv)[0];
  const worstPic = getPic(worstProduct.picId);

  return `
    <section class="panel ai-panel">
      <div class="panel-header">
        <div>
          <h2>AI 管理建议</h2>
          <p class="muted">根据 MTD、本周、上周、上月同比和目标Gap自动生成。</p>
        </div>
      </div>
      <div class="ai-block">
        <h3>今日管理建议</h3>
        <p>品牌GMV当前达成率为 ${pct(actual.gmv / target.gmv)}，低于时间进度 ${pct(MTD_DAYS / DAYS_IN_MONTH)}。主要风险来自 ${worstProduct.name} 和 ${worstPic.name}，预计需要补足 ${fmt(Math.max(gmvGap, 0), "currency")} GMV 与 ${Math.ceil(Math.max(videoGap, 0))} 条视频，才能回到月度节奏。</p>
      </div>
      <div class="ai-block">
        <h3>本周工作总结</h3>
        <ul>
          <li>Lip Serum ROI健康，适合小幅加码测试。</li>
          <li>PDRN Repair Serum Views较强但转化不足，需要优化Offer和CTA。</li>
          <li>Glow Day Cream视频数落后，应优先补B级达人内容密度。</li>
        </ul>
      </div>
      <div class="ai-block">
        <h3>月度风险预测</h3>
        <p>如果保持当前速度，品牌月底GMV预计完成约 ${pct((actual.gmv / MTD_DAYS) * DAYS_IN_MONTH / target.gmv)}。建议本周把管理重点放在A级达人发布、低ROI预算控制，以及Hero产品的购买引导优化。</p>
      </div>
    </section>
  `;
}

function renderDecisionSummary({ title, description, status = "yellow", metrics = [], actions = [] }) {
  return `
    <section class="decision-summary ${status}">
      <div class="decision-copy">
        <span class="decision-kicker">AI Summary</span>
        <h2>${title}</h2>
        <p>${description}</p>
      </div>
      <div class="decision-metrics">
        ${metrics
          .map((metric) => `
            <div>
              <span>${metric.label}</span>
              <strong>${metric.value}</strong>
            </div>
          `)
          .join("")}
      </div>
      <div class="decision-actions">
        <strong>Next 3 Actions</strong>
        <ol>
          ${actions.map((action) => `<li>${action}</li>`).join("")}
        </ol>
      </div>
    </section>
  `;
}

function renderPicActionSummary(pic, products, actual, target) {
  const weakest = [...products].sort((a, b) => a.mtd.videos / a.target.videos - b.mtd.videos / b.target.videos)[0];
  const videoRate = actual.videos / target.videos;
  const budgetRate = actual.budget / target.budget;
  const efficiencyGap = budgetRate - videoRate;
  const spendLead = `${pct(Math.abs(efficiencyGap))} ${efficiencyGap >= 0 ? "ahead of" : "behind"}`;

  return renderDecisionSummary({
    title: `${pct(videoRate)} of Video Target · Focus on ${weakest.name}`,
    description: `${pic.name} has published ${actual.videos} / ${target.videos} videos and used ${fmt(actual.budget, "currency")} / ${fmt(target.budget, "currency")} of budget. Spend is ${spendLead} video delivery.`,
    status: videoRate >= MTD_DAYS / DAYS_IN_MONTH && efficiencyGap <= 0.05 ? "green" : "yellow",
    metrics: [
      { label: "Video Progress", value: pct(videoRate) },
      { label: "Budget Used", value: pct(budgetRate) },
      { label: "Spend vs Delivery", value: signedPct(efficiencyGap) },
    ],
    actions: [
      `Close the ${weakest.name} video gap and review its creator-tier mix.`,
      `Pause low-confidence spend when budget use runs ahead of delivery.`,
      `Use the Product × Creator Tier view to prioritize the next releases.`,
    ],
  });
}

function renderLeaderManagementSummary(actual, target, products) {
  const worstProduct = [...products].sort((a, b) => a.mtd.gmv / a.target.gmv - b.mtd.gmv / b.target.gmv)[0];
  const bestProduct = [...products].sort((a, b) => b.mtd.roi / b.target.roi - a.mtd.roi / a.target.roi)[0];
  const picRows = demoData.pics.map((pic) => {
    const picProducts = products.filter((product) => product.picId === pic.id);
    const picActual = sumMetrics(picProducts, "mtd");
    const picTarget = sumTargets(picProducts);
    return { pic, score: picActual.gmv / picTarget.gmv, actual: picActual, target: picTarget };
  });
  const riskPic = [...picRows].sort((a, b) => a.score - b.score)[0];

  return renderDecisionSummary({
    title: `品牌整体需管理介入，重点修复 ${worstProduct.name}`,
    description: `这是管理型看板，先判断能不能达成、哪里要介入。当前GMV达成 ${pct(actual.gmv / target.gmv)}，ROI为 ${fmt(actual.roi, "ratio")}；问题集中在产品转化和PIC执行节奏。`,
    status: actual.gmv / target.gmv >= MTD_DAYS / DAYS_IN_MONTH ? "green" : "yellow",
    metrics: [
      { label: "Risk product", value: worstProduct.name },
      { label: "Risk PIC", value: riskPic.pic.name },
      { label: "Healthy sample", value: bestProduct.name },
    ],
    actions: [
      `要求 ${riskPic.pic.name} 提交 ${worstProduct.name} 的48小时恢复计划。`,
      `复用 ${bestProduct.name} 的高ROI内容结构，形成下周Brief模板。`,
      `重新检查S/A级达人视频缺口，避免只用B级达人补量。`,
    ],
  });
}

function healthStatusForRatio(ratio, threshold = MTD_DAYS / DAYS_IN_MONTH) {
  if (ratio >= threshold) return "green";
  if (ratio >= threshold * 0.85) return "yellow";
  return "red";
}

function renderHealthCell(label, value, status) {
  return `
    <td>
      <span class="health-cell ${status}">
        <b>${value}</b>
        <em>${label}</em>
      </span>
    </td>
  `;
}

function renderProductHealthMatrix(products) {
  const rows = products
    .map((product) => {
      const actual = withDerived(product.mtd);
      const target = withDerived(product.target);
      const pic = getPic(product.picId);
      const sabActual = actual.s + actual.a + actual.b;
      const sabTarget = target.s + target.a + target.b;
      return `
        <tr>
          <td><strong>${product.name}</strong><span class="subline">${product.priority} · ${pic.name}</span></td>
          ${renderHealthCell("Videos", pct(actual.videos / target.videos), healthStatusForRatio(actual.videos / target.videos))}
          ${renderHealthCell("GMV", pct(actual.gmv / target.gmv), healthStatusForRatio(actual.gmv / target.gmv))}
          ${renderHealthCell("ROI", fmt(actual.roi, "ratio"), statusFor(actual, target, "roi"))}
          ${renderHealthCell("Views", pct(actual.views / target.views), healthStatusForRatio(actual.views / target.views))}
          ${renderHealthCell("CPM", fmt(actual.cpm, "currencySmall"), statusFor(actual, target, "cpm"))}
          ${renderHealthCell("S/A/B", pct(sabActual / sabTarget), healthStatusForRatio(sabActual / sabTarget))}
        </tr>
      `;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>产品健康矩阵</h2>
          <p>Brand Leader首要判断：哪个产品健康、哪个产品需要介入、问题落在哪个指标。</p>
        </div>
      </div>
      <div class="table-wrap">
        <table class="health-matrix">
          <thead>
            <tr>
              <th>Product</th>
              <th>Videos</th>
              <th>GMV</th>
              <th>ROI</th>
              <th>Views</th>
              <th>CPM</th>
              <th>S/A/B</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderPicPerformanceMatrix(products) {
  const rows = demoData.pics
    .map((pic) => {
      const picProducts = products.filter((product) => product.picId === pic.id);
      const actual = sumMetrics(picProducts, "mtd");
      const target = sumTargets(picProducts);
      const riskProduct =
        [...picProducts].sort((a, b) => a.mtd.gmv / a.target.gmv - b.mtd.gmv / b.target.gmv)[0]?.name || "-";
      const support =
        actual.videos / target.videos < MTD_DAYS / DAYS_IN_MONTH
          ? "Need publishing push"
          : actual.roi < target.roi
            ? "Need offer/content fix"
            : "Share playbook";

      return `
        <tr>
          <td><strong>${pic.name}</strong><span class="subline">${picProducts.map((p) => p.name).join(" / ")}</span></td>
          <td>${pct(actual.gmv / target.gmv)}</td>
          <td>${pct(actual.videos / target.videos)}</td>
          <td>${fmt(actual.roi, "ratio")}</td>
          <td>${riskProduct}</td>
          <td>${support}</td>
          <td>${riskPill(overallStatus(actual, target))}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>PIC表现矩阵</h2>
          <p>管理重点不是排名，而是识别谁需要支持、谁的打法可复制。</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>PIC</th>
              <th>GMV</th>
              <th>Videos</th>
              <th>ROI</th>
              <th>Risk Product</th>
              <th>Leader Support</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderManagementActionTable(products) {
  const worstByGmv = [...products].sort((a, b) => a.mtd.gmv / a.target.gmv - b.mtd.gmv / b.target.gmv)[0];
  const worstByRoi = [...products].sort((a, b) => withDerived(a.mtd).roi / withDerived(a.target).roi - withDerived(b.mtd).roi / withDerived(b.target).roi)[0];
  const actions = [
    {
      object: `Product · ${worstByGmv.name}`,
      diagnosis: `GMV达成 ${pct(worstByGmv.mtd.gmv / worstByGmv.target.gmv)}，低于时间进度。`,
      action: "提交48小时恢复计划：补发布、换内容角度、检查Offer。",
      owner: getPic(worstByGmv.picId).name,
      deadline: "Tomorrow",
      priority: "P0",
      status: "red",
    },
    {
      object: `Product · ${worstByRoi.name}`,
      diagnosis: `ROI为 ${fmt(withDerived(worstByRoi.mtd).roi, "ratio")}，低于目标 ${fmt(withDerived(worstByRoi.target).roi, "ratio")}。`,
      action: "暂停高CPM内容，复盘达人质量和CTA。",
      owner: getPic(worstByRoi.picId).name,
      deadline: "This week",
      priority: "P1",
      status: "yellow",
    },
    {
      object: "Creator · S/A level",
      diagnosis: "高质量背书视频不足，影响信任和转化。",
      action: "补齐S/A达人排期，Brief区分背书型和转化型脚本。",
      owner: "Brand Leader",
      deadline: "This week",
      priority: "P1",
      status: "yellow",
    },
  ];

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>管理动作表</h2>
          <p>把诊断转成管理动作，明确Owner、Deadline和优先级。</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>管理对象</th>
              <th>诊断</th>
              <th>管理动作</th>
              <th>Owner</th>
              <th>Deadline</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            ${actions
              .map((item) => `
                <tr>
                  <td><strong>${item.object}</strong></td>
                  <td>${item.diagnosis}</td>
                  <td>${item.action}</td>
                  <td>${item.owner}</td>
                  <td>${item.deadline}</td>
                  <td><span class="pill ${item.status}">${item.priority}</span></td>
                </tr>
              `)
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderCreatorExecutionTable(actual, target) {
  const rows = [
    {
      level: "S Creator",
      target: target.s,
      actual: actual.s,
      bottleneck: "Need senior creator confirmation",
      next: "Confirm 2 creator slots",
    },
    {
      level: "A Creator",
      target: target.a,
      actual: actual.a,
      bottleneck: "Draft/review queue",
      next: "Push content approval",
    },
    {
      level: "B Creator",
      target: target.b,
      actual: actual.b,
      bottleneck: "Publishing density",
      next: "Fill daily posting gap",
    },
  ];

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>达人执行表</h2>
          <p>PIC只需要看到自己该补哪类达人、卡点是什么、下一步是什么。</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>达人等级</th>
              <th>目标视频数</th>
              <th>已发布</th>
              <th>待发布</th>
              <th>卡点</th>
              <th>下一步</th>
            </tr>
          </thead>
          <tbody>
            ${rows
              .map((row) => `
                <tr>
                  <td><strong>${row.level}</strong></td>
                  <td>${Math.round(row.target)}</td>
                  <td>${Math.round(row.actual)}</td>
                  <td>${Math.max(Math.round(row.target - row.actual), 0)}</td>
                  <td>${row.bottleneck}</td>
                  <td>${row.next}</td>
                </tr>
              `)
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderLeader() {
  const products = getProducts();
  const publishingProducts = getBrandPublishingProducts();
  const publishingPics = Array.from(
    new Map(
      publishingProducts
        .flatMap((product) => product.picBreakdown)
        .map((pic) => [pic.id, { id: pic.id, name: pic.name }]),
    ).values(),
  );
  const brand = getBrand();
  const target = sumTargets(products);
  const mtd = sumMetrics(products, "mtd");
  const lmSamePeriod = sumMetrics(products, "lmSamePeriod");
  const thisWeek = sumMetrics(products, "thisWeek");
  const lastWeek = sumMetrics(products, "lastWeek");
  const lmSameWeek = sumMetrics(products, "lmSameWeek");
  const lmLastWeek = sumMetrics(products, "lmLastWeek");
  const thisWeekTarget = periodTarget(target, THIS_WEEK_DAYS);
  const lastWeekTarget = periodTarget(target, LAST_WEEK_DAYS);
  const publishingTarget = sumTargets(publishingProducts);
  const publishingMtd = sumMetrics(publishingProducts, "mtd");
  const publishingComparison = sumMetrics(publishingProducts, "lmSamePeriod");

  $("#viewEyebrow").textContent = "Brand Dashboard";
  $("#viewTitle").textContent = `${brand.name} 月度KOL目标达成`;

  $("#leaderView").innerHTML = `
    ${renderLeaderManagementSummary(mtd, target, products)}
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>品牌目标总览</h2>
          <p>只保留核心目标状态：Actual / Target / Gap / 状态，作为管理判断入口。</p>
        </div>
      </div>
      ${renderKpiCards(mtd, target, lmSamePeriod)}
    </section>
    ${renderBrandPublishingResults(
      publishingProducts,
      publishingMtd,
      publishingTarget,
      publishingComparison,
      brand,
    )}
    ${renderVideoPlanModule(publishingProducts, {
      key: "brand",
      filters: state.brandVideoPlanFilters,
      includePics: true,
      pics: publishingPics,
    })}
    ${renderPicPerformanceMatrix(products)}
    ${renderManagementActionTable(products)}
    ${renderLeaderAiReports(mtd, target, products, lastWeek, lmLastWeek)}
  `;

  $all("[data-product-id]").forEach((row) => {
    row.addEventListener("click", () => {
      state.selectedProductId = row.dataset.productId;
      render();
    });
  });

  bindVideoPlanFilters(publishingProducts, {
    key: "brand",
    filters: state.brandVideoPlanFilters,
    includePics: true,
    pics: publishingPics,
  });
}

function allocatePicGradeBudget(product, periodKey) {
  const period = product[periodKey];
  const weighted = picPublishingGrades.map((grade) => ({
    key: grade.key,
    weight: (period[grade.key] || 0) * grade.costWeight,
  }));
  const totalWeight = weighted.reduce((sum, item) => sum + item.weight, 0);
  let remaining = Math.round(period.budget || 0);

  return weighted.reduce((result, item, index) => {
    const value =
      index === weighted.length - 1
        ? remaining
        : totalWeight > 0
          ? Math.round((period.budget * item.weight) / totalWeight)
          : 0;
    result[item.key] = value;
    remaining -= value;
    return result;
  }, {});
}

function buildPicPublishingCells(products) {
  return products.flatMap((product) => {
    const targetBudget = allocatePicGradeBudget(product, "target");
    const mtdBudget = allocatePicGradeBudget(product, "mtd");

    return picPublishingGrades.map((grade) => ({
      productId: product.id,
      productName: product.name,
      priority: product.priority,
      grade: grade.key,
      gradeLabel: grade.label,
      targetVideos: product.target[grade.key] || 0,
      mtdVideos: product.mtd[grade.key] || 0,
      targetBudget: targetBudget[grade.key] || 0,
      mtdBudget: mtdBudget[grade.key] || 0,
    }));
  });
}

function sumPicPublishingCells(cells) {
  return cells.reduce(
    (sum, cell) => ({
      targetVideos: sum.targetVideos + cell.targetVideos,
      mtdVideos: sum.mtdVideos + cell.mtdVideos,
      targetBudget: sum.targetBudget + cell.targetBudget,
      mtdBudget: sum.mtdBudget + cell.mtdBudget,
    }),
    { targetVideos: 0, mtdVideos: 0, targetBudget: 0, mtdBudget: 0 },
  );
}

function formatPaceGap(rate) {
  const gap = rate - MTD_DAYS / DAYS_IN_MONTH;
  return signedPct(gap);
}

function getPaceState(rate) {
  const gap = rate - MTD_DAYS / DAYS_IN_MONTH;
  if (gap > 0.15) return { status: "ahead", severity: "green", label: "Ahead" };
  if (gap >= -0.15) return { status: "green", severity: "green", label: "On Track" };
  if (gap >= -0.3) return { status: "slow", severity: "yellow", label: "Slow" };
  return { status: "behind", severity: "red", label: "Behind" };
}

function getRemainingDisplay(actual, target, type) {
  const remaining = target - actual;
  const isVideo = type === "number";
  const value = fmt(Math.abs(remaining), type);
  const label =
    remaining >= 0 ? "Remaining" : `Over ${isVideo ? "Target" : "Budget"}`;

  return {
    value,
    label,
    text: `${value} ${label}`,
    isOver: remaining < 0,
  };
}

function getPicPublishingStatus(row) {
  const timeProgress = MTD_DAYS / DAYS_IN_MONTH;
  const videoRate = row.targetVideos ? row.mtdVideos / row.targetVideos : 0;
  const budgetRate = row.targetBudget ? row.mtdBudget / row.targetBudget : 0;
  const efficiencyGap = budgetRate - videoRate;
  const postState = getPaceState(videoRate);
  const budgetState = getPaceState(budgetRate);

  if (postState.severity === "red" || budgetState.severity === "red" || efficiencyGap > 0.3) {
    return { status: "red", label: "At Risk" };
  }
  if (postState.severity === "yellow" || budgetState.severity === "yellow" || efficiencyGap > 0.15) {
    return { status: "yellow", label: "Watch" };
  }
  if (videoRate > timeProgress + 0.15 && budgetRate > timeProgress + 0.15) {
    return { status: "green", label: "Ahead" };
  }
  return { status: "green", label: "On Track" };
}

function renderPicPublishingHeroMetric({
  label,
  actual,
  target,
  type,
  rate,
  remaining,
  paceState,
  ratioLabel,
}) {
  return `
    <article class="pic-progress-hero-card ${paceState.status}">
      <div class="pic-progress-hero-head">
        <span>${label}</span>
        <span class="pill ${paceState.status}">${paceState.label}</span>
      </div>
      <div class="pic-progress-hero-stats">
        <div class="pic-progress-hero-ratio">
          <strong>
            <span class="actual">${fmt(actual, type)}</span><span class="divider">/</span><span class="target">${fmt(target, type)}</span>
          </strong>
          <span>${ratioLabel}</span>
        </div>
        <div class="pic-progress-hero-stat secondary ${remaining.isOver ? "over" : ""}">
          <strong>${remaining.value}</strong>
          <span>${remaining.label}</span>
        </div>
      </div>
      <div
        class="pic-progress-hero-progress"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="${target}"
        aria-valuenow="${Math.min(actual, target)}"
        aria-valuetext="${fmt(actual, type)} of ${fmt(target, type)} MTD; ${pct(rate)} progress; Pace ${formatPaceGap(rate)}"
      >
        ${renderProgress(rate, paceState.status)}
      </div>
      <div class="pic-progress-hero-diagnostics">
        <span>MTD <strong>${pct(rate)}</strong></span>
        <span class="pace ${paceState.status}">Pace <strong>${formatPaceGap(rate)}</strong></span>
      </div>
    </article>
  `;
}

function renderPicProgressCell(rate, paceState) {
  return `
    <div class="pic-table-progress">
      <div>
        <span class="pic-table-mtd"><b>MTD</b><strong>${pct(rate)}</strong></span>
        <span class="pace-gap ${paceState.status}"><b>Pace</b>${formatPaceGap(rate)}</span>
      </div>
      ${renderProgress(rate, paceState.status)}
    </div>
  `;
}

function renderPicPublishingRow(row, label, subline = "") {
  const videoRate = row.targetVideos ? row.mtdVideos / row.targetVideos : 0;
  const budgetRate = row.targetBudget ? row.mtdBudget / row.targetBudget : 0;
  const postPaceState = getPaceState(videoRate);
  const budgetPaceState = getPaceState(budgetRate);
  const videosLeft = getRemainingDisplay(row.mtdVideos, row.targetVideos, "number");
  const budgetLeft = getRemainingDisplay(row.mtdBudget, row.targetBudget, "currency");

  return `
    <tr>
      <td><strong>${label}</strong>${subline ? `<span class="subline">${subline}</span>` : ""}</td>
      <td><strong>${row.mtdVideos}/${row.targetVideos}</strong></td>
      <td><strong class="remaining-value ${videosLeft.isOver ? "over" : ""}" aria-label="${videosLeft.text}">${videosLeft.value}</strong></td>
      <td>${renderPicProgressCell(videoRate, postPaceState)}</td>
      <td><strong>${fmt(row.mtdBudget, "currency")}/${fmt(row.targetBudget, "currency")}</strong></td>
      <td><strong class="remaining-value ${budgetLeft.isOver ? "over" : ""}" aria-label="${budgetLeft.text}">${budgetLeft.value}</strong></td>
      <td>${renderPicProgressCell(budgetRate, budgetPaceState)}</td>
    </tr>
  `;
}

function renderPicPublishingRows(products, cells) {
  if (state.picPublishingView === "grade") {
    return picPublishingGrades
      .map((grade) => {
        const row = sumPicPublishingCells(cells.filter((cell) => cell.grade === grade.key));
        return renderPicPublishingRow(row, grade.label, `${products.length} Products`);
      })
      .join("");
  }

  if (state.picPublishingView === "matrix") {
    return products
      .map((product) => {
        const productCells = cells.filter((cell) => cell.productId === product.id);
        const total = sumPicPublishingCells(productCells);
        return `
          <tr class="pic-progress-group-row">
            <td colspan="7">
              <div>
                <strong>${product.name}</strong>
                <span>${product.priority} · Total: ${total.mtdVideos}/${total.targetVideos} Posts · ${fmt(total.mtdBudget, "currency")}/${fmt(total.targetBudget, "currency")} Budget</span>
              </div>
            </td>
          </tr>
          ${picPublishingGrades
            .map((grade) =>
              renderPicPublishingRow(
                sumPicPublishingCells(productCells.filter((cell) => cell.grade === grade.key)),
                grade.label,
                `${product.name} · ${grade.shortLabel} Tier`,
              ),
            )
            .join("")}
        `;
      })
      .join("");
  }

  return products
    .map((product) => {
      const row = sumPicPublishingCells(cells.filter((cell) => cell.productId === product.id));
      return renderPicPublishingRow(row, product.name, `${product.priority} · All Tiers`);
    })
    .join("");
}

function renderPublishingProgress(products) {
  const cells = buildPicPublishingCells(products);
  const summary = sumPicPublishingCells(cells);
  const videoRate = summary.targetVideos ? summary.mtdVideos / summary.targetVideos : 0;
  const budgetRate = summary.targetBudget ? summary.mtdBudget / summary.targetBudget : 0;
  const status = getPicPublishingStatus(summary);
  const videosLeft = getRemainingDisplay(summary.mtdVideos, summary.targetVideos, "number");
  const budgetLeft = getRemainingDisplay(summary.mtdBudget, summary.targetBudget, "currency");
  const postPaceState = getPaceState(videoRate);
  const budgetPaceState = getPaceState(budgetRate);

  return `
    <section class="panel publishing-panel pic-publishing-progress">
      <div class="panel-header">
        <div>
          <h2>Publishing Progress</h2>
          <p>Track post and budget progress by product and creator tier.</p>
        </div>
        ${riskPillEn(status.status)}
      </div>

      <div class="pic-progress-scope">
        <div>
          <span>Scope</span>
          <strong>All Products · All Creator Tiers</strong>
        </div>
      </div>

      <div class="pic-progress-hero-grid">
        ${renderPicPublishingHeroMetric({
          label: "Post",
          actual: summary.mtdVideos,
          target: summary.targetVideos,
          type: "number",
          rate: videoRate,
          remaining: videosLeft,
          paceState: postPaceState,
          ratioLabel: "MTD / Target",
        })}
        ${renderPicPublishingHeroMetric({
          label: "Budget",
          actual: summary.mtdBudget,
          target: summary.targetBudget,
          type: "currency",
          rate: budgetRate,
          remaining: budgetLeft,
          paceState: budgetPaceState,
          ratioLabel: "MTD / Target",
        })}
      </div>

      <div class="pic-progress-toolbar">
        <div class="pic-progress-modes" role="group" aria-label="Publishing progress breakdown">
          ${[
            ["product", "Product"],
            ["grade", "Creator Tier"],
            ["matrix", "Product × Creator Tier"],
          ]
            .map(
              ([value, label]) => `
                <button class="${state.picPublishingView === value ? "active" : ""}" type="button" data-pic-publishing-view="${value}">
                  ${label}
                </button>
              `,
            )
            .join("")}
        </div>
      </div>

      <div class="table-wrap">
        <table class="pic-progress-table">
          <thead>
            <tr class="pic-progress-group-head">
              <th rowspan="2">Breakdown</th>
              <th colspan="3">Post</th>
              <th colspan="3">Budget</th>
            </tr>
            <tr>
              <th>MTD / Target</th>
              <th>Remaining</th>
              <th>MTD / Pace</th>
              <th>MTD / Target</th>
              <th>Remaining</th>
              <th>MTD / Pace</th>
            </tr>
          </thead>
          <tbody>${renderPicPublishingRows(products, cells)}</tbody>
        </table>
      </div>
    </section>
  `;
}

function bindPicPublishingProgress() {
  $all("[data-pic-publishing-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.picPublishingView = button.dataset.picPublishingView;
      renderPic();
    });
  });
}

function allocatePicResultMetric(product, periodKey, metricKey) {
  const period = product[periodKey];
  const weightKey =
    metricKey === "budget" ? "costWeight" : metricKey === "gmv" ? "gmvWeight" : "viewWeight";
  const weights = picPublishingGrades.map(
    (grade) => (period[grade.key] || 0) * grade[weightKey],
  );
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let remaining = Math.round(period[metricKey] || 0);

  return picPublishingGrades.reduce((result, grade, index) => {
    const value =
      index === picPublishingGrades.length - 1
        ? remaining
        : totalWeight > 0
          ? Math.round((period[metricKey] * weights[index]) / totalWeight)
          : 0;
    result[grade.key] = value;
    remaining -= value;
    return result;
  }, {});
}

function buildPicPublishingResultCells(products) {
  return products.flatMap((product) => {
    const allocations = ["target", "mtd"].reduce((periods, periodKey) => {
      periods[periodKey] = {
        budget: allocatePicResultMetric(product, periodKey, "budget"),
        gmv: allocatePicResultMetric(product, periodKey, "gmv"),
        views: allocatePicResultMetric(product, periodKey, "views"),
      };
      return periods;
    }, {});

    return picPublishingGrades.map((grade) => ({
      productId: product.id,
      productName: product.name,
      priority: product.priority,
      productAi: product.ai,
      grade: grade.key,
      gradeLabel: grade.label,
      target: withDerived({
        budget: allocations.target.budget[grade.key],
        videos: product.target[grade.key] || 0,
        gmv: allocations.target.gmv[grade.key],
        views: allocations.target.views[grade.key],
      }),
      actual: withDerived({
        budget: allocations.mtd.budget[grade.key],
        videos: product.mtd[grade.key] || 0,
        gmv: allocations.mtd.gmv[grade.key],
        views: allocations.mtd.views[grade.key],
      }),
    }));
  });
}

function sumPicPublishingResultCells(cells, metricKey) {
  return withDerived(
    cells.reduce(
      (sum, cell) => {
        const metrics = cell[metricKey];
        sum.budget += metrics.budget;
        sum.videos += metrics.videos;
        sum.gmv += metrics.gmv;
        sum.views += metrics.views;
        return sum;
      },
      { budget: 0, videos: 0, gmv: 0, views: 0 },
    ),
  );
}

function formatComparisonLabel(value) {
  if (Math.abs(value) < 0.005) return "→ 0% vs Last Month";
  return `${value > 0 ? "↑" : "↓"} ${pct(Math.abs(value))} vs Last Month`;
}

function renderPublishingResultKpi(metric, actual, target, comparison, compact = false) {
  const key = metric.key;
  const status = statusFor(actual, target, key);
  const rate = rawTargetRatio(actual, target, key);
  const compareValue = comparison ? deltaPct(actual[key], comparison[key] || 0) : null;
  const comparisonIsGood =
    compareValue === null || key === "budget"
      ? null
      : key === "cpm"
        ? compareValue <= 0
        : compareValue >= 0;
  const deltaClass =
    compareValue === null || key === "budget" || Math.abs(compareValue) < 0.005
      ? "neutral"
      : comparisonIsGood
        ? "up"
        : "down";

  return `
    <article
      class="result-kpi ${compact ? "compact" : ""}"
      aria-label="${metric.label}: ${fmt(actual[key], metric.type)} of ${fmt(target[key], metric.type)} target; ${statusLabelEn(status)}"
    >
      <div class="result-kpi-head">
        <span>${metric.label}</span>
      </div>
      <strong class="result-kpi-value">${fmt(actual[key], metric.type)}</strong>
      <span class="result-kpi-target">Target ${fmt(target[key], metric.type)}</span>
      <div class="result-kpi-progress-line">
        <span><strong>${pct(rate)}</strong></span>
        ${renderProgress(Math.min(rate, 1), status)}
      </div>
      ${
        compareValue === null
          ? ""
          : `<span class="delta ${deltaClass}">${formatComparisonLabel(compareValue)}</span>`
      }
    </article>
  `;
}

function renderPublishingResultKpiGroups(actual, target, comparison = null, compact = false) {
  return `
    <div class="publishing-result-kpi-groups ${compact ? "compact" : ""}">
      ${publishingResultMetricGroups
        .map(
          (group) => `
            <section
              class="publishing-result-kpi-group"
              aria-label="${group.keys
                .map((key) => publishingResultMetricConfig.find((metric) => metric.key === key).label)
                .join(" and ")}"
            >
              <div class="result-kpi-pair">
                ${group.keys
                  .map((key) =>
                    renderPublishingResultKpi(
                      publishingResultMetricConfig.find((metric) => metric.key === key),
                      actual,
                      target,
                      comparison,
                      compact,
                    ),
                  )
                  .join("")}
              </div>
            </section>
          `,
        )
        .join("")}
    </div>
  `;
}

function getPublishingResultInsight(actual, target) {
  const videoRate = actual.videos / target.videos;
  if (videoRate < MTD_DAYS / DAYS_IN_MONTH - 0.08) return "Post delivery is behind — close scheduling and content gaps first.";
  if (actual.roi < target.roi * 0.9) return "ROI is below target — fix the content mix, offer, and CTA before scaling.";
  if (actual.cpm > target.cpm * 1.1) return "CPM is high — reduce costly creators and reuse efficient content.";
  return "Delivery and performance are aligned — continue the current winning mix.";
}

function getPicPublishingResultRows(products, cells) {
  if (state.picPublishingResultView === "grade") {
    return picPublishingGrades.map((grade) => {
      const gradeCells = cells.filter((cell) => cell.grade === grade.key);
      const actual = sumPicPublishingResultCells(gradeCells, "actual");
      const target = sumPicPublishingResultCells(gradeCells, "target");
      return {
        id: grade.key,
        label: grade.label,
        subline: `${products.length} Products`,
        actual,
        target,
        insight: getPublishingResultInsight(actual, target),
      };
    });
  }

  if (state.picPublishingResultView === "matrix") {
    return products.flatMap((product) =>
      picPublishingGrades.map((grade) => {
        const cell = cells.find(
          (item) => item.productId === product.id && item.grade === grade.key,
        );
        return {
          id: `${product.id}-${grade.key}`,
          groupId: product.id,
          groupLabel: product.name,
          groupSubline: `${product.priority} · Product × Creator Tier`,
          label: grade.label,
          subline: `${product.name} · ${grade.shortLabel} Tier`,
          actual: cell.actual,
          target: cell.target,
          insight: getPublishingResultInsight(cell.actual, cell.target),
        };
      }),
    );
  }

  return products.map((product) => ({
    id: product.id,
    label: product.name,
    subline: `${product.priority} · All Tiers`,
    actual: withDerived(product.mtd),
    target: withDerived(product.target),
    insight: getPublishingResultInsight(withDerived(product.mtd), withDerived(product.target)),
  }));
}

function renderPublishingResultBreakdownCard(row) {
  const status = overallStatus(row.actual, row.target);
  return `
    <article class="publishing-result-breakdown-card">
      <div class="result-breakdown-card-head">
        <div>
          <strong>${row.label}</strong>
          <span>${row.subline}</span>
        </div>
        ${riskPillEn(status)}
      </div>
      ${renderPublishingResultKpiGroups(row.actual, row.target, null, true)}
      <p class="result-breakdown-insight"><strong>Readout</strong>${row.insight}</p>
    </article>
  `;
}

function renderPublishingResultBreakdown(products) {
  const cells = buildPicPublishingResultCells(products);
  const rows = getPicPublishingResultRows(products, cells);

  if (state.picPublishingResultView === "matrix") {
    return products
      .map((product) => {
        const productRows = rows.filter((row) => row.groupId === product.id);
        return `
          <section class="publishing-result-matrix-group">
            <div class="result-matrix-group-head">
              <strong>${product.name}</strong>
              <span>${product.priority} · ${picPublishingGrades.length} Creator Tiers</span>
            </div>
            <div class="publishing-result-breakdown-list">
              ${productRows.map(renderPublishingResultBreakdownCard).join("")}
            </div>
          </section>
        `;
      })
      .join("");
  }

  return `
    <div class="publishing-result-breakdown-list">
      ${rows.map(renderPublishingResultBreakdownCard).join("")}
    </div>
  `;
}

function renderPublishingResults(products, actual, target, comparison, pic) {
  return `
    <details class="publishing-results" ${state.picPublishingResultsOpen ? "open" : ""}>
      <summary>
        <div class="publishing-results-head">
          <div>
            <span class="section-kicker">PUBLISHING RESULTS</span>
            <h2>Publishing Results</h2>
            <p>${pic.name} owns ${products.map((product) => product.name).join(", ")}. Review the total, then compare product and creator-tier results.</p>
          </div>
          <span class="results-expand-control">
            <span class="closed-label">View Breakdown</span>
            <span class="open-label">Hide Breakdown</span>
            <i aria-hidden="true"></i>
          </span>
        </div>
        ${renderPublishingResultKpiGroups(actual, target, comparison)}
      </summary>
      <div class="publishing-result-detail">
        <div class="result-detail-heading">
          <div>
            <h3>Results Breakdown</h3>
            <p>Six core KPIs: Budget, Post, GMV, ROI, Views, and CPM.</p>
          </div>
          <div class="pic-progress-modes publishing-result-modes" role="group" aria-label="Publishing results breakdown">
            ${[
              ["product", "Product"],
              ["grade", "Creator Tier"],
              ["matrix", "Product × Creator Tier"],
            ]
              .map(
                ([value, label]) => `
                  <button class="${state.picPublishingResultView === value ? "active" : ""}" type="button" data-pic-publishing-result-view="${value}">
                    ${label}
                  </button>
                `,
              )
              .join("")}
          </div>
        </div>
        ${renderPublishingResultBreakdown(products)}
        ${
          state.picPublishingResultView === "product"
            ? ""
            : `<p class="pic-progress-method-note">Demo allocation: Budget uses creator-tier cost weights; GMV and Views use output weights. All subtotals reconcile to product totals.</p>`
        }
      </div>
    </details>
  `;
}

function bindPicPublishingResults() {
  const details = $(".publishing-results");
  if (details) {
    details.addEventListener("toggle", () => {
      state.picPublishingResultsOpen = details.open;
    });
  }

  $all("[data-pic-publishing-result-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.picPublishingResultView = button.dataset.picPublishingResultView;
      state.picPublishingResultsOpen = true;
      renderPic();
    });
  });
}

function renderPublishingResultMetric(actual, target, key, type) {
  const ratio = key === "roi" ? actual.roi / target.roi : actual[key] / target[key];
  return `
    <div class="drill-metric">
      <strong>${fmt(actual[key], type)}</strong>
      <span>Target ${fmt(target[key], type)}</span>
      ${key === "videos" || key === "views" ? `<em>${pct(ratio)}</em>` : ""}
    </div>
  `;
}

function renderBrandPublishingResults(products, actual, target, comparison, brand) {
  return `
    <details class="publishing-results brand-publishing-results">
      <summary>
        <div class="publishing-results-head">
          <div>
            <span class="section-kicker">PUBLISHING RESULTS</span>
            <h2>品牌发布结果</h2>
            <p>${brand.name} 当前演示范围为 ${products.map((product) => product.name).join("、")}。点击展开产品，再点击产品查看PIC拆分。</p>
          </div>
          <span class="results-expand-control">
            <span class="closed-label">展开产品拆分</span>
            <span class="open-label">收起产品拆分</span>
            <i aria-hidden="true"></i>
          </span>
        </div>
        ${renderKpiCards(actual, target, comparison)}
      </summary>
      <div class="publishing-result-detail">
        <div class="result-detail-heading">
          <div>
            <h3>产品发布结果拆分</h3>
            <p>产品行可继续展开为Nisa、Cilla的执行和结果贡献。</p>
          </div>
          <span class="pill blue">${products.length} Products · 2 PICs</span>
        </div>
        <div class="brand-product-result-scroll">
          <div class="brand-product-result-table">
            <div class="brand-product-result-head">
              <span>Product</span>
              <span>Published</span>
              <span>GMV</span>
              <span>ROI</span>
              <span>Views</span>
              <span>CPM</span>
              <span>AI判断</span>
            </div>
            ${products
              .map((product) => {
                const productActual = withDerived(product.mtd);
                const productTarget = withDerived(product.target);
                const status = overallStatus(productActual, productTarget);
                return `
                  <details class="brand-product-result">
                    <summary class="brand-product-result-summary">
                      <div class="drill-product-name">
                        <span class="product-drill-arrow" aria-hidden="true"></span>
                        <div>
                          <strong>${product.name}</strong>
                          <span>${product.priority} · ${riskPill(status)} · 点击展开PIC</span>
                        </div>
                      </div>
                      ${renderPublishingResultMetric(productActual, productTarget, "videos", "number")}
                      ${renderPublishingResultMetric(productActual, productTarget, "gmv", "currency")}
                      ${renderPublishingResultMetric(productActual, productTarget, "roi", "ratio")}
                      ${renderPublishingResultMetric(productActual, productTarget, "views", "compact")}
                      ${renderPublishingResultMetric(productActual, productTarget, "cpm", "currencySmall")}
                      <p class="drill-ai-note">${product.ai}</p>
                    </summary>
                    <div class="pic-result-detail">
                      <div class="pic-result-title">
                        <strong>${product.name} · PIC贡献拆分</strong>
                        <span>Nisa + Cilla = 产品结果</span>
                      </div>
                      <div class="table-wrap">
                        <table class="pic-result-table">
                          <thead>
                            <tr>
                              <th>PIC</th>
                              <th>Published</th>
                              <th>GMV</th>
                              <th>ROI</th>
                              <th>Views</th>
                              <th>CPM</th>
                              <th>管理判断</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${product.picBreakdown
                              .map((pic) => {
                                const picActual = withDerived(pic.mtd);
                                const picTarget = withDerived(pic.target);
                                return `
                                  <tr>
                                    <td><strong>${pic.name}</strong><span class="subline">PIC</span></td>
                                    <td><strong>${picActual.videos} / ${picTarget.videos}</strong><span class="subline">${pct(picActual.videos / picTarget.videos)}</span></td>
                                    <td><strong>${fmt(picActual.gmv, "currency")}</strong><span class="subline">Target ${fmt(picTarget.gmv, "currency")}</span></td>
                                    <td><strong>${fmt(picActual.roi, "ratio")}</strong><span class="subline">Target ${fmt(picTarget.roi, "ratio")}</span></td>
                                    <td><strong>${fmt(picActual.views, "compact")}</strong><span class="subline">${pct(picActual.views / picTarget.views)}</span></td>
                                    <td><strong>${fmt(picActual.cpm, "currencySmall")}</strong><span class="subline">Target ${fmt(picTarget.cpm, "currencySmall")}</span></td>
                                    <td class="result-ai-note">${pic.ai}</td>
                                  </tr>
                                `;
                              })
                              .join("")}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </details>
                `;
              })
              .join("")}
          </div>
        </div>
      </div>
    </details>
  `;
}

function allocateVideoStatus(total, products, statusKey, includePics = false) {
  const gradeKeys = ["s", "a", "b"];
  const weightedCells = products.flatMap((product) => {
    const picRows =
      includePics && product.picBreakdown?.length
        ? product.picBreakdown
        : [{ id: "all", name: "All PICs", target: product.target }];

    return picRows.flatMap((pic) =>
      gradeKeys.map((grade) => {
        let factor = 1;

        if (statusKey === "posted") {
          if (product.id === "serum-spray") factor *= 1.08;
          if (grade === "a") factor *= 1.06;
          if (pic.id === "nisa") factor *= 1.08;
        }

        if (statusKey === "delaySoon") {
          if (product.id === "day-cream") factor *= 1.16;
          if (grade === "b") factor *= 1.08;
          if (pic.id === "cilla") factor *= 1.08;
        }

        if (statusKey === "delayed") {
          if (product.id === "day-cream") factor *= 1.3;
          if (grade === "b") factor *= 1.18;
          if (pic.id === "cilla") factor *= 1.16;
        }

        if (statusKey === "planning") {
          if (product.id === "day-cream") factor *= 1.12;
          if (grade === "s") factor *= 0.88;
          if (pic.id === "nisa") factor *= 1.04;
        }

        return {
          productId: product.id,
          productName: product.name,
          picId: pic.id,
          picName: pic.name,
          grade: grade.toUpperCase(),
          weight: Math.max(pic.target[grade], 1) * factor,
        };
      }),
    );
  });
  const weightTotal = weightedCells.reduce((sum, cell) => sum + cell.weight, 0);
  const allocations = weightedCells.map((cell) => {
    const exact = weightTotal > 0 ? (total * cell.weight) / weightTotal : 0;
    return { ...cell, value: Math.floor(exact), remainder: exact - Math.floor(exact) };
  });
  let remaining = total - allocations.reduce((sum, cell) => sum + cell.value, 0);

  [...allocations]
    .sort((a, b) => b.remainder - a.remainder)
    .forEach((cell) => {
      if (remaining <= 0) return;
      cell.value += 1;
      remaining -= 1;
    });

  return allocations;
}

function buildVideoPlanRows(products, includePics = false) {
  return Object.entries(videoPlanPeriods).flatMap(([scope, periods]) =>
    periods.flatMap((period) =>
      videoStatusConfig.flatMap((status) =>
        allocateVideoStatus(period.totals[status.key], products, status.key, includePics).map((cell) => ({
          scope,
          periodKey: period.key,
          periodLabel: period.label,
          status: status.key,
          productId: cell.productId,
          productName: cell.productName,
          picId: cell.picId,
          picName: cell.picName,
          grade: cell.grade,
          value: cell.value,
        })),
      ),
    ),
  );
}

function getFilteredVideoPlanData(products, scope, filters, includePics = false) {
  const rows = buildVideoPlanRows(products, includePics);
  const selectedProducts = filters.products || [];
  const selectedGrades = filters.grades || [];
  const selectedPics = filters.pics || [];

  return videoPlanPeriods[scope].map((period) => {
    const values = Object.fromEntries(videoStatusConfig.map((status) => [status.key, 0]));

    rows
      .filter((row) => row.scope === scope && row.periodKey === period.key)
      .filter((row) => selectedProducts.length === 0 || selectedProducts.includes(row.productId))
      .filter((row) => selectedGrades.length === 0 || selectedGrades.includes(row.grade))
      .filter((row) => selectedPics.length === 0 || selectedPics.includes(row.picId))
      .forEach((row) => {
        values[row.status] += row.value;
      });

    return {
      ...period,
      values,
      total: Object.values(values).reduce((sum, value) => sum + value, 0),
    };
  });
}

function renderVideoStackedChart(title, description, products, scope, filters, includePics = false) {
  const periods = getFilteredVideoPlanData(products, scope, filters, includePics);
  const maxTotal = Math.max(...periods.map((period) => period.total), 1);
  const axisMax = Math.max(Math.ceil(maxTotal / 20) * 20, 20);
  const axisValues = [axisMax, axisMax * 0.75, axisMax * 0.5, axisMax * 0.25, 0];
  const stackOrder = ["posted", "delayed", "delaySoon", "planning"];
  const statusByKey = Object.fromEntries(videoStatusConfig.map((status) => [status.key, status]));

  return `
    <article class="video-plan-chart">
      <div class="video-plan-chart-head">
        <div>
          <h3>${title}</h3>
          <p>${description}</p>
        </div>
        <span>${periods.length} periods</span>
      </div>
      <div class="video-status-legend" aria-label="视频状态图例">
        ${videoStatusConfig
          .map((status) => `<span><i class="${status.key}"></i>${status.label}</span>`)
          .join("")}
      </div>
      <div class="video-chart-shell" role="img" aria-label="${title}，按Planning、Delay Soon、Delayed和Posted堆叠展示视频数">
        <div class="video-chart-y-axis">
          ${axisValues.map((value) => `<span>${Math.round(value)}</span>`).join("")}
        </div>
        <div class="video-chart-plot">
          <div class="video-chart-grid" aria-hidden="true">
            ${axisValues.map(() => "<i></i>").join("")}
          </div>
          <div class="video-chart-bars">
            ${periods
              .map((period) => `
                <div class="video-bar-group">
                  <div class="video-bar-total">${period.total}</div>
                  <div class="video-bar-track">
                    <div class="video-bar-stack" style="height:${(period.total / axisMax) * 100}%">
                      ${stackOrder
                        .map((statusKey) => {
                          const value = period.values[statusKey];
                          const height = period.total > 0 ? (value / period.total) * 100 : 0;
                          return `
                            <span
                              class="video-bar-segment ${statusKey}"
                              style="height:${height}%"
                              title="${statusByKey[statusKey].label}: ${value}"
                            >${value >= 4 ? value : ""}</span>
                          `;
                        })
                        .join("")}
                    </div>
                  </div>
                  <span class="video-period-label">${period.label}</span>
                </div>
              `)
              .join("")}
          </div>
        </div>
      </div>
    </article>
  `;
}

function getVideoFilterLabel(type, products, filters, pics = []) {
  const values = filters[type] || [];
  if (values.length === 0) {
    if (type === "products") return "全部产品";
    if (type === "pics") return "全部PIC";
    return "全部等级";
  }
  if (type === "products") {
    return values
      .map((value) => products.find((product) => product.id === value)?.name)
      .filter(Boolean)
      .join("、");
  }
  if (type === "pics") {
    return values
      .map((value) => pics.find((pic) => pic.id === value)?.name)
      .filter(Boolean)
      .join("、");
  }
  return values.join(" / ");
}

function renderVideoPlanCharts(products, filters, includePics = false) {
  return `
    ${renderVideoStackedChart("月度视频状态", "按月查看计划、临近延期、已延期与已发布视频数量。", products, "monthly", filters, includePics)}
    ${renderVideoStackedChart("周度视频状态", "按周查看执行变化，快速定位当前发布风险。", products, "weekly", filters, includePics)}
  `;
}

function renderVideoPlanModule(products, options = {}) {
  const key = options.key || "pic";
  const filters = options.filters || state.videoPlanFilters;
  const includePics = Boolean(options.includePics);
  const pics = options.pics || [];
  const selectedProducts = filters.products || [];
  const selectedGrades = filters.grades || [];
  const selectedPics = filters.pics || [];
  const filterCount = includePics ? 3 : 2;

  return `
    <section id="${key}VideoPlanModule" class="panel video-plan-panel">
      <div class="video-plan-header">
        <div>
          <span class="section-kicker">VIDEO PLAN & PUBLISHING</span>
          <h2>视频计划与发布</h2>
          <p>从月度趋势看整体节奏，从周度趋势看当前执行；${filterCount}个筛选器同时作用于两张图。</p>
        </div>
        <div class="video-plan-filters" aria-label="视频计划筛选器">
          <details class="video-filter ${selectedProducts.length ? "has-selection" : ""}">
            <summary>
              <span>产品</span>
              <strong id="${key}VideoProductFilterLabel">${getVideoFilterLabel("products", products, filters, pics)}</strong>
              <i aria-hidden="true"></i>
            </summary>
            <div class="video-filter-menu">
              ${products
                .map((product) => `
                  <label>
                    <input
                      type="checkbox"
                      data-video-filter-type="products"
                      value="${product.id}"
                      ${selectedProducts.includes(product.id) ? "checked" : ""}
                    />
                    <span>${product.name}</span>
                  </label>
                `)
                .join("")}
            </div>
          </details>
          <details class="video-filter ${selectedGrades.length ? "has-selection" : ""}">
            <summary>
              <span>达人等级</span>
              <strong id="${key}VideoGradeFilterLabel">${getVideoFilterLabel("grades", products, filters, pics)}</strong>
              <i aria-hidden="true"></i>
            </summary>
            <div class="video-filter-menu">
              ${["S", "A", "B"]
                .map((grade) => `
                  <label>
                    <input
                      type="checkbox"
                      data-video-filter-type="grades"
                      value="${grade}"
                      ${selectedGrades.includes(grade) ? "checked" : ""}
                    />
                    <span>${grade} 级达人</span>
                  </label>
                `)
                .join("")}
            </div>
          </details>
          ${
            includePics
              ? `
                <details class="video-filter ${selectedPics.length ? "has-selection" : ""}">
                  <summary>
                    <span>PIC</span>
                    <strong id="${key}VideoPicFilterLabel">${getVideoFilterLabel("pics", products, filters, pics)}</strong>
                    <i aria-hidden="true"></i>
                  </summary>
                  <div class="video-filter-menu">
                    ${pics
                      .map((pic) => `
                        <label>
                          <input
                            type="checkbox"
                            data-video-filter-type="pics"
                            value="${pic.id}"
                            ${selectedPics.includes(pic.id) ? "checked" : ""}
                          />
                          <span>${pic.name}</span>
                        </label>
                      `)
                      .join("")}
                  </div>
                </details>
              `
              : ""
          }
          <button
            id="${key}VideoFilterClear"
            class="video-filter-clear"
            type="button"
            ${selectedProducts.length === 0 && selectedGrades.length === 0 && selectedPics.length === 0 ? "disabled" : ""}
          >清除筛选</button>
        </div>
      </div>
      <div id="${key}VideoPlanCharts" class="video-plan-charts">
        ${renderVideoPlanCharts(products, filters, includePics)}
      </div>
    </section>
  `;
}

function updateVideoPlanCharts(products, options = {}) {
  const key = options.key || "pic";
  const filters = options.filters || state.videoPlanFilters;
  const includePics = Boolean(options.includePics);
  const pics = options.pics || [];
  const module = $(`#${key}VideoPlanModule`);
  const charts = $(`#${key}VideoPlanCharts`);
  if (!charts) return;

  charts.innerHTML = renderVideoPlanCharts(products, filters, includePics);
  $(`#${key}VideoProductFilterLabel`).textContent = getVideoFilterLabel("products", products, filters, pics);
  $(`#${key}VideoGradeFilterLabel`).textContent = getVideoFilterLabel("grades", products, filters, pics);
  if (includePics) {
    $(`#${key}VideoPicFilterLabel`).textContent = getVideoFilterLabel("pics", products, filters, pics);
  }

  const clearButton = $(`#${key}VideoFilterClear`);
  clearButton.disabled = Object.values(filters).every((values) => values.length === 0);
  Array.from(module.querySelectorAll(".video-filter")).forEach((filter) => {
    const type = filter.querySelector("[data-video-filter-type]")?.dataset.videoFilterType;
    filter.classList.toggle("has-selection", filters[type]?.length > 0);
  });
}

function bindVideoPlanFilters(products, options = {}) {
  const key = options.key || "pic";
  const filters = options.filters || state.videoPlanFilters;
  const module = $(`#${key}VideoPlanModule`);

  Array.from(module.querySelectorAll("[data-video-filter-type]")).forEach((input) => {
    input.addEventListener("change", () => {
      const type = input.dataset.videoFilterType;
      const selected = new Set(filters[type]);
      input.checked ? selected.add(input.value) : selected.delete(input.value);
      filters[type] = [...selected];
      updateVideoPlanCharts(products, options);
    });
  });

  $(`#${key}VideoFilterClear`).addEventListener("click", () => {
    Object.keys(filters).forEach((type) => {
      filters[type] = [];
    });
    Array.from(module.querySelectorAll("[data-video-filter-type]")).forEach((input) => {
      input.checked = false;
    });
    updateVideoPlanCharts(products, options);
  });
}

function getPublishedVideoContentTypeLabel(type) {
  return publishedVideoContentTypes.find((item) => item.key === type)?.label || type;
}

function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

function formatPublishedPeriodRange(startDate, endDate) {
  const startMonth = startDate.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  const endMonth = endDate.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  const startDay = startDate.getUTCDate();
  const endDay = endDate.getUTCDate();
  return startMonth === endMonth
    ? `${startMonth} ${startDay}–${endDay}`
    : `${startMonth} ${startDay}–${endMonth} ${endDay}`;
}

function getPublishedVideoPeriods(monthId = state.month) {
  const [year, month] = monthId.split("-").map(Number);
  const monthIndex = month - 1;
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const referenceYear = DEMO_DATE.getUTCFullYear();
  const referenceMonth = DEMO_DATE.getUTCMonth();
  const referenceDay = DEMO_DATE.getUTCDate();
  const referenceTime = Date.UTC(referenceYear, referenceMonth, referenceDay);
  const isReferenceMonth = year === referenceYear && monthIndex === referenceMonth;
  const mtdEndDay = isReferenceMonth ? Math.min(referenceDay, lastDay) : lastDay;
  const monthStart = new Date(Date.UTC(year, monthIndex, 1));
  const monthMtdEnd = new Date(Date.UTC(year, monthIndex, mtdEndDay));
  const periods = [
    {
      key: "month",
      label: "本月 MTD",
      sublabel: formatPublishedPeriodRange(monthStart, monthMtdEnd),
      start: toIsoDate(monthStart),
      end: toIsoDate(monthMtdEnd),
    },
  ];

  let weekNumber = 0;
  for (let day = 1; day <= lastDay; day += 1) {
    const sunday = new Date(Date.UTC(year, monthIndex, day));
    if (sunday.getUTCDay() !== 0) continue;
    weekNumber += 1;
    const monday = new Date(sunday);
    monday.setUTCDate(sunday.getUTCDate() - 6);
    const containsReferenceDate =
      isReferenceMonth &&
      referenceTime >= monday.getTime() &&
      referenceTime <= sunday.getTime();
    periods.push({
      key: `week:${toIsoDate(sunday)}`,
      label: `自然周 ${weekNumber}`,
      sublabel: `${formatPublishedPeriodRange(monday, sunday)}${containsReferenceDate ? " · MTD" : ""}`,
      start: toIsoDate(monday),
      end: toIsoDate(sunday),
    });
  }

  return periods;
}

function getPublishedVideoRows(products) {
  const filters = state.publishedVideoFilters;
  const productIds = new Set(products.map((product) => product.id));
  const period =
    getPublishedVideoPeriods().find((item) => item.key === filters.period) ||
    getPublishedVideoPeriods()[0];

  return publishedVideoDemoRows
    .filter((row) => productIds.has(row.productId))
    .filter((row) => row.postDate >= period.start && row.postDate <= period.end)
    .sort((a, b) => b.postDate.localeCompare(a.postDate));
}

function summarizePublishedVideoRows(rows) {
  const summary = rows.reduce(
    (sum, row) => {
      sum.videos += 1;
      sum.cost += row.cost;
      sum.gmv += row.gmv;
      sum.views += row.views;
      return sum;
    },
    { videos: 0, cost: 0, gmv: 0, views: 0 },
  );

  return {
    ...summary,
    roi: summary.cost > 0 ? summary.gmv / summary.cost : 0,
    cpm: summary.views > 0 ? (summary.cost / summary.views) * 1000 : 0,
  };
}

function formatPublishedVideoDate(postDate) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${postDate}T00:00:00+08:00`));
}

function renderPublishedVideoSummary(rows) {
  const summary = summarizePublishedVideoRows(rows);
  const metrics = [
    ["Videos", fmt(summary.videos, "number")],
    ["Video Cost", fmt(summary.cost, "currency")],
    ["GMV", fmt(summary.gmv, "currency")],
    ["ROI", fmt(summary.roi, "ratio")],
    ["Views", fmt(summary.views, "compact")],
    ["CPM", fmt(summary.cpm, "currencySmall")],
  ];

  return `
    <div class="published-video-summary">
      ${metrics
        .map(
          ([label, value]) => `
            <article>
              <span>${label}</span>
              <strong>${value}</strong>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderPublishedVideoRow(row, products) {
  const roi = row.cost > 0 ? row.gmv / row.cost : 0;
  const cpm = row.views > 0 ? (row.cost / row.views) * 1000 : 0;
  const product = products.find((item) => item.id === row.productId);
  return `
    <tr class="published-video-detail-row">
      <td>
        <a class="published-video-id" href="https://www.tiktok.com/@${row.creatorName}/video/${row.videoId}" target="_blank" rel="noreferrer">
          ${row.videoId}
        </a>
      </td>
      <td>
        <strong>${row.creatorName}</strong>
        <span class="creator-grade grade-${row.grade.toLowerCase()}">${row.grade}级达人</span>
      </td>
      <td><strong>${product?.name || row.productId}</strong></td>
      <td>
        <strong>${getPublishedVideoContentTypeLabel(row.contentType)}</strong>
        <span class="content-angle">${row.angle}</span>
      </td>
      <td><strong>${formatPublishedVideoDate(row.postDate)}</strong></td>
      <td><strong>${fmt(row.cost, "currency")}</strong></td>
      <td><strong>${fmt(row.gmv, "currency")}</strong></td>
      <td><strong>${fmt(roi, "ratio")}</strong></td>
      <td><strong>${fmt(row.views, "compact")}</strong></td>
      <td><strong>${fmt(cpm, "currencySmall")}</strong></td>
    </tr>
  `;
}

function renderPublishedVideoGroupHeader(label, subline, rows, level = 1) {
  const summary = summarizePublishedVideoRows(rows);
  return `
    <tr class="published-video-group-header level-${level}">
      <td colspan="10">
        <div>
          <span>
            <strong>${label}</strong>
            ${subline ? `<small>${subline}</small>` : ""}
          </span>
          <em>
            ${summary.videos} Videos · Cost ${fmt(summary.cost, "currency")} · GMV ${fmt(summary.gmv, "currency")} · ROI ${fmt(summary.roi, "ratio")}
          </em>
        </div>
      </td>
    </tr>
  `;
}

function renderPublishedVideoSubtotal(label, rows, className = "") {
  const summary = summarizePublishedVideoRows(rows);
  return `
    <tr class="published-video-subtotal ${className}">
      <td colspan="5"><strong>${label} · ${summary.videos} Videos</strong></td>
      <td>${fmt(summary.cost, "currency")}</td>
      <td>${fmt(summary.gmv, "currency")}</td>
      <td>${fmt(summary.roi, "ratio")}</td>
      <td>${fmt(summary.views, "compact")}</td>
      <td>${fmt(summary.cpm, "currencySmall")}</td>
    </tr>
  `;
}

function renderPublishedVideoGroupedRows(rows, products) {
  if (state.publishedVideoView === "product") {
    return products
      .map((product) => {
        const groupRows = rows.filter((row) => row.productId === product.id);
        if (groupRows.length === 0) return "";
        return `
          ${renderPublishedVideoGroupHeader(product.name, `${product.priority} · Product`, groupRows)}
          ${groupRows.map((row) => renderPublishedVideoRow(row, products)).join("")}
          ${renderPublishedVideoSubtotal(`${product.name} 小计`, groupRows)}
        `;
      })
      .join("");
  }

  if (state.publishedVideoView === "grade") {
    return ["S", "A", "B"]
      .map((grade) => {
        const groupRows = rows.filter((row) => row.grade === grade);
        if (groupRows.length === 0) return "";
        return `
          ${renderPublishedVideoGroupHeader(`${grade}级达人`, "Creator Grade", groupRows)}
          ${groupRows.map((row) => renderPublishedVideoRow(row, products)).join("")}
          ${renderPublishedVideoSubtotal(`${grade}级达人小计`, groupRows)}
        `;
      })
      .join("");
  }

  if (state.publishedVideoView === "content") {
    return publishedVideoContentTypes
      .map((type) => {
        const typeRows = rows.filter((row) => row.contentType === type.key);
        if (typeRows.length === 0) return "";
        const angleGroups = publishedVideoAngles
          .map((angle) => {
            const angleRows = typeRows.filter((row) => row.angle === angle);
            if (angleRows.length === 0) return "";
            return `
              ${renderPublishedVideoGroupHeader(angle, type.label, angleRows, 2)}
              ${angleRows.map((row) => renderPublishedVideoRow(row, products)).join("")}
              ${renderPublishedVideoSubtotal(`${angle} 小计`, angleRows, "level-2")}
            `;
          })
          .join("");
        return `
          ${renderPublishedVideoGroupHeader(type.label, "Content Type", typeRows)}
          ${angleGroups}
          ${renderPublishedVideoSubtotal(`${type.label} 小计`, typeRows)}
        `;
      })
      .join("");
  }

  return rows.map((row) => renderPublishedVideoRow(row, products)).join("");
}

function renderPublishedVideoTable(rows, products) {
  if (rows.length === 0) {
    return `
      <div class="published-video-empty">
        <strong>当前周期暂无发布视频</strong>
        <span>请选择本月 MTD 或其他自然周查看。</span>
      </div>
    `;
  }

  const summary = summarizePublishedVideoRows(rows);
  return `
    <div class="table-wrap published-video-table-wrap">
      <table class="published-video-table">
        <thead>
          <tr>
            <th>Video ID</th>
            <th>Creator Name</th>
            <th>Product Name</th>
            <th>Content</th>
            <th>Post Date</th>
            <th>Video Cost</th>
            <th>GMV</th>
            <th>ROI</th>
            <th>Views</th>
            <th>CPM</th>
          </tr>
        </thead>
        <tbody>${renderPublishedVideoGroupedRows(rows, products)}</tbody>
        <tfoot>
          <tr>
            <td colspan="5"><strong>当前周期总计 · ${summary.videos} Videos</strong></td>
            <td>${fmt(summary.cost, "currency")}</td>
            <td>${fmt(summary.gmv, "currency")}</td>
            <td>${fmt(summary.roi, "ratio")}</td>
            <td>${fmt(summary.views, "compact")}</td>
            <td>${fmt(summary.cpm, "currencySmall")}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `;
}

function renderPublishedVideoModule(products) {
  const filters = state.publishedVideoFilters;
  const rows = getPublishedVideoRows(products);
  const periods = getPublishedVideoPeriods();
  const viewDescriptions = {
    detail: "按发布时间倒序呈现全部视频。",
    product: "按产品分组，保留组内全部视频与产品小计。",
    grade: "按达人等级分组，保留组内全部视频与等级小计。",
    content: "按 Content Type → Content Angle 两级分组，保留全部视频与分组小计。",
  };

  return `
    <section id="publishedVideoModule" class="panel published-video-module">
      <div class="published-video-header">
        <div>
          <span class="section-kicker">PUBLISHED VIDEO LIBRARY</span>
          <h2>视频发布列表</h2>
          <p>顶部月份决定业务月份；本模块选择本月 MTD 或所属自然周，并对全部发布视频切换分组方式。</p>
        </div>
        <span class="pill blue">Demo · ${rows.length} Videos</span>
      </div>

      <div class="published-video-period">
        <span>会议周期</span>
        <div class="published-period-options" style="--period-count:${periods.length}" role="group" aria-label="视频发布列表时间范围">
          ${periods
            .map(
              (period) => `
                <button
                  class="${filters.period === period.key ? "active" : ""}"
                  type="button"
                  data-published-period="${period.key}"
                >
                  <strong>${period.label}</strong>
                  <span>${period.sublabel}</span>
                </button>
              `,
            )
            .join("")}
        </div>
      </div>

      ${renderPublishedVideoSummary(rows)}

      <div class="published-video-table-head">
        <div>
          <h3>发布视频明细</h3>
          <p>${viewDescriptions[state.publishedVideoView]} 当前周期始终呈现全部实际发布视频。</p>
        </div>
        <div class="pic-progress-modes published-video-view-modes" role="group" aria-label="视频发布列表展示方式">
          ${[
            ["detail", "视频明细"],
            ["product", "按产品"],
            ["grade", "按达人等级"],
            ["content", "按内容"],
          ]
            .map(
              ([value, label]) => `
                <button
                  class="${state.publishedVideoView === value ? "active" : ""}"
                  type="button"
                  data-published-view="${value}"
                >${label}</button>
              `,
            )
            .join("")}
        </div>
      </div>

      ${renderPublishedVideoTable(rows, products)}
      <p class="published-video-method-note">
        自然周口径为周一至周日，并按周日所在月份归属；当前自然周的数据只累计至MTD日期。
      </p>
    </section>
  `;
}

function refreshPublishedVideoModule(products) {
  const module = $("#publishedVideoModule");
  if (!module) return;
  module.outerHTML = renderPublishedVideoModule(products);
  bindPublishedVideoModule(products);
}

function bindPublishedVideoModule(products) {
  const module = $("#publishedVideoModule");
  if (!module) return;

  Array.from(module.querySelectorAll("[data-published-period]")).forEach((button) => {
    button.addEventListener("click", () => {
      state.publishedVideoFilters.period = button.dataset.publishedPeriod;
      refreshPublishedVideoModule(products);
    });
  });

  Array.from(module.querySelectorAll("[data-published-view]")).forEach((button) => {
    button.addEventListener("click", () => {
      state.publishedVideoView = button.dataset.publishedView;
      refreshPublishedVideoModule(products);
    });
  });
}

function renderPublishingAiAnalysis(products, actual, target) {
  const releaseRisk = [...products].sort(
    (a, b) => a.mtd.videos / a.target.videos - b.mtd.videos / b.target.videos,
  )[0];
  const resultLeader = [...products].sort(
    (a, b) => withDerived(b.mtd).roi - withDerived(a.mtd).roi,
  )[0];
  const remaining = Math.max(target.videos - actual.videos, 0);
  const gmvGap = Math.max(target.gmv - actual.gmv, 0);

  return `
    <section class="panel pic-ai-summary">
      <div class="panel-header">
        <div>
          <span class="section-kicker">AI ANALYSIS</span>
          <h2>AI发布分析与总结</h2>
          <p>把发布过程与发布结果放在一起判断，直接形成下一步工作重点。</p>
        </div>
        <span class="pill blue">Auto-generated</span>
      </div>
      <div class="pic-ai-summary-grid">
        <article>
          <span class="ai-number">1</span>
          <div>
            <h3>发布进度</h3>
            <p>已发布 ${actual.videos} / ${target.videos} 条，仍有 ${remaining} 条Gap。${releaseRisk.name} 的发布达成相对较低，应优先检查产品与达人等级结构。</p>
          </div>
        </article>
        <article>
          <span class="ai-number">2</span>
          <div>
            <h3>发布结果</h3>
            <p>${resultLeader.name} 当前ROI为 ${fmt(withDerived(resultLeader.mtd).roi, "ratio")}。整体GMV仍差 ${fmt(gmvGap, "currency")}；新增发布应优先复用高转化内容结构。</p>
          </div>
        </article>
        <article>
          <span class="ai-number">3</span>
          <div>
            <h3>资源建议</h3>
            <p>结合发布达成率和预算使用率决定资源分配。若Day Cream预算使用快于发布进度，应先修复结构和效率，而不是继续扩大投入。</p>
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderPic() {
  const pic = getPic();
  const products = getPicDashboardProducts();
  const target = sumTargets(products);
  const mtd = sumMetrics(products, "mtd");
  const lmSamePeriod = sumMetrics(products, "lmSamePeriod");
  const lastWeek = sumMetrics(products, "lastWeek");
  const lmLastWeek = sumMetrics(products, "lmLastWeek");

  $("#viewEyebrow").textContent = "PIC Dashboard";
  $("#viewTitle").textContent = `${pic.name} · Publishing Progress & Results`;

  $("#picView").innerHTML = `
    ${renderPicActionSummary(pic, products, mtd, target)}
    ${renderPublishingProgress(products)}
    ${renderPublishingResults(products, mtd, target, lmSamePeriod, pic)}
    ${renderVideoPlanModule(products)}
    ${renderPublishedVideoModule(products)}
    ${renderPublishingAiAnalysis(products, mtd, target)}
    ${renderPicAiReports(pic, products, mtd, target, lastWeek, lmLastWeek)}
  `;

  bindPicPublishingProgress();
  bindPicPublishingResults();
  bindVideoPlanFilters(products);
  bindPublishedVideoModule(products);
}

function renderPicAi(pic, products, actual, target) {
  const weakest = [...products].sort((a, b) => a.mtd.gmv / a.target.gmv - b.mtd.gmv / b.target.gmv)[0];
  const videoGap = Math.ceil(Math.max(target.videos - actual.videos, 0));
  const gmvGap = Math.max(target.gmv - actual.gmv, 0);

  return `
    <section class="panel ai-panel">
      <div class="panel-header">
        <div>
          <h2>AI 执行建议</h2>
          <p class="muted">面向PIC的今日动作、Gap原因和汇报文案。</p>
        </div>
      </div>
      <div class="ai-block">
        <h3>今日动作</h3>
        <p>优先处理 ${weakest.name}。当前还差 ${videoGap} 条视频和 ${fmt(gmvGap, "currency")} GMV，建议今天先推动已收样达人确认发布时间，并补充B级达人视频排期。</p>
      </div>
      <div class="ai-block">
        <h3>Gap原因</h3>
        <ul>
          <li>视频进度 ${pct(actual.videos / target.videos)}，略低于时间进度。</li>
          <li>GMV达成 ${pct(actual.gmv / target.gmv)}，说明发布数量和转化都需要补强。</li>
          <li>CPM为 ${fmt(actual.cpm, "currencySmall")}，需要避免继续放大高成本低转化内容。</li>
        </ul>
      </div>
      <div class="ai-block">
        <h3>汇报文案</h3>
        <p>今日我负责的产品整体视频达成率为 ${pct(actual.videos / target.videos)}，GMV达成率为 ${pct(actual.gmv / target.gmv)}。主要Gap来自 ${weakest.name}，明天将优先推进达人发布与内容补量，并控制低ROI预算消耗。</p>
      </div>
    </section>
  `;
}

function renderPicAiReports(pic, products, actual, target, lastWeek, lmLastWeek) {
  const weakest = [...products].sort((a, b) => a.mtd.gmv / a.target.gmv - b.mtd.gmv / b.target.gmv)[0];
  const weekDelta = deltaPct(lastWeek.gmv, lmLastWeek.gmv);

  return renderAiReports(
    `${pic.name} 发布`,
    {
      status: weekDelta >= 0 ? "yellow" : "red",
      title: "上周执行有进展，但核心产品Gap需要本周优先处理",
      summary: `上周你负责产品GMV为 ${fmt(lastWeek.gmv, "currency")}，较上月对应周 ${weekDelta >= 0 ? "增长" : "下降"} ${pct(Math.abs(weekDelta))}。本周重点是处理 ${weakest.name} 的视频排期和转化。`,
      sections: [
        {
          icon: "Target",
          title: "目标达成",
          summary: `周GMV ${fmt(lastWeek.gmv, "currency")}`,
          body: `上周GMV为 ${fmt(lastWeek.gmv, "currency")}，相比上月对应周${weekDelta >= 0 ? "提升" : "下降"} ${pct(Math.abs(weekDelta))}。`,
          details: [
            `本周需要继续保持发布节奏，避免周中断档。`,
            `GMV变化要和视频数、ROI同时解释，不能只汇报销售额。`,
            `如果Views提升但GMV没有同步提升，要说明转化问题。`,
          ],
        },
        {
          icon: "Gap",
          title: "Gap诊断",
          summary: `${weakest.name} 是重点Gap`,
          body: `当前主要Gap来自 ${weakest.name}，需要判断是视频数不足、达人等级不足，还是内容转化弱。`,
          details: [
            `先检查已寄样/已收样但未发布达人，找到可快速追回的视频。`,
            `如果A级达人视频不足，本周优先推进中腰部稳定发布。`,
            `如果CPM偏高，暂停继续放大低效视频。`,
          ],
        },
        {
          icon: "Action",
          title: "行动建议",
          summary: "今日先补排期",
          body: "本周动作应先解决可控执行问题，再反馈需要Leader支持的资源。",
          details: [
            `今天确认 ${weakest.name} 所有未发布达人状态。`,
            `补充B级达人内容密度，同时推进1-2条A级视频。`,
            `如果ROI继续低于目标，向Brand Leader反馈预算和Offer调整建议。`,
          ],
        },
      ],
    },
    {
      status: actual.gmv / target.gmv >= MTD_DAYS / DAYS_IN_MONTH ? "green" : "yellow",
      title: "月度目标仍可追回，但需要把日行动拆得更细",
      summary: `截至MTD，你负责目标GMV达成 ${pct(actual.gmv / target.gmv)}，视频达成 ${pct(actual.videos / target.videos)}。月底前每天至少需要补 ${Math.ceil(Math.max(target.videos - actual.videos, 0) / (DAYS_IN_MONTH - MTD_DAYS))} 条视频。`,
      sections: [
        {
          icon: "Target",
          title: "目标达成",
          summary: `视频 ${pct(actual.videos / target.videos)}`,
          body: `当前视频达成 ${pct(actual.videos / target.videos)}，GMV达成 ${pct(actual.gmv / target.gmv)}。`,
          details: [
            `剩余每天至少需要补 ${Math.ceil(Math.max(target.videos - actual.videos, 0) / (DAYS_IN_MONTH - MTD_DAYS))} 条视频。`,
            `每天需新增约 ${fmt(Math.max(target.gmv - actual.gmv, 0) / (DAYS_IN_MONTH - MTD_DAYS), "currency")} GMV 才能追平目标。`,
            `当前ROI为 ${fmt(actual.roi, "ratio")}，需要持续对比目标ROI ${fmt(target.roi, "ratio")}。`,
          ],
        },
        {
          icon: "Gap",
          title: "Gap诊断",
          summary: "发布与转化需同时修复",
          body: "如果只补视频而不提升转化，月底仍可能出现视频达标但GMV未达标。",
          details: [
            `优先看S/A/B视频结构，确认是否缺少高质量达人。`,
            `检查表现差的视频是否存在Hook弱、卖点不清、CTA不足。`,
            `把需要Leader支持的预算、达人、Offer问题单独列出。`,
          ],
        },
        {
          icon: "Action",
          title: "行动建议",
          summary: "月报要有资源请求",
          body: "月报不只是复盘，要输出下月可以执行的资源和动作请求。",
          details: [
            `列出已完成动作、未完成原因、下月改进动作。`,
            `对达成差的产品说明是否需要换达人层级或调整Offer。`,
            `把需要Brand Leader协调的达人资源和预算缺口写清楚。`,
          ],
        },
      ],
    },
  );
}

function renderPicTaskTable(products) {
  const rows = products
    .map((product) => {
      const actual = withDerived(product.mtd);
      const target = withDerived(product.target);
      const risk = overallStatus(actual, target);
      const nextAction =
        actual.videos / target.videos < MTD_DAYS / DAYS_IN_MONTH
          ? "补视频排期"
          : actual.gmv / target.gmv < MTD_DAYS / DAYS_IN_MONTH
            ? "优化转化"
            : actual.cpm > target.cpm
              ? "控制CPM"
              : "可加码";

      return `
        <tr>
          <td><strong>${product.name}</strong></td>
          <td>${product.priority}</td>
          <td>${fmt(actual.budget, "currency")} / ${fmt(target.budget, "currency")}</td>
          <td>${actual.videos} / ${target.videos}</td>
          <td>${fmt(actual.gmv, "currency")} / ${fmt(target.gmv, "currency")}</td>
          <td>${fmt(actual.roi, "ratio")}</td>
          <td>${fmt(actual.views, "compact")}</td>
          <td>${fmt(actual.cpm, "currencySmall")}</td>
          <td>${target.s - actual.s}/${target.a - actual.a}/${target.b - actual.b}</td>
          <td>${riskPill(risk)}</td>
          <td>${nextAction}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>产品任务列表</h2>
          <p>把目标Gap直接翻译成PIC今天可执行的动作。</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Priority</th>
              <th>Budget</th>
              <th>Videos</th>
              <th>GMV</th>
              <th>ROI</th>
              <th>Views</th>
              <th>CPM</th>
              <th>S/A/B Gap</th>
              <th>Risk</th>
              <th>Next Action</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function renderGstManagementSummary(rows, products, pics) {
  const weakestBrand = [...rows].sort((a, b) => a.mtd.gmv / a.target.gmv - b.mtd.gmv / b.target.gmv)[0];
  const strongestBrand = [...rows].sort((a, b) => b.mtd.roi / b.target.roi - a.mtd.roi / a.target.roi)[0];
  const weakestProduct = [...products].sort((a, b) => a.mtd.gmv / a.target.gmv - b.mtd.gmv / b.target.gmv)[0];
  const weakestPic = [...pics].sort((a, b) => a.mtd.gmv / a.target.gmv - b.mtd.gmv / b.target.gmv)[0];

  return renderDecisionSummary({
    title: `集团发布结果分化，优先介入 ${weakestBrand.name}`,
    description: `GST先判断资源如何流动，再看品牌解释。当前最需要修复的产品是 ${weakestProduct.name}，执行侧重点跟进 ${weakestPic.name}。`,
    status: "yellow",
    metrics: [
      { label: "加码候选品牌", value: strongestBrand.name },
      { label: "风险产品", value: weakestProduct.name },
      { label: "重点PIC", value: `${weakestPic.name} · ${weakestPic.brandName}` },
    ],
    actions: [
      `要求 ${weakestBrand.leader} 提交品牌发布结果恢复计划。`,
      `复盘 ${weakestProduct.name} 的达人质量、内容角度与Offer。`,
      `验证 ${strongestBrand.name} 是否具备小额增量预算条件。`,
    ],
  });
}

function renderGstBrandMetric(label, actual, target, key, type) {
  const ratio =
    key === "cpm"
      ? target.cpm / actual.cpm
      : key === "roi"
        ? actual.roi / target.roi
        : actual[key] / target[key];
  const status =
    key === "cpm"
      ? actual.cpm <= target.cpm
        ? "green"
        : "yellow"
      : healthStatusForRatio(ratio);

  return `
    <div class="gst-brand-metric ${status}">
      <span>${label}</span>
      <strong>${fmt(actual[key], type)}</strong>
      <small>Target ${fmt(target[key], type)}</small>
    </div>
  `;
}

function renderGstBrandPublishingResults(rows, products) {
  return `
    <section class="panel gst-brand-results-panel">
      <div class="panel-header">
        <div>
          <span class="section-kicker">PUBLISHING RESULTS</span>
          <h2>品牌发布结果</h2>
          <p>品牌信息直接排列展示，无需点击；点击品牌下属产品可展开负责人、预算、达人结构与下一步动作。</p>
        </div>
        <span class="pill blue">${rows.length} Brands · ${products.length} Products</span>
      </div>
      <div class="gst-brand-result-list">
        ${rows
          .map((brand) => {
            const actual = withDerived(brand.mtd);
            const target = withDerived(brand.target);
            const status = overallStatus(actual, target);
            const brandProducts = products.filter((product) => product.brandId === brand.id);
            return `
              <article class="gst-brand-result-card ${status}">
                <div class="gst-brand-result-header">
                  <div>
                    <span>${brand.market} · Brand Leader ${brand.leader}</span>
                    <h3>${brand.name}</h3>
                  </div>
                  ${riskPill(status)}
                </div>
                <div class="gst-brand-result-metrics">
                  ${renderGstBrandMetric("Budget", actual, target, "budget", "currency")}
                  ${renderGstBrandMetric("Published", actual, target, "videos", "number")}
                  ${renderGstBrandMetric("GMV", actual, target, "gmv", "currency")}
                  ${renderGstBrandMetric("ROI", actual, target, "roi", "ratio")}
                  ${renderGstBrandMetric("Views", actual, target, "views", "compact")}
                  ${renderGstBrandMetric("CPM", actual, target, "cpm", "currencySmall")}
                </div>
                <p class="gst-brand-ai-note"><strong>GST判断：</strong>${brand.ai}</p>
                <div class="gst-brand-product-heading">
                  <strong>下属产品发布结果</strong>
                  <span>点击产品展开详情</span>
                </div>
                <div class="brand-product-result-scroll">
                  <div class="brand-product-result-table gst-brand-product-table">
                    <div class="brand-product-result-head">
                      <span>Product</span>
                      <span>Published</span>
                      <span>GMV</span>
                      <span>ROI</span>
                      <span>Views</span>
                      <span>CPM</span>
                      <span>AI判断</span>
                    </div>
                    ${brandProducts
                      .map((product) => {
                        const productStatus = overallStatus(product.mtd, product.target);
                        return `
                          <details class="brand-product-result">
                            <summary class="brand-product-result-summary">
                              <div class="drill-product-name">
                                <span class="product-drill-arrow" aria-hidden="true"></span>
                                <div>
                                  <strong>${product.name}</strong>
                                  <span>${product.priority} · ${riskPill(productStatus)} · ${product.picName}</span>
                                </div>
                              </div>
                              ${renderPublishingResultMetric(product.mtd, product.target, "videos", "number")}
                              ${renderPublishingResultMetric(product.mtd, product.target, "gmv", "currency")}
                              ${renderPublishingResultMetric(product.mtd, product.target, "roi", "ratio")}
                              ${renderPublishingResultMetric(product.mtd, product.target, "views", "compact")}
                              ${renderPublishingResultMetric(product.mtd, product.target, "cpm", "currencySmall")}
                              <p class="drill-ai-note">${product.ai}</p>
                            </summary>
                            <div class="gst-product-result-detail">
                              <article>
                                <span>Owner PIC</span>
                                <strong>${product.picName}</strong>
                                <small>${product.brandName}</small>
                              </article>
                              <article>
                                <span>Budget</span>
                                <strong>${fmt(product.mtd.budget, "currency")} / ${fmt(product.target.budget, "currency")}</strong>
                                <small>使用 ${pct(product.mtd.budget / product.target.budget)}</small>
                              </article>
                              <article>
                                <span>S / A / B Published</span>
                                <strong>${product.mtd.s}/${product.target.s} · ${product.mtd.a}/${product.target.a} · ${product.mtd.b}/${product.target.b}</strong>
                                <small>达人等级发布结构</small>
                              </article>
                              <article>
                                <span>Next Action</span>
                                <strong>${getPublishingResultAction(product.mtd, product.target)}</strong>
                                <small>基于发布量、GMV、ROI与CPM</small>
                              </article>
                            </div>
                          </details>
                        `;
                      })
                      .join("")}
                  </div>
                </div>
              </article>
            `;
          })
          .join("")}
      </div>
    </section>
  `;
}

function renderGstProductResults(products) {
  const sortedProducts = [...products].sort(
    (a, b) => a.mtd.gmv / a.target.gmv - b.mtd.gmv / b.target.gmv,
  );

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>GST 产品发布结果</h2>
          <p>跨品牌比较产品的发布量与商业结果，优先识别集团级加码产品和修复产品。</p>
        </div>
        <span class="pill blue">${products.length} Products</span>
      </div>
      <div class="table-wrap">
        <table class="publishing-result-table gst-product-portfolio-table">
          <thead>
            <tr>
              <th>Brand / Product</th>
              <th>PIC</th>
              <th>Published</th>
              <th>GMV</th>
              <th>ROI</th>
              <th>Views</th>
              <th>CPM</th>
              <th>Status</th>
              <th>GST Action</th>
            </tr>
          </thead>
          <tbody>
            ${sortedProducts
              .map((product) => {
                const status = overallStatus(product.mtd, product.target);
                return `
                  <tr>
                    <td><strong>${product.name}</strong><span class="subline">${product.brandName} · ${product.market} · ${product.priority}</span></td>
                    <td><strong>${product.picName}</strong></td>
                    <td><strong>${product.mtd.videos} / ${product.target.videos}</strong><span class="subline">${pct(product.mtd.videos / product.target.videos)}</span></td>
                    <td><strong>${fmt(product.mtd.gmv, "currency")}</strong><span class="subline">Target ${fmt(product.target.gmv, "currency")}</span></td>
                    <td><strong>${fmt(product.mtd.roi, "ratio")}</strong><span class="subline">Target ${fmt(product.target.roi, "ratio")}</span></td>
                    <td><strong>${fmt(product.mtd.views, "compact")}</strong><span class="subline">${pct(product.mtd.views / product.target.views)}</span></td>
                    <td><strong>${fmt(product.mtd.cpm, "currencySmall")}</strong><span class="subline">Target ${fmt(product.target.cpm, "currencySmall")}</span></td>
                    <td>${riskPill(status)}</td>
                    <td><strong>${getPublishingResultAction(product.mtd, product.target)}</strong></td>
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderGstPicResults(pics) {
  const sortedPics = [...pics].sort((a, b) => a.mtd.gmv / a.target.gmv - b.mtd.gmv / b.target.gmv);

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>GST PIC 发布结果</h2>
          <p>从集团层识别需要支持的执行负责人，以及可跨品牌复制的PIC打法。</p>
        </div>
        <span class="pill blue">${pics.length} PICs</span>
      </div>
      <div class="table-wrap">
        <table class="publishing-result-table gst-pic-portfolio-table">
          <thead>
            <tr>
              <th>PIC / Brand</th>
              <th>Products</th>
              <th>Published</th>
              <th>Remaining</th>
              <th>GMV</th>
              <th>ROI</th>
              <th>Views</th>
              <th>Status</th>
              <th>Management Action</th>
            </tr>
          </thead>
          <tbody>
            ${sortedPics
              .map((pic) => {
                const status = overallStatus(pic.mtd, pic.target);
                return `
                  <tr>
                    <td><strong>${pic.name}</strong><span class="subline">${pic.brandName} · ${pic.market}</span></td>
                    <td>${pic.products.join("、")}</td>
                    <td><strong>${pic.mtd.videos} / ${pic.target.videos}</strong><span class="subline">${pct(pic.mtd.videos / pic.target.videos)}</span></td>
                    <td><strong>${Math.max(pic.target.videos - pic.mtd.videos, 0)}</strong><span class="subline">videos to target</span></td>
                    <td><strong>${fmt(pic.mtd.gmv, "currency")}</strong><span class="subline">Target ${fmt(pic.target.gmv, "currency")}</span></td>
                    <td><strong>${fmt(pic.mtd.roi, "ratio")}</strong><span class="subline">Target ${fmt(pic.target.roi, "ratio")}</span></td>
                    <td><strong>${fmt(pic.mtd.views, "compact")}</strong><span class="subline">${pct(pic.mtd.views / pic.target.views)}</span></td>
                    <td>${riskPill(status)}</td>
                    <td><strong>${getPublishingResultAction(pic.mtd, pic.target)}</strong></td>
                  </tr>
                `;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderGstAiReports(actual, target, rows, lastWeek, lmLastWeek) {
  const weakest = [...rows].sort((a, b) => a.mtd.gmv / a.target.gmv - b.mtd.gmv / b.target.gmv)[0];
  const strongest = [...rows].sort((a, b) => b.mtd.roi / b.target.roi - a.mtd.roi / a.target.roi)[0];
  const largest = [...rows].sort((a, b) => b.mtd.gmv - a.mtd.gmv)[0];
  const budgetRisk = [...rows].sort((a, b) => b.mtd.budget / b.target.budget - a.mtd.budget / a.target.budget)[0];
  const weekDelta = deltaPct(lastWeek.gmv, lmLastWeek.gmv);

  return renderAiReports(
    "GST",
    {
      status: weekDelta >= 0 ? "yellow" : "red",
      title: "集团周度增长仍有分化，高层应关注预算效率和风险品牌",
      summary: `集团上周KOL GMV为 ${fmt(lastWeek.gmv, "currency")}，较上月对应周 ${weekDelta >= 0 ? "增长" : "下降"} ${pct(Math.abs(weekDelta))}。${strongest.name} 效率最好，${weakest.name} 是主要风险。`,
      sections: [
        {
          icon: "Target",
          title: "目标达成",
          summary: `周GMV ${fmt(lastWeek.gmv, "currency")}`,
          body: `集团上周GMV为 ${fmt(lastWeek.gmv, "currency")}，相比上月对应周${weekDelta >= 0 ? "提升" : "下降"} ${pct(Math.abs(weekDelta))}。`,
          details: [
            `${strongest.name} ROI效率最好，可作为跨市场内容和达人结构参考。`,
            `本周高层需要同时看GMV规模和ROI效率，避免只看销售排名。`,
            `品牌之间的增长分化已经足够明显，需要分层管理。`,
          ],
        },
        {
          icon: "Gap",
          title: "Gap诊断",
          summary: `${weakest.name} 风险最高`,
          body: `${weakest.name} 是当前最大管理风险，说明预算使用和GMV产出之间出现错位。`,
          details: [
            `预算消耗快但GMV落后时，应暂停继续扩大低效投放。`,
            `如果视频数不低但ROI低，问题更可能在达人质量、Offer或转化路径。`,
            `高层应要求Brand Leader提交恢复计划，而不是只要求补量。`,
          ],
        },
        {
          icon: "Action",
          title: "行动建议",
          summary: "品牌分层管理",
          body: "本周CEO/CMO应把品牌组合分成加码、修复、观察三类。",
          details: [
            `${strongest.name}：进入加码候选，验证是否能提高预算。`,
            `${weakest.name}：进入修复名单，要求48小时内提交恢复计划。`,
            `其余品牌进入观察名单，继续看周度GMV、ROI、CPM变化。`,
          ],
        },
      ],
      perspectives: [
        {
          icon: "Brand",
          status: "yellow",
          title: "品牌横向透视",
          headline: `${strongest.name} 可加码，${weakest.name} 需修复`,
          body: `横向看，${strongest.name} 的ROI效率最好，${weakest.name} 的GMV达成最低。高层应按品牌状态分层，而不是统一要求所有品牌补视频。`,
          action: "本周把品牌分成加码、修复、观察三组，并要求各Brand Leader按组提交动作。",
        },
        {
          icon: "Budget",
          status: "red",
          title: "资源效率透视",
          headline: `${budgetRisk.name} 预算使用压力最高`,
          body: `${budgetRisk.name} 的预算使用率高于其GMV达成节奏，说明继续投入前需要先验证ROI和CPM是否可控。`,
          action: "CEO/CMO应冻结高CPM低ROI增量预算，转向ROI健康品牌做小额加码测试。",
        },
        {
          icon: "Govern",
          status: "blue",
          title: "管理抓手",
          headline: "用品牌组合会替代单品牌汇报",
          body: "高层会议不应听每个品牌流水账，而应只看Top Opportunity、Top Risk、Resource Ask和Decision Required。",
          action: "周会固定输出三件事：加码品牌、修复品牌、需CEO/CMO拍板事项。",
        },
      ],
      managementOpinion: {
        title: "CEO/CMO周度管理意见",
        body: "本周高层抓手应从“看数据”转为“调资源”。核心不是让每个品牌解释细节，而是决定预算流向和风险品牌处理机制。",
        points: [
          `${strongest.name}：进入加码候选，但加码前要求说明可复制的达人等级和内容结构。`,
          `${weakest.name}：进入修复名单，要求Brand Leader在48小时内提交恢复计划。`,
          `${budgetRisk.name}：进入预算效率审查，暂停新增低确定性预算。`,
        ],
      },
    },
    {
      status: actual.gmv / target.gmv >= MTD_DAYS / DAYS_IN_MONTH ? "green" : "yellow",
      title: "集团月度进度需要预算再分配，月底复盘应服务下月资源决策",
      summary: `截至MTD，集团GMV达成 ${pct(actual.gmv / target.gmv)}，预算使用 ${pct(actual.budget / target.budget)}，整体ROI为 ${fmt(actual.roi, "ratio")}。按当前速度，月底GMV预计完成 ${pct((actual.gmv / MTD_DAYS) * DAYS_IN_MONTH / target.gmv)}。`,
      sections: [
        {
          icon: "Target",
          title: "目标达成",
          summary: `集团GMV ${pct(actual.gmv / target.gmv)}`,
          body: `集团MTD GMV达成 ${pct(actual.gmv / target.gmv)}，预算使用 ${pct(actual.budget / target.budget)}，整体ROI为 ${fmt(actual.roi, "ratio")}。`,
          details: [
            `预计月底GMV完成 ${pct((actual.gmv / MTD_DAYS) * DAYS_IN_MONTH / target.gmv)}。`,
            `当前预算使用速度需要和ROI一起看，不能单独判断快慢。`,
            `S/A/B视频结构应纳入集团月报，而不只是品牌内部指标。`,
          ],
        },
        {
          icon: "Gap",
          title: "Gap诊断",
          summary: "预算效率分化",
          body: "集团层面的核心Gap不是单一品牌落后，而是预算效率在品牌之间分化。",
          details: [
            `高CPM低ROI品牌应进入预算收缩或修复名单。`,
            `ROI健康但GMV规模小的品牌，可以进入小额加码测试。`,
            `GMV高但ROI弱的品牌，需要单独解释利润和现金效率风险。`,
          ],
        },
        {
          icon: "Action",
          title: "行动建议",
          summary: "形成下月预算依据",
          body: "月报输出必须服务下月预算、产品优先级和Brand Leader管理动作。",
          details: [
            `把品牌分为加码、修复、观察三类。`,
            `把预算从高CPM低ROI品牌，向ROI健康且可规模化的品牌倾斜。`,
            `要求每个风险品牌提交下月目标修正和PIC执行改善计划。`,
          ],
        },
      ],
      perspectives: [
        {
          icon: "Brand",
          status: "yellow",
          title: "品牌组合透视",
          headline: `${largest.name} 贡献最大，但不能只按规模决策`,
          body: `${largest.name} 是当前GMV最大贡献品牌，但集团层面的月度管理还要同时看ROI、CPM、预算速度和目标达成。`,
          action: "月报按规模贡献、效率贡献、风险贡献三张榜管理，而不是只看GMV排名。",
        },
        {
          icon: "Budget",
          status: "yellow",
          title: "预算配置透视",
          headline: "下月预算应按效率再分配",
          body: "集团预算配置需要从历史惯性转为动态分配：ROI健康且可放量的品牌加码，高CPM低ROI品牌先修复。",
          action: "下月预算会前先形成建议表：加码金额、收缩金额、观察金额。",
        },
        {
          icon: "Govern",
          status: "blue",
          title: "组织管理透视",
          headline: "用统一经营口径管理Brand Leader",
          body: "CEO/CMO需要统一Brand Leader汇报结构：目标达成、Gap原因、资源请求、下月动作，避免每个品牌自行叙述。",
          action: "把GST月报作为经营会模板，所有品牌按同一结构提交月度复盘。",
        },
      ],
      managementOpinion: {
        title: "CEO/CMO月度管理意见",
        body: "GST月报的价值在于形成下月经营决策：品牌优先级、预算配置、风险管理和组织问责。建议把报告结论直接转化为下月目标拆解规则。",
        points: [
          "品牌分层：加码品牌拿预算，修复品牌拿管理支持，观察品牌拿测试目标。",
          "预算分层：用ROI、CPM、GMV达成率共同决定预算增减，而不是按销售规模惯性分配。",
          "管理分层：对连续两周低于节奏的品牌建立CEO/CMO跟进项，直到恢复到目标轨道。",
        ],
      },
    },
  );
}

function renderGst() {
  const rows = demoData.gstBrands.map((row) => ({
    ...row,
    target: withDerived(row.target),
    mtd: withDerived(row.mtd),
    lastWeek: withDerived(row.lastWeek),
    lmLastWeek: withDerived(row.lmLastWeek),
  }));
  const target = sumGstTargets(rows);
  const mtd = sumGst(rows, "mtd");
  const lastWeek = sumGst(rows, "lastWeek");
  const lmLastWeek = sumGst(rows, "lmLastWeek");
  const lmSamePeriod = withDerived({
    budget: mtd.budget * 0.9,
    videos: mtd.videos * 0.94,
    gmv: mtd.gmv * 0.88,
    views: mtd.views * 0.91,
    s: mtd.s * 0.9,
    a: mtd.a * 0.92,
    b: mtd.b * 0.95,
  });
  const products = getGstProducts(rows);
  const pics = getGstPicRows(products);

  $("#viewEyebrow").textContent = "GST Dashboard";
  $("#viewTitle").textContent = "Company KOL Publishing & Business Results";

  $("#gstView").innerHTML = `
    ${renderGstManagementSummary(rows, products, pics)}
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>集团目标总览</h2>
          <p>统一查看公司级Actual / Target / Gap / 状态，作为品牌、产品与PIC资源决策入口。</p>
        </div>
      </div>
      ${renderKpiCards(mtd, target, lmSamePeriod)}
    </section>
    ${renderGstBrandPublishingResults(rows, products)}
    ${renderGstProductResults(products)}
    ${renderGstPicResults(pics)}
    ${renderGstAiReports(mtd, target, rows, lastWeek, lmLastWeek)}
  `;
}

function renderSetup() {
  const brand = getBrand();
  const products = getProducts();
  const target = sumTargets(products);

  $("#viewEyebrow").textContent = "Monthly Target Setup";
  $("#viewTitle").textContent = `${brand.name} 月度目标设置`;

  $("#setupView").innerHTML = `
    <div class="setup-steps">
      <div class="step-card"><strong>1. 品牌目标</strong><span>设定Budget、视频数、GMV、ROI、Views、CPM和S/A/B视频目标。</span></div>
      <div class="step-card"><strong>2. 产品拆解</strong><span>按Hero、Growth、Test产品分配目标。</span></div>
      <div class="step-card"><strong>3. PIC分配</strong><span>将产品目标分配给主PIC。</span></div>
      <div class="step-card"><strong>4. 汇总校验</strong><span>确认产品和PIC合计等于品牌目标。</span></div>
      <div class="step-card"><strong>5. 锁定执行</strong><span>目标确认后进入日度追踪。</span></div>
    </div>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>品牌月度总目标</h2>
          <p>${brand.leader} · ${brand.market} · June 2026</p>
        </div>
        <span class="pill green">Ready to lock</span>
      </div>
      <div class="kpi-grid">
        ${[
          ["Budget", fmt(target.budget, "currency")],
          ["Videos", fmt(target.videos)],
          ["GMV", fmt(target.gmv, "currency")],
          ["ROI", fmt(target.roi, "ratio")],
          ["Views", fmt(target.views, "compact")],
          ["CPM", fmt(target.cpm, "currencySmall")],
        ]
          .map(
            ([label, value]) => `
              <article class="kpi-card">
                <div class="kpi-top"><span class="kpi-name">${label}</span></div>
                <div class="kpi-value">${value}</div>
                <div class="kpi-meta"><span>Monthly target</span></div>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>

    ${renderAllocationTable(products)}

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>汇总校验</h2>
          <p>产品拆解与PIC分配必须回填到品牌总目标。</p>
        </div>
      </div>
      <div class="validation-grid">
        <div class="validation-card"><strong>Budget Match</strong><span>产品合计 = 品牌目标</span></div>
        <div class="validation-card"><strong>Videos Match</strong><span>S/A/B合计 = 视频目标</span></div>
        <div class="validation-card"><strong>GMV Match</strong><span>产品GMV合计 = 品牌目标</span></div>
        <div class="validation-card"><strong>PIC Assigned</strong><span>所有产品已分配主PIC</span></div>
      </div>
    </section>
  `;
}

function renderAllocationTable(products) {
  const rows = products
    .map((product) => {
      const pic = getPic(product.picId);
      const target = withDerived(product.target);
      return `
        <tr>
          <td><strong>${product.name}</strong></td>
          <td>${product.priority}</td>
          <td>${pic.name}</td>
          <td>${fmt(target.budget, "currency")}</td>
          <td>${fmt(target.videos)}</td>
          <td>${fmt(target.gmv, "currency")}</td>
          <td>${fmt(target.roi, "ratio")}</td>
          <td>${fmt(target.views, "compact")}</td>
          <td>${fmt(target.cpm, "currencySmall")}</td>
          <td>${target.s}/${target.a}/${target.b}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>产品目标拆解与PIC分配</h2>
          <p>示例数据沿用昨天的模块规划：Brand Leader设置品牌目标，拆产品，再分给PIC。</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Priority</th>
              <th>PIC</th>
              <th>Budget</th>
              <th>Videos</th>
              <th>GMV</th>
              <th>ROI</th>
              <th>Views</th>
              <th>CPM</th>
              <th>S/A/B</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
}

function populateControls() {
  $("#brandSelect").innerHTML = demoData.brands
    .map((brand) => `<option value="${brand.id}">${brand.name}</option>`)
    .join("");
  $("#monthSelect").innerHTML = demoData.months
    .map((month) => `<option value="${month.id}">${month.label}</option>`)
    .join("");
  $("#picSelect").innerHTML = demoData.pics
    .map((pic) => `<option value="${pic.id}">${pic.name}</option>`)
    .join("");
  $("#brandSelect").value = state.brandId;
  $("#monthSelect").value = state.month;
  $("#picSelect").value = state.picId;
}

function bindEvents() {
  $("#sidebarToggle").addEventListener("click", () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    storeSidebarState(state.sidebarCollapsed);
    renderSidebar();
  });

  $all(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      render();
    });
  });

  $("#brandSelect").addEventListener("change", (event) => {
    state.brandId = event.target.value;
    state.brandVideoPlanFilters.products = [];
    state.brandVideoPlanFilters.grades = [];
    state.brandVideoPlanFilters.pics = [];
    render();
  });

  $("#monthSelect").addEventListener("change", (event) => {
    state.month = event.target.value;
    state.publishedVideoFilters.period = "month";
    render();
  });

  $("#picSelect").addEventListener("change", (event) => {
    state.picId = event.target.value;
    state.picPublishingView = "product";
    state.picPublishingResultView = "product";
    state.picPublishingResultsOpen = false;
    state.publishedVideoView = "detail";
    state.publishedVideoFilters.period = "month";
    state.videoPlanFilters.products = [];
    state.videoPlanFilters.grades = [];
    render();
  });
}

function renderSidebar() {
  const shell = $(".app-shell");
  const toggle = $("#sidebarToggle");
  const isCollapsed = state.sidebarCollapsed;
  const label = isCollapsed ? "展开侧边栏" : "折叠侧边栏";

  shell.classList.toggle("sidebar-collapsed", isCollapsed);
  toggle.setAttribute("aria-expanded", String(!isCollapsed));
  toggle.setAttribute("aria-label", label);
  toggle.setAttribute("title", label);
}

function render() {
  renderSidebar();
  $all(".nav-btn").forEach((button) => button.classList.toggle("active", button.dataset.view === state.view));
  $all(".view").forEach((view) => view.classList.remove("active"));

  $("#picControl").classList.toggle("is-hidden", state.view !== "pic");

  if (state.view === "leader") {
    $("#leaderView").classList.add("active");
    renderLeader();
  }

  if (state.view === "gst") {
    $("#gstView").classList.add("active");
    renderGst();
  }

  if (state.view === "pic") {
    $("#picView").classList.add("active");
    renderPic();
  }

  if (state.view === "setup") {
    $("#setupView").classList.add("active");
    renderSetup();
  }
}

populateControls();
bindEvents();
render();
