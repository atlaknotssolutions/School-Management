import { useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Download, FileBarChart2, Plus, X, Trash2, Search, FilePlus2 } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import { PageIntro, Card, Button, Input, Select, StatCard, Pill } from "../components/UI";
import { classStrength, feeCollectionTrend, attendanceTrend } from "../data/academics";
import { Users, Wallet, GraduationCap, TrendingUp } from "lucide-react";

const PIE_COLORS = ["#16213E", "#E8A33D", "#3F8F5F", "#3B6FA0", "#D65A4A"];

const INITIAL_REPORTS = [
  { id: 1, name: "Monthly Attendance Summary", type: "PDF", size: "212 KB", updated: "2026-09-01" },
  { id: 2, name: "Term 2 Fee Collection Report", type: "XLSX", size: "148 KB", updated: "2026-08-31" },
  { id: 3, name: "Class-wise Examination Analysis", type: "PDF", size: "540 KB", updated: "2026-08-29" },
  { id: 4, name: "Admission Funnel — Aug 2026", type: "XLSX", size: "88 KB", updated: "2026-08-28" },
  { id: 5, name: "Inventory Stock Audit", type: "PDF", size: "165 KB", updated: "2026-08-25" },
  { id: 6, name: "Transport Utilization Report", type: "XLSX", size: "96 KB", updated: "2026-08-22" },
];

const REPORT_TEMPLATES = [
  "Attendance Summary",
  "Fee Collection Report",
  "Examination Analysis",
  "Admission Funnel",
  "Inventory Stock Audit",
  "Transport Utilization",
  "Staff Payroll Summary",
  "Enrollment Report",
];

const TYPE_OPTIONS = ["PDF", "XLSX", "CSV", "DOCX"];

const typeTone = {
  PDF: "alert",
  XLSX: "success",
  CSV: "info",
  DOCX: "info",
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function emptyForm() {
  return { name: "", type: "PDF" };
}

export default function Reports() {
  const [reports, setReports] = useLocalStorage("sap_reports", INITIAL_REPORTS);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [template, setTemplate] = useState(REPORT_TEMPLATES[0]);
  const [generated, setGenerated] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return reports.filter((r) => {
      const matchType = typeFilter === "All" || r.type === typeFilter;
      const matchQuery = !q || r.name.toLowerCase().includes(q);
      return matchType && matchQuery;
    });
  }, [reports, query, typeFilter]);

  const typeOptions = useMemo(
    () => ["All", ...new Set(reports.map((r) => r.type))],
    [reports]
  );

  const stats = useMemo(() => {
    const totalSize = reports.reduce((a, r) => {
      const kb = parseFloat(r.size);
      return a + (Number.isFinite(kb) ? kb : 0);
    }, 0);
    return {
      total: reports.length,
      pdf: reports.filter((r) => r.type === "PDF").length,
      xlsx: reports.filter((r) => r.type === "XLSX").length,
      size: totalSize,
    };
  }, [reports]);

  const generateReport = () => {
    if (!form.name.trim()) return;
    const kb = Math.floor(80 + Math.random() * 500);
    const newReport = {
      id: Date.now(),
      name: form.name.trim(),
      type: form.type,
      size: `${kb} KB`,
      updated: todayISO(),
    };
    setReports((prev) => [newReport, ...prev]);
    setForm(emptyForm());
    setGenerated(true);
    setTimeout(() => setGenerated(false), 2500);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Insights"
        title="Reports & Analytics"
        description="School-wide performance across academics, finance and operations."
        right={
          <Button variant="amber" onClick={() => { setShowModal(true); setGenerated(false); }}>
            <Plus size={15} /> Generate Report
          </Button>
        }
      />

      {generated && (
        <div className="rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-[13px] text-success font-medium">
          Report generated and added to the list.
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Enrollment" value="1,065" sub="+4.2% vs last session" accent="amber" />
        <StatCard icon={TrendingUp} label="Avg. Attendance" value="93.1%" sub="Across all classes" accent="success" />
        <StatCard icon={Wallet} label="Fee Realization" value="68%" sub="Term 2 to date" accent="info" />
        <StatCard icon={GraduationCap} label="Pass Percentage" value="97.4%" sub="Last annual result" accent="alert" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card title="Enrollment by Section">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={classStrength} dataKey="value" nameKey="name" outerRadius={95} label={(d) => d.value}>
                {classStrength.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #eee", fontSize: 12.5 }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Attendance Trend (6 Months)">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={attendanceTrend} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEEAE0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#475467" }} axisLine={false} tickLine={false} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 12, fill: "#475467" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #eee", fontSize: 12.5 }} />
              <Line type="monotone" dataKey="attendance" stroke="#16213E" strokeWidth={2.5} dot={{ r: 4, fill: "#E8A33D" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Fee Collection vs Pending (5 Months)">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={feeCollectionTrend} margin={{ left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEEAE0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#475467" }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => `₹${v / 100000}L`} tick={{ fontSize: 11, fill: "#475467" }} axisLine={false} tickLine={false} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} contentStyle={{ borderRadius: 10, border: "1px solid #eee", fontSize: 12.5 }} />
            <Bar dataKey="collected" fill="#3F8F5F" radius={[6, 6, 0, 0]} name="Collected" />
            <Bar dataKey="pending" fill="#D65A4A" radius={[6, 6, 0, 0]} name="Pending" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card
        title={`Generated Reports (${stats.total})`}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text/40" />
              <Input
                placeholder="Search reports..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-8 w-48"
              />
            </div>
            <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="min-w-[120px]">
              {typeOptions.map((t) => (
                <option key={t} value={t}>{t === "All" ? "All Types" : t}</option>
              ))}
            </Select>
          </div>
        }
      >
        {filtered.length === 0 ? (
          <div className="py-14 text-center">
            <FileBarChart2 size={36} className="mx-auto text-slate-text/30 mb-3" />
            <p className="text-[14px] font-medium text-ink">No reports found</p>
            <p className="text-[13px] text-slate-text/60 mt-1">
              Try changing filters or generate a new report.
            </p>
            <Button variant="amber" className="mt-4" onClick={() => setShowModal(true)}>
              <Plus size={15} /> Generate Report
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-black/[0.06]">
            {filtered.map((r) => (
              <div key={r.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-info/10 text-info flex items-center justify-center shrink-0">
                    <FileBarChart2 size={16} />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-ink">{r.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Pill tone={typeTone[r.type] || "neutral"}>{r.type}</Pill>
                      <span className="text-[11.5px] text-slate-text/60">{r.size} · Updated {formatDate(r.updated)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-1.5 rounded-lg hover:bg-paper text-slate-text/50 hover:text-alert transition-colors"
                    title="Delete report"
                  >
                    <Trash2 size={15} />
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="p-1.5 rounded-lg hover:bg-paper text-slate-text/50 hover:text-info transition-colors"
                    title="Download"
                  >
                    <Download size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* ========== GENERATE REPORT MODAL ========== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06]">
              <div>
                <h3 className="font-display font-semibold text-ink text-[17px]">Generate Report</h3>
                <p className="text-[12.5px] text-slate-text/70 mt-0.5">
                  Create a new report to add it to the list.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-paper text-slate-text"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-5 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="text-[12px] font-semibold text-ink mb-1.5 block">Template</label>
                <Select value={template} onChange={(e) => { setTemplate(e.target.value); setForm((f) => ({ ...f, name: `${e.target.value} — ${todayISO()}` })); }} className="w-full">
                  {REPORT_TEMPLATES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                  Report Title *
                </label>
                <Input
                  placeholder="e.g. Monthly Attendance Summary"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-ink mb-1.5 block">Format</label>
                <Select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className="w-full">
                  {TYPE_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="px-5 py-4 border-t border-black/[0.06] flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button variant="amber" onClick={generateReport} disabled={!form.name.trim()}>
                <FilePlus2 size={15} /> Generate
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}