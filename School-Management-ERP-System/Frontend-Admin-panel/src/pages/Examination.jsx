import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  MapPin,
  Calendar,
  Clock,
  Search,
  X,
  Save,
  ClipboardList,
  BookOpen,
  Users,
  Pencil,
} from "lucide-react";
import {
  PageIntro,
  Card,
  Button,
  Select,
  Input,
  Pill,
  StatCard,
} from "../components/UI";
import { api } from "../lib/api";

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
  "Physical Education",
];

const EXAM_TYPES = [
  "Term 1 — Unit Test",
  "Term 1 — Mid Term",
  "Term 1 — Final",
  "Term 2 — Unit Test",
  "Term 2 — Mid Term",
  "Term 2 — Final",
  "Pre-Board",
  "Practical",
];

const ROOM_OPTIONS = [
  "Room 101",
  "Room 102",
  "Room 201",
  "Room 202",
  "Room 203",
  "Room 204",
  "Room 301",
  "Room 302",
  "Lab 1",
  "Lab 2",
  "Auditorium",
  "Hall A",
];

const TIME_OPTIONS = [
  "9:00 AM – 11:00 AM",
  "9:00 AM – 12:00 PM",
  "10:00 AM – 12:00 PM",
  "11:00 AM – 1:00 PM",
  "1:00 PM – 3:00 PM",
  "2:00 PM – 4:00 PM",
];

function formatDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "short",
  });
}

function emptyForm() {
  return {
    exam: "Term 2 — Mid Term",
    class: "Class 8",
    subject: "Mathematics",
    date: "",
    time: "9:00 AM – 11:00 AM",
    room: "Room 204",
    maxMarks: 80,
  };
}

function normalizeExam(exam) {
  return {
    ...exam,
    id: exam._id || exam.id,
    exam: exam.examName || exam.exam || "Exam",
    time:
      exam.time ||
      [exam.startTime, exam.endTime].filter(Boolean).join(" – ") ||
      "—",
    room: exam.room || "Room to be announced",
  };
}

export default function Examination() {
  const [exams, setExams] = useState([]);
  const [cls, setCls] = useState("All");
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    api.exams
      .list()
      .then(({ data }) => setExams((data || []).map(normalizeExam)))
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    return exams.filter((e) => {
      const matchClass = cls === "All" || e.class === cls;
      const q = query.toLowerCase();
      const matchQuery =
        !q ||
        e.subject.toLowerCase().includes(q) ||
        e.exam.toLowerCase().includes(q) ||
        e.room.toLowerCase().includes(q) ||
        e.class.toLowerCase().includes(q);
      return matchClass && matchQuery;
    });
  }, [exams, cls, query]);

  const grouped = useMemo(() => {
    return filtered.reduce((acc, e) => {
      const key = `${e.class}||${e.exam}`;
      if (!acc[key]) acc[key] = { class: e.class, exam: e.exam, items: [] };
      acc[key].items.push(e);
      return acc;
    }, {});
  }, [filtered]);

  const stats = useMemo(() => {
    const classes = new Set(exams.map((e) => e.class));
    const subjects = new Set(exams.map((e) => e.subject));
    const upcoming = exams.filter((e) => new Date(e.date) >= new Date()).length;
    return {
      total: exams.length,
      classes: classes.size,
      subjects: subjects.size,
      upcoming,
    };
  }, [exams]);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm());
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setForm({
      exam: item.exam,
      class: item.class,
      subject: item.subject,
      date: item.date,
      time: item.time,
      room: item.room,
      maxMarks: item.maxMarks,
    });
    setShowModal(true);
  };

  const updateForm = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.date || !form.subject) return;
    const [startTime, endTime] = form.time.split(" – ");
    const payload = {
      examName: form.exam,
      class: form.class,
      subject: form.subject,
      date: form.date,
      startTime,
      endTime,
      room: form.room,
      maxMarks: Number(form.maxMarks) || 80,
    };
    try {
      const response = editId
        ? await api.exams.update(editId, payload)
        : await api.exams.create(payload);
      const savedExam = normalizeExam(response.data);
      setExams((prev) =>
        editId
          ? prev.map((exam) => (exam.id === editId ? savedExam : exam))
          : [...prev, savedExam],
      );
      setShowModal(false);
      setForm(emptyForm());
      setEditId(null);
    } catch (requestError) {
      window.alert(requestError.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.exams.remove(id);
      setExams((prev) => prev.filter((exam) => exam.id !== id));
    } catch (requestError) {
      window.alert(requestError.message);
    }
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Academics"
        title="Examination"
        description="Schedule and manage term examinations across all classes."
        right={
          <Button variant="amber" onClick={openAdd}>
            <Plus size={15} /> Schedule Exam
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={ClipboardList}
          label="Total Exams"
          value={String(stats.total)}
          sub="All scheduled papers"
          accent="info"
        />
        <StatCard
          icon={Users}
          label="Classes Covered"
          value={String(stats.classes)}
          sub="With active schedule"
          accent="amber"
        />
        <StatCard
          icon={BookOpen}
          label="Subjects"
          value={String(stats.subjects)}
          sub="Unique subjects"
          accent="success"
        />
        <StatCard
          icon={Calendar}
          label="Upcoming"
          value={String(stats.upcoming)}
          sub="From today onwards"
          accent="alert"
        />
      </div>

      {/* Filters */}
      <Card
        title="Exam Schedule"
        action={
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text/40"
              />
              <Input
                placeholder="Search subject, exam, room..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-8 w-52"
              />
            </div>
            <Select
              value={cls}
              onChange={(e) => setCls(e.target.value)}
              className="min-w-[140px]"
            >
              {CLASS_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Classes" : c}
                </option>
              ))}
            </Select>
          </div>
        }
      >
        {Object.keys(grouped).length === 0 ? (
          <div className="py-14 text-center">
            <ClipboardList
              size={36}
              className="mx-auto text-slate-text/30 mb-3"
            />
            <p className="text-[14px] font-medium text-ink">No exams found</p>
            <p className="text-[13px] text-slate-text/60 mt-1">
              Try changing filters or schedule a new exam.
            </p>
            <Button variant="amber" className="mt-4" onClick={openAdd}>
              <Plus size={15} /> Schedule Exam
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.values(grouped).map((group) => (
              <div key={`${group.class}-${group.exam}`}>
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="font-display font-semibold text-ink text-[14.5px]">
                    {group.class}
                  </h4>
                  <Pill tone="info">{group.exam}</Pill>
                  <span className="text-[12px] text-slate-text/50">
                    {group.items.length} paper
                    {group.items.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-black/[0.06]">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="text-left text-slate-text/60 text-[11.5px] uppercase tracking-wide bg-paper/80 border-b border-black/[0.06]">
                        <th className="px-4 py-2.5 font-semibold">Subject</th>
                        <th className="px-4 py-2.5 font-semibold">Date</th>
                        <th className="px-4 py-2.5 font-semibold">Time</th>
                        <th className="px-4 py-2.5 font-semibold">Room</th>
                        <th className="px-4 py-2.5 font-semibold">Max Marks</th>
                        <th className="px-4 py-2.5 font-semibold text-right">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((e) => (
                          <tr
                            key={e.id}
                            className="border-b border-black/[0.04] last:border-0 hover:bg-paper/40 transition-colors"
                          >
                            <td className="px-4 py-3 font-semibold text-ink">
                              {e.subject}
                            </td>
                            <td className="px-4 py-3 text-slate-text">
                              <span className="inline-flex items-center gap-1.5">
                                <Calendar
                                  size={13}
                                  className="text-slate-text/50"
                                />
                                {formatDate(e.date)}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-text">
                              <span className="inline-flex items-center gap-1.5">
                                <Clock
                                  size={13}
                                  className="text-slate-text/50"
                                />
                                {e.time}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-text">
                              <span className="inline-flex items-center gap-1">
                                <MapPin
                                  size={13}
                                  className="text-slate-text/50"
                                />
                                {e.room}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <Pill tone="info">{e.maxMarks} marks</Pill>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="inline-flex items-center gap-2">
                                <button
                                  onClick={() => openEdit(e)}
                                  className="text-[12.5px] font-medium text-info hover:underline inline-flex items-center gap-1"
                                >
                                  <Pencil size={12} /> Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(e.id)}
                                  className="text-[12.5px] font-medium text-alert hover:underline"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* ========== SCHEDULE / EDIT MODAL ========== */}
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
                  {editId ? "Edit Exam" : "Schedule Exam"}
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
              <div>
                <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                  Exam Type
                </label>
                <Select
                  value={form.exam}
                  onChange={(e) => updateForm("exam", e.target.value)}
                >
                  {EXAM_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Select>
              </div>

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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                    Time
                  </label>
                  <Select
                    value={form.time}
                    onChange={(e) => updateForm("time", e.target.value)}
                  >
                    {TIME_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                    Room
                  </label>
                  <Select
                    value={form.room}
                    onChange={(e) => updateForm("room", e.target.value)}
                  >
                    {ROOM_OPTIONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                  Max Marks
                </label>
                <Input
                  type="number"
                  min="10"
                  max="100"
                  value={form.maxMarks}
                  onChange={(e) => updateForm("maxMarks", e.target.value)}
                />
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
                disabled={!form.date || !form.subject}
              >
                <Save size={15} /> {editId ? "Update" : "Schedule"} Exam
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import { Plus, MapPin } from "lucide-react";
// import { PageIntro, Card, Button, Pill } from "../components/UI";

// export default function Examination() {
//   const grouped = examSchedule.reduce((acc, e) => {
//     acc[e.class] = acc[e.class] || [];
//     acc[e.class].push(e);
//     return acc;
//   }, {});

//   return (
//     <div className="space-y-6">
//       <PageIntro
//         eyebrow="Academics"
//         title="Examination"
//         description="Term 2 mid-term examination schedule across classes."
//         right={<Button variant="amber"><Plus size={15} /> Schedule Exam</Button>}
//       />

//       {Object.entries(grouped).map(([cls, exams]) => (
//         <Card key={cls} title={`${cls} — ${exams[0].exam}`}>
//           <div className="overflow-x-auto -mx-5">
//             <table className="w-full text-[13px]">
//               <thead>
//                 <tr className="text-left text-slate-text/60 text-[11.5px] uppercase tracking-wide border-b border-black/[0.06]">
//                   <th className="px-5 py-2.5 font-semibold">Subject</th>
//                   <th className="px-5 py-2.5 font-semibold">Date</th>
//                   <th className="px-5 py-2.5 font-semibold">Time</th>
//                   <th className="px-5 py-2.5 font-semibold">Room</th>
//                   <th className="px-5 py-2.5 font-semibold">Max Marks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {exams.map((e) => (
//                   <tr key={e.id} className="border-b border-black/[0.04] last:border-0">
//                     <td className="px-5 py-3 font-semibold text-ink">{e.subject}</td>
//                     <td className="px-5 py-3 text-slate-text">{e.date}</td>
//                     <td className="px-5 py-3 text-slate-text">{e.time}</td>
//                     <td className="px-5 py-3 text-slate-text"><span className="inline-flex items-center gap-1"><MapPin size={12} />{e.room}</span></td>
//                     <td className="px-5 py-3"><Pill tone="info">{e.maxMarks} marks</Pill></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Card>
//       ))}
//     </div>
//   );
// }
