import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

const FORECAST_DATA = {
  opening_balance: 1240000,
  weeks: [
    { week: 1, label: "May 5–9", ar_inflows: 285000, ap_outflows: 198000, committed_outflows: 45000, net: 42000, running_balance: 1282000, high_variance_flag: false, variance_note: null },
    { week: 2, label: "May 12–16", ar_inflows: 310000, ap_outflows: 241000, committed_outflows: 38000, net: 31000, running_balance: 1313000, high_variance_flag: false, variance_note: null },
    { week: 3, label: "May 19–23", ar_inflows: 84000, ap_outflows: 189000, committed_outflows: 52000, net: -157000, running_balance: 1156000, high_variance_flag: true, variance_note: "⚠ Lender draw for Job 5042 (Lot 14) not received as scheduled. Primary driver of $84K shortfall. Recommended: no discretionary A/P releases without CFO approval." },
    { week: 4, label: "May 26–30", ar_inflows: 442000, ap_outflows: 215000, committed_outflows: 28000, net: 199000, running_balance: 1355000, high_variance_flag: true, variance_note: "⚠ Single lender draw + 2 closings = 87% of week inflow. Forecast vulnerable to timing shift." },
    { week: 5, label: "Jun 2–6", ar_inflows: 198000, ap_outflows: 171000, committed_outflows: 41000, net: -14000, running_balance: 1341000, high_variance_flag: false, variance_note: null },
    { week: 6, label: "Jun 9–13", ar_inflows: 325000, ap_outflows: 244000, committed_outflows: 35000, net: 46000, running_balance: 1387000, high_variance_flag: false, variance_note: null },
    { week: 7, label: "Jun 16–20", ar_inflows: 267000, ap_outflows: 198000, committed_outflows: 62000, net: 7000, running_balance: 1394000, high_variance_flag: false, variance_note: null },
    { week: 8, label: "Jun 23–27", ar_inflows: 412000, ap_outflows: 289000, committed_outflows: 44000, net: 79000, running_balance: 1473000, high_variance_flag: true, variance_note: "⚠ Quarter-end draw concentration. Single draw = 74% of week inflows." },
    { week: 9, label: "Jun 30–Jul 4", ar_inflows: 88000, ap_outflows: 142000, committed_outflows: 18000, net: -72000, running_balance: 1401000, high_variance_flag: true, variance_note: "⚠ Holiday week. Reduced closings; normal outflows continue. Low inflow exposure." },
    { week: 10, label: "Jul 7–11", ar_inflows: 349000, ap_outflows: 221000, committed_outflows: 47000, net: 81000, running_balance: 1482000, high_variance_flag: false, variance_note: null },
    { week: 11, label: "Jul 14–18", ar_inflows: 278000, ap_outflows: 204000, committed_outflows: 39000, net: 35000, running_balance: 1517000, high_variance_flag: false, variance_note: null },
    { week: 12, label: "Jul 21–25", ar_inflows: 318000, ap_outflows: 267000, committed_outflows: 55000, net: -4000, running_balance: 1513000, high_variance_flag: false, variance_note: null },
    { week: 13, label: "Jul 28–Aug 1", ar_inflows: 389000, ap_outflows: 241000, committed_outflows: 48000, net: 100000, running_balance: 1613000, high_variance_flag: false, variance_note: null },
  ],
  summary: { total_inflows_13wk: 3745000, total_outflows_13wk: 3316000, net_13wk_change: 373000, closing_balance_week13: 1613000, high_variance_weeks: [3, 4, 8, 9], minimum_balance_week: 3, minimum_balance_amount: 1156000 }
};

const fmt = (n) => n >= 1000000 ? `$${(n/1000000).toFixed(2)}M` : `$${(n/1000).toFixed(0)}K`;
const fmtFull = (n) => `$${n.toLocaleString()}`;

const JDE_SOURCES = [
  { table: "F03B11", alias: "Customer Ledger", module: "A/R", fields: "AAP, DDJ, AN8, PST", role: "Inflow timing" },
  { table: "F0411", alias: "A/P Ledger", module: "A/P", fields: "AAAP, DDJ, AN8, PST, PYME", role: "Outflow timing" },
  { table: "F5116", alias: "Job Cost Summary", module: "Job Cost", fields: "AC ledger, MCU, OBJ", role: "Committed obligations" },
  { table: "F0902", alias: "Account Balances", module: "G/L", fields: "GBAM, OBJ (cash range)", role: "Opening balance" },
];

const AUTOMATION_VERDICTS = [
  { requirement: "Weekly forecast calculation", verdict: "AUTOMATE", color: "#22c55e", reason: "Arithmetic from defined tables" },
  { requirement: "High-variance week flagging", verdict: "AUTOMATE", color: "#22c55e", reason: "Rule-based threshold" },
  { requirement: "Variance alert drafting", verdict: "AUTOMATE", color: "#22c55e", reason: "Pattern matching + NL generation" },
  { requirement: "A/P release recommendation", verdict: "AUGMENT", color: "#f59e0b", reason: "Agent recommends; CFO decides" },
  { requirement: "A/P hold in flagged week", verdict: "HUMAN-ONLY", color: "#ef4444", reason: "No automated hold w/o CFO decision" },
  { requirement: "Draw submission timing", verdict: "AUGMENT", color: "#f59e0b", reason: "Agent flags risk; Controller decides" },
  { requirement: "Lender communication", verdict: "HUMAN-ONLY", color: "#ef4444", reason: "All lender comms human-originated" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const wk = FORECAST_DATA.weeks.find(w => w.label === label);
    return (
      <div style={{ background: "#0f1923", border: "1px solid #1e3a52", borderRadius: 8, padding: "12px 16px", fontFamily: "monospace", fontSize: 12 }}>
        <p style={{ color: "#94a3b8", marginBottom: 6, fontWeight: 700 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, margin: "2px 0" }}>{p.name}: {fmtFull(p.value)}</p>
        ))}
        {wk?.high_variance_flag && <p style={{ color: "#f59e0b", marginTop: 6, fontSize: 11 }}>⚠ HIGH VARIANCE WEEK</p>}
      </div>
    );
  }
  return null;
};

export default function CashFlowForecast() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedWeek, setSelectedWeek] = useState(null);

  const chartData = FORECAST_DATA.weeks.map(w => ({
    label: `W${w.week}`,
    fullLabel: w.label,
    "Cash Position": w.running_balance,
    "Net Flow": w.net,
    Inflows: w.ar_inflows,
    "A/P Outflows": w.ap_outflows,
    "Committed": w.committed_outflows,
    flag: w.high_variance_flag,
  }));

  const minBalance = FORECAST_DATA.summary.minimum_balance_amount;
  const flaggedCount = FORECAST_DATA.summary.high_variance_weeks.length;

  const selectedWeekData = selectedWeek ? FORECAST_DATA.weeks.find(w => w.week === selectedWeek) : null;

  const tabs = ["dashboard", "table", "jde-sources", "governance"];
  const tabLabels = { dashboard: "Dashboard", table: "13-Week Table", "jde-sources": "JDE Sources", governance: "Governance" };

  return (
    <div style={{ fontFamily: "'DM Mono', 'Courier New', monospace", background: "#070d14", minHeight: "100vh", color: "#e2e8f0", padding: "0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f1f3a 100%)", borderBottom: "1px solid #1e3a52", padding: "20px 28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ background: "#FF6B35", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 3, letterSpacing: 1 }}>FIN-01</span>
              <span style={{ color: "#64748b", fontSize: 11 }}>JDE EnterpriseOne → AI-Native Treasury</span>
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9", margin: 0, letterSpacing: -0.5 }}>
              Rolling 13-Week Cash Flow Forecast
            </h1>
            <p style={{ color: "#64748b", fontSize: 11, margin: "4px 0 0" }}>
              F03B11 · F0411 · F5116 · F0902 · Forecast run: May 5, 2026 · Monday 06:00 AM
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#64748b" }}>Opening Balance</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#38bdf8" }}>{fmt(FORECAST_DATA.opening_balance)}</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>Semi-Custom Regional Builder</div>
          </div>
        </div>

        {/* KPI Strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 20 }}>
          {[
            { label: "13-Wk Inflows", value: fmt(FORECAST_DATA.summary.total_inflows_13wk), sub: "from F03B11 + closings", color: "#22c55e" },
            { label: "13-Wk Outflows", value: fmt(FORECAST_DATA.summary.total_outflows_13wk), sub: "F0411 + F5116 committed", color: "#f87171" },
            { label: "Week 13 Close", value: fmt(FORECAST_DATA.summary.closing_balance_week13), sub: `+${fmt(FORECAST_DATA.summary.net_13wk_change)} vs open`, color: "#38bdf8" },
            { label: "High-Variance Weeks", value: flaggedCount, sub: `Wks ${FORECAST_DATA.summary.high_variance_weeks.join(", ")} flagged`, color: "#f59e0b" },
          ].map((k, i) => (
            <div key={i} style={{ background: "#0a1628", border: "1px solid #1e3a52", borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontSize: 10, color: "#64748b", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{k.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: k.color }}>{k.value}</div>
              <div style={{ fontSize: 10, color: "#475569", marginTop: 2 }}>{k.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Banner */}
      <div style={{ background: "#1c1000", borderBottom: "1px solid #92400e", padding: "10px 28px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ color: "#f59e0b", fontSize: 14 }}>⚠</span>
        <span style={{ color: "#fbbf24", fontSize: 12, fontWeight: 600 }}>VARIANCE ALERT — Week 3:</span>
        <span style={{ color: "#d97706", fontSize: 12 }}>Cash position $84K below forecast. Construction draw Job 5042 (Lot 14) not received. Recommend: hold discretionary A/P. CFO decision required.</span>
        <span style={{ marginLeft: "auto", background: "#92400e", color: "#fbbf24", fontSize: 10, padding: "2px 8px", borderRadius: 3, fontWeight: 700, whiteSpace: "nowrap" }}>AUGMENT — CFO DECIDES</span>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid #1e3a52", padding: "0 28px", display: "flex", gap: 0 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 18px", fontSize: 12, fontFamily: "inherit", color: activeTab === t ? "#38bdf8" : "#64748b", borderBottom: activeTab === t ? "2px solid #38bdf8" : "2px solid transparent", transition: "all 0.15s", fontWeight: activeTab === t ? 700 : 400 }}>
            {tabLabels[t]}
          </button>
        ))}
      </div>

      <div style={{ padding: "24px 28px" }}>

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div>
            {/* Cash Position Chart */}
            <div style={{ background: "#0a1628", border: "1px solid #1e3a52", borderRadius: 10, padding: "20px", marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#cbd5e1" }}>Cash Position — 13 Weeks</div>
                  <div style={{ fontSize: 10, color: "#475569" }}>F0902 opening balance + weekly net flows. Flagged weeks shown in amber.</div>
                </div>
                <div style={{ fontSize: 10, color: "#64748b" }}>Min: {fmt(minBalance)} · Wk {FORECAST_DATA.summary.minimum_balance_week}</div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a52" />
                  <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={1000000} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth={1} label={{ value: "Floor", fill: "#f59e0b", fontSize: 9, position: "right" }} />
                  <Area type="monotone" dataKey="Cash Position" stroke="#38bdf8" strokeWidth={2} fill="url(#cashGrad)" dot={(props) => {
                    const wk = FORECAST_DATA.weeks[props.index];
                    return wk?.high_variance_flag
                      ? <circle key={props.index} cx={props.cx} cy={props.cy} r={5} fill="#f59e0b" stroke="#070d14" strokeWidth={2} />
                      : <circle key={props.index} cx={props.cx} cy={props.cy} r={3} fill="#38bdf8" stroke="#070d14" strokeWidth={1} />;
                  }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Inflows vs Outflows Chart */}
            <div style={{ background: "#0a1628", border: "1px solid #1e3a52", borderRadius: 10, padding: "20px", marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#cbd5e1", marginBottom: 4 }}>Weekly Inflows vs. Outflows</div>
              <div style={{ fontSize: 10, color: "#475569", marginBottom: 16 }}>A/R receipts (F03B11) vs. A/P + committed (F0411 + F5116 AC ledger)</div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a52" />
                  <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="Inflows" fill="#22c55e" opacity={0.85} radius={[2,2,0,0]}>
                    {chartData.map((d, i) => <Cell key={i} fill={d.flag ? "#fbbf24" : "#22c55e"} />)}
                  </Bar>
                  <Bar dataKey="A/P Outflows" fill="#f87171" opacity={0.75} radius={[2,2,0,0]} />
                  <Bar dataKey="Committed" fill="#7c3aed" opacity={0.65} radius={[2,2,0,0]} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 10, color: "#64748b" }}>
                <span><span style={{ color: "#fbbf24" }}>■</span> High-variance inflow week</span>
                <span><span style={{ color: "#22c55e" }}>■</span> A/R inflows</span>
                <span><span style={{ color: "#f87171" }}>■</span> A/P outflows</span>
                <span><span style={{ color: "#7c3aed" }}>■</span> Committed (F5116)</span>
              </div>
            </div>

            {/* Variance Flags */}
            <div style={{ background: "#0a1628", border: "1px solid #1e3a52", borderRadius: 10, padding: "20px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#cbd5e1", marginBottom: 14 }}>Active Variance Flags — Human Review Required</div>
              {FORECAST_DATA.weeks.filter(w => w.high_variance_flag).map(w => (
                <div key={w.week} style={{ background: "#12100a", border: "1px solid #92400e", borderRadius: 6, padding: "12px 14px", marginBottom: 10, cursor: "pointer" }} onClick={() => setSelectedWeek(selectedWeek === w.week ? null : w.week)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: "#f59e0b", fontSize: 13 }}>⚠</span>
                      <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: 12 }}>Week {w.week} — {w.label}</span>
                      <span style={{ color: "#f87171", fontSize: 12 }}>Net: {w.net < 0 ? `-${fmt(Math.abs(w.net))}` : fmt(w.net)}</span>
                    </div>
                    <span style={{ color: "#475569", fontSize: 11 }}>Balance: {fmt(w.running_balance)} {selectedWeek === w.week ? "▲" : "▼"}</span>
                  </div>
                  {selectedWeek === w.week && (
                    <p style={{ color: "#d97706", fontSize: 11, margin: "8px 0 0", lineHeight: 1.5 }}>{w.variance_note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TABLE TAB */}
        {activeTab === "table" && (
          <div style={{ background: "#0a1628", border: "1px solid #1e3a52", borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #1e3a52" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#cbd5e1" }}>13-Week Cash Flow Schedule</div>
              <div style={{ fontSize: 10, color: "#475569", marginTop: 2 }}>Controller handoff format · Monday 06:00 AM delivery · 12-month archive for lender audit</div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr style={{ background: "#0f1923" }}>
                    {["Wk", "Period", "A/R Inflows", "A/P Outflows", "Committed (F5116)", "Net", "Cash Position", "Flag"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: h === "Wk" ? "center" : "right", color: "#64748b", fontSize: 10, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", borderBottom: "1px solid #1e3a52", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FORECAST_DATA.weeks.map((w, i) => (
                    <tr key={w.week} style={{ background: w.high_variance_flag ? "#12100a" : i % 2 === 0 ? "#0a1628" : "#080e18", borderBottom: "1px solid #1e3a52" }}>
                      <td style={{ padding: "9px 14px", textAlign: "center", color: "#64748b" }}>{w.week}</td>
                      <td style={{ padding: "9px 14px", textAlign: "right", color: "#cbd5e1", whiteSpace: "nowrap" }}>{w.label}</td>
                      <td style={{ padding: "9px 14px", textAlign: "right", color: "#22c55e", fontWeight: 600 }}>{fmtFull(w.ar_inflows)}</td>
                      <td style={{ padding: "9px 14px", textAlign: "right", color: "#f87171" }}>{fmtFull(w.ap_outflows)}</td>
                      <td style={{ padding: "9px 14px", textAlign: "right", color: "#a78bfa" }}>{fmtFull(w.committed_outflows)}</td>
                      <td style={{ padding: "9px 14px", textAlign: "right", color: w.net < 0 ? "#f87171" : "#22c55e", fontWeight: 700 }}>{w.net < 0 ? `(${fmtFull(Math.abs(w.net))})` : fmtFull(w.net)}</td>
                      <td style={{ padding: "9px 14px", textAlign: "right", color: "#38bdf8", fontWeight: 700 }}>{fmtFull(w.running_balance)}</td>
                      <td style={{ padding: "9px 14px", textAlign: "right" }}>{w.high_variance_flag ? <span style={{ color: "#f59e0b", fontSize: 13 }}>⚠</span> : <span style={{ color: "#1e3a52" }}>—</span>}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: "#0f1923", borderTop: "2px solid #1e3a52" }}>
                    <td colSpan={2} style={{ padding: "10px 14px", color: "#94a3b8", fontWeight: 700, fontSize: 11 }}>13-WEEK TOTAL</td>
                    <td style={{ padding: "10px 14px", textAlign: "right", color: "#22c55e", fontWeight: 700 }}>{fmtFull(FORECAST_DATA.summary.total_inflows_13wk)}</td>
                    <td colSpan={2} style={{ padding: "10px 14px", textAlign: "right", color: "#f87171", fontWeight: 700 }}>{fmtFull(FORECAST_DATA.summary.total_outflows_13wk)}</td>
                    <td style={{ padding: "10px 14px", textAlign: "right", color: "#22c55e", fontWeight: 700 }}>{fmtFull(FORECAST_DATA.summary.net_13wk_change)}</td>
                    <td style={{ padding: "10px 14px", textAlign: "right", color: "#38bdf8", fontWeight: 700 }}>{fmtFull(FORECAST_DATA.summary.closing_balance_week13)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        {/* JDE SOURCES TAB */}
        {activeTab === "jde-sources" && (
          <div>
            <div style={{ background: "#0a1628", border: "1px solid #1e3a52", borderRadius: 10, padding: "20px", marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#cbd5e1", marginBottom: 4 }}>The Old World Problem</div>
              <p style={{ color: "#64748b", fontSize: 12, lineHeight: 1.7, margin: 0 }}>
                In JDE E1, a rolling 13-week cash forecast required a Controller or senior accountant pulling <span style={{ color: "#FF6B35" }}>R03B500</span> (A/R Aging) manually, a separate pull of <span style={{ color: "#FF6B35" }}>R04413</span> (A/P Aging), a custom extract from <span style={{ color: "#FF6B35" }}>F5116</span>, and hand-stitching all three into an Excel model that was <strong style={{ color: "#f87171" }}>48 hours stale by Monday morning</strong>. When a construction draw was delayed or a subcontractor payment run hit early, nobody knew until the bank balance said so.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 20 }}>
              {JDE_SOURCES.map((s) => (
                <div key={s.table} style={{ background: "#0a1628", border: "1px solid #1e3a52", borderRadius: 10, padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div>
                      <span style={{ background: "#FF6B35", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 3 }}>{s.table}</span>
                      <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 6, fontWeight: 600 }}>{s.alias}</div>
                    </div>
                    <span style={{ background: "#1e3a52", color: "#38bdf8", fontSize: 10, padding: "3px 8px", borderRadius: 3 }}>{s.module}</span>
                  </div>
                  <div style={{ fontSize: 10, color: "#64748b", marginBottom: 6 }}>Key fields: <span style={{ color: "#94a3b8" }}>{s.fields}</span></div>
                  <div style={{ fontSize: 11, color: "#22c55e" }}>→ {s.role}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#0a1628", border: "1px solid #1e3a52", borderRadius: 10, padding: "20px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#cbd5e1", marginBottom: 14 }}>Aggregation Logic Summary</div>
              {[
                { step: "1", label: "F03B11 → Weekly A/R bands", detail: "Filter PST NOT IN ('P','V','#') · Apply collection lag by customer segment · Bucket by adjusted DDJ" },
                { step: "2", label: "F0411 → Weekly A/P bands", detail: "Filter PST = 'A' · Apply payment method clearing lag (EFT=0, Check=+2, Wire=-1) · Bucket by adjusted DDJ" },
                { step: "3", label: "F5116 → Committed obligation estimate", detail: "Pull AC ledger type only · Apply phase schedule or 30-day default conversion · Flag commitments >$50K in Wk 1–4" },
                { step: "4", label: "F0902 → Opening balance", detail: "Sum GBAM[current period] across cash OBJ range · Exclude intercompany and restricted accounts" },
                { step: "5", label: "Running balance calculation", detail: "Opening + SUM(inflows - outflows) cumulative across 13 weeks" },
              ].map((s) => (
                <div key={s.step} style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                  <div style={{ width: 24, height: 24, background: "#FF6B35", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{s.step}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#cbd5e1" }}>{s.label}</div>
                    <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{s.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GOVERNANCE TAB */}
        {activeTab === "governance" && (
          <div>
            <div style={{ background: "#120a0a", border: "1px solid #7f1d1d", borderRadius: 10, padding: "16px 20px", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 16 }}>🏛</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#fca5a5" }}>TRAIGA — Texas Responsible AI Governance Act</div>
                  <div style={{ fontSize: 11, color: "#ef4444", marginTop: 2 }}>This system influences draw submission timing and A/P release decisions. Consequential financial decision scope applies. Effective January 2026.</div>
                </div>
              </div>
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, color: "#cbd5e1", marginBottom: 14 }}>Automation Verdicts — Per Requirement</div>
            <div style={{ background: "#0a1628", border: "1px solid #1e3a52", borderRadius: 10, overflow: "hidden", marginBottom: 20 }}>
              {AUTOMATION_VERDICTS.map((v, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderBottom: i < AUTOMATION_VERDICTS.length - 1 ? "1px solid #1e3a52" : "none", gap: 16 }}>
                  <span style={{ background: v.color, color: "#fff", fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 3, minWidth: 90, textAlign: "center", letterSpacing: 0.5 }}>{v.verdict}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: "#cbd5e1" }}>{v.requirement}</div>
                    <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{v.reason}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#0a1628", border: "1px solid #1e3a52", borderRadius: 10, padding: "20px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#cbd5e1", marginBottom: 14 }}>Pre-Deployment Checklist</div>
              {[
                "Cash account OBJ range confirmed with Controller (F0902 filter)",
                "Customer segment classification table built from Address Book categories",
                "F5116 AC ledger confirmed as committed cost source",
                "Multi-company consolidation scope confirmed",
                "Restricted cash accounts excluded from opening balance",
                "Named model owner with documented review cadence",
                "Exception override protocol documented and logged",
                "Lender notification policy documented if AI influences draw package",
                "TRAIGA documentation complete and signed by BSA/AI Architect",
                "12-month forecast archive configured for lender audit",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 16, height: 16, border: "1px solid #1e3a52", borderRadius: 3, flexShrink: 0, marginTop: 1 }}></div>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>{item}</span>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: "12px 14px", background: "#070d14", borderRadius: 6, fontSize: 10, color: "#475569", lineHeight: 1.6 }}>
                <strong style={{ color: "#64748b" }}>DACR v2.6</strong> | Epoch Frameworks LLC | Erwin Maurice McDonald (2026)<br/>
                This artifact is part of the 10x BSA Framework — FIN-01 · github.com/emcdo411/10-x-bsa-framework
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
