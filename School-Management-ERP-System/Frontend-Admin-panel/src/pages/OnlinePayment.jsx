import { useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Landmark,
  CheckCircle2,
  Search,
  Download,
  X,
} from "lucide-react";
import { PageIntro, Card, Button, Input, Pill, Select } from "../components/UI";
const feeStructure = [];
const students = [];

const methods = [
  {
    key: "upi",
    label: "UPI",
    icon: Smartphone,
    desc: "Pay via Google Pay, PhonePe, Paytm",
  },
  {
    key: "card",
    label: "Debit / Credit Card",
    icon: CreditCard,
    desc: "Visa, Mastercard, RuPay accepted",
  },
  {
    key: "netbanking",
    label: "Net Banking",
    icon: Landmark,
    desc: "All major Indian banks",
  },
];

const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank"];

const CLASS_OPTIONS = [
  "All",
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

function todayDisplay() {
  return new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function receiptNo() {
  const d = new Date();
  return `RCPT-${d.getFullYear()}-${String(Math.floor(900 + Math.random() * 100))}`;
}

export default function OnlinePayment() {
  const total = useMemo(
    () => feeStructure.reduce((a, f) => a + f.termAmount, 0),
    [],
  );

  const [method, setMethod] = useState("upi");
  const [paid, setPaid] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState("");
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [student, setStudent] = useState(students[6]);
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [bank, setBank] = useState(BANKS[0]);
  const [payments, setPayments] = useLocalStorage("sap_online_payments", []);

  const filteredStudents = useMemo(() => {
    const q = query.toLowerCase();
    return students.filter((s) => {
      const matchClass = classFilter === "All" || s.class === classFilter;
      const matchQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q);
      return matchClass && matchQuery;
    });
  }, [query, classFilter]);

  const paidAmount = payments.reduce((a, p) => a + p.amount, 0);
  const paymentCount = payments.length;
  const pendingStudents = new Set(
    students.map((s) => (s.feeStatus !== "Paid" ? s.id : null)).filter(Boolean),
  ).size;

  const paymentReady = () => {
    if (method === "upi") return upiId.trim().length > 0 && upiId.includes("@");
    if (method === "card")
      return (
        cardNumber.replace(/\s/g, "").length >= 12 &&
        cardExpiry.trim().length > 0 &&
        cardCvv.trim().length >= 3
      );
    return true;
  };

  const clearFields = () => {
    setUpiId("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setBank(BANKS[0]);
  };

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      const rcp = receiptNo();
      setReceipt(rcp);
      setPayments((prev) => [
        {
          id: Date.now(),
          student: student.name,
          studentId: student.id,
          amount: total,
          method,
          date: todayDisplay(),
          receipt: rcp,
        },
        ...prev,
      ]);
      setProcessing(false);
      setPaid(true);
      clearFields();
    }, 1200);
  };

  const handleMakeAnother = () => {
    setPaid(false);
    setMethod("upi");
    setPickerOpen(false);
  };

  const selectStudent = (s) => {
    setStudent(s);
    setPickerOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Finance"
        title="Online Fees Payment"
        description="Secure, parent-facing checkout for term fee payments."
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card bodyClassName="p-5">
          <p className="text-[12.5px] text-slate-text/80 font-medium">
            Payments Made
          </p>
          <p className="font-display text-[28px] font-bold text-ink mt-1 leading-none">
            {paymentCount}
          </p>
          <p className="text-[11.5px] text-slate-text/60 mt-2">This session</p>
        </Card>
        <Card bodyClassName="p-5">
          <p className="text-[12.5px] text-slate-text/80 font-medium">
            Collected
          </p>
          <p className="font-display text-[28px] font-bold text-ink mt-1 leading-none">
            ₹{(paidAmount / 100000).toFixed(1)}L
          </p>
          <p className="text-[11.5px] text-slate-text/60 mt-2">
            Successful payments
          </p>
        </Card>
        <Card bodyClassName="p-5">
          <p className="text-[12.5px] text-slate-text/80 font-medium">
            Pending Students
          </p>
          <p className="font-display text-[28px] font-bold text-ink mt-1 leading-none">
            {pendingStudents}
          </p>
          <p className="text-[11.5px] text-slate-text/60 mt-2">
            Fees not fully paid
          </p>
        </Card>
        <Card bodyClassName="p-5">
          <p className="text-[12.5px] text-slate-text/80 font-medium">
            Gateway
          </p>
          <p className="font-display text-[28px] font-bold text-ink mt-1 leading-none">
            PCI-DSS
          </p>
          <p className="text-[11.5px] text-slate-text/60 mt-2">
            256-bit encrypted
          </p>
        </Card>
      </div>

      {payments.length > 0 && (
        <Card title="Recent Payments">
          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-slate-text/60 text-[11.5px] uppercase tracking-wide border-b border-black/[0.06]">
                  <th className="px-5 py-2.5 font-semibold">Receipt</th>
                  <th className="px-5 py-2.5 font-semibold">Student</th>
                  <th className="px-5 py-2.5 font-semibold">Method</th>
                  <th className="px-5 py-2.5 font-semibold">Amount</th>
                  <th className="px-5 py-2.5 font-semibold">Date</th>
                  <th className="px-5 py-2.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-black/[0.04] hover:bg-paper/60"
                  >
                    <td className="px-5 py-3 font-mono text-[12px] text-slate-text">
                      {p.receipt}
                    </td>
                    <td className="px-5 py-3 font-semibold text-ink">
                      {p.student}
                    </td>
                    <td className="px-5 py-3 text-slate-text">{p.method}</td>
                    <td className="px-5 py-3 text-slate-text font-medium">
                      ₹{p.amount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-5 py-3 text-slate-text whitespace-nowrap">
                      {p.date}
                    </td>
                    <td className="px-5 py-3">
                      <Pill tone="success">Success</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-5">
        <Card title="Fee Summary" className="lg:col-span-1 h-fit">
          <button
            onClick={() => {
              setPickerOpen(true);
              setQuery("");
            }}
            className="flex items-center gap-3 pb-4 mb-4 border-b border-black/[0.06] w-full text-left hover:bg-paper/60 rounded-lg transition-colors"
          >
            <img
              src={student.avatar}
              alt={student.name}
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-ink text-[13.5px] truncate">
                {student.name}
              </p>
              <p className="text-[11.5px] text-slate-text/60">
                {student.id} · Class {student.class}-{student.section}
              </p>
            </div>
            <span className="text-[11.5px] font-semibold text-info shrink-0">
              Change
            </span>
          </button>

          {student.feeStatus !== "Paid" ? (
            <>
              <div className="space-y-2">
                {feeStructure.map((f) => (
                  <div
                    key={f.head}
                    className="flex justify-between text-[13px]"
                  >
                    <span className="text-slate-text">{f.head}</span>
                    <span className="text-ink font-medium">
                      ₹{f.termAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between pt-3 mt-3 border-t border-black/[0.06] font-bold text-ink">
                <span>Total (Term 2)</span>
                <span className="font-display">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 size={34} className="text-success mx-auto mb-3" />
              <p className="text-[13.5px] font-semibold text-ink">
                Fees Fully Paid
              </p>
              <p className="text-[12.5px] text-slate-text/60 mt-1">
                No pending dues for this student.
              </p>
            </div>
          )}
        </Card>

        <Card className="lg:col-span-2">
          {!paid ? (
            <>
              <h3 className="font-display font-bold text-ink mb-4">
                Choose Payment Method
              </h3>
              <div className="grid sm:grid-cols-3 gap-3 mb-6">
                {methods.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setMethod(m.key)}
                    className={`text-left p-4 rounded-xl border transition-colors ${
                      method === m.key
                        ? "border-amber bg-amber/10"
                        : "border-black/10 hover:border-black/20"
                    }`}
                  >
                    <m.icon
                      size={20}
                      className={
                        method === m.key
                          ? "text-amber-dark"
                          : "text-slate-text/60"
                      }
                    />
                    <p className="font-semibold text-ink text-[13px] mt-2">
                      {m.label}
                    </p>
                    <p className="text-[11.5px] text-slate-text/60 mt-0.5">
                      {m.desc}
                    </p>
                  </button>
                ))}
              </div>

              {method === "upi" && (
                <div className="mb-6">
                  <label className="text-[12.5px] font-semibold text-ink mb-1.5 block">
                    UPI ID *
                  </label>
                  <Input
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              )}
              {method === "card" && (
                <div className="mb-6 space-y-3">
                  <div>
                    <label className="text-[12.5px] font-semibold text-ink mb-1.5 block">
                      Card Number *
                    </label>
                    <Input
                      placeholder="Card Number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[12.5px] font-semibold text-ink mb-1.5 block">
                        Expiry *
                      </label>
                      <Input
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[12.5px] font-semibold text-ink mb-1.5 block">
                        CVV *
                      </label>
                      <Input
                        placeholder="CVV"
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
              {method === "netbanking" && (
                <div className="mb-6">
                  <label className="text-[12.5px] font-semibold text-ink mb-1.5 block">
                    Select Bank
                  </label>
                  <Select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full"
                  >
                    {BANKS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </Select>
                  <p className="text-[11.5px] text-slate-text/60 mt-1.5">
                    You'll be redirected to {bank} Net Banking to complete the
                    payment.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 text-[12px] text-slate-text/60 mb-4">
                <ShieldCheck size={15} className="text-success" /> 256-bit
                encrypted, PCI-DSS compliant payment gateway
              </div>
              <Button
                variant="amber"
                className="w-full justify-center"
                disabled={
                  processing || student.feeStatus === "Paid" || !paymentReady()
                }
                onClick={handlePay}
              >
                {processing
                  ? "Processing..."
                  : `Pay ₹${total.toLocaleString("en-IN")}`}
              </Button>
              {student.feeStatus === "Paid" && (
                <p className="text-center text-[12px] text-success mt-3">
                  This student has already paid all fees.
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-10">
              <CheckCircle2 size={52} className="text-success mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-ink">
                Payment Successful
              </h3>
              <p className="text-[13px] text-slate-text mt-1.5">
                ₹{total.toLocaleString("en-IN")} paid via {method}
              </p>
              <div className="mt-3">
                <Pill tone="success">Receipt {receipt}</Pill>
              </div>
              <div className="flex justify-center gap-3 mt-6">
                <Button variant="outline" onClick={() => window.print()}>
                  <Download size={15} /> Download Receipt
                </Button>
                <Button variant="ghost" onClick={handleMakeAnother}>
                  Make Another Payment
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* ========== STUDENT PICKER MODAL ========== */}
      {pickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setPickerOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.06]">
              <div>
                <h3 className="font-display font-semibold text-ink text-[17px]">
                  Select Student
                </h3>
                <p className="text-[12.5px] text-slate-text/70 mt-0.5">
                  Choose the student to pay fees for.
                </p>
              </div>
              <button
                onClick={() => setPickerOpen(false)}
                className="p-2 rounded-lg hover:bg-paper text-slate-text"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-5 pt-4 flex gap-2">
              <div className="relative flex-1">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-text/40"
                />
                <Input
                  placeholder="Search by name or ID..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="min-w-[120px]"
              >
                {CLASS_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c === "All" ? "All Classes" : c}
                  </option>
                ))}
              </Select>
            </div>

            <div className="px-5 py-4 max-h-[60vh] overflow-y-auto">
              {filteredStudents.length === 0 ? (
                <div className="py-12 text-center">
                  <Search
                    size={30}
                    className="mx-auto text-slate-text/30 mb-2"
                  />
                  <p className="text-[13.5px] font-medium text-ink">
                    No students found
                  </p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-2">
                  {filteredStudents.slice(0, 30).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => selectStudent(s)}
                      className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-colors ${
                        student.id === s.id
                          ? "border-amber bg-amber/10"
                          : "border-black/[0.06] hover:border-black/20"
                      }`}
                    >
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="w-9 h-9 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-ink truncate">
                          {s.name}
                        </p>
                        <p className="text-[11.5px] text-slate-text/60">
                          {s.id} · Class {s.class}-{s.section}
                        </p>
                      </div>
                      <span className="shrink-0">
                        <Pill
                          tone={
                            s.feeStatus === "Paid"
                              ? "success"
                              : s.feeStatus === "Partially Paid"
                                ? "amber"
                                : "alert"
                          }
                        >
                          {s.feeStatus}
                        </Pill>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
