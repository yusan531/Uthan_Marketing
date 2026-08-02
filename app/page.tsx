"use client";

import { useMemo, useState } from "react";

const nav = [
  ["总览", "⌂"],
  ["Target 目标", "◎"],
  ["Budget 预算", "◒"],
  ["KOL 达人", "♢"],
  ["Campaign 活动", "▣"],
  ["Content 内容", "▤"],
  ["Sample 样品", "▧"],
  ["Video / Post", "▷"],
  ["Payment 付款", "￥"],
  ["Report 报表", "▥"],
  ["基础配置", "⚙"],
];

const campaigns = [
  { name: "夏日防晒种草计划", owner: "品牌市场部 · Mia", status: "进行中", color: "blue", progress: 68, budget: "¥ 320,000", end: "06/30" },
  { name: "618 大促整合营销", owner: "电商增长组 · James", status: "进行中", color: "blue", progress: 42, budget: "¥ 580,000", end: "06/18" },
  { name: "新品精华预热 Campaign", owner: "新品项目组 · Zoe", status: "待启动", color: "yellow", progress: 12, budget: "¥ 180,000", end: "07/15" },
];

function Bar({ value, color = "blue" }: { value: number; color?: string }) {
  return <div className="bar"><span className={`bar-fill ${color}`} style={{ width: `${value}%` }} /></div>;
}

export default function Home() {
  const [active, setActive] = useState("总览");
  const [notice, setNotice] = useState(0);
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => campaigns.filter(c => c.name.includes(search) || c.owner.includes(search)), [search]);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">M</span><span>Marketing<span className="brand-dot">.</span></span></div>
        <div className="workspace-switch"><span className="workspace-avatar">L</span><span><b>LOreal China</b><small>增长营销团队</small></span><span className="chevron">⌄</span></div>
        <div className="nav-label">WORKSPACE</div>
        <nav>{nav.map(([label, icon]) => <button key={label} className={active === label ? "nav-item active" : "nav-item"} onClick={() => setActive(label)}><span className="nav-icon">{icon}</span><span>{label}</span>{label === "总览" && <span className="nav-pip" />}</button>)}</nav>
        <div className="sidebar-bottom"><button className="help"><span>?</span> 帮助中心</button><div className="user-card"><span className="user-avatar">M</span><span><b>Mia Chen</b><small>管理员</small></span><span className="more">···</span></div></div>
      </aside>
      <section className="main-area">
        <header className="topbar"><div className="breadcrumbs"><span>Workspace</span><b>/</b><strong>{active}</strong></div><div className="top-actions"><label className="search"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索活动、达人或任务..." /></label><button className="icon-btn" onClick={() => setNotice(notice + 1)} aria-label="通知">♧{notice > 0 && <i>{notice}</i>}</button><span className="top-avatar">M</span></div></header>
        <div className="content">
          <div className="page-heading"><div><p className="eyebrow">MONDAY, JUNE 10, 2024 <span className="live-dot" /> LIVE VIEW</p><h1>早上好，Mia <span className="wave">✦</span></h1><p className="subheading">这是你的 Marketing 工作台，以下是本周最值得关注的进展。</p></div><button className="primary-btn" onClick={() => setActive("Campaign 活动")}><span>＋</span> 新建 Campaign</button></div>
          <div className="stat-grid"><div className="stat-card"><div className="stat-top"><span>总预算使用率</span><span className="stat-icon purple">◒</span></div><strong>68.4<span>%</span></strong><div className="stat-bottom"><span className="trend up">↗ 8.2%</span><span>较上月</span></div><div className="sparkline purple-line"><i/><i/><i/><i/><i/><i/><i/></div></div><div className="stat-card"><div className="stat-top"><span>本月内容产出</span><span className="stat-icon orange">▤</span></div><strong>126<span className="unit">条</span></strong><div className="stat-bottom"><span className="trend up">↗ 14.6%</span><span>较上月</span></div><div className="sparkline orange-line"><i/><i/><i/><i/><i/><i/><i/></div></div><div className="stat-card"><div className="stat-top"><span>合作中 KOL</span><span className="stat-icon green">♢</span></div><strong>48<span className="unit">位</span></strong><div className="stat-bottom"><span className="trend up">↗ 6 位</span><span>本季度新增</span></div><div className="avatar-stack"><span>Y</span><span>S</span><span>C</span><span className="plus">+12</span></div></div><div className="stat-card"><div className="stat-top"><span>平均内容 ROI</span><span className="stat-icon blue">↗</span></div><strong>3.82<span className="unit">x</span></strong><div className="stat-bottom"><span className="trend up">↗ 0.6x</span><span>较上月</span></div><div className="sparkline blue-line"><i/><i/><i/><i/><i/><i/><i/></div></div></div>
          <div className="section-grid"><div className="panel budget-panel"><div className="panel-heading"><div><h2>预算概览</h2><p>2024 年度 Marketing 总预算使用情况</p></div><button className="ghost-btn" onClick={() => setActive("Budget 预算")}>查看详情 <span>→</span></button></div><div className="budget-main"><div className="donut-wrap"><div className="donut"><span><b>¥1.08M</b><small>已使用</small></span></div><div className="donut-legend"><span><i className="dot purple-bg" />已使用 <b>68.4%</b></span><span><i className="dot gray-bg" />剩余 <b>31.6%</b></span></div></div><div className="budget-list"><div><span><i className="dot purple-bg" />Content 内容</span><b>¥ 428,600</b><Bar value={76} color="purple" /></div><div><span><i className="dot blue-bg" />KOL 合作</span><b>¥ 356,200</b><Bar value={61} color="blue" /></div><div><span><i className="dot orange-bg" />Media 投放</span><b>¥ 182,800</b><Bar value={43} color="orange" /></div><div><span><i className="dot green-bg" />Other 其他</span><b>¥ 112,400</b><Bar value={28} color="green" /></div></div></div></div><div className="panel goal-panel"><div className="panel-heading"><div><h2>本季目标进度</h2><p>Q2 2024 · 核心 KPI</p></div><button className="dots">···</button></div><div className="goal"><div className="goal-label"><span><i className="goal-icon purple">◉</i>品牌声量 Share of Voice</span><b>76%</b></div><Bar value={76} color="purple" /><small>目标：提升至行业第 2 名</small></div><div className="goal"><div className="goal-label"><span><i className="goal-icon blue">↗</i>电商 GMV 增长</span><b>64%</b></div><Bar value={64} color="blue" /><small>目标：¥ 2,500,000</small></div><div className="goal"><div className="goal-label"><span><i className="goal-icon orange">◇</i>新品用户触达</span><b>89%</b></div><Bar value={89} color="orange" /><small>目标：10,000,000 人次</small></div><button className="full-ghost" onClick={() => setActive("Target 目标")}>管理目标 <span>→</span></button></div></div>
          <div className="panel campaign-panel"><div className="panel-heading"><div><h2>重点 Campaign</h2><p>正在进行与即将开始的活动</p></div><div className="table-actions"><button className="filter-btn">所有状态⌄</button><button className="ghost-btn" onClick={() => setActive("Campaign 活动")}>查看全部 <span>→</span></button></div></div><div className="table"><div className="table-head"><span>CAMPAIGN</span><span>STATUS</span><span>PROGRESS</span><span>BUDGET</span><span>END DATE</span><span /></div>{filtered.map(c => <div className="table-row" key={c.name}><div className="campaign-name"><span className={`campaign-symbol ${c.color}`}>✦</span><span><b>{c.name}</b><small>{c.owner}</small></span></div><span className={`status ${c.color}`}><i />{c.status}</span><span className="progress-cell"><Bar value={c.progress} color={c.color} /><small>{c.progress}%</small></span><b className="budget-cell">{c.budget}</b><span className="date-cell">{c.end}</span><button className="row-more">···</button></div>)}</div></div>
          <div className="bottom-grid"><div className="panel activity-panel"><div className="panel-heading"><div><h2>最近动态</h2><p>团队最新活动与提醒</p></div><button className="dots">···</button></div><div className="activity"><span className="activity-icon purple">✓</span><span><b>Content 任务已完成</b><small>夏日防晒种草计划 · 小红书图文 × 8</small></span><time>10 分钟前</time></div><div className="activity"><span className="activity-icon blue">♢</span><span><b>新的 KOL 已加入</b><small>小红书 · @BeautyWithYuki · 美妆垂类</small></span><time>1 小时前</time></div><div className="activity"><span className="activity-icon orange">!</span><span><b>预算审批待处理</b><small>618 大促整合营销 · ¥ 85,000</small></span><time>3 小时前</time></div><button className="full-ghost" onClick={() => setActive("Report 报表")}>查看全部动态 <span>→</span></button></div><div className="panel quick-panel"><div className="panel-heading"><div><h2>快捷入口</h2><p>常用功能，一键直达</p></div></div><div className="quick-grid"><button onClick={() => setActive("KOL 达人")}><span className="quick-icon purple">♢</span><b>添加 KOL</b><small>录入达人信息</small></button><button onClick={() => setActive("Content 内容")}><span className="quick-icon orange">▤</span><b>创建任务</b><small>发布内容 Brief</small></button><button onClick={() => setActive("Payment 付款")}><span className="quick-icon blue">￥</span><b>申请付款</b><small>提交付款申请</small></button><button onClick={() => setActive("Report 报表")}><span className="quick-icon green">▥</span><b>生成报表</b><small>查看数据分析</small></button></div></div></div>
          <footer>Marketing System <span>·</span> 你的增长，从这里开始 <span className="footer-right">v1.0 Prototype</span></footer>
        </div>
      </section>
    </main>
  );
}
