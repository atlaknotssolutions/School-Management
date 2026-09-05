import { useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Pin, Plus, X, Save, Pencil, Bell, Search, PinOff } from "lucide-react";
import {
  PageIntro,
  Card,
  Button,
  Input,
  Select,
  Pill,
  StatCard,
} from "../components/UI";
import { notices as initialNotices } from "../data/records";

const CATEGORIES = [
  "Academic",
  "Holiday",
  "Sports",
  "Fees",
  "Event",
  "Transport",
  "General",
];

const AUDIENCE_OPTIONS = [
  "All",
  "All Parents",
  "All Staff",
  "Classes 1–5 Parents",
  "Classes 6–8 Parents",
  "Classes 9–12 Parents",
  "Classes 3–10",
  "Transport Users",
];

const categoryTone = {
  Academic: "info",
  Holiday: "success",
  Sports: "amber",
  Fees: "alert",
  Event: "info",
  Transport: "neutral",
  General: "neutral",
};

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function emptyForm() {
  return {
    title: "",
    category: "Academic",
    date: new Date().toISOString().slice(0, 10),
    audience: "All",
    body: "",
    pinned: false,
  };
}

export default function NoticeBoard() {
  const [notices, setNotices] = useLocalStorage("sap_notices", initialNotices);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [editId, setEditId] = useState(null);

  const cats = useMemo(
    () => ["All", ...new Set(notices.map((n) => n.category))],
    [notices],
  );

  const filtered = useMemo(() => {
    return notices
      .filter((n) => {
        const matchCat = filter === "All" || n.category === filter;
        const q = query.toLowerCase();
        const matchQuery =
          !q ||
          n.title.toLowerCase().includes(q) ||
          n.body.toLowerCase().includes(q) ||
          n.audience.toLowerCase().includes(q);
        return matchCat && matchQuery;
      })
      .sort((a, b) => {
        // Pinned first, then by date desc
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.date) - new Date(a.date);
      });
  }, [notices, filter, query]);

  const stats = useMemo(() => {
    const pinned = notices.filter((n) => n.pinned).length;
    const thisMonth = notices.filter((n) => {
      const d = new Date(n.date);
      const now = new Date();
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    }).length;
    return {
      total: notices.length,
      pinned,
      thisMonth,
      categories: new Set(notices.map((n) => n.category)).size,
    };
  }, [notices]);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm());
    setShowModal(true);
  };

  const openEdit = (n) => {
    setEditId(n.id);
    setForm({
      title: n.title,
      category: n.category,
      date: n.date,
      audience: n.audience,
      body: n.body,
      pinned: n.pinned,
    });
    setShowModal(true);
  };

  const updateForm = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.body.trim()) return;

    if (editId) {
      setNotices((prev) =>
        prev.map((n) => (n.id === editId ? { ...n, ...form } : n)),
      );
    } else {
      const newNotice = {
        id: Date.now(),
        ...form,
      };
      setNotices((prev) => [newNotice, ...prev]);
    }
    setShowModal(false);
    setForm(emptyForm());
    setEditId(null);
  };

  const togglePin = (id) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
    );
  };

  const handleDelete = (id) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Admissions & Outreach"
        title="Notice Board"
        description="Official circulars and announcements for students, parents and staff."
        right={
          <Button variant="amber" onClick={openAdd}>
            <Plus size={15} /> Post Notice
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Bell}
          label="Total Notices"
          value={String(stats.total)}
          sub="All categories"
          accent="info"
        />
        <StatCard
          icon={Pin}
          label="Pinned"
          value={String(stats.pinned)}
          sub="Shown at top"
          accent="amber"
        />
        <StatCard
          icon={Bell}
          label="This Month"
          value={String(stats.thisMonth)}
          sub="Current month"
          accent="success"
        />
        <StatCard
          icon={Bell}
          label="Categories"
          value={String(stats.categories)}
          sub="Active types"
          accent="info"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text/40"
          />
          <Input
            placeholder="Search notices..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold border transition-colors ${
                filter === c
                  ? "bg-ink text-white border-ink"
                  : "bg-white text-slate-text border-black/10 hover:border-ink/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Notice cards */}
      {filtered.length === 0 ? (
        <Card>
          <div className="py-14 text-center">
            <Bell size={36} className="mx-auto text-slate-text/30 mb-3" />
            <p className="text-[14px] font-medium text-ink">No notices found</p>
            <p className="text-[13px] text-slate-text/60 mt-1">
              Try a different filter or post a new notice.
            </p>
            <Button variant="amber" className="mt-4" onClick={openAdd}>
              <Plus size={15} /> Post Notice
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((n) => (
            <Card key={n.id} className={n.pinned ? "ring-1 ring-amber/30" : ""}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <Pill tone={categoryTone[n.category] || "neutral"}>
                    {n.category}
                  </Pill>
                  {n.pinned && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-dark">
                      <Pin size={12} fill="#E8A33D" /> Pinned
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => togglePin(n.id)}
                    title={n.pinned ? "Unpin" : "Pin"}
                    className="p-1.5 rounded-lg hover:bg-paper text-slate-text/60 hover:text-amber-dark transition-colors"
                  >
                    {n.pinned ? <PinOff size={14} /> : <Pin size={14} />}
                  </button>
                  <button
                    onClick={() => openEdit(n)}
                    className="p-1.5 rounded-lg hover:bg-paper text-slate-text/60 hover:text-info transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
              </div>

              <h3 className="font-display font-bold text-ink text-[15.5px] leading-snug">
                {n.title}
              </h3>
              <p className="text-[13px] text-slate-text mt-2 leading-relaxed line-clamp-4">
                {n.body}
              </p>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/[0.06] text-[11.5px] text-slate-text/60">
                <span>For: {n.audience}</span>
                <span>{formatDate(n.date)}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ========== POST / EDIT MODAL ========== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06]">
              <div>
                <h3 className="font-display font-semibold text-ink text-[17px]">
                  {editId ? "Edit Notice" : "Post Notice"}
                </h3>
                <p className="text-[12.5px] text-slate-text/70 mt-0.5">
                  Create an official circular or announcement.
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
                <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                  Title *
                </label>
                <Input
                  placeholder="Notice title"
                  value={form.title}
                  onChange={(e) => updateForm("title", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                    Category
                  </label>
                  <Select
                    value={form.category}
                    onChange={(e) => updateForm("category", e.target.value)}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={form.date}
                    onChange={(e) => updateForm("date", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                  Audience
                </label>
                <Select
                  value={form.audience}
                  onChange={(e) => updateForm("audience", e.target.value)}
                >
                  {AUDIENCE_OPTIONS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                  Body *
                </label>
                <textarea
                  rows={5}
                  placeholder="Write the full notice..."
                  value={form.body}
                  onChange={(e) => updateForm("body", e.target.value)}
                  className="w-full rounded-lg border border-black/10 p-3 text-[13px] outline-none focus:border-ink/40 resize-none"
                />
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.pinned}
                  onChange={(e) => updateForm("pinned", e.target.checked)}
                  className="accent-amber w-4 h-4"
                />
                <span className="text-[13px] font-medium text-ink">
                  Pin this notice (show at top)
                </span>
              </label>
            </div>

            <div className="px-5 py-4 border-t border-black/[0.06] flex justify-between gap-2">
              <div>
                {editId && (
                  <Button
                    variant="outline"
                    className="text-alert border-alert/30 hover:bg-alert/5"
                    onClick={() => {
                      handleDelete(editId);
                      setShowModal(false);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="amber"
                  onClick={handleSave}
                  disabled={!form.title.trim() || !form.body.trim()}
                >
                  <Save size={15} /> {editId ? "Update" : "Post"} Notice
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import { useState } from "react";
// import { Pin, Plus } from "lucide-react";
// import { PageIntro, Card, Button, Pill } from "../components/UI";

// const categoryTone = { Academic: "info", Holiday: "success", Sports: "amber", Fees: "alert", Event: "info", Transport: "neutral" };

// export default function NoticeBoard() {
//   const [filter, setFilter] = useState("All");
//   const cats = ["All", ...new Set(notices.map((n) => n.category))];
//   const filtered = filter === "All" ? notices : notices.filter((n) => n.category === filter);

//   return (
//     <div className="space-y-6">
//       <PageIntro
//         eyebrow="Admissions & Outreach"
//         title="Notice Board"
//         description="Official circulars and announcements for students, parents and staff."
//         right={<Button variant="amber"><Plus size={15} /> Post Notice</Button>}
//       />

//       <div className="flex gap-2 flex-wrap">
//         {cats.map((c) => (
//           <button
//             key={c}
//             onClick={() => setFilter(c)}
//             className={`px-4 py-2 rounded-full text-[12.5px] font-semibold border transition-colors ${
//               filter === c ? "bg-ink text-white border-ink" : "bg-white text-slate-text border-black/10 hover:border-ink/30"
//             }`}
//           >
//             {c}
//           </button>
//         ))}
//       </div>

//       <div className="grid md:grid-cols-2 gap-4">
//         {filtered.map((n) => (
//           <Card key={n.id}>
//             <div className="flex items-start justify-between mb-2">
//               <Pill tone={categoryTone[n.category] || "neutral"}>{n.category}</Pill>
//               {n.pinned && <Pin size={14} className="text-amber-dark" fill="#E8A33D" />}
//             </div>
//             <h3 className="font-display font-bold text-ink text-[15.5px] leading-snug">{n.title}</h3>
//             <p className="text-[13px] text-slate-text mt-2 leading-relaxed">{n.body}</p>
//             <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/[0.06] text-[11.5px] text-slate-text/60">
//               <span>For: {n.audience}</span>
//               <span>{n.date}</span>
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }
