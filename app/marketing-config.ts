export type RoleKey = "country" | "brand" | "kolPic" | "ads" | "finance" | "analyst" | "admin";

export type PageKey =
  | "home" | "targetDashboard" | "target1" | "productTarget" | "ownTarget"
  | "creator" | "campaign" | "sample"
  | "reviews" | "lsaReviews" | "lsaKocReviews" | "ownMediaReview" | "inhouseContent"
  | "payment" | "paymentPriceChange"
  | "paymentAnalytics" | "paymentReview" | "yellowBasket" | "topRankVideo"
  | "targetAnalytics" | "productAnalytics" | "reviewLevelAnalytics" | "videoAnalytics"
  | "kolTargetReport" | "missingPid"
  | "brandData" | "productData" | "budgetRule"
  | "users" | "roles" | "menus" | "notices" | "operLogs" | "loginLogs" | "onlineUsers";

export type ActionKey = "add" | "edit" | "delete" | "import" | "export" | "approve" | "clear" | "unlock";
export type FieldKind = "text" | "number" | "date" | "select" | "textarea" | "radio" | "checkbox" | "file";

export type OptionDef = { value: string; zh: string; en: string };
export type FieldDef = {
  key: string;
  zh: string;
  en: string;
  kind?: FieldKind;
  options?: OptionDef[];
  required?: boolean;
  wide?: boolean;
  placeholderZh?: string;
  placeholderEn?: string;
};
export type ColumnDef = { key: string; zh: string; en: string };
export type ViewDef = { key: string; zh: string; en: string; columns: ColumnDef[] };
export type PageConfig = {
  key: PageKey;
  titleZh: string;
  titleEn: string;
  descZh: string;
  descEn: string;
  filters: FieldDef[];
  fields: FieldDef[];
  modalFields?: FieldDef[];
  editFields?: FieldDef[];
  columns: ColumnDef[];
  actions: ActionKey[];
  views?: ViewDef[];
  seed?: Record<string, unknown>[];
};

const option = (value: string, zh = value, en = value): OptionDef => ({ value, zh, en });
const text = (key: string, zh: string, en = zh, wide = false): FieldDef => ({ key, zh, en, kind: "text", wide });
const number = (key: string, zh: string, en = zh): FieldDef => ({ key, zh, en, kind: "number" });
const date = (key: string, zh: string, en = zh): FieldDef => ({ key, zh, en, kind: "date" });
const select = (key: string, zh: string, en: string, options: OptionDef[]): FieldDef => ({ key, zh, en, kind: "select", options });
const area = (key: string, zh: string, en = zh): FieldDef => ({ key, zh, en, kind: "textarea", wide: true });
const file = (key: string, zh: string, en = zh): FieldDef => ({ key, zh, en, kind: "file", wide: true });
const column = (key: string, zh: string, en = zh): ColumnDef => ({ key, zh, en });

export const countryOptions = [
  option("ID", "印度尼西亚", "Indonesia"), option("MY", "马来西亚", "Malaysia"),
  option("VN", "越南", "Vietnam"), option("TH", "泰国", "Thailand"),
  option("PH", "菲律宾", "Philippines"), option("SG", "新加坡", "Singapore"),
  option("MX", "墨西哥", "Mexico"),
];
const brandOptions = [option("Glowsicha"), option("Glad2Glow"), option("Skintific"), option("Hanasui")];
const productOptions = [option("Tone Up Sunscreen"), option("Day Cream"), option("Body Scrub"), option("Juicy Tinted Lip Balm"), option("Hair Oil")];
const ownerOptions = [option("Delvi"), option("Shafi"), option("Nadia"), option("Nisa"), option("Cilla")];
const statusOptions = [option("Draft", "草稿", "Draft"), option("Published", "已发布", "Published"), option("Pending", "待处理", "Pending"), option("Approved", "已通过", "Approved"), option("Rejected", "已拒绝", "Rejected")];
const creatorTypeOptions = [option("KOL"), option("KOC"), option("Others")];
const tierOptions = [option("S"), option("A"), option("B"), option("C"), option("D"), option("T0")];
const platformOptions = [option("TikTok"), option("Instagram"), option("YouTube"), option("Xiaohongshu", "小红书", "Xiaohongshu")];
const contentTypeOptions = [option("Livetalk"), option("TTS"), option("Vlog"), option("Photoslide"), option("Interaction"), option("Product Only"), option("Others")];

const country = () => select("country", "国家", "Country", countryOptions);
const brand = () => select("brand", "品牌", "Brand", brandOptions);
const product = () => select("product", "产品", "Product", productOptions);
const owner = () => select("owner", "负责人", "KOL Strategist", ownerOptions);
const commonTargetFields = [date("targetMonth", "目标月份", "Target Month"), brand(), product(), owner()];

export const pageConfigs: Partial<Record<PageKey, PageConfig>> = {
  target1: {
    key: "target1", titleZh: "Target 1.0", titleEn: "Target 1.0",
    descZh: "管理达人合作目标、预算、播放与发布数量。", descEn: "Manage creator targets, budget, views and publishing quantity.",
    filters: [country(), text("targetNo", "目标编号", "Target No."), brand(), product(), date("targetMonth", "目标月份", "Target Month")],
    fields: [country(), text("targetNo", "目标编号", "Target No."), ...commonTargetFields, select("contentType", "内容类型", "Content Type", contentTypeOptions), number("budgetTarget", "Budget Target"), number("actualCost", "Actual Cost"), number("budgetRate", "Budget %"), number("viewsTarget", "Views Target"), number("actualViews", "Actual Views"), number("viewsRate", "Views %"), number("qtyTarget", "QTY Target"), number("qty", "QTY"), number("qtyRate", "QTY %"), number("qtyRatio", "QTY Ratio"), number("targetCpm", "Target CPM"), number("realCpm", "Real CPM")],
    columns: [column("targetNo", "目标编号", "Target No."), column("targetMonth", "目标月份", "Target Month"), column("brand", "品牌", "Brand"), column("product", "产品", "Product"), column("owner", "负责人", "KOL Strategist"), column("contentType", "内容类型", "Content Type"), column("budgetTarget", "Budget Target"), column("actualCost", "Actual Cost"), column("budgetRate", "Budget %"), column("viewsTarget", "Views Target"), column("actualViews", "Actual Views"), column("viewsRate", "Views %"), column("qtyTarget", "QTY Target"), column("qty", "QTY"), column("qtyRate", "QTY %"), column("qtyRatio", "QTY Ratio"), column("targetCpm", "Target CPM"), column("realCpm", "Real CPM")],
    actions: ["add", "edit", "delete", "export"],
    seed: [
      { id: 1, targetNo: "TG-202608-001", targetMonth: "2026-08", brand: "Glowsicha", product: "Tone Up Sunscreen", owner: "Nadia", contentType: "Vlog", budgetTarget: 43000000, actualCost: 17600000, budgetRate: "41%", viewsTarget: 2200000, actualViews: 1180000, viewsRate: "54%", qtyTarget: 52, qty: 38, qtyRate: "73%", qtyRatio: "1.4", targetCpm: 19545, realCpm: 14915 },
      { id: 2, targetNo: "TG-202608-002", targetMonth: "2026-08", brand: "Glowsicha", product: "Day Cream", owner: "Delvi", contentType: "TTS", budgetTarget: 29000000, actualCost: 8500000, budgetRate: "29%", viewsTarget: 1600000, actualViews: 540000, viewsRate: "34%", qtyTarget: 32, qty: 7, qtyRate: "22%", qtyRatio: "0.8", targetCpm: 18125, realCpm: 15740 },
    ],
  },
  productTarget: {
    key: "productTarget", titleZh: "Target", titleEn: "Target",
    descZh: "按产品规划内容策略、达人结构与商业目标。", descEn: "Plan content strategy, creator mix and commercial goals by product.",
    filters: [country(), date("monthStart", "Month", "Month"), date("monthEnd", "结束月份", "End Month"), brand(), product(), owner(), select("status", "Status", "Status", statusOptions)],
    fields: [country(), date("month", "Month", "Month"), brand(), text("brandManager", "Brand Manager"), product(), select("productStage", "Product Stage", "Product Stage", [option("Introduction"), option("Growth"), option("Maturity"), option("Decline"), option("Others")]), select("contentType", "Content Type", "Content Type", contentTypeOptions), text("contentAngles", "Content Angles"), text("contentTag", "Content Tag"), text("videoReference", "Video Reference", "Video Reference", true), area("brief", "Brief"), owner(), number("qty", "Qty"), number("sTier", "S"), number("aTier", "A"), number("bTier", "B"), text("affiliate", "Affiliate"), number("targetBudget", "Target Budget"), number("gmvTarget", "GMV Target"), number("roiTarget", "ROI Target"), number("vvTarget", "VV Target"), number("cpmTarget", "CPM Target"), select("status", "Status", "Status", statusOptions)],
    columns: [column("month", "Month"), column("brand", "品牌", "Brand"), column("brandManager", "Brand Manager"), column("product", "产品", "Product"), column("productStage", "Product Stage"), column("contentType", "Content Type"), column("contentAngles", "Content Angles"), column("contentTag", "Content Tag"), column("videoReference", "Video Reference"), column("brief", "Brief"), column("owner", "负责人", "KOL Strategist"), column("qty", "Qty"), column("sTier", "S"), column("aTier", "A"), column("bTier", "B"), column("affiliate", "Affiliate"), column("targetBudget", "Target Budget"), column("gmvTarget", "GMV Target"), column("roiTarget", "ROI Target"), column("vvTarget", "VV Target"), column("cpmTarget", "CPM Target"), column("status", "Status")],
    actions: ["add", "import", "approve", "delete", "export"],
    seed: [{ id: 1, month: "2026-08", brand: "Glowsicha", brandManager: "Mia", product: "Tone Up Sunscreen", productStage: "Growth", contentType: "Vlog", contentAngles: "Before & After", contentTag: "Summer", videoReference: "REF-2026-008", brief: "Show texture, wear test and final result.", owner: "Nadia", qty: 52, sTier: 4, aTier: 16, bTier: 32, affiliate: "Yes", targetBudget: 43000000, gmvTarget: 640000000, roiTarget: 8.9, vvTarget: 4200000, cpmTarget: 10238, status: "Published" }],
  },
  ownTarget: {
    key: "ownTarget", titleZh: "Own Target", titleEn: "Own Target",
    descZh: "查看和维护当前负责人的个人目标。", descEn: "Review and maintain targets owned by the current PIC.",
    filters: [country(), text("targetNo", "目标编号", "Target No."), brand(), product(), date("targetMonth", "目标月份", "Target Month")],
    fields: [country(), text("targetNo", "目标编号", "Target No."), ...commonTargetFields, number("viewsTarget", "Views Target"), number("actualViews", "Actual Views"), number("viewsRate", "Views %"), number("qtyTarget", "QTY Target"), number("qty", "QTY"), number("qtyRate", "QTY %"), number("qtyRatio", "QTY Ratio")],
    columns: [column("targetNo", "目标编号", "Target No."), column("targetMonth", "目标月份", "Target Month"), column("brand", "品牌", "Brand"), column("product", "产品", "Product"), column("owner", "负责人", "KOL Strategist"), column("viewsTarget", "Views Target"), column("actualViews", "Actual Views"), column("viewsRate", "Views %"), column("qtyTarget", "QTY Target"), column("qty", "QTY"), column("qtyRate", "QTY %"), column("qtyRatio", "QTY Ratio")],
    actions: ["add", "edit", "delete", "export"],
    seed: [{ id: 1, targetNo: "OWN-202608-018", targetMonth: "2026-08", brand: "Glowsicha", product: "Day Cream", owner: "Delvi", viewsTarget: 800000, actualViews: 540000, viewsRate: "68%", qtyTarget: 18, qty: 11, qtyRate: "61%", qtyRatio: "1.6" }],
  },
  creator: {
    key: "creator", titleZh: "Creator", titleEn: "Creator",
    descZh: "维护达人档案、合作、收款与样品信息。", descEn: "Manage creator profiles, collaborations, payment and sample details.",
    filters: [country(), brand(), text("creatorName", "达人名称", "Creator Name"), select("platform", "平台", "Platform", platformOptions), select("creatorType", "达人类型", "Creator Type", creatorTypeOptions), select("tier", "等级", "Tier", tierOptions)],
    fields: [text("creatorName", "达人名称", "Creator Name"), text("accountId", "达人账号", "Account ID"), select("platform", "平台", "Platform", platformOptions), text("category", "Category"), text("whatsapp", "WhatsApp"), select("creatorType", "达人类型", "Creator Type", creatorTypeOptions), select("tier", "等级", "Tier", tierOptions), text("bankName", "Bank Name"), text("accountName", "Account Name"), text("bankAccount", "Bank Account"), text("idNumber", "ID (NPW/KTP)"), text("idName", "ID Name"), brand(), owner(), date("cooperationDate", "合作日期", "Cooperation Date"), text("cooperationCategory", "合作品类", "Cooperation Category"), text("cooperationMethod", "合作方式", "Cooperation Method"), area("notes", "备注", "Notes"), text("sampleOrderId", "Sample Order Id"), date("orderDate", "订单日期", "Order Date"), number("sampleQty", "数量", "Quantity"), number("sampleAmount", "总金额", "Total Amount"), select("sampleStatus", "样品状态", "Sample Status", [option("Pending", "待发货", "Pending"), option("Shipping", "运输中", "Shipping"), option("Delivered", "已签收", "Delivered")])],
    columns: [column("country", "国家", "Country"), column("avatar", "头像", "Avatar"), column("accountId", "Account ID"), column("creatorName", "达人名称", "Creator Name"), column("brand", "品牌", "Brand"), column("cooperationDate", "合作日期", "Cooperation Date"), column("creatorType", "达人类型", "Creator Type"), column("category", "Category"), column("tier", "等级", "Tier"), column("updatedBy", "更新人", "Updated By"), column("updatedAt", "更新时间", "Updated At")],
    actions: ["add", "edit", "delete", "export"],
    seed: [
      { id: 1, country: "ID", avatar: "MA", accountId: "mamisikembar.1", creatorName: "Mami Si Kembar", brand: "Glowsicha", cooperationDate: "2026-07-21", creatorType: "KOL", category: "Beauty", tier: "A", updatedBy: "Delvi", updatedAt: "2026-08-02 09:20", platform: "TikTok", whatsapp: "+62 812-0000-0188" },
      { id: 2, country: "ID", avatar: "PC", accountId: "parasceria", creatorName: "Paras Ceria", brand: "Glowsicha", cooperationDate: "2026-07-18", creatorType: "KOL", category: "Skincare", tier: "B", updatedBy: "Shafi", updatedAt: "2026-08-01 16:40", platform: "TikTok" },
    ],
  },
  campaign: {
    key: "campaign", titleZh: "Campaign 活动管理", titleEn: "Campaign Management",
    descZh: "保留现有系统中的活动计划、预算与执行进度。", descEn: "Keep campaign planning, budget and execution progress from the existing workspace.",
    filters: [brand(), owner(), select("status", "状态", "Status", statusOptions)],
    fields: [text("campaignNo", "活动编号", "Campaign No."), text("name", "活动名称", "Campaign Name"), brand(), owner(), date("startDate", "开始日期", "Start Date"), date("endDate", "结束日期", "End Date"), number("budget", "预算", "Budget"), number("progress", "进度", "Progress"), select("status", "状态", "Status", statusOptions), area("brief", "活动说明", "Campaign Brief")],
    columns: [column("campaignNo", "活动编号", "Campaign No."), column("name", "活动名称", "Campaign Name"), column("brand", "品牌", "Brand"), column("owner", "负责人", "Owner"), column("startDate", "开始日期", "Start Date"), column("endDate", "结束日期", "End Date"), column("budget", "预算", "Budget"), column("progress", "进度", "Progress"), column("status", "状态", "Status")],
    actions: ["add", "edit", "delete", "export"],
    seed: [{ id: 1, campaignNo: "CMP-2608-01", name: "Summer Sunscreen Launch", brand: "Glowsicha", owner: "Nadia", startDate: "2026-08-01", endDate: "2026-08-31", budget: 320000000, progress: "68%", status: "Published" }],
  },
  sample: {
    key: "sample", titleZh: "Sample 样品管理", titleEn: "Sample Management",
    descZh: "保留寄样申请、物流、金额与签收状态。", descEn: "Keep sample requests, logistics, amounts and delivery status.",
    filters: [country(), brand(), text("sampleOrderId", "Sample Order Id"), text("creatorName", "达人名称", "Creator Name"), select("status", "状态", "Status", statusOptions)],
    fields: [country(), brand(), text("sampleOrderId", "Sample Order Id"), text("creatorName", "达人名称", "Creator Name"), product(), date("orderDate", "订单日期", "Order Date"), number("qty", "数量", "Quantity"), number("amount", "总金额", "Total Amount"), text("trackingNo", "物流单号", "Tracking No."), select("status", "状态", "Status", [option("Pending", "待发货", "Pending"), option("Shipping", "运输中", "Shipping"), option("Delivered", "已签收", "Delivered")])],
    columns: [column("sampleOrderId", "Sample Order Id"), column("creatorName", "达人名称", "Creator Name"), column("brand", "品牌", "Brand"), column("product", "产品", "Product"), column("orderDate", "订单日期", "Order Date"), column("qty", "数量", "Quantity"), column("amount", "总金额", "Total Amount"), column("trackingNo", "物流单号", "Tracking No."), column("status", "状态", "Status")],
    actions: ["add", "edit", "delete", "export"],
    seed: [{ id: 1, sampleOrderId: "SO-ID-26080218", creatorName: "Mami Si Kembar", brand: "Glowsicha", product: "Tone Up Sunscreen", orderDate: "2026-08-02", qty: 2, amount: 240000, trackingNo: "JNE90841255", status: "Shipping" }],
  },
};

const reviewBaseFields = [text("reviewNo", "审核编号", "Review No."), text("paymentNo", "支付编号", "Payment No."), text("postId", "Post ID"), date("plannedPostDate", "计划发布日期", "Planned Post Date"), date("actualPostDate", "实际发布日期", "Actual Post Date"), text("postSequence", "帖子序号", "Post Sequence"), text("creatorName", "达人", "Creator"), owner(), text("ownerDept", "负责人部门", "KOL Strategist Department"), number("unitPrice", "总成本", "Total Cost"), brand(), text("product", "产品（多个用逗号分隔）", "Products (comma-separated)"), select("postStatus", "帖子状态", "Post Status", statusOptions), select("videoType", "视频类型", "Video Type", contentTypeOptions), text("classification", "Classification"), text("videoSource", "Video Source"), text("adType", "Ad Type"), date("createdAt", "创建时间", "Created At")];

const reviewModalFields: FieldDef[] = [
  { ...text("postId", "Post ID"), required: true, placeholderZh: "请输入 Post ID（平台视频 ID）" },
  date("actualPostDate", "Post Date"),
  { ...select("platform", "平台", "Platform", platformOptions), required: true },
  text("postSequence", "Post No.", "Post No."),
  { ...text("postLink", "帖子链接", "Post Link"), required: true, placeholderZh: "请输入文本内容" },
  select("paymentNo", "支付编号", "Payment No.", []),
  text("creatorName", "达人名称", "Creator Name"),
  { ...owner(), required: true },
  text("submitter", "提交人", "Submitter"),
  { ...number("unitPrice", "单价", "Unit Price"), required: true },
  text("rateTier", "费率档位", "Rate Tier"),
  select("postStatus", "视频状态", "Video Status", statusOptions),
  { ...brand(), required: true },
  { ...text("product", "产品", "Product"), required: true },
  date("sampleDate", "寄样日期", "Sample Date"),
  { ...select("slideProject", "Slide Project", "Slide Project", [option("Yes", "是", "Yes"), option("No", "否", "No")]), kind: "radio", required: true },
  { ...select("yellowBasket", "Yellow Basket", "Yellow Basket", [option("Yes", "是", "Yes"), option("No", "否", "No")]), kind: "radio", required: true },
  select("ranking", "Ranking", "Ranking", [option("Top", "Top", "Top"), option("Normal", "普通", "Normal")]),
  { ...select("videoType", "内容类型", "Content Type", contentTypeOptions), required: true },
  { ...select("contentAngle", "Content Angles", "Content Angles", [option("Review"), option("Tutorial"), option("Vlog")]), required: true },
  select("contentTag", "内容标签", "Content Tag", [option("Launch", "新品", "Launch"), option("Always-on", "日常", "Always-on")]),
  { ...select("hasSparkCode", "是否有 Spark Code？", "Has Spark Code?", [option("Yes", "是", "Yes"), option("No", "否", "No")]), required: true },
  date("sparkExpiry", "过期日期", "Expiry Date"),
  text("sparkCode", "Spark Code"),
  area("notes", "备注", "Notes"),
];

const reviewEditFields: FieldDef[] = [
  ...reviewModalFields,
  select("sparkAdsStatus", "Spark Ads 状态", "Spark Ads Status", statusOptions),
  date("adDate", "广告日期", "Ad Date"),
  text("adsOwner", "广告负责人", "Ads Owner"),
];

Object.assign(pageConfigs, {
  reviews: {
    key: "reviews", titleZh: "Reviews", titleEn: "Reviews", descZh: "管理达人发布记录、支付关联与审核状态。", descEn: "Manage creator posts, linked payments and review status.",
    filters: [country(), text("reviewNo", "审核编号", "Review No."), brand(), product(), date("actualPostDate", "Post Date"), text("postId", "Post ID"), number("unitPrice", "单价", "Unit Price"), owner(), select("sparkAdsStatus", "Spark Ads 状态", "Spark Ads Status", statusOptions), select("reviewStatus", "审核状态", "Review Status", statusOptions), select("source", "来源", "Source", [option("GST", "GST", "GST"), option("Private", "私域", "Private")])], fields: reviewBaseFields, modalFields: reviewModalFields, editFields: reviewEditFields,
    columns: [column("reviewNo", "审核编号", "Review No."), column("paymentNo", "支付编号", "Payment No."), column("postId", "Post ID"), column("actualPostDate", "Post Date"), column("postSequence", "帖子序号", "Post Sequence"), column("createdAt", "创建时间", "Created At"), column("creatorName", "达人", "Creator"), column("owner", "KOL Strategist", "KOL Strategist"), column("ownerDept", "KOL Strategist 部门", "KOL Strategist Department"), column("postStatus", "视频状态", "Video Status"), column("unitPrice", "单价", "Unit Price"), column("brand", "品牌", "Brand"), column("product", "产品", "Product")], actions: ["add", "edit", "delete", "export"],
    seed: [{ id: 1, reviewNo: "RID20260824000022", paymentNo: "PID2026080687123", postId: "7677446455979724040", actualPostDate: "2026-08-24", postSequence: "1", createdAt: "2026-08-24", creatorName: "alkkna", owner: "Ajeng Salma Nadhifa Fitriani", ownerDept: "Glowsicha", postStatus: "Normal", unitPrice: 350000, brand: "Glowsicha", product: "SerumSpray" }, { id: 2, reviewNo: "RID20260824000020", paymentNo: "PID2026071585203", postId: "7676343039618534664", actualPostDate: "2026-08-21", postSequence: "4", createdAt: "2026-08-24", creatorName: "micizuby", owner: "Ajeng Salma Nadhifa Fitriani", ownerDept: "Glowsicha", postStatus: "Normal", unitPrice: 250000, brand: "Glowsicha", product: "SerumSpray" }],
  },
  lsaReviews: {
    key: "lsaReviews", titleZh: "LSA Reviews", titleEn: "LSA Reviews", descZh: "管理 LSA 视频计划、实际发布与内容状态。", descEn: "Manage LSA video plans, actual publishing and status.",
    filters: [country(), text("reviewNo", "审核编号", "Review No."), brand(), text("postId", "Post ID"), date("actualPostDate", "实际发布日期", "Actual Post Date")], fields: reviewBaseFields,
    columns: [column("reviewNo", "审核编号", "Review No."), column("postId", "Post ID"), column("plannedPostDate", "计划发布日期", "Planned Post Date"), column("actualPostDate", "实际发布日期", "Actual Post Date"), column("createdAt", "创建时间", "Created At"), column("owner", "负责人", "KOL Strategist"), column("brand", "品牌", "Brand"), column("product", "产品", "Product"), column("videoType", "视频类型", "Video Type"), column("postStatus", "状态", "Status")], actions: ["add", "edit", "delete"],
    seed: [{ id: 1, reviewNo: "LKVID2025112660", postId: "758903477231", plannedPostDate: "2026-08-03", actualPostDate: "2026-08-02", createdAt: "2026-08-02", owner: "Nadia", brand: "Glowsicha", product: "Tone Up Sunscreen", videoType: "Vlog", postStatus: "Published" }],
  },
  lsaKocReviews: {
    key: "lsaKocReviews", titleZh: "LSA KOC Reviews", titleEn: "LSA KOC Reviews", descZh: "管理 KOC 审核、付款、发布与价格信息。", descEn: "Manage KOC reviews, payments, publishing and pricing.",
    filters: [country(), text("reviewNo", "审核编号", "Review No."), brand(), date("actualPostDate", "实际发布日期", "Actual Post Date"), text("postId", "Post ID"), number("unitPrice", "单价", "Unit Price")], fields: reviewBaseFields,
    columns: [column("reviewNo", "审核编号", "Review No."), column("paymentNo", "支付编号", "Payment No."), column("postId", "Post ID"), column("actualPostDate", "实际发布日期", "Actual Post Date"), column("postStatus", "帖子状态", "Post Status"), column("createdAt", "创建时间", "Created At"), column("creatorName", "达人", "Creator"), column("owner", "负责人", "KOL Strategist"), column("unitPrice", "单价", "Unit Price"), column("brand", "品牌", "Brand"), column("product", "产品", "Product")], actions: ["add", "edit", "delete", "export"],
    seed: [{ id: 1, reviewNo: "KOCVID2026080188", paymentNo: "PID2026080186748", postId: "766849927431", actualPostDate: "2026-08-01", postStatus: "Pending", createdAt: "2026-08-02", creatorName: "parasceria", owner: "Delvi", unitPrice: 500000, brand: "Glowsicha", product: "Body Scrub" }],
  },
  ownMediaReview: {
    key: "ownMediaReview", titleZh: "Own Media Review", titleEn: "Own Media Review", descZh: "管理自有媒体内容、来源、分类和广告类型。", descEn: "Manage owned-media content, source, classification and ad type.",
    filters: [country(), text("reviewNo", "审核编号", "Review No."), brand()], fields: reviewBaseFields,
    columns: [column("reviewNo", "审核编号", "Review No."), column("postId", "Post ID"), column("createdAt", "创建时间", "Created At"), column("creatorName", "达人", "Creator"), column("owner", "负责人", "KOL Strategist"), column("ownerDept", "负责人部门", "KOL Strategist Department"), column("brand", "品牌", "Brand"), column("product", "产品", "Product"), column("classification", "Classification"), column("videoSource", "Video Source"), column("adType", "Ad Type")], actions: ["add", "edit", "delete", "export"],
    seed: [{ id: 1, reviewNo: "OVID2026080344796", postId: "766910289312", createdAt: "2026-08-03", creatorName: "Brand Studio", owner: "Shafi", ownerDept: "Creative", brand: "Glowsicha", product: "Hair Oil", classification: "Product", videoSource: "In-house", adType: "Spark Ads" }],
  },
  inhouseContent: {
    key: "inhouseContent", titleZh: "Inhouse Content", titleEn: "Inhouse Content", descZh: "导入并维护内部制作的视频内容。", descEn: "Import and maintain internally produced video content.",
    filters: [country(), brand(), text("videoId", "视频ID", "Video ID")], fields: [country(), text("contentNo", "编号", "No."), brand(), owner(), text("project", "项目", "Project"), product(), text("videoId", "视频ID", "Video ID"), date("postDate", "发布日期", "Post Date"), file("asset", "内容文件", "Content File")],
    columns: [column("country", "国家", "Country"), column("contentNo", "编号", "No."), column("brand", "品牌", "Brand"), column("owner", "KOL Strategist"), column("project", "项目", "Project"), column("product", "产品", "Product"), column("videoId", "视频ID", "Video ID"), column("postDate", "发布日期", "Post Date")], actions: ["import", "export"],
    seed: [{ id: 1, country: "ID", contentNo: "IHC-2608-021", brand: "Glowsicha", owner: "Shafi", project: "Summer Launch", product: "Tone Up Sunscreen", videoId: "7491283091", postDate: "2026-08-01" }],
  },
} satisfies Partial<Record<PageKey, PageConfig>>);

const paymentFields = [country(), text("paymentNo", "支付编号", "Payment No."), date("createdAt", "创建时间", "Created At"), date("paymentDate", "付款日期", "Payment Date"), owner(), text("department", "部门", "Department"), text("supervisor", "负责人上级", "Supervisor"), text("creatorName", "达人", "Creator"), number("followersK", "粉丝(K)", "Followers (K)"), select("ownContent", "是否自有内容", "Owned Content", [option("Yes", "是", "Yes"), option("No", "否", "No")]), select("platform", "平台", "Platform", platformOptions), brand(), select("contentType", "内容类型", "Content Type", contentTypeOptions), text("rateTier", "费率档位", "Rate Tier"), number("gracePeriod", "宽限期", "Grace Period"), number("unitPrice", "单价", "Unit Price"), number("qty", "数量", "Quantity"), number("totalPrice", "总价", "Total Price"), number("reviewQty", "审核数量", "Review Quantity"), select("qtyMismatch", "数量不一致", "Quantity Mismatch", [option("Yes", "是", "Yes"), option("No", "否", "No")]), date("expectedPostDate", "预计发帖完成日", "Expected Completion"), date("actualPostDate", "实际发帖完成日", "Actual Completion"), number("progress", "进度", "Progress"), area("notes", "备注", "Notes"), text("paymentBank", "Payment Bank"), text("bankName", "Bank Name"), text("accountName", "Account Name"), text("bankAccount", "Bank Account"), text("idNumber", "ID (NPW/KTP)"), text("idName", "ID Name"), file("invoiceFiles", "发票与证件文件", "Invoice and ID Files"), select("paid", "是否已付款", "Paid", [option("Yes", "是", "Yes"), option("No", "否", "No")]), file("paymentProof", "付款凭证", "Payment Proof"), file("agreement", "合作协议", "Agreement"), file("negotiation", "洽谈记录", "Negotiation Record"), select("invoiceVerified", "发票核验", "Invoice Verification", statusOptions), area("financeNotes", "财务备注", "Finance Notes"), select("supervisorApproval", "主管审批", "Supervisor Approval", statusOptions), select("ceoApproval", "CEO 审批", "CEO Approval", statusOptions), select("qtyConsistent", "数量是否一致", "Quantity Consistent", [option("Yes", "是", "Yes"), option("No", "否", "No")])];

const paymentModalFields: FieldDef[] = [
  { ...text("creatorName", "达人名称", "Creator Name"), required: true },
  { ...brand(), required: true },
  { ...select("platform", "平台", "Platform", platformOptions), required: true },
  select("contentType", "内容类型", "Content Type", contentTypeOptions),
  { ...select("ownContent", "是否自有内容", "Owned Content", [option("Yes", "是", "Yes"), option("No", "否", "No")]), required: true },
  text("rateTier", "费率档位", "Rate Tier"),
  { ...number("unitPrice", "单价", "Unit Price"), required: true },
  { ...number("qty", "数量", "Quantity"), required: true },
  number("totalPrice", "总价", "Total Price"),
  { ...number("followersK", "粉丝(K)", "Followers (K)"), required: true },
  owner(), text("supervisor", "Supervisor"), text("submitter", "提交人", "Submitter"),
  date("expectedPostDate", "预计完成日", "Expected Completion"), date("actualPostDate", "实际完成日", "Actual Completion"), area("notes", "备注", "Notes"),
  { ...select("paymentBank", "Payment Bank", "Payment Bank", [option("GST"), option("GIA"), option("Private")]), required: true },
  text("bankName", "Bank Name"), text("accountName", "Account Name"), text("bankAccount", "Bank Account"), text("idNumber", "ID (NPW/KTP)"), text("idName", "ID Name"),
  select("paid", "是否已付款", "Paid", [option("Yes", "是", "Yes"), option("No", "否", "No")]), file("invoiceFiles", "发票与证件文件", "Invoice and ID Files"),
];

Object.assign(pageConfigs, {
  payment: {
    key: "payment", titleZh: "Payment", titleEn: "Payment", descZh: "管理达人付款、银行资料、附件与双层审批。", descEn: "Manage creator payments, bank details, files and two-level approval.",
    filters: [country(), text("paymentNo", "支付编号", "Payment No."), text("creatorName", "达人名称", "Creator Name"), brand(), owner(), date("paymentStart", "付款日期", "Payment Date"), date("paymentEnd", "结束日期", "End Date"), select("invoiceVerified", "发票核验", "Invoice Verification", statusOptions), select("supervisorApproval", "主管审批", "Supervisor Approval", statusOptions), select("ceoApproval", "CEO 审批", "CEO Approval", statusOptions), select("progress", "进度", "Progress", statusOptions), select("paymentBank", "Payment Bank", "Payment Bank", [option("GST", "GST", "GST"), option("Private", "私域", "Private")]), select("source", "来源", "Source", [option("GST", "GST", "GST"), option("Private", "私域", "Private")]), { key: "paymentDateEmpty", zh: "付款日期为空", en: "Payment Date Empty", kind: "checkbox" }], fields: paymentFields, modalFields: paymentModalFields, editFields: paymentFields,
    columns: paymentFields.filter(field => !["country", "invoiceFiles", "paymentProof", "agreement", "negotiation"].includes(field.key)).map(field => column(field.key, field.zh, field.en)).concat([column("invoiceFiles", "发票与证件文件", "Invoice and ID Files"), column("paymentProof", "付款凭证", "Payment Proof"), column("agreement", "合作协议", "Agreement"), column("negotiation", "洽谈记录", "Negotiation Record")]),
    actions: ["add", "edit", "delete", "export"],
    seed: [{ id: 1, paymentNo: "PID20260824000026", createdAt: "2026-08-24", paymentDate: "", owner: "Annisa Putri Nur Aini", department: "Glowsicha", supervisor: "Desy Chintya", creatorName: "fluppydea", followersK: "64.4K", ownContent: "No", platform: "TikTok", brand: "Glowsicha", contentType: "-", rateTier: "C", gracePeriod: 15, unitPrice: 275000, qty: 1, totalPrice: 275000, reviewQty: 0, qtyMismatch: "Yes", expectedPostDate: "", actualPostDate: "", progress: "-", notes: "", paymentBank: "GIA", bankName: "Seabank kalimantan selatan", accountName: "Dea hidayati", bankAccount: "901804750996", idNumber: "6305044607080001", idName: "Dea hidayati", invoiceFiles: "PDF", paid: "No", paymentProof: "-", agreement: "-", negotiation: "-", invoiceVerified: "Pending", financeNotes: "", supervisorApproval: "Pending", ceoApproval: "Pending", qtyConsistent: "No" }, { id: 2, paymentNo: "PID202608247951", createdAt: "2026-08-24", paymentDate: "", owner: "Bam", department: "The Originote", supervisor: "Nasya", creatorName: "babynice6877", followersK: "164.1K", ownContent: "No", platform: "TikTok", brand: "The Originote", contentType: "Video", rateTier: "B", gracePeriod: 15, unitPrice: 5000, qty: 1, totalPrice: 5000, reviewQty: 0, qtyMismatch: "Yes", expectedPostDate: "2026-08-23", actualPostDate: "2026-08-23", progress: "Normal", notes: "", paymentBank: "GST", bankName: "Kasikorn", accountName: "Creator account", bankAccount: "1213846503", idNumber: "1118600049218", idName: "Creator", invoiceFiles: "-", paid: "No", paymentProof: "-", agreement: "-", negotiation: "-", invoiceVerified: "In Progress", financeNotes: "", supervisorApproval: "In Progress", ceoApproval: "Pending", qtyConsistent: "No" }],
  },
  paymentPriceChange: {
    key: "paymentPriceChange", titleZh: "Payment Change Price", titleEn: "Payment Change Price", descZh: "审批付款单价变更并跟踪回写。", descEn: "Approve payment price changes and track write-back.",
    filters: [country(), text("paymentNo", "支付编号", "Payment No."), select("approvalStatus", "审批状态", "Approval Status", statusOptions), { key: "pendingOnly", zh: "仅待审批", en: "Pending Only", kind: "checkbox" }],
    fields: [text("paymentNo", "支付编号", "Payment No."), number("oldPrice", "原单价", "Old Price"), number("newPrice", "新单价", "New Price"), text("applicant", "申请人", "Applicant"), date("appliedAt", "申请时间", "Applied At"), area("reason", "改价原因", "Change Reason"), select("approvalStatus", "审批状态", "Approval Status", statusOptions), text("approver", "审批人", "Approver"), date("approvedAt", "审批时间", "Approved At"), area("approvalComment", "审批意见", "Approval Comment"), select("writtenBack", "已回写", "Written Back", [option("Yes", "是", "Yes"), option("No", "否", "No")])],
    columns: [column("paymentNo", "支付编号", "Payment No."), column("oldPrice", "原单价", "Old Price"), column("newPrice", "新单价", "New Price"), column("applicant", "申请人", "Applicant"), column("appliedAt", "申请时间", "Applied At"), column("reason", "改价原因", "Change Reason"), column("approvalStatus", "审批状态", "Approval Status"), column("approver", "审批人", "Approver"), column("approvedAt", "审批时间", "Approved At"), column("approvalComment", "审批意见", "Approval Comment"), column("writtenBack", "已回写", "Written Back")], actions: ["approve", "export"],
    seed: [{ id: 1, paymentNo: "PID2026080186748", oldPrice: 500000, newPrice: 650000, applicant: "Delvi", appliedAt: "2026-08-02", reason: "Creator rate updated after scope increase", approvalStatus: "Pending", approver: "—", approvedAt: "—", approvalComment: "—", writtenBack: "No" }],
  },
} satisfies Partial<Record<PageKey, PageConfig>>);

const analytics = (key: PageKey, titleZh: string, titleEn: string, filters: FieldDef[], columns: ColumnDef[], seed: Record<string, unknown>[], views?: ViewDef[]): PageConfig => ({ key, titleZh, titleEn, descZh: "按筛选条件查看数据表现并导出分析结果。", descEn: "Review performance by filter and export the analysis.", filters, fields: [], columns, actions: ["export"], seed, views });

Object.assign(pageConfigs, {
  paymentAnalytics: analytics("paymentAnalytics", "Payment Analytics", "Payment Analytics", [country(), date("paymentStart", "付款日期", "Payment Date"), date("paymentEnd", "结束日期", "End Date"), brand()], [column("brand", "品牌", "Brand"), column("rateTier", "费率档位", "Rate Tier"), column("qty", "数量", "Quantity"), column("totalPrice", "总价", "Total Price")], [{ id: 1, brand: "Glowsicha", rateTier: "A", qty: 28, totalPrice: 48600000 }, { id: 2, brand: "Glowsicha", rateTier: "B", qty: 64, totalPrice: 35200000 }]),
  paymentReview: analytics("paymentReview", "Payment and Review Post", "Payment and Review Post", [country(), brand(), date("paymentStart", "付款日期", "Payment Date"), date("paymentEnd", "结束日期", "End Date"), select("qtyConsistent", "数量是否一致", "Quantity Consistent", [option("Yes", "是", "Yes"), option("No", "否", "No")])], [column("paymentDate", "付款日期", "Payment Date"), column("qtyConsistent", "数量是否一致", "Quantity Consistent"), column("brand", "品牌", "Brand"), column("owner", "负责人", "KOL Strategist"), column("qty", "QTY")], [{ id: 1, paymentDate: "2026-08-02", qtyConsistent: "Yes", brand: "Glowsicha", owner: "Delvi", qty: 12 }]),
  yellowBasket: analytics("yellowBasket", "Yellow Basket Analytics", "Yellow Basket Analytics", [country(), date("postMonth", "发帖月份", "Post Month"), brand()], [column("brand", "品牌", "Brand"), column("yes", "Yellow Basket 是", "Yellow Basket Yes"), column("no", "Yellow Basket 否", "Yellow Basket No"), column("posts", "帖子数", "Posts"), column("views", "播放量", "Views")], [{ id: 1, brand: "Glowsicha", yes: 84, no: 19, posts: 103, views: 2680000 }]),
  topRankVideo: analytics("topRankVideo", "Top Rank Video", "Top Rank Video", [country(), date("postMonth", "发帖月份", "Post Month"), brand(), product()], [column("postLink", "帖子链接", "Post Link"), column("product", "产品", "Product"), column("brand", "品牌", "Brand"), column("views", "播放量（汇总）", "Views (Total)"), column("budget", "预算", "Budget"), column("cpm", "CPM"), column("owner", "负责人", "KOL Strategist"), column("postDate", "发帖日期", "Post Date")], [{ id: 1, postLink: "tiktok.com/@parasceria/video/912", product: "Day Cream", brand: "Glowsicha", views: 1620000, budget: 850000, cpm: 525, owner: "Delvi", postDate: "2026-08-01" }]),
  targetAnalytics: analytics("targetAnalytics", "Target Analytics", "Target Analytics", [country(), date("targetMonth", "目标月份", "Target Month"), brand(), product()], [column("product", "产品", "Product"), column("budgetTarget", "Budget Target"), column("actualCost", "Actual Cost"), column("viewsTarget", "Views Target"), column("actualViews", "Actual Views"), column("qtyTarget", "QTY Target"), column("qty", "QTY")], [{ id: 1, product: "Tone Up Sunscreen", budgetTarget: 43000000, actualCost: 17600000, viewsTarget: 4200000, actualViews: 2680000, qtyTarget: 84, qty: 45 }]),
  productAnalytics: analytics("productAnalytics", "Product Analytics", "Product Analytics", [country(), date("postMonth", "发帖月份", "Post Month"), brand(), product()], [column("brand", "品牌", "Brand"), column("product", "产品", "Product"), column("budget", "预算", "Budget"), column("views", "播放量", "Views"), column("ecpm", "ECPM"), column("posts", "帖子数", "Posts"), column("avgViews", "单帖均值播放", "Average Views per Post")], [{ id: 1, brand: "Glowsicha", product: "Day Cream", budget: 850000, views: 1600000, ecpm: 531, posts: 2, avgViews: 800000 }]),
  reviewLevelAnalytics: analytics("reviewLevelAnalytics", "Review Level Analytics", "Review Level Analytics", [country(), date("postMonth", "发帖月份", "Post Month"), brand(), product()], [column("brand", "品牌", "Brand"), column("tier", "Level KOL"), column("product", "产品", "Product"), column("budget", "预算", "Budget"), column("views", "播放量", "Views"), column("realCpm", "Real CPM"), column("posts", "帖子数", "Posts")], [{ id: 1, brand: "Glowsicha", tier: "A", product: "Tone Up Sunscreen", budget: 1700000, views: 1180000, realCpm: 1440, posts: 3 }]),
  videoAnalytics: analytics("videoAnalytics", "Video Analytics", "Video Analytics", [country(), date("statStart", "Stat Date", "Stat Date"), date("statEnd", "结束日期", "End Date"), date("postDate", "Post Date"), brand(), product(), select("creatorType", "Creator Type", "Creator Type", creatorTypeOptions), text("creatorName", "Creator Name"), select("creatorTier", "Creator Tier", "Creator Tier", tierOptions), text("videoId", "Video ID")], [column("brand", "品牌", "Brand"), column("creatorQty", "Creator QTY"), column("videoQty", "Total Video QTY"), column("vv", "VV"), column("gmv", "GMV"), column("pgmRoi", "PGM ROI"), column("totalRoi", "Total ROI")], [{ id: 1, brand: "Glowsicha", creatorQty: 36, videoQty: 84, vv: 4200000, gmv: 640000000, pgmRoi: 8.9, totalRoi: 11.48 }]),
  missingPid: analytics("missingPid", "Missing PID", "Missing PID", [country(), brand(), product(), date("targetStart", "Target Date", "Target Date"), date("targetEnd", "结束日期", "End Date")], [column("brand", "品牌", "Brand"), column("product", "Product"), column("videoCost", "Total Video Cost"), column("paidVideoQty", "Paid Video QTY"), column("avgVideoCost", "AVG Video Cost"), column("vv", "VV"), column("gmv", "GMV"), column("pgmRoi", "PGM ROI"), column("totalRoi", "Total ROI"), column("vv2m", "VV-2M"), column("gmv2m", "GMV-2M"), column("pgmRoi2m", "PGM ROI-2M")], [{ id: 1, brand: "Glowsicha", product: "Body Scrub", videoCost: 600000, paidVideoQty: 1, avgVideoCost: 600000, vv: 0, gmv: 0, pgmRoi: 0, totalRoi: 0, vv2m: 0, gmv2m: 0, pgmRoi2m: 0 }]),
} satisfies Partial<Record<PageKey, PageConfig>>);

const overviewColumns = [column("brand", "品牌", "Brand"), column("product", "Product"), column("owner", "负责人", "KOL Strategist"), column("budget", "Budget"), column("cost", "Cost"), column("budgetRate", "%"), column("viewsTarget", "Views Target"), column("views", "Views"), column("viewsRate", "%"), column("qtyTarget", "QTY Target"), column("qty", "QTY"), column("qtyRate", "%")];
const performanceColumns = [column("brand", "品牌", "Brand"), column("product", "Product"), column("videoCost", "Total Video Cost"), column("paidVideoQty", "Paid Video QTY"), column("avgVideoCost", "AVG Video Cost"), column("vv", "VV"), column("gmv", "GMV"), column("pgmRoi", "PGM ROI"), column("totalRoi", "Total ROI"), column("vv2m", "VV-2M"), column("gmv2m", "GMV-2M"), column("pgmRoi2m", "PGM ROI-2M")];
pageConfigs.kolTargetReport = {
  key: "kolTargetReport", titleZh: "KOL Target Analytics", titleEn: "KOL Target Analytics", descZh: "目标、成本、效果与视频明细的综合分析。", descEn: "Combined target, cost, performance and video-detail analysis.",
  filters: [country(), brand(), product(), date("targetStart", "Target Date", "Target Date"), date("targetEnd", "结束日期", "End Date"), select("contentType", "Content Type", "Content Type", contentTypeOptions)], fields: [], columns: overviewColumns, actions: ["export"],
  views: [
    { key: "overview", zh: "目标概览", en: "Target Overview", columns: overviewColumns },
    { key: "cost", zh: "成本汇总", en: "Cost Summary", columns: [column("brand", "品牌", "Brand"), column("owner", "负责人", "KOL Strategist"), column("product", "Product"), column("cost", "Cost"), column("qty", "QTY")] },
    { key: "performance", zh: "效果汇总", en: "Performance", columns: performanceColumns },
    { key: "video", zh: "视频明细", en: "Video Detail", columns: [column("videoLink", "Video Link"), column("creatorName", "Creator Name"), column("brand", "品牌", "Brand"), column("product", "Product Name"), column("owner", "负责人", "KOL Strategist"), column("postDate", "Post Date"), column("videoCost", "Video Cost")] },
  ],
  seed: [{ id: 1, brand: "Glowsicha", product: "Tone Up Sunscreen", owner: "Nadia", budget: 43000000, cost: 17600000, budgetRate: "41%", viewsTarget: 4200000, views: 2680000, viewsRate: "64%", qtyTarget: 84, qty: 45, qtyRate: "54%", videoCost: 17600000, paidVideoQty: 45, avgVideoCost: 391111, vv: 2680000, gmv: 333000000, pgmRoi: 8.9, totalRoi: 11.48, vv2m: 3200000, gmv2m: 412000000, pgmRoi2m: 10.2, videoLink: "tiktok.com/video/912", creatorName: "parasceria", postDate: "2026-08-01" }],
};

Object.assign(pageConfigs, {
  brandData: {
    key: "brandData", titleZh: "Brand", titleEn: "Brand", descZh: "维护品牌、简称、在售国家与负责人。", descEn: "Manage brands, abbreviations, selling countries and owners.",
    filters: [country(), text("brandName", "品牌名称", "Brand Name"), text("shortName", "简称", "Short Name")], fields: [text("brandName", "品牌名称", "Brand Name"), text("shortName", "简称", "Short Name"), text("sellingCountries", "在售国家/地区", "Selling Countries"), text("brandManager", "品牌经理", "Brand Manager"), text("pic", "KOL Strategist")],
    columns: [column("brandName", "品牌名称", "Brand Name"), column("shortName", "简称", "Short Name"), column("sellingCountries", "在售国家/地区", "Selling Countries"), column("brandManager", "品牌经理", "Brand Manager"), column("pic", "KOL Strategist"), column("createdBy", "创建人", "Created By"), column("createdAt", "创建时间", "Created At")], actions: ["add", "edit", "delete", "export"],
    seed: [{ id: 1, brandName: "Glowsicha", shortName: "GSC", sellingCountries: "ID, MY, VN, TH, PH, SG", brandManager: "Mia", pic: "Nadia, Delvi", createdBy: "admin", createdAt: "2025-11-08" }],
  },
  productData: {
    key: "productData", titleZh: "Product", titleEn: "Product", descZh: "维护产品与店铺商品映射。", descEn: "Manage products and store-product mappings.",
    filters: [country(), brand(), text("productName", "产品名称", "Product Name"), text("storeProductId", "店铺商品ID", "Store Product ID"), text("storeProductName", "店铺商品名称", "Store Product Name")], fields: [country(), brand(), text("productName", "产品名称", "Product Name"), text("storeProductId", "店铺商品ID", "Store Product ID"), text("storeProductName", "店铺商品名称", "Store Product Name")],
    columns: [column("country", "国家", "Country"), column("brand", "品牌名称", "Brand Name"), column("productName", "产品名称", "Product Name"), column("storeProductId", "店铺商品ID", "Store Product ID"), column("storeProductName", "店铺商品名称", "Store Product Name")], actions: ["add", "edit", "delete", "export"],
    seed: [{ id: 1, country: "ID", brand: "Glowsicha", productName: "Tone Up Sunscreen", storeProductId: "172938475610", storeProductName: "Glowsicha Tone Up Sunscreen SPF50 50ml" }, { id: 2, country: "ID", brand: "Glowsicha", productName: "Day Cream", storeProductId: "172938475622", storeProductName: "Glowsicha Day Cream 30g" }],
  },
} satisfies Partial<Record<PageKey, PageConfig>>);

Object.assign(pageConfigs, {
  users: {
    key: "users", titleZh: "用户管理", titleEn: "User Management", descZh: "管理组织、账号、角色与状态。", descEn: "Manage organization, accounts, roles and status.",
    filters: [text("department", "请输入部门名称", "Department"), text("username", "用户名称", "Username"), text("nickname", "用户昵称", "Nickname"), text("email", "邮箱", "Email"), select("status", "状态", "Status", statusOptions), date("createdStart", "创建时间", "Created At"), date("createdEnd", "结束日期", "End Date")],
    fields: [text("username", "用户名称", "Username"), text("nickname", "用户昵称", "Nickname"), text("department", "部门", "Department"), text("email", "邮箱", "Email"), text("phone", "手机号", "Phone"), text("role", "角色", "Role"), text("password", "初始密码", "Initial Password"), select("status", "状态", "Status", statusOptions)],
    columns: [column("avatar", "头像", "Avatar"), column("username", "用户名称", "Username"), column("nickname", "用户昵称", "Nickname"), column("department", "部门", "Department"), column("email", "email", "Email"), column("status", "状态", "Status"), column("createdAt", "创建时间", "Created At")], actions: ["add", "edit", "delete", "export"],
    seed: [{ id: 1, avatar: "UT", username: "uthan@goodsale.tech", nickname: "Uthan", department: "信息技术部", email: "uthan@goodsale.tech", status: "Approved", createdAt: "2025-10-01" }],
  },
  roles: {
    key: "roles", titleZh: "角色管理", titleEn: "Role Management", descZh: "配置角色、权限字符、菜单权限与状态。", descEn: "Configure roles, permission keys, menu access and status.",
    filters: [text("roleName", "角色名称", "Role Name"), text("permissionKey", "权限字符", "Permission Key"), select("status", "状态", "Status", statusOptions), date("createdStart", "创建时间", "Created At"), date("createdEnd", "结束日期", "End Date")],
    fields: [text("roleName", "角色名称", "Role Name"), text("permissionKey", "权限字符", "Permission Key"), number("displayOrder", "角色顺序", "Role Order"), select("status", "状态", "Status", statusOptions), area("menuPermissions", "菜单权限", "Menu Permissions"), area("notes", "备注", "Notes")],
    columns: [column("roleName", "角色名称", "Role Name"), column("permissionKey", "权限字符", "Permission Key"), column("displayOrder", "显示顺序", "Display Order"), column("status", "状态", "Status"), column("createdAt", "创建时间", "Created At")], actions: ["add", "edit", "delete", "export"],
    seed: [{ id: 1, roleName: "管理员", permissionKey: "admin", displayOrder: 1, status: "Approved", createdAt: "2025-10-01", menuPermissions: "All" }, { id: 2, roleName: "品牌经理", permissionKey: "brand_manager", displayOrder: 2, status: "Approved", createdAt: "2025-10-02", menuPermissions: "Target, Creator, Content, Analysis" }],
  },
  menus: {
    key: "menus", titleZh: "菜单管理", titleEn: "Menu Management", descZh: "配置目录、菜单、按钮与路由权限。", descEn: "Configure directories, menus, buttons and route permissions.",
    filters: [text("menuName", "菜单名称", "Menu Name"), select("status", "状态", "Status", statusOptions)],
    fields: [text("parentMenu", "上级菜单", "Parent Menu"), select("menuType", "菜单类型", "Menu Type", [option("Directory", "目录", "Directory"), option("Menu", "菜单", "Menu"), option("Button", "按钮", "Button")]), text("icon", "菜单图标", "Menu Icon"), text("menuName", "菜单名称", "Menu Name"), number("sort", "显示排序", "Display Order"), select("external", "是否外链", "External Link", [option("Yes", "是", "Yes"), option("No", "否", "No")]), text("route", "路由地址", "Route"), text("permission", "权限标识", "Permission"), text("component", "组件路径", "Component Path"), select("display", "显示状态", "Display Status", [option("Show", "显示", "Show"), option("Hide", "隐藏", "Hide")]), select("status", "菜单状态", "Menu Status", statusOptions)],
    columns: [column("menuName", "菜单名称", "Menu Name"), column("icon", "图标", "Icon"), column("sort", "排序", "Order"), column("permission", "权限标识", "Permission"), column("component", "组件路径", "Component Path"), column("status", "状态", "Status"), column("createdAt", "创建时间", "Created At")], actions: ["add", "edit", "delete"],
    seed: [{ id: 1, parentMenu: "Root", menuType: "Directory", icon: "Target", menuName: "Target", sort: 1, external: "No", route: "/target", permission: "target:view", component: "Layout", display: "Show", status: "Approved", createdAt: "2025-10-01" }],
  },
  notices: {
    key: "notices", titleZh: "通知公告", titleEn: "Notices", descZh: "发布并维护系统通知与公告内容。", descEn: "Publish and maintain system notices and announcements.",
    filters: [text("title", "公告标题", "Notice Title"), text("operator", "操作人员", "Operator"), select("type", "类型", "Type", [option("Notice", "通知", "Notice"), option("Announcement", "公告", "Announcement")])],
    fields: [text("title", "公告标题", "Notice Title"), select("type", "公告类型", "Notice Type", [option("Notice", "通知", "Notice"), option("Announcement", "公告", "Announcement")]), select("status", "状态", "Status", statusOptions), area("content", "内容", "Content")],
    columns: [column("title", "公告标题", "Notice Title"), column("type", "公告类型", "Notice Type"), column("status", "状态", "Status"), column("createdBy", "创建者", "Created By"), column("createdAt", "创建时间", "Created At")], actions: ["add", "edit", "delete"],
    seed: [{ id: 1, title: "August target planning window", type: "Notice", status: "Approved", content: "Please complete August target planning before the 5th.", createdBy: "admin", createdAt: "2026-08-01" }],
  },
} satisfies Partial<Record<PageKey, PageConfig>>);

const logConfig = (key: PageKey, titleZh: string, titleEn: string, filters: FieldDef[], columns: ColumnDef[], seed: Record<string, unknown>[], actions: ActionKey[]): PageConfig => ({ key, titleZh, titleEn, descZh: "查询、筛选并导出系统记录。", descEn: "Search, filter and export system records.", filters, fields: [], columns, actions, seed });
Object.assign(pageConfigs, {
  operLogs: logConfig("operLogs", "操作日志", "Operation Logs", [text("address", "操作地址", "Operation Address"), text("module", "系统模块", "System Module"), text("operator", "操作人员", "Operator"), select("type", "类型", "Type", [option("Create", "新增", "Create"), option("Update", "修改", "Update"), option("Delete", "删除", "Delete")]), select("status", "状态", "Status", statusOptions), date("start", "操作时间", "Operation Time"), date("end", "结束日期", "End Date")], [column("logNo", "日志编号", "Log No."), column("module", "系统模块", "System Module"), column("type", "操作类型", "Operation Type"), column("operator", "操作人员", "Operator"), column("department", "部门", "Department"), column("address", "操作地址", "Operation Address"), column("status", "操作状态", "Status"), column("date", "操作日期", "Operation Date"), column("duration", "消耗时间", "Duration")], [{ id: 1, logNo: "OP-20260802-991", module: "Creator", type: "Update", operator: "uthan@goodsale.tech", department: "IT", address: "10.20.1.18", status: "Approved", date: "2026-08-02 10:22", duration: "182ms" }], ["delete", "clear", "export"]),
  loginLogs: logConfig("loginLogs", "登录日志", "Login Logs", [text("address", "登录地址", "Login Address"), text("username", "用户名称", "Username"), select("status", "状态", "Status", statusOptions), date("start", "登录时间", "Login Time"), date("end", "结束日期", "End Date")], [column("visitNo", "访问编号", "Visit No."), column("username", "用户名称", "Username"), column("client", "客户端", "Client"), column("deviceType", "设备类型", "Device Type"), column("address", "地址", "Address"), column("location", "登录地点", "Location"), column("os", "操作系统", "OS"), column("browser", "浏览器", "Browser"), column("status", "登录状态", "Status"), column("description", "描述", "Description"), column("date", "访问时间", "Visit Time")], [{ id: 1, visitNo: "LOGIN-20260802-119", username: "uthan@goodsale.tech", client: "Web", deviceType: "Desktop", address: "10.20.1.18", location: "Jakarta", os: "macOS", browser: "Chrome", status: "Approved", description: "Login successful", date: "2026-08-02 09:11" }], ["delete", "clear", "unlock", "export"]),
  onlineUsers: logConfig("onlineUsers", "在线用户", "Online Users", [text("address", "登录地址", "Login Address"), text("username", "用户名称", "Username")], [column("sequence", "序号", "No."), column("sessionNo", "会话编号", "Session No."), column("username", "登录名称", "Username"), column("client", "客户端", "Client"), column("deviceType", "设备类型", "Device Type"), column("department", "所属部门", "Department"), column("host", "主机", "Host"), column("location", "登录地点", "Location"), column("os", "操作系统", "OS"), column("browser", "浏览器", "Browser"), column("loginTime", "登录时间", "Login Time")], [{ id: 1, sequence: 1, sessionNo: "S-918273645", username: "uthan@goodsale.tech", client: "Web", deviceType: "Desktop", department: "IT", host: "10.20.1.18", location: "Jakarta", os: "macOS", browser: "Chrome", loginTime: "2026-08-02 09:11" }], ["delete", "export"]),
} satisfies Partial<Record<PageKey, PageConfig>>);

export const menuGroups: { key: string; zh: string; en: string; pages: { key: PageKey; zh: string; en: string }[] }[] = [
  { key: "home", zh: "Home", en: "Home", pages: [{ key: "home", zh: "Home", en: "Home" }] },
  { key: "target", zh: "Target", en: "Target", pages: [{ key: "targetDashboard", zh: "Dashboard", en: "Dashboard" }, { key: "productTarget", zh: "Target", en: "Target" }, { key: "ownTarget", zh: "Own Target", en: "Own Target" }] },
  { key: "creator", zh: "Creator", en: "Creator", pages: [{ key: "creator", zh: "Creator", en: "Creator" }] },
  { key: "content", zh: "Content", en: "Content", pages: [{ key: "reviews", zh: "Reviews", en: "Reviews" }, { key: "ownMediaReview", zh: "Own Media Review", en: "Own Media Review" }] },
  { key: "finance", zh: "Finance", en: "Finance", pages: [{ key: "payment", zh: "Payment", en: "Payment" }, { key: "paymentPriceChange", zh: "Payment Change Price", en: "Payment Change Price" }] },
  { key: "analysis", zh: "Analysis", en: "Analysis", pages: [{ key: "paymentAnalytics", zh: "Payment Analytics", en: "Payment Analytics" }, { key: "paymentReview", zh: "Payment and Review Post", en: "Payment and Review Post" }, { key: "yellowBasket", zh: "Yellow Basket Analytics", en: "Yellow Basket Analytics" }, { key: "topRankVideo", zh: "Top Rank Video", en: "Top Rank Video" }, { key: "targetAnalytics", zh: "Target Analytics", en: "Target Analytics" }, { key: "productAnalytics", zh: "Product Analytics", en: "Product Analytics" }, { key: "reviewLevelAnalytics", zh: "Review Level Analytics", en: "Review Level Analytics" }, { key: "videoAnalytics", zh: "Video Analytics", en: "Video Analytics" }, { key: "kolTargetReport", zh: "KOL Target Analytics", en: "KOL Target Analytics" }, { key: "missingPid", zh: "Missing PID", en: "Missing PID" }] },
  { key: "basic", zh: "Basic Data", en: "Basic Data", pages: [{ key: "brandData", zh: "Brand", en: "Brand" }, { key: "productData", zh: "Product", en: "Product" }, { key: "budgetRule", zh: "Budget Rule Config", en: "Budget Rule Config" }] },
  { key: "system", zh: "系统管理", en: "System Management", pages: [{ key: "users", zh: "用户管理", en: "Users" }, { key: "roles", zh: "角色管理", en: "Roles" }, { key: "menus", zh: "菜单管理", en: "Menus" }, { key: "notices", zh: "通知公告", en: "Notices" }, { key: "operLogs", zh: "操作日志", en: "Operation Logs" }, { key: "loginLogs", zh: "登录日志", en: "Login Logs" }] },
  { key: "monitor", zh: "系统监控", en: "System Monitor", pages: [{ key: "onlineUsers", zh: "在线用户", en: "Online Users" }] },
];

export const roles: { key: RoleKey; zh: string; en: string; groups: string[]; canEdit: string[]; canApprove: string[] }[] = [
  { key: "country", zh: "国家经理", en: "Country Manager", groups: ["home", "target", "creator", "content", "finance", "analysis", "basic"], canEdit: ["target", "creator", "content", "basic"], canApprove: ["finance", "target"] },
  { key: "brand", zh: "品牌经理", en: "Brand Manager", groups: ["home", "target", "creator", "content", "finance", "analysis", "basic"], canEdit: ["target", "creator", "content", "finance", "basic"], canApprove: ["target"] },
  { key: "kolPic", zh: "KOL Strategist", en: "KOL Strategist", groups: ["home", "target", "creator", "content", "finance"], canEdit: ["creator", "content", "finance"], canApprove: [] },
  { key: "ads", zh: "广告经理", en: "Ads Manager", groups: ["home", "target", "content", "analysis"], canEdit: ["content"], canApprove: [] },
  { key: "finance", zh: "财务", en: "Finance", groups: ["home", "finance", "analysis", "basic"], canEdit: ["finance"], canApprove: ["finance"] },
  { key: "analyst", zh: "数据分析师", en: "Data Analyst", groups: ["home", "target", "analysis"], canEdit: [], canApprove: [] },
  { key: "admin", zh: "管理员", en: "Administrator", groups: menuGroups.map(group => group.key), canEdit: menuGroups.map(group => group.key), canApprove: menuGroups.map(group => group.key) },
];

export const pageGroup = (page: PageKey) => menuGroups.find(group => group.pages.some(item => item.key === page))?.key || "home";

