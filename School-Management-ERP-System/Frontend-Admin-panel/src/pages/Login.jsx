import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  ArrowRight,
  Lock,
  Mail,
  Phone,
  UserRound,
} from "lucide-react";
import { api } from "../lib/api";

const school = {
  name: "School Management ERP",
  shortName: "School ERP",
  tagline: "School operations, connected",
  affiliation: "School Administration",
  session: String(new Date().getFullYear()),
};

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("parent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (mode === "register") {
      const registration = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
        phone: phone.trim(),
      };

      if (!registration.name || !registration.email || !registration.role) {
        setError("Name, email and role are required");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === "register") {
        await api.register({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role,
          phone: phone.trim(),
        });
        setMode("login");
        setPassword("");
        setConfirmPassword("");
        setNotice("Account created successfully. Sign in to continue.");
      } else {
        const { data } = await api.login({ email, password });
        localStorage.setItem("erp_access_token", data.accessToken);
        localStorage.setItem("erp_refresh_token", data.refreshToken);
        localStorage.setItem("erp_user", JSON.stringify(data.user));
        navigate("/");
      }
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-paper">
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-ink text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=1400&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.18]"
        />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber flex items-center justify-center text-ink">
            <GraduationCap size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-display font-bold text-lg leading-tight">
              {school.name}
            </p>
            <p className="text-white/50 text-[12.5px]">{school.tagline}</p>
          </div>
        </div>
        <div className="relative z-10 max-w-md">
          <h2 className="font-display text-4xl font-bold leading-tight">
            One platform to run every part of the school day.
          </h2>
          <p className="text-white/60 mt-4 text-[14.5px] leading-relaxed">
            Attendance, admissions, fees, transport and communication — brought
            together for teachers, parents and administrators.
          </p>
          <div className="flex gap-6 mt-8 pt-8 border-t border-white/10">
            <div>
              <p className="font-display text-2xl font-bold text-amber">
                1,065
              </p>
              <p className="text-white/50 text-[12px] mt-0.5">Students</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-amber">96</p>
              <p className="text-white/50 text-[12px] mt-0.5">Faculty</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-amber">18</p>
              <p className="text-white/50 text-[12px] mt-0.5">Years</p>
            </div>
          </div>
        </div>
        <p className="relative z-10 text-white/35 text-[12px]">
          {school.affiliation}
        </p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-9 h-9 rounded-lg bg-ink flex items-center justify-center text-amber">
              <GraduationCap size={20} />
            </div>
            <p className="font-display font-bold text-ink">
              {school.shortName}
            </p>
          </div>
          <p className="text-amber-dark font-semibold text-[12.5px] mb-1.5">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </p>
          <h1 className="font-display text-2xl font-bold text-ink mb-1">
            {mode === "login" ? "Sign in to your ERP" : "Join your school ERP"}
          </h1>
          <p className="text-slate-text text-[13.5px] mb-8">
            {mode === "login"
              ? `Session ${school.session}`
              : "Register to access school operations."}
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "register" && (
              <>
                <div>
                  <label className="text-[12.5px] font-semibold text-ink mb-1.5 block">
                    Full name
                  </label>
                  <div className="relative">
                    <UserRound
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-text/40"
                    />
                    <input
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="w-full pl-10 pr-3.5 py-3 rounded-lg border border-black/10 text-[13.5px] outline-none focus:border-ink/40 bg-white"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12.5px] font-semibold text-ink mb-1.5 block">
                      Role
                    </label>
                    <select
                      value={role}
                      onChange={(event) => setRole(event.target.value)}
                      className="w-full px-3.5 py-3 rounded-lg border border-black/10 text-[13.5px] outline-none focus:border-ink/40 bg-white"
                    >
                      <option value="parent">Parent</option>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[12.5px] font-semibold text-ink mb-1.5 block">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-text/40"
                      />
                      <input
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        className="w-full pl-10 pr-3.5 py-3 rounded-lg border border-black/10 text-[13.5px] outline-none focus:border-ink/40 bg-white"
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div>
              <label className="text-[12.5px] font-semibold text-ink mb-1.5 block">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-text/40"
                />
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3.5 py-3 rounded-lg border border-black/10 text-[13.5px] outline-none focus:border-ink/40 bg-white"
                />
              </div>
            </div>
            <div>
              <label className="text-[12.5px] font-semibold text-ink mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-text/40"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-3.5 py-3 rounded-lg border border-black/10 text-[13.5px] outline-none focus:border-ink/40 bg-white"
                />
              </div>
            </div>
            {mode === "register" ? (
              <div>
                <label className="text-[12.5px] font-semibold text-ink mb-1.5 block">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-text/40"
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                    minLength={6}
                    className="w-full pl-10 pr-3.5 py-3 rounded-lg border border-black/10 text-[13.5px] outline-none focus:border-ink/40 bg-white"
                    placeholder="Repeat your password"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between text-[12.5px]">
                <label className="flex items-center gap-2 text-slate-text">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="accent-amber"
                  />{" "}
                  Keep me signed in
                </label>
                <a href="#" className="text-info font-medium">
                  Forgot password?
                </a>
              </div>
            )}
            {notice && (
              <p className="text-success text-[12.5px]" role="status">
                {notice}
              </p>
            )}
            {error && (
              <p className="text-alert text-[12.5px]" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber text-ink font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-amber-dark transition-colors"
            >
              {loading
                ? mode === "login"
                  ? "Signing in..."
                  : "Creating account..."
                : mode === "login"
                  ? "Sign in"
                  : "Create account"}{" "}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>
          <p className="text-center text-[12px] text-slate-text/60 mt-8">
            {mode === "login"
              ? "New to the school ERP?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
                setNotice("");
              }}
              className="font-semibold text-info hover:underline"
            >
              {mode === "login" ? "Create account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
