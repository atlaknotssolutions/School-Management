import { useMemo, useState } from "react";
import {
  Download,
  Printer,
  Clock,
  CalendarDays,
  BookOpen,
  Plus,
  X,
  Save,
  Pencil,
} from "lucide-react";
import {
  PageIntro,
  Card,
  Button,
  Select,
  Pill,
  StatCard,
  Input,
} from "../components/UI";
const defaultPeriods = [];

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CLASS_OPTIONS = [
  "Nursery",
  "LKG",
  "UKG",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11-Sci",
  "11-Com",
  "12-Sci",
  "12-Com",
];

const SECTION_OPTIONS = ["A", "B", "C"];

const ALL_SUBJECTS = [
  "Mathematics",
  "English",
  "Science",
  "Hindi",
  "Social Science",
  "Computer Science",
  "Physical Education",
  "Sports",
  "Art",
  "Music",
  "Library",
  "Physics",
  "Chemistry",
  "Biology",
  "Accountancy",
  "Business Studies",
  "Economics",
  "Break",
  "—",
];

const subjectColor = {
  Mathematics: "bg-info/12 text-info border-info/20",
  English: "bg-amber/15 text-amber-dark border-amber/25",
  Science: "bg-success/12 text-success border-success/20",
  "Social Science": "bg-alert/10 text-alert border-alert/20",
  Hindi: "bg-[#6B4F9C]/10 text-[#6B4F9C] border-[#6B4F9C]/20",
  "Computer Science": "bg-ink/10 text-ink border-ink/15",
  "Physical Education": "bg-success/12 text-success border-success/20",
  Sports: "bg-success/12 text-success border-success/20",
  Art: "bg-amber/15 text-amber-dark border-amber/25",
  Music: "bg-[#6B4F9C]/10 text-[#6B4F9C] border-[#6B4F9C]/20",
  Library: "bg-info/12 text-info border-info/20",
  Physics: "bg-info/12 text-info border-info/20",
  Chemistry: "bg-success/12 text-success border-success/20",
  Biology: "bg-success/12 text-success border-success/20",
  Break: "bg-slate-100 text-slate-500 border-slate-200",
  "—": "bg-slate-50 text-slate-300 border-transparent",
};

const subjectTeacher = {
  Mathematics: "Suresh Kulkarni",
  English: "Priya Nair",
  Science: "Anjali Verma",
  "Social Science": "Kavita Joshi",
  Hindi: "Ramesh Iyer",
  "Computer Science": "Manish Gupta",
  "Physical Education": "Arun Chauhan",
  Sports: "Arun Chauhan",
  Art: "Shalini Bhat",
  Music: "Ritu Sharma",
  Library: "Pooja Reddy",
  Physics: "Anjali Verma",
  Chemistry: "Ramesh Iyer",
  Biology: "Priya Nair",
};

// Initial mock schedules
const INITIAL_SCHEDULES = {
  "8-A": {
    Monday: [
      "Mathematics",
      "English",
      "Science",
      "Break",
      "Social Science",
      "Hindi",
      "Computer Science",
      "Physical Education",
    ],
    Tuesday: [
      "Science",
      "Mathematics",
      "Hindi",
      "Break",
      "English",
      "Computer Science",
      "Social Science",
      "Art",
    ],
    Wednesday: [
      "English",
      "Social Science",
      "Mathematics",
      "Break",
      "Science",
      "Hindi",
      "Physical Education",
      "Library",
    ],
    Thursday: [
      "Hindi",
      "Science",
      "English",
      "Break",
      "Mathematics",
      "Social Science",
      "Computer Science",
      "Music",
    ],
    Friday: [
      "Social Science",
      "English",
      "Hindi",
      "Break",
      "Computer Science",
      "Mathematics",
      "Science",
      "Art",
    ],
    Saturday: [
      "Mathematics",
      "Science",
      "English",
      "Break",
      "Sports",
      "Sports",
      "—",
      "—",
    ],
  },
  "8-B": {
    Monday: [
      "English",
      "Mathematics",
      "Hindi",
      "Break",
      "Science",
      "Social Science",
      "Art",
      "Computer Science",
    ],
    Tuesday: [
      "Mathematics",
      "Science",
      "English",
      "Break",
      "Hindi",
      "Physical Education",
      "Social Science",
      "Library",
    ],
    Wednesday: [
      "Science",
      "Hindi",
      "Mathematics",
      "Break",
      "English",
      "Computer Science",
      "Music",
      "Social Science",
    ],
    Thursday: [
      "Social Science",
      "English",
      "Science",
      "Break",
      "Mathematics",
      "Hindi",
      "Physical Education",
      "Art",
    ],
    Friday: [
      "Hindi",
      "Mathematics",
      "Computer Science",
      "Break",
      "Science",
      "English",
      "Social Science",
      "Library",
    ],
    Saturday: [
      "English",
      "Science",
      "Mathematics",
      "Break",
      "Sports",
      "Sports",
      "—",
      "—",
    ],
  },
  "9-A": {
    Monday: [
      "Mathematics",
      "Science",
      "English",
      "Break",
      "Hindi",
      "Social Science",
      "Computer Science",
      "Physical Education",
    ],
    Tuesday: [
      "Science",
      "Mathematics",
      "Hindi",
      "Break",
      "English",
      "Art",
      "Social Science",
      "Library",
    ],
    Wednesday: [
      "English",
      "Social Science",
      "Mathematics",
      "Break",
      "Science",
      "Computer Science",
      "Hindi",
      "Music",
    ],
    Thursday: [
      "Hindi",
      "Science",
      "English",
      "Break",
      "Mathematics",
      "Physical Education",
      "Social Science",
      "Art",
    ],
    Friday: [
      "Social Science",
      "English",
      "Computer Science",
      "Break",
      "Mathematics",
      "Science",
      "Hindi",
      "Library",
    ],
    Saturday: [
      "Mathematics",
      "English",
      "Science",
      "Break",
      "Sports",
      "Sports",
      "—",
      "—",
    ],
  },
  "10-A": {
    Monday: [
      "Mathematics",
      "Physics",
      "English",
      "Break",
      "Chemistry",
      "Hindi",
      "Computer Science",
      "Physical Education",
    ],
    Tuesday: [
      "Physics",
      "Mathematics",
      "Chemistry",
      "Break",
      "English",
      "Biology",
      "Hindi",
      "Library",
    ],
    Wednesday: [
      "English",
      "Chemistry",
      "Mathematics",
      "Break",
      "Physics",
      "Computer Science",
      "Biology",
      "Art",
    ],
    Thursday: [
      "Hindi",
      "Physics",
      "English",
      "Break",
      "Mathematics",
      "Chemistry",
      "Physical Education",
      "Music",
    ],
    Friday: [
      "Chemistry",
      "English",
      "Biology",
      "Break",
      "Mathematics",
      "Physics",
      "Hindi",
      "Library",
    ],
    Saturday: [
      "Mathematics",
      "Physics",
      "English",
      "Break",
      "Sports",
      "Sports",
      "—",
      "—",
    ],
  },
};

function emptySchedule() {
  const s = {};
  DAYS.forEach((day) => {
    s[day] = defaultPeriods.map((_, i) => (i === 3 ? "Break" : "—"));
  });
  return s;
}

function formatClassLabel(c) {
  if (["Nursery", "LKG", "UKG"].includes(c)) return c;
  if (c.startsWith("11") || c.startsWith("12")) return `Class ${c}`;
  return `Class ${c}`;
}

export default function Timetable() {
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES);
  const [cls, setCls] = useState("8");
  const [section, setSection] = useState("A");
  const [showEditor, setShowEditor] = useState(false);
  const [editKey, setEditKey] = useState(null); // "8-A"
  const [draft, setDraft] = useState(null);
  const [draftClass, setDraftClass] = useState("8");
  const [draftSection, setDraftSection] = useState("A");

  const key = `${cls}-${section}`;
  const schedule = schedules[key] || null;

  const uniqueSubjects = useMemo(() => {
    if (!schedule) return 0;
    const set = new Set();
    DAYS.forEach((day) => {
      (schedule[day] || []).forEach((s) => {
        if (s !== "Break" && s !== "—") set.add(s);
      });
    });
    return set.size;
  }, [schedule]);

  // Open editor for new timetable
  const openAdd = () => {
    setEditKey(null);
    setDraftClass(cls);
    setDraftSection(section);
    setDraft(emptySchedule());
    setShowEditor(true);
  };

  // Open editor for existing
  const openEdit = () => {
    if (!schedule) return;
    setEditKey(key);
    setDraftClass(cls);
    setDraftSection(section);
    setDraft(JSON.parse(JSON.stringify(schedule)));
    setShowEditor(true);
  };

  const updateCell = (day, periodIdx, value) => {
    setDraft((prev) => {
      const next = { ...prev };
      next[day] = [...next[day]];
      next[day][periodIdx] = value;
      return next;
    });
  };

  const handleSave = () => {
    const newKey = `${draftClass}-${draftSection}`;
    setSchedules((prev) => ({
      ...prev,
      [newKey]: draft,
    }));
    setCls(draftClass);
    setSection(draftSection);
    setShowEditor(false);
    setDraft(null);
  };

  const handleCancel = () => {
    setShowEditor(false);
    setDraft(null);
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Academics"
        title="Timetable"
        description="Weekly class schedule. Create and edit timetables for any class & section."
        right={
          <div className="flex gap-2">
            <Button variant="outline">
              <Printer size={15} /> Print
            </Button>
            <Button variant="amber" onClick={openAdd}>
              <Plus size={15} /> Add Timetable
            </Button>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={CalendarDays}
          label="Working Days"
          value="6"
          sub="Mon – Sat"
          accent="info"
        />
        <StatCard
          icon={Clock}
          label="Periods / Day"
          value={String(defaultPeriods.length)}
          sub="Including break"
          accent="amber"
        />
        <StatCard
          icon={BookOpen}
          label="Subjects this week"
          value={String(uniqueSubjects)}
          sub={schedule ? `${formatClassLabel(cls)}-${section}` : "—"}
          accent="success"
        />
        <StatCard
          icon={Clock}
          label="School Timing"
          value="9:00 – 2:35"
          sub="Full day"
          accent="info"
        />
      </div>

      {/* Main Card */}
      <Card
        title={
          schedule
            ? `${formatClassLabel(cls)} · Section ${section} · Weekly Schedule`
            : "Select Class & Section"
        }
        action={
          <div className="flex flex-wrap gap-2">
            <Select
              value={cls}
              onChange={(e) => setCls(e.target.value)}
              className="min-w-[130px]"
            >
              {CLASS_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {formatClassLabel(c)}
                </option>
              ))}
            </Select>
            <Select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="min-w-[100px]"
            >
              {SECTION_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  Section {s}
                </option>
              ))}
            </Select>
            {schedule && (
              <Button variant="outline" onClick={openEdit}>
                <Pencil size={14} /> Edit
              </Button>
            )}
          </div>
        }
      >
        {!schedule ? (
          <div className="py-16 text-center">
            <CalendarDays
              size={40}
              className="mx-auto text-slate-text/25 mb-3"
            />
            <p className="text-[15px] font-semibold text-ink">
              No timetable found
            </p>
            <p className="text-[13.5px] text-slate-text/60 mt-1.5 max-w-sm mx-auto">
              There is no schedule for {formatClassLabel(cls)}-{section} yet.
            </p>
            <Button variant="amber" className="mt-5" onClick={openAdd}>
              <Plus size={15} /> Create Timetable for {formatClassLabel(cls)}-
              {section}
            </Button>
          </div>
        ) : (
          <>
            {/* Legend */}
            <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-black/[0.06]">
              {Object.entries(subjectColor)
                .filter(([k]) => !["Break", "—"].includes(k))
                .slice(0, 9)
                .map(([subj, clsName]) => (
                  <span
                    key={subj}
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold border ${clsName}`}
                  >
                    {subj}
                  </span>
                ))}
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                Break
              </span>
            </div>

            {/* Grid */}
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-[12.5px] border-separate border-spacing-1.5 min-w-[920px]">
                <thead>
                  <tr>
                    <th className="text-left text-slate-text/60 text-[11px] uppercase font-semibold px-2 w-24 sticky left-0 bg-white z-10">
                      Day
                    </th>
                    {defaultPeriods.map((p) => (
                      <th
                        key={p}
                        className="text-slate-text/60 text-[10.5px] font-semibold pb-1 text-center min-w-[100px]"
                      >
                        {p}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DAYS.map((day) => (
                    <tr key={day}>
                      <td className="font-semibold text-ink text-[12.5px] px-2 whitespace-nowrap sticky left-0 bg-white z-10">
                        {day}
                      </td>
                      {(schedule[day] || []).map((subj, i) => {
                        const isBreak = subj === "Break";
                        const isEmpty = subj === "—";
                        const colorCls =
                          subjectColor[subj] ||
                          "bg-slate-50 text-slate-500 border-slate-100";
                        const teacher = subjectTeacher[subj];
                        return (
                          <td key={i}>
                            <div
                              className={`rounded-xl py-2.5 px-1.5 text-center border min-h-[52px] flex flex-col items-center justify-center ${colorCls}`}
                              title={teacher ? `${subj} · ${teacher}` : subj}
                            >
                              <span className="font-semibold leading-tight">
                                {isEmpty ? "—" : subj}
                              </span>
                              {!isBreak && !isEmpty && teacher && (
                                <span className="text-[10px] opacity-70 mt-0.5 truncate max-w-full">
                                  {teacher.split(" ")[0]}
                                </span>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-4 border-t border-black/[0.06] text-[12.5px] text-slate-text/70">
              Showing timetable for{" "}
              <strong className="text-ink">
                {formatClassLabel(cls)}-{section}
              </strong>
            </div>
          </>
        )}
      </Card>

      {/* ========== ADD / EDIT MODAL ========== */}
      {showEditor && draft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={handleCancel}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06]">
              <div>
                <h3 className="font-display font-semibold text-ink text-[17px]">
                  {editKey ? "Edit Timetable" : "Add New Timetable"}
                </h3>
                <p className="text-[12.5px] text-slate-text/70 mt-0.5">
                  Select class & section, then assign subjects for each period.
                </p>
              </div>
              <button
                onClick={handleCancel}
                className="p-2 rounded-lg hover:bg-paper text-slate-text"
              >
                <X size={20} />
              </button>
            </div>

            {/* Class / Section selectors */}
            <div className="px-5 py-3 border-b border-black/[0.06] flex flex-wrap gap-3 bg-paper/50">
              <div>
                <label className="text-[11.5px] font-semibold text-slate-text/70 block mb-1">
                  Class
                </label>
                <Select
                  value={draftClass}
                  onChange={(e) => setDraftClass(e.target.value)}
                  className="min-w-[140px]"
                  disabled={!!editKey}
                >
                  {CLASS_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {formatClassLabel(c)}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="text-[11.5px] font-semibold text-slate-text/70 block mb-1">
                  Section
                </label>
                <Select
                  value={draftSection}
                  onChange={(e) => setDraftSection(e.target.value)}
                  className="min-w-[100px]"
                  disabled={!!editKey}
                >
                  {SECTION_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      Section {s}
                    </option>
                  ))}
                </Select>
              </div>
              {schedules[`${draftClass}-${draftSection}`] && !editKey && (
                <p className="self-end text-[12.5px] text-alert font-medium pb-2">
                  ⚠ A timetable already exists for this class-section. Saving
                  will overwrite it.
                </p>
              )}
            </div>

            {/* Editable grid */}
            <div className="flex-1 overflow-auto p-5">
              <div className="overflow-x-auto">
                <table className="w-full text-[12.5px] border-separate border-spacing-1.5 min-w-[900px]">
                  <thead>
                    <tr>
                      <th className="text-left text-slate-text/60 text-[11px] uppercase font-semibold px-2 w-24">
                        Day
                      </th>
                      {defaultPeriods.map((p) => (
                        <th
                          key={p}
                          className="text-slate-text/60 text-[10.5px] font-semibold pb-1 text-center min-w-[110px]"
                        >
                          {p}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DAYS.map((day) => (
                      <tr key={day}>
                        <td className="font-semibold text-ink text-[12.5px] px-2 whitespace-nowrap">
                          {day}
                        </td>
                        {(draft[day] || []).map((subj, i) => (
                          <td key={i}>
                            <select
                              value={subj}
                              onChange={(e) =>
                                updateCell(day, i, e.target.value)
                              }
                              className={`w-full rounded-lg py-2 px-1.5 text-center text-[12px] font-semibold border outline-none focus:border-ink/40 ${
                                subjectColor[subj] ||
                                "bg-white text-slate-600 border-black/10"
                              }`}
                            >
                              {ALL_SUBJECTS.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-black/[0.06] flex justify-end gap-2 bg-white">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="amber" onClick={handleSave}>
                <Save size={15} /> Save Timetable
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import { PageIntro, Card, Select, Pill } from "../components/UI";

// const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const subjectColor = {
//   Mathematics: "bg-info/10 text-info", English: "bg-amber/15 text-amber-dark", Science: "bg-success/10 text-success",
//   "Social Science": "bg-alert/10 text-alert", Hindi: "bg-[#6B4F9C]/10 text-[#6B4F9C]", "Computer Science": "bg-ink/10 text-ink",
//   "Physical Education": "bg-success/10 text-success", Art: "bg-amber/15 text-amber-dark", Music: "bg-[#6B4F9C]/10 text-[#6B4F9C]",
//   Library: "bg-info/10 text-info", Sports: "bg-success/10 text-success", Break: "bg-slate-100 text-slate-500", "—": "bg-slate-50 text-slate-300",
// };

// export default function Timetable() {
//   const data = timetable["Class 8-A"];
//   return (
//     <div className="space-y-6">
//       <PageIntro
//         eyebrow="Academics"
//         title="Timetable"
//         description="Weekly class schedule with subject and period mapping."
//         right={
//           <div className="flex gap-2">
//             <Select defaultValue="8"><option value="8">Class 8</option></Select>
//             <Select defaultValue="A"><option value="A">Section A</option></Select>
//           </div>
//         }
//       />

//       <Card title="Class 8-A · Weekly Schedule">
//         <div className="overflow-x-auto">
//           <table className="w-full text-[12.5px] border-separate border-spacing-1.5 min-w-[900px]">
//             <thead>
//               <tr>
//                 <th className="text-left text-slate-text/60 text-[11px] uppercase font-semibold px-2 w-24">Day</th>
//                 {periods.map((p) => (
//                   <th key={p} className="text-slate-text/60 text-[10.5px] font-semibold pb-1">{p}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {days.map((day) => (
//                 <tr key={day}>
//                   <td className="font-semibold text-ink text-[12.5px] px-2 whitespace-nowrap">{day}</td>
//                   {data[day].map((subj, i) => (
//                     <td key={i}>
//                       <div className={`rounded-lg py-2.5 text-center font-semibold ${subjectColor[subj] || "bg-slate-50 text-slate-500"}`}>
//                         {subj}
//                       </div>
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </Card>
//     </div>
//   );
// }
