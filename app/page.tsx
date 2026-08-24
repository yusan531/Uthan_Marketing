"use client";

import {
  type ChangeEvent,
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
};

const pageIcons: Partial<Record<PageKey, LucideIcon>> = {
  home: Gauge,
  targetDashboard: LayoutDashboard,
  target1: ClipboardList,
  productTarget: BarChart3,
  ownTarget: ListChecks,
  creator: Users,
  sample: Package,
  campaign: FolderKanban,
  reviews: FileText,
  lsaReviews: FileText,
  lsaKocReviews: FileText,
  ownMediaReview: BookOpen,
  inhouseContent: Box,
  payment: WalletCards,
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
}: {
  title: ReactNode;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
  variant?: string;
}) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  return (
    <div className={`modal-backdrop ${variant ? "drawer-backdrop" : ""}`} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
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

function FieldControl({
  field,
  value,
  language,
  onChange,
  filter = false,
}: {
  field: FieldDef;
  value: unknown;
  language: Language;
  onChange: (value: unknown) => void;
  filter?: boolean;
}) {
  const textLabel = label(field.zh, field.en, language);
  if (field.kind === "radio") {
    return <div className="radio-segment">{(field.options || []).map((option) => <button type="button" key={option.value} className={String(value) === option.value ? "active" : ""} onClick={() => onChange(option.value)}>{label(option.zh, option.en, language)}</button>)}</div>;
  }
  if (field.kind === "select") {
    return (
      <select value={String(value ?? "")} onChange={(event) => onChange(event.target.value)}>
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
        onChange={(event) => onChange(event.target.value)}
        placeholder={language === "zh" ? field.placeholderZh : field.placeholderEn}
        rows={3}
      />
    );
  }
  if (field.kind === "checkbox") {
    return (
      <label className="check-control">
        <input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} />
        <span>{textLabel}</span>
      </label>
    );
  }
  if (field.kind === "file") {
    return (
      <input
        type="file"
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
      value={String(value ?? "")}
      onChange={(event) => onChange(field.kind === "number" ? event.target.value : event.target.value)}
      placeholder={(language === "zh" ? field.placeholderZh : field.placeholderEn) || textLabel}
    />
  );
  return field.key === "unitPrice" ? <div className="currency-control"><span>IDR</span>{control}</div> : control;
}

function RecordModal({
  config,
  row,
  language,
  onSave,
  onClose,
}: {
  config: PageConfig;
  row: Row | null;
  language: Language;
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
      }
      return [field.key, ""];
    })),
  );

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
        ? <span className="review-dialog-heading"><b>{row ? label("修改帖子记录", "Edit Post Record", language) : label("添加帖子记录", "Add Post Record", language)}</b><strong>{String(row?.reviewNo || "RID20260824000024")}</strong><em><span className="fi fi-id flag-id" /> ID</em></span>
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
                <div className="rg spark-row">{["hasSparkCode","sparkExpiry"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>
                <div className="rg one">{renderField(activeFields.find(f=>f.key==="sparkCode")!)}</div>
                <div className="rg one notes-row">{renderField(activeFields.find(f=>f.key==="notes")!)}</div>
                {row && <div className="rg three">{["sparkAdsStatus","adDate","adsOwner"].map(key => renderField(activeFields.find(f=>f.key===key)!))}</div>}
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
  notify,
}: {
  config: PageConfig;
  rows: Row[];
  setRows: (next: Row[]) => void;
  language: Language;
  canEdit: boolean;
  canApprove: boolean;
  notify: (message: string) => void;
}) {
  const [draftFilters, setDraftFilters] = useState<Record<string, unknown>>({});
  const [appliedFilters, setAppliedFilters] = useState<Record<string, unknown>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<Row | null | undefined>(undefined);
  const [activeView, setActiveView] = useState(config.views?.[0]?.key || "");
  const [page, setPage] = useState(1);
  const [columnMenuOpen, setColumnMenuOpen] = useState(false);
  const [hiddenColumns, setHiddenColumns] = useStored<string[]>(`marketing-columns-${config.key}`, []);
  const importRef = useRef<HTMLInputElement>(null);

  const baseColumns = config.views?.find((view) => view.key === activeView)?.columns || config.columns;
  const allColumns = ["reviews", "lsaReviews", "lsaKocReviews", "ownMediaReview"].includes(config.key)
    ? [...baseColumns, { key: "productCostSplit", zh: "产品成本拆分", en: "Product Cost Split" }]
    : baseColumns;
  const columns = allColumns.filter((column) => !hiddenColumns.includes(column.key));
  const filteredRows = useMemo(
    () =>
      rows.filter((row) =>
        Object.entries(appliedFilters).every(([key, expected]) => {
          if (expected === "" || expected === undefined || expected === false) return true;
          return String(row[key] ?? "")
            .toLowerCase()
            .includes(String(expected).toLowerCase());
        }),
      ),
    [rows, appliedFilters],
  );
  const pageSize = 8;
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
    };
    return label(names[action][0], names[action][1], language);
  };

  return (
    <div className="page-stack">
      {config.filters.length > 0 && (
        <section className="filter-card">
          <div className="filter-grid">
            {config.filters.map((field) => (
              <label className="filter-field" key={field.key}>
                <span>{label(field.zh, field.en, language)}</span>
                <FieldControl
                  field={field}
                  value={draftFilters[field.key]}
                  language={language}
                  filter
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
                  setDraftFilters({});
                  setAppliedFilters({});
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
              return (
                <button
                  key={action}
                  className={`button ${action === "add" ? "primary" : action === "delete" || action === "clear" ? "danger-outline" : action === "approve" ? "approve" : "ghost"}`}
                  onClick={() => runAction(action)}
                >
                  <Icon size={14} />
                  {actionText(action)}
                </button>
              );
            })}
            <input ref={importRef} className="hidden-input" type="file" accept=".csv,text/csv" onChange={importCsv} />
          </div>
          <span className="selection-copy">
            {selected.size
              ? label(`已选 ${selected.size} 条`, `${selected.size} selected`, language)
              : label("请选择要操作的记录", "Select records to take action", language)}
          </span>
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
          <table className={`data-table ${["target1", "productTarget", "ownTarget"].includes(config.key) ? "target-table" : ""}`}>
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
                <th className="index-column">#</th>
                {columns.map((column) => (
                  <th key={column.key}>{label(column.zh, column.en, language)}</th>
                ))}
                {canEdit && config.fields.length > 0 && <th className="operation-column">{label("操作", "Actions", language)}</th>}
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
                  <td className="index-column">{(currentPage - 1) * pageSize + rowIndex + 1}</td>
                  {columns.map((column) => (
                    <td key={column.key} title={String(row[column.key] ?? "")}>
                      {formatCell(column.key, row[column.key])}
                    </td>
                  ))}
                  {canEdit && config.fields.length > 0 && (
                    <td className="operation-column">
                      <button className="row-action" onClick={() => setEditing(row)} aria-label="Edit">
                        <Edit3 size={14} />
                      </button>
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
        <RecordModal config={config} row={editing} language={language} onSave={saveRow} onClose={() => setEditing(undefined)} />
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
};

type DashboardDimension = "product" | "tier" | "strategist";

function scaleBreakdown(row: DashboardBreakdown, name: string, sub: string, share: number): DashboardBreakdown {
  return {
    name,
    sub,
    postMtd: Math.max(0, Math.round(row.postMtd * share)),
    postTarget: Math.max(1, Math.round(row.postTarget * share)),
    budgetMtd: Math.round(row.budgetMtd * share),
    budgetTarget: Math.round(row.budgetTarget * share),
  };
}

function ProgressSummary({
  title,
  actual,
  target,
  suffix,
  tone,
  language,
}: {
  title: string;
  actual: number;
  target: number;
  suffix?: string;
  tone: "green" | "amber";
  language: Language;
}) {
  const rate = percent(actual, target);
  const pace = rate - 57;
  return (
    <article className={`progress-summary ${tone}`}>
      <div className="summary-top">
        <strong>{title}</strong>
      </div>
      <div className="summary-values">
        <div><b>{suffix}{compactNumber(actual)}</b><em>/ {suffix}{compactNumber(target)}</em><small>MTD / {label("月度目标", "Target", language)}</small></div>
        <div><b>{suffix}{compactNumber(Math.max(target - actual, 0))}</b><small>{label("剩余", "Remaining", language)}</small></div>
      </div>
      <div className="progress-track"><i style={{ width: `${Math.min(rate, 100)}%` }} /></div>
      <div className="summary-foot"><span>MTD&nbsp; <b>{rate}%</b></span><span>{label("节奏差", "Pace", language)} <b>{pace > 0 ? "+" : ""}{pace}%</b></span></div>
    </article>
  );
}

function DashboardAnalysis({ language, copy }: { language: Language; copy: [string, string] }) {
  const [analysis, setAnalysis] = useState("");
  return (
    <aside className="panel analysis-panel section-analysis">
      <div className="section-caption"><span />{label("分析说明", "Analysis", language)}<button className="ai-button" onClick={() => setAnalysis(label(copy[0], copy[1], language))}>AI</button></div>
      {analysis ? <p className="analysis-copy">{analysis}</p> : <div className="analysis-empty analysis-prompt"><span>{label("点击右上角 AI 生成分析", "Click AI in the top-right to generate analysis", language)}</span></div>}
    </aside>
  );
}

function TargetDashboard({
  language,
  targetRows,
  notify,
}: {
  language: Language;
  targetRows: Row[];
  notify: (message: string) => void;
}) {
  const [tab, setTab] = useState<DashboardDimension>("product");
  const [resultTab, setResultTab] = useState<DashboardDimension>("product");
  const [filters, setFilters] = useState({ country: "ID", month: "2026-08", brand: "", owner: "" });
  const [expandedProgress, setExpandedProgress] = useState<Set<string>>(new Set());
  const [resultOpen, setResultOpen] = useState(true);
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());
  const [videoPeriod, setVideoPeriod] = useState("MTD");
  const [videoTab, setVideoTab] = useState("video");
  const [expandedVideoGroups, setExpandedVideoGroups] = useState<Set<string>>(new Set());
  const sourceRows = targetRows.length
    ? targetRows
    : [
        { id: 1, product: "Tone Up Sunscreen", owner: "Nadia", qty: 38, qtyTarget: 52, actualCost: 17600000, budgetTarget: 43000000 },
        { id: 2, product: "Day Cream", owner: "Delvi", qty: 7, qtyTarget: 32, actualCost: 8500000, budgetTarget: 29000000 },
      ];
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
  const rowsByDimension: Record<DashboardDimension, DashboardBreakdown[]> = {
    product: productRows,
    tier: tierRows,
    strategist: strategistRows,
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
  ] as const;
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
    cost: parseVideoMetric(cells[5]),
    gmv: parseVideoMetric(cells[6]),
    views: parseVideoMetric(cells[8]),
  }));
  const videoGroupValue = (record: (typeof videoRecords)[number]) => {
    if (videoTab === "tier") return record.tier;
    if (videoTab === "content") return record.content;
    if (videoTab === "strategist") return record.strategist;
    return record.product;
  };
  const groupedVideoRows = videoTab === "video" ? [] : Array.from(new Set(videoRecords.map(videoGroupValue))).map((name) => {
    const items = videoRecords.filter((record) => videoGroupValue(record) === name);
    const cost = items.reduce((sum, record) => sum + record.cost, 0);
    const gmv = items.reduce((sum, record) => sum + record.gmv, 0);
    const views = items.reduce((sum, record) => sum + record.views, 0);
    return { name, items, cost, gmv, views, roi: gmv / Math.max(cost, 1), cpm: (cost / Math.max(views, 1)) * 1000 };
  });
  const videoGroupHeading = videoTab === "tier"
    ? label("达人等级", "Creator Tier", language)
    : videoTab === "content"
      ? label("内容类型", "Content Type", language)
      : videoTab === "strategist"
        ? "KOL Strategist"
        : label("产品名称", "Product Name", language);
  const renderVideoDetailRows = (records: typeof videoRecords) => records.map((record) => <tr key={record.cells[0]}>{record.cells.map((value, index) => <td key={`${record.cells[0]}-${index}`}>{index < 2 ? <button className="video-data-link">{value}</button> : value}</td>)}</tr>);

  return (
    <div className="page-stack target-dashboard">
      <section className="dashboard-filter">
        {[
          ["country", "国家", "Country", ["ID", "MY", "VN", "TH", "PH"]],
          ["month", "月份", "Month", ["2026-08", "2026-07", "2026-06"]],
          ["brand", "品牌", "Brand", ["", "Glowsicha", "Glad2Glow", "Skintific"]],
          ["owner", "负责人", "KOL Strategist", ["", "Nadia", "Delvi", "Shafi", "Cilla"]],
        ].map(([key, zh, en, options]) => (
          <label key={String(key)}><span>{label(String(zh), String(en), language)}</span><select value={filters[String(key) as keyof typeof filters]} onChange={(event) => setFilters((current) => ({ ...current, [String(key)]: event.target.value }))}>{(options as string[]).map((option) => <option key={option || "all"} value={option}>{option || label("多选", "Multiple", language)}</option>)}</select></label>
        ))}
        <div className="filter-actions">
          <button className="button primary" onClick={() => notify(label("Dashboard 已按条件刷新", "Dashboard filters applied", language))}><Search size={14} />{label("搜索", "Search", language)}</button>
          <button className="button ghost" onClick={() => setFilters({ country: "ID", month: "2026-08", brand: "", owner: "" })}><RefreshCcw size={14} />{label("重置", "Reset", language)}</button>
        </div>
      </section>

      <div className="dashboard-section-row reference-dashboard-grid">
        <section className="panel progress-panel">
          <div className="section-caption"><span />{label("发布进度", "Publishing Progress", language)}</div>
          <div className="progress-pair">
            <ProgressSummary title={label("发布数量", "Post", language)} actual={postMtd} target={postTarget} tone="green" language={language} />
            <ProgressSummary title={label("预算花费", "Budget", language)} actual={budgetMtd} target={budgetTarget} suffix="IDR " tone="amber" language={language} />
          </div>
          <div className="dashboard-tabs">
            {tabs.map(([key, zh, en]) => <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>{label(zh, en, language)}</button>)}
          </div>
          <div className="data-table-wrap dashboard-table-wrap">
            <table className="data-table dashboard-table">
              <colgroup>
                <col className="breakdown-col" />
                <col className="post-target-col" />
                <col className="post-remaining-col" />
                <col className="post-pace-col" />
                <col className="budget-target-col" />
                <col className="budget-remaining-col" />
                <col className="budget-pace-col" />
              </colgroup>
              <thead>
                <tr><th rowSpan={2}>{label("拆分维度", "Breakdown", language)}</th><th colSpan={3}>Post</th><th colSpan={3}>Budget</th></tr>
                <tr><th>MTD / Target</th><th>{label("剩余", "Remaining", language)}</th><th>MTD / Pace</th><th>MTD / Target</th><th>{label("剩余", "Remaining", language)}</th><th>MTD / Pace</th></tr>
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
                      <td><b>{row.postMtd}/{row.postTarget}</b></td>
                      <td>{Math.max(row.postTarget - row.postMtd, 0)}</td>
                      <td><div className="dashboard-rate"><span>MTD <b>{postRate}%</b></span><em className={postPace >= -5 ? "good" : "bad"}>PACE {postPace > 0 ? "+" : ""}{postPace}%</em></div><div className="micro-progress"><i style={{ width: `${Math.min(postRate, 100)}%` }} /></div></td>
                      <td><b>IDR {compactNumber(row.budgetMtd)}/{compactNumber(row.budgetTarget)}</b></td>
                      <td>IDR {compactNumber(Math.max(row.budgetTarget - row.budgetMtd, 0))}</td>
                      <td><div className="dashboard-rate"><span>MTD <b>{budgetRate}%</b></span><em className={budgetPace >= -5 ? "good" : "warn"}>PACE {budgetPace > 0 ? "+" : ""}{budgetPace}%</em></div><div className="micro-progress amber"><i style={{ width: `${Math.min(budgetRate, 100)}%` }} /></div></td>
                    </tr>
                    {isOpen && children.map((child) => {
                      const childPostRate = percent(child.postMtd, child.postTarget);
                      const childBudgetRate = percent(child.budgetMtd, child.budgetTarget);
                      return <tr className="nested-breakdown" key={`${rowKey}-${child.name}`}>
                        <td><strong>{child.name}</strong></td>
                        <td><b>{child.postMtd}/{child.postTarget}</b></td>
                        <td>{Math.max(child.postTarget - child.postMtd, 0)}</td>
                        <td><div className="dashboard-rate"><span>MTD <b>{childPostRate}%</b></span></div><div className="micro-progress"><i style={{ width: `${Math.min(childPostRate, 100)}%` }} /></div></td>
                        <td><b>IDR {compactNumber(child.budgetMtd)}/{compactNumber(child.budgetTarget)}</b></td>
                        <td>IDR {compactNumber(Math.max(child.budgetTarget - child.budgetMtd, 0))}</td>
                        <td><div className="dashboard-rate"><span>MTD <b>{childBudgetRate}%</b></span></div><div className="micro-progress amber"><i style={{ width: `${Math.min(childBudgetRate, 100)}%` }} /></div></td>
                      </tr>;
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
                {isExpanded && <div className="result-child-list">{childrenFor(resultTab, row).map((child) => <div className="result-child-row" key={`${resultKey}-${child.name}`}><div><strong>{child.name}</strong><small>{child.sub}</small></div>{breakdownMetrics(child).map((metric) => <span key={metric.name}><small>{metric.name}</small><b>{metric.value}</b></span>)}</div>)}</div>}
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
                  {isExpanded && <tr className="video-group-detail-row"><td colSpan={7}><div className="video-group-detail"><table className="data-table video-publishing-table"><colgroup><col /><col /><col /><col /><col /><col /><col /><col /><col /><col /></colgroup><thead><tr><th>Video ID</th><th>{label("达人名称", "Creator Name", language)}</th><th>{label("产品名称", "Product Name", language)}</th><th>Content</th><th>Post Date</th><th>Video Cost</th><th>GMV</th><th>ROI</th><th>VV</th><th>CPM</th></tr></thead><tbody>{renderVideoDetailRows(group.items)}</tbody></table></div></td></tr>}
                </Fragment>;
              })}</tbody>
            </table>}
          </div>
        </section>
      </div>
    </div>
  );
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

export default function MarketingSystem() {
  const [activePage, setActivePage] = useStored<PageKey>("marketing-v8-active-page", "targetDashboard");
  const [language, setLanguage] = useStored<Language>("marketing-v8-language", "zh");
  const [theme, setTheme] = useStored<Theme>("marketing-v8-theme", "dark");
  const [role, setRole] = useStored<RoleKey>("marketing-v8-role", "admin");
  const [rows, setRows] = useStored<RowStore>("marketing-v8-records", initialRows);
  const [budgetRules, setBudgetRules] = useStored<Record<string, Row[]>>("marketing-v8-budget-rules", budgetRuleSeeds);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["target"]));
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

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language, theme]);

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

  let pageContent: ReactNode;
  if (activePage === "home") {
    pageContent = <HomePage language={language} onNavigate={navigate} />;
  } else if (activePage === "targetDashboard") {
    pageContent = <TargetDashboard language={language} targetRows={rows.target1 || []} notify={notify} />;
  } else if (activePage === "budgetRule") {
    pageContent = <BudgetRulePage language={language} store={budgetRules} setStore={setBudgetRules} canEdit={canEdit} notify={notify} />;
  } else if (activeConfig) {
    pageContent = (
      <TablePage
        key={activePage}
        config={activeConfig}
        rows={pageRows}
        setRows={(next) => setRows((current) => ({ ...current, [activePage]: next }))}
        language={language}
        canEdit={canEdit}
        canApprove={canApprove}
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
