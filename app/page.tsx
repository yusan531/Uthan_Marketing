"use client";

import { cloneElement, FormEvent, isValidElement, ReactElement, ReactNode, useEffect, useMemo, useState } from "react";

type MenuKey = "dashboard" | "target" | "budget" | "kol" | "campaign" | "content" | "sample" | "post" | "payment" | "report" | "settings";
type RoleKey = "country" | "brand" | "kolPic" | "ads" | "finance" | "analyst";
type ModalState = { type: string; id?: number } | null;

const menus: { key: MenuKey; label: string; labelEn: string; icon: string }[] = [
  { key: "dashboard", label: "工作台", labelEn: "Dashboard", icon: "⌂" },
  { key: "target", label: "目标管理", labelEn: "Target", icon: "◎" },
  { key: "budget", label: "预算管理", labelEn: "Budget", icon: "◒" },
  { key: "kol", label: "达人中心", labelEn: "KOL Center", icon: "◇" },
  { key: "campaign", label: "活动管理", labelEn: "Campaign", icon: "▣" },
  { key: "content", label: "内容任务", labelEn: "Content", icon: "▤" },
  { key: "sample", label: "样品管理", labelEn: "Sample", icon: "▧" },
  { key: "post", label: "视频 / 帖子", labelEn: "Video / Post", icon: "▷" },
  { key: "payment", label: "付款中心", labelEn: "Payment", icon: "¥" },
  { key: "report", label: "报表中心", labelEn: "Report", icon: "▥" },
  { key: "settings", label: "基础配置", labelEn: "Settings", icon: "⚙" },
];

const roles: { key: RoleKey; zh: string; en: string; menus: MenuKey[]; dashboardZh: string; dashboardEn: string }[] = [
  { key: "country", zh: "国家经理", en: "Country Manager", menus: ["dashboard","target","budget","kol","campaign","post","payment","report"], dashboardZh: "国家经营总览", dashboardEn: "Country Performance" },
  { key: "brand", zh: "品牌经理", en: "Brand Manager", menus: ["dashboard","target","budget","kol","campaign","content","sample","post","payment","report","settings"], dashboardZh: "品牌经营工作台", dashboardEn: "Brand Workspace" },
  { key: "kolPic", zh: "KOL PIC", en: "KOL PIC", menus: ["dashboard","kol","content","sample","post","payment","report"], dashboardZh: "KOL 执行工作台", dashboardEn: "KOL Execution" },
  { key: "ads", zh: "广告经理", en: "Ads Manager", menus: ["dashboard","budget","campaign","content","post","report"], dashboardZh: "广告投放工作台", dashboardEn: "Ads Performance" },
  { key: "finance", zh: "财务", en: "Finance", menus: ["dashboard","budget","payment","report","settings"], dashboardZh: "财务审批工作台", dashboardEn: "Finance Workspace" },
  { key: "analyst", zh: "数据分析师", en: "Data Analyst", menus: ["dashboard","target","budget","kol","campaign","post","report"], dashboardZh: "营销数据工作台", dashboardEn: "Marketing Analytics" },
];

const initialTargets = [
  { id: 1, product: "Serum Spray", priority: "Hero", pic: "Nisa", posts: 52, postsMtd: 38, budget: 4300, budgetMtd: 1900, gmv: 39000, gmvMtd: 21300, views: 2600000, viewsMtd: 1390000 },
  { id: 2, product: "Day Cream", priority: "Growth", pic: "Cilla", posts: 32, postsMtd: 7, budget: 2900, budgetMtd: 1000, gmv: 25000, gmvMtd: 12000, views: 1600000, viewsMtd: 800000 },
  { id: 3, product: "Tone-Up Sunscreen SPF50", priority: "Hero", pic: "Nadia", posts: 84, postsMtd: 45, budget: 7200, budgetMtd: 4300, gmv: 64000, gmvMtd: 33300, views: 4200000, viewsMtd: 2190000 },
  { id: 4, product: "Hydra Lip Serum", priority: "Test", pic: "Bima", posts: 58, postsMtd: 32, budget: 3600, budgetMtd: 1780, gmv: 27000, gmvMtd: 15100, views: 1900000, viewsMtd: 1080000 },
];
const initialBudgets = [
  { id: 1, category: "Content 内容", allocated: 428600, spent: 326400, owner: "Mia" },
  { id: 2, category: "KOL 合作", allocated: 356200, spent: 217300, owner: "Nadia" },
  { id: 3, category: "Media 投放", allocated: 182800, spent: 78600, owner: "James" },
  { id: 4, category: "Other 其他", allocated: 112400, spent: 31500, owner: "Zoe" },
];
const initialKols = [
  { id: 1, name: "BeautyWithYuki", platform: "小红书", tier: "S", category: "美妆", followers: 1280000, rate: 28000, status: "合作中" },
  { id: 2, name: "Nisa Glow", platform: "TikTok", tier: "A", category: "护肤", followers: 486000, rate: 12500, status: "合作中" },
  { id: 3, name: "Cilla Review", platform: "TikTok", tier: "A", category: "美妆", followers: 342000, rate: 9800, status: "待确认" },
  { id: 4, name: "DailyByMomo", platform: "Instagram", tier: "B", category: "生活方式", followers: 92000, rate: 4200, status: "候选" },
];
const initialCampaigns = [
  { id: 1, name: "夏日防晒种草计划", owner: "Mia", status: "进行中", progress: 68, budget: 320000, end: "2026-06-30" },
  { id: 2, name: "618 大促整合营销", owner: "James", status: "进行中", progress: 42, budget: 580000, end: "2026-06-18" },
  { id: 3, name: "新品精华预热 Campaign", owner: "Zoe", status: "待启动", progress: 12, budget: 180000, end: "2026-07-15" },
];
const initialContent = [
  { id: 1, title: "防晒实测图文 × 8", campaign: "夏日防晒种草计划", owner: "Nadia", channel: "小红书", due: "06-14", status: "制作中" },
  { id: 2, title: "Serum Spray 开箱短视频", campaign: "新品精华预热 Campaign", owner: "Nisa", channel: "TikTok", due: "06-16", status: "待审核" },
  { id: 3, title: "618 直播预热视频", campaign: "618 大促整合营销", owner: "Cilla", channel: "TikTok", due: "06-12", status: "已完成" },
];
const initialSamples = [
  { id: 1, kol: "BeautyWithYuki", product: "Tone-Up Sunscreen", qty: 2, tracking: "SF1348209201", status: "已签收" },
  { id: 2, kol: "Nisa Glow", product: "Serum Spray", qty: 3, tracking: "JNE90841255", status: "运输中" },
  { id: 3, kol: "Cilla Review", product: "Day Cream", qty: 2, tracking: "待生成", status: "待发货" },
];
const initialPosts = [
  { id: 1, creator: "Nisa Glow", product: "Serum Spray", tier: "A", status: "Posted", views: 428000, gmv: 7600, date: "06-11" },
  { id: 2, creator: "Cilla Review", product: "Day Cream", tier: "A", status: "Planning", views: 0, gmv: 0, date: "06-16" },
  { id: 3, creator: "BeautyWithYuki", product: "Tone-Up Sunscreen SPF50", tier: "S", status: "Posted", views: 962000, gmv: 18400, date: "06-10" },
  { id: 4, creator: "DailyByMomo", product: "Hydra Lip Serum", tier: "B", status: "Delayed", views: 0, gmv: 0, date: "06-13" },
];
const initialPayments = [
  { id: 1, payee: "BeautyWithYuki", item: "防晒图文合作首款", amount: 14000, owner: "Mia", status: "待审批" },
  { id: 2, payee: "Nisa Glow", item: "Serum Spray 视频尾款", amount: 12500, owner: "Nadia", status: "已批准" },
  { id: 3, payee: "Meta Ads", item: "618 Media 投放", amount: 85000, owner: "James", status: "付款中" },
];

function useStored<T>(key: string, seed: T) {
  const [value, setValue] = useState<T>(seed);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try { const saved = localStorage.getItem(key); if (saved) setValue(JSON.parse(saved)); } catch {}
    setReady(true);
  }, [key]);
  useEffect(() => { if (ready) localStorage.setItem(key, JSON.stringify(value)); }, [key, ready, value]);
  return [value, setValue] as const;
}

const money = (n: number) => new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 0 }).format(n);
const num = (n: number) => new Intl.NumberFormat("en", { notation: n > 999999 ? "compact" : "standard", maximumFractionDigits: 1 }).format(n);
const pct = (a: number, b: number) => Math.min(100, Math.round((a / Math.max(b, 1)) * 100));

const EN: Record<string, string> = {
  "Marketing 工作台": "Marketing Workspace", "从目标到发布结果，集中查看本月关键进展。": "Track monthly goals, execution and publishing results in one place.",
  "Target 目标管理": "Target Management", "GST、Brand 与 PIC 共用同一套月度目标和达成口径。": "GST, Brand and PIC share one monthly target and achievement framework.",
  "Budget 预算管理": "Budget Management", "统一管理预算分配、实际消耗和审批节奏。": "Manage allocation, actual spend and approvals in one workflow.",
  "KOL 达人中心": "KOL Center", "维护达人池、合作报价和当前合作阶段。": "Manage creators, rates and collaboration stages.",
  "Campaign 活动管理": "Campaign Management", "创建活动、推进状态并跟踪预算和完成进度。": "Create campaigns, advance status and track budget and progress.",
  "Content 内容任务": "Content Tasks", "从 Brief、制作、审核到完成的统一任务流。": "A single workflow from brief and production to review and completion.",
  "Sample 样品管理": "Sample Management", "管理寄样申请、物流单号和签收进度。": "Manage sample requests, tracking numbers and delivery status.",
  "Video / Post 发布管理": "Video / Post Publishing", "Marketing 3.0 的 Publishing Progress 与 Publishing Results 已原生融合。": "Marketing 3.0 Publishing Progress and Results are built into this workspace.",
  "Payment 付款中心": "Payment Center", "提交、审批并跟踪达人和媒体付款。": "Submit, approve and track creator and media payments.",
  "Report 报表中心": "Report Center", "生成管理摘要，导出目标达成数据。": "Generate management summaries and export performance data.",
  "基础配置": "Settings", "配置审批规则、提醒和系统偏好。": "Configure approvals, reminders and workspace preferences.",
  "新建 Campaign": "New Campaign", "添加 KOL": "Add KOL", "创建任务": "Create Task", "新建寄样": "New Shipment", "登记 Post": "Add Post", "申请付款": "Request Payment", "登记费用": "Add Expense",
  "搜索当前模块...": "Search this module...", "品牌工作台": "Brand Dashboard", "本月目标与达成": "Monthly target and achievement", "保存": "Save", "取消": "Cancel", "清除筛选": "Clear filters", "编辑目标": "Edit target", "推进状态": "Advance", "更新状态": "Update", "删除": "Delete", "批准": "Approve", "拒绝": "Reject", "推进": "Advance", "导出 CSV": "Export CSV", "生成 AI 报告": "Generate AI report",
  "总预算": "Total budget", "已使用": "Spent", "可用余额": "Available", "待审批": "Pending approval", "预算分配": "Budget allocation", "登记费用后会实时更新使用率": "Usage updates immediately after an expense is added",
  "目标达成": "Target achievement", "查看全部 →": "View all →", "管理活动 →": "Manage campaigns →", "AI 管理摘要": "AI management summary", "基于目标、预算和发布结果": "Based on targets, budget and publishing results", "表现领先": "Leading performance", "需要跟进": "Needs attention", "今日动作": "Actions today", "重点 Campaign": "Priority campaigns", "点击状态即可推进工作流": "Click a status to advance the workflow",
  "产品目标与达成": "Product targets and achievement", "目标支持直接编辑，达成数据来自发布结果": "Targets are editable; actuals come from publishing results", "达人池共": "Creator pool", "位": " creators", "较上月": "vs last month", "目标": "Target", "费用提交后必须经过管理员审批": "Expenses require admin approval", "Post 发布前必须通过品牌审核": "Posts require brand approval before publishing", "物流超过 3 天未签收时提醒 PIC": "Notify PIC when delivery is unsigned after 3 days",
  "工作流规则": "Workflow rules", "修改后自动保存在当前浏览器": "Changes are saved in this browser", "预算审批": "Budget approval", "内容审核": "Content review", "样品提醒": "Sample reminder", "达人等级规则": "Creator tier rules", "用于预算与发布结构分析": "Used for budget and publishing mix analysis",
  "待启动": "Not started", "进行中": "In progress", "已完成": "Completed", "候选": "Candidate", "待确认": "Pending confirmation", "合作中": "Active", "已暂停": "Paused", "待分配": "Unassigned", "制作中": "In production", "待审核": "In review", "待发货": "Ready to ship", "运输中": "In transit", "已签收": "Delivered", "已批准": "Approved", "付款中": "Processing", "已付款": "Paid", "已拒绝": "Rejected", "暂无任务": "No tasks", "清除": "Clear",
  "全部产品": "All products", "全部等级": "All tiers", "需要 PIC 跟进": "PIC follow-up required", "搜索达人、平台、品类": "Search creator, platform or category",
  "Budget 使用率": "Budget usage", "Post MTD": "Post MTD", "GMV MTD": "GMV MTD", "合作中 KOL": "Active KOLs", "达人池共 ": "Creator pool: ", " 位": " creators", "较上月 ↑ 12.8%": "↑ 12.8% vs last month",
  "Serum Spray 发布达成 73%，GMV 转化领先。建议复用即时补水 Hook，并增加 A 级达人。": "Serum Spray reached 73% of publishing target with leading GMV conversion. Reuse the instant-hydration hook and add A-tier creators.",
  "Day Cream 发布仅达 22%，预算节奏同步偏慢。优先推动已收样达人在本周完成发布。": "Day Cream publishing is only 22% and budget pacing is slow. Prioritize creators who already received samples to publish this week.",
  "审批 1 笔达人付款、确认 2 个待发样品、完成 3 条内容审核。": "Approve one creator payment, confirm two sample shipments and complete three content reviews.",
  "本月内容产出": "Monthly content", "发布结果": "Publishing results", "月度目标": "Monthly target", "本次费用": "Expense amount", "说明": "Description", "负责人": "Owner", "结束日期": "End date", "达人名称": "Creator name", "平台": "Platform", "达人等级": "Creator tier", "内容品类": "Content category", "粉丝数": "Followers", "合作报价": "Rate", "任务名称": "Task name", "所属 Campaign": "Campaign", "渠道": "Channel", "截止日期": "Due date", "产品": "Product", "数量": "Quantity", "物流单号": "Tracking number", "计划日期": "Planned date", "收款方": "Payee", "付款事项": "Payment item", "金额": "Amount", "申请人": "Requester", "预算分类": "Budget category",
  "AI 周报": "AI Weekly Report", "AI 月报": "AI Monthly Report", "1. 目标达成": "1. Target achievement", "2. Gap 诊断": "2. Gap diagnosis", "3. 行动建议": "3. Recommended actions", "管理透视": "Management lens", "管理意见": "Management guidance",
  "Post MTD 达成 ": "Post MTD achievement is ", "%，整体接近时间进度；GMV 达成 55%，预算使用 56%。": "%, close to elapsed-time pace; GMV is at 55% and budget usage at 56%.",
  "Day Cream 发布节奏落后，主要缺口集中在 A/B 级达人。Tone-Up Sunscreen 流量健康但转化仍可提升。": "Day Cream publishing is behind, mainly due to A/B-tier creator gaps. Tone-Up Sunscreen has healthy traffic but conversion can improve.",
  "本周优先推动 4 条待发布内容，复制 Serum Spray 高转化 Hook，并完成待审批付款。": "Prioritize four pending posts this week, replicate Serum Spray's high-converting hook and complete pending payment approvals.",
  "下半月预算应向高 ROI 产品倾斜，同时把发布节奏纳入 PIC 每日跟进。": "Shift second-half budget toward high-ROI products and make publishing pace part of daily PIC follow-up.",
  "新建寄样": "New sample shipment", "登记 Video / Post": "Add Video / Post", "编辑月度目标": "Edit monthly target", "创建内容任务": "Create content task",
};

function translateTree(node: ReactNode): ReactNode {
  if (typeof node === "string") return EN[node] || node;
  if (Array.isArray(node)) return node.map(translateTree);
  if (isValidElement(node)) {
    const element = node as ReactElement<Record<string, unknown>>;
    const props = element.props || {};
    const translated: Record<string, unknown> = {};
    for (const key of ["title", "desc", "placeholder", "aria-label", "label"]) if (typeof props[key] === "string") translated[key] = EN[props[key] as string] || props[key];
    if ("action" in props) translated.action = translateTree(props.action as ReactNode);
    if ("children" in props) translated.children = translateTree(props.children as ReactNode);
    return cloneElement(element, translated);
  }
  return node;
}

function Progress({ value, tone = "purple" }: { value: number; tone?: string }) {
  return <div className="progress"><i className={tone} style={{ width: `${Math.min(value, 100)}%` }} /></div>;
}

function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  const english = typeof document !== "undefined" && document.documentElement.lang === "en";
  return <div className="modal-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}><section className="modal"><header><h3>{english ? EN[title] || title : title}</h3><button onClick={onClose} aria-label="关闭">×</button></header>{english ? translateTree(children) : children}</section></div>;
}

function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="field"><span>{label}</span>{children}</label>; }

export default function MarketingSystem() {
  const [active, setActive] = useState<MenuKey>("dashboard");
  const [targets, setTargets] = useStored("mkt-targets", initialTargets);
  const [budgets, setBudgets] = useStored("mkt-budgets", initialBudgets);
  const [kols, setKols] = useStored("mkt-kols", initialKols);
  const [campaigns, setCampaigns] = useStored("mkt-campaigns", initialCampaigns);
  const [contents, setContents] = useStored("mkt-content", initialContent);
  const [samples, setSamples] = useStored("mkt-samples", initialSamples);
  const [posts, setPosts] = useStored("mkt-posts", initialPosts);
  const [payments, setPayments] = useStored("mkt-payments", initialPayments);
  const [settings, setSettings] = useStored("mkt-settings", { budgetApproval: true, contentReview: true, sampleReminder: true, currency: "CNY" });
  const [language, setLanguage] = useStored("mkt-language", "zh");
  const [theme, setTheme] = useStored("mkt-theme", "light");
  const [role, setRole] = useStored<RoleKey>("mkt-role", "brand");
  const [modal, setModal] = useState<ModalState>(null);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [scope, setScope] = useState("Brand Dashboard");
  const [productFilter, setProductFilter] = useState("全部产品");
  const [tierFilter, setTierFilter] = useState("全部等级");
  const [generatedAt, setGeneratedAt] = useState("");
  const T = (text: string) => language === "en" ? EN[text] || text : text;
  useEffect(() => { document.documentElement.dataset.theme = theme; document.documentElement.lang = language === "en" ? "en" : "zh-CN"; }, [language, theme]);

  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2200); };
  const currentRole = roles.find(r => r.key === role) || roles[1];
  const allowedMenus = menus.filter(m => currentRole.menus.includes(m.key));
  const activeMenu = menus.find(m => m.key === active) || allowedMenus[0];
  const canEditTarget = role === "country" || role === "brand";
  const canManageCampaign = role === "brand" || role === "ads";
  const canManageKol = role === "brand" || role === "kolPic";
  const canManageContent = role === "brand" || role === "kolPic" || role === "ads";
  const canManagePost = role === "brand" || role === "kolPic" || role === "ads";
  const canManageBudget = role === "brand" || role === "ads" || role === "finance";
  const canApprovePayment = role === "country" || role === "finance";
  const roleDesc = language === "en" ? ({ country: "Monitor brands, markets, investment efficiency and country-level risks.", brand: "Manage brand targets, creators, content, campaigns and publishing results.", kolPic: "Execute creator outreach, samples, content delivery and post publishing.", ads: "Manage paid-media budget, campaigns, creatives and performance.", finance: "Review budget usage, approve payments and monitor financial controls.", analyst: "Analyze targets, budget, creator mix and publishing performance." } as Record<RoleKey,string>)[role] : ({ country: "查看品牌组合、市场表现、投资效率与国家级风险。", brand: "管理品牌目标、达人、内容、活动和发布结果。", kolPic: "执行达人建联、寄样、内容交付和发布跟进。", ads: "管理广告预算、投放活动、素材与效果表现。", finance: "审核预算使用、付款申请与财务合规。", analyst: "分析目标、预算、达人结构和发布效果。" } as Record<RoleKey,string>)[role];
  useEffect(() => { if (!currentRole.menus.includes(active)) setActive("dashboard"); }, [active, currentRole]);
  const totalBudget = budgets.reduce((s, x) => s + x.allocated, 0);
  const spentBudget = budgets.reduce((s, x) => s + x.spent, 0);
  const totalGmv = targets.reduce((s, x) => s + x.gmvMtd, 0);
  const totalPosts = targets.reduce((s, x) => s + x.postsMtd, 0);
  const targetPosts = targets.reduce((s, x) => s + x.posts, 0);
  const filteredPosts = posts.filter(x => (productFilter === "全部产品" || x.product === productFilter) && (tierFilter === "全部等级" || x.tier === tierFilter));

  function nextStatus(current: string, list: string[]) { return list[(list.indexOf(current) + 1) % list.length]; }
  function cycleCampaign(id: number) { setCampaigns(rows => rows.map(r => r.id === id ? { ...r, status: nextStatus(r.status, ["待启动", "进行中", "已完成"]), progress: r.status === "待启动" ? 35 : r.status === "进行中" ? 100 : 0 } : r)); notify("Campaign 状态已更新"); }
  function cycleContent(id: number) { setContents(rows => rows.map(r => r.id === id ? { ...r, status: nextStatus(r.status, ["待分配", "制作中", "待审核", "已完成"]) } : r)); notify("内容任务已推进"); }
  function cycleSample(id: number) { setSamples(rows => rows.map(r => r.id === id ? { ...r, status: nextStatus(r.status, ["待发货", "运输中", "已签收"]) } : r)); notify("样品状态已更新"); }
  function cyclePost(id: number) { setPosts(rows => rows.map(r => r.id === id ? { ...r, status: nextStatus(r.status, ["Planning", "Delay Soon", "Delayed", "Posted"]) } : r)); notify("发布状态已更新"); }

  function handleForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const f = new FormData(e.currentTarget); const type = modal?.type;
    const s = (key: string) => String(f.get(key) || ""); const n = (key: string) => Number(f.get(key) || 0); const id = Date.now();
    if (type === "campaign") setCampaigns(v => [...v, { id, name: s("name"), owner: s("owner"), status: "待启动", progress: 0, budget: n("budget"), end: s("end") }]);
    if (type === "kol") setKols(v => [...v, { id, name: s("name"), platform: s("platform"), tier: s("tier"), category: s("category"), followers: n("followers"), rate: n("rate"), status: "候选" }]);
    if (type === "content") setContents(v => [...v, { id, title: s("title"), campaign: s("campaign"), owner: s("owner"), channel: s("channel"), due: s("due"), status: "待分配" }]);
    if (type === "sample") setSamples(v => [...v, { id, kol: s("kol"), product: s("product"), qty: n("qty"), tracking: s("tracking") || "待生成", status: "待发货" }]);
    if (type === "post") setPosts(v => [...v, { id, creator: s("creator"), product: s("product"), tier: s("tier"), status: "Planning", views: n("views"), gmv: n("gmv"), date: s("date") }]);
    if (type === "payment") setPayments(v => [...v, { id, payee: s("payee"), item: s("item"), amount: n("amount"), owner: s("owner"), status: "待审批" }]);
    if (type === "expense") setBudgets(v => v.map(x => x.id === n("category") ? { ...x, spent: x.spent + n("amount") } : x));
    if (type === "target") setTargets(v => v.map(x => x.id === modal?.id ? { ...x, posts: n("posts"), budget: n("budget"), gmv: n("gmv"), views: n("views") } : x));
    setModal(null); notify(type === "target" ? "目标已保存" : "记录已创建");
  }

  function exportCsv() {
    const rows = [["Product", "PIC", "Post MTD", "Post Target", "Budget MTD", "Budget Target", "GMV MTD", "GMV Target"], ...targets.map(x => [x.product, x.pic, x.postsMtd, x.posts, x.budgetMtd, x.budget, x.gmvMtd, x.gmv])];
    const blob = new Blob(["\ufeff" + rows.map(r => r.join(",")).join("\n")], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "marketing-report.csv"; link.click(); URL.revokeObjectURL(link.href); notify("报表已导出");
  }

  function PageHeader({ title, desc, action }: { title: string; desc: string; action?: ReactNode }) {
    return <div className="page-head"><div><p>{(language === "en" ? currentRole.en : currentRole.zh).toUpperCase()} · JUNE 2026</p><h1>{T(title)}</h1><span>{T(desc)}</span></div>{action}</div>;
  }

  function Dashboard() {
    const shared = {
      budget: { label: language === "en" ? "Budget usage" : "预算使用率", value: `${pct(spentBudget,totalBudget)}%`, note: `${money(spentBudget)} / ${money(totalBudget)}`, progress: pct(spentBudget,totalBudget), tone: "purple" },
      post: { label: "Post MTD", value: String(totalPosts), note: `${language === "en" ? "Target" : "目标"} ${targetPosts} · Pace ${pct(totalPosts,targetPosts)}%`, progress: pct(totalPosts,targetPosts), tone: "blue" },
      gmv: { label: "GMV MTD", value: money(totalGmv), note: language === "en" ? "↑ 12.8% vs last month" : "较上月 ↑ 12.8%", progress: 71, tone: "green" },
      kol: { label: language === "en" ? "Active KOLs" : "合作中 KOL", value: String(kols.filter(x=>x.status==="合作中").length), note: language === "en" ? `${kols.length} creators in pool` : `达人池共 ${kols.length} 位`, progress: 68, tone: "orange" },
      payment: { label: language === "en" ? "Pending payments" : "待审批付款", value: money(payments.filter(x=>x.status==="待审批").reduce((s,x)=>s+x.amount,0)), note: `${payments.filter(x=>x.status==="待审批").length} ${language === "en" ? "requests" : "笔申请"}`, progress: 42, tone: "orange" },
      content: { label: language === "en" ? "Open content tasks" : "进行中内容", value: String(contents.filter(x=>x.status!=="已完成").length), note: language === "en" ? "Across active campaigns" : "覆盖当前活动", progress: 62, tone: "blue" },
      sample: { label: language === "en" ? "Samples in transit" : "运输中样品", value: String(samples.filter(x=>x.status==="运输中").length), note: language === "en" ? "PIC follow-up" : "等待 PIC 跟进", progress: 35, tone: "orange" },
      roi: { label: language === "en" ? "Media ROI" : "广告 ROI", value: "4.12x", note: language === "en" ? "+0.48x vs target" : "较目标 +0.48x", progress: 78, tone: "green" },
    };
    const roleMetrics = role === "finance" ? [shared.budget,shared.payment,{...shared.gmv,label:language==="en"?"Recognized GMV":"确认 GMV"},{...shared.budget,label:language==="en"?"Available budget":"可用预算",value:money(totalBudget-spentBudget),note:"31.6% Remaining",progress:32}] : role === "kolPic" ? [shared.post,shared.kol,shared.content,shared.sample] : role === "ads" ? [shared.budget,shared.roi,shared.gmv,shared.content] : role === "analyst" ? [shared.post,shared.gmv,shared.budget,shared.roi] : [shared.budget,shared.post,shared.gmv,shared.kol];
    const roleAi = language === "en" ? ({ country: ["Thailand is leading portfolio growth and can absorb incremental budget.","Philippines is spending ahead of GMV pace; review country allocation.","Review country risks and approve one budget reallocation."], brand: ["Serum Spray reached 73% of publishing target with leading GMV conversion.","Day Cream publishing is only 22% and needs creator follow-up.","Approve one payment, two samples and three content reviews."], kolPic: ["Nisa Glow is the strongest converting creator this week.","Two creators have samples but no confirmed publishing date.","Confirm publishing dates and close three content reviews today."], ads: ["Retargeting ROI is 4.6x and ready for controlled scaling.","Day Cream creative fatigue is increasing CPM and reducing CTR.","Move 10% budget to Serum Spray and launch two new hooks."], finance: ["Budget usage is aligned with month elapsed and remains within control.","One media payment lacks final campaign evidence.","Approve two complete requests and return one for documentation."], analyst: ["Post volume and GMV show a positive 0.74 correlation this month.","A-tier creator conversion varies widely across products.","Publish the weekly variance analysis and flag outliers."] } as Record<RoleKey,string[]>)[role] : ({ country: ["Thailand 品牌增长领先，可承接增量预算。","Philippines 预算消耗快于 GMV 节奏，需要复核国家预算。","复盘国家风险并审批 1 笔预算调拨。"], brand: ["Serum Spray 发布达成 73%，GMV 转化领先。","Day Cream 发布仅达 22%，需要推动达人交付。","审批 1 笔付款、2 个寄样和 3 条内容。"], kolPic: ["Nisa Glow 是本周转化表现最好的达人。","2 位达人已收样但尚未确认发布时间。","今天确认发布时间并完成 3 条内容审核。"], ads: ["重定向广告 ROI 4.6x，可进行小幅加码。","Day Cream 素材疲劳导致 CPM 上升、CTR 下降。","转移 10% 预算到 Serum Spray，并上线 2 个新 Hook。"], finance: ["预算使用与时间进度一致，整体仍在控制范围内。","1 笔媒体付款缺少最终活动凭证。","批准 2 笔完整申请，退回 1 笔补充材料。"], analyst: ["本月 Post 数量与 GMV 呈 0.74 正相关。","A 级达人转化在不同产品间差异较大。","发布周度方差分析并标记异常项。"] } as Record<RoleKey,string[]>)[role];
    const detailMenu: MenuKey = role === "finance" ? "budget" : role === "kolPic" ? "post" : role === "ads" ? "campaign" : "target";
    return <><PageHeader title={language === "en" ? currentRole.dashboardEn : currentRole.dashboardZh} desc={roleDesc} action={canManageCampaign ? <button className="primary" onClick={() => setModal({ type: "campaign" })}>＋ {T("新建 Campaign")}</button> : <span className="role-badge">{language === "en" ? currentRole.en : currentRole.zh}</span>} />
      <div className="metrics">{roleMetrics.map((m,i)=><article key={`${m.label}-${i}`}><span>{m.label}</span><b>{m.value}</b><small>{m.note}</small><Progress value={m.progress} tone={m.tone} /></article>)}</div>
      <div className="two-col"><section className="card"><div className="card-head"><div><h2>{role === "finance" ? (language === "en" ? "Budget by product" : "产品预算效率") : role === "kolPic" ? (language === "en" ? "My delivery" : "我的交付进度") : role === "ads" ? (language === "en" ? "Campaign products" : "投放产品表现") : (language === "en" ? "Target achievement" : "目标达成")}</h2><p>Marketing 3.0 · Product Performance</p></div><button className="text-btn" onClick={() => setActive(detailMenu)}>{language === "en" ? "View details →" : "查看详情 →"}</button></div><div className="product-list">{targets.map(x => <div className="product-line" key={x.id}><div><b>{x.product}</b><small>{x.priority} · {x.pic}</small></div><div className="inline-progress"><span>Post {x.postsMtd}/{x.posts}</span><Progress value={pct(x.postsMtd, x.posts)} tone={pct(x.postsMtd, x.posts) < 40 ? "orange" : "purple"} /></div><strong>{pct(x.gmvMtd, x.gmv)}% GMV</strong></div>)}</div></section>
      <section className="card"><div className="card-head"><div><h2>{language === "en" ? "AI role summary" : "AI 角色摘要"}</h2><p>{language === "en" ? `Prioritized for ${currentRole.en}` : `面向${currentRole.zh}的重点判断`}</p></div><span className="ai-badge">AI</span></div><div className="ai-summary"><div className="good"><b>{language === "en" ? "Leading signal" : "积极信号"}</b><p>{roleAi[0]}</p></div><div className="warn"><b>{language === "en" ? "Needs attention" : "需要跟进"}</b><p>{roleAi[1]}</p></div><div><b>{language === "en" ? "Next action" : "下一步动作"}</b><p>{roleAi[2]}</p></div></div></section></div>
      <section className="card"><div className="card-head"><div><h2>重点 Campaign</h2><p>点击状态即可推进工作流</p></div><button className="text-btn" onClick={() => setActive("campaign")}>管理活动 →</button></div><DataTable headers={["CAMPAIGN", "OWNER", "STATUS", "PROGRESS", "BUDGET", "END DATE"]}>{campaigns.slice(0, 4).map(x => <div className="tr" key={x.id}><div><b>{x.name}</b></div><div>{x.owner}</div><div><button className={`status ${x.status}`} onClick={() => cycleCampaign(x.id)}>{x.status}</button></div><div className="progress-cell"><Progress value={x.progress} /><span>{x.progress}%</span></div><div>{money(x.budget)}</div><div>{x.end}</div></div>)}</DataTable></section></>;
  }

  function TargetPage() {
    const total = targets.reduce((a, x) => ({ posts: a.posts + x.posts, mtd: a.mtd + x.postsMtd, budget: a.budget + x.budget, used: a.used + x.budgetMtd, gmv: a.gmv + x.gmv, gmvMtd: a.gmvMtd + x.gmvMtd }), { posts: 0, mtd: 0, budget: 0, used: 0, gmv: 0, gmvMtd: 0 });
    return <><PageHeader title="Target 目标管理" desc="GST、Brand 与 PIC 共用同一套月度目标和达成口径。" action={<div className="segmented">{["GST Dashboard", "Brand Dashboard", "PIC Dashboard", "Monthly Setup"].map(x => <button key={x} className={scope === x ? "active" : ""} onClick={() => setScope(x)}>{x.replace(" Dashboard", "")}</button>)}</div>} />
      <div className="metrics compact"><article><span>Post Progress</span><b>{total.mtd}/{total.posts}</b><small>MTD / Target</small><Progress value={pct(total.mtd, total.posts)} /></article><article><span>Budget Progress</span><b>{money(total.used)}</b><small>Target {money(total.budget)}</small><Progress value={pct(total.used, total.budget)} tone="blue" /></article><article><span>GMV Progress</span><b>{money(total.gmvMtd)}</b><small>Target {money(total.gmv)}</small><Progress value={pct(total.gmvMtd, total.gmv)} tone="green" /></article><article><span>Pace Status</span><b className="pace">On Track</b><small>Day 17/30 · 57% elapsed</small><Progress value={57} tone="orange" /></article></div>
      <section className="card"><div className="card-head"><div><h2>产品目标与达成</h2><p>目标支持直接编辑，达成数据来自发布结果</p></div></div><DataTable headers={["PRODUCT / PIC", "POST MTD / TARGET", "BUDGET MTD / TARGET", "GMV MTD / TARGET", "PACE", "ACTION"]}>{targets.map(x => <div className="tr" key={x.id}><div><b>{x.product}</b><small>{x.priority} · {x.pic}</small></div><div><b>{x.postsMtd} / {x.posts}</b><Progress value={pct(x.postsMtd, x.posts)} /></div><div><b>{money(x.budgetMtd)} / {money(x.budget)}</b><Progress value={pct(x.budgetMtd, x.budget)} tone="blue" /></div><div><b>{money(x.gmvMtd)} / {money(x.gmv)}</b><Progress value={pct(x.gmvMtd, x.gmv)} tone="green" /></div><div><span className={`pace-tag ${pct(x.postsMtd, x.posts) < 40 ? "slow" : pct(x.postsMtd, x.posts) > 65 ? "ahead" : "track"}`}>{pct(x.postsMtd, x.posts) < 40 ? "Behind" : pct(x.postsMtd, x.posts) > 65 ? "Ahead" : "On Track"}</span></div><div><button className="small-btn" onClick={() => setModal({ type: "target", id: x.id })}>编辑目标</button></div></div>)}</DataTable></section></>;
  }

  function BudgetPage() { return <><PageHeader title="Budget 预算管理" desc="统一管理预算分配、实际消耗和审批节奏。" action={<button className="primary" onClick={() => setModal({ type: "expense" })}>＋ 登记费用</button>} /><div className="metrics compact"><article><span>总预算</span><b>{money(totalBudget)}</b><small>June 2026</small></article><article><span>已使用</span><b>{money(spentBudget)}</b><small>{pct(spentBudget, totalBudget)}% Used</small></article><article><span>可用余额</span><b>{money(totalBudget - spentBudget)}</b><small>31.6% Remaining</small></article><article><span>待审批</span><b>{money(payments.filter(x => x.status === "待审批").reduce((s, x) => s + x.amount, 0))}</b><small>{payments.filter(x => x.status === "待审批").length} 笔申请</small></article></div><section className="card"><div className="card-head"><div><h2>预算分配</h2><p>登记费用后会实时更新使用率</p></div></div><div className="budget-grid">{budgets.map(x => <article key={x.id}><div><span className="category-dot" /><b>{x.category}</b><small>Owner · {x.owner}</small></div><strong>{money(x.spent)}</strong><span>of {money(x.allocated)}</span><Progress value={pct(x.spent, x.allocated)} tone={pct(x.spent, x.allocated) > 80 ? "orange" : "purple"} /><footer>{pct(x.spent, x.allocated)}% Used · {money(x.allocated - x.spent)} Remaining</footer></article>)}</div></section></> }

  function KolPage() { const rows = kols.filter(x => `${x.name}${x.platform}${x.category}`.toLowerCase().includes(search.toLowerCase())); return <><PageHeader title="KOL 达人中心" desc="维护达人池、合作报价和当前合作阶段。" action={<button className="primary" onClick={() => setModal({ type: "kol" })}>＋ 添加 KOL</button>} /><Toolbar search={search} setSearch={setSearch} placeholder="搜索达人、平台、品类" /><section className="card no-pad"><DataTable headers={["KOL", "PLATFORM", "TIER", "CATEGORY", "FOLLOWERS", "RATE", "STATUS"]}>{rows.map(x => <div className="tr" key={x.id}><div className="person"><i>{x.name[0]}</i><b>{x.name}</b></div><div>{x.platform}</div><div><span className={`tier tier-${x.tier}`}>{x.tier}</span></div><div>{x.category}</div><div>{num(x.followers)}</div><div>{money(x.rate)}</div><div><button className={`status ${x.status}`} onClick={() => { setKols(v => v.map(r => r.id === x.id ? { ...r, status: nextStatus(r.status, ["候选", "待确认", "合作中", "已暂停"]) } : r)); notify("达人状态已更新"); }}>{x.status}</button></div></div>)}</DataTable></section></> }

  function CampaignPage() { return <><PageHeader title="Campaign 活动管理" desc="创建活动、推进状态并跟踪预算和完成进度。" action={<button className="primary" onClick={() => setModal({ type: "campaign" })}>＋ 新建 Campaign</button>} /><section className="card no-pad"><DataTable headers={["CAMPAIGN", "OWNER", "STATUS", "PROGRESS", "BUDGET", "END", "ACTION"]}>{campaigns.map(x => <div className="tr" key={x.id}><div><b>{x.name}</b><small>ID · C-{String(x.id).slice(-4)}</small></div><div>{x.owner}</div><div><button className={`status ${x.status}`} onClick={() => cycleCampaign(x.id)}>{x.status}</button></div><div className="progress-cell"><Progress value={x.progress} /><span>{x.progress}%</span></div><div>{money(x.budget)}</div><div>{x.end}</div><div><button className="small-btn danger" onClick={() => { setCampaigns(v => v.filter(r => r.id !== x.id)); notify("Campaign 已删除"); }}>删除</button></div></div>)}</DataTable></section></> }

  function ContentPage() { return <><PageHeader title="Content 内容任务" desc="从 Brief、制作、审核到完成的统一任务流。" action={<button className="primary" onClick={() => setModal({ type: "content" })}>＋ 创建任务</button>} /><div className="kanban">{["待分配", "制作中", "待审核", "已完成"].map(status => <section key={status}><header><b>{status}</b><span>{contents.filter(x => x.status === status).length}</span></header>{contents.filter(x => x.status === status).map(x => <article key={x.id}><span className="channel">{x.channel}</span><h3>{x.title}</h3><p>{x.campaign}</p><footer><span>{x.owner} · {x.due}</span><button onClick={() => cycleContent(x.id)}>推进 →</button></footer></article>)}{contents.filter(x => x.status === status).length === 0 && <div className="empty">暂无任务</div>}</section>)}</div></> }

  function SamplePage() { return <><PageHeader title="Sample 样品管理" desc="管理寄样申请、物流单号和签收进度。" action={<button className="primary" onClick={() => setModal({ type: "sample" })}>＋ 新建寄样</button>} /><section className="card no-pad"><DataTable headers={["KOL", "PRODUCT", "QTY", "TRACKING", "STATUS", "ACTION"]}>{samples.map(x => <div className="tr" key={x.id}><div><b>{x.kol}</b></div><div>{x.product}</div><div>{x.qty}</div><div>{x.tracking}</div><div><span className={`status ${x.status}`}>{x.status}</span></div><div><button className="small-btn" onClick={() => cycleSample(x.id)}>更新状态</button></div></div>)}</DataTable></section></> }

  function PostPage() { const posted = filteredPosts.filter(x => x.status === "Posted"); const views = posted.reduce((s, x) => s + x.views, 0); const gmv = posted.reduce((s, x) => s + x.gmv, 0); return <><PageHeader title="Video / Post 发布管理" desc="Marketing 3.0 的 Publishing Progress 与 Publishing Results 已原生融合。" action={<button className="primary" onClick={() => setModal({ type: "post" })}>＋ 登记 Post</button>} /><div className="filter-row"><select value={productFilter} onChange={e => setProductFilter(e.target.value)}><option>全部产品</option>{[...new Set(posts.map(x => x.product))].map(x => <option key={x}>{x}</option>)}</select><select value={tierFilter} onChange={e => setTierFilter(e.target.value)}><option>全部等级</option><option>S</option><option>A</option><option>B</option></select><button onClick={() => { setProductFilter("全部产品"); setTierFilter("全部等级"); }}>清除筛选</button></div><div className="metrics compact"><article><span>Post</span><b>{posted.length}/{filteredPosts.length}</b><small>Posted / Total</small><Progress value={pct(posted.length, filteredPosts.length)} /></article><article><span>Views</span><b>{num(views)}</b><small>Published content</small><Progress value={64} tone="blue" /></article><article><span>GMV</span><b>{money(gmv)}</b><small>ROI 4.1x</small><Progress value={72} tone="green" /></article><article><span>Delayed</span><b>{filteredPosts.filter(x => x.status === "Delayed").length}</b><small>需要 PIC 跟进</small><Progress value={22} tone="orange" /></article></div><section className="card no-pad"><DataTable headers={["CREATOR", "PRODUCT", "TIER", "STATUS", "VIEWS", "GMV", "DATE", "ACTION"]}>{filteredPosts.map(x => <div className="tr" key={x.id}><div><b>{x.creator}</b></div><div>{x.product}</div><div><span className={`tier tier-${x.tier}`}>{x.tier}</span></div><div><span className={`status ${x.status}`}>{x.status}</span></div><div>{num(x.views)}</div><div>{money(x.gmv)}</div><div>{x.date}</div><div><button className="small-btn" onClick={() => cyclePost(x.id)}>推进状态</button></div></div>)}</DataTable></section></> }

  function PaymentPage() {
    const canRequest = role === "brand" || role === "kolPic" || role === "finance";
    return <><PageHeader title="Payment 付款中心" desc={canApprovePayment ? "审核付款申请并跟踪实际付款状态。" : "提交付款申请并查看财务处理进度。"} action={canRequest ? <button className="primary" onClick={() => setModal({ type: "payment" })}>＋ 申请付款</button> : undefined} /><section className="card no-pad"><DataTable headers={["PAYEE", "ITEM", "OWNER", "AMOUNT", "STATUS", "ACTION"]}>{payments.map(x => <div className="tr" key={x.id}><div><b>{x.payee}</b></div><div>{x.item}</div><div>{x.owner}</div><div><b>{money(x.amount)}</b></div><div><span className={`status ${x.status}`}>{x.status}</span></div><div className="row-actions">{canApprovePayment && x.status === "待审批" ? <><button className="small-btn approve" onClick={() => { setPayments(v => v.map(r => r.id === x.id ? { ...r, status: "已批准" } : r)); notify("付款已批准"); }}>批准</button><button className="small-btn danger" onClick={() => { setPayments(v => v.map(r => r.id === x.id ? { ...r, status: "已拒绝" } : r)); notify("付款已拒绝"); }}>拒绝</button></> : canApprovePayment && (x.status === "已批准" || x.status === "付款中") ? <button className="small-btn" onClick={() => { setPayments(v => v.map(r => r.id === x.id ? { ...r, status: r.status === "已批准" ? "付款中" : "已付款" } : r)); notify("付款状态已更新"); }}>推进</button> : <span className="readonly">{language === "en" ? "View only" : "仅查看"}</span>}</div></div>)}</DataTable></section></>
  }

  function ReportPage() { return <><PageHeader title="Report 报表中心" desc="生成管理摘要，导出目标达成数据。" action={<div className="head-actions"><button className="secondary" onClick={exportCsv}>导出 CSV</button><button className="primary" onClick={() => { setGeneratedAt(new Date().toLocaleString("zh-CN")); notify("AI 报告已生成"); }}>✦ 生成 AI 报告</button></div>} /><div className="report-grid"><article className="report-card"><header><span>WEEKLY</span><b>AI 周报</b><small>{generatedAt || "数据更新于今天 09:30"}</small></header><section><h3>1. 目标达成</h3><p>Post MTD 达成 {pct(totalPosts, targetPosts)}%，整体接近时间进度；GMV 达成 55%，预算使用 56%。</p><h3>2. Gap 诊断</h3><p>Day Cream 发布节奏落后，主要缺口集中在 A/B 级达人。Tone-Up Sunscreen 流量健康但转化仍可提升。</p><h3>3. 行动建议</h3><p>本周优先推动 4 条待发布内容，复制 Serum Spray 高转化 Hook，并完成待审批付款。</p></section></article><article className="report-card"><header><span>MONTHLY</span><b>AI 月报</b><small>June 2026 · MTD</small></header><section><h3>管理透视</h3><div className="insight-table"><div><b>产品</b><span>Serum Spray 领先</span><em>加码</em></div><div><b>达人</b><span>S 级内容不足</span><em>补量</em></div><div><b>PIC</b><span>Nisa 达成最佳</span><em>复制</em></div><div><b>预算</b><span>Media 消耗偏慢</span><em>复核</em></div></div><h3>管理意见</h3><p>下半月预算应向高 ROI 产品倾斜，同时把发布节奏纳入 PIC 每日跟进。</p></section></article></div></> }

  function SettingsPage() { return <><PageHeader title="基础配置" desc="配置审批规则、提醒和系统偏好。" /><div className="settings-grid"><section className="card"><div className="card-head"><div><h2>工作流规则</h2><p>修改后自动保存在当前浏览器</p></div></div>{[["budgetApproval", "预算审批", "费用提交后必须经过管理员审批"], ["contentReview", "内容审核", "Post 发布前必须通过品牌审核"], ["sampleReminder", "样品提醒", "物流超过 3 天未签收时提醒 PIC"]].map(([key, title, desc]) => <label className="setting" key={key}><span><b>{title}</b><small>{desc}</small></span><input type="checkbox" checked={Boolean(settings[key as keyof typeof settings])} onChange={e => setSettings(v => ({ ...v, [key]: e.target.checked }))} /></label>)}</section><section className="card"><div className="card-head"><div><h2>达人等级规则</h2><p>用于预算与发布结构分析</p></div></div><div className="rule"><span className="tier tier-S">S</span><b>Top Creator</b><small>成本权重 4 · 核心品牌声量</small></div><div className="rule"><span className="tier tier-A">A</span><b>Growth Creator</b><small>成本权重 2 · GMV 增长</small></div><div className="rule"><span className="tier tier-B">B</span><b>Scale Creator</b><small>成本权重 1 · 内容规模</small></div></section></div></> }

  function renderPage() { const map: Record<MenuKey, ReactNode> = { dashboard: Dashboard(), target: TargetPage(), budget: BudgetPage(), kol: KolPage(), campaign: CampaignPage(), content: ContentPage(), sample: SamplePage(), post: PostPage(), payment: PaymentPage(), report: ReportPage(), settings: SettingsPage() }; return language === "en" ? translateTree(map[active]) : map[active]; }

  const editTarget = modal?.type === "target" ? targets.find(x => x.id === modal.id) : undefined;
  return <main className={`app-shell role-${role} page-${active}`}>
    <aside className="sidebar"><div className="brand"><i>M</i><span>Marketing<strong>.</strong></span></div><div className="workspace"><i>{currentRole.zh[0]}</i><span><b>{language === "en" ? currentRole.en : currentRole.zh}</b><small>Glowsicha Indonesia · June 2026</small></span><em>⌄</em></div><p className="nav-title">WORKSPACE</p><nav>{allowedMenus.map(m => <button key={m.key} className={active === m.key ? "active" : ""} onClick={() => setActive(m.key)}><i>{m.icon}</i><span>{language === "en" ? m.labelEn : m.label}</span>{active === m.key && <em />}</button>)}</nav><footer><div className="profile"><i>MC</i><span><b>Mia Chen</b><small>{language === "en" ? currentRole.en : currentRole.zh}</small></span><button>···</button></div></footer></aside>
    <section className="main-area"><header className="topbar"><div className="crumb"><span>{language === "en" ? currentRole.en : currentRole.zh}</span><b>/</b><strong>{language === "en" ? activeMenu.labelEn : activeMenu.label}</strong></div><div className="top-controls"><select className="role-select" value={role} onChange={e => setRole(e.target.value as RoleKey)}>{roles.map(r => <option value={r.key} key={r.key}>{language === "en" ? r.en : r.zh}</option>)}</select><label className="global-search">⌕<input value={search} onChange={e => setSearch(e.target.value)} placeholder={T("搜索当前模块...")} /></label><button className="switch" onClick={() => setLanguage(language === "zh" ? "en" : "zh")} title="中英文切换">{language === "zh" ? "EN" : "中"}</button><button className="switch theme-switch" onClick={() => setTheme(theme === "light" ? "dark" : "light")} title="亮色/暗黑切换">{theme === "light" ? "☾" : "☀"}</button><button className="bell">♧<i /></button><span className="avatar">M</span></div></header><div className="content">{renderPage()}</div></section>
    {toast && <div className="toast">✓ {toast}</div>}
    {modal && <Modal title={modalTitle(modal.type)} onClose={() => setModal(null)}><form onSubmit={handleForm} className="form-grid">{modal.type === "campaign" && <><Field label="Campaign 名称"><input name="name" required /></Field><Field label="负责人"><input name="owner" required defaultValue="Mia" /></Field><Field label="预算"><input name="budget" type="number" min="0" required /></Field><Field label="结束日期"><input name="end" type="date" required /></Field></>}{modal.type === "kol" && <><Field label="达人名称"><input name="name" required /></Field><Field label="平台"><select name="platform"><option>TikTok</option><option>小红书</option><option>Instagram</option><option>YouTube</option></select></Field><Field label="达人等级"><select name="tier"><option>S</option><option>A</option><option>B</option></select></Field><Field label="内容品类"><input name="category" defaultValue="美妆" /></Field><Field label="粉丝数"><input name="followers" type="number" min="0" /></Field><Field label="合作报价"><input name="rate" type="number" min="0" /></Field></>}{modal.type === "content" && <><Field label="任务名称"><input name="title" required /></Field><Field label="所属 Campaign"><select name="campaign">{campaigns.map(x => <option key={x.id}>{x.name}</option>)}</select></Field><Field label="负责人"><input name="owner" required /></Field><Field label="渠道"><select name="channel"><option>TikTok</option><option>小红书</option><option>Instagram</option></select></Field><Field label="截止日期"><input name="due" type="date" required /></Field></>}{modal.type === "sample" && <><Field label="KOL"><select name="kol">{kols.map(x => <option key={x.id}>{x.name}</option>)}</select></Field><Field label="产品"><select name="product">{targets.map(x => <option key={x.id}>{x.product}</option>)}</select></Field><Field label="数量"><input name="qty" type="number" min="1" defaultValue="1" /></Field><Field label="物流单号"><input name="tracking" placeholder="可稍后补充" /></Field></>}{modal.type === "post" && <><Field label="Creator"><select name="creator">{kols.map(x => <option key={x.id}>{x.name}</option>)}</select></Field><Field label="产品"><select name="product">{targets.map(x => <option key={x.id}>{x.product}</option>)}</select></Field><Field label="达人等级"><select name="tier"><option>S</option><option>A</option><option>B</option></select></Field><Field label="计划日期"><input name="date" type="date" required /></Field><Field label="Views（如已发布）"><input name="views" type="number" min="0" defaultValue="0" /></Field><Field label="GMV（如已发布）"><input name="gmv" type="number" min="0" defaultValue="0" /></Field></>}{modal.type === "payment" && <><Field label="收款方"><input name="payee" required /></Field><Field label="付款事项"><input name="item" required /></Field><Field label="金额"><input name="amount" type="number" min="1" required /></Field><Field label="申请人"><input name="owner" required defaultValue="Mia" /></Field></>}{modal.type === "expense" && <><Field label="预算分类"><select name="category">{budgets.map(x => <option key={x.id} value={x.id}>{x.category}</option>)}</select></Field><Field label="本次费用"><input name="amount" type="number" min="1" required /></Field><Field label="说明"><input name="note" required /></Field></>}{editTarget && <><Field label="产品"><input value={editTarget.product} disabled /></Field><Field label="Post Target"><input name="posts" type="number" min="1" defaultValue={editTarget.posts} required /></Field><Field label="Budget Target"><input name="budget" type="number" min="1" defaultValue={editTarget.budget} required /></Field><Field label="GMV Target"><input name="gmv" type="number" min="1" defaultValue={editTarget.gmv} required /></Field><Field label="Views Target"><input name="views" type="number" min="1" defaultValue={editTarget.views} required /></Field></>}<footer><button type="button" className="secondary" onClick={() => setModal(null)}>取消</button><button type="submit" className="primary">保存</button></footer></form></Modal>}
  </main>;
}

function modalTitle(type: string) { return ({ campaign: "新建 Campaign", kol: "添加 KOL", content: "创建内容任务", sample: "新建寄样", post: "登记 Video / Post", payment: "申请付款", expense: "登记费用", target: "编辑月度目标" } as Record<string, string>)[type] || "新建记录"; }
function DataTable({ headers, children }: { headers: string[]; children: ReactNode }) { return <div className="data-table" style={{ ["--cols" as string]: headers.length }}><div className="thead">{headers.map(x => <div key={x}>{x}</div>)}</div>{children}</div>; }
function Toolbar({ search, setSearch, placeholder }: { search: string; setSearch: (v: string) => void; placeholder: string }) { const english = typeof document !== "undefined" && document.documentElement.lang === "en"; return <div className="toolbar"><label>⌕<input value={search} onChange={e => setSearch(e.target.value)} placeholder={placeholder} /></label><button onClick={() => setSearch("")}>{english ? "Clear" : "清除"}</button></div>; }
