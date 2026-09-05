import { useMemo, useState } from "react";
import {
  Send,
  User,
  Megaphone,
  Search,
  Plus,
  X,
  MessageSquare,
  Users,
  Mail,
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
const initialMessages = [];

const BROADCAST_TARGETS = [
  "All Parents",
  "All Staff",
  "Class 6 Parents",
  "Class 7 Parents",
  "Class 8 Parents",
  "Class 8-A Parents",
  "Class 9 Parents",
  "Class 10 Parents",
  "Bus Route 1 Parents",
  "Bus Route 4 Parents",
];

function emptyCompose() {
  return {
    type: "one-to-one",
    to: "",
    subject: "",
    body: "",
    target: "All Parents",
  };
}

export default function Communication() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedId, setSelectedId] = useState(initialMessages[0]?.id || null);
  const [filter, setFilter] = useState("all"); // all | one-to-one | broadcast
  const [query, setQuery] = useState("");
  const [showCompose, setShowCompose] = useState(false);
  const [compose, setCompose] = useState(emptyCompose());
  const [sentToast, setSentToast] = useState(false);

  const selected = messages.find((m) => m.id === selectedId) || messages[0];

  const filtered = useMemo(() => {
    return messages.filter((m) => {
      const matchType =
        filter === "all" ||
        (filter === "one-to-one" && m.type === "one-to-one") ||
        (filter === "broadcast" && m.type === "broadcast");
      const q = query.toLowerCase();
      const matchQuery =
        !q ||
        m.from.toLowerCase().includes(q) ||
        m.to.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.preview.toLowerCase().includes(q);
      return matchType && matchQuery;
    });
  }, [messages, filter, query]);

  const stats = useMemo(() => {
    const unread = messages.filter((m) => m.unread).length;
    const oneToOne = messages.filter((m) => m.type === "one-to-one").length;
    const broadcast = messages.filter((m) => m.type === "broadcast").length;
    return { total: messages.length, unread, oneToOne, broadcast };
  }, [messages]);

  const markRead = (id) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, unread: false } : m)),
    );
    setSelectedId(id);
  };

  const updateCompose = (field, value) => {
    setCompose((c) => ({ ...c, [field]: value }));
  };

  const handleSend = () => {
    if (!compose.subject.trim() || !compose.body.trim()) return;
    if (compose.type === "one-to-one" && !compose.to.trim()) return;

    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const newMsg = {
      id: Date.now(),
      from: "Jeet Ahirwar (Administrator)",
      to: compose.type === "broadcast" ? compose.target : compose.to,
      subject: compose.subject,
      preview:
        compose.body.slice(0, 80) + (compose.body.length > 80 ? "..." : ""),
      body: compose.body,
      date,
      time,
      unread: false,
      type: compose.type,
    };

    setMessages((prev) => [newMsg, ...prev]);
    setSelectedId(newMsg.id);
    setShowCompose(false);
    setCompose(emptyCompose());
    setSentToast(true);
    setTimeout(() => setSentToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Admissions & Outreach"
        title="Communication"
        description="Send one-to-one messages to parents or broadcast announcements to classes and groups."
        right={
          <Button
            variant="amber"
            onClick={() => {
              setCompose(emptyCompose());
              setShowCompose(true);
            }}
          >
            <Plus size={15} /> New Message
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={MessageSquare}
          label="Total Messages"
          value={String(stats.total)}
          sub="Inbox"
          accent="info"
        />
        <StatCard
          icon={Mail}
          label="Unread"
          value={String(stats.unread)}
          sub="Needs attention"
          accent="alert"
        />
        <StatCard
          icon={User}
          label="One-to-One"
          value={String(stats.oneToOne)}
          sub="Direct messages"
          accent="amber"
        />
        <StatCard
          icon={Megaphone}
          label="Broadcasts"
          value={String(stats.broadcast)}
          sub="Announcements"
          accent="success"
        />
      </div>

      {sentToast && (
        <div className="rounded-xl bg-success/10 border border-success/20 px-4 py-3 text-[13.5px] text-success font-medium flex items-center gap-2">
          <Send size={16} /> Message sent successfully (demo)
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Inbox */}
        <Card
          title="Inbox"
          className="lg:col-span-1 flex flex-col max-h-[620px]"
          bodyClassName="p-3 flex flex-col flex-1 min-h-0"
          action={
            <div className="flex gap-1.5">
              {["all", "one-to-one", "broadcast"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2.5 py-1 rounded-lg text-[11.5px] font-semibold transition-colors ${
                    filter === f
                      ? "bg-amber text-ink"
                      : "bg-paper text-slate-text hover:bg-black/5"
                  }`}
                >
                  {f === "all"
                    ? "All"
                    : f === "one-to-one"
                      ? "1:1"
                      : "Broadcast"}
                </button>
              ))}
            </div>
          }
        >
          <div className="relative mb-3">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text/40"
            />
            <Input
              placeholder="Search messages..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-8 w-full"
            />
          </div>

          <div className="space-y-1 overflow-y-auto scrollbar-thin flex-1">
            {filtered.length === 0 ? (
              <p className="text-center text-[13px] text-slate-text/60 py-8">
                No messages found
              </p>
            ) : (
              filtered.map((m) => (
                <button
                  key={m.id}
                  onClick={() => markRead(m.id)}
                  className={`w-full text-left p-3 rounded-xl transition-colors ${
                    selected?.id === m.id
                      ? "bg-amber/15 border border-amber/20"
                      : "hover:bg-paper border border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <p className="text-[12.5px] font-semibold text-ink truncate flex items-center gap-1.5">
                      {m.type === "broadcast" ? (
                        <Megaphone size={12} className="text-info shrink-0" />
                      ) : (
                        <User
                          size={12}
                          className="text-slate-text/50 shrink-0"
                        />
                      )}
                      {m.from}
                    </p>
                    {m.unread && (
                      <span className="w-2 h-2 rounded-full bg-alert shrink-0" />
                    )}
                  </div>
                  <p className="text-[12.5px] font-medium text-ink/85 truncate">
                    {m.subject}
                  </p>
                  <p className="text-[11.5px] text-slate-text/60 truncate mt-0.5">
                    {m.preview}
                  </p>
                  <p className="text-[10.5px] text-slate-text/40 mt-1">
                    {m.date} · {m.time}
                  </p>
                </button>
              ))
            )}
          </div>
        </Card>

        {/* Message detail + compose area */}
        <Card title="Message" className="lg:col-span-2">
          {selected ? (
            <>
              <div className="border-b border-black/[0.06] pb-4 mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Pill tone={selected.type === "broadcast" ? "info" : "amber"}>
                    {selected.type === "broadcast" ? "Broadcast" : "One-to-one"}
                  </Pill>
                  <span className="text-[12px] text-slate-text/55">
                    {selected.date} · {selected.time}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-ink text-[17px] leading-snug">
                  {selected.subject}
                </h3>
                <div className="mt-3 space-y-1 text-[13px]">
                  <p>
                    <span className="text-slate-text/60">From:</span>{" "}
                    <span className="font-medium text-ink">
                      {selected.from}
                    </span>
                  </p>
                  <p>
                    <span className="text-slate-text/60">To:</span>{" "}
                    <span className="font-medium text-ink">{selected.to}</span>
                  </p>
                </div>
              </div>

              <div className="text-[13.5px] text-ink/90 leading-relaxed min-h-[120px] whitespace-pre-wrap">
                {selected.body || selected.preview}
                {!selected.body && (
                  <p className="text-slate-text/50 mt-3 text-[13px] italic">
                    (Full message body not stored in demo data — showing
                    preview.)
                  </p>
                )}
              </div>

              {/* Quick reply */}
              <div className="mt-6 pt-5 border-t border-black/[0.06]">
                <p className="text-[12.5px] font-semibold text-ink mb-2">
                  Quick Reply
                </p>
                <textarea
                  rows={3}
                  placeholder="Type a reply..."
                  className="w-full rounded-lg border border-black/10 p-3 text-[13px] outline-none focus:border-ink/40 resize-none"
                  id="quick-reply"
                />
                <div className="flex justify-end mt-3">
                  <Button
                    variant="amber"
                    onClick={() => {
                      const el = document.getElementById("quick-reply");
                      if (el && el.value.trim()) {
                        setCompose({
                          type: "one-to-one",
                          to: selected.from,
                          subject: `Re: ${selected.subject}`,
                          body: el.value,
                          target: "All Parents",
                        });
                        handleSend();
                        el.value = "";
                      }
                    }}
                  >
                    <Send size={14} /> Send Reply
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="py-16 text-center text-slate-text/60">
              Select a message from the inbox
            </div>
          )}
        </Card>
      </div>

      {/* ========== COMPOSE MODAL ========== */}
      {showCompose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setShowCompose(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06]">
              <div>
                <h3 className="font-display font-semibold text-ink text-[17px]">
                  New Message
                </h3>
                <p className="text-[12.5px] text-slate-text/70 mt-0.5">
                  Send one-to-one or broadcast message.
                </p>
              </div>
              <button
                onClick={() => setShowCompose(false)}
                className="p-2 rounded-lg hover:bg-paper text-slate-text"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-5 py-4 space-y-4">
              {/* Type toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => updateCompose("type", "one-to-one")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold border transition-colors ${
                    compose.type === "one-to-one"
                      ? "bg-amber/15 border-amber text-ink"
                      : "border-black/10 text-slate-text hover:bg-paper"
                  }`}
                >
                  <User size={15} /> One-to-One
                </button>
                <button
                  onClick={() => updateCompose("type", "broadcast")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold border transition-colors ${
                    compose.type === "broadcast"
                      ? "bg-info/10 border-info text-info"
                      : "border-black/10 text-slate-text hover:bg-paper"
                  }`}
                >
                  <Megaphone size={15} /> Broadcast
                </button>
              </div>

              {compose.type === "one-to-one" ? (
                <div>
                  <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                    To (Parent / Staff name)
                  </label>
                  <Input
                    placeholder="e.g. Rohit Sharma (Parent of Advika)"
                    value={compose.to}
                    onChange={(e) => updateCompose("to", e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                    Send to
                  </label>
                  <Select
                    value={compose.target}
                    onChange={(e) => updateCompose("target", e.target.value)}
                  >
                    {BROADCAST_TARGETS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>
                </div>
              )}

              <div>
                <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                  Subject *
                </label>
                <Input
                  placeholder="Message subject"
                  value={compose.subject}
                  onChange={(e) => updateCompose("subject", e.target.value)}
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold text-ink mb-1.5 block">
                  Message *
                </label>
                <textarea
                  rows={5}
                  placeholder="Write your message..."
                  value={compose.body}
                  onChange={(e) => updateCompose("body", e.target.value)}
                  className="w-full rounded-lg border border-black/10 p-3 text-[13px] outline-none focus:border-ink/40 resize-none"
                />
              </div>
            </div>

            <div className="px-5 py-4 border-t border-black/[0.06] flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCompose(false)}>
                Cancel
              </Button>
              <Button
                variant="amber"
                onClick={handleSend}
                disabled={
                  !compose.subject.trim() ||
                  !compose.body.trim() ||
                  (compose.type === "one-to-one" && !compose.to.trim())
                }
              >
                <Send size={15} /> Send Message
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// import { useState } from "react";
// import { Send, Users, User, Megaphone } from "lucide-react";
// import { PageIntro, Card, Button, Select, Pill } from "../components/UI";

// export default function Communication() {
//   const [mode, setMode] = useState("one-to-one");
//   const [selected, setSelected] = useState(messages[0]);

//   return (
//     <div className="space-y-6">
//       <PageIntro
//         eyebrow="Admissions & Outreach"
//         title="Communication"
//         description="Send one-to-one messages to a parent or broadcast announcements to a class, grade, or the whole school."
//       />

//       <div className="grid lg:grid-cols-3 gap-5">
//         <Card title="Inbox" className="lg:col-span-1 max-h-[560px] flex flex-col">
//           <div className="space-y-1.5 -mx-1 overflow-y-auto scrollbar-thin">
//             {messages.map((m) => (
//               <button
//                 key={m.id}
//                 onClick={() => setSelected(m)}
//                 className={`w-full text-left p-3 rounded-xl transition-colors ${
//                   selected.id === m.id ? "bg-amber/15" : "hover:bg-paper"
//                 }`}
//               >
//                 <div className="flex items-center justify-between mb-1">
//                   <p className="text-[12.5px] font-semibold text-ink truncate flex items-center gap-1.5">
//                     {m.type === "broadcast" ? <Megaphone size={12} className="text-info shrink-0" /> : <User size={12} className="text-slate-text/50 shrink-0" />}
//                     {m.from}
//                   </p>
//                   {m.unread && <span className="w-1.5 h-1.5 rounded-full bg-alert shrink-0" />}
//                 </div>
//                 <p className="text-[12.5px] font-medium text-ink/80 truncate">{m.subject}</p>
//                 <p className="text-[11.5px] text-slate-text/60 truncate mt-0.5">{m.preview}</p>
//                 <p className="text-[10.5px] text-slate-text/40 mt-1">{m.date} · {m.time}</p>
//               </button>
//             ))}
//           </div>
//         </Card>

//         <Card title="Message" className="lg:col-span-2">
//           <div className="border-b border-black/[0.06] pb-4 mb-4">
//             <div className="flex items-center gap-2 mb-2">
//               <Pill tone={selected.type === "broadcast" ? "info" : "amber"}>
//                 {selected.type === "broadcast" ? "Broadcast" : "One-to-one"}
//               </Pill>
//               <span className="text-[11.5px] text-slate-text/50">{selected.date} · {selected.time}</span>
//             </div>
//             <h3 className="font-display font-bold text-ink text-lg">{selected.subject}</h3>
//             <p className="text-[12.5px] text-slate-text/70 mt-1">From <b className="text-ink">{selected.from}</b> to <b className="text-ink">{selected.to}</b></p>
//           </div>
//           <p className="text-[13.5px] text-slate-text leading-relaxed mb-8">{selected.preview} Please reach out to the class teacher during visiting hours (3:30–4:15 PM) for a detailed discussion, or reply directly to this message.</p>

//           <div className="border-t border-black/[0.06] pt-4">
//             <div className="flex gap-2 mb-3">
//               <button
//                 onClick={() => setMode("one-to-one")}
//                 className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12.5px] font-semibold border ${mode === "one-to-one" ? "bg-ink text-white border-ink" : "border-black/10 text-slate-text"}`}
//               >
//                 <User size={14} /> Reply to Parent
//               </button>
//               <button
//                 onClick={() => setMode("broadcast")}
//                 className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[12.5px] font-semibold border ${mode === "broadcast" ? "bg-ink text-white border-ink" : "border-black/10 text-slate-text"}`}
//               >
//                 <Users size={14} /> Broadcast Instead
//               </button>
//             </div>
//             {mode === "broadcast" && (
//               <Select className="mb-3 w-full">
//                 <option>Send to: All Parents</option>
//                 <option>Send to: Class 8 Parents</option>
//                 <option>Send to: Class 8-A Parents</option>
//                 <option>Send to: All Staff</option>
//                 <option>Send to: Bus Route 4 Parents</option>
//               </Select>
//             )}
//             <textarea
//               rows={3}
//               placeholder="Type your message..."
//               className="w-full rounded-lg border border-black/10 p-3 text-[13px] outline-none focus:border-ink/40"
//               defaultValue={mode === "one-to-one" ? "Thank you for the update — will follow up during the PTM." : ""}
//             />
//             <div className="flex justify-end mt-3">
//               <Button variant="amber"><Send size={14} /> Send Message</Button>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }
