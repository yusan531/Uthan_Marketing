"use client";

import {
  type ChangeEvent,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Box,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  ClipboardList,
  Database,
  Download,
  Edit3,
  Eye,
  FileBarChart,
  FileText,
  FolderKanban,
  Gauge,
  Home,
  Languages,
  LayoutDashboard,
  ListChecks,
  LockKeyholeOpen,
  LogIn,
  Maximize2,
  Menu,
  Megaphone,
  Monitor,
  Moon,
  Package,
  PanelLeftClose,
  Plus,
  RefreshCcw,
  RotateCcw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Smartphone,
  Target,
  Trash2,
  Upload,
  UserCog,
  UserRoundCheck,
  Users,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  dashboard31SeptemberPayments,
  dashboard31SeptemberReviews,
  dashboard31SeptemberTargets,
  menuGroups,
  pageConfigs,
  pageGroup,
  roles,
  type ActionKey,
  type ColumnDef,
  type FieldDef,
  type PageConfig,
  type PageKey,
  type RoleKey,
} from "./marketing-config";

type Row = Record<string, unknown> & { id: number | string };
type RowStore = Partial<Record<PageKey, Row[]>>;
type Language = "zh" | "en";
type Theme = "dark" | "light";

const groupIcons: Record<string, LucideIcon> = {
  home: Home,
  target: Target,
  creator: Users,
  content: ClipboardList,
  finance: CircleDollarSign,
  analysis: BarChart3,
  basic: Database,
  system: Settings,
  monitor: Monitor,
  versions: Sparkles,
  mobile31: Smartphone,
};

const pageIcons: Partial<Record<PageKey, LucideIcon>> = {
  home: Gauge,
  targetDashboard: LayoutDashboard,
  dashboard31: LayoutDashboard,
  target1: ClipboardList,
  productTarget: BarChart3,
  ownTarget: ListChecks,
  creator: Users,
  sample: Package,
  campaign: FolderKanban,
  reviews: FileText,
  reviews11: FileText,
  review31a: FileText,
  review31b: FileText,
  review31c: FileText,
  lsaReviews: FileText,
  lsaKocReviews: FileText,
  ownMediaReview: BookOpen,
  inhouseContent: Box,
  payment: WalletCards,
  payment11: WalletCards,
  payment31: WalletCards,
  mobilePayment31: WalletCards,
  mobileReview31: FileText,
  mobileDashboard31: LayoutDashboard,
  paymentPriceChange: RefreshCcw,
  paymentAnalytics: FileBarChart,
  paymentReview: FileBarChart,
  yellowBasket: BarChart3,
  topRankVideo: BarChart3,
  targetAnalytics: Target,
  productAnalytics: BarChart3,
  reviewLevelAnalytics: BarChart3,
  videoAnalytics: BarChart3,
  kolTargetReport: FileBarChart,
  missingPid: CircleHelp,
  brandData: Building2,
  productData: Box,
  budgetRule: WalletCards,
  users: UserCog,
  roles: ShieldCheck,
  menus: Menu,
  notices: Megaphone,
  operLogs: Activity,
  loginLogs: LogIn,
  onlineUsers: UserRoundCheck,
};

const actionIcons: Record<ActionKey, LucideIcon> = {
  add: Plus,
  edit: Edit3,
  delete: Trash2,
  import: Upload,
  export: Download,
  approve: Check,
  clear: RotateCcw,
  unlock: LockKeyholeOpen,
  updateAdsStatus: Megaphone,
  updateReviewStatus: RefreshCcw,
};

const initialRows = Object.fromEntries(
  Object.entries(pageConfigs)
    .filter((entry): entry is [string, PageConfig] => Boolean(entry[1]))
    .map(([key, config]) => [key, (config.seed || []).map((row) => ({ ...row }))]),
) as RowStore;

const budgetRuleSeeds: Record<string, Row[]> = {
  content: [
    { id: 1, contentType: "Vlog", angleName: "Before & After", status: "Approved" },
    { id: 2, contentType: "TTS", angleName: "Problem / Solution", status: "Approved" },
    { id: 3, contentType: "Photoslide", angleName: "Texture & Ingredients", status: "Approved" },
  ],
  stage: [
    { id: 1, englishName: "Introduction", chineseDescription: "导入期", status: "Approved" },
    { id: 2, englishName: "Growth", chineseDescription: "成长期", status: "Approved" },
    { id: 3, englishName: "Maturity", chineseDescription: "成熟期", status: "Approved" },
  ],
  tier: [
    { id: 1, country: "ID", creatorType: "KOL", tier: "S", unitPrice: 2500000, status: "Approved" },
    { id: 2, country: "ID", creatorType: "KOL", tier: "A", unitPrice: 1200000, status: "Approved" },
    { id: 3, country: "ID", creatorType: "KOC", tier: "B", unitPrice: 450000, status: "Approved" },
  ],
};

function useStored<T>(key: string, seed: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(seed);
  const hydrated = useRef(false);

  useEffect(() => {
    let savedValue: T | undefined;
    try {
      const saved = window.localStorage.getItem(key);
      if (saved) savedValue = JSON.parse(saved) as T;
    } catch {
      // Continue with the supplied demo data when storage is unavailable.
    }
    const timer = window.setTimeout(() => {
      if (savedValue !== undefined) setValue(savedValue);
      hydrated.current = true;
    }, 0);
    return () => window.clearTimeout(timer);
  }, [key]);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // The demo remains usable even if browser storage is full or disabled.
    }
  }, [key, value]);

  return [value, setValue];
}

function label(zh: string, en: string, language: Language) {
  return language === "zh" ? zh : en;
}

function compactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function numeric(value: unknown) {
  const result = Number(value);
  return Number.isFinite(result) ? result : 0;
}

function percent(actual: number, target: number) {
  return Math.max(0, Math.round((actual / Math.max(target, 1)) * 100));
}

function statusTone(value: unknown) {
  const text = String(value || "").toLowerCase();
  if (/approved|published|delivered|paid|success|normal|online|已通过|已发布|已签收|成功/.test(text)) return "good";
  if (/rejected|failed|overdue|delayed|disabled|已拒绝|失败|逾期/.test(text)) return "bad";
  if (/pending|draft|shipping|processing|待|运输|草稿/.test(text)) return "warn";
  return "info";
}

function isStatusColumn(key: string) {
  return /status|approval|paid|consistent|progress$/i.test(key);
}

function formatCell(key: string, value: unknown): ReactNode {
  if (value === null || value === undefined || value === "") return <span className="empty-cell">—</span>;
  if (key === "country") {
    const code = String(value).toLowerCase();
    return (
      <span className="country-cell">
        <span className={`fi fi-${code}`} aria-hidden="true" />
        {String(value)}
      </span>
    );
  }
  if (key === "avatar") return <span className="table-avatar">{String(value).slice(0, 2).toUpperCase()}</span>;
  if (isStatusColumn(key)) return <span className={`status-pill ${statusTone(value)}`}>{String(value)}</span>;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
  }
  const text = String(value);
  if (/^https?:\/\//.test(text)) {
    return (
      <a href={text} target="_blank" rel="noreferrer" className="table-link">
        {text.replace(/^https?:\/\//, "")}
      </a>
    );
  }
  return text;
}

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      cells.push(current.trim());
      current = "";
    } else {
      current += character;
    }
  }
  cells.push(current.trim());
  return cells;
}

function toCsvCell(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function downloadCsv(name: string, columns: ColumnDef[], rows: Row[], language: Language) {
  const header = columns.map((column) => toCsvCell(label(column.zh, column.en, language))).join(",");
  const body = rows.map((row) => columns.map((column) => toCsvCell(row[column.key])).join(",")).join("\n");
  const blob = new Blob([`\uFEFF${header}\n${body}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${name.replaceAll(" ", "-").toLowerCase()}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Modal({
  title,
  children,
  onClose,
  wide = false,
  variant,
  centered = false,
}: {
  title: ReactNode;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
  variant?: string;
  centered?: boolean;
}) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  return (
    <div className={`modal-backdrop ${variant && !centered ? "drawer-backdrop" : ""}`} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`modal ${wide ? "modal-wide" : ""} ${variant || ""}`} role="dialog" aria-modal="true">
        <header className="modal-header">
          <h3>{title}</h3>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X size={17} />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}

function CreatorDetailDrawer({
  language,
  creator,
  paymentCount,
  reviewCount,
  onClose,
  onNavigate,
}: {
  language: Language;
  creator: Row | null;
  paymentCount: number;
  reviewCount: number;
  onClose: () => void;
  onNavigate: (page: PageKey) => void;
}) {
  if (!creator) return null;
  return (
    <Modal title={label("达人详情", "Creator Details", language)} onClose={onClose} variant="creator-detail-drawer">
      <div className="creator-detail-drawer-body">
        <div className="creator-detail-head">
          <div className="creator-cell">
            <span className="creator-avatar large">{String(creator.avatar)}</span>
            <span>
              <strong>{String(creator.creatorName)}</strong>
              <small>@{String(creator.accountId)} · {String(creator.country)}</small>
            </span>
          </div>
          <span className={`status-badge ${String(creator.status).toLowerCase()}`}>{String(creator.status)}</span>
        </div>
        <div className="creator-detail-actions">
          <button className="button primary" onClick={() => onNavigate("payment31")}><Plus size={13} />Payment</button>
          <button className="button ghost" onClick={() => onNavigate("review31b")}>Review</button>
        </div>
        <div className="creator-detail-stats">
          <div><strong>{numeric(creator.followersK).toFixed(1)}K</strong><small>Followers</small></div>
          <div><strong>{String(creator.engagementRate)}</strong><small>Engagement</small></div>
          <div><strong>{paymentCount}</strong><small>Payments</small></div>
          <div><strong>{reviewCount}</strong><small>Reviews</small></div>
        </div>
        <dl className="creator-detail-list">
          <div><dt>{label("国家", "Country", language)}</dt><dd>{String(creator.country || "—")}</dd></div>
          <div><dt>{label("品牌", "Brand", language)}</dt><dd>{String(creator.brand || "—")}</dd></div>
          <div><dt>Platform</dt><dd>{String(creator.platform || "—")}</dd></div>
          <div><dt>Tier</dt><dd>{String(creator.tier || "—")}</dd></div>
          <div><dt>{label("数据来源", "Source", language)}</dt><dd>{String(creator.source || "—")}</dd></div>
          <div><dt>{label("银行资料", "Bank", language)}</dt><dd>{String(creator.bankStatus || "—")}</dd></div>
          <div><dt>{label("合规状态", "Compliance", language)}</dt><dd>{String(creator.complianceStatus || "—")}</dd></div>
        </dl>
      </div>
    </Modal>
  );
}

function FieldControl({
  field,
  value,
  language,
  onChange,
  filter = false,
  disabled = false,
}: {
  field: FieldDef;
  value: unknown;
  language: Language;
  onChange: (value: unknown) => void;
  filter?: boolean;
  disabled?: boolean;
}) {
  const textLabel = label(field.zh, field.en, language);
  if (field.kind === "radio") {
    return <div className="radio-segment">{(field.options || []).map((option) => <button type="button" disabled={disabled} key={option.value} className={String(value) === option.value ? "active" : ""} onClick={() => onChange(option.value)}>{label(option.zh, option.en, language)}</button>)}</div>;
  }
  if (field.kind === "select") {
    return (
      <select disabled={disabled} value={String(value ?? "")} onChange={(event) => onChange(event.target.value)}>
        <option value="">{filter ? label("全部", "All", language) : label("请选择", "Select", language)}</option>
        {(field.options || []).map((option) => (
          <option key={option.value} value={option.value}>
            {label(option.zh, option.en, language)}
          </option>
        ))}
      </select>
    );
  }
  if (field.kind === "textarea") {
    return (
      <textarea
        value={String(value ?? "")}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder={language === "zh" ? field.placeholderZh : field.placeholderEn}
        rows={3}
      />
    );
  }
  if (field.kind === "checkbox") {
    return (
      <label className="check-control">
        <input type="checkbox" disabled={disabled} checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />
        <span>{textLabel}</span>
      </label>
    );
  }
  if (field.kind === "file") {
    return (
      <input
        type="file"
        disabled={disabled}
        onChange={(event) => onChange(event.target.files?.[0]?.name || "")}
        aria-label={textLabel}
      />
    );
  }
  const isMonth = field.kind === "date" && field.key.toLowerCase().includes("month");
  const inputType = field.kind === "number" ? "number" : field.kind === "date" ? (isMonth ? "month" : "date") : "text";
  const control = (
    <input
      type={inputType}
      disabled={disabled}
      value={String(value ?? "")}
      onChange={(event) => onChange(field.kind === "number" ? event.target.value : event.target.value)}
      placeholder={(language === "zh" ? field.placeholderZh : field.placeholderEn) || textLabel}
    />
  );
  return field.key === "unitPrice" ? <div className="currency-control"><span>IDR</span>{control}</div> : control;
}

type PostPlan = { postNo: number; platform: string; contentType: string; contentAngle: string; planningPostDate: string; yellowCart: string; boostCode: string; owning: string };
const linkedPlans: Record<string, PostPlan[]> = {
  PID20260824000028: [
    { postNo: 1, platform: "TikTok", contentType: "Vlog", contentAngle: "Review", planningPostDate: "2026-09-05", yellowCart: "Yes", boostCode: "Required", owning: "Brand" },
    { postNo: 2, platform: "TikTok", contentType: "TTS", contentAngle: "Tutorial", planningPostDate: "2026-09-12", yellowCart: "Yes", boostCode: "No", owning: "Creator" },
    { postNo: 3, platform: "Instagram", contentType: "Photoslide", contentAngle: "Lifestyle", planningPostDate: "2026-09-18", yellowCart: "No", boostCode: "No", owning: "Creator" },
  ],
  PID20260824000029: [
    { postNo: 1, platform: "TikTok", contentType: "Vlog", contentAngle: "Before & After", planningPostDate: "2026-09-20", yellowCart: "Yes", boostCode: "Required", owning: "Brand" },
    { postNo: 2, platform: "YouTube", contentType: "Livetalk", contentAngle: "Product Demo", planningPostDate: "2026-09-25", yellowCart: "No", boostCode: "No", owning: "Creator" },
  ],
};

function Version11Modal({ config, row, language, onSave, onClose }: { config: PageConfig; row: Row | null; language: Language; onSave: (row: Row) => void; onClose: () => void }) {
  const isPayment = config.key === "payment11";
  const [form, setForm] = useState<Record<string, unknown>>(() => ({
    paymentNo: row?.paymentNo || (isPayment ? `PID${new Date().toISOString().slice(0, 10).replaceAll("-", "")}0030` : "PID20260824000028"),
    reviewNo: row?.reviewNo || "RID20260824000025", postNo: row?.postNo || "", creatorName: row?.creatorName || "", brand: row?.brand || "Glowsicha",
    owner: row?.owner || "Ajeng Salma Nadhifa Fitriani", followersK: row?.followersK || "", unitPrice: row?.unitPrice || 350000,
    platform: row?.platform || "", contentType: row?.contentType || "", contentAngle: row?.contentAngle || "", planningPostDate: row?.planningPostDate || "",
    yellowCart: row?.yellowCart || "", owning: row?.owning || "", postId: row?.postId || "", postLink: row?.postLink || "", boostCode: row?.boostCode || "",
    actualPostDate: row?.actualPostDate || "", expiredDate: row?.expiredDate || "", sparkAdsStatus: row?.sparkAdsStatus || "None", notes: row?.notes || "",
  }));
  const [plans, setPlans] = useState<PostPlan[]>(() => isPayment ? (linkedPlans[String(row?.paymentNo)] || linkedPlans.PID20260824000028).map(item => ({ ...item })) : []);
  const set = (key: string, value: unknown) => setForm(current => ({ ...current, [key]: value }));
  const qty = plans.length;
  const total = numeric(form.unitPrice) * qty;
  const expected = plans.map(plan => plan.planningPostDate).filter(Boolean).sort().at(-1) || "—";
  const plan = linkedPlans[String(form.paymentNo)]?.find(item => String(item.postNo) === String(form.postNo));

  useEffect(() => {
    if (!isPayment && plan) setForm(current => ({ ...current, platform: plan.platform, contentType: plan.contentType, contentAngle: plan.contentAngle, planningPostDate: plan.planningPostDate, yellowCart: plan.yellowCart, owning: plan.owning }));
  }, [isPayment, plan]);

  const input = (key: string, labelText: string, type = "text", readOnly = false) => <label className="form-field"><span>{labelText}</span><input type={type} value={String(form[key] ?? "")} readOnly={readOnly} onChange={event => set(key, event.target.value)} /></label>;
  const selectBox = (key: string, labelText: string, values: string[], disabled = false) => <label className="form-field"><span>{labelText}</span><select value={String(form[key] ?? "")} disabled={disabled} onChange={event => set(key, event.target.value)}><option value="">{label("请选择", "Select", language)}</option>{values.map(value => <option key={value}>{value}</option>)}</select></label>;
  const save = (event: FormEvent) => { event.preventDefault(); onSave({ ...(row || {}), ...form, id: row?.id || Date.now(), qty, totalPrice: total, expectedPostDate: expected, expiredStatus: form.expiredDate && String(form.expiredDate) < new Date().toISOString().slice(0, 10) ? "Expired" : "Normal", planStatus: "Planning" }); };

  return <Modal title={<span className="review-dialog-heading"><b>{isPayment ? label("Payment1.1 付款计划", "Payment1.1 Payment Plan", language) : label("Reviews1.1 发布结果", "Reviews1.1 Publishing Result", language)}</b><strong>{String(isPayment ? form.paymentNo : form.reviewNo)}</strong></span>} onClose={onClose} wide variant="v11-modal">
    <form onSubmit={save} className="v11-form"><div className="modal-scroll-area">
      <div className="form-section-title"><i />{label("基础信息", "Basic Information", language)}</div>
      <div className="v11-grid">{input("paymentNo", "Payment ID", "text", isPayment)}{!isPayment && selectBox("postNo", "Post No.", (linkedPlans[String(form.paymentNo)] || []).map(item => String(item.postNo)))}{input("creatorName", label("达人名称", "Creator Name", language), "text", !isPayment)}{selectBox("brand", label("品牌", "Brand", language), ["Glowsicha", "Glad2Glow", "Skintific"])}{input("owner", "PIC")}{isPayment && input("followersK", "Followers (K)")}{isPayment && input("unitPrice", "Each Price", "number")}</div>
      {isPayment ? <>
        <div className="v11-summary"><div><span>Quantity</span><b>{qty}</b><small>{label("由明细行数自动统计", "Auto-counted from rows", language)}</small></div><div><span>Total Price</span><b>IDR {total.toLocaleString()}</b><small>Each Price × Quantity</small></div><div><span>Expected Finish All Post Date</span><b>{expected}</b><small>{label("取最晚计划日期", "Latest planned date", language)}</small></div></div>
        <div className="post-plan-title"><div><strong>Post Plan</strong><span>{label("Payment 内明细，不是独立单据", "Details inside Payment, not a separate record", language)}</span></div><button type="button" className="button primary" onClick={() => setPlans(current => [...current, { postNo: current.length + 1, platform: "TikTok", contentType: "Vlog", contentAngle: "", planningPostDate: "", yellowCart: "No", boostCode: "No", owning: "Creator" }])}><Plus size={14}/>{label("新增行", "Add Row", language)}</button></div>
        <div className="plan-table-wrap"><table className="plan-table"><thead><tr><th>Post No.</th><th>Platform</th><th>Content Type</th><th>Content Angle</th><th>Planning Post Date</th><th>YC</th><th>Boost Code</th><th>Owning</th></tr></thead><tbody>{plans.map((item, index) => <tr key={item.postNo}><td><b>{index + 1}</b></td>{(["platform","contentType","contentAngle","planningPostDate","yellowCart","boostCode","owning"] as const).map(key => <td key={key}><input type={key === "planningPostDate" ? "date" : "text"} value={item[key]} onChange={event => setPlans(current => current.map((planItem, itemIndex) => itemIndex === index ? { ...planItem, [key]: event.target.value } : planItem))} /></td>)}</tr>)}</tbody></table></div>
      </> : <>
        <div className="form-section-title"><i />{label("自动带出的 Payment / Post Plan 信息", "Auto-filled Payment / Post Plan Information", language)}</div>
        <div className="v11-grid auto-filled">{input("platform", "Platform", "text", true)}{input("contentType", "Content Type", "text", true)}{input("contentAngle", "Content Angle", "text", true)}{input("planningPostDate", "Planning Post Date", "date", true)}{input("yellowCart", "Yellow Cart", "text", true)}{input("owning", "Owning", "text", true)}</div>
        <div className="form-section-title"><i />{label("实际发布信息", "Actual Publishing Information", language)}</div>
        <div className="v11-grid">{input("postId", "Post ID / Video ID")}{input("actualPostDate", "Actual Post Date", "date")}{input("postLink", "Post Link")}{input("boostCode", "Boost Code / Spark Ads")}{input("expiredDate", "Expired Date", "date")}{selectBox("sparkAdsStatus", "Spark Ads Status", ["None", "Active", "Expired", "Code Deleted"])}</div>
      </>}
    </div><footer className="modal-footer"><button type="button" className="button ghost" onClick={onClose}>{label("取消", "Cancel", language)}</button><button className="button primary" type="submit"><Check size={14}/>{label("保存", "Save", language)}</button></footer></form>
  </Modal>;
}

type PostPlan31 = PostPlan & { strategist: string; reviewId: string; eachPrice: string; rate: string; product: string; sparkStatus: string; postId?: string; postDate?: string; postLink?: string; boostCodeValue?: string; postStatus?: string; sparkAdsStatus?: string; addDate?: string; adsPic?: string; createdAfterApproval?: boolean };
type BatchPlanKey = "strategist" | "platform" | "contentType" | "contentAngle" | "planningPostDate" | "eachPrice" | "product" | "yellowCart" | "owning" | "boostCode";
const plan31Seed: PostPlan31[] = [
  { postNo: 1, strategist: "Ajeng Salma Nadhifa Fitriani", reviewId: "RID20260826000031", platform: "TikTok", contentType: "Vlog", contentAngle: "Review", planningPostDate: "2026-09-05", eachPrice: "350000", rate: "A", product: "Tone Up Sunscreen", yellowCart: "Yes", boostCode: "Yes", owning: "", sparkStatus: "Yes" },
  { postNo: 2, strategist: "Ajeng Salma Nadhifa Fitriani", reviewId: "", platform: "TikTok", contentType: "TTS", contentAngle: "Tutorial", planningPostDate: "2026-09-12", eachPrice: "350000", rate: "A", product: "Day Cream", yellowCart: "Yes", boostCode: "Yes", owning: "", sparkStatus: "Yes" },
  { postNo: 3, strategist: "Ajeng Salma Nadhifa Fitriani", reviewId: "", platform: "Instagram", contentType: "Photoslide", contentAngle: "Lifestyle", planningPostDate: "2026-09-18", eachPrice: "350000", rate: "A", product: "Body Scrub", yellowCart: "No", boostCode: "Yes", owning: "", sparkStatus: "Yes" },
];
const emptyReviewPlan31 = (postNo = 1): PostPlan31 => ({ ...plan31Seed[0], postNo, strategist: "", reviewId: "", platform: "", contentType: "", contentAngle: "", planningPostDate: "", eachPrice: "", rate: "C", product: "", yellowCart: "", boostCode: "Yes", owning: "", sparkStatus: "Yes" });

const normalizeBoostCodeStatus = (value: unknown) => String(value || "").toLowerCase() === "no" ? "No" : "Yes";
const normalizeReviewPostStatus = (value: unknown) => String(value || "") === "Video Removed" ? "Video Removed" : "Normal";
const normalizeReviewSparkAdsStatus = (value: unknown) => {
  const status = String(value || "");
  if (["None", "Done", "CodeDeleted", "Expired", "Code Incorrect"].includes(status)) return status;
  if (status === "Code Deleted") return "CodeDeleted";
  if (["Ready", "Notice", "Active"].includes(status)) return "Done";
  return "None";
};

function Version31Modal({ config, row, language, relatedRows, reviewRows, onSave, onClose, readOnly = false }: { config: PageConfig; row: Row | null; language: Language; relatedRows: Row[]; reviewRows: Row[]; onSave: (row: Row) => void; onClose: () => void; readOnly?: boolean }) {
  const isPayment = config.key === "payment31";
  const scheme = config.key === "review31a" ? "A" : config.key === "review31b" ? "B" : "C";
  const relatedPayment = !isPayment && row?.paymentNo ? relatedRows.find(payment => String(payment.paymentNo || "") === String(row.paymentNo)) : undefined;
  const [plans, setPlans] = useState<PostPlan31[]>(() => {
    const sourcePlans = Array.isArray(row?.postPlans) ? row.postPlans as PostPlan31[] : Array.isArray(relatedPayment?.postPlans) ? relatedPayment.postPlans as PostPlan31[] : !isPayment ? [] : plan31Seed;
    const savedPlans = sourcePlans.map(item => {
      if (!isPayment) return item;
      const review = reviewRows.find(candidate => String(candidate.paymentNo || "") === String(row?.paymentNo || "") && String(candidate.postNo || "") === String(item.postNo || ""));
      const reviewPlan = Array.isArray(review?.postPlans) ? (review.postPlans as Record<string, unknown>[]).find(candidate => String(candidate.postNo || "") === String(item.postNo || "")) : review;
      if (!reviewPlan) return item;
      return { ...item, postId: reviewPlan.postId || review?.postId || item.postId, postDate: reviewPlan.postDate || review?.postDate || review?.actualPostDate || item.postDate, postLink: reviewPlan.postLink || review?.postLink || item.postLink, boostCodeValue: reviewPlan.boostCodeValue || review?.boostCodeValue || item.boostCodeValue, postStatus: reviewPlan.postStatus || review?.postStatus || item.postStatus, sparkAdsStatus: reviewPlan.sparkAdsStatus || review?.sparkAdsStatus || item.sparkAdsStatus, addDate: reviewPlan.addDate || review?.addDate || item.addDate, adsPic: reviewPlan.adsPic || review?.adsPic || item.adsPic };
    });
    return savedPlans.map(item => ({
      ...item,
      sparkStatus: normalizeBoostCodeStatus(item.boostCode || item.sparkStatus),
      boostCode: normalizeBoostCodeStatus(item.boostCode || item.sparkStatus),
      postStatus: item.postStatus ? normalizeReviewPostStatus(item.postStatus) : item.postStatus,
      sparkAdsStatus: item.sparkAdsStatus ? normalizeReviewSparkAdsStatus(item.sparkAdsStatus) : item.sparkAdsStatus,
      ...(Number(row?.postNo) === item.postNo ? { postId: String(row?.postId || ""), postDate: String(row?.postDate || row?.actualPostDate || ""), postLink: String(row?.postLink || ""), boostCodeValue: String(row?.boostCodeValue || item.boostCodeValue || ""), postStatus: normalizeReviewPostStatus(row?.postStatus || "Normal"), sparkAdsStatus: normalizeReviewSparkAdsStatus(row?.sparkAdsStatus || "None"), addDate: String(row?.addDate || ""), adsPic: String(row?.adsPic || "") } : {})
    }));
  });
  const [selectedPlan, setSelectedPlan] = useState(Number(row?.postNo || (isPayment ? 1 : 0)));
  const [selectedPlanRows, setSelectedPlanRows] = useState<Set<number>>(() => new Set(isPayment ? [Number(row?.postNo || 1)] : []));
  const emptyBatchPlan: Record<BatchPlanKey, string> = { strategist: "", platform: "", contentType: "", contentAngle: "", planningPostDate: "", eachPrice: "", product: "", yellowCart: "", owning: "", boostCode: "" };
  const [batchPlanEditOpen, setBatchPlanEditOpen] = useState(false);
  const [batchPlanValues, setBatchPlanValues] = useState<Record<BatchPlanKey, string>>(emptyBatchPlan);
  const [batchPlanTouched, setBatchPlanTouched] = useState<Set<BatchPlanKey>>(new Set());
  const [reviewPlanModule, setReviewPlanModule] = useState<"payment" | "post" | "ads">("payment");
  const reviewEditPostNo = !isPayment && Boolean(row) && !readOnly ? Number(row?.postNo || 0) : 0;
  const selected = plans.find(item => item.postNo === selectedPlan) || plans[0] || emptyReviewPlan31();
  const [form, setForm] = useState<Record<string, unknown>>(() => ({
    paymentNo: row?.paymentNo || (isPayment ? "PID20260826000031" : ""), reviewNo: row?.reviewNo || "", country: row?.country || "ID", creatorName: row?.creatorName || (isPayment ? "alkkna" : ""), brand: row?.brand || (isPayment ? "Glowsicha" : ""), owner: row?.owner || (isPayment ? "Ajeng Salma Nadhifa Fitriani" : ""), kolSpecialist: row?.kolSpecialist || (isPayment ? "Nafa Augustina" : String(relatedPayment?.kolSpecialist || "")), supervisor: row?.supervisor || "Desy Chintya", submitter: row?.submitter || "Uthan", department: row?.department || (isPayment ? "Marketing ID" : ""), unitPrice: row?.unitPrice || (isPayment ? "350000" : String(relatedPayment?.unitPrice || "")), notes: row?.notes || "",
    reviewPlatform: row?.platform || selected.platform, reviewContentType: row?.contentType || selected.contentType, reviewContentAngle: row?.contentAngle || selected.contentAngle, reviewProduct: row?.product || selected.product, reviewPlanningPost: row?.planningPostDate || selected.planningPostDate, reviewEachPrice: row?.unitPrice || selected.eachPrice, reviewRate: row?.rate || selected.rate, reviewYellowCart: row?.yellowCart || selected.yellowCart, reviewOwning: row?.owning || selected.owning, reviewSparkStatus: row?.sparkStatus || selected.sparkStatus, reviewBoostCode: row?.boostCode || selected.boostCode,
    postId: row?.postId || "", postDate: row?.postDate || "", actualPostNo: row?.actualPostNo || "", postLink: row?.postLink || "", sparkCode: row?.sparkCode || "", boostCode: row?.boostCode || "", expiredDate: row?.expiredDate || "", sparkAdsStatus: normalizeReviewSparkAdsStatus(row?.sparkAdsStatus || "None"), qrCode: row?.qrCode || "", contentTag: row?.contentTag || "Launch", actualPrice: row?.actualPrice || selected.eachPrice, rate: row?.rate || selected.rate, postStatus: normalizeReviewPostStatus(row?.postStatus || "Normal"), sampleDate: row?.sampleDate || "", slideProject: row?.slideProject || "No", ranking: row?.ranking || "Normal",
    paymentBank: row?.paymentBank || "GST", bankName: row?.bankName || "Seabank", accountName: row?.accountName || "Alkkna Creator", bankAccount: row?.bankAccount || "901804750996", idNumber: row?.idNumber || "6305044607080001", idName: row?.idName || "Alkkna", invoiceFile: row?.invoiceFile || "", paymentReceipt: row?.paymentReceipt || "", sendPayment: row?.sendPayment || "No", invoiceChecked: row?.invoiceChecked || "Pending", paymentDate: row?.paymentDate || "", financeNote: row?.financeNote || row?.financeNotes || "", supervisorApproval: row?.supervisorApproval || "Pending", ceoApproval: row?.ceoApproval || "Pending",
  }));
  const isPaymentLocked = isPayment && Boolean(row) && [String(form.supervisorApproval || ""), String(form.ceoApproval || "")].includes("Approved");
  const isPaymentPaid = isPayment && Boolean(row) && (String(form.sendPayment || "") === "Yes" || Boolean(form.paymentDate));
  const financeFieldKeys = new Set(["paymentBank", "bankName", "accountName", "bankAccount", "idNumber", "idName", "invoiceFile", "sendPayment", "invoiceChecked", "paymentDate", "paymentReceipt", "financeNote"]);
  const isFinanceFieldLocked = (key: string) => isPaymentPaid && financeFieldKeys.has(key);
  const set = (key: string, value: unknown) => setForm(current => ({ ...current, [key]: value }));
  const creatorValue = String(form.creatorName || "");
  const paymentValue = String(form.paymentNo || "");
  const reviewStandalone = !isPayment && !paymentValue;
  const reviewValue = String(form.reviewNo || "");
  const availableCreators = Array.from(new Set([...relatedRows.map(payment => String(payment.creatorName || "")).filter(Boolean), ...(creatorValue ? [creatorValue] : [])]));
  const availablePayments = Array.from(new Set([...relatedRows.filter(payment => !creatorValue || String(payment.creatorName || "").trim().toLowerCase() === creatorValue.trim().toLowerCase()).map(payment => String(payment.paymentNo || "")).filter(Boolean), ...(paymentValue ? [paymentValue] : [])]));
  const availableReviews = Array.from(new Set([...plans.map(plan => String(plan.reviewId || "")).filter(Boolean), ...(reviewValue ? [reviewValue] : [])]));
  const changeReviewCreator = (value: string) => {
    setForm(current => ({ ...current, creatorName: value, paymentNo: "", reviewNo: "", brand: "", owner: "", supervisor: "", department: "", unitPrice: "", reviewPlatform: "TikTok", reviewContentType: "", reviewContentAngle: "", reviewProduct: "", reviewPlanningPost: "", reviewEachPrice: "", reviewRate: "C", reviewYellowCart: "No", reviewOwning: "Creator", reviewSparkStatus: "None", reviewBoostCode: "" }));
    setSelectedPlan(0);
    setSelectedPlanRows(new Set());
  };
  const changeReviewPayment = (value: string) => {
    const payment = relatedRows.find(item => String(item.paymentNo || "") === value);
    const paymentPlans = value ? (Array.isArray(payment?.postPlans) ? payment.postPlans as PostPlan31[] : plan31Seed) : [];
    setPlans(paymentPlans.map(item => ({ ...item, sparkStatus: normalizeBoostCodeStatus(item.boostCode || item.sparkStatus), boostCode: normalizeBoostCodeStatus(item.boostCode || item.sparkStatus) })));
    setForm(current => ({ ...current, paymentNo: value, reviewNo: "", creatorName: String(payment?.creatorName || current.creatorName || ""), brand: String(payment?.brand || current.brand || ""), owner: String(payment?.owner || current.owner || ""), supervisor: String(payment?.supervisor || current.supervisor || ""), submitter: String(payment?.submitter || current.submitter || ""), department: String(payment?.department || current.department || ""), unitPrice: value ? (payment?.unitPrice || current.unitPrice) : "", reviewPlatform: "TikTok", reviewContentType: "", reviewContentAngle: "", reviewProduct: "", reviewPlanningPost: "", reviewEachPrice: "", reviewRate: "C", reviewYellowCart: "No", reviewOwning: "Creator", reviewSparkStatus: "None", reviewBoostCode: "" }));
    setSelectedPlan(value ? 0 : 0);
    setSelectedPlanRows(new Set());
  };
  const changeReviewLink = (value: string) => {
    const linkedPlan = plans.find(item => item.reviewId === value);
    setForm(current => ({ ...current, reviewNo: value }));
    setSelectedPlan(linkedPlan?.postNo || 0);
  };
  const rateFromPrice = (value: string) => { const price = numeric(value); return price >= 1000000 ? "S" : price >= 300000 ? "A" : price >= 150000 ? "B" : "C"; };
  const updateBasePrice = (value: string) => {
    setForm(current => ({ ...current, unitPrice: value }));
    setPlans(current => current.map(item => ({ ...item, eachPrice: value, rate: rateFromPrice(value) })));
  };
  const addPlan = () => {
    const nextNo = Math.max(0, ...plans.map(item => item.postNo)) + 1;
    const createdAfterApproval = isPayment && isPaymentLocked;
    const eachPrice = createdAfterApproval ? "0" : String(form.unitPrice || plan31Seed[0].eachPrice);
    const template = !isPayment && !paymentValue ? emptyReviewPlan31(nextNo) : plan31Seed[0];
    setPlans(current => [...current, { ...template, postNo: nextNo, reviewId: "", eachPrice: !isPayment && !paymentValue ? "" : eachPrice, rate: createdAfterApproval ? "C" : !isPayment && !paymentValue ? "C" : rateFromPrice(eachPrice), contentAngle: !isPayment && !paymentValue ? "" : "", planningPostDate: !isPayment && !paymentValue ? "" : "", boostCode: "Yes", sparkStatus: "Yes", boostCodeValue: "", createdAfterApproval }]);
    setSelectedPlan(nextNo);
    setSelectedPlanRows(new Set([nextNo]));
  };
  const copyPlan = () => {
    const nextNo = Math.max(0, ...plans.map(item => item.postNo)) + 1;
    const createdAfterApproval = isPayment && isPaymentLocked;
    const source = plans.find(item => item.postNo === selectedPlan) || plans[0];
    setPlans(current => [...current, { ...source, postNo: nextNo, reviewId: "", eachPrice: createdAfterApproval ? "0" : source.eachPrice, rate: createdAfterApproval ? "C" : source.rate, boostCode: "Yes", sparkStatus: "Yes", boostCodeValue: "", postId: "", postDate: "", postLink: "", postStatus: "Normal", sparkAdsStatus: "None", addDate: "", adsPic: "", createdAfterApproval }]);
    setSelectedPlan(nextNo);
    setSelectedPlanRows(new Set([nextNo]));
  };
  const deletePlan = () => {
    if (!selectedPlanRows.size || isPaymentLocked) return;
    const remaining = plans.filter(item => !selectedPlanRows.has(item.postNo));
    if (!remaining.length) {
      window.alert(label("至少保留一条发布计划", "At least one post plan must remain", language));
      return;
    }
    if (!window.confirm(label(`确定删除选中的 ${selectedPlanRows.size} 条发布计划吗？`, `Delete ${selectedPlanRows.size} selected post plan(s)?`, language))) return;
    const renumbered = remaining.map((item, index) => ({ ...item, postNo: index + 1 }));
    setPlans(renumbered);
    setSelectedPlan(renumbered[0]?.postNo || 0);
    setSelectedPlanRows(new Set());
  };
  const field = (key: string, title: string, type = "text", fieldReadOnly = false) => <label className="form-field"><span>{title}</span><input type={type} value={String(form[key] ?? "")} readOnly={readOnly || fieldReadOnly || isPaymentLocked || isFinanceFieldLocked(key)} onChange={event => set(key, event.target.value)} /></label>;
  const choice = (key: string, title: string, options: string[]) => <label className="form-field"><span>{title}</span><select value={String(form[key] ?? "")} disabled={readOnly || isPaymentLocked || isFinanceFieldLocked(key)} onChange={event => set(key, event.target.value)}>{options.map(option => <option key={option}>{option}</option>)}</select></label>;
  const noteField = (key: string, title: string) => <label className="form-field"><span>{title}</span><textarea rows={2} value={String(form[key] ?? "")} readOnly={readOnly || isPaymentLocked || isFinanceFieldLocked(key)} onChange={event => set(key, event.target.value)} placeholder={label("输入付款备注", "Enter finance note", language)} /></label>;
  const attachment = (key: string, title: string) => <label className="form-field"><span>{title}</span><input type="file" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx" disabled={readOnly || isPaymentLocked || isFinanceFieldLocked(key)} onChange={event => set(key, event.target.files?.[0]?.name || "")} />{form[key] ? <small className="attachment-name">{String(form[key])}</small> : <small className="attachment-hint">付款时上传附件</small>}</label>;
  const jumpToReviewPlanModule = (module: "payment" | "post" | "ads") => {
    setReviewPlanModule(module);
    const wrap = document.querySelector<HTMLElement>(".v31-modal .review-grouped-plan-table")?.closest<HTMLElement>(".v31-plan-wrap");
    if (!wrap) return;
    const maxScroll = Math.max(0, wrap.scrollWidth - wrap.clientWidth);
    wrap.scrollTo({ left: module === "payment" ? 0 : module === "post" ? maxScroll * 0.72 : maxScroll, behavior: "smooth" });
  };
  const section = (title: string) => <div className={`form-section-title ${(!isPayment || readOnly) && title === "Post Plan" ? "review-plan-section-title" : ""}`}><span className="form-section-heading"><i />{title}</span>{(!isPayment || readOnly) && title === "Post Plan" && <><div className="review-plan-jump" aria-label={label("快速定位表格模块", "Jump to table module", language)}>{(["payment", "post", "ads"] as const).map(module => <button type="button" key={module} className={reviewPlanModule === module ? "active" : ""} onClick={() => jumpToReviewPlanModule(module)}>{module === "payment" ? "Payment Info" : module === "post" ? "Post Info" : "Ads Info"}</button>)}</div>{!readOnly && scheme === "B" && <div className="review-plan-actions"><button type="button" className="button secondary" disabled={selectedPlanRows.size === 0} onClick={openBatchPlanEdit}><Edit3 size={14}/>{label("批量修改", "Batch Edit", language)}</button><button type="button" className="button primary" onClick={addPlan}><Plus size={14}/>{label("新建", "New", language)}</button><button type="button" className="button ghost" disabled={plans.length === 0} onClick={copyPlan}><ClipboardList size={14}/>{label("复制", "Copy", language)}</button><button type="button" className="button danger-outline" disabled={selectedPlanRows.size === 0} onClick={deletePlan}><Trash2 size={14}/>{label("删除", "Delete", language)}</button></div>}</>}</div>;
  const updatePlan = (index: number, key: keyof PostPlan31, value: string) => setPlans(current => current.map((item, itemIndex) => {
    if (itemIndex !== index) return item;
    const next = { ...item, [key]: value, ...(key === "eachPrice" ? { rate: rateFromPrice(value) } : {}), ...(key === "boostCode" ? { sparkStatus: value } : {}) };
    if (key === "sparkAdsStatus" && value === "Done") {
      next.addDate = item.addDate || new Date().toISOString().slice(0, 10);
      next.adsPic = item.adsPic || "Uthan";
    }
    return next;
  }));
  const togglePlanRow = (postNo: number) => setSelectedPlanRows(current => { const next = new Set(current); if (next.has(postNo)) next.delete(postNo); else next.add(postNo); return next; });
  const toggleAllPlanRows = () => setSelectedPlanRows(current => current.size === plans.length ? new Set() : new Set(plans.map(item => item.postNo)));
  const openBatchPlanEdit = () => { setBatchPlanValues({ ...emptyBatchPlan }); setBatchPlanTouched(new Set()); setBatchPlanEditOpen(true); };
  const updateBatchPlanValue = (key: BatchPlanKey, value: string) => {
    setBatchPlanValues(current => ({ ...current, [key]: value }));
    setBatchPlanTouched(current => new Set(current).add(key));
  };
  const applyBatchPlanEdit = () => {
    if (isPaymentLocked) return;
    setPlans(current => current.map(item => {
      if (!selectedPlanRows.has(item.postNo)) return item;
      const updates = Object.fromEntries([...batchPlanTouched].filter(key => batchPlanValues[key] !== "").map(key => [key, batchPlanValues[key]])) as Partial<PostPlan31>;
      if (batchPlanTouched.has("eachPrice") && batchPlanValues.eachPrice) updates.rate = rateFromPrice(batchPlanValues.eachPrice);
      return { ...item, ...updates };
    }));
    setBatchPlanEditOpen(false);
  };
  const showEditablePlans = !readOnly && (isPayment || scheme === "B");
  const planOptions: Partial<Record<keyof PostPlan31, string[]>> = {
    strategist: ["Ajeng Salma Nadhifa Fitriani", "Nadia", "Delvi", "Shafi", "Cilla"],
    platform: ["TikTok", "Instagram", "YouTube"],
    contentType: ["Vlog", "TTS", "Photoslide", "Livetalk", "Product Only"],
    contentAngle: ["Review", "Tutorial", "Lifestyle", "Before & After", "Product Demo"],
    product: ["Tone Up Sunscreen", "Day Cream", "Body Scrub", "Serum Spray", "Hair Oil"],
    yellowCart: ["Yes", "No"],
    owning: ["Yes", "No"],
    boostCode: ["Yes", "No"],
  };
  const planTotal = plans.reduce((sum, item) => sum + numeric(item.eachPrice), 0);
  const planExpectedFinish = plans.map(item => item.planningPostDate).filter(Boolean).sort().at(-1) || "—";
  const updateQuantity = (value: string) => {
    const nextQuantity = Math.max(0, Math.floor(numeric(value)));
    setPlans(current => {
      if (nextQuantity >= current.length) {
        return [...current, ...Array.from({ length: nextQuantity - current.length }, (_, index) => ({
          ...plan31Seed[0],
          postNo: current.length + index + 1,
          strategist: String(form.owner || plan31Seed[0].strategist),
          eachPrice: !isPayment && !paymentValue ? "" : String(form.unitPrice || plan31Seed[0].eachPrice),
          rate: !isPayment && !paymentValue ? "C" : rateFromPrice(String(form.unitPrice || plan31Seed[0].eachPrice)),
          reviewId: "",
          contentAngle: "",
          planningPostDate: "",
          boostCode: "Yes",
          sparkStatus: "Yes",
          boostCodeValue: "",
        }))];
      }
      const completed = current.filter(item => item.reviewId);
      const editable = current.filter(item => !item.reviewId);
      if (nextQuantity < completed.length) return current;
      return [...completed, ...editable.slice(0, nextQuantity - completed.length)].map((item, index) => ({ ...item, postNo: index + 1 }));
    });
  };
  const updateSingleReviewPlan = (key: string, value: string) => setForm(current => ({ ...current, [key]: value, ...(key === "reviewEachPrice" ? { reviewRate: rateFromPrice(value) } : {}) }));
  const reviewPostLink = (item: PostPlan31) => {
    const postId = String(item.postId || "").trim();
    if (!postId) return String(item.postLink || "");
    const encodedPostId = encodeURIComponent(postId);
    const platform = String(item.platform || "").toLowerCase();
    if (platform === "youtube") return `https://www.youtube.com/watch?v=${encodedPostId}`;
    if (platform === "instagram") return `https://www.instagram.com/p/${encodedPostId}/`;
    const creator = String(form.creatorName || "").trim();
    return creator ? `https://www.tiktok.com/@${encodeURIComponent(creator)}/video/${encodedPostId}` : `https://www.tiktok.com/video/${encodedPostId}`;
  };
  const save = (event: FormEvent) => {
    event.preventDefault();
    const linked = plans.find(item => item.postNo === selectedPlan) || plans[0] || emptyReviewPlan31();
    const createsUnplannedReview = !isPayment && !reviewValue;
    const generatedReviewNo = `RID${new Date().toISOString().replace(/\D/g, "").slice(0, 14)}`;
    const singleReviewPlan = !isPayment && scheme === "A" ? { platform: String(form.reviewPlatform || ""), contentType: String(form.reviewContentType || ""), contentAngle: String(form.reviewContentAngle || ""), product: String(form.reviewProduct || ""), planningPostDate: String(form.reviewPlanningPost || ""), eachPrice: String(form.reviewEachPrice || ""), rate: String(form.reviewRate || ""), yellowCart: String(form.reviewYellowCart || ""), owning: String(form.reviewOwning || ""), sparkStatus: String(form.reviewSparkStatus || ""), boostCode: String(form.reviewBoostCode || "") } : linked;
    onSave({ ...(row || {}), ...form, ...(isPayment ? { financeNotes: String(form.financeNote || "") } : {}), ...(!isPayment ? { postId: linked.postId || "", postDate: linked.postDate || "", postLink: reviewPostLink(linked), boostCodeValue: linked.boostCodeValue || "", postStatus: normalizeReviewPostStatus(linked.postStatus || "Normal"), sparkAdsStatus: normalizeReviewSparkAdsStatus(linked.sparkAdsStatus || "None"), addDate: linked.addDate || "", adsPic: linked.adsPic || "", kolSpecialist: row?.kolSpecialist || relatedPayment?.kolSpecialist || "" } : {}), reviewNo: createsUnplannedReview ? generatedReviewNo : form.reviewNo, linkStatus: createsUnplannedReview ? "Unplanned" : "Linked", id: row?.id || Date.now(), postNo: createsUnplannedReview ? "Unplanned" : linked.postNo, platform: singleReviewPlan.platform, contentType: singleReviewPlan.contentType, contentAngle: singleReviewPlan.contentAngle, product: singleReviewPlan.product, planningPostDate: singleReviewPlan.planningPostDate, yellowCart: singleReviewPlan.yellowCart, owning: singleReviewPlan.owning, sparkStatus: singleReviewPlan.sparkStatus, boostCode: singleReviewPlan.boostCode, qty: plans.length, unitPrice: numeric(singleReviewPlan.eachPrice), totalPrice: plans.reduce((sum, item) => sum + numeric(item.eachPrice), 0), expectedPostDate: plans.map(item => item.planningPostDate).filter(Boolean).sort().at(-1) || "" , postPlans: plans, generatedReviews: isPayment ? plans.map(item => ({ paymentNo: form.paymentNo, postNo: item.postNo, reviewNo: item.reviewId || `RID${Date.now()}${item.postNo}`, creatorName: form.creatorName, owner: form.owner, kolSpecialist: String(form.kolSpecialist || ""), brand: form.brand, strategist: item.strategist, platform: item.platform, contentType: item.contentType, contentAngle: item.contentAngle, product: item.product, planningPostDate: item.planningPostDate, eachPrice: item.eachPrice, yellowCart: item.yellowCart, owning: item.owning, sparkStatus: item.sparkStatus, boostCode: item.boostCode, boostCodeValue: item.boostCodeValue || "", postStatus: "Normal", linkStatus: "Linked", postPlans: plans })) : undefined });
  };

  const renderPlanControl = (item: PostPlan31, index: number, key: keyof PostPlan31) => {
    const inheritedPaymentField = !isPayment && Boolean(paymentValue) && ["strategist", "platform", "planningPostDate", "eachPrice"].includes(String(key));
    if (!showEditablePlans || inheritedPaymentField || (isPaymentLocked && !item.createdAfterApproval)) return <span>{item[key] || "—"}</span>;
    if (isPaymentLocked && item.createdAfterApproval && key === "eachPrice") return <input className="plan-system-field" value="0" readOnly title={label("审批后新增计划单价固定为 0，不可编辑", "Post-approval plans have a fixed price of 0 and cannot be edited", language)} />;
    if (["reviewId", "rate", "sparkStatus"].includes(String(key))) return <input className="plan-system-field" value={item[key]} readOnly placeholder={key === "reviewId" ? label("创建 Review 后自动生成", "Generated after Review is created", language) : label("系统自动带出", "Auto-filled", language)} title={key === "reviewId" ? label("Review 创建成功后生成并回写，不可编辑", "Generated and written back after Review creation; read-only", language) : label("系统字段，不可编辑", "System field; read-only", language)} />;
    const options = planOptions[key];
    if (options) return <select required={["strategist", "platform"].includes(String(key))} value={String(item[key])} onFocus={() => setSelectedPlan(item.postNo)} onChange={event => updatePlan(index, key, event.target.value)}>{key !== "boostCode" && <option value="">{label("请选择", "Select", language)}</option>}{options.map(option => <option key={option}>{option}</option>)}</select>;
    return <input required={key === "planningPostDate" || key === "eachPrice"} type={key === "planningPostDate" ? "date" : key === "eachPrice" ? "number" : "text"} min={key === "eachPrice" ? 0 : undefined} value={item[key]} onFocus={() => setSelectedPlan(item.postNo)} onChange={event => updatePlan(index, key, event.target.value)} />;
  };
  const reviewInlineControl = (item: PostPlan31, index: number, key: "postId" | "postDate" | "postLink" | "boostCodeValue" | "postStatus" | "sparkAdsStatus" | "addDate" | "adsPic") => {
    if (key === "postLink") {
      const link = reviewPostLink(item);
      if (readOnly) return link ? <a className="plan-generated-link-readonly" href={link} target="_blank" rel="noreferrer">{link}</a> : <span>—</span>;
      return <div className="plan-generated-link"><input className="plan-system-field" disabled value={link} placeholder={label("根据 Post ID 自动生成", "Auto-generated from Post ID", language)} title={label("根据 Post ID 自动生成，不可手工修改", "Auto-generated from Post ID and cannot be edited", language)} />{link && <a href={link} target="_blank" rel="noreferrer" aria-label={label("打开自动生成的 Post Link", "Open generated Post Link", language)} title={label("打开链接", "Open link", language)}>↗</a>}</div>;
    }
    if (readOnly) return <span>{item[key] || "—"}</span>;
    if (["postDate", "addDate", "adsPic"].includes(key)) return <input className="plan-system-field" readOnly type={key === "postDate" || key === "addDate" ? "date" : "text"} value={String(item[key] || "")} placeholder={key === "postDate" ? label("根据 Post ID 自动识别", "Auto-detected from Post ID", language) : label("系统自动生成", "Auto-generated", language)} title={key === "postDate" ? label("根据 Post ID 自动识别，不可手工修改", "Auto-detected from Post ID and not manually editable", language) : label("系统自动生成，不可手工修改", "System-generated and not manually editable", language)} />;
    const options = key === "postStatus" ? ["Normal", "Video Removed"] : key === "sparkAdsStatus" ? ["None", "Done", "CodeDeleted", "Expired", "Code Incorrect"] : null;
    if (options) {
      const currentValue = String(item[key] || "");
      const selectedValue = options.includes(currentValue) ? currentValue : options[0];
      return <select value={selectedValue} onFocus={() => setSelectedPlan(item.postNo)} onChange={event => { setSelectedPlan(item.postNo); updatePlan(index, key, event.target.value); }}>{options.map(option => <option key={option}>{option}</option>)}</select>;
    }
    return <input type="text" value={String(item[key] || "")} onFocus={() => setSelectedPlan(item.postNo)} onChange={event => { setSelectedPlan(item.postNo); updatePlan(index, key, event.target.value); }} />;
  };
  const stackedPlanCell = (item: PostPlan31, index: number, keys: readonly (keyof PostPlan31)[], className = "") => <td className={`plan-stacked-cell ${className}`}>{keys.map(key => <div key={String(key)}>{renderPlanControl(item, index, key)}</div>)}</td>;
  const stackedReviewInfoCell = (item: PostPlan31, index: number, keys: readonly ("postId" | "postDate" | "postLink" | "boostCodeValue" | "postStatus" | "sparkAdsStatus")[], className = "") => <td className={`plan-stacked-cell ${className}`}>{keys.map(key => <div key={key}>{reviewInlineControl(item, index, key)}</div>)}</td>;
  const showReviewModules = !isPayment || readOnly;
  const hasReviewPlanSelector = !isPayment && scheme === "C";
  const planPaymentInfoColSpan = hasReviewPlanSelector ? 12 : 11;
  const planPaymentFields = (["reviewId", "strategist", "platform", "planningPostDate"] as const);
  const planTable = (
    <div className="plan-table-wrap v31-plan-wrap">
      <table className={"plan-table v31-plan-table" + (showReviewModules ? " review-grouped-plan-table" : "")}>
        <thead>
          {showReviewModules && <tr className="plan-module-head"><th className="plan-module-payment" colSpan={planPaymentInfoColSpan} aria-hidden="true" /><th className="plan-module-post" colSpan={2}>Post Info</th><th className="plan-module-ads" colSpan={2}>Ads Info</th></tr>}
          <tr>
            <th className="plan-check-cell"><input type="checkbox" disabled={readOnly} aria-label={label("全选发布计划", "Select all post plans", language)} checked={plans.length > 0 && selectedPlanRows.size === plans.length} onChange={toggleAllPlanRows} /></th>
            {hasReviewPlanSelector && <th className="plan-payment-info-field plan-select-field" />}
            <th className="plan-payment-info-field">No.</th>
            <th className="plan-payment-info-field">Review ID</th>
            <th className="plan-payment-info-field">KOL Strategist *</th>
            <th className="plan-payment-info-field">Platform *</th>
            <th className="plan-payment-info-field">Planning Post *</th>
            <th className="plan-payment-info-field plan-stacked-header">Each Price *<br />Rate</th>
            <th className="plan-payment-info-field plan-product-header">Product</th>
            <th className="plan-payment-info-field plan-stacked-header">Content Type<br />Content Angle</th>
            <th className="plan-payment-info-field plan-stacked-header">Yellow Cart<br />Owning</th>
            <th className="plan-payment-info-field">Boost Code</th>
            {showReviewModules && <><th className="plan-post-info-field plan-module-start plan-stacked-header">Post ID<br />Boost Code Value</th><th className="plan-post-info-field plan-stacked-header">Post Link<br />Post Date</th><th className="plan-ads-info-field plan-module-start plan-stacked-header">Review Status<br />Spark Ads Status</th><th className="plan-ads-info-field plan-stacked-header">Ad Date<br />Ads PIC</th></>}
          </tr>
        </thead>
        <tbody>{plans.map((item, index) => <tr key={item.postNo} className={`${selectedPlan === item.postNo ? "selected-plan" : ""}${reviewEditPostNo === item.postNo ? " review-edit-highlight" : ""}`}>
          <td className="plan-check-cell"><input type="checkbox" disabled={readOnly} aria-label={label("选择", "Select", language) + " Post No. " + item.postNo} checked={selectedPlanRows.has(item.postNo)} onChange={() => togglePlanRow(item.postNo)} /></td>
          {hasReviewPlanSelector && <td className="plan-payment-info-cell plan-select-field"><input type="radio" disabled={readOnly || !reviewValue} checked={selectedPlan === item.postNo} onChange={() => setSelectedPlan(item.postNo)} /></td>}
          <td className="plan-payment-info-cell"><b>{item.postNo}</b></td>
          {planPaymentFields.map(key => <td className="plan-payment-info-cell" key={key}>{renderPlanControl(item, index, key)}</td>)}
          {stackedPlanCell(item, index, ["eachPrice", "rate"], "plan-payment-info-cell")}
          <td className="plan-payment-info-cell plan-product-cell">{renderPlanControl(item, index, "product")}</td>
          {stackedPlanCell(item, index, ["contentType", "contentAngle"], "plan-payment-info-cell")}
          {stackedPlanCell(item, index, ["yellowCart", "owning"], "plan-payment-info-cell")}
          <td className="plan-payment-info-cell">{renderPlanControl(item, index, "boostCode")}</td>
          {showReviewModules && <>{stackedReviewInfoCell(item, index, ["postId", "boostCodeValue"], "plan-post-info-cell plan-module-start")}{stackedReviewInfoCell(item, index, ["postLink", "postDate"], "plan-post-info-cell")}{stackedReviewInfoCell(item, index, ["postStatus", "sparkAdsStatus"], "plan-ads-info-cell plan-module-start")}<td className="plan-ads-info-cell plan-stacked-cell"><div>{reviewInlineControl(item, index, "addDate")}</div><div>{reviewInlineControl(item, index, "adsPic")}</div></td></>}
        </tr>)}</tbody>
      </table>
    </div>
  );
  const postPlanSection = <>{section("Post Plan")}{isPayment && !readOnly && <div className="post-plan-title payment-post-plan-actions"><div className="v31-plan-actions"><button type="button" className="button secondary" disabled={selectedPlanRows.size === 0 || isPaymentLocked} onClick={openBatchPlanEdit}><Edit3 size={14}/>{label("批量修改", "Batch Edit", language)}</button><button type="button" className="button primary" onClick={addPlan}><Plus size={14}/>{label("新增", "Add", language)}</button><button type="button" className="button ghost" disabled={plans.length === 0} onClick={copyPlan}><ClipboardList size={14}/>{label("复制", "Copy", language)}</button><button type="button" className="button danger-outline" disabled={selectedPlanRows.size === 0 || isPaymentLocked} onClick={deletePlan}><Trash2 size={14}/>{label("删除", "Delete", language)}</button></div></div>}{!isPayment && !creatorValue ? <div className="review-plan-locked"><LockKeyholeOpen size={18}/><b>{label("请先选择 Creator 后开始填写 Post Plan", "Enter a Creator to start the Post Plan", language)}</b></div> : planTable}</>;

  return <><Modal title={<span className="review-dialog-heading"><b>{isPayment ? (readOnly ? label("Payment3.1 查看", "Payment3.1 View", language) : "Payment3.1") : form.reviewNo ? "Review3.1-Edit" : "Review3.1-Add"}</b>{(isPayment || form.reviewNo) && <strong>{String(isPayment ? form.paymentNo : form.reviewNo)}</strong>}</span>} onClose={onClose} wide variant="v11-modal v31-modal">
    <form onSubmit={save} className={`v11-form v31-form ${!isPayment && row && paymentValue ? "review-edit-mode" : ""}`}><div className="modal-scroll-area">
      {section(label("基础信息", "Base Info", language))}{isPayment ? <div className="v11-grid">{field("country", "Country", "text", true)}{field("creatorName", "Creator Name")}{field("paymentNo", "Payment ID", "text", true)}{field("brand", "Brand", "text", true)}{field("supervisor", "Supervisor")}{field("owner", "KOL Strategist")}{field("kolSpecialist", "KOL Specialist")}{field("submitter", "Submitter", "text", true)}{field("department", "Initiator Department", "text", true)}<label className="form-field"><span>Quantity</span><input type="number" min="0" value={plans.length} readOnly={readOnly || isPaymentLocked} onChange={event => updateQuantity(event.target.value)} /></label><label className="form-field"><span>Each Price</span><input type="number" min="0" value={String(form.unitPrice || "")} readOnly={readOnly || isPaymentLocked} onChange={event => updateBasePrice(event.target.value)} /></label><label className="form-field"><span>Total Price</span><input value={planTotal} readOnly /></label><label className="form-field"><span>Expected Finish All Post Date</span><input value={planExpectedFinish} readOnly /></label></div> : <div className="v11-grid review-link-grid review-base-info-grid"><label className="form-field"><span>Country</span><input value={String(form.country || "ID")} disabled /></label><label className="form-field"><span>Creator Name *</span><input required disabled={readOnly} list="review31-creator-options" value={creatorValue} onChange={event => changeReviewCreator(event.target.value)} placeholder={label("输入 Creator Name", "Enter Creator Name", language)} /><datalist id="review31-creator-options">{availableCreators.map(creator => <option key={creator} value={creator} />)}</datalist></label><label className="form-field"><span>Payment ID</span><select disabled={readOnly || !creatorValue} value={paymentValue} onChange={event => changeReviewPayment(event.target.value)}><option value="">{creatorValue ? label("无 Payment", "No Payment", language) : label("请先输入 Creator", "Enter Creator first", language)}</option>{availablePayments.map(payment => <option key={payment}>{payment}</option>)}</select></label><label className="form-field"><span>Brand</span><input value={String(form.brand || "")} readOnly /></label><label className="form-field"><span>KOL Strategist</span><input value={String(form.owner || "")} readOnly={readOnly || !reviewStandalone} onChange={event => set("owner", event.target.value)} /></label><label className="form-field"><span>KOL Specialist</span><input value={String(form.kolSpecialist || "")} readOnly={readOnly || !reviewStandalone} onChange={event => set("kolSpecialist", event.target.value)} /></label><label className="form-field"><span>Supervisor</span><input value={String(form.supervisor || "")} readOnly={readOnly || !reviewStandalone} onChange={event => set("supervisor", event.target.value)} /></label><label className="form-field"><span>Submitter</span><input value={String(form.submitter || "")} readOnly /></label><label className="form-field"><span>Initiator Department</span><input value={String(form.department || "")} readOnly /></label><label className="form-field"><span>Quantity</span><input type="number" value={plans.length ? plans.length : ""} readOnly={readOnly || !reviewStandalone} onChange={event => updateQuantity(event.target.value)} /></label><label className="form-field"><span>Each Price</span><input type="number" value={String(form.unitPrice || selected?.eachPrice || "")} readOnly={readOnly || !reviewStandalone} onChange={event => updateBasePrice(event.target.value)} /></label><label className="form-field"><span>Total Price</span><input value={planTotal} readOnly /></label><label className="form-field"><span>Expected Finish All Post Date</span><input value={planExpectedFinish} readOnly /></label></div>}
      {postPlanSection}
      {isPayment && <>{section(label("财务信息", "Finance Info", language))}<div className="v11-grid">{choice("paymentBank", "Payment Bank", ["GST","GIA","Private"])}{field("bankName", "Bank Name")}{field("accountName", "Account Name")}{field("bankAccount", "Bank Account")}{field("idNumber", "ID (NPW/KTP)")}{field("idName", "ID Name")}{attachment("invoiceFile", "Invoice & ID File")}{choice("sendPayment", "Send Payment", ["No","Yes"])}</div>{row && <>{section("Pay Info")}<div className="v11-grid">{choice("invoiceChecked", "Invoice Checked", ["Pending","Approved","Rejected"])}{field("paymentDate", "Date of Payment", "date")}{attachment("paymentReceipt", "Payment Receipt")}{noteField("financeNote", "Finance Note")}</div>{section("Approvals")}<div className="v11-grid">{choice("supervisorApproval", "Supervisor", ["Pending","Approved","Rejected"])}{choice("ceoApproval", "CEO Approval", ["Pending","Approved","Rejected"])}</div></>}</>}
    </div><footer className="modal-footer"><button type="button" className="button ghost" onClick={onClose}>{label(readOnly ? "关闭" : "取消", readOnly ? "Close" : "Cancel", language)}</button>{!readOnly && <button className="button primary" type="submit"><Check size={14}/>{label("保存", "Save", language)}</button>}</footer></form>
  </Modal>{batchPlanEditOpen && <Modal title={label("批量修改 Post Plan", "Batch Edit Post Plan", language)} onClose={() => setBatchPlanEditOpen(false)} wide centered variant="v11-modal batch-plan-modal"><form onSubmit={event => { event.preventDefault(); applyBatchPlanEdit(); }}><div className="modal-scroll-area"><div className="batch-plan-note"><b>{label(`将修改已选择的 ${selectedPlanRows.size} 行`, `Editing ${selectedPlanRows.size} selected rows`, language)}</b><span>{label("留空或选择“不修改”将保留原值；Review ID、Rate、Post Date、Ad Date、Ads PIC 为系统字段。", "Blank or No change keeps the original value. Review ID, Rate, Post Date, Ad Date and Ads PIC are system fields.", language)}</span></div><div className="v11-grid batch-plan-grid">
    {(["strategist", "platform", "contentType", "contentAngle", "product", "yellowCart", "owning", "boostCode"] as BatchPlanKey[]).map(key => <label className="form-field" key={key}><span>{{ strategist: "KOL Strategist", platform: "Platform", contentType: "Content Type", contentAngle: "Content Angles", product: "Product", yellowCart: "Yellow Cart", owning: "Owning", boostCode: "Boost Code" }[key]}</span><select value={batchPlanValues[key]} onChange={event => updateBatchPlanValue(key, event.target.value)}><option value="">{label("不修改", "No change", language)}</option>{(planOptions[key] || []).map(option => <option key={option}>{option}</option>)}</select></label>)}
    <label className="form-field"><span>Planning Post</span><input type="date" value={batchPlanValues.planningPostDate} onChange={event => updateBatchPlanValue("planningPostDate", event.target.value)} /></label><label className="form-field"><span>Each Price</span><input type="number" min="0" placeholder={label("留空则不修改", "Blank keeps original", language)} value={batchPlanValues.eachPrice} onChange={event => updateBatchPlanValue("eachPrice", event.target.value)} /></label>
  </div></div><footer className="modal-footer"><button type="button" className="button ghost" onClick={() => setBatchPlanEditOpen(false)}>{label("取消", "Cancel", language)}</button><button type="submit" className="button primary"><Check size={14}/>{label("应用到所选行", "Apply to Selected", language)}</button></footer></form></Modal>}</>;
}

function OwnMediaReviewModal({ config, row, language, onSave, onClose, readOnly = false }: { config: PageConfig; row: Row | null; language: Language; onSave: (row: Row) => void; onClose: () => void; readOnly?: boolean }) {
  const [form, setForm] = useState<Record<string, unknown>>(() => ({
    reviewNo: row?.reviewNo || `OVID${new Date().toISOString().slice(0, 10).replaceAll("-", "")}${String(Date.now()).slice(-6)}`,
    country: row?.country || "ID",
    postId: row?.postId || "",
    postDate: row?.postDate || "",
    postLink: row?.postLink || "",
    creatorName: row?.creatorName || "",
    pic: row?.pic || "Uthan(玉山)",
    picDepartment: row?.picDepartment || "信息技术部",
    brand: row?.brand || "",
    product: row?.product || "",
    yellowBasket: row?.yellowBasket || "No",
    videoSource: row?.videoSource || "",
    adType: row?.adType || "",
    target: row?.target || "",
    contentTag: row?.contentTag || "",
    sparkCode: row?.sparkCode || "",
    notes: row?.notes || "",
    sparkAdsStatus: row?.sparkAdsStatus || "None",
    adDate: row?.adDate || "",
    adsPic: row?.adsPic || "",
    gmvRp: row?.gmvRp || "",
    gmxRp: row?.gmxRp || "",
    gmvUpdateDate: row?.gmvUpdateDate || "",
    gmvUsd: row?.gmvUsd || "",
    gmxGmvUsd: row?.gmxGmvUsd || "",
  }));

  const fieldOptions = (key: string) => config.fields.find((field) => field.key === key)?.options || [];
  const productValues = String(form.product || "").split(/[,，]/).map((value) => value.trim()).filter(Boolean);
  const setField = (key: string, value: unknown) => setForm((current) => ({ ...current, [key]: value }));
  const ownLabel = (zh: string, en: string) => label(zh, en, language);

  function addProduct(value: string) {
    if (!value || productValues.includes(value)) return;
    setField("product", [...productValues, value].join(", "));
  }

  function removeProduct(value: string) {
    setField("product", productValues.filter((item) => item !== value).join(", "));
  }

  function fetchPostInfo() {
    if (!String(form.postId || "")) return;
    setField("postDate", row?.postDate || new Date().toISOString().slice(0, 19).replace("T", " "));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const now = new Date().toISOString().slice(0, 16).replace("T", " ");
    onSave({
      ...(row || {}),
      ...form,
      id: row?.id ?? Date.now(),
      createdAt: row?.createdAt || new Date().toISOString().slice(0, 10),
      updatedAt: now,
      country: String(form.country || "ID"),
      product: String(form.product || ""),
      pic: String(form.pic || "Uthan(玉山)"),
      picDepartment: String(form.picDepartment || "信息技术部"),
    });
  }

  const ownText = (key: string, zh: string, en: string, placeholder = "", system = false, required = false) => (
    <label className="own-media-field" key={key}>
      <span>{required && <b className="required-mark">*</b>}{ownLabel(zh, en)}</span>
      {key === "notes" ? <textarea value={String(form[key] ?? "")} placeholder={placeholder || ownLabel(zh, en)} readOnly={readOnly || system} onChange={(event) => setField(key, event.target.value)} rows={3} /> : <input required={required} type="text" value={String(form[key] ?? "")} placeholder={placeholder || ownLabel(zh, en)} readOnly={readOnly || system} onChange={(event) => setField(key, event.target.value)} />}
    </label>
  );
  const ownDate = (key: string, zh: string, en: string, system = false) => (
    <label className="own-media-field" key={key}>
      <span>{ownLabel(zh, en)}</span>
      <input type={system ? "text" : "date"} value={String(form[key] ?? "")} readOnly={readOnly || system} onChange={(event) => setField(key, event.target.value)} />
    </label>
  );
  const ownSelect = (key: string, zh: string, en: string, required = false, disabled = false) => (
    <label className="own-media-field" key={key}>
      <span>{required && <b className="required-mark">*</b>}{ownLabel(zh, en)}</span>
      <select required={required} disabled={readOnly || disabled} value={String(form[key] ?? "")} onChange={(event) => setField(key, event.target.value)}>
        <option value="">{ownLabel("请选择", "Please select")}</option>
        {fieldOptions(key).map((option) => <option value={option.value} key={option.value}>{label(option.zh, option.en, language)}</option>)}
      </select>
    </label>
  );
  const ownSystem = (zh: string, en: string, value: unknown = "-") => <div className="own-media-system-field"><span>{ownLabel(zh, en)}</span><strong>{String(value || "-")}</strong></div>;

  return (
    <Modal
      title={<span className="own-media-dialog-heading"><b>{ownLabel(row ? "编辑 Own Media Review" : "新增 Own Media Review", row ? "Edit Own Media Review" : "Add Own Media Review")}</b><strong>{String(form.reviewNo)}</strong><em><span className="fi fi-id flag-id" /> ID</em></span>}
      onClose={onClose}
      wide
      centered
      variant="own-media-modal"
    >
      <form onSubmit={submit} className="own-media-form">
        <div className="modal-scroll-area">
          <div className="form-section-title"><i />{ownLabel("基础信息", "Base Info")}</div>
          <div className="own-media-base-layout">
            <div className="own-media-fields">
              <div className="own-media-grid two">
                {ownText("postId", "Post ID", "Post ID", "Enter Post ID", false, true)}
                {ownDate("postDate", "发布日期", "Post Date", true)}
              </div>
              <div className="own-media-grid two">
                <label className="own-media-field">
                  <span><b className="required-mark">*</b>{ownLabel("帖子链接", "Post Link")}</span>
                  <div className="own-media-input-action"><input required type="text" value={String(form.postLink || "")} placeholder="Enter text" readOnly={readOnly} onChange={(event) => setField("postLink", event.target.value)} /><button type="button" disabled={readOnly} aria-label="Fetch video info" title="Fetch video info" onClick={fetchPostInfo}><Send size={14} /></button></div>
                </label>
                {ownText("creatorName", "创作者名称", "Creator Name", "Enter creator name")}
              </div>
              <div className="own-media-grid two">
                {ownSelect("brand", "品牌", "Brand", true)}
                <label className="own-media-field"><span>{ownLabel("PIC", "PIC")}</span><div className="own-media-pic-value"><span className="own-media-avatar large">{String(form.pic || "UT").slice(0, 2).toUpperCase()}</span><span>{String(form.pic || "-")} - {String(form.picDepartment || "-")}</span></div></label>
              </div>
              <div className="own-media-grid one">
                <label className="own-media-field own-media-wide"><span><b className="required-mark">*</b>{ownLabel("产品", "Product")}</span><div className="own-media-product-control">{productValues.map((value) => <span className="own-media-product-tag" key={value}>{value}{!readOnly && <button type="button" onClick={() => removeProduct(value)} aria-label={`Remove ${value}`}><X size={11} /></button>}</span>)}<select required={!productValues.length} disabled={readOnly || !form.brand} value="" onChange={(event) => addProduct(event.target.value)}><option value="">{form.brand ? ownLabel("选择产品", "Select product") : ownLabel("请先选择国家和品牌（多选）", "Select country and brand first (multi)")}</option>{fieldOptions("product").map((option) => <option value={option.value} key={option.value}>{label(option.zh, option.en, language)}</option>)}</select></div></label>
              </div>
              <div className="own-media-grid two">
                <label className="own-media-field"><span><b className="required-mark">*</b>{ownLabel("Yellow Basket", "Yellow Basket")}</span><div className="radio-segment">{["Yes", "No"].map((value) => <button type="button" disabled={readOnly} className={String(form.yellowBasket) === value ? "active" : ""} key={value} onClick={() => setField("yellowBasket", value)}>{value}</button>)}</div></label>
                {ownSelect("videoSource", "视频来源", "Video Source", true)}
              </div>
              <div className="own-media-grid two">
                {ownSelect("adType", "广告类型", "Ad Type", true)}
                {ownSelect("target", "目标", "Target", true)}
              </div>
              <div className="own-media-grid one">{ownSelect("contentTag", "内容标签", "Content Tag", true)}</div>
              <div className="own-media-grid one">{ownText("sparkCode", "Spark Code", "Spark Code", "Enter Code Boost")}</div>
              <div className="own-media-grid one">{ownText("notes", "备注", "Notes", "Enter text")}</div>
            </div>
            <aside className="own-media-qr" aria-label="QR code for post link">{form.postLink ? ownLabel("二维码预览", "QR code preview") : ownLabel("填写帖子链接后显示二维码", "Enter a post link to show QR code")}</aside>
          </div>

          {row && <div className="own-media-grid two own-media-edit-status"><>{ownSelect("sparkAdsStatus", "Spark Ads 状态", "Spark Ads Status")}</><label className="own-media-field"><span>{ownLabel("广告日期", "Ad Date")}</span><input type="text" value={String(form.adDate || "-")} readOnly /></label><label className="own-media-field"><span>{ownLabel("Ads PIC", "Ads PIC")}</span><input type="text" value={String(form.adsPic || "-")} readOnly /></label></div>}

          <section className="own-media-section">
            <h4 className="own-media-section-title"><i />GMV</h4>
            <div className="own-media-gmv-grid">{ownSystem("GMV (Rp)", "GMV (Rp)", form.gmvRp)}{ownSystem("Gmx (Rp)", "Gmx (Rp)", form.gmxRp)}{ownSystem("GMV update date", "GMV update date", form.gmvUpdateDate)}{ownSystem("GMV ($)", "GMV ($)", form.gmvUsd)}{ownSystem("GmxGMV ($)", "GmxGMV ($)", form.gmxGmvUsd)}</div>
          </section>
          <section className="own-media-section">
            <h4 className="own-media-section-title"><i />{ownLabel("查看摘要（系统生成）", "View summary (system-filled)")}</h4>
            <div className="own-media-summary-grid">{[["Post ID", form.postId], ["Post Date", form.postDate], ["Status", row ? "Active" : "-"], ["Update date", row?.updatedAt], ["Views (latest total)", row?.views], ["Days since actual post", "-"], ["Likes", row?.likes], ["Comments", row?.comments], ["Favorites", row?.favorites], ["Shares", row?.shares], ["Engagement rate", row?.engagementRate]].map(([name, value]) => <div key={String(name)}><span>{name}</span><strong>{String(value || "-")}</strong></div>)}</div>
          </section>
          <section className="own-media-section">
            <h4 className="own-media-section-title"><i />{ownLabel("目标", "Target")}</h4>
            <div className="own-media-summary-grid"><div><span>Target</span><strong>{String(form.target || "-")}</strong></div><div><span>Target value</span><strong>{String(row?.targetValue || "-")}</strong></div></div>
          </section>
        </div>
        <footer className="modal-footer"><button type="button" className="button ghost" onClick={onClose}>{ownLabel("取消", "Cancel")}</button>{!readOnly && <button type="submit" className="button primary"><Check size={14} />OK</button>}</footer>
      </form>
    </Modal>
  );
}

function RecordModal({
  config,
  row,
  language,
  relatedRows = [],
  reviewRows = [],
  readOnly = false,
  onSave,
  onClose,
}: {
  config: PageConfig;
  row: Row | null;
  language: Language;
  relatedRows?: Row[];
  reviewRows?: Row[];
  readOnly?: boolean;
  onSave: (row: Row) => void;
  onClose: () => void;
}) {
  const activeFields = row ? (config.editFields || config.fields) : (config.modalFields || config.fields);
  const [form, setForm] = useState<Record<string, unknown>>(() =>
    Object.fromEntries(activeFields.map((field) => {
      const existing = row?.[field.key];
      if (existing !== undefined && existing !== null && existing !== "") return [field.key, existing];
      if (config.key === "reviews" && row) {
        if (field.key === "postLink") return [field.key, `https://www.tiktok.com/@${row.creatorName}/video/${row.postId}`];
        if (field.key === "submitter") return [field.key, row.owner || ""];
        if (field.key === "rateTier") return [field.key, "B"];
        if (field.key === "slideProject") return [field.key, "No"];
        if (field.key === "yellowBasket") return [field.key, "Yes"];
        if (field.key === "hasSparkCode") return [field.key, "Yes"];
        if (field.key === "videoType") return [field.key, "Review"];
        if (field.key === "contentAngle") return [field.key, "Review"];
        if (field.key === "sparkAdsStatus") return [field.key, "None"];
        if (field.key === "sparkExpiry") return [field.key, "2027-08-17"];
        if (field.key === "sparkCode") return [field.key, "#wIKSR5BMEEMwiPWdRVUJgv8eWdnc0HoFFUWSFZN0wA+QwOtBqPqtn/Fp+MHS0fc="];
      }
      return [field.key, ""];
    })),
  );

  if (["payment11", "reviews11"].includes(String(config.key))) return <Version11Modal config={config} row={row} language={language} onSave={onSave} onClose={onClose} />;
  if (["payment31", "review31a", "review31b", "review31c"].includes(String(config.key))) return <Version31Modal config={config} row={row} language={language} relatedRows={relatedRows} reviewRows={reviewRows} readOnly={readOnly} onSave={onSave} onClose={onClose} />;
  if (config.key === "ownMediaReview") return <OwnMediaReviewModal config={config} row={row} language={language} readOnly={readOnly} onSave={onSave} onClose={onClose} />;

  function submit(event: FormEvent) {
    event.preventDefault();
    const normalized = Object.fromEntries(
      activeFields.map((field) => {
        const value = form[field.key];
        if (field.kind === "number" && value !== "") return [field.key, numeric(value)];
        return [field.key, value];
      }),
    );
    if (["reviews", "lsaReviews", "lsaKocReviews", "ownMediaReview"].includes(config.key)) {
      const products = String(normalized.product || "").split(/[,，]/).map((item) => item.trim()).filter(Boolean);
      if (products.length > 1) {
        const allocated = numeric(normalized.unitPrice) / products.length;
        normalized.productCostSplit = products.map((product) => `${product}: ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(allocated)}`).join(" · ");
      }
    }
    onSave({
      ...(row || {}),
      ...normalized,
      id: row?.id ?? Date.now(),
      updatedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
    });
  }

  const renderField = (field: FieldDef) => (
    <label key={field.key} className={`form-field ${field.wide ? "wide" : ""}`}>
      <span>{field.required && <b className="required-mark">*</b>}{label(field.zh, field.en, language)}</span>
      <FieldControl
        field={field}
        value={form[field.key]}
        language={language}
        onChange={(value) => setForm((current) => ({ ...current, [field.key]: value }))}
      />
    </label>
  );

  const isRealSystemModal = config.key === "reviews" || config.key === "payment";
  const sectionBreak = config.key === "payment" ? 16 : activeFields.length;

  return (
    <Modal
      title={config.key === "reviews"
        ? <span className="review-dialog-heading"><b>{row ? label("修改帖子记录", "Edit Post", language) : label("添加帖子记录", "Add Post", language)}</b><strong>{String(row?.reviewNo || "RID20260824000024")}</strong><em><span className="fi fi-id flag-id" /> ID</em></span>
        : config.key === "payment"
          ? <span className="review-dialog-heading"><b>{row ? label("修改支付记录", "Edit Payment Record", language) : label("添加支付记录", "Add Payment Record", language)}</b><strong>{String(row?.paymentNo || "PID20260824000028")}</strong><em><span className="fi fi-id flag-id" /> ID</em></span>
        : row
        ? label("修改记录", "Edit Record", language)
        : config.key === "reviews"
          ? label("添加帖子记录", "Add Post Record", language)
          : config.key === "payment"
            ? label("添加支付记录", "Add Payment Record", language)
            : label("新增记录", "Add Record", language)}
      onClose={onClose}
      wide={activeFields.length > 8}
      variant={config.key === "reviews" ? "review-exact-modal" : config.key === "payment" ? "payment-exact-modal" : undefined}
    >
      <form onSubmit={submit} className={isRealSystemModal ? "real-system-form" : ""}>
        <div className="modal-scroll-area">
          {isRealSystemModal && <div className="form-section-title"><i />{label("基础信息", "Basic Information", language)}</div>}
          {config.key === "reviews" ? (
            <div className="review-exact-grid">
              <div className="review-main-fields">
                <div className="rg two">{["postId","actualPostDate"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
                <div className="rg two">{["platform","postSequence"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
                <div className="rg one">{renderField(activeFields.find(f=>f.key==="postLink")!)}</div>
                <div className="rg one">{renderField(activeFields.find(f=>f.key==="paymentNo")!)}</div>
              </div>
              <aside className="qr-placeholder">{label("填写帖子链接后显示二维码", "QR code appears after entering the post link", language)}</aside>
              <div className="review-full-fields">
                <div className="rg three">{["creatorName","owner","submitter"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
                <div className="rg three">{["unitPrice","rateTier","postStatus"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
                <div className="rg three">{["brand","product","sampleDate"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
                <div className="rg three">{["slideProject","yellowBasket","ranking"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
                <div className="rg three blank-last">{["videoType","contentAngle"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
                <div className="rg one">{renderField(activeFields.find(f=>f.key==="contentTag")!)}</div>
                <div className="rg spark-status-row">
                  {renderField(activeFields.find(f=>f.key==="hasSparkCode")!)}
                  {renderField(activeFields.find(f=>f.key==="sparkExpiry")!)}
                  {row && <div className="inline-readonly"><strong>{label("过期状态", "Expired status", language)}</strong><span>Normal</span></div>}
                </div>
                <div className="rg one">{renderField(activeFields.find(f=>f.key==="sparkCode")!)}</div>
                <div className="rg one notes-row">{renderField(activeFields.find(f=>f.key==="notes")!)}</div>
                {row && <div className="rg three">{["sparkAdsStatus","adDate","adsOwner"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>}
                {row && <section className="review-edit-section">
                  <div className="extra-title"><strong><i />*{label("支付记录", "Payments", language)}</strong><button type="button" className="button small"><Plus size={13}/>{label("新增", "Add", language)}</button></div>
                  <div className="linked-payment-table">
                    <table><thead><tr><th>Payment ID</th><th>{label("达人", "Creator", language)}</th><th>{label("品牌", "Brand", language)}</th><th>{label("平台", "Platform", language)}</th><th>{label("内容类型", "Content Type", language)}</th><th>{label("费率", "Rate", language)}</th><th>{label("单价", "Each Price", language)}</th><th>{label("总价", "Total Price", language)}</th><th>{label("操作", "Action", language)}</th></tr></thead>
                    <tbody><tr><td><select aria-label="Payment ID" defaultValue={String(row.paymentNo || "")}><option>{String(row.paymentNo || "PID2026082100...")}</option></select></td><td>{String(row.creatorName || "-")}</td><td>{String(row.brand || "-")}</td><td><span className="mini-tag">TikTok</span></td><td><span className="mini-tag">TTS</span></td><td><span className="mini-tag">C</span></td><td>IDR {new Intl.NumberFormat("en-US").format(numeric(row.unitPrice))}</td><td>IDR {new Intl.NumberFormat("en-US").format(numeric(row.unitPrice) * 2)}</td><td><button type="button" className="icon-danger" aria-label="Delete payment">×</button></td></tr></tbody></table>
                  </div>
                </section>}
                {row && <section className="review-edit-section creator-library">
                  <div className="extra-title"><strong><i />{label("达人库", "Creator Library", language)}</strong></div>
                  <p>{label("价格预警", "Price warning", language)}</p><span>-</span>
                </section>}
              </div>
            </div>
          ) : config.key === "payment" ? (
            <div className="payment-exact-body">
              <div className="rg three">{["creatorName","brand","platform"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
              <div className="rg three">{["contentType","ownContent","rateTier"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
              <div className="rg three">{["unitPrice","qty","totalPrice"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
              <div className="rg three">{["followersK","owner","supervisor"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
              <div className="rg two">{["expectedPostDate","actualPostDate"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
              <div className="rg one notes-row">{renderField(activeFields.find(f=>f.key==="notes")!)}</div>
              {row && <div className="quantity-check"><strong>{label("数量是否一致", "Quantity Consistency", language)}</strong><span className={row.qtyConsistent === "Yes" ? "ok" : "bad"}>{row.qtyConsistent === "Yes" ? label("一致", "Consistent", language) : label("不一致", "Inconsistent", language)}</span></div>}
              <div className="form-section-title"><i />{label("财务信息", "Financial Information", language)}</div>
              <div className="rg three">{["paymentBank","bankName","accountName"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
              <div className="rg three">{["bankAccount","idNumber","idName"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
              <div className="rg three">{["paid", ...(row ? ["paymentDate","invoiceVerified"] : [])].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
              <div className="rg two file-row">{["invoiceFiles", ...(row ? ["paymentProof"] : [])].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
              {row && <div className="rg one notes-row">{renderField(activeFields.find(f=>f.key==="financeNotes")!)}</div>}
              {row && <><div className="form-section-title"><i />{label("审批", "Approval", language)}</div><div className="rg two approval-row">{["supervisorApproval","ceoApproval"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div></>}
            </div>
          ) : <div className="form-grid">{activeFields.slice(0, sectionBreak).map(renderField)}</div>}
          {config.key === "reviews" && false && (
            <div className="review-modal-extras">
              <section><div className="extra-title"><strong>*{label("支付单列表", "Payment Records", language)}</strong><button type="button" className="button primary small"><Plus size={13}/>{label("新增", "Add", language)}</button></div><div className="empty-mini-table">{label("暂无关联支付单", "No linked payment records", language)}</div></section>
              <section><strong>{label("达人库", "Creator Library", language)}</strong><p>{label("请先选择 KOL，以展示达人库数据。", "Select a KOL to display creator-library data.", language)}</p></section>
              <section className="summary-panels"><div><strong>GMV</strong><span>GMV (Rp)<b>-</b></span><span>GMV ($)<b>-</b></span></div><div><strong>{label("浏览摘要（系统填写）", "Post Summary (system)", language)}</strong><span>Post ID<b>-</b></span><span>{label("播放量（最新合计）", "Latest Views", language)}<b>-</b></span></div><div><strong>{label("目标", "Target", language)}</strong><p>{label("请先填写国家、品牌、产品和发帖日期。", "Complete country, brand, product and post date first.", language)}</p></div></section>
            </div>
          )}
        </div>
        <footer className="modal-footer">
          {config.key === "payment" && row && <button type="button" className="button price-change">{label("改价", "Change Price", language)}</button>}
          <button type="submit" className="button primary">
            <Check size={14} />
            {isRealSystemModal ? label("确定", "Confirm", language) : label("保存", "Save", language)}
          </button>
          <button type="button" className="button ghost" onClick={onClose}>{label("取消", "Cancel", language)}</button>
        </footer>
      </form>
    </Modal>
  );
}

function EmptyState({ language }: { language: Language }) {
  return (
    <div className="empty-state">
      <Database size={30} strokeWidth={1.4} />
      <strong>{label("暂无数据", "No data", language)}</strong>
      <span>{label("调整筛选条件，或新增一条记录。", "Adjust filters or add a record.", language)}</span>
    </div>
  );
}

function TablePage({
  config,
  rows,
  setRows,
  language,
  canEdit,
  canApprove,
  approvalPermissions = { supervisor: true, ceo: true },
  relatedRows = [],
  relatedReviewRows = [],
  notify,
}: {
  config: PageConfig;
  rows: Row[];
  setRows: (next: Row[]) => void;
  language: Language;
  canEdit: boolean;
  canApprove: boolean;
  approvalPermissions?: { supervisor: boolean; ceo: boolean };
  relatedRows?: Row[];
  relatedReviewRows?: Row[];
  notify: (message: string) => void;
}) {
  const isPayment31 = config.key === "payment31";
  const isReview31 = ["review31a", "review31b", "review31c"].includes(config.key);
  const isOwnMediaReview = config.key === "ownMediaReview";
  const showViewAction = config.key === "payment31" || config.key === "review31b";
  const initialFilterState = isPayment31 || isOwnMediaReview ? { country: "ID" } : {};
  const [draftFilters, setDraftFilters] = useState<Record<string, unknown>>(initialFilterState);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, unknown>>(initialFilterState);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<Row | null | undefined>(undefined);
  const [viewing, setViewing] = useState<Row | null>(null);
  const [activeView, setActiveView] = useState(config.views?.[0]?.key || "");
  const [page, setPage] = useState(1);
  const [columnMenuOpen, setColumnMenuOpen] = useState(false);
  const [batchApprovalOpen, setBatchApprovalOpen] = useState(false);
  const [batchApprovalMode, setBatchApprovalMode] = useState<"both" | "supervisor" | "ceo">("both");
  const [batchBankOpen, setBatchBankOpen] = useState(false);
  const [batchBank, setBatchBank] = useState("GST");
  const [paymentQuickFilter, setPaymentQuickFilter] = useState("all");
  const [reviewQuickFilter, setReviewQuickFilter] = useState("all");
  const [batchSupervisorStatus, setBatchSupervisorStatus] = useState("Approved");
  const [batchCeoStatus, setBatchCeoStatus] = useState("Pending");
  const [batchStatusOpen, setBatchStatusOpen] = useState(false);
  const [batchStatusMode, setBatchStatusMode] = useState<"ads" | "review">("ads");
  const [batchAdsStatus, setBatchAdsStatus] = useState("Done");
  const [batchReviewStatus, setBatchReviewStatus] = useState("Normal");
  const [hiddenColumns, setHiddenColumns] = useStored<string[]>(`marketing-columns-${config.key}`, []);
  const importRef = useRef<HTMLInputElement>(null);

  const baseColumns = config.views?.find((view) => view.key === activeView)?.columns || config.columns;
  const allColumns = ["reviews", "lsaReviews", "lsaKocReviews"].includes(config.key)
    ? [...baseColumns, { key: "productCostSplit", zh: "产品成本拆分", en: "Product Cost Split" }]
    : baseColumns;
  const columns = allColumns.filter((column) => !hiddenColumns.includes(column.key));
  const reviewAnchorDate = rows.reduce((latest, row) => {
    const date = String(row.actualPostDate || "");
    return date > latest ? date : latest;
  }, "");
  const filteredRows = useMemo(
    () => rows.filter((row) => {
      const matchesFilters = Object.entries(appliedFilters).every(([key, expected]) => {
        if (key.endsWith("From")) {
          const sourceKey = key.slice(0, -4);
          const actual = String(row[sourceKey] || "");
          return !expected || (Boolean(actual) && actual >= String(expected));
        }
        if (key.endsWith("To")) {
          const sourceKey = key.slice(0, -2);
          const actual = String(row[sourceKey] || "");
          return !expected || (Boolean(actual) && actual <= String(expected));
        }
        if (expected === "" || expected === undefined || expected === false) return true;
        return String(row[key] ?? "")
          .toLowerCase()
          .includes(String(expected).toLowerCase());
      });
      if (!matchesFilters || (!isPayment31 && !isReview31)) return matchesFilters;
      if (isPayment31) {
        if (paymentQuickFilter === "payment-empty") return !String(row.paymentDate || "");
        if (paymentQuickFilter === "ceo-approval") return String(row.ceoApproval || "Pending") === "Pending";
        if (paymentQuickFilter === "pic-me") return row.picIsMe === true || String(row.owner || "") === "Ajeng Salma Nadhifa Fitriani";
        if (paymentQuickFilter === "supervisor-me") return row.supervisorIsMe === true || String(row.supervisor || "") === "Desy Chintya";
        return true;
      }
      if (reviewQuickFilter === "ready-for-ads") return Boolean(row.postId) && ["Done", "Ready", "Active"].includes(String(row.sparkAdsStatus || ""));
      if (reviewQuickFilter === "top-rank") return String(row.ranking || "") === "Top";
      if (reviewQuickFilter === "not-traffic") return String(row.targetTraffic || "") === "No";
      if (reviewQuickFilter === "should-cpm") return String(row.shouldCpm || "") === "Yes";
      if (reviewQuickFilter === "pic-me") return row.picIsMe === true || String(row.owner || "") === "Ajeng Salma Nadhifa Fitriani";
      if (reviewQuickFilter === "spark-notice") return String(row.sparkCodeNotice || "") === "Yes" || ["Code Incorrect", "Notice"].includes(String(row.sparkAdsStatus || ""));
      if (reviewQuickFilter === "last-30-days") {
        if (!String(row.actualPostDate || "") || !reviewAnchorDate) return false;
        const cutoff = new Date(`${reviewAnchorDate}T00:00:00`);
        cutoff.setDate(cutoff.getDate() - 30);
        return String(row.actualPostDate) >= cutoff.toISOString().slice(0, 10);
      }
      return true;
    }),
    [rows, appliedFilters, isPayment31, isReview31, paymentQuickFilter, reviewQuickFilter, reviewAnchorDate],
  );
  const pageSize = isOwnMediaReview ? 50 : 10;
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleRows = filteredRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const selectedRows = rows.filter((row) => selected.has(String(row.id)));

  function toggleRow(id: Row["id"]) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(String(id))) next.delete(String(id));
      else next.add(String(id));
      return next;
    });
  }

  function selectPage(checked: boolean) {
    setSelected((current) => {
      const next = new Set(current);
      visibleRows.forEach((row) => (checked ? next.add(String(row.id)) : next.delete(String(row.id))));
      return next;
    });
  }

  function saveRow(nextRow: Row) {
    const exists = rows.some((row) => String(row.id) === String(nextRow.id));
    setRows(exists ? rows.map((row) => (String(row.id) === String(nextRow.id) ? nextRow : row)) : [nextRow, ...rows]);
    setEditing(undefined);
    notify(exists ? label("记录已更新", "Record updated", language) : label("记录已创建", "Record created", language));
  }

  function requireSelection(single = false) {
    if (!selectedRows.length) {
      notify(label("请先选择记录", "Select a record first", language));
      return false;
    }
    if (single && selectedRows.length !== 1) {
      notify(label("请选择一条记录", "Select exactly one record", language));
      return false;
    }
    return true;
  }

  function approveRows(kind: "standard" | "supervisor" | "ceo" = "standard") {
    if (!requireSelection()) return;
    setRows(
      rows.map((row) => {
        if (!selected.has(String(row.id))) return row;
        if (config.key === "productTarget") return { ...row, status: "Published" };
        if (kind === "supervisor") return { ...row, supervisorApproval: "Approved" };
        if (kind === "ceo") return { ...row, ceoApproval: "Approved" };
        if ("approvalStatus" in row) return { ...row, approvalStatus: "Approved", approvedAt: new Date().toISOString().slice(0, 10) };
        if ("postStatus" in row) return { ...row, postStatus: "Approved" };
        return { ...row, status: "Approved" };
      }),
    );
    notify(label("审批状态已更新", "Approval status updated", language));
  }

  function openBatchApproval(mode: "supervisor" | "ceo") {
    if (!requireSelection()) return;
    setBatchApprovalMode(mode);
    setBatchApprovalOpen(true);
  }

  function applyBatchBank() {
    if (!requireSelection()) return;
    setRows(rows.map((row) => selected.has(String(row.id)) ? { ...row, paymentBank: batchBank, updatedAt: new Date().toISOString().slice(0, 16).replace("T", " ") } : row));
    setBatchBankOpen(false);
    setSelected(new Set());
    notify(label("付款银行已批量更新", "Payment banks updated", language));
  }

  function openBatchStatus(mode: "ads" | "review") {
    if (!requireSelection()) return;
    setBatchStatusMode(mode);
    setBatchStatusOpen(true);
  }

  function applyBatchStatus() {
    if (!requireSelection()) return;
    const field = batchStatusMode === "ads" ? "sparkAdsStatus" : "postStatus";
    const value = batchStatusMode === "ads" ? batchAdsStatus : batchReviewStatus;
    setRows(rows.map((row) => selected.has(String(row.id)) ? { ...row, [field]: value, updatedAt: new Date().toISOString().slice(0, 16).replace("T", " ") } : row));
    setBatchStatusOpen(false);
    setSelected(new Set());
    notify(label(batchStatusMode === "ads" ? "广告状态已批量更新" : "审核状态已批量更新", batchStatusMode === "ads" ? "Ads statuses updated" : "Review statuses updated", language));
  }

  function runAction(action: ActionKey) {
    if (action === "export") {
      downloadCsv(label(config.titleZh, config.titleEn, language), columns, filteredRows, language);
      notify(label("已导出 CSV", "CSV exported", language));
      return;
    }
    if (action === "import") {
      importRef.current?.click();
      return;
    }
    if (action === "add") {
      setEditing(null);
      return;
    }
    if (action === "edit") {
      if (requireSelection(true)) setEditing(selectedRows[0]);
      return;
    }
    if (action === "updateAdsStatus") {
      openBatchStatus("ads");
      return;
    }
    if (action === "updateReviewStatus") {
      openBatchStatus("review");
      return;
    }
    if (action === "approve") {
      approveRows();
      return;
    }
    if (action === "unlock") {
      if (!requireSelection()) return;
      setRows(rows.map((row) => (selected.has(String(row.id)) ? { ...row, status: "Approved", description: "Account unlocked" } : row)));
      notify(label("账号已解锁", "Account unlocked", language));
      return;
    }
    if (action === "delete") {
      if (!requireSelection()) return;
      if (!window.confirm(label(`确认删除已选的 ${selectedRows.length} 条记录？`, `Delete ${selectedRows.length} selected record(s)?`, language))) return;
      setRows(rows.filter((row) => !selected.has(String(row.id))));
      setSelected(new Set());
      notify(label("记录已删除", "Records deleted", language));
      return;
    }
    if (action === "clear") {
      if (!window.confirm(label("确认清空当前列表？", "Clear the current list?", language))) return;
      setRows([]);
      setSelected(new Set());
      notify(label("列表已清空", "List cleared", language));
    }
  }

  async function importCsv(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const source = await file.text();
    const lines = source.replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) {
      notify(label("CSV 中没有可导入的数据", "No importable data in CSV", language));
      return;
    }
    const headers = parseCsvLine(lines[0]);
    const availableFields = [...config.fields, ...config.columns.map((column) => ({ ...column, kind: "text" as const }))];
    const keys = headers.map((header) => {
      const match = availableFields.find(
        (field) => field.key.toLowerCase() === header.toLowerCase() || field.zh === header || field.en === header,
      );
      return match?.key || header;
    });
    const imported = lines.slice(1).map((line, index) => {
      const cells = parseCsvLine(line);
      return Object.fromEntries([["id", Date.now() + index], ...keys.map((key, cellIndex) => [key, cells[cellIndex] ?? ""])]) as Row;
    });
    setRows([...imported, ...rows]);
    event.target.value = "";
    notify(label(`已导入 ${imported.length} 条记录`, `Imported ${imported.length} records`, language));
  }

  const actionAllowed = (action: ActionKey) => {
    if (action === "export") return true;
    if (action === "approve" && config.key === "payment31") return (canEdit || canApprove) && (approvalPermissions.supervisor || approvalPermissions.ceo);
    if (action === "approve") return canApprove;
    return canEdit;
  };

  const actionText = (action: ActionKey) => {
    if (action === "approve" && config.key === "productTarget") return label("批量发布", "Batch Publish", language);
    const names: Record<ActionKey, [string, string]> = {
      add: ["新增", "Add"],
      edit: ["修改", "Edit"],
      delete: ["删除", "Delete"],
      import: ["导入", "Import"],
      export: ["导出", "Export"],
      approve: ["审批", "Approve"],
      clear: ["清空", "Clear"],
      unlock: ["解锁", "Unlock"],
      updateAdsStatus: ["更新广告状态", "Update Ads Status"],
      updateReviewStatus: ["更新审核状态", "Update Review Status"],
    };
    return label(names[action][0], names[action][1], language);
  };
  const filterRangeBase = (field: FieldDef) => field.key === "paymentDateRange" ? "paymentDate" : field.key.replace(/Range$/, "");

  return (
    <div className="page-stack">
      {config.filters.length > 0 && (
        <section className={`filter-card ${isPayment31 ? "payment31-filter-card" : ""} ${isOwnMediaReview ? "own-media-filter-card" : ""}`}>
          <div className="filter-grid">
            {config.filters.map((field) => field.kind === "dateRange" || field.key === "paymentDateRange" ? (
              <label className="filter-field payment-date-range-field" key={field.key}>
                <span>{label(field.zh, field.en, language)}</span>
                <div className="payment-date-range">
                  <input type="date" aria-label={label(`${field.zh}开始`, `${field.en} from`, language)} value={String(draftFilters[`${filterRangeBase(field)}From`] || "")} onChange={(event) => setDraftFilters((current) => ({ ...current, [`${filterRangeBase(field)}From`]: event.target.value }))} />
                  <b>–</b>
                  <input type="date" aria-label={label(`${field.zh}结束`, `${field.en} to`, language)} value={String(draftFilters[`${filterRangeBase(field)}To`] || "")} onChange={(event) => setDraftFilters((current) => ({ ...current, [`${filterRangeBase(field)}To`]: event.target.value }))} />
                </div>
              </label>
            ) : (
              <label className="filter-field" key={field.key}>
                <span>{label(field.zh, field.en, language)}</span>
                <FieldControl
                  field={field}
                  value={draftFilters[field.key]}
                  language={language}
                  filter
                  disabled={isOwnMediaReview && field.key === "product" && !draftFilters.brand}
                  onChange={(value) => setDraftFilters((current) => ({ ...current, [field.key]: value }))}
                />
              </label>
            ))}
            <div className="filter-actions">
              <button
                className="button primary"
                onClick={() => {
                  setAppliedFilters(draftFilters);
                  setPage(1);
                }}
              >
                <Search size={14} />
                {label("搜索", "Search", language)}
              </button>
              <button
                className="button ghost"
                onClick={() => {
                  setDraftFilters(initialFilterState);
                  setAppliedFilters(initialFilterState);
                  setPaymentQuickFilter("all");
                  setReviewQuickFilter("all");
                  setPage(1);
                }}
              >
                <RefreshCcw size={14} />
                {label("重置", "Reset", language)}
              </button>
            </div>
          </div>
        </section>
      )}

      {isPayment31 && (
        <div className="payment-quick-filters" role="tablist" aria-label={label("Payment 快速筛选", "Payment quick filters", language)}>
          {[
            ["all", "全部", "All"],
            ["payment-empty", "Date of Payment 为空", "Date of Payment is Empty"],
            ["ceo-approval", "CEO Approval", "CEO Approval"],
            ["pic-me", "PIC 是我", "PIC is Me"],
            ["supervisor-me", "Supervisor 是我", "Supervisor is Me"],
          ].map(([key, zh, en]) => (
            <button type="button" role="tab" aria-selected={paymentQuickFilter === key} key={key} className={paymentQuickFilter === key ? "active" : ""} onClick={() => { setPaymentQuickFilter(key); setPage(1); }}>
              {label(zh, en, language)}
            </button>
          ))}
        </div>
      )}

      {isReview31 && (
        <div className="review-quick-filters" role="tablist" aria-label={label("Review 快速筛选", "Review quick filters", language)}>
          {[
            ["all", "全部", "All"],
            ["ready-for-ads", "Ready for Ads", "Ready for Ads"],
            ["top-rank", "Top Rank Videos", "Top Rank Videos"],
            ["not-traffic", "Target is not Traffic", "Target is not Traffic"],
            ["should-cpm", "Should CPM", "Should CPM"],
            ["pic-me", "PIC 是我", "PIC is Me"],
            ["spark-notice", "Spark Code Notice", "Spark Code Notice"],
            ["last-30-days", "近 30 天", "Last 30 Days"],
          ].map(([key, zh, en]) => (
            <button type="button" role="tab" aria-selected={reviewQuickFilter === key} key={key} className={reviewQuickFilter === key ? "active" : ""} onClick={() => { setReviewQuickFilter(key); setPage(1); }}>
              {label(zh, en, language)}
            </button>
          ))}
        </div>
      )}

      <section className="table-card">
        <div className="table-toolbar">
          <div className="toolbar-actions">
            {config.actions.map((action) => {
              if (!actionAllowed(action)) return null;
              const Icon = actionIcons[action];
              if (action === "approve" && config.key === "payment") {
                return (
                  <span className="split-actions" key={action}>
                    <button className="button approve" onClick={() => approveRows("supervisor")}>
                      <CheckCircle2 size={14} />
                      {label("主管审批", "Supervisor Approve", language)}
                    </button>
                    <button className="button approve" onClick={() => approveRows("ceo")}>
                      <ShieldCheck size={14} />
                      {label("CEO 审批", "CEO Approve", language)}
                    </button>
                  </span>
                );
              }
              if (action === "approve" && config.key === "payment31") {
                return (
                  <button key={action} className="button approve" onClick={() => requireSelection() && setBatchApprovalOpen(true)}>
                    <ShieldCheck size={14} />
                    {label("批量审批", "Batch Approval", language)}
                  </button>
                );
              }
              return (
                <button
                  key={action}
                  className={`button ${action === "add" ? "primary" : action === "delete" || action === "clear" ? "danger-outline" : action === "approve" ? "approve" : "ghost"}`}
                  disabled={(["delete", "updateAdsStatus", "updateReviewStatus"].includes(action) || (isOwnMediaReview && action === "edit")) && selectedRows.length === 0}
                  onClick={() => runAction(action)}
                >
                  <Icon size={14} />
                  {actionText(action)}
                </button>
              );
            })}
            {isPayment31 && canEdit && (
              <button className="button soft" disabled={!selectedRows.length} onClick={() => { if (!requireSelection()) return; setBatchBankOpen(true); }}>
                <WalletCards size={14} />
                {label("批量更新付款银行", "Batch Update Payment Bank", language)}
              </button>
            )}
            {isPayment31 && actionAllowed("approve") && approvalPermissions.supervisor && (
              <button className="button approve" disabled={!selectedRows.length} onClick={() => openBatchApproval("supervisor")}>
                <CheckCircle2 size={14} />
                {label("主管审批", "Supervisor Approval", language)}
              </button>
            )}
            {isPayment31 && actionAllowed("approve") && approvalPermissions.ceo && (
              <button className="button approve" disabled={!selectedRows.length} onClick={() => openBatchApproval("ceo")}>
                <ShieldCheck size={14} />
                {label("CEO 审批", "CEO Approval", language)}
              </button>
            )}
            <input ref={importRef} className="hidden-input" type="file" accept=".csv,text/csv" onChange={importCsv} />
          </div>
          <span className="selection-copy">
            {selected.size
              ? label(`已选 ${selected.size} 条`, `${selected.size} selected`, language)
              : label("请选择要操作的记录", "Select records to take action", language)}
          </span>
          {isOwnMediaReview && <div className="own-media-header-tools"><button className="icon-button" aria-label="Search" title={label("搜索", "Search", language)} onClick={() => { setAppliedFilters(draftFilters); setPage(1); }}><Search size={15} /></button><button className="icon-button" aria-label="Refresh" title={label("刷新", "Refresh", language)} onClick={() => { setDraftFilters(initialFilterState); setAppliedFilters(initialFilterState); setPage(1); }}><RefreshCcw size={15} /></button></div>}
          <div className="column-manager">
            <button className="icon-button" aria-label="Manage columns" title={label("管理表头", "Manage columns", language)} onClick={() => setColumnMenuOpen((open) => !open)}>
              <Settings size={15} />
            </button>
            {columnMenuOpen && (
              <div className="column-menu">
                <strong>{label("显示字段", "Visible columns", language)}</strong>
                {allColumns.map((column) => (
                  <label key={column.key}>
                    <input type="checkbox" checked={!hiddenColumns.includes(column.key)} onChange={(event) => setHiddenColumns((current) => event.target.checked ? current.filter((key) => key !== column.key) : [...current, column.key])} />
                    <span>{label(column.zh, column.en, language)}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {config.views && config.views.length > 0 && (
          <div className="view-tabs">
            {config.views.map((view) => (
              <button key={view.key} className={activeView === view.key ? "active" : ""} onClick={() => setActiveView(view.key)}>
                {label(view.zh, view.en, language)}
              </button>
            ))}
          </div>
        )}

        <div className="data-table-wrap">
          <table className={`data-table ${["target1", "productTarget", "ownTarget"].includes(config.key) ? "target-table" : ""} ${config.key === "payment31" ? "payment-list-table" : ""} ${isOwnMediaReview ? "own-media-table" : ""}`}>
            <thead>
              <tr>
                <th className="select-column">
                  <input
                    type="checkbox"
                    aria-label="Select current page"
                    checked={visibleRows.length > 0 && visibleRows.every((row) => selected.has(String(row.id)))}
                    onChange={(event) => selectPage(event.target.checked)}
                  />
                </th>
                {!isOwnMediaReview && <th className="index-column">#</th>}
                {columns.map((column) => (
                  <th key={column.key}>{label(column.zh, column.en, language)}</th>
                ))}
                {(showViewAction || canEdit && config.fields.length > 0) && <th className="operation-column">{isOwnMediaReview ? "Action" : label("操作", "Actions", language)}</th>}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, rowIndex) => (
                <tr key={String(row.id)} className={selected.has(String(row.id)) ? "selected" : ""}>
                  <td className="select-column">
                    <input
                      type="checkbox"
                      checked={selected.has(String(row.id))}
                      onChange={() => toggleRow(row.id)}
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  </td>
                  {!isOwnMediaReview && <td className="index-column">{(currentPage - 1) * pageSize + rowIndex + 1}</td>}
                  {columns.map((column) => (
                    <td key={column.key} title={String(row[column.key] ?? "")}>
                      {isOwnMediaReview && column.key === "reviewNo" ? <div className="own-media-id-cell"><button type="button" className="table-link own-media-id-button" onClick={() => canEdit ? setEditing(row) : setViewing(row)}>{String(row.reviewNo || "—")}</button><button type="button" className="own-media-copy-button" aria-label="Copy Review ID" title="Copy" onClick={() => { void navigator.clipboard?.writeText(String(row.reviewNo || "")); notify(label("已复制 Review ID", "Review ID copied", language)); }}><ClipboardList size={14} /></button></div> : isOwnMediaReview && column.key === "pic" ? <span className="own-media-pic-cell"><span className="own-media-avatar">{String(row.pic || "NA").slice(0, 2).toUpperCase()}</span>{String(row.pic || "—")}</span> : formatCell(column.key, row[column.key])}
                    </td>
                  ))}
                  {(showViewAction || canEdit && config.fields.length > 0) && (
                    <td className="operation-column">
                      {showViewAction && <button className="row-action view" onClick={() => setViewing(row)} aria-label={label("查看", "View", language)} title={label("查看", "View", language)}><Eye size={14} /></button>}
                      {canEdit && config.fields.length > 0 && <button className="row-action" onClick={() => setEditing(row)} aria-label={label("编辑", "Edit", language)} title={label("编辑", "Edit", language)}><Edit3 size={14} /></button>}
                      {config.actions.includes("delete") && (
                        <button
                          className="row-action danger"
                          onClick={() => {
                            if (!window.confirm(label("确认删除这条记录？", "Delete this record?", language))) return;
                            setRows(rows.filter((item) => String(item.id) !== String(row.id)));
                            notify(label("记录已删除", "Record deleted", language));
                          }}
                          aria-label="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {visibleRows.length === 0 && <EmptyState language={language} />}
        </div>

        <footer className="table-footer">
          <span>
            {label(
              `显示 ${filteredRows.length ? (currentPage - 1) * pageSize + 1 : 0}–${Math.min(currentPage * pageSize, filteredRows.length)}，共 ${filteredRows.length} 条`,
              `Showing ${filteredRows.length ? (currentPage - 1) * pageSize + 1 : 0}–${Math.min(currentPage * pageSize, filteredRows.length)} of ${filteredRows.length}`,
              language,
            )}
          </span>
          <div className="pagination">
            <button disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>
              <ChevronLeft size={14} />
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button disabled={currentPage === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>
              <ChevronRight size={14} />
            </button>
          </div>
        </footer>
      </section>

      {editing !== undefined && (
        <RecordModal config={config} row={editing} language={language} relatedRows={relatedRows} reviewRows={relatedReviewRows} onSave={saveRow} onClose={() => setEditing(undefined)} />
      )}
      {viewing && (
        <RecordModal config={config} row={viewing} language={language} relatedRows={relatedRows} reviewRows={relatedReviewRows} readOnly onSave={saveRow} onClose={() => setViewing(null)} />
      )}
      {batchApprovalOpen && (
        <Modal title={label(batchApprovalMode === "supervisor" ? "主管审批" : batchApprovalMode === "ceo" ? "CEO 审批" : "批量审批", batchApprovalMode === "supervisor" ? "Supervisor Approval" : batchApprovalMode === "ceo" ? "CEO Approval" : "Batch Approval", language)} onClose={() => setBatchApprovalOpen(false)}>
          <form onSubmit={(event) => { event.preventDefault(); const approvalUpdates: Partial<Row> = {}; if (batchApprovalMode !== "ceo" && approvalPermissions.supervisor) approvalUpdates.supervisorApproval = batchSupervisorStatus; if (batchApprovalMode !== "supervisor" && approvalPermissions.ceo) approvalUpdates.ceoApproval = batchCeoStatus; setRows(rows.map((row) => selected.has(String(row.id)) ? { ...row, ...approvalUpdates, updatedAt: new Date().toISOString().slice(0, 16).replace("T", " ") } : row)); setBatchApprovalOpen(false); setSelected(new Set()); notify(label("已批量更新审批状态", "Approval statuses updated", language)); }}>
            <div className="form-grid batch-approval-grid">
              <div className="batch-selection-note"><CheckCircle2 size={16}/><span>{label(`将更新已选择的 ${selectedRows.length} 条 Payment 记录`, `Updating ${selectedRows.length} selected Payment record(s)`, language)}</span></div>
              {batchApprovalMode !== "ceo" && approvalPermissions.supervisor && <label className="form-field"><span>{label("主管审批状态", "Supervisor Approval", language)}</span><select value={batchSupervisorStatus} onChange={(event) => setBatchSupervisorStatus(event.target.value)}><option>Pending</option><option>Approved</option><option>Rejected</option></select></label>}
              {batchApprovalMode !== "supervisor" && approvalPermissions.ceo && <label className="form-field"><span>{label("CEO 审批状态", "CEO Approval", language)}</span><select value={batchCeoStatus} onChange={(event) => setBatchCeoStatus(event.target.value)}><option>Pending</option><option>Approved</option><option>Rejected</option></select></label>}
            </div>
            <footer className="modal-footer"><button type="button" className="button ghost" onClick={() => setBatchApprovalOpen(false)}>{label("取消", "Cancel", language)}</button><button type="submit" className="button primary"><Check size={14}/>{label("确认修改", "Apply", language)}</button></footer>
          </form>
        </Modal>
      )}
      {batchBankOpen && (
        <Modal title={label("批量更新付款银行", "Batch Update Payment Bank", language)} onClose={() => setBatchBankOpen(false)}>
          <form onSubmit={(event) => { event.preventDefault(); applyBatchBank(); }}>
            <div className="form-grid">
              <div className="batch-selection-note"><CheckCircle2 size={16}/><span>{label(`将更新已选择的 ${selectedRows.length} 条 Payment 记录`, `Updating ${selectedRows.length} selected Payment record(s)`, language)}</span></div>
              <label className="form-field"><span>{label("Payment Bank", "Payment Bank", language)}</span><select value={batchBank} onChange={(event) => setBatchBank(event.target.value)}><option>GST</option><option>GIA</option><option>Private</option></select></label>
            </div>
            <footer className="modal-footer"><button type="button" className="button ghost" onClick={() => setBatchBankOpen(false)}>{label("取消", "Cancel", language)}</button><button type="submit" className="button primary"><Check size={14}/>{label("确认修改", "Apply", language)}</button></footer>
          </form>
        </Modal>
      )}
      {batchStatusOpen && (
        <Modal title={label(batchStatusMode === "ads" ? "批量更新广告状态" : "批量更新审核状态", batchStatusMode === "ads" ? "Update Ads Status" : "Update Review Status", language)} onClose={() => setBatchStatusOpen(false)}>
          <form onSubmit={(event) => { event.preventDefault(); applyBatchStatus(); }}>
            <div className="form-grid">
              <div className="batch-selection-note"><CheckCircle2 size={16}/><span>{label(`将更新已选择的 ${selectedRows.length} 条 Review 记录`, `Updating ${selectedRows.length} selected Review record(s)`, language)}</span></div>
              {batchStatusMode === "ads" ? (
                <label className="form-field"><span>{label("广告状态", "Ads Status", language)}</span><select value={batchAdsStatus} onChange={(event) => setBatchAdsStatus(event.target.value)}>{["None", "Done", "CodeDeleted", "Expired", "Code Incorrect"].map((status) => <option key={status}>{status}</option>)}</select></label>
              ) : (
                <label className="form-field"><span>{label("审核状态", "Review Status", language)}</span><select value={batchReviewStatus} onChange={(event) => setBatchReviewStatus(event.target.value)}>{["Normal", "Video Removed"].map((status) => <option key={status}>{status}</option>)}</select></label>
              )}
            </div>
            <footer className="modal-footer"><button type="button" className="button ghost" onClick={() => setBatchStatusOpen(false)}>{label("取消", "Cancel", language)}</button><button type="submit" className="button primary"><Check size={14}/>{label("确认修改", "Apply", language)}</button></footer>
          </form>
        </Modal>
      )}
    </div>
  );
}

function MetricCard({
  labelText,
  value,
  note,
  icon: Icon,
  tone = "blue",
}: {
  labelText: string;
  value: string;
  note: string;
  icon: LucideIcon;
  tone?: string;
}) {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${tone}`}><Icon size={17} /></div>
      <div>
        <span>{labelText}</span>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
    </article>
  );
}

function HomePage({
  language,
  onNavigate,
}: {
  language: Language;
  onNavigate: (page: PageKey) => void;
}) {
  const activities = [
    ["PID2026071785463", "Mami Si Kembar", "1,250,000 IDR", "Pending"],
    ["RID20260803108934", "parasceria", "Day Cream · TikTok", "Published"],
    ["TG-202608-001", "Nadia", "Tone Up Sunscreen", "Approved"],
  ];
  return (
    <div className="page-stack">
      <section className="page-heading home-heading">
        <div>
          <span className="eyebrow">MARKETING 3.0</span>
          <h1>{label("营销运营总览", "Marketing Operations Overview", language)}</h1>
          <p>{label("集中查看目标、达人、内容、付款与核心效果。", "Monitor targets, creators, content, payments and core performance.", language)}</p>
        </div>
        <button className="button primary" onClick={() => onNavigate("productTarget")}>
          <Plus size={14} />
          {label("创建目标", "Create Target", language)}
        </button>
      </section>
      <div className="metrics-grid">
        <MetricCard labelText={label("本月目标预算", "Monthly Target Budget", language)} value="IDR 72.0M" note={label("已使用 36%", "36% used", language)} icon={WalletCards} />
        <MetricCard labelText={label("发布数量", "Published Videos", language)} value="45 / 84" note={label("月度达成 54%", "54% monthly progress", language)} icon={Send} tone="green" />
        <MetricCard labelText={label("合作达人", "Active Creators", language)} value="128" note={label("本月新增 16", "16 added this month", language)} icon={Users} tone="purple" />
        <MetricCard labelText={label("待审批付款", "Pending Payments", language)} value="12" note="IDR 18.4M" icon={CircleDollarSign} tone="amber" />
      </div>
      <div className="home-grid">
        <section className="panel">
          <div className="panel-title">
            <div><h2>{label("目标执行进度", "Target Execution", language)}</h2><p>{label("按产品查看本月发布与预算节奏", "Monthly publishing and budget pace by product", language)}</p></div>
            <button className="text-button" onClick={() => onNavigate("targetDashboard")}>{label("查看 Dashboard", "Open Dashboard", language)} <ChevronRight size={13} /></button>
          </div>
          {[
            ["Tone Up Sunscreen", 73, 41],
            ["Day Cream", 22, 29],
            ["Body Scrub", 58, 46],
            ["Juicy Tinted Lip Balm", 64, 52],
          ].map(([name, post, budget]) => (
            <div className="home-progress-row" key={String(name)}>
              <strong>{name}</strong>
              <div><span>Post</span><div className="micro-progress"><i style={{ width: `${post}%` }} /></div><b>{post}%</b></div>
              <div><span>Budget</span><div className="micro-progress amber"><i style={{ width: `${budget}%` }} /></div><b>{budget}%</b></div>
            </div>
          ))}
        </section>
        <section className="panel">
          <div className="panel-title"><div><h2>{label("快捷入口", "Quick Access", language)}</h2><p>{label("常用操作", "Common actions", language)}</p></div></div>
          <div className="quick-grid">
            {[
              ["creator", Users, "达人档案", "Creators"],
              ["reviews", FileText, "内容审核", "Reviews"],
              ["payment", WalletCards, "付款审批", "Payments"],
              ["kolTargetReport", FileBarChart, "目标分析", "Analytics"],
            ].map(([page, Icon, zh, en]) => {
              const QuickIcon = Icon as LucideIcon;
              return <button key={String(page)} onClick={() => onNavigate(page as PageKey)}><QuickIcon size={18} /><span>{label(String(zh), String(en), language)}</span><ChevronRight size={13} /></button>;
            })}
          </div>
        </section>
      </div>
      <section className="panel">
        <div className="panel-title"><div><h2>{label("最新业务动态", "Recent Activity", language)}</h2><p>{label("来自付款、审核与目标模块", "From payment, review and target modules", language)}</p></div></div>
        <div className="activity-list">
          {activities.map((item) => (
            <div key={item[0]}><span className="activity-dot" /><strong>{item[0]}</strong><span>{item[1]}</span><span>{item[2]}</span><span className={`status-pill ${statusTone(item[3])}`}>{item[3]}</span></div>
          ))}
        </div>
      </section>
    </div>
  );
}

type DashboardBreakdown = {
  name: string;
  sub: string;
  postMtd: number;
  postTarget: number;
  budgetMtd: number;
  budgetTarget: number;
  planMtd?: number;
  planAmountMtd?: number;
  postAmountMtd?: number;
};

type DashboardDimension = "product" | "tier" | "strategist" | "specialist" | "submitter" | "brand";

function LinkedSelectionCheckbox({
  checked,
  indeterminate = false,
  ariaLabel,
  onChange,
}: {
  checked: boolean;
  indeterminate?: boolean;
  ariaLabel: string;
  onChange: (checked: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return <input ref={inputRef} type="checkbox" aria-label={ariaLabel} checked={checked} onChange={(event) => onChange(event.target.checked)} />;
}

function scaleBreakdown(row: DashboardBreakdown, name: string, sub: string, share: number): DashboardBreakdown {
  return {
    name,
    sub,
    postMtd: Math.max(0, Math.round(row.postMtd * share)),
    postTarget: Math.max(1, Math.round(row.postTarget * share)),
    budgetMtd: Math.round(row.budgetMtd * share),
    budgetTarget: Math.round(row.budgetTarget * share),
    planMtd: Math.max(0, Math.round((row.planMtd || 0) * share)),
    planAmountMtd: Math.round((row.planAmountMtd || 0) * share),
    postAmountMtd: Math.round((row.postAmountMtd || 0) * share),
  };
}

function formatDashboardMetric(value: number, suffix = "") {
  return `${suffix}${compactNumber(Math.max(0, value))}`;
}

function formatPublishBudget(value: number) {
  return `${(Math.max(0, value) / 1_000_000).toFixed(1)}M`;
}

function dashboardRatioPercent(actual: number, base: number) {
  return base > 0 ? Math.round((actual / base) * 100) : 0;
}

function DualProgressMeter({
  post,
  plan,
  target,
  tone,
  compact = false,
  actualLabel = "Post",
  planLabel = "Plan",
  paceLabel = "Post Pace",
}: {
  post: number;
  plan: number;
  target: number;
  tone: "green" | "amber";
  compact?: boolean;
  actualLabel?: string;
  planLabel?: string;
  paceLabel?: string;
}) {
  const planTargetRate = dashboardRatioPercent(plan, target);
  const postTargetRate = dashboardRatioPercent(post, target);
  const paceRate = Math.max(0, 100 - postTargetRate);
  const postProgressColor = postTargetRate < 60 ? "var(--dashboard-danger)" : postTargetRate < 100 ? "var(--dashboard-warning)" : "var(--dashboard-success)";
  const planProgressColor = planTargetRate < 60 ? "var(--dashboard-danger)" : planTargetRate < 100 ? "var(--dashboard-warning)" : "var(--dashboard-success)";
  const planProgressSoftColor = `color-mix(in srgb, ${planProgressColor} 42%, var(--surface))`;
  return (
    <div className={`dual-progress-meter ${compact ? "compact" : ""} ${tone}`}>
      <div className="dual-progress-track"><i className="payment-fill" style={{ width: `${Math.min(planTargetRate, 100)}%`, background: planProgressSoftColor }} /><i className="post-fill" style={{ width: `${Math.min(postTargetRate, 100)}%`, background: postProgressColor }} /></div>
      <div className="dual-progress-foot"><span>{actualLabel} <b>{postTargetRate}%</b> - {planLabel} <b>{planTargetRate}%</b></span><span>{paceLabel} <b>{paceRate}%</b></span></div>
    </div>
  );
}

function ProgressSummary({
  title,
  post,
  plan,
  target,
  suffix,
  tone,
  language,
  actualLabel = "Post",
  planLabel = "Plan",
  gapLabel = "Post GAP",
  paceLabel = "Post Pace",
}: {
  title: string;
  post: number;
  plan: number;
  target: number;
  suffix?: string;
  tone: "green" | "amber";
  language: Language;
  actualLabel?: string;
  planLabel?: string;
  gapLabel?: string;
  paceLabel?: string;
}) {
  const postGap = Math.max(target - post, 0);
  return (
    <article className={`progress-summary ${tone}`}>
      <div className="summary-top">
        <strong>{title}</strong>
      </div>
      <div className="summary-body">
        <div className="summary-values summary-values-three">
          <div><b>{formatDashboardMetric(post, suffix)}</b><small>{actualLabel}</small></div><i>/</i><div><b>{formatDashboardMetric(plan, suffix)}</b><small>{planLabel}</small></div><i>/</i><div><b>{formatDashboardMetric(target, suffix)}</b><small>{label("目标", "Target", language)}</small></div>
        </div>
        <i className="summary-divider" aria-hidden="true" />
        <div className="summary-gaps"><span><b>{formatDashboardMetric(postGap, suffix)}</b><small>{gapLabel}</small></span></div>
      </div>
      <DualProgressMeter post={post} plan={plan} target={target} tone={tone} actualLabel={actualLabel} planLabel={planLabel} paceLabel={paceLabel} />
    </article>
  );
}

function LegacyDualProgressMeter({
  post,
  payment,
  target,
  tone,
  showPayment = true,
}: {
  post: number;
  payment: number;
  target: number;
  tone: "green" | "amber";
  showPayment?: boolean;
}) {
  const postRate = target > 0 ? percent(post, target) : 0;
  const paymentRate = target > 0 ? percent(payment, target) : 0;
  return (
    <div className={`legacy-dual-progress-meter ${tone}`}>
      {showPayment && <div className="legacy-dual-progress-line"><small>Payment</small><div className="legacy-dual-progress-track"><i className="payment-fill" style={{ width: `${Math.min(paymentRate, 100)}%` }} /></div></div>}
      <div className="legacy-dual-progress-line"><small>Post</small><div className="legacy-dual-progress-track"><i className="post-fill" style={{ width: `${Math.min(postRate, 100)}%` }} /></div></div>
      <div className="legacy-dual-progress-foot"><span>Post <b>{postRate}%</b></span>{showPayment && <span>Payment <b>{paymentRate}%</b></span>}<span>Target <b>100%</b></span></div>
    </div>
  );
}

function LegacyProgressSummary({
  title,
  post,
  payment,
  target,
  suffix,
  tone,
  showPayment = true,
}: {
  title: string;
  post: number;
  payment: number;
  target: number;
  suffix?: string;
  tone: "green" | "amber";
  showPayment?: boolean;
}) {
  const postGap = Math.max(target - post, 0);
  const paymentGap = Math.max(target - payment, 0);
  return (
    <article className={`progress-summary legacy-progress-summary ${tone}`}>
      <div className="summary-top">
        <strong>{title}</strong>
      </div>
      <div className={`legacy-summary-values${showPayment ? "" : " no-payment"}`}>
        <div><b>{formatDashboardMetric(post, suffix)}</b><small>Post</small></div>
        {showPayment && <div><b>{formatDashboardMetric(payment, suffix)}</b><small>Payment</small></div>}
        <div><b>{formatDashboardMetric(target, suffix)}</b><small>Target</small></div>
      </div>
      <div className={`legacy-summary-gaps${showPayment ? "" : " no-payment"}`}><span><b>{formatDashboardMetric(postGap, suffix)}</b><small>Post GAP</small></span>{showPayment && <span><b>{formatDashboardMetric(paymentGap, suffix)}</b><small>Payment GAP</small></span>}</div>
      <LegacyDualProgressMeter post={post} payment={payment} target={target} tone={tone} showPayment={showPayment} />
    </article>
  );
}

function PublishProgressSummary({
  title,
  actual,
  target,
  formatValue = formatDashboardMetric,
  tone,
}: {
  title: string;
  actual: number;
  target: number;
  formatValue?: (value: number) => string;
  tone: "post" | "budget";
}) {
  const actualRate = target > 0 ? Math.round((actual / target) * 100) : 0;
  const pace = actualRate - 100;
  const remaining = target - actual;
  return (
    <article className={`progress-summary publish-progress-summary ${tone}`}>
      <div className="summary-top"><strong>{title}</strong></div>
      <div className="publish-progress-values">
        <div className="publish-progress-main"><b>{formatValue(actual)}</b><i>/</i><em>{formatValue(target)}</em><small>MTD / Target</small></div>
        <div className="publish-progress-remaining"><b>{formatValue(remaining)}</b><small>Remaining</small></div>
      </div>
      <div className="publish-progress-track"><i style={{ width: `${Math.min(Math.max(actualRate, 0), 100)}%` }} /></div>
      <div className="publish-progress-foot"><span>MTD <b>{actualRate}%</b></span><span>Pace <b className={pace >= 0 ? "good" : "bad"}>{pace > 0 ? "+" : ""}{pace}%</b></span></div>
    </article>
  );
}

function PostPlanMetricCells({ row }: { row: DashboardBreakdown }) {
  const post = row.postMtd;
  const plan = row.planMtd ?? row.postMtd;
  const target = row.postTarget;
  const postAmount = row.postAmountMtd ?? 0;
  const planAmount = row.planAmountMtd ?? row.budgetMtd;
  const targetAmount = row.budgetTarget;
  const renderSnapshot = (values: [number, number, number], suffix = "") => <div className="dashboard-metric-triplet">{values.map((value, index) => <Fragment key={index}><b>{formatDashboardMetric(value, suffix)}</b>{index < values.length - 1 && <span>/</span>}</Fragment>)}</div>;
  const renderGap = (actualValue: number, targetValue: number, suffix = "") => (
    <div className="dashboard-gap-stack"><b>{formatDashboardMetric(Math.max(targetValue - actualValue, 0), suffix)}</b></div>
  );
  return <>
    <td className="dashboard-metric-snapshot">{renderSnapshot([post, plan, target])}</td>
    <td className="dashboard-metric-gaps">{renderGap(post, target)}</td>
    <td className="dashboard-metric-progress"><DualProgressMeter post={post} plan={plan} target={target} tone="green" compact actualLabel="Post" planLabel="Plan" paceLabel="Post Pace" /></td>
    <td className="dashboard-metric-snapshot">{renderSnapshot([postAmount, planAmount, targetAmount])}</td>
    <td className="dashboard-metric-gaps">{renderGap(postAmount, targetAmount)}</td>
    <td className="dashboard-metric-progress"><DualProgressMeter post={postAmount} plan={planAmount} target={targetAmount} tone="amber" compact actualLabel="Budget" planLabel="Plan" paceLabel="Budget Pace" /></td>
  </>;
}

type PostPlanCalendarPeriod = "month" | "week" | "day";
type PostPlanScheduleMetric = "quantity" | "amount";
type PostPlanScheduleDimension = DashboardDimension | "status";

function dashboardDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dashboardLocalDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year || 2026, Math.max((month || 1) - 1, 0), day || 1);
}

function PostPlanCalendar({
  entries,
  month,
  period,
  language,
  today,
  publishedPlanKeys,
  onNavigate,
}: {
  entries: Record<string, unknown>[];
  month: string;
  period: PostPlanCalendarPeriod;
  language: Language;
  today: string;
  publishedPlanKeys: Set<string>;
  onNavigate: (page: PageKey) => void;
}) {
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const monthStart = dashboardLocalDate(`${month}-01`);
  const monthEntries = entries
    .map((entry) => ({
      entry,
      date: String(entry.planningPostDate || entry.expectedPostDate || "").slice(0, 10),
    }))
    .filter((item) => item.date)
    .sort((a, b) => a.date.localeCompare(b.date));
  const entriesByDate = new Map<string, typeof monthEntries>();
  monthEntries.forEach((item) => entriesByDate.set(item.date, [...(entriesByDate.get(item.date) || []), item]));
  const daysInMonth = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
  const monthLeadingDays = (monthStart.getDay() + 6) % 7;
  const calendarStart = new Date(monthStart);
  calendarStart.setDate(calendarStart.getDate() - monthLeadingDays);
  const calendarDays = monthLeadingDays + daysInMonth;
  const monthDates = Array.from({ length: calendarDays + ((7 - (calendarDays % 7)) % 7) }, (_, index) => {
    const date = new Date(calendarStart);
    date.setDate(calendarStart.getDate() + index);
    return dashboardDateKey(date);
  });
  const firstEntryDate = monthEntries[0]?.date || dashboardDateKey(monthStart);
  const firstWeekDate = dashboardLocalDate(firstEntryDate);
  firstWeekDate.setDate(firstWeekDate.getDate() - ((firstWeekDate.getDay() + 6) % 7));
  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(firstWeekDate);
    date.setDate(firstWeekDate.getDate() + index);
    return dashboardDateKey(date);
  });
  const weekdayLabels = language === "zh" ? ["一", "二", "三", "四", "五", "六", "日"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const renderEntry = ({ entry }: { entry: Record<string, unknown> }) => {
    const status = postPlanScheduleStatus(entry, today, publishedPlanKeys);
    const statusMeta = postPlanCalendarStatusMeta[status];
    const creatorName = String(entry.owner || entry.creatorName || label("未分配达人", "Unassigned creator", language));
    return <button type="button" className={`post-plan-calendar-entry ${statusMeta.className}`} key={`${String(entry.paymentNo || "payment")}-${String(entry.postNo || "post")}-${String(entry.product || "product")}`} aria-label={creatorName} title={creatorName} onClick={() => onNavigate("review31b")}>
      <b>{creatorName}</b>
      {status === "overdue-completed" && <i className="post-plan-calendar-late-dot" aria-label={label("延期完成", "Published late", language)} />}
    </button>;
  };
  const renderCell = (date: string, index: number) => {
    const dayEntries = entriesByDate.get(date) || [];
    const outsideMonth = !date.startsWith(month);
    return <div className={`post-plan-calendar-cell${outsideMonth ? " outside-month" : ""}`} key={date || `empty-${index}`}>
      <><strong>{Number(date.slice(-2))}{Number(date.slice(-2)) === 1 && <span className="post-plan-calendar-month-label">{date.slice(0, 7)}</span>}{date === today && <em className="post-plan-calendar-today">{label("今天", "Today", language)}</em>}</strong><div className="post-plan-calendar-entries">{dayEntries.slice(0, 3).map(renderEntry)}{dayEntries.length > 3 && <button type="button" className="post-plan-calendar-more" onClick={() => setExpandedDate((current) => current === date ? null : date)} aria-expanded={expandedDate === date}>+{dayEntries.length - 3}</button>}{expandedDate === date && <div className="post-plan-calendar-popover" role="dialog" aria-label={label("当天全部排期", "All entries for this day", language)}><div className="post-plan-calendar-popover-head"><strong>{date}</strong><button type="button" aria-label={label("关闭", "Close", language)} onClick={() => setExpandedDate(null)}><X size={12} /></button></div><div className="post-plan-calendar-popover-list">{dayEntries.map(renderEntry)}</div></div>}</div></>
    </div>;
  };
  const dates = period === "week" ? weekDates : monthDates;
  return <>
    <div className="post-plan-calendar-legend">
      {(Object.keys(postPlanCalendarStatusMeta) as PostPlanScheduleStatus[]).map((status) => <span key={status} className={`post-plan-calendar-legend-item ${status}`}><i />{label(postPlanCalendarStatusMeta[status].zh, postPlanCalendarStatusMeta[status].en, language)}</span>)}
    </div>
    <div className={`post-plan-calendar-grid ${period}`}><div className="post-plan-calendar-weekdays">{weekdayLabels.map((weekday) => <span key={weekday}>{weekday}</span>)}</div><div className="post-plan-calendar-days">{dates.map((date, index) => renderCell(date, index))}</div></div>
  </>;
}

type PostPlanScheduleStatus = "completed" | "planned" | "overdue" | "overdue-completed";

const postPlanScheduleStatusMeta: Record<PostPlanScheduleStatus, { zh: string; en: string; className: string }> = {
  completed: { zh: "已完成", en: "Completed", className: "completed" },
  planned: { zh: "计划内未完成", en: "Planned", className: "planned" },
  overdue: { zh: "计划内延期", en: "Overdue", className: "overdue" },
  "overdue-completed": { zh: "延期完成", en: "Completed late", className: "overdue-completed" },
};

const postPlanCalendarStatusMeta: Record<PostPlanScheduleStatus, { zh: string; en: string; className: string }> = {
  completed: { zh: "已发布", en: "Published", className: "completed" },
  planned: { zh: "待发布", en: "Pending", className: "planned" },
  overdue: { zh: "已延期", en: "Overdue", className: "overdue" },
  "overdue-completed": { zh: "已延期发布", en: "Published late", className: "overdue-completed" },
};

function postPlanScheduleDate(entry: Record<string, unknown>) {
  return String(entry.planningPostDate || entry.expectedPostDate || "").slice(0, 10);
}

function postPlanScheduleStatus(entry: Record<string, unknown>, today: string, publishedPlanKeys: Set<string>): PostPlanScheduleStatus {
  const key = `${String(entry.paymentNo || "")}|${String(entry.postNo || "")}`;
  const completed = publishedPlanKeys.has(key);
  const overdue = Boolean(postPlanScheduleDate(entry)) && postPlanScheduleDate(entry) < today;
  if (completed && overdue) return "overdue-completed";
  if (completed) return "completed";
  if (overdue) return "overdue";
  return "planned";
}

const postPlanDimensionPalette = [
  "#3478f6",
  "#17a673",
  "#8b5cf6",
  "#f59e0b",
  "#06b6d4",
  "#ec4899",
  "#64748b",
  "#84cc16",
];

function PostPlanScheduleChart({
  entries,
  period,
  language,
  today,
  dimension,
  dimensionLabel,
  publishedPlanKeys,
  heading,
  visibleStatuses = ["planned", "overdue", "completed", "overdue-completed"],
  metric = "quantity",
  stackBy = "status",
}: {
  entries: Record<string, unknown>[];
  period: Exclude<PostPlanCalendarPeriod, "day">;
  language: Language;
  today: string;
  dimension: PostPlanScheduleDimension;
  dimensionLabel: string;
  publishedPlanKeys: Set<string>;
  heading?: string;
  visibleStatuses?: PostPlanScheduleStatus[];
  metric?: PostPlanScheduleMetric;
  stackBy?: "status" | "dimension";
}) {
  const anchor = dashboardLocalDate(today);
  const statusOrder = visibleStatuses;
  const dimensionValue = (entry: Record<string, unknown>) => {
    if (dimension === "status") {
      const rawStatus = postPlanScheduleStatus(entry, today, publishedPlanKeys);
      const status = rawStatus === "overdue-completed" && !statusOrder.includes(rawStatus) ? "completed" : rawStatus;
      return label(postPlanScheduleStatusMeta[status].zh, postPlanScheduleStatusMeta[status].en, language);
    }
    if (dimension === "product") return entry.product;
    if (dimension === "tier") return entry.rate || entry.tier;
    if (dimension === "strategist") return entry.owner;
    if (dimension === "specialist") return entry.kolSpecialist || entry.specialist;
    if (dimension === "submitter") return entry.submitter;
    return entry.brand;
  };
  const unassignedLabel = label("未分配", "Unassigned", language);
  const scheduleEntries = entries.map((entry) => {
    const status = postPlanScheduleStatus(entry, today, publishedPlanKeys);
    return {
      entry,
      date: postPlanScheduleDate(entry),
      status: status === "overdue-completed" && !statusOrder.includes("overdue-completed") ? "completed" : status,
      dimensionName: String(dimensionValue(entry) || unassignedLabel),
      value: metric === "amount" ? numeric(entry.eachPrice) : 1,
    };
  }).filter((item) => item.date);
  const dimensionCounts = Array.from(scheduleEntries.reduce((groups, current) => {
    groups.set(current.dimensionName, (groups.get(current.dimensionName) || 0) + current.value);
    return groups;
  }, new Map<string, number>()).entries()).sort((a, b) => b[1] - a[1]);
  const statusColors: Record<PostPlanScheduleStatus, string> = {
    planned: "var(--dashboard-primary)",
    overdue: "var(--dashboard-danger)",
    completed: "var(--dashboard-success)",
    "overdue-completed": "var(--dashboard-success)",
  };
  const series: { key: string; label: string; color: string; status?: PostPlanScheduleStatus }[] = stackBy === "dimension"
    ? dimensionCounts.map(([name], index) => ({ key: name, label: name, color: postPlanDimensionPalette[index % postPlanDimensionPalette.length] }))
    : statusOrder.map((status) => ({ key: status, label: label(postPlanScheduleStatusMeta[status].zh, postPlanScheduleStatusMeta[status].en, language), color: statusColors[status], status }));
  const monthPeriods = Array.from({ length: 7 }, (_, index) => {
    const offset = index - 3;
    const date = new Date(anchor.getFullYear(), anchor.getMonth() + offset, 1);
    const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const key = dashboardDateKey(date).slice(0, 7);
    return { key, label: key, marker: offset === 0 ? label("本月", "This month", language) : "", startKey: dashboardDateKey(date), endKey: dashboardDateKey(monthEnd) };
  });
  const currentMonday = new Date(anchor);
  currentMonday.setDate(currentMonday.getDate() - ((currentMonday.getDay() + 6) % 7));
  const weekPeriods = Array.from({ length: 16 }, (_, index) => {
    const start = new Date(currentMonday);
    start.setDate(currentMonday.getDate() + (index - 4) * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const startKey = dashboardDateKey(start);
    const endKey = dashboardDateKey(end);
    const current = today >= startKey && today <= endKey;
    return {
      key: startKey,
      label: `${start.getMonth() + 1}/${start.getDate()}–${end.getMonth() + 1}/${end.getDate()}`,
      marker: current ? label("本周", "This week", language) : "",
      startKey,
      endKey,
    };
  });
  const periods = period === "month" ? monthPeriods : weekPeriods;
  const periodEntries = (item: (typeof periods)[number]) => scheduleEntries.filter(({ date }) => period === "month"
    ? date.startsWith(item.key)
    : date >= item.startKey && date <= item.endKey);
  const periodSegments = periods.map((item) => {
    const matching = periodEntries(item);
    return {
      ...item,
      total: matching.reduce((sum, entry) => sum + entry.value, 0),
      segments: series.map((segment) => ({
        ...segment,
        value: matching
          .filter((entry) => stackBy === "dimension" ? entry.dimensionName === segment.key : entry.status === segment.status)
          .reduce((sum, entry) => sum + entry.value, 0),
      })),
    };
  });
  const maxCount = Math.max(...periodSegments.map((item) => item.total), 1);
  const formatScheduleValue = (value: number) => metric === "amount" ? compactNumber(value) : `${value}`;
  const metricLabel = metric === "amount" ? label("金额", "Amount", language) : label("数量", "Quantity", language);
  return <div className={`post-plan-schedule-chart ${period} ${metric}`} aria-label={`${heading || metricLabel} · ${dimensionLabel}`}>
    <div className="post-plan-schedule-toolbar">
      <div><strong>{heading || metricLabel}</strong><small>{label("按", "By", language)} {dimensionLabel} · {period === "month" ? "7" : "16"} {period === "month" ? label("个月", "months", language) : label("周", "weeks", language)}</small></div>
      <div className="post-plan-schedule-legend">{series.map((item) => <span key={item.key} className={`schedule-legend-item ${item.status ? postPlanScheduleStatusMeta[item.status].className : "dimension"}`} title={item.label}><i style={{ background: item.color }} />{item.label}</span>)}</div>
    </div>
    {stackBy === "status" && dimensionCounts.length > 0 && <div className="post-plan-schedule-dimensions" aria-label={`${dimensionLabel} breakdown`}>
      {dimensionCounts.slice(0, 8).map(([name, value]) => <span key={name}><b>{name}</b><small>{formatScheduleValue(value)}</small></span>)}
      {dimensionCounts.length > 8 && <small className="post-plan-schedule-more">+{dimensionCounts.length - 8}</small>}
    </div>}
    <div className="post-plan-schedule-plot" style={{ "--schedule-max": maxCount } as CSSProperties}>
      <div className="post-plan-schedule-y-axis"><span>{formatScheduleValue(maxCount)}</span><span>{formatScheduleValue(Math.ceil(maxCount / 2))}</span><span>0</span></div>
      <div className="post-plan-schedule-columns">
        {periodSegments.map((item) => <div className={`post-plan-schedule-column${item.marker ? " current" : ""}`} key={item.key}>
          <div className="post-plan-schedule-bar-area">
            <div className="post-plan-schedule-bar" style={{ height: `${item.total ? Math.max((item.total / maxCount) * 100, 5) : 0}%` }} title={item.total ? `${item.label}: ${formatScheduleValue(item.total)}` : item.label}>
              {item.segments.map((segment) => segment.value > 0 && <i key={segment.key} className={`schedule-segment ${segment.status ? postPlanScheduleStatusMeta[segment.status].className : "dimension"}`} style={{ height: `${(segment.value / Math.max(item.total, 1)) * 100}%`, "--schedule-segment-color": segment.color } as CSSProperties} title={`${segment.label}: ${formatScheduleValue(segment.value)}`}><b>{formatScheduleValue(segment.value)}</b><em className="schedule-segment-tooltip">{segment.label} · {formatScheduleValue(segment.value)}</em>{segment.status === "overdue-completed" && <em className="schedule-overdue-dot" />}</i>)}
            </div>
          </div>
          <strong className="post-plan-schedule-label">{item.label}</strong>
          {item.marker && <small className="post-plan-schedule-marker">{item.marker}</small>}
        </div>)}
      </div>
    </div>
    {!scheduleEntries.length && <div className="post-plan-calendar-empty">{label("当前筛选下没有已选择的 Post Plan", "No selected Post Plans for the current filters", language)}</div>}
  </div>;
}

function TargetDashboard({
  language,
  targetRows,
  paymentRows,
  reviewRows,
  notify,
  onNavigate,
  version31 = false,
}: {
  language: Language;
  targetRows: Row[];
  paymentRows: Row[];
  reviewRows: Row[];
  notify: (message: string) => void;
  onNavigate: (page: PageKey) => void;
  version31?: boolean;
}) {
  const [tab, setTab] = useState<DashboardDimension>("product");
  const [postPlanTab, setPostPlanTab] = useState<DashboardDimension>("product");
  const [postPlanCalendarPeriod, setPostPlanCalendarPeriod] = useState<PostPlanCalendarPeriod>("month");
  const [excludedPostPlanRows, setExcludedPostPlanRows] = useState<Set<string>>(new Set());
  const [resultTab, setResultTab] = useState<DashboardDimension>("product");
  const [filters, setFilters] = useState({ country: "ID", month: "2026-09", brand: "", owner: "" });
  const [expandedProgress, setExpandedProgress] = useState<Set<string>>(new Set());
  const [expandedPostPlans, setExpandedPostPlans] = useState<Set<string>>(new Set());
  const [resultOpen, setResultOpen] = useState(true);
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [videoPeriod, setVideoPeriod] = useState("MTD");
  const [videoTab, setVideoTab] = useState("video");
  const [expandedVideoGroups, setExpandedVideoGroups] = useState<Set<string>>(new Set());
  const sourceRows = (targetRows.length
    ? targetRows
    : [
        { id: 1, product: "Tone Up Sunscreen", owner: "Nadia", qty: 38, qtyTarget: 52, actualCost: 17600000, budgetTarget: 43000000 },
        { id: 2, product: "Day Cream", owner: "Delvi", qty: 7, qtyTarget: 32, actualCost: 8500000, budgetTarget: 29000000 },
      ]).filter((row) => (
        (!filters.country || String(row.country || "ID") === filters.country) &&
        (!filters.month || String(row.targetMonth || "2026-08") === filters.month) &&
        (!filters.brand || String(row.brand || "") === filters.brand) &&
        (!filters.owner || String(row.owner || "") === filters.owner)
      ));
  const paidPayments = paymentRows.filter((payment) => {
    const paymentMonth = String(payment.targetMonth || payment.paymentDate || payment.expectedPostDate || "").slice(0, 7);
    return (String(payment.sendPayment || "") === "Yes" || Boolean(payment.paymentDate)) && (!filters.country || String(payment.country || "ID") === filters.country) && (!filters.month || paymentMonth === filters.month) && (!filters.brand || String(payment.brand || "") === filters.brand) && (!filters.owner || String(payment.owner || "") === filters.owner);
  });
  const paidPlanEntries = paidPayments.flatMap((payment, paymentIndex) => {
    const savedPlans = Array.isArray(payment.postPlans) ? payment.postPlans as Record<string, unknown>[] : [];
    const plans = savedPlans.length
      ? savedPlans
      : Array.from({ length: Math.max(0, Math.floor(numeric(payment.qty))) }, (_, index) => ({
          postNo: index + 1,
          eachPrice: payment.unitPrice,
          planningPostDate: payment.expectedPostDate,
        }));
    return plans.map((plan, index) => ({
      ...plan,
      paymentNo: String(payment.paymentNo || ""),
      postNo: plan.postNo || index + 1,
      eachPrice: plan.eachPrice ?? payment.unitPrice,
      planningPostDate: plan.planningPostDate || payment.expectedPostDate,
      product: plan.product || payment.product || label("未分配产品", "Unassigned Product", language),
      owner: payment.owner || label("未分配负责人", "Unassigned Strategist", language),
      specialist: payment.kolSpecialist || payment.specialist || ["Nafa Augustina", "Rani Putri", "Mia Kurnia", "Salsa Anindya"][paymentIndex % 4],
      submitter: payment.submitter || "Uthan",
      brand: payment.brand || label("未分配品牌", "Unassigned Brand", language),
      tier: plan.rate || plan.tier || plan.rateTier || payment.rate || payment.rateTier || label("未分级", "Unrated", language),
    }));
  });
  const postPlanDimensionValue = (row: Record<string, unknown>, dimension: DashboardDimension) => {
    if (dimension === "product") return String(row.product || label("未分配产品", "Unassigned Product", language));
    if (dimension === "tier") return String(row.rate || row.tier || row.rateTier || label("未分级", "Unrated", language));
    if (dimension === "strategist") return String(row.owner || label("未分配负责人", "Unassigned Strategist", language));
    if (dimension === "specialist") return String(row.kolSpecialist || row.specialist || label("未分配 Specialist", "Unassigned Specialist", language));
    if (dimension === "submitter") return String(row.submitter || label("未分配 Submitter", "Unassigned Submitter", language));
    return String(row.brand || label("未分配品牌", "Unassigned Brand", language));
  };
  const creatorTierKey = (value: unknown) => String(value || "").replace(/\s*tier$/i, "").trim().toUpperCase();
  const isAllowedCreatorTier = (value: unknown) => ["S", "A", "B"].includes(creatorTierKey(value));
  const creatorTierRank = (value: unknown) => ({ S: 0, A: 1, B: 2 }[creatorTierKey(value)] ?? 99);
  const paidPlanPriceByKey = new Map(paidPlanEntries.map((plan) => [`${plan.paymentNo}|${String(plan.postNo)}`, numeric(plan.eachPrice)]));
  const paidPlanTierByKey = new Map(paidPlanEntries.map((plan) => [`${plan.paymentNo}|${String(plan.postNo)}`, String(plan.tier || "")]));
  const postedPlanEntries = reviewRows.filter((review) => {
    const postDate = String(review.actualPostDate || review.postDate || "");
    const hasPost = Boolean(String(review.postId || "").trim() || postDate || String(review.postStatus || "") === "Published");
    const reviewMonth = postDate.slice(0, 7) || String(review.planningPostDate || "").slice(0, 7);
    return hasPost && (!filters.country || String(review.country || "ID") === filters.country) && (!filters.month || reviewMonth === filters.month) && (!filters.brand || String(review.brand || "") === filters.brand) && (!filters.owner || String(review.owner || "") === filters.owner);
  }).map((review) => ({
    ...review,
    paymentNo: String(review.paymentNo || ""),
    postNo: String(review.postNo || ""),
    product: review.product || label("未分配产品", "Unassigned Product", language),
    owner: review.owner || label("未分配负责人", "Unassigned Strategist", language),
    specialist: review.kolSpecialist || label("未分配 Specialist", "Unassigned Specialist", language),
    submitter: review.submitter || label("未分配 Submitter", "Unassigned Submitter", language),
    brand: review.brand || label("未分配品牌", "Unassigned Brand", language),
    tier: review.rate || review.tier || review.rateTier || paidPlanTierByKey.get(`${String(review.paymentNo || "")}|${String(review.postNo || "")}`) || label("未分级", "Unrated", language),
    eachPrice: review.eachPrice || paidPlanPriceByKey.get(`${String(review.paymentNo || "")}|${String(review.postNo || "")}`) || review.unitPrice || 0,
  }));
  const publishedPlanKeys = new Set(reviewRows.filter((review) => String(review.postStatus || "") === "Published" || Boolean(review.actualPostDate || review.postDate)).map((review) => `${String(review.paymentNo || "")}|${String(review.postNo || "")}`));
  const publishedPaidPlans = paidPlanEntries.filter((plan) => publishedPlanKeys.has(`${plan.paymentNo}|${String(plan.postNo)}`));
  const today = new Date().toISOString().slice(0, 10);
  const selectedMonthStart = `${filters.month}-01`;
  const planEntryKey = (entry: Record<string, unknown>) => `${String(entry.paymentNo || "")}|${String(entry.postNo || "")}`;
  const postMtdEntries = postedPlanEntries.filter((entry) => {
    const actualDate = String(entry.actualPostDate || entry.postDate || "");
    return actualDate.startsWith(filters.month) || (!actualDate && String(entry.planningPostDate || "").startsWith(filters.month));
  });
  const currentMonthUnpostedPlanEntries = paidPlanEntries.filter((plan) => {
    const key = planEntryKey(plan);
    return String(plan.planningPostDate || "").startsWith(filters.month) && !publishedPlanKeys.has(key);
  });
  const delayedPaidPlans = paidPlanEntries.filter((plan) => Boolean(plan.planningPostDate) && String(plan.planningPostDate) < today && !publishedPlanKeys.has(`${plan.paymentNo}|${String(plan.postNo)}`));
  const historicalDelayedPlanEntries = paidPlanEntries.filter((plan) => {
    const key = planEntryKey(plan);
    return Boolean(plan.planningPostDate) && String(plan.planningPostDate) < selectedMonthStart && !publishedPlanKeys.has(key);
  });
  const planMtdEntries = Array.from(new Map([...postMtdEntries, ...currentMonthUnpostedPlanEntries, ...historicalDelayedPlanEntries].map((entry) => [planEntryKey(entry), entry])).values());
  const postPlanSummary = {
    targetCount: sourceRows.reduce((sum, row) => sum + numeric(row.qtyTarget || row.qty), 0),
    targetAmount: sourceRows.reduce((sum, row) => sum + numeric(row.budgetTarget), 0),
    postCount: postMtdEntries.length,
    postAmount: postMtdEntries.reduce((sum, plan) => sum + numeric(plan.eachPrice), 0),
    planCount: planMtdEntries.length,
    planAmount: planMtdEntries.reduce((sum, plan) => sum + numeric(plan.eachPrice), 0),
    paidCount: paidPlanEntries.length,
    paidAmount: paidPlanEntries.reduce((sum, plan) => sum + numeric(plan.eachPrice), 0),
    publishedCount: publishedPaidPlans.length,
    publishedAmount: publishedPaidPlans.reduce((sum, plan) => sum + numeric(plan.eachPrice), 0),
    delayedCount: delayedPaidPlans.length,
    delayedAmount: delayedPaidPlans.reduce((sum, plan) => sum + numeric(plan.eachPrice), 0),
  };
  const buildPaidPlanBreakdowns = (dimension: DashboardDimension): DashboardBreakdown[] => {
    const groups = new Map<string, DashboardBreakdown>();
    const getGroup = (name: string, sub: string) => groups.get(name) || { name, sub, postMtd: 0, postTarget: 0, budgetMtd: 0, budgetTarget: 0, planMtd: 0, planAmountMtd: 0, postAmountMtd: 0 };
    if (dimension !== "specialist" && dimension !== "submitter") {
      sourceRows.forEach((target) => {
        const name = postPlanDimensionValue(target, dimension);
        const current = getGroup(name, dimension === "product" ? `${String(target.brand || "")} · ${String(target.owner || "")}` : label("Target 页面", "Target page", language));
        current.postTarget += numeric(target.qtyTarget || target.qty);
        current.budgetTarget += numeric(target.budgetTarget);
        groups.set(name, current);
      });
    }
    planMtdEntries.forEach((plan) => {
      const name = postPlanDimensionValue(plan, dimension);
      const current = getGroup(name, dimension === "product" ? `${String(plan.brand)} · ${String(plan.owner)}` : label("Post Plan", "Post Plan", language));
      current.planMtd = (current.planMtd || 0) + 1;
      current.planAmountMtd = (current.planAmountMtd || 0) + numeric(plan.eachPrice);
      groups.set(name, current);
    });
    postMtdEntries.forEach((plan) => {
      const name = postPlanDimensionValue(plan, dimension);
      const current = getGroup(name, dimension === "product" ? `${String(plan.brand)} · ${String(plan.owner)}` : label("已发布 Post", "Published Post", language));
      current.postMtd += 1;
      current.postAmountMtd = (current.postAmountMtd || 0) + numeric(plan.eachPrice);
      groups.set(name, current);
    });
    const totalTarget = sourceRows.reduce((sum, row) => sum + numeric(row.qtyTarget || row.qty), 0);
    const totalBudgetTarget = sourceRows.reduce((sum, row) => sum + numeric(row.budgetTarget), 0);
    const values = Array.from(groups.values());
    if (dimension === "specialist" || dimension === "submitter") {
      const totalPlan = values.reduce((sum, row) => sum + (row.planMtd || 0), 0);
      values.forEach((row, index) => {
        const share = totalPlan > 0 ? (row.planMtd || 0) / totalPlan : 1 / Math.max(values.length, 1);
        row.postTarget = Math.max(1, Math.round(totalTarget * share));
        row.budgetTarget = Math.max(0, Math.round(totalBudgetTarget * share));
        if (index === values.length - 1) {
          const countUsed = values.slice(0, -1).reduce((sum, item) => sum + item.postTarget, 0);
          const amountUsed = values.slice(0, -1).reduce((sum, item) => sum + item.budgetTarget, 0);
          row.postTarget = Math.max(1, totalTarget - countUsed);
          row.budgetTarget = Math.max(0, totalBudgetTarget - amountUsed);
        }
      });
    }
    return values;
  };
  const paidRowsByDimension: Record<DashboardDimension, DashboardBreakdown[]> = {
    product: buildPaidPlanBreakdowns("product"),
    tier: buildPaidPlanBreakdowns("tier").filter((row) => isAllowedCreatorTier(row.name)).sort((a, b) => creatorTierRank(a.name) - creatorTierRank(b.name)),
    strategist: buildPaidPlanBreakdowns("strategist"),
    specialist: buildPaidPlanBreakdowns("specialist"),
    submitter: buildPaidPlanBreakdowns("submitter"),
    brand: buildPaidPlanBreakdowns("brand"),
  };
  const paidPlanRows = paidRowsByDimension[postPlanTab];
  const allPostPlanEntryKeys = paidPlanEntries.map(planEntryKey);
  const postPlanSelectionState = (entryKeys: string[]) => {
    const selectedCount = entryKeys.filter((key) => !excludedPostPlanRows.has(key)).length;
    return {
      checked: entryKeys.length > 0 && selectedCount === entryKeys.length,
      indeterminate: selectedCount > 0 && selectedCount < entryKeys.length,
    };
  };
  const updatePostPlanSelection = (entryKeys: string[], checked: boolean) => {
    setExcludedPostPlanRows((current) => {
      const next = new Set(current);
      entryKeys.forEach((key) => checked ? next.delete(key) : next.add(key));
      return next;
    });
  };
  const selectedPlanEntries = paidPlanEntries.filter((plan) => !excludedPostPlanRows.has(planEntryKey(plan)));
  const selectedPostMtdEntries = postMtdEntries.filter((entry) => !excludedPostPlanRows.has(planEntryKey(entry)));
  const selectedPlanMtdEntries = planMtdEntries.filter((entry) => !excludedPostPlanRows.has(planEntryKey(entry)));
  const selectedTargetMetrics = sourceRows.reduce((summary, target) => {
    const productName = postPlanDimensionValue(target, "product");
    const productPlanEntries = paidPlanEntries.filter((plan) => postPlanDimensionValue(plan, "product") === productName);
    const selectedProductPlanCount = productPlanEntries.filter((plan) => !excludedPostPlanRows.has(planEntryKey(plan))).length;
    const share = productPlanEntries.length > 0 ? selectedProductPlanCount / productPlanEntries.length : 0;
    summary.count += numeric(target.qtyTarget || target.qty) * share;
    summary.amount += numeric(target.budgetTarget) * share;
    return summary;
  }, { count: 0, amount: 0 });
  const selectedPostPlanSummary = {
    ...postPlanSummary,
    targetCount: Math.round(selectedTargetMetrics.count),
    targetAmount: Math.round(selectedTargetMetrics.amount),
    postCount: selectedPostMtdEntries.length,
    postAmount: selectedPostMtdEntries.reduce((sum, plan) => sum + numeric(plan.eachPrice), 0),
    planCount: selectedPlanMtdEntries.length,
    planAmount: selectedPlanMtdEntries.reduce((sum, plan) => sum + numeric(plan.eachPrice), 0),
    paidCount: selectedPlanEntries.length,
    paidAmount: selectedPlanEntries.reduce((sum, plan) => sum + numeric(plan.eachPrice), 0),
  };
  const paidPlanChildrenFor = (dimension: DashboardDimension, row: DashboardBreakdown) => {
    const childDimension: DashboardDimension = dimension === "product" ? "tier" : "product";
    const parentEntries = paidPlanEntries.filter((entry) => postPlanDimensionValue(entry, dimension) === row.name);
    const childGroups = Array.from(parentEntries.reduce((groups, entry) => {
      const childName = postPlanDimensionValue(entry, childDimension);
      groups.set(childName, [...(groups.get(childName) || []), entry]);
      return groups;
    }, new Map<string, Record<string, unknown>[]>()).entries())
      .filter(([childName]) => childDimension !== "tier" || isAllowedCreatorTier(childName))
      .sort((a, b) => childDimension === "tier" ? creatorTierRank(a[0]) - creatorTierRank(b[0]) : b[1].length - a[1].length);
    let assignedTargetCount = 0;
    let assignedTargetAmount = 0;
    return childGroups.map(([childName, childEntries], index) => {
      const isLast = index === childGroups.length - 1;
      const share = childEntries.length / Math.max(parentEntries.length, 1);
      const childTargetCount = isLast ? Math.max(0, row.postTarget - assignedTargetCount) : Math.max(0, Math.round(row.postTarget * share));
      const childTargetAmount = isLast ? Math.max(0, row.budgetTarget - assignedTargetAmount) : Math.max(0, Math.round(row.budgetTarget * share));
      assignedTargetCount += childTargetCount;
      assignedTargetAmount += childTargetAmount;
      const matchesChild = (entry: Record<string, unknown>) => postPlanDimensionValue(entry, dimension) === row.name && postPlanDimensionValue(entry, childDimension) === childName;
      const childPosts = postMtdEntries.filter(matchesChild);
      const childPlans = planMtdEntries.filter(matchesChild);
      return {
        row: {
          name: childName,
          sub: row.name,
          postMtd: childPosts.length,
          postTarget: childTargetCount,
          budgetMtd: childPosts.reduce((sum, entry) => sum + numeric(entry.eachPrice), 0),
          budgetTarget: childTargetAmount,
          planMtd: childPlans.length,
          planAmountMtd: childPlans.reduce((sum, entry) => sum + numeric(entry.eachPrice), 0),
          postAmountMtd: childPosts.reduce((sum, entry) => sum + numeric(entry.eachPrice), 0),
        } satisfies DashboardBreakdown,
        entryKeys: childEntries.map(planEntryKey),
      };
    });
  };
  const productRows: DashboardBreakdown[] = sourceRows.map((row) => ({
    name: String(row.product || "Product"),
    sub: `Glowsicha · ${String(row.owner || "All KOL Strategists")}`,
    postMtd: numeric(row.qty),
    postTarget: numeric(row.qtyTarget),
    budgetMtd: numeric(row.actualCost),
    budgetTarget: numeric(row.budgetTarget),
  }));
  const tierRows: DashboardBreakdown[] = [
    { name: "S Tier", sub: "4 Creators", postMtd: 4, postTarget: 8, budgetMtd: 7800000, budgetTarget: 16000000 },
    { name: "A Tier", sub: "16 Creators", postMtd: 18, postTarget: 30, budgetMtd: 12100000, budgetTarget: 28000000 },
    { name: "B Tier", sub: "32 Creators", postMtd: 23, postTarget: 46, budgetMtd: 6200000, budgetTarget: 28000000 },
  ];
  const strategistRows: DashboardBreakdown[] = ["Nadia", "Delvi", "Shafi"].map((name, index) => {
    const owned = productRows.filter((row) => row.sub.includes(name));
    const fallback = productRows.filter((_, rowIndex) => rowIndex % 3 === index);
    const items = owned.length ? owned : fallback;
    return {
      name,
      sub: `${items.length} Products`,
      postMtd: items.reduce((sum, row) => sum + row.postMtd, 0),
      postTarget: items.reduce((sum, row) => sum + row.postTarget, 0),
      budgetMtd: items.reduce((sum, row) => sum + row.budgetMtd, 0),
      budgetTarget: items.reduce((sum, row) => sum + row.budgetTarget, 0),
    };
  }).filter((row) => row.postTarget > 0);
  const brandRows: DashboardBreakdown[] = [{
    name: "Glowsicha",
    sub: `${productRows.length} Products`,
    postMtd: productRows.reduce((sum, row) => sum + row.postMtd, 0),
    postTarget: productRows.reduce((sum, row) => sum + row.postTarget, 0),
    budgetMtd: productRows.reduce((sum, row) => sum + row.budgetMtd, 0),
    budgetTarget: productRows.reduce((sum, row) => sum + row.budgetTarget, 0),
  }];
  const rowsByDimension: Record<DashboardDimension, DashboardBreakdown[]> = {
    product: productRows,
    tier: tierRows.filter((row) => isAllowedCreatorTier(row.name)).sort((a, b) => creatorTierRank(a.name) - creatorTierRank(b.name)),
    strategist: strategistRows,
    specialist: paidRowsByDimension.specialist,
    submitter: paidRowsByDimension.submitter,
    brand: brandRows,
  };
  const rows = rowsByDimension[tab];
  const childrenFor = (dimension: DashboardDimension, row: DashboardBreakdown): DashboardBreakdown[] => {
    if (dimension === "product") {
      return [
        scaleBreakdown(row, "A Tier", row.name, .65),
        scaleBreakdown(row, "B Tier", row.name, .35),
      ];
    }
    if (dimension === "tier") {
      const totalTarget = Math.max(productRows.reduce((sum, item) => sum + item.postTarget, 0), 1);
      return productRows.map((product) => scaleBreakdown(row, product.name, row.name, product.postTarget / totalTarget));
    }
    if (dimension === "brand") return productRows.map((product) => ({ ...product, sub: row.name }));
    const owned = productRows.filter((product) => product.sub.includes(row.name));
    return (owned.length ? owned : productRows.slice(0, 2)).map((product) => ({ ...product, sub: row.name }));
  };
  const postMtd = productRows.reduce((sum, row) => sum + row.postMtd, 0);
  const postTarget = productRows.reduce((sum, row) => sum + row.postTarget, 0);
  const budgetMtd = productRows.reduce((sum, row) => sum + row.budgetMtd, 0);
  const budgetTarget = productRows.reduce((sum, row) => sum + row.budgetTarget, 0);
  const tabs = [
    ["product", "产品", "Product"],
    ["tier", "达人等级", "Creator Tier"],
    ["strategist", "KOL Strategist", "KOL Strategist"],
    ...(version31 ? [
      ["specialist", "KOL Specialist", "KOL Specialist"],
      ["submitter", "提交人", "Submitter"],
      ["brand", "品牌", "Brand"],
    ] as const : [["brand", "品牌", "Brand"]] as const),
  ] as const;
  const currentPostPlanDimensionLabel = tabs.find(([key]) => key === postPlanTab)?.[language === "zh" ? 1 : 2] || "Product";
  const summaryMetrics = [
    { name: "Post", value: String(postMtd), target: String(postTarget), rate: percent(postMtd, postTarget), trend: "+10%" },
    { name: "Budget", value: `IDR ${compactNumber(budgetMtd)}`, target: `IDR ${compactNumber(budgetTarget)}`, rate: percent(budgetMtd, budgetTarget), trend: "-26%" },
    { name: "GMV", value: "IDR 333M", target: "IDR 640M", rate: 52, trend: "+10%" },
    { name: "ROI", value: "11.48", target: "8.89", rate: 129, trend: "+48%" },
    { name: "Views", value: "2.2M", target: "4.2M", rate: 52, trend: "+11%" },
    { name: "CPM", value: "IDR 9.7K", target: "IDR 17.1K", rate: 77, trend: "-33%" },
  ];
  const metricTone = (rate: number) => rate >= 100 ? "excellent" : rate >= 60 ? "on-track" : rate >= 40 ? "watch" : "risk";
  const breakdownRows = rowsByDimension[resultTab];
  const breakdownMetrics = (row: DashboardBreakdown) => {
    const postRate = percent(row.postMtd, row.postTarget);
    const budgetRate = percent(row.budgetMtd, row.budgetTarget);
    const views = row.postMtd * 60000;
    const viewTarget = row.postTarget * 50000;
    return [
      { name: "Post", value: String(row.postMtd), target: String(row.postTarget), rate: postRate },
      { name: "Budget", value: `IDR ${compactNumber(row.budgetMtd)}`, target: `IDR ${compactNumber(row.budgetTarget)}`, rate: budgetRate },
      { name: "GMV", value: `IDR ${compactNumber(row.budgetMtd * 12.1)}`, target: `IDR ${compactNumber(row.budgetTarget * 9)}`, rate: Math.min(100, Math.round(budgetRate * 1.2)) },
      { name: "ROI", value: (10.6 + postRate / 100).toFixed(2), target: "8.89", rate: Math.round(118 + postRate / 10) },
      { name: "Views", value: compactNumber(views), target: compactNumber(viewTarget), rate: percent(views, viewTarget) },
      { name: "CPM", value: `IDR ${compactNumber((row.budgetMtd / Math.max(views, 1)) * 1000)}`, target: "IDR 17.1K", rate: Math.min(100, Math.round(70 + budgetRate / 3)) },
    ];
  };
  const videoMetrics = [
    ["Videos", "5,672"],
    ["Video Cost", "4,171.4M"],
    ["GMV", "1,964.1M"],
    ["ROI", "0.47"],
    ["Views", "86.1M"],
    ["CPM", "48.5K"],
  ];
  const videoTabs = [
    ["video", "视频", "Video"],
    ["product", "产品", "Product"],
    ["brand", "品牌", "Brand"],
    ["tier", "达人等级", "Creator Tier"],
    ["content", "内容类型", "Content Type"],
    ["strategist", "KOL Strategist", "KOL Strategist"],
  ];
  const videoRows = [
    ["7659407006515612946", "sharonatas…", "Tone Up Body Spray", "Vlog", "2026-07-06", "4.0M", "262.5M", "65.63", "2.5M", "1.6K"],
    ["7661222224417852693", "zizaakarr", "Tone Up Body Spray", "Tutorial", "2026-07-11", "160.0K", "80.0M", "499.79", "1.4M", "118.422"],
    ["7664441132256120085", "reyhansyphtg", "Peel Off Mask", "Review", "2026-07-20", "350.0K", "79.1M", "226.14", "1.8M", "191.685"],
    ["7660395992457448720", "amndafabi…", "Peel Off Mask", "Vlog", "2026-07-09", "150.0K", "79.1M", "527.02", "1.3M", "113.597"],
    ["7662610624253349140", "bidanwind…", "Hair Removal", "Tutorial", "2026-07-15", "10.5M", "45.7M", "4.35", "1.0M", "10.4K"],
    ["7660898621247835413", "uduskrete9", "Hair Removal", "Review", "2026-07-10", "400.0K", "39.0M", "97.41", "862.9K", "463.571"],
    ["7666797864944700680", "fujiian", "Body Scrub", "Vlog", "2026-07-26", "146.7M", "34.8M", "0.24", "2.6M", "56.4K"],
    ["7657494007991307538", "dianaarta…", "Soft Flush Powder", "Demo", "2026-07-01", "1.5M", "34.6M", "23.06", "1.1M", "1.4K"],
  ];
  const videoMetadata = [
    ["A Tier", "Nadia"],
    ["A Tier", "Nadia"],
    ["B Tier", "Delvi"],
    ["A Tier", "Shafi"],
    ["S Tier", "Nadia"],
    ["B Tier", "Delvi"],
    ["B Tier", "Shafi"],
    ["A Tier", "Nadia"],
  ];
  const parseVideoMetric = (value: string) => {
    const normalized = value.replace(/,/g, "").trim();
    const multiplier = normalized.endsWith("M") ? 1_000_000 : normalized.endsWith("K") ? 1_000 : 1;
    return (Number.parseFloat(normalized) || 0) * multiplier;
  };
  const videoRecords = videoRows.map((cells, index) => ({
    cells,
    product: cells[2],
    tier: videoMetadata[index][0],
    content: cells[3],
    strategist: videoMetadata[index][1],
    brand: index % 2 === 0 ? "Glowsicha" : "Glad2Glow",
    cost: parseVideoMetric(cells[5]),
    gmv: parseVideoMetric(cells[6]),
    views: parseVideoMetric(cells[8]),
  }));
  const videoGroupValue = (record: (typeof videoRecords)[number]) => {
    if (videoTab === "tier") return record.tier;
    if (videoTab === "content") return record.content;
    if (videoTab === "strategist") return record.strategist;
    if (videoTab === "brand") return record.brand;
    return record.product;
  };
  const groupedVideoRows = videoTab === "video" ? [] : Array.from(new Set(videoRecords.map(videoGroupValue))).map((name) => {
    const items = videoRecords.filter((record) => videoGroupValue(record) === name);
    const cost = items.reduce((sum, record) => sum + record.cost, 0);
    const gmv = items.reduce((sum, record) => sum + record.gmv, 0);
    const views = items.reduce((sum, record) => sum + record.views, 0);
    return { name, items, cost, gmv, views, roi: gmv / Math.max(cost, 1), cpm: (cost / Math.max(views, 1)) * 1000 };
  });
  const summarizeVideoItems = (items: typeof videoRecords) => {
    const cost = items.reduce((sum, record) => sum + record.cost, 0);
    const gmv = items.reduce((sum, record) => sum + record.gmv, 0);
    const views = items.reduce((sum, record) => sum + record.views, 0);
    return { cost, gmv, views, roi: gmv / Math.max(cost, 1), cpm: (cost / Math.max(views, 1)) * 1000 };
  };
  const videoGroupHeading = videoTab === "tier"
    ? label("达人等级", "Creator Tier", language)
    : videoTab === "content"
      ? label("内容类型", "Content Type", language)
      : videoTab === "strategist"
        ? "KOL Strategist"
        : videoTab === "brand"
          ? label("品牌", "Brand", language)
        : label("产品名称", "Product Name", language);
  const renderVideoDetailRows = (records: typeof videoRecords) => records.map((record) => <tr key={record.cells[0]}>{record.cells.map((value, index) => <td key={`${record.cells[0]}-${index}`}>{index < 2 ? <button className="video-data-link">{value}</button> : value}</td>)}</tr>);
  const renderLegacyProgressCells = (row: DashboardBreakdown) => {
    const postPace = percent(row.postMtd, row.postTarget) - 100;
    const budgetPace = percent(row.budgetMtd, row.budgetTarget) - 100;
    const pace = (value: number) => <b className={value >= 0 ? "legacy-pace-good" : "legacy-pace-bad"}>{value > 0 ? "+" : ""}{value}%</b>;
    return <>
      <td><b>{row.postTarget}</b></td>
      <td><b>{row.postMtd}</b></td>
      <td>{pace(postPace)}</td>
      <td><b>{formatPublishBudget(row.budgetTarget)}</b></td>
      <td><b>{formatPublishBudget(row.budgetMtd)}</b></td>
      <td>{pace(budgetPace)}</td>
    </>;
  };

  return (
    <div className="page-stack target-dashboard">
      <section className="dashboard-filter">
        {[
          ["country", "国家", "Country", ["ID", "MY", "VN", "TH", "PH"]],
          ["month", "月份", "Month", ["2026-09", "2026-08", "2026-07", "2026-06"]],
          ["brand", "品牌", "Brand", ["", "Glowsicha", "Glad2Glow", "Skintific"]],
          ["owner", "负责人", "KOL Strategist", ["", "Nadia", "Delvi", "Shafi", "Cilla"]],
        ].map(([key, zh, en, options]) => (
          <label key={String(key)}><span>{label(String(zh), String(en), language)}</span><select value={filters[String(key) as keyof typeof filters]} onChange={(event) => setFilters((current) => ({ ...current, [String(key)]: event.target.value }))}>{(options as string[]).map((option) => <option key={option || "all"} value={option}>{option || label("多选", "Multiple", language)}</option>)}</select></label>
        ))}
        <div className="filter-actions">
          <button className="button primary" onClick={() => notify(label("Dashboard 已按条件刷新", "Dashboard filters applied", language))}><Search size={14} />{label("搜索", "Search", language)}</button>
          <button className="button ghost" onClick={() => setFilters({ country: "ID", month: "2026-09", brand: "", owner: "" })}><RefreshCcw size={14} />{label("重置", "Reset", language)}</button>
        </div>
      </section>

      {version31 && <div className="dashboard-section-row reference-dashboard-grid single-dashboard-column post-plan-dashboard-grid">
        <section className="panel progress-panel post-plan-summary-panel">
          <div className="section-caption"><span />Post Plan</div>
          <div className="progress-pair">
            <ProgressSummary title="Post" post={selectedPostPlanSummary.postCount} plan={selectedPostPlanSummary.planCount} target={selectedPostPlanSummary.targetCount} tone="green" language={language} actualLabel="Post" planLabel="Plan" gapLabel="Post GAP" paceLabel="Post Pace" />
            <ProgressSummary title="Budget" post={selectedPostPlanSummary.postAmount} plan={selectedPostPlanSummary.planAmount} target={selectedPostPlanSummary.targetAmount} tone="amber" language={language} actualLabel="Budget" planLabel="Plan" gapLabel="Budget GAP" paceLabel="Budget Pace" />
          </div>
          <div className="dashboard-tabs">
            {tabs.map(([key, zh, en]) => <button key={key} className={postPlanTab === key ? "active" : ""} onClick={() => setPostPlanTab(key)}>{label(zh, en, language)}</button>)}
          </div>
          <div className="data-table-wrap dashboard-table-wrap">
            <table className="data-table dashboard-table">
              <colgroup><col className="dashboard-select-col" /><col className="breakdown-col" /><col className="post-target-col" /><col className="post-remaining-col" /><col className="post-pace-col" /><col className="budget-target-col" /><col className="budget-remaining-col" /><col className="budget-pace-col" /></colgroup>
              <thead><tr><th rowSpan={2} className="dashboard-select-header"><LinkedSelectionCheckbox {...postPlanSelectionState(allPostPlanEntryKeys)} ariaLabel={label("全选 Post Plan", "Select all Post Plans", language)} onChange={(checked) => updatePostPlanSelection(allPostPlanEntryKeys, checked)} /></th><th rowSpan={2}>{label("拆分维度", "Breakdown", language)}</th><th colSpan={3}>Post</th><th colSpan={3}>Budget</th></tr><tr><th>Post / Plan / Target</th><th>Post GAP</th><th>Progress</th><th>Budget / Plan / Target</th><th>Budget GAP</th><th>Progress</th></tr></thead>
              <tbody>{paidPlanRows.map((row) => {
                const rowKey = `paid-${postPlanTab}-${row.name}`;
                const isOpen = expandedPostPlans.has(rowKey);
                const children = paidPlanChildrenFor(postPlanTab, row);
                const parentEntryKeys = children.flatMap((child) => child.entryKeys);
                return <Fragment key={rowKey}>
                  <tr className="dashboard-parent-row"><td className="dashboard-select-cell"><LinkedSelectionCheckbox {...postPlanSelectionState(parentEntryKeys)} ariaLabel={`${label("选择", "Select", language)} ${row.name}`} onChange={(checked) => updatePostPlanSelection(parentEntryKeys, checked)} /></td><td><button className="expand-row-button" onClick={() => setExpandedPostPlans((current) => { const next = new Set(current); next.has(rowKey) ? next.delete(rowKey) : next.add(rowKey); return next; })}><ChevronRight size={15} className={isOpen ? "rotate-90" : ""} /><span><strong>{row.name}</strong><small>{row.sub}</small></span></button></td><PostPlanMetricCells row={row} /></tr>
                  {isOpen && children.map((child) => {
                    return <tr className="nested-breakdown" key={`${rowKey}-${child.row.name}`}><td className="dashboard-select-cell"><LinkedSelectionCheckbox {...postPlanSelectionState(child.entryKeys)} ariaLabel={`${label("选择", "Select", language)} ${row.name} / ${child.row.name}`} onChange={(checked) => updatePostPlanSelection(child.entryKeys, checked)} /></td><td><strong>{child.row.name}</strong></td><PostPlanMetricCells row={child.row} /></tr>;
                  })}
                </Fragment>;
              })}</tbody>
            </table>
          </div>
          <div className="post-plan-calendar-module">
            <div className="post-plan-calendar-header"><strong>{postPlanCalendarPeriod === "day" ? label("日历", "Calendar", language) : label("排期", "Schedule", language)}</strong><div className="post-plan-calendar-tabs">{([[
              "month", "月", "Month"], ["week", "周", "Week"], ["day", "日", "Day"]] as const).map(([key, zh, en]) => <button key={key} type="button" className={postPlanCalendarPeriod === key ? "active" : ""} onClick={() => setPostPlanCalendarPeriod(key)}>{label(zh, en, language)}</button>)}</div></div>
            {postPlanCalendarPeriod === "day"
              ? <PostPlanCalendar entries={postPlanTab === "tier" ? selectedPlanEntries.filter((entry) => isAllowedCreatorTier(entry.tier)) : selectedPlanEntries} month={filters.month} period="day" language={language} today={today} publishedPlanKeys={publishedPlanKeys} onNavigate={onNavigate} />
              : <div className="post-plan-schedule-views">
                <div className="post-plan-schedule-view"><PostPlanScheduleChart entries={selectedPlanEntries} period={postPlanCalendarPeriod} language={language} today={today} dimension="status" dimensionLabel={label("Post Status", "Post Status", language)} publishedPlanKeys={publishedPlanKeys} heading="Post Status" metric="quantity" visibleStatuses={["planned", "overdue", "completed"]} /></div>
                <div className="post-plan-schedule-view"><PostPlanScheduleChart entries={postPlanTab === "tier" ? selectedPlanEntries.filter((entry) => isAllowedCreatorTier(entry.tier)) : selectedPlanEntries} period={postPlanCalendarPeriod} language={language} today={today} dimension={postPlanTab} dimensionLabel={currentPostPlanDimensionLabel} publishedPlanKeys={publishedPlanKeys} heading="Payment Pivot" metric="quantity" stackBy="dimension" /></div>
              </div>}
          </div>
        </section>
      </div>}

      <div className="dashboard-section-row reference-dashboard-grid single-dashboard-column">
        <section className={`panel progress-panel${version31 ? "" : " legacy-publishing-progress-panel"}`}>
          <div className="section-caption"><span />{version31 ? "Publish Plan" : label("发布进度", "Publish Progress", language)}</div>
          <div className="progress-pair">
            {version31 ? <>
              <LegacyProgressSummary title={label("发布数量", "Post", language)} post={postMtd} payment={postPlanSummary.paidCount} target={postTarget} tone="green" showPayment={false} />
              <LegacyProgressSummary title="Price" post={budgetMtd} payment={postPlanSummary.paidAmount} target={budgetTarget} suffix="IDR " tone="amber" showPayment={false} />
            </> : <>
              <PublishProgressSummary title="Post" actual={postMtd} target={postTarget} tone="post" />
              <PublishProgressSummary title="Budget" actual={budgetMtd} target={budgetTarget} formatValue={formatPublishBudget} tone="budget" />
            </>}
          </div>
          <div className="dashboard-tabs">
            {tabs.map(([key, zh, en]) => <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>{label(zh, en, language)}</button>)}
          </div>
          <div className={`data-table-wrap dashboard-table-wrap${version31 ? "" : " legacy-publish-table-wrap"}`}>
            <table className={`data-table dashboard-table${version31 ? "" : " legacy-publish-table"}`}>
              <colgroup>{version31 ? <>
                <col className="breakdown-col" />
                <col className="post-target-col" />
                <col className="post-remaining-col" />
                <col className="post-pace-col" />
                <col className="budget-target-col" />
                <col className="budget-remaining-col" />
                <col className="budget-pace-col" />
              </> : <>
                <col className="legacy-publish-name-col" />
                <col className="legacy-publish-value-col" />
                <col className="legacy-publish-value-col" />
                <col className="legacy-publish-pace-col" />
                <col className="legacy-publish-value-col" />
                <col className="legacy-publish-value-col" />
                <col className="legacy-publish-pace-col" />
              </>}</colgroup>
              <thead>
                {version31 ? <>
                  <tr><th rowSpan={2}>{label("拆分维度", "Breakdown", language)}</th><th colSpan={3}>Post</th><th colSpan={3}>Budget</th></tr>
                  <tr><th>MTD / Target</th><th>{label("剩余", "Remaining", language)}</th><th>MTD / Pace</th><th>MTD / Target</th><th>{label("剩余", "Remaining", language)}</th><th>MTD / Pace</th></tr>
                </> : <>
                  <tr><th rowSpan={2}>{label("产品 / 达人等级", "Product / Tier", language)}</th><th colSpan={3}>Post</th><th colSpan={3}>Budget</th></tr>
                  <tr><th>Target</th><th>MTD</th><th>Pace</th><th>Target</th><th>MTD</th><th>Pace</th></tr>
                </>}
              </thead>
              <tbody>
                {rows.map((row) => {
                  const postRate = percent(row.postMtd, row.postTarget);
                  const budgetRate = percent(row.budgetMtd, row.budgetTarget);
                  const postPace = postRate - 57;
                  const budgetPace = budgetRate - 57;
                  const rowKey = `${tab}-${row.name}`;
                  const isOpen = expandedProgress.has(rowKey);
                  const children = childrenFor(tab, row);
                  return <Fragment key={rowKey}>
                    <tr className="dashboard-parent-row">
                      <td><button className="expand-row-button" onClick={() => setExpandedProgress((current) => { const next = new Set(current); next.has(rowKey) ? next.delete(rowKey) : next.add(rowKey); return next; })}><ChevronRight size={15} className={isOpen ? "rotate-90" : ""} /><span><strong>{row.name}</strong></span></button></td>
                      {version31 ? <>
                        <td><b>{row.postMtd}/{row.postTarget}</b></td>
                        <td>{Math.max(row.postTarget - row.postMtd, 0)}</td>
                        <td><div className="dashboard-rate"><span>MTD <b>{postRate}%</b></span><em className={postPace >= -5 ? "good" : "bad"}>PACE {postPace > 0 ? "+" : ""}{postPace}%</em></div><div className="micro-progress"><i style={{ width: `${Math.min(postRate, 100)}%` }} /></div></td>
                        <td><b>IDR {compactNumber(row.budgetMtd)}/{compactNumber(row.budgetTarget)}</b></td>
                        <td>IDR {compactNumber(Math.max(row.budgetTarget - row.budgetMtd, 0))}</td>
                        <td><div className="dashboard-rate"><span>MTD <b>{budgetRate}%</b></span><em className={budgetPace >= -5 ? "good" : "warn"}>PACE {budgetPace > 0 ? "+" : ""}{budgetPace}%</em></div><div className="micro-progress amber"><i style={{ width: `${Math.min(budgetRate, 100)}%` }} /></div></td>
                      </> : renderLegacyProgressCells(row)}
                    </tr>
                    {isOpen && children.map((child) => {
                      const childPostRate = percent(child.postMtd, child.postTarget);
                      const childBudgetRate = percent(child.budgetMtd, child.budgetTarget);
                      const childKey = `${rowKey}-${child.name}`;
                      const childOpen = expandedProgress.has(childKey);
                      const grandChildren = tab === "brand" ? childrenFor("product", child) : [];
                      return <tr className="nested-breakdown" key={`${rowKey}-${child.name}`}>
                        <td><button className="expand-row-button nested" disabled={!grandChildren.length} onClick={() => setExpandedProgress((current) => { const next = new Set(current); next.has(childKey) ? next.delete(childKey) : next.add(childKey); return next; })}><ChevronRight size={13} className={childOpen ? "rotate-90" : ""} /><strong>{child.name}</strong></button></td>
                        {version31 ? <>
                          <td><b>{child.postMtd}/{child.postTarget}</b></td>
                          <td>{Math.max(child.postTarget - child.postMtd, 0)}</td>
                          <td><div className="dashboard-rate"><span>MTD <b>{childPostRate}%</b></span></div><div className="micro-progress"><i style={{ width: `${Math.min(childPostRate, 100)}%` }} /></div></td>
                          <td><b>IDR {compactNumber(child.budgetMtd)}/{compactNumber(child.budgetTarget)}</b></td>
                          <td>IDR {compactNumber(Math.max(child.budgetTarget - child.budgetMtd, 0))}</td>
                          <td><div className="dashboard-rate"><span>MTD <b>{childBudgetRate}%</b></span></div><div className="micro-progress amber"><i style={{ width: `${Math.min(childBudgetRate, 100)}%` }} /></div></td>
                        </> : renderLegacyProgressCells(child)}
                      </tr>;
                    })}
                    {isOpen && tab === "brand" && children.flatMap((child) => {
                      const childKey = `${rowKey}-${child.name}`;
                      if (!expandedProgress.has(childKey)) return [];
                      return childrenFor("product", child).map((grandChild) => {
                        const grandPostRate = percent(grandChild.postMtd, grandChild.postTarget);
                        const grandBudgetRate = percent(grandChild.budgetMtd, grandChild.budgetTarget);
                        return <tr className="nested-breakdown depth-2" key={`${childKey}-${grandChild.name}`}>
                          <td><strong>{grandChild.name}</strong></td>
                          {version31 ? <>
                            <td><b>{grandChild.postMtd}/{grandChild.postTarget}</b></td>
                            <td>{Math.max(grandChild.postTarget - grandChild.postMtd, 0)}</td>
                            <td><div className="dashboard-rate"><span>MTD <b>{grandPostRate}%</b></span></div><div className="micro-progress"><i style={{ width: `${Math.min(grandPostRate, 100)}%` }} /></div></td>
                            <td><b>IDR {compactNumber(grandChild.budgetMtd)}/{compactNumber(grandChild.budgetTarget)}</b></td>
                            <td>IDR {compactNumber(Math.max(grandChild.budgetTarget - grandChild.budgetMtd, 0))}</td>
                            <td><div className="dashboard-rate"><span>MTD <b>{grandBudgetRate}%</b></span></div><div className="micro-progress amber"><i style={{ width: `${Math.min(grandBudgetRate, 100)}%` }} /></div></td>
                          </> : renderLegacyProgressCells(grandChild)}
                        </tr>;
                      });
                    })}
                  </Fragment>;
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="dashboard-section-row">
      <section className="panel results-panel">
        <div className="section-caption results-caption">
          <span />{label("发布结果", "Publishing Results", language)}
          <button className="section-collapse-button" onClick={() => setResultOpen((value) => !value)}>{resultOpen ? label("收起明细", "Hide Breakdown", language) : label("展开明细", "Show Breakdown", language)}<ChevronDown size={14} className={resultOpen ? "rotate" : ""} /></button>
        </div>
        <div className="result-metric-grid">
          {summaryMetrics.map((metric) => <article className={`result-metric-card ${metricTone(metric.rate)}`} key={metric.name}><span>{metric.name}</span><strong>{metric.value}</strong><small>Target {metric.target}</small><div><b>{metric.rate}%</b><div className="micro-progress"><i style={{ width: `${Math.min(metric.rate, 100)}%` }} /></div></div><em className={metric.trend.startsWith("+") || metric.name === "CPM" ? "good" : "warn"}>{metric.trend} {label("较上月", "vs last month", language)}</em></article>)}
        </div>
        {resultOpen && (
          <div className="results-breakdown">
            <div className="breakdown-heading tabs-only">
              <div className="dashboard-tabs">{tabs.map(([key, zh, en]) => <button key={key} className={resultTab === key ? "active" : ""} onClick={() => setResultTab(key)}>{label(zh, en, language)}</button>)}</div>
            </div>
            <div className="breakdown-card-list">{breakdownRows.map((row) => {
              const resultKey = `${resultTab}-${row.name}`;
              const isExpanded = expandedResults.has(resultKey);
              return <article className="breakdown-result-card" key={resultKey}>
                <header><h4>{row.name}</h4><button onClick={() => setExpandedResults((current) => { const next = new Set(current); next.has(resultKey) ? next.delete(resultKey) : next.add(resultKey); return next; })}>{isExpanded ? label("收起", "Collapse", language) : label("展开", "Expand", language)}<ChevronDown size={14} className={isExpanded ? "rotate" : ""} /></button></header>
                <div className="breakdown-metrics">{breakdownMetrics(row).map((metric) => <div className={`breakdown-metric ${metricTone(metric.rate)}`} key={metric.name}><small>{metric.name}</small><strong>{metric.value}</strong><span>Target {metric.target}</span><div><b>{metric.rate}%</b><div className="micro-progress"><i style={{ width: `${Math.min(metric.rate, 100)}%` }} /></div></div></div>)}</div>
                {isExpanded && <div className="result-child-list">{childrenFor(resultTab, row).map((child) => <article className="result-child-card" key={`${resultKey}-${child.name}`}><header><ChevronRight size={14} /><div><strong>{child.name}</strong><small>{child.sub}</small></div></header><div className="breakdown-metrics child-breakdown-metrics">{breakdownMetrics(child).map((metric) => <div className={`breakdown-metric ${metricTone(metric.rate)}`} key={metric.name}><small>{metric.name}</small><strong>{metric.value}</strong><span>Target {metric.target}</span><div><b>{metric.rate}%</b><div className="micro-progress"><i style={{ width: `${Math.min(metric.rate, 100)}%` }} /></div></div></div>)}</div></article>)}</div>}
              </article>;
            })}</div>
          </div>
        )}
      </section>
      </div>

      <div className="dashboard-section-row">
        <section className="panel video-publishing-panel">
          <div className="section-caption"><span />{label("视频发布清单", "Video Publishing List", language)}</div>
          <div className="meeting-period"><strong>{label("会议周期", "Meeting Period", language)}</strong>{[["MTD", "7/1–7/31"], ["Week 1", "6/29–7/5"], ["Week 2", "7/6–7/12"], ["Week 3", "7/13–7/19"], ["Week 4", "7/20–7/26"], ["Week 5", "7/27–8/2 MTD"]].map(([name, date]) => <button key={name} className={videoPeriod === name ? "active" : ""} onClick={() => setVideoPeriod(name)}><b>{name}</b><span>{date}</span></button>)}</div>
          <div className="video-kpi-strip">{videoMetrics.map(([name, value]) => <div key={name}><span>{name}</span><strong>{value}</strong></div>)}</div>
          <div className="video-dimension-tabs">{videoTabs.map(([key, zh, en]) => <button key={key} className={videoTab === key ? "active" : ""} onClick={() => setVideoTab(key)}>{label(zh, en, language)}</button>)}</div>
          <div className="data-table-wrap video-list-wrap">
            {videoTab === "video" ? <table className="data-table video-publishing-table">
              <colgroup><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /></colgroup>
              <thead><tr><th>Video ID</th><th>{label("达人名称", "Creator Name", language)}</th><th>{label("产品名称", "Product Name", language)}</th><th>Content</th><th>Post Date</th><th>Video Cost</th><th>GMV</th><th>ROI</th><th>VV</th><th>CPM</th></tr></thead>
              <tbody>{renderVideoDetailRows(videoRecords)}</tbody>
            </table> : <table className="data-table video-group-table">
              <colgroup><col /><col /><col /><col /><col /><col /><col /></colgroup>
              <thead><tr><th aria-label={label("展开", "Expand", language)} /><th>{videoGroupHeading}</th><th>Video Cost</th><th>GMV</th><th>ROI</th><th>VV</th><th>CPM</th></tr></thead>
              <tbody>{groupedVideoRows.map((group) => {
                const groupKey = `${videoTab}:${group.name}`;
                const isExpanded = expandedVideoGroups.has(groupKey);
                return <Fragment key={groupKey}>
                  <tr className="video-group-row">
                    <td><button className="video-group-toggle" aria-label={label(`展开 ${group.name}`, `Expand ${group.name}`, language)} aria-expanded={isExpanded} onClick={() => setExpandedVideoGroups((current) => { const next = new Set(current); next.has(groupKey) ? next.delete(groupKey) : next.add(groupKey); return next; })}><ChevronRight size={14} className={isExpanded ? "rotate-90" : ""} /></button></td>
                    <td><strong>{group.name}</strong></td><td>{compactNumber(group.cost)}</td><td>{compactNumber(group.gmv)}</td><td>{group.roi.toFixed(2)}</td><td>{compactNumber(group.views)}</td><td>{compactNumber(group.cpm)}</td>
                  </tr>
                  {isExpanded && <tr className="video-group-detail-row"><td colSpan={7}><div className="video-group-detail">
                    {videoTab === "product" ? <table className="data-table video-group-table video-tier-table">
                      <colgroup><col /><col /><col /><col /><col /><col /><col /></colgroup>
                      <thead><tr><th aria-label={label("展开", "Expand", language)} /><th>{label("达人等级", "Creator Tier", language)}</th><th>Video Cost</th><th>GMV</th><th>ROI</th><th>VV</th><th>CPM</th></tr></thead>
                      <tbody>{Array.from(new Set(group.items.map((record) => record.tier))).map((tier) => {
                        const tierItems = group.items.filter((record) => record.tier === tier);
                        const tierMetrics = summarizeVideoItems(tierItems);
                        const tierKey = `${groupKey}:tier:${tier}`;
                        const tierExpanded = expandedVideoGroups.has(tierKey);
                        return <Fragment key={tierKey}>
                          <tr className="video-group-row video-tier-row"><td><button className="video-group-toggle" aria-label={label(`展开 ${tier}`, `Expand ${tier}`, language)} aria-expanded={tierExpanded} onClick={() => setExpandedVideoGroups((current) => { const next = new Set(current); next.has(tierKey) ? next.delete(tierKey) : next.add(tierKey); return next; })}><ChevronRight size={14} className={tierExpanded ? "rotate-90" : ""} /></button></td><td><strong>{tier}</strong></td><td>{compactNumber(tierMetrics.cost)}</td><td>{compactNumber(tierMetrics.gmv)}</td><td>{tierMetrics.roi.toFixed(2)}</td><td>{compactNumber(tierMetrics.views)}</td><td>{compactNumber(tierMetrics.cpm)}</td></tr>
                          {tierExpanded && <tr className="video-tier-detail-row"><td colSpan={7}><div className="video-tier-detail"><table className="data-table video-publishing-table"><colgroup><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /></colgroup><thead><tr><th>Video ID</th><th>{label("达人名称", "Creator Name", language)}</th><th>{label("产品名称", "Product Name", language)}</th><th>Content</th><th>Post Date</th><th>Video Cost</th><th>GMV</th><th>ROI</th><th>VV</th><th>CPM</th></tr></thead><tbody>{renderVideoDetailRows(tierItems)}</tbody></table></div></td></tr>}
                        </Fragment>;
                      })}</tbody>
                    </table> : <table className="data-table video-publishing-table"><colgroup><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /></colgroup><thead><tr><th>Video ID</th><th>{label("达人名称", "Creator Name", language)}</th><th>{label("产品名称", "Product Name", language)}</th><th>Content</th><th>Post Date</th><th>Video Cost</th><th>GMV</th><th>ROI</th><th>VV</th><th>CPM</th></tr></thead><tbody>{renderVideoDetailRows(group.items)}</tbody></table>}
                  </div></td></tr>}
                </Fragment>;
              })}</tbody>
            </table>}
          </div>
        </section>
      </div>
    </div>
  );
}

type CreatorWorkspaceTab = "directory" | "selection" | "relationships" | "enablement";

function CreatorManagementPage({
  language,
  rows,
  setRows,
  paymentRows,
  reviewRows,
  canEdit,
  notify,
  onNavigate,
}: {
  language: Language;
  rows: Row[];
  setRows: (next: Row[]) => void;
  paymentRows: Row[];
  reviewRows: Row[];
  canEdit: boolean;
  notify: (message: string) => void;
  onNavigate: (page: PageKey) => void;
}) {
  const [activeTab, setActiveTab] = useState<CreatorWorkspaceTab>("directory");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ country: "", brand: "", tier: "", platform: "", status: "" });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [detailId, setDetailId] = useState<string>("");
  const [addOpen, setAddOpen] = useState(false);
  const [newCreator, setNewCreator] = useState({ creatorName: "", accountId: "", country: "ID", platform: "TikTok", tier: "A", brand: "Glowsicha", category: "Beauty" });
  const fallbackCreators: Row[] = [
    { id: "cr-1", country: "ID", avatar: "MA", accountId: "mamisikembar.1", creatorName: "Mami Si Kembar", brand: "Glowsicha", cooperationDate: "2026-07-21", creatorType: "KOL", category: "Beauty", tier: "A", platform: "TikTok", followersK: 82.6, engagementRate: "4.8%", status: "Active", riskLevel: "Low", relationshipScope: "Brand", candidateStatus: "Active", paymentCount: 4, reviewCount: 12, bankStatus: "Verified", complianceStatus: "Passed", source: "Echotik", lastContact: "2026-08-25", owner: "Delvi" },
    { id: "cr-2", country: "ID", avatar: "PC", accountId: "parasceria", creatorName: "Paras Ceria", brand: "Glowsicha", cooperationDate: "2026-07-18", creatorType: "KOL", category: "Skincare", tier: "B", platform: "TikTok", followersK: 156.2, engagementRate: "3.6%", status: "Active", riskLevel: "Medium", relationshipScope: "Group", candidateStatus: "Candidate", paymentCount: 2, reviewCount: 6, bankStatus: "Pending", complianceStatus: "Review", source: "知虾", lastContact: "2026-08-21", owner: "Shafi" },
    { id: "cr-3", country: "MY", avatar: "SA", accountId: "sharonatas", creatorName: "Sharon Atas", brand: "Glad2Glow", cooperationDate: "2026-06-12", creatorType: "KOL", category: "Makeup", tier: "S", platform: "Instagram", followersK: 482.4, engagementRate: "5.2%", status: "Active", riskLevel: "Low", relationshipScope: "Industry", candidateStatus: "Shortlisted", paymentCount: 6, reviewCount: 18, bankStatus: "Verified", complianceStatus: "Passed", source: "Fastmoss", lastContact: "2026-08-26", owner: "Nadia" },
    { id: "cr-4", country: "ID", avatar: "ZZ", accountId: "zizaakarr", creatorName: "Zizaa Karr", brand: "Skintific", cooperationDate: "2026-05-03", creatorType: "KOC", category: "Beauty", tier: "B", platform: "YouTube", followersK: 64.1, engagementRate: "2.1%", status: "Dormant", riskLevel: "High", relationshipScope: "Brand", candidateStatus: "Hold", paymentCount: 1, reviewCount: 2, bankStatus: "Missing", complianceStatus: "Review", source: "Manual", lastContact: "2026-07-18", owner: "Cilla" },
  ];
  const directory = (rows.length ? rows : fallbackCreators).map((row, index) => ({ ...row, avatar: String(row.avatar || String(row.creatorName || "C").slice(0, 2).toUpperCase()), followersK: numeric(row.followersK), engagementRate: String(row.engagementRate || `${3 + (index % 4) * 0.6}%`), status: String(row.status || "Active"), riskLevel: String(row.riskLevel || "Low"), relationshipScope: String(row.relationshipScope || (index % 3 === 0 ? "Brand" : index % 3 === 1 ? "Group" : "Industry")), candidateStatus: String(row.candidateStatus || "Candidate"), paymentCount: numeric(row.paymentCount), reviewCount: numeric(row.reviewCount), bankStatus: String(row.bankStatus || "Pending"), complianceStatus: String(row.complianceStatus || "Review"), source: String(row.source || "Manual") }));
  const filteredCreators = directory.filter((creator) => {
    const haystack = `${creator.creatorName || ""} ${creator.accountId || ""} ${creator.category || ""}`.toLowerCase();
    return (!query || haystack.includes(query.toLowerCase())) && (!filters.country || String(creator.country) === filters.country) && (!filters.brand || String(creator.brand) === filters.brand) && (!filters.tier || String(creator.tier) === filters.tier) && (!filters.platform || String(creator.platform) === filters.platform) && (!filters.status || String(creator.status) === filters.status);
  });
  const selectedCreators = directory.filter((creator) => selected.has(String(creator.id)));
  const selectedCreator = detailId ? directory.find((creator) => String(creator.id) === detailId) || null : null;
  const paymentCountFor = (creator: Row) => paymentRows.filter((payment) => String(payment.creatorName || "").toLowerCase() === String(creator.creatorName || "").toLowerCase()).length || numeric(creator.paymentCount);
  const reviewCountFor = (creator: Row) => reviewRows.filter((review) => String(review.creatorName || "").toLowerCase() === String(creator.creatorName || "").toLowerCase()).length || numeric(creator.reviewCount);
  const toggleCreator = (id: string) => setSelected((current) => { const next = new Set(current); next.has(id) ? next.delete(id) : next.add(id); return next; });
  const runSelectionAction = (status: string) => {
    if (!selectedCreators.length) return;
    if (rows.length) setRows(rows.map((row) => selected.has(String(row.id)) ? { ...row, candidateStatus: status } : row));
    setSelected(new Set());
    notify(label(`已将 ${selectedCreators.length} 位达人标记为${status}`, `${selectedCreators.length} creator(s) marked ${status}`, language));
  };
  const saveNewCreator = (event: FormEvent) => {
    event.preventDefault();
    if (!newCreator.creatorName.trim() || !newCreator.accountId.trim()) return;
    const next = { id: `creator-${Date.now()}`, ...newCreator, avatar: newCreator.creatorName.slice(0, 2).toUpperCase(), cooperationDate: new Date().toISOString().slice(0, 10), creatorType: "KOL", status: "Active", riskLevel: "Low", relationshipScope: "Brand", candidateStatus: "Candidate", source: "Manual", bankStatus: "Pending", complianceStatus: "Review", updatedAt: new Date().toISOString().slice(0, 16).replace("T", " ") } as Row;
    setRows([...rows, next]);
    setDetailId(String(next.id));
    setAddOpen(false);
    setNewCreator({ creatorName: "", accountId: "", country: "ID", platform: "TikTok", tier: "A", brand: "Glowsicha", category: "Beauty" });
    notify(label("达人档案已创建，等待合规补全", "Creator profile created; compliance completion is pending", language));
  };
  const workspaceTabs: [CreatorWorkspaceTab, string, string][] = [["directory", "达人库", "Directory"], ["selection", "选达人", "Selection"], ["relationships", "关系看板", "Relationships"], ["enablement", "赋能与财务", "Enablement & Finance"]];

  return <div className="page-stack creator-workspace">
    <div className="creator-workspace-tabs">{workspaceTabs.map(([key, zh, en]) => <button key={key} className={activeTab === key ? "active" : ""} onClick={() => setActiveTab(key)}>{label(zh, en, language)}</button>)}</div>
    {(activeTab === "directory" || activeTab === "selection") && <section className="creator-directory-layout"><div className="panel creator-directory-panel"><div className="creator-toolbar"><div className="creator-search"><Search size={14}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={label("搜索达人名、账号、品类", "Search creator, account or category", language)}/></div><div className="creator-filter-row"><select value={filters.country} onChange={(event) => setFilters((current) => ({ ...current, country: event.target.value }))}><option value="">{label("全部国家", "All Countries", language)}</option><option>ID</option><option>MY</option></select><select value={filters.brand} onChange={(event) => setFilters((current) => ({ ...current, brand: event.target.value }))}><option value="">{label("全部品牌", "All Brands", language)}</option><option>Glowsicha</option><option>Glad2Glow</option><option>Skintific</option></select><select value={filters.tier} onChange={(event) => setFilters((current) => ({ ...current, tier: event.target.value }))}><option value="">{label("全部等级", "All Tiers", language)}</option><option>S</option><option>A</option><option>B</option></select><select value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}><option value="">{label("全部状态", "All Status", language)}</option><option>Active</option><option>Dormant</option></select></div><div className="creator-directory-actions"><button className="button ghost" onClick={() => notify(label("外部数据接入任务已进入队列", "External data ingestion queued", language))}><Download size={14}/>{label("同步数据", "Sync Data", language)}</button>{canEdit && <button className="button primary" onClick={() => setAddOpen(true)}><Plus size={14}/>{label("新增达人", "Add Creator", language)}</button>}</div></div><div className="creator-table-wrap"><table className="data-table creator-table"><thead><tr><th className="select-column"><input type="checkbox" checked={filteredCreators.length > 0 && filteredCreators.every((creator) => selected.has(String(creator.id)))} onChange={(event) => setSelected(event.target.checked ? new Set(filteredCreators.map((creator) => String(creator.id))) : new Set())}/></th><th>{label("达人", "Creator", language)}</th><th>{label("国家", "Country", language)}</th><th>{label("品牌", "Brand", language)}</th><th>Platform</th><th>Tier</th><th>{label("粉丝", "Followers", language)}</th><th>ER</th><th>{label("状态", "Status", language)}</th><th>{label("风险", "Risk", language)}</th></tr></thead><tbody>{filteredCreators.map((creator) => <tr key={String(creator.id)} className={detailId === String(creator.id) ? "selected" : ""} onClick={() => setDetailId(String(creator.id))}><td className="select-column"><input type="checkbox" checked={selected.has(String(creator.id))} onClick={(event) => event.stopPropagation()} onChange={() => toggleCreator(String(creator.id))}/></td><td><div className="creator-cell"><span className="creator-avatar">{String(creator.avatar)}</span><span><strong>{String(creator.creatorName)}</strong><small>@{String(creator.accountId)}</small></span></div></td><td>{String(creator.country || "—")}</td><td>{String(creator.brand || "—")}</td><td>{String(creator.platform || "—")}</td><td><b>{String(creator.tier || "—")}</b></td><td>{numeric(creator.followersK).toFixed(1)}K</td><td>{String(creator.engagementRate)}</td><td><span className={`status-badge ${String(creator.status).toLowerCase()}`}>{String(creator.status)}</span></td><td><span className={`risk-dot ${String(creator.riskLevel).toLowerCase()}`}>{String(creator.riskLevel)}</span></td></tr>)}</tbody></table>{!filteredCreators.length && <EmptyState language={language}/>}</div><footer className="creator-table-footer"><span>{label(`${filteredCreators.length} 位达人`, `${filteredCreators.length} creators`, language)}</span>{activeTab === "selection" && <div className="creator-selection-actions"><b>{label(`已选 ${selectedCreators.length} 位`, `${selectedCreators.length} selected`, language)}</b><button className="button ghost" disabled={!selectedCreators.length} onClick={() => runSelectionAction("Shortlisted")}>{label("加入候选池", "Shortlist", language)}</button><button className="button primary" disabled={!selectedCreators.length} onClick={() => runSelectionAction("Approved")}>{label("确认入选", "Approve", language)}</button></div>}</footer></div><aside className="panel creator-detail-panel">{selectedCreator ? <><div className="creator-detail-head"><div className="creator-cell"><span className="creator-avatar large">{String(selectedCreator.avatar)}</span><span><strong>{String(selectedCreator.creatorName)}</strong><small>@{String(selectedCreator.accountId)} · {String(selectedCreator.country)}</small></span></div><span className={`status-badge ${String(selectedCreator.status).toLowerCase()}`}>{String(selectedCreator.status)}</span></div><div className="creator-detail-actions"><button className="button primary" onClick={() => onNavigate("payment31")}><Plus size={13}/>Payment</button><button className="button ghost" onClick={() => onNavigate("review31b")}>Review</button></div><div className="creator-detail-stats"><div><strong>{numeric(selectedCreator.followersK).toFixed(1)}K</strong><small>Followers</small></div><div><strong>{String(selectedCreator.engagementRate)}</strong><small>Engagement</small></div><div><strong>{paymentCountFor(selectedCreator)}</strong><small>Payments</small></div><div><strong>{reviewCountFor(selectedCreator)}</strong><small>Reviews</small></div></div><dl className="creator-detail-list"><div><dt>{label("关系范围", "Scope", language)}</dt><dd>{String(selectedCreator.relationshipScope)}</dd></div><div><dt>{label("负责人", "Owner", language)}</dt><dd>{String(selectedCreator.owner || "—")}</dd></div><div><dt>{label("数据来源", "Source", language)}</dt><dd>{String(selectedCreator.source)}</dd></div><div><dt>{label("银行资料", "Bank", language)}</dt><dd>{String(selectedCreator.bankStatus)}</dd></div><div><dt>{label("合规状态", "Compliance", language)}</dt><dd>{String(selectedCreator.complianceStatus)}</dd></div></dl><div className="creator-detail-section"><strong>{label("下一步", "Next Action", language)}</strong><p>{selectedCreator.complianceStatus === "Passed" ? label("可进入 Payment 计划并继续维护 Review。", "Ready for Payment planning and Review maintenance.", language) : label("先完成银行资料与合规核验，再进入付款流程。", "Complete banking and compliance checks before payment.", language)}</p></div></> : <EmptyState language={language}/>}</aside></section>}
    {detailId && selectedCreator && <CreatorDetailDrawer language={language} creator={selectedCreator} paymentCount={paymentCountFor(selectedCreator)} reviewCount={reviewCountFor(selectedCreator)} onClose={() => setDetailId("")} onNavigate={onNavigate} />}
    {activeTab === "relationships" && <section className="creator-relationship-grid"><div className="panel"><div className="section-caption"><span/>{label("品牌 / 集团关系看板", "Brand / Group Relationship Board", language)}</div><div className="relationship-board">{[["品牌内复用", "Brand Reuse", "同品牌历史合作达人", "Glowsicha", directory.filter((creator) => creator.relationshipScope === "Brand").length], ["集团内复用", "Group Reuse", "跨品牌可复用达人", "3 Brands", directory.filter((creator) => creator.relationshipScope === "Group").length], ["行业拓展", "Industry Expansion", "外部市场待验证达人", "External", directory.filter((creator) => creator.relationshipScope === "Industry").length]].map(([zh, en, note, badge, count]) => <article key={String(en)}><span>{label(String(zh), String(en), language)}</span><strong>{count}</strong><small>{label(String(note), String(note), language)}</small><b>{badge}</b></article>)}</div></div><div className="panel creator-source-panel"><div className="section-caption"><span/>{label("外部数据接入", "External Sources", language)}</div>{[["Echotik", "达人画像、粉丝与内容表现", "Connected"], ["知虾", "竞品合作与行业热度", "Ready"], ["Fastmoss", "TikTok 电商与 GMV 估算", "Ready"]].map(([name, note, status]) => <div className="source-connector" key={name}><div><strong>{name}</strong><small>{label(note, note, language)}</small></div><span>{status}</span><button className="text-button" onClick={() => notify(label(`${name} 数据接入任务已创建`, `${name} ingestion task created`, language))}>{label("接入", "Connect", language)}</button></div>)}</div><div className="panel creator-reuse-table"><div className="section-caption"><span/>{label("复用关系明细", "Reuse Relationship Detail", language)}</div><div className="data-table-wrap"><table className="data-table"><thead><tr><th>Creator</th><th>{label("当前品牌", "Current Brand", language)}</th><th>{label("可复用品牌", "Reusable Brands", language)}</th><th>{label("关系状态", "Relationship", language)}</th></tr></thead><tbody>{directory.slice(0, 6).map((creator) => <tr key={String(creator.id)}><td>{String(creator.creatorName)}</td><td>{String(creator.brand || "—")}</td><td>{String(creator.relationshipScope) === "Group" ? "Glowsicha · Glad2Glow" : String(creator.relationshipScope) === "Industry" ? "待评估" : String(creator.brand || "—")}</td><td><span className="creator-scope-tag">{String(creator.relationshipScope)}</span></td></tr>)}</tbody></table></div></div></section>}
    {activeTab === "enablement" && <section className="creator-enable-grid"><div className="panel"><div className="section-caption"><span/>{label("赋能审批队列", "Enablement Approval Queue", language)}<small>{label("合作、账号、报价与反腐控制", "Collaboration, account, pricing and anti-corruption controls", language)}</small></div><div className="enablement-list">{directory.slice(0, 5).map((creator) => <div className="enablement-row" key={String(creator.id)}><div className="creator-cell"><span className="creator-avatar">{String(creator.avatar)}</span><span><strong>{String(creator.creatorName)}</strong><small>{String(creator.brand || "—")} · {String(creator.tier || "—")} Tier</small></span></div><div><small>{label("合规", "Compliance", language)}</small><b>{String(creator.complianceStatus)}</b></div><div><small>{label("银行", "Bank", language)}</small><b>{String(creator.bankStatus)}</b></div><button className="text-button" onClick={() => notify(label("已打开赋能审批记录", "Enablement approval record opened", language))}>{label("查看", "View", language)}</button></div>)}</div></div><div className="panel creator-control-panel"><div className="section-caption"><span/>{label("流程控制", "Process Controls", language)}</div><ul className="creator-control-list"><li><CheckCircle2 size={15}/><span><strong>{label("主档去重", "Master deduplication", language)}</strong><small>{label("账号、平台、联系方式和收款信息联合识别", "Match account, platform, contact and payment identity", language)}</small></span></li><li><ShieldCheck size={15}/><span><strong>{label("付款前核验", "Pre-payment checks", language)}</strong><small>{label("审批、报价、银行资料与附件齐全后才能付款", "Approval, pricing, bank data and files must pass before pay", language)}</small></span></li><li><LockKeyholeOpen size={15}/><span><strong>{label("反腐留痕", "Anti-corruption audit", language)}</strong><small>{label("报价变更、复用关系和手工覆盖保留操作记录", "Keep an audit trail for price changes, reuse and overrides", language)}</small></span></li></ul><button className="button ghost" onClick={() => notify(label("风控规则检查已完成", "Control rule check completed", language))}>{label("运行风控检查", "Run Control Check", language)}</button></div></section>}
    {addOpen && <Modal title={label("新增达人", "Add Creator", language)} onClose={() => setAddOpen(false)}><form onSubmit={saveNewCreator}><div className="modal-scroll-area"><div className="v11-grid creator-add-grid"><label className="form-field"><span>{label("达人名称", "Creator Name", language)}</span><input required value={newCreator.creatorName} onChange={(event) => setNewCreator((current) => ({ ...current, creatorName: event.target.value }))}/></label><label className="form-field"><span>Account ID</span><input required value={newCreator.accountId} onChange={(event) => setNewCreator((current) => ({ ...current, accountId: event.target.value }))}/></label><label className="form-field"><span>Country</span><select value={newCreator.country} onChange={(event) => setNewCreator((current) => ({ ...current, country: event.target.value }))}><option>ID</option><option>MY</option><option>VN</option></select></label><label className="form-field"><span>Platform</span><select value={newCreator.platform} onChange={(event) => setNewCreator((current) => ({ ...current, platform: event.target.value }))}><option>TikTok</option><option>Instagram</option><option>YouTube</option></select></label><label className="form-field"><span>Tier</span><select value={newCreator.tier} onChange={(event) => setNewCreator((current) => ({ ...current, tier: event.target.value }))}><option>S</option><option>A</option><option>B</option><option>C</option></select></label><label className="form-field"><span>Brand</span><select value={newCreator.brand} onChange={(event) => setNewCreator((current) => ({ ...current, brand: event.target.value }))}><option>Glowsicha</option><option>Glad2Glow</option><option>Skintific</option></select></label><label className="form-field"><span>{label("品类", "Category", language)}</span><input value={newCreator.category} onChange={(event) => setNewCreator((current) => ({ ...current, category: event.target.value }))}/></label></div></div><footer className="modal-footer"><button type="button" className="button ghost" onClick={() => setAddOpen(false)}>{label("取消", "Cancel", language)}</button><button className="button primary" type="submit"><Check size={14}/>{label("保存", "Save", language)}</button></footer></form></Modal>}
  </div>;
}

function BudgetRulePage({
  language,
  store,
  setStore,
  canEdit,
  notify,
}: {
  language: Language;
  store: Record<string, Row[]>;
  setStore: Dispatch<SetStateAction<Record<string, Row[]>>>;
  canEdit: boolean;
  notify: (message: string) => void;
}) {
  const [tab, setTab] = useState("content");
  const option = (value: string, zh = value, en = value) => ({ value, zh, en });
  const configs: Record<string, PageConfig> = {
    content: {
      key: "budgetRule", titleZh: "Budget Rule Config", titleEn: "Budget Rule Config",
      descZh: "配置内容类型与内容角度。", descEn: "Configure content types and content angles.",
      filters: [{ key: "contentType", zh: "内容类型", en: "Content Type", kind: "text" }, { key: "angleName", zh: "内容角度", en: "Content Angle", kind: "text" }],
      fields: [{ key: "contentType", zh: "内容类型名称", en: "Content Type Name", kind: "text" }, { key: "angleName", zh: "内容角度名称", en: "Content Angle Name", kind: "text" }, { key: "status", zh: "状态", en: "Status", kind: "select", options: [option("Approved", "启用", "Enabled"), option("Pending", "停用", "Disabled")] }],
      columns: [{ key: "contentType", zh: "内容类型", en: "Content Type" }, { key: "angleName", zh: "内容角度", en: "Content Angle" }, { key: "status", zh: "状态", en: "Status" }],
      actions: ["add", "edit", "delete", "export"],
    },
    stage: {
      key: "budgetRule", titleZh: "Budget Rule Config", titleEn: "Budget Rule Config",
      descZh: "配置产品生命周期阶段。", descEn: "Configure product lifecycle stages.",
      filters: [{ key: "englishName", zh: "英文名称", en: "English Name", kind: "text" }],
      fields: [{ key: "englishName", zh: "英文名称", en: "English Name", kind: "text" }, { key: "chineseDescription", zh: "中文描述", en: "Chinese Description", kind: "text" }, { key: "status", zh: "状态", en: "Status", kind: "select", options: [option("Approved", "启用", "Enabled"), option("Pending", "停用", "Disabled")] }],
      columns: [{ key: "englishName", zh: "英文名称", en: "English Name" }, { key: "chineseDescription", zh: "中文描述", en: "Chinese Description" }, { key: "status", zh: "状态", en: "Status" }],
      actions: ["add", "edit", "delete", "export"],
    },
    tier: {
      key: "budgetRule", titleZh: "Budget Rule Config", titleEn: "Budget Rule Config",
      descZh: "按国家、达人类型与等级配置预算单价。", descEn: "Configure unit budget by country, creator type and tier.",
      filters: [{ key: "country", zh: "国家", en: "Country", kind: "select", options: ["ID", "MY", "VN", "TH", "PH"].map((value) => option(value)) }, { key: "creatorType", zh: "达人类型", en: "Creator Type", kind: "select", options: ["KOL", "KOC", "Others"].map((value) => option(value)) }],
      fields: [{ key: "country", zh: "国家", en: "Country", kind: "select", options: ["ID", "MY", "VN", "TH", "PH"].map((value) => option(value)) }, { key: "creatorType", zh: "达人类型", en: "Creator Type", kind: "select", options: ["KOL", "KOC", "Others"].map((value) => option(value)) }, { key: "tier", zh: "达人等级", en: "Creator Tier", kind: "select", options: ["S", "A", "B", "C", "D"].map((value) => option(value)) }, { key: "unitPrice", zh: "单价", en: "Unit Price", kind: "number" }, { key: "status", zh: "状态", en: "Status", kind: "select", options: [option("Approved", "启用", "Enabled"), option("Pending", "停用", "Disabled")] }],
      columns: [{ key: "country", zh: "国家", en: "Country" }, { key: "creatorType", zh: "达人类型", en: "Creator Type" }, { key: "tier", zh: "达人等级", en: "Creator Tier" }, { key: "unitPrice", zh: "单价", en: "Unit Price" }, { key: "status", zh: "状态", en: "Status" }],
      actions: ["add", "edit", "delete", "export"],
    },
  };
  return (
    <div className="budget-rule-page">
      <div className="rule-tabs">
        {[["content", "内容类型 / 角度", "Content Type / Angles"], ["stage", "产品阶段", "Product Stage"], ["tier", "达人等级预算", "Creator Tier Budget"]].map(([key, zh, en]) => <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>{label(zh, en, language)}</button>)}
      </div>
      <TablePage key={tab} config={configs[tab]} rows={store[tab] || []} setRows={(next) => setStore((current) => ({ ...current, [tab]: next }))} language={language} canEdit={canEdit} canApprove={false} notify={notify} />
    </div>
  );
}

type Mobile31PageKey = "mobilePayment31" | "mobileReview31" | "mobileDashboard31";
const mobile31BasePage: Record<Mobile31PageKey, PageKey> = {
  mobilePayment31: "payment31",
  mobileReview31: "review31b",
  mobileDashboard31: "dashboard31",
};
const mobile31Menu: [Mobile31PageKey, string, string, LucideIcon][] = [
  ["mobilePayment31", "Payment", "Payment", WalletCards],
  ["mobileReview31", "Review", "Review", FileText],
  ["mobileDashboard31", "Dashboard", "Dashboard", LayoutDashboard],
];

function Mobile31Workspace({
  activePage,
  language,
  rows,
  savePageRows,
  canEdit,
  canApprove,
  approvalPermissions,
  notify,
  onNavigate,
}: {
  activePage: Mobile31PageKey;
  language: Language;
  rows: RowStore;
  savePageRows: (page: PageKey, next: Row[]) => void;
  canEdit: boolean;
  canApprove: boolean;
  approvalPermissions: { supervisor: boolean; ceo: boolean };
  notify: (message: string) => void;
  onNavigate: (page: PageKey) => void;
}) {
  const basePage = mobile31BasePage[activePage];
  const baseConfig = pageConfigs[basePage];
  const content = activePage === "mobileDashboard31" ? (
    <TargetDashboard language={language} targetRows={rows.target1 || []} paymentRows={rows.payment31 || []} reviewRows={rows.review31b || []} notify={notify} onNavigate={onNavigate} version31 />
  ) : baseConfig ? (
    <TablePage
      key={activePage}
      config={baseConfig}
      rows={rows[basePage] || []}
      setRows={(next) => savePageRows(basePage, next)}
      language={language}
      canEdit={canEdit}
      canApprove={canApprove}
      approvalPermissions={approvalPermissions}
      relatedRows={rows.payment31 || []}
      relatedReviewRows={rows.review31b || []}
      notify={notify}
    />
  ) : <EmptyState language={language} />;

  return (
    <div className="page-stack mobile31-workspace">
      <section className="mobile31-header">
        <div>
          <span className="mobile31-kicker">MOBILE WORKSPACE</span>
          <h1>Marketing3.1M</h1>
          <p>{label("Payment、Review、Dashboard 的移动端工作台", "Mobile workspace for Payment, Review and Dashboard", language)}</p>
        </div>
        <nav className="mobile31-switcher" aria-label="Marketing3.1M menu" role="tablist">
          {mobile31Menu.map(([key, zh, en, Icon]) => <button type="button" role="tab" aria-selected={activePage === key} key={key} className={activePage === key ? "active" : ""} onClick={() => onNavigate(key)}><Icon size={15} /><span>{label(zh, en, language)}</span></button>)}
        </nav>
      </section>
      <div className="mobile31-page-content">{content}</div>
    </div>
  );
}

export default function MarketingSystem() {
  const [activePage, setActivePage] = useState<PageKey>("payment31");
  const [language, setLanguage] = useStored<Language>("marketing-v8-language", "zh");
  const [theme, setTheme] = useStored<Theme>("marketing-v8-theme", "dark");
  const [role, setRole] = useStored<RoleKey>("marketing-v8-role", "admin");
  const [rows, setRows] = useStored<RowStore>("marketing-v9-records", initialRows);
  const [budgetRules, setBudgetRules] = useStored<Record<string, Row[]>>("marketing-v8-budget-rules", budgetRuleSeeds);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["versions"]));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState("");
  const [utilityPanel, setUtilityPanel] = useState<"notice" | "help" | null>(null);
  const [toast, setToast] = useState("");

  const roleConfig = roles.find((item) => item.key === role) || roles[roles.length - 1];
  const allowedGroups = menuGroups.filter((group) => roleConfig.groups.includes(group.key));
  const activeGroup = menuGroups.find((group) => group.pages.some((page) => page.key === activePage)) || menuGroups[0];
  const activeItem = activeGroup.pages.find((page) => page.key === activePage) || activeGroup.pages[0];
  const canEdit = roleConfig.canEdit.includes(pageGroup(activePage));
  const canApprove = roleConfig.canApprove.includes(pageGroup(activePage));
  const approvalPermissions = { supervisor: roleConfig.approvalTypes.includes("supervisor"), ceo: roleConfig.approvalTypes.includes("ceo") };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language, theme]);

  useEffect(() => {
    setRows((current) => {
      const storedPayments = current.payment31;
      if (!storedPayments?.length) return current;
      const needsSeptemberDemoMigration = !storedPayments.some((payment) => numeric(payment.dashboardSeptemberDemoVersion) >= 1);
      const storedPaymentNumbers = new Set(storedPayments.map((payment) => String(payment.paymentNo || "")));
      const payments = needsSeptemberDemoMigration
        ? [...storedPayments, ...dashboard31SeptemberPayments.filter((payment) => !storedPaymentNumbers.has(String(payment.paymentNo))).map((payment) => ({ ...payment }))]
        : storedPayments;
      const storedTargets = current.target1 || [];
      const storedTargetNumbers = new Set(storedTargets.map((target) => String(target.targetNo || "")));
      const nextTargets = needsSeptemberDemoMigration
        ? [...storedTargets, ...dashboard31SeptemberTargets.filter((target) => !storedTargetNumbers.has(String(target.targetNo))).map((target) => ({ ...target }))]
        : storedTargets;
      const specialists = ["Nafa Augustina", "Rani Putri", "Mia Kurnia", "Salsa Anindya"];
      const nextPayments = payments.map((payment, index) => {
        const paid = String(payment.sendPayment || payment.paid || "") === "Yes" || Boolean(payment.paymentDate);
        const isDemoPayment = String(payment.paymentNo || "").startsWith("PID20260826");
        const existingPlans = Array.isArray(payment.postPlans) ? payment.postPlans as Record<string, unknown>[] : [];
        const demoMigrationPending = isDemoPayment && numeric(payment.demoPostProgressVersion) < 2;
        const desiredQty = isDemoPayment ? Math.max(numeric(payment.qty), 5 + (index % 4)) : numeric(payment.qty);
        const demoProducts = ["Tone Up Sunscreen", "Day Cream", "Body Scrub", "Serum Spray", "Hair Oil"];
        const demoPlatforms = ["TikTok", "Instagram", "YouTube"];
        const normalizedExistingPlans = demoMigrationPending
          ? existingPlans.map((plan, planIndex) => {
              const tierValue = [plan.rate, plan.tier, plan.rateTier, payment.rate, payment.rateTier]
                .find((value) => value && !["Unrated", "未分级"].includes(String(value))) || (numeric(payment.unitPrice) >= 300000 ? "A" : "B");
              return {
                ...plan,
                postNo: plan.postNo || planIndex + 1,
                reviewId: plan.reviewId || `RID${String(payment.paymentNo || "PID20260826")}${String(plan.postNo || planIndex + 1).padStart(2, "0")}`,
                rate: tierValue,
                product: plan.product || payment.product || demoProducts[(index + planIndex + 1) % demoProducts.length],
              };
            })
          : existingPlans;
        const demoPlans = demoMigrationPending && existingPlans.length < desiredQty
          ? [
              ...normalizedExistingPlans,
              ...Array.from({ length: desiredQty - normalizedExistingPlans.length }, (_, extraIndex) => {
                const postNo = normalizedExistingPlans.length + extraIndex + 1;
                return {
                  postNo,
                  strategist: payment.owner || "",
                  reviewId: `RID${String(payment.paymentNo || "PID20260826")}${String(postNo).padStart(2, "0")}`,
                  platform: demoPlatforms[(index + postNo) % demoPlatforms.length],
                  contentType: ["Vlog", "TTS", "Photoslide", "Livetalk"][postNo % 4],
                  contentAngle: ["Review", "Tutorial", "Lifestyle", "Before & After"][postNo % 4],
                  planningPostDate: index === 3 || index === 6
                    ? `2026-08-${String(12 + (postNo - 1) * 2).padStart(2, "0")}`
                    : `2026-09-${String(5 + ((index + postNo) % 5) * 3).padStart(2, "0")}`,
                  eachPrice: String(payment.unitPrice || 0),
                  rate: numeric(payment.unitPrice) >= 300000 ? "A" : "B",
                  product: demoProducts[(index + postNo) % demoProducts.length],
                  yellowCart: "No",
                  boostCode: "",
                  owning: "",
                  sparkStatus: "not Provided",
                };
              }),
            ]
          : existingPlans;
        return {
          ...payment,
          createdAt: payment.createdAt || `2026-08-${String(20 + (index % 9)).padStart(2, "0")}`,
          kolSpecialist: payment.kolSpecialist || specialists[index % specialists.length],
          supervisor: payment.supervisor || "Desy Chintya",
          department: payment.department || "Marketing ID",
          followersK: payment.followersK || 42.5 + index * 18.4,
          ownContent: payment.ownContent || "No",
          platform: payment.platform || ["TikTok", "Instagram", "YouTube"][index % 3],
          contentType: payment.contentType || ["Vlog", "TTS", "Photoslide", "Livetalk"][index % 4],
          rateTier: payment.rateTier || ["A", "B", "S", "C"][index % 4],
          gracePeriod: payment.gracePeriod || 15,
          actualPostDate: payment.actualPostDate || (paid ? `2026-08-${String(12 + index).padStart(2, "0")}` : ""),
          qtyMismatch: payment.qtyMismatch || "No",
          progress: payment.progress || (paid ? "Published" : "Planning"),
          notes: payment.notes ?? "",
          paymentBank: payment.paymentBank || "GST",
          bankName: payment.bankName || ["Seabank", "BCA", "BRI"][index % 3],
          accountName: payment.accountName || `${String(payment.creatorName || "Creator")} Creator`,
          bankAccount: payment.bankAccount || `901804750${String(996 + index).padStart(3, "0")}`,
          idNumber: payment.idNumber || `6305044607080${String(8000 + index).padStart(4, "0")}`,
          idName: payment.idName || payment.creatorName || "Creator",
          invoiceFiles: payment.invoiceFiles || (index % 2 === 0 ? "PDF" : "-"),
          paid: payment.paid || (paid ? "Yes" : "No"),
          paymentProof: payment.paymentProof || (paid ? "PDF" : "-"),
          agreement: payment.agreement || (index % 3 === 0 ? "PDF" : "-"),
          negotiation: payment.negotiation || (index % 4 === 0 ? "PDF" : "-"),
          invoiceVerified: payment.invoiceVerified || payment.invoiceChecked || "Pending",
          financeNotes: payment.financeNotes || payment.financeNote || "",
          process: payment.process || (paid ? "Paid" : "Planning"),
          status: payment.status || (paid ? "In Progress" : "Pending"),
          qtyConsistent: payment.qtyConsistent || "Yes",
          source: payment.source || "Manual",
          picIsMe: payment.picIsMe ?? String(payment.owner || "") === "Ajeng Salma Nadhifa Fitriani",
          supervisorIsMe: payment.supervisorIsMe ?? String(payment.supervisor || "") === "Desy Chintya",
          ...(needsSeptemberDemoMigration && index === 0 ? { dashboardSeptemberDemoVersion: 1 } : {}),
          ...(demoMigrationPending ? {
            qty: demoPlans.length || payment.qty,
            totalPrice: (demoPlans.length || numeric(payment.qty)) * numeric(payment.unitPrice),
            reviewQty: demoPlans.length || payment.reviewQty,
            postPlans: demoPlans,
            demoPostProgressVersion: 2,
          } : {}),
        };
      });
      const changed = nextPayments.length !== storedPayments.length || nextPayments.some((payment, index) => !storedPayments[index] || Object.keys(payment).some((key) => payment[key] !== storedPayments[index][key]));
      const storedReviews = current.review31b || [];
      const storedReviewKeys = new Set(storedReviews.map((review) => `${String(review.paymentNo || "")}|${String(review.postNo || "")}`));
      const reviews = needsSeptemberDemoMigration
        ? [...storedReviews, ...dashboard31SeptemberReviews.filter((review) => !storedReviewKeys.has(`${String(review.paymentNo || "")}|${String(review.postNo || "")}`)).map((review) => ({ ...review, id: Number(review.id) + 1000 }))]
        : storedReviews;
      const nextReviews = reviews.map((review, index) => {
        const payment = nextPayments.find((item) => String(item.paymentNo || "") === String(review.paymentNo || ""));
        const paymentIndex = nextPayments.findIndex((item) => String(item.paymentNo || "") === String(review.paymentNo || ""));
        const plan = Array.isArray(payment?.postPlans)
          ? (payment.postPlans as Record<string, unknown>[]).find((item) => String(item.postNo || "") === String(review.postNo || ""))
          : undefined;
        const isDemoPayment = String(payment?.paymentNo || "").startsWith("PID20260826");
        const postNo = numeric(review.postNo);
        const shouldDemoPublish = isDemoPayment && paymentIndex >= 0 && paymentIndex % 3 === 0 && postNo > 0 && postNo <= 3;
        const hasPostId = Boolean(String(review.postId || "").trim());
        const demoPostId = shouldDemoPublish
          ? (hasPostId ? String(review.postId) : `76774464559797${24040 + paymentIndex * 10 + postNo - 1}`)
          : "";
        const demoActualPostDate = shouldDemoPublish && !String(review.actualPostDate || review.postDate || "").trim()
          ? `2026-08-${String(12 + paymentIndex + postNo).padStart(2, "0")}`
          : "";
        const source = String(payment?.source || "") === "Manual" ? "GST" : "Private";
        return {
          ...review,
          country: review.country || payment?.country || "ID",
          brand: review.brand || payment?.brand || "",
          owner: review.owner || payment?.owner || "",
          kolSpecialist: review.kolSpecialist || payment?.kolSpecialist || "",
          ownerDept: review.ownerDept || payment?.department || "",
          supervisor: review.supervisor || payment?.supervisor || "",
          submitter: review.submitter || payment?.submitter || "",
          department: review.department || payment?.department || "",
          createdAt: review.createdAt || payment?.createdAt || `2026-08-${String(20 + (index % 9)).padStart(2, "0")}`,
          eachPrice: review.eachPrice || plan?.eachPrice || payment?.unitPrice || "",
          ranking: review.ranking || (index % 4 === 0 ? "Top" : "Normal"),
          targetTraffic: review.targetTraffic || (index % 3 === 0 ? "No" : "Yes"),
          shouldCpm: review.shouldCpm || (index % 2 === 0 ? "Yes" : "No"),
          picIsMe: review.picIsMe ?? payment?.picIsMe ?? String(review.owner || "") === "Ajeng Salma Nadhifa Fitriani",
          sparkCodeNotice: review.sparkCodeNotice || (index % 5 === 0 ? "Yes" : "No"),
          sparkAdsStatus: normalizeReviewSparkAdsStatus(review.sparkAdsStatus || (review.postId ? "Done" : ["Required", "Yes"].includes(String(plan?.sparkStatus || "")) ? "Done" : "None")),
          postStatus: normalizeReviewPostStatus(review.postStatus || "Normal"),
          source: review.source || source,
          ...(shouldDemoPublish ? {
            postId: demoPostId,
            postLink: `https://www.tiktok.com/@${String(review.creatorName || payment?.creatorName || "creator")}/video/${demoPostId}`,
            actualPostDate: demoActualPostDate || review.actualPostDate || review.postDate || `2026-08-${String(12 + paymentIndex + postNo).padStart(2, "0")}`,
          } : {}),
        };
      });
      const existingReviewKeys = new Set(nextReviews.map((review) => `${String(review.paymentNo || "")}|${String(review.postNo || "")}`));
      const generatedDemoReviews = nextPayments.flatMap((payment, paymentIndex) => {
        if (!String(payment.paymentNo || "").startsWith("PID20260826")) return [];
        const plans = Array.isArray(payment.postPlans) ? payment.postPlans as Record<string, unknown>[] : [];
        return plans.filter((plan) => !existingReviewKeys.has(`${String(payment.paymentNo || "")}|${String(plan.postNo || "")}`)).map((plan) => ({
          id: 43000 + paymentIndex * 100 + numeric(plan.postNo),
          reviewNo: String(plan.reviewId || `RID${String(payment.paymentNo || "")}${String(plan.postNo || "")}`),
          paymentNo: String(payment.paymentNo || ""),
          postNo: String(plan.postNo || ""),
          creatorName: payment.creatorName,
          country: payment.country || "ID",
          brand: payment.brand,
          owner: payment.owner,
          kolSpecialist: payment.kolSpecialist,
          supervisor: payment.supervisor,
          submitter: payment.submitter,
          ownerDept: payment.department,
          department: payment.department,
          platform: plan.platform,
          contentType: plan.contentType,
          contentAngle: plan.contentAngle,
          product: plan.product,
          planningPostDate: plan.planningPostDate,
          postId: "",
          postLink: "",
          actualPostDate: "",
          createdAt: payment.createdAt,
          eachPrice: plan.eachPrice ?? payment.unitPrice ?? "",
          ranking: "Normal",
          targetTraffic: "Yes",
          shouldCpm: "No",
          picIsMe: payment.picIsMe,
          sparkCodeNotice: "No",
          sparkAdsStatus: "None",
          postStatus: "Normal",
          linkStatus: "Linked",
          source: payment.source,
          postPlans: payment.postPlans,
        }));
      });
      const mergedReviews = [...nextReviews, ...generatedDemoReviews];
      const reviewsChanged = mergedReviews.length !== storedReviews.length || mergedReviews.some((review, index) => !storedReviews[index] || Object.keys(review).some((key) => review[key] !== storedReviews[index][key]));
      const targetsChanged = nextTargets.length !== storedTargets.length;
      return changed || reviewsChanged || targetsChanged ? { ...current, target1: nextTargets, payment31: nextPayments, review31b: mergedReviews } : current;
    });
  }, [rows, setRows]);

  useEffect(() => {
    if (!roleConfig.groups.includes(pageGroup(activePage))) setActivePage("home");
  }, [activePage, roleConfig.groups, setActivePage]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  function navigate(page: PageKey) {
    setActivePage(page);
    setSidebarOpen(false);
    setExpanded((current) => new Set([...current, pageGroup(page)]));
  }

  function toggleGroup(group: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  }

  function runQuickSearch(event: FormEvent) {
    event.preventDefault();
    const query = quickSearch.trim().toLowerCase();
    if (!query) return;
    const match = allowedGroups.flatMap((group) => group.pages).find((page) => `${page.zh} ${page.en}`.toLowerCase().includes(query));
    if (match) {
      navigate(match.key);
      setQuickSearch("");
      setQuickSearchOpen(false);
    } else {
      notify(label("没有找到对应页面", "No matching page found", language));
    }
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }

  const ActivePageIcon = pageIcons[activePage] || FileText;
  const activeConfig = pageConfigs[activePage];
  const pageRows = rows[activePage] || [];

  function savePageRows(page: PageKey, next: Row[]) {
    setRows((current) => {
      const nextStore = { ...current, [page]: next };
      if (page !== "payment31") return nextStore;

      const generated = next.flatMap((payment) => {
        if (!Array.isArray(payment.generatedReviews)) return [];
        return payment.generatedReviews.map((review, index) => {
          const reviewRow = review as Row;
          const paymentNo = String(payment.paymentNo || reviewRow.paymentNo || "");
          return {
            id: reviewRow.id || `${payment.id}-review-${index + 1}`,
            country: payment.country,
            creatorName: payment.creatorName,
            brand: payment.brand,
            owner: payment.owner,
            supervisor: payment.supervisor,
            submitter: payment.submitter,
            department: payment.department,
            unitPrice: payment.unitPrice,
            totalPrice: payment.totalPrice,
            expectedPostDate: payment.expectedPostDate,
            ...reviewRow,
            paymentNo,
            reviewNo: String(reviewRow.reviewNo || `RID${Date.now()}${index + 1}`),
            postPlans: payment.postPlans,
          } as Row;
        });
      });
      if (!generated.length) return nextStore;

      const reviewRows = [...(current.review31b || [])];
      generated.forEach((generatedRow) => {
        const existingIndex = reviewRows.findIndex((review) => String(review.reviewNo || "") === String(generatedRow.reviewNo) || (String(review.paymentNo || "") === String(generatedRow.paymentNo) && String(review.postNo || "") === String(generatedRow.postNo)));
        if (existingIndex === -1) reviewRows.push(generatedRow);
        else reviewRows[existingIndex] = { ...generatedRow, ...reviewRows[existingIndex], postPlans: generatedRow.postPlans };
      });
      nextStore.review31b = reviewRows;
      return nextStore;
    });
  }

  let pageContent: ReactNode;
  if (activePage === "home") {
    pageContent = <HomePage language={language} onNavigate={navigate} />;
  } else if (activePage === "targetDashboard" || activePage === "dashboard31") {
    pageContent = <TargetDashboard language={language} targetRows={rows.target1 || []} paymentRows={rows.payment31 || []} reviewRows={rows.review31b || []} notify={notify} onNavigate={navigate} version31={activePage === "dashboard31"} />;
  } else if (activePage === "creator") {
    pageContent = <CreatorManagementPage language={language} rows={rows.creator || []} setRows={(next) => savePageRows("creator", next)} paymentRows={rows.payment31 || []} reviewRows={rows.review31b || []} canEdit={canEdit} notify={notify} onNavigate={navigate} />;
  } else if (["mobilePayment31", "mobileReview31", "mobileDashboard31"].includes(activePage)) {
    pageContent = <Mobile31Workspace activePage={activePage as Mobile31PageKey} language={language} rows={rows} savePageRows={savePageRows} canEdit={canEdit} canApprove={canApprove} approvalPermissions={approvalPermissions} notify={notify} onNavigate={navigate} />;
  } else if (activePage === "budgetRule") {
    pageContent = <BudgetRulePage language={language} store={budgetRules} setStore={setBudgetRules} canEdit={canEdit} notify={notify} />;
  } else if (activeConfig) {
    pageContent = (
      <TablePage
        key={activePage}
        config={activeConfig}
        rows={pageRows}
        setRows={(next) => savePageRows(activePage, next)}
        language={language}
        canEdit={canEdit}
        canApprove={canApprove}
        approvalPermissions={approvalPermissions}
        relatedRows={rows.payment31 || []}
        relatedReviewRows={rows.review31b || []}
        notify={notify}
      />
    );
  } else {
    pageContent = <EmptyState language={language} />;
  }

  return (
    <div className={`app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <aside className={`sidebar ${sidebarOpen ? "mobile-open" : ""}`}>
        <div className="brand-lockup">
          <span className="brand-mark"><Activity size={20} /></span>
          <div><strong>Marketing 3.0</strong><small>GOODSALe TECH</small></div>
          <button className="mobile-close icon-button" onClick={() => setSidebarOpen(false)}><X size={17} /></button>
        </div>
        <nav className="sidebar-nav">
          {allowedGroups.map((group) => {
            const GroupIcon = groupIcons[group.key] || Box;
            const isOpen = expanded.has(group.key);
            const hasChildren = group.pages.length > 1;
            const groupActive = group.pages.some((page) => page.key === activePage);
            return (
              <div className="nav-group" key={group.key}>
                <button
                  className={`nav-group-button ${groupActive ? "group-active" : ""}`}
                  onClick={() => {
                    if (hasChildren) toggleGroup(group.key);
                    else navigate(group.pages[0].key);
                  }}
                  title={label(group.zh, group.en, language)}
                >
                  <GroupIcon size={17} />
                  <span>{label(group.zh, group.en, language)}</span>
                  {hasChildren && <ChevronDown size={13} className={isOpen ? "rotate" : ""} />}
                </button>
                {hasChildren && isOpen && (
                  <div className="nav-children">
                    {group.pages.map((page) => {
                      const PageIcon = pageIcons[page.key] || FileText;
                      return (
                        <button key={page.key} className={activePage === page.key ? "active" : ""} onClick={() => navigate(page.key)} title={label(page.zh, page.en, language)}>
                          <PageIcon size={15} />
                          <span>{label(page.zh, page.en, language)}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="sidebar-footer">
          <div className="avatar">UT</div>
          <div><strong>Uthan</strong><small>{label(roleConfig.zh, roleConfig.en, language)}</small></div>
          <button className="icon-button" onClick={() => setSidebarCollapsed((value) => !value)} title={label("收起菜单", "Collapse menu", language)}><PanelLeftClose size={16} /></button>
        </div>
      </aside>
      {sidebarOpen && <button className="sidebar-scrim" onClick={() => setSidebarOpen(false)} aria-label="Close menu" />}

      <header className="topbar">
        <div className="topbar-left">
          <button className="mobile-menu icon-button" onClick={() => setSidebarOpen(true)}><Menu size={18} /></button>
          <button className="desktop-collapse icon-button" onClick={() => setSidebarCollapsed((value) => !value)}><Menu size={18} /></button>
          <div className="breadcrumbs"><span>Home</span><ChevronRight size={13} /><span>{label(activeGroup.zh, activeGroup.en, language)}</span>{activePage !== "home" && <><ChevronRight size={13} /><strong>{label(activeItem.zh, activeItem.en, language)}</strong></>}</div>
        </div>
        <div className="topbar-actions">
          {quickSearchOpen && <form className="quick-search" onSubmit={runQuickSearch}><Search size={14} /><input autoFocus value={quickSearch} onChange={(event) => setQuickSearch(event.target.value)} placeholder={label("搜索页面…", "Search pages…", language)} /><button type="button" onClick={() => setQuickSearchOpen(false)}><X size={13} /></button></form>}
          <button className="icon-button" onClick={() => setQuickSearchOpen((value) => !value)} title={label("搜索", "Search", language)}><Search size={18} /></button>
          <button className="icon-button with-dot" onClick={() => setUtilityPanel((value) => value === "notice" ? null : "notice")} title={label("通知", "Notifications", language)}><Bell size={18} /><i /></button>
          <button className="icon-button" onClick={() => setUtilityPanel((value) => value === "help" ? null : "help")} title={label("帮助", "Help", language)}><CircleHelp size={18} /></button>
          <button className="icon-button" onClick={toggleFullscreen} title={label("全屏", "Fullscreen", language)}><Maximize2 size={18} /></button>
          <button className="compact-switch" onClick={() => setLanguage((value) => value === "zh" ? "en" : "zh")}><Languages size={15} /><span>{language === "zh" ? "EN" : "中文"}</span></button>
          <button className="compact-switch" onClick={() => setTheme((value) => value === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}<span>{theme === "dark" ? label("亮色", "Light", language) : label("暗黑", "Dark", language)}</span></button>
          <label className="role-switch"><span className="avatar mini">UT</span><select value={role} onChange={(event) => setRole(event.target.value as RoleKey)}>{roles.map((item) => <option value={item.key} key={item.key}>{label(item.zh, item.en, language)}</option>)}</select><ChevronDown size={12} /></label>
        </div>
        {utilityPanel && (
          <section className="utility-popover">
            <div className="popover-title"><strong>{utilityPanel === "notice" ? label("通知", "Notifications", language) : label("帮助中心", "Help Center", language)}</strong><button onClick={() => setUtilityPanel(null)}><X size={14} /></button></div>
            {utilityPanel === "notice" ? (
              <><p><span className="notice-dot blue" />{label("August 目标规划窗口已开启", "August target planning is open", language)}<small>10 min</small></p><p><span className="notice-dot amber" />{label("12 笔付款等待审批", "12 payments await approval", language)}<small>1 hr</small></p></>
            ) : (
              <><p><CircleHelp size={14} />{label("选择左侧模块进入业务页面。", "Choose a module from the sidebar.", language)}</p><p><Languages size={14} />{label("右上角可切换语言、主题和角色。", "Switch language, theme and role from the top right.", language)}</p></>
            )}
          </section>
        )}
      </header>

      <div className="page-tabs-bar">
        <button onClick={() => navigate("home")} className={activePage === "home" ? "active" : ""}><Home size={13} />Home</button>
        {activePage !== "home" && <button className="active"><ActivePageIcon size={13} />{label(activeItem.zh, activeItem.en, language)}<X size={12} onClick={(event) => { event.stopPropagation(); navigate("home"); }} /></button>}
      </div>

      <main className="main-content">{pageContent}</main>
      {toast && <div className="toast"><CheckCircle2 size={16} />{toast}</div>}
    </div>
  );
}
