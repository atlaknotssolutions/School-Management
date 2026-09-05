import { useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  Plus,
  BookOpenCheck,
  Search,
  Calendar,
  User,
  X,
  Save,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
} from "lucide-react";
import {
  PageIntro,
  Card,
  Button,
  Select,
  Input,
  Pill,
  StatCard,
  statusTone,
} from "../components/UI";
const initialHomework = [];

const CLASS_OPTIONS = [
  "All",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11 (Science)",
  "Class 11 (Commerce)",
  "Class 12 (Science)",
  "Class 12 (Commerce)",
];

const SECTION_OPTIONS = ["A", "B", "C"];

const SUBJECT_OPTIONS = [
  "Mathematics",
  "English",
  "Science",
  "Hindi",
  "Social Science",
  "Computer Science",
  "Physics",
  "Chemistry",
  "Biology",
  "Accountancy",
  "Business Studies",
  "Economics",
  "Art",
  "Physical Education",
];

const STATUS_OPTIONS = ["All", "Pending", "Submitted", "Graded", "Overdue"];

const TEACHER_OPTIONS = [
  "Kavita Joshi",
  "Pooja Reddy",
  "Ritu Sharma",
  "Ramesh Iyer",
  "Manish Gupta",
  "Suresh Kulkarni",
  "Priya Nair",
  "Anjali Verma",
];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

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
    class: "Class 8",
    section: "A",
    subject: "Mathematics",
    title: "",
    teacher: "Kavita Joshi",
    assignedDate: todayISO(),
    dueDate: "",
    status: "Pending",
  };
}

export default function Homework() {
  const [items, setItems] = useLocalStorage("sap_homework", initialHomework);
  const [cls, setCls] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [editId, setEditId] = useState(null);

  const filtered = useMemo(() => {
    return items.filter((h) => {
      const matchClass = cls === "All" || h.class === cls;
      const matchStatus = statusFilter === "All" || h.status === statusFilter;
      const q = query.toLowerCase();
      const matchQuery =
        !q ||
        h.title.toLowerCase().includes(q) ||
        h.subject.toLowerCase().includes(q) ||
        h.teacher.toLowerCase().includes(q);
      return matchClass && matchStatus && matchQuery;
    });
  }, [items, cls, statusFilter, query]);

  const counts = useMemo(() => {
    const c = {
      total: items.length,
      Pending: 0,
      Submitted: 0,
      Graded: 0,
      Overdue: 0,
    };
    items.forEach((h) => {
      if (c[h.status] !== undefined) c[h.status]++;
    });
    return c;
  }, [items]);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm());
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setForm({
      class: item.class,
      section: item.section,
      subject: item.subject,
      title: item.title,
      teacher: item.teacher,
      assignedDate: item.assignedDate,
      dueDate: item.dueDate,
      status: item.status,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.dueDate) return;

    if (editId) {
      setItems((prev) =>
        prev.map((h) => (h.id === editId ? { ...h, ...form } : h)),
      );
    } else {
      const newItem = {
        id: Date.now(),
        ...form,
      };
      setItems((prev) => [newItem, ...prev]);
    }
    setShowModal(false);
    setForm(emptyForm());
    setEditId(null);
  };

  const changeStatus = (id, newStatus) => {
    setItems((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status: newStatus } : h)),
    );
  };

  const updateForm = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Academics"
        title="Homework"
        description="Assign, track and manage homework across all classes."
        right={
          <Button variant="amber" onClick={openAdd}>
            <Plus size={15} /> Assign Homework
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={BookOpenCheck}
          label="Total Assignments"
          value={String(counts.total)}
          sub="All classes"
          accent="info"
        />
        <StatCard
          icon={Clock}
          label="Pending"
          value={String(counts.Pending)}
          sub="Awaiting submission"
          accent="amber"
        />
        <StatCard
          icon={CheckCircle2}
          label="Submitted"
          value={String(counts.Submitted)}
          sub="Ready for review"
          accent="success"
        />
        <StatCard
          icon={AlertCircle}
          label="Graded / Overdue"
          value={String(counts.Graded + counts.Overdue)}
          sub={`${counts.Graded} graded · ${counts.Overdue} overdue`}
          accent="alert"
        />
      </div>

      {/* List */}
      <Card
        title="All Assignments"
        action={
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text/40"
              />
              <Input
                placeholder="Search title, subject, teacher..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-8 w-52"
              />
            </div>
            <Select
              value={cls}
              onChange={(e) => setCls(e.target.value)}
              className="min-w-[130px]"
            >
              {CLASS_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Classes" : c}
                </option>
              ))}
            </Select>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="min-w-[120px]"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s === "All" ? "All Status" : s}
                </option>
              ))}
            </Select>
          </div>
        }
      >
        {filtered.length === 0 ? (
          <div className="py-14 text-center">
            <BookOpenCheck
              size={36}
              className="mx-auto text-slate-text/30 mb-3"
            />
            <p className="text-[14px] font-medium text-ink">
              No homework found
            </p>
            <p className="text-[13px] text-slate-text/60 mt-1">
              Try changing filters or assign a new homework.
            </p>
            <Button variant="amber" className="mt-4" onClick={openAdd}>
              <Plus size={15} /> Assign Homework
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((h) => (
              <div
                key={h.id}
                className="flex flex-col sm:flex-row sm:items-start gap-3 p-4 rounded-xl border border-black/[0.06] hover:border-black/10 hover:bg-paper/40 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-amber/15 text-amber-dark flex items-center justify-center shrink-0">
                  <BookOpenCheck size={20} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] font-semibold text-ink">
                      {h.subject}
                    </p>
                    <span className="text-[12px] text-slate-text/55">
                      {h.class} · Sec {h.section}
                    </span>
                    <Pill tone={statusTone(h.status)}>{h.status}</Pill>
                  </div>
                  <p className="text-[13.5px] text-ink/90 mt-1 leading-snug">
                    {h.title}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[12px] text-slate-text/65">
                    <span className="inline-flex items-center gap-1">
                      <User size={12} /> {h.teacher}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} /> Assigned{" "}
                      {formatDate(h.assignedDate)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} /> Due {formatDate(h.dueDate)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 sm:flex-col sm:items-end">
                  <Select
                    value={h.status}
                    onChange={(e) => changeStatus(h.id, e.target.value)}
                    className="text-[12px] py-1.5 min-w-[110px]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Graded">Graded</option>
                    <option value="Overdue">Overdue</option>
                  </Select>
                  <button
                    onClick={() => openEdit(h)}
                    className="text-[12.5px] font-medium text-info hover:underline px-1"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* ========== ASSIGN / EDIT MODAL ========== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06]">
              <div>
                <h3 className="font-display font-semibold text-ink text-[17px]">
                  {editId ? "Edit Homework" : "Assign Homework"}
                </h3>
                <p className="text-[12.5px] text-slate-text/70 mt-0.5">
                  Fill the details and save.
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-paper text-slate-text"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="px-5 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                    Class
                  </label>
                  <Select
                    value={form.class}
                    onChange={(e) => updateForm("class", e.target.value)}
                  >
                    {CLASS_OPTIONS.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                    Section
                  </label>
                  <Select
                    value={form.section}
                    onChange={(e) => updateForm("section", e.target.value)}
                  >
                    {SECTION_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                  Subject
                </label>
                <Select
                  value={form.subject}
                  onChange={(e) => updateForm("subject", e.target.value)}
                >
                  {SUBJECT_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                  Title / Description
                </label>
                <Input
                  placeholder="e.g. Chapter 5 — Linear Equations, Q1–15"
                  value={form.title}
                  onChange={(e) => updateForm("title", e.target.value)}
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                  Teacher
                </label>
                <Select
                  value={form.teacher}
                  onChange={(e) => updateForm("teacher", e.target.value)}
                >
                  {TEACHER_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                    Assigned Date
                  </label>
                  <Input
                    type="date"
                    value={form.assignedDate}
                    onChange={(e) => updateForm("assignedDate", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                    Due Date
                  </label>
                  <Input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => updateForm("dueDate", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                  Status
                </label>
                <Select
                  value={form.status}
                  onChange={(e) => updateForm("status", e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Graded">Graded</option>
                  <option value="Overdue">Overdue</option>
                </Select>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-black/[0.06] flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button
                variant="amber"
                onClick={handleSave}
                disabled={!form.title.trim() || !form.dueDate}
              >
                <Save size={15} /> {editId ? "Update" : "Assign"} Homework
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import { useState } from "react";
// import { Plus, BookOpenCheck } from "lucide-react";
// import { PageIntro, Card, Button, Pill, statusTone, Select } from "../components/UI";

// export default function Homework() {
//   const [cls, setCls] = useState("All");
//   const classes = ["All", ...new Set(homework.map((h) => h.class))];
//   const filtered = cls === "All" ? homework : homework.filter((h) => h.class === cls);

//   return (
//     <div className="space-y-6">
//       <PageIntro
//         eyebrow="Academics"
//         title="Homework"
//         description="Assignments given across classes and their submission status."
//         right={<Button variant="amber"><Plus size={15} /> Assign Homework</Button>}
//       />

//       <Card
//         title="All Assignments"
//         action={
//           <Select value={cls} onChange={(e) => setCls(e.target.value)}>
//             {classes.map((c) => <option key={c} value={c}>{c}</option>)}
//           </Select>
//         }
//       >
//         <div className="space-y-3">
//           {filtered.map((h) => (
//             <div key={h.id} className="flex items-start gap-3 p-3.5 rounded-xl border border-black/[0.06]">
//               <div className="w-10 h-10 rounded-lg bg-amber/15 text-amber-dark flex items-center justify-center shrink-0">
//                 <BookOpenCheck size={18} />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center gap-2 flex-wrap">
//                   <p className="text-[13.5px] font-semibold text-ink">{h.subject}</p>
//                   <span className="text-[11px] text-slate-text/50">· {h.class}-{h.section}</span>
//                 </div>
//                 <p className="text-[13px] text-slate-text mt-0.5">{h.title}</p>
//                 <p className="text-[11.5px] text-slate-text/60 mt-1.5">By {h.teacher} · Assigned {h.assignedDate} · Due {h.dueDate}</p>
//               </div>
//               <Pill tone={statusTone(h.status)}>{h.status}</Pill>
//             </div>
//           ))}
//         </div>
//       </Card>
//     </div>
//   );
// }
