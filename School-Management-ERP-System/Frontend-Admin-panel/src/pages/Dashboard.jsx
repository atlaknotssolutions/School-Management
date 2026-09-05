import { Users, Wallet, UserPlus, CalendarCheck, ArrowUpRight, Bus, Bell, ClipboardList } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { StatCard, Card, Pill, statusTone, Avatar } from "../components/UI";
import { attendanceTrend, feeCollectionTrend, classStrength, busRoutes } from "../data/academics";
import { admissionEnquiries, notices } from "../data/records";
import { currentUser } from "../data/school";
import { students } from "../data/students";

const PIE_COLORS = ["#16213E", "#E8A33D", "#3F8F5F", "#3B6FA0", "#D65A4A"];

export default function Dashboard() {
  const recentAdmissions = admissionEnquiries.slice(0, 4);
  const pinnedNotices = notices.filter((n) => n.pinned).slice(0, 3);
  const lowAttendance = [...students].sort((a, b) => a.attendance - b.attendance).slice(0, 5);
  const firstName = currentUser.name.split(" ")[0];

  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <div className="relative rounded-2xl overflow-hidden bg-ink">
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&h=400&q=80"
          alt="School campus"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-amber font-semibold text-[12.5px]">Tuesday, 1 September 2026</p>
            <h2 className="font-display text-2xl sm:text-[28px] font-bold text-white mt-1">
              Good morning, {firstName} 👋
            </h2>
            <p className="text-white/60 text-[13.5px] mt-1.5">
              1,065 students · 96 staff on campus today · Term 2 fee collection is 68% complete
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 text-center">
              <p className="font-display text-xl font-bold text-white">96%</p>
              <p className="text-white/50 text-[11px]">Today's Attendance</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 text-center">
              <p className="font-display text-xl font-bold text-white">5</p>
              <p className="text-white/50 text-[11px]">New Enquiries</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Students" value="1,065" sub="+18 this month" accent="amber" />
        <StatCard icon={CalendarCheck} label="Today's Attendance" value="96.2%" sub="1,024 present of 1,065" accent="success" />
        <StatCard icon={Wallet} label="Fees Collected (Term 2)" value="₹16.9L" sub="of ₹24.8L expected" accent="info" />
        <StatCard icon={UserPlus} label="Admission Enquiries" value="8" sub="3 pending follow-up" accent="alert" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card title="Attendance Trend" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={attendanceTrend} margin={{ left: -20, top: 5 }}>
              <defs>
                <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E8A33D" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#E8A33D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEEAE0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#475467" }} axisLine={false} tickLine={false} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 12, fill: "#475467" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #eee", fontSize: 12.5 }} />
              <Area type="monotone" dataKey="attendance" stroke="#E8A33D" strokeWidth={2.5} fill="url(#attGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Students by Section">
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={classStrength} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                {classStrength.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #eee", fontSize: 12.5 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 mt-2">
            {classStrength.map((c, i) => (
              <div key={c.name} className="flex items-center gap-1.5 text-[11px] text-slate-text">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: PIE_COLORS[i] }} />
                {c.name}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card title="Fee Collection vs Pending" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={feeCollectionTrend} margin={{ left: -10, top: 5 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEEAE0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#475467" }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={(v) => `₹${v / 100000}L`} tick={{ fontSize: 11, fill: "#475467" }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => `₹${v.toLocaleString("en-IN")}`} contentStyle={{ borderRadius: 10, border: "1px solid #eee", fontSize: 12.5 }} />
              <Bar dataKey="collected" fill="#3F8F5F" radius={[6, 6, 0, 0]} name="Collected" />
              <Bar dataKey="pending" fill="#D65A4A" radius={[6, 6, 0, 0]} name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Pinned Notices" action={<Bell size={16} className="text-slate-text/50" />}>
          <div className="space-y-3.5">
            {pinnedNotices.map((n) => (
              <div key={n.id} className="pb-3.5 border-b border-black/[0.06] last:border-0 last:pb-0">
                <div className="flex items-center gap-2 mb-1">
                  <Pill tone="amber">{n.category}</Pill>
                  <span className="text-[11px] text-slate-text/50">{n.date}</span>
                </div>
                <p className="text-[13px] font-semibold text-ink leading-snug">{n.title}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card title="Recent Admission Enquiries" className="lg:col-span-2" action={<a href="/admission-enquiry" className="text-[12px] font-semibold text-info flex items-center gap-1">View all <ArrowUpRight size={13} /></a>}>
          <div className="space-y-3">
            {recentAdmissions.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-ink truncate">{a.childName}</p>
                  <p className="text-[11.5px] text-slate-text/70">{a.classApplied} · {a.date}</p>
                </div>
                <Pill tone={statusTone(a.status)}>{a.status}</Pill>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Attendance Watchlist" action={<ClipboardList size={16} className="text-slate-text/50" />}>
          <div className="space-y-3">
            {lowAttendance.map((s) => (
              <div key={s.id} className="flex items-center gap-2.5">
                <Avatar src={s.avatar} name={s.name} size={30} />
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-semibold text-ink truncate">{s.name}</p>
                  <p className="text-[11px] text-slate-text/60">Class {s.class}-{s.section}</p>
                </div>
                <span className="text-[12.5px] font-bold text-alert">{s.attendance}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Bus Fleet Status" action={<a href="/bus-tracking" className="text-[12px] font-semibold text-info flex items-center gap-1">Live tracking <ArrowUpRight size={13} /></a>}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {busRoutes.map((b) => (
            <div key={b.id} className="rounded-xl border border-black/[0.06] p-3.5">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-info/10 text-info flex items-center justify-center">
                  <Bus size={15} />
                </div>
                <Pill tone={statusTone(b.status)}>{b.status}</Pill>
              </div>
              <p className="text-[12.5px] font-bold text-ink">{b.id}</p>
              <p className="text-[11px] text-slate-text/60 mt-0.5 line-clamp-1">{b.route}</p>
              <p className="text-[11px] text-slate-text/60 mt-1.5">{b.occupied}/{b.capacity} onboard · ETA {b.eta}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
