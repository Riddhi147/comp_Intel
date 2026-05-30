"use client";

import { useState } from "react";
import { postEntry } from "@/lib/api";

 
const ROLES = ["swe", "sre", "ds", "pm"];
const CITIES = ["Bengaluru", "Hyderabad", "London", "Remote", "San Mateo", "Singapore"];

const COMPANIES = ["amazon", "apple", "bytedance", "citadel", "coinbase", "google", "intel", "linkedin", "meta", "microsoft", "netflix", "oracle", "roblox", "salesforce", "snap", "uber"];

const LEVEL_MAP: Record<string, string[]> = {
  amazon: ["L4", "L5", "L6", "L7"],
  apple: ["ICT2", "ICT3", "ICT4", "ICT5"],
  bytedance: ["L3", "L4", "L5"],
  citadel: ["New Grad", "Mid", "Senior", "Staff"],
  coinbase: ["IC3", "IC4", "IC5"],
  google: ["L3", "L4", "L5", "L6"],
  intel: ["Grade 5", "Grade 7", "Grade 8"],
  linkedin: ["IC2", "IC3", "IC4", "IC5"],
  meta: ["E3", "E4", "E5", "E6"],
  microsoft: ["59-60", "61-62", "63-64", "65-67"],
  netflix: ["Mid", "Senior", "Staff"],
  oracle: ["IC2", "IC3", "IC4", "IC5"],
  roblox: ["IC3", "IC4", "IC5"],
  salesforce: ["MTS", "SMTS", "LMTS"],
  snap: ["L3", "L4", "L5"],
  uber: ["L3", "L4", "L5", "L6"],
};

export default function SubmitPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    companySlug: "google",
    normalizedRole: "swe",
    city: "Bangalore",
    level: "L4",
    yearsOfExp: "",
    baseSalary: "",
    annualBonus: "0",
    equityAnnual: "0",
  });

  function setField(key: string, value: string) {
    setForm((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === "companySlug") updated.level = LEVEL_MAP[value][0];
      return updated;
    });
  }

  const totalComp =
    (parseInt(form.baseSalary) || 0) +
    (parseInt(form.annualBonus) || 0) +
    (parseInt(form.equityAnnual) || 0);

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      await postEntry({
        companySlug: form.companySlug,
        normalizedRole: form.normalizedRole,
        city: form.city,
        level: form.level,
        yearsOfExp: parseInt(form.yearsOfExp),
        baseSalary: parseInt(form.baseSalary),
        annualBonus: parseInt(form.annualBonus) || 0,
        equityAnnual: parseInt(form.equityAnnual) || 0,
      });
      setSubmitted(true);
    } catch (e: any) {
      setError(e.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-zinc-900 mb-2">Thank you!</h2>
        <p className="text-zinc-500 mb-8">Your salary data helps the community make better decisions.</p>
        <a href="/browse" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Browse All Salaries
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Submit Your Salary</h1>
        <p className="text-zinc-500 text-sm">Anonymous. Helps engineers make informed decisions.</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center ${step >= s ? "bg-blue-600 text-white" : "bg-zinc-100 text-zinc-400"}`}>
              {s}
            </div>
            {s < 3 && <div className={`h-0.5 w-10 ${step > s ? "bg-blue-600" : "bg-zinc-200"}`} />}
          </div>
        ))}
        <span className="text-xs text-zinc-400 ml-2">
          {step === 1 ? "Role & Company" : step === 2 ? "Compensation" : "Review"}
        </span>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl p-6">
        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block">Company</label>
              <select className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm" value={form.companySlug} onChange={(e) => setField("companySlug", e.target.value)}>
                {COMPANIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block">Level at this company</label>
              <select className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm" value={form.level} onChange={(e) => setField("level", e.target.value)}>
                {LEVEL_MAP[form.companySlug].map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block">Role</label>
              <select className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm" value={form.normalizedRole} onChange={(e) => setField("normalizedRole", e.target.value)}>
                {ROLES.map((r) => <option key={r} value={r}>{r.toUpperCase()}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block">City</label>
              <select className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm" value={form.city} onChange={(e) => setField("city", e.target.value)}>
                {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block">Years of Experience</label>
              <input type="number" min="0" max="40" placeholder="e.g. 3" className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm" value={form.yearsOfExp} onChange={(e) => setField("yearsOfExp", e.target.value)} />
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!form.yearsOfExp}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              Next →
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block">Base Salary (INR/year)</label>
              <input type="number" placeholder="e.g. 2500000" className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm" value={form.baseSalary} onChange={(e) => setField("baseSalary", e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block">Annual Bonus (INR)</label>
              <input type="number" placeholder="e.g. 300000" className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm" value={form.annualBonus} onChange={(e) => setField("annualBonus", e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-medium text-zinc-500 mb-1 block">Equity per year (INR, annualized)</label>
              <input type="number" placeholder="e.g. 600000" className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm" value={form.equityAnnual} onChange={(e) => setField("equityAnnual", e.target.value)} />
            </div>
            {form.baseSalary && (
              <div className="bg-zinc-50 rounded-lg px-4 py-3 text-sm">
                <span className="text-zinc-500">Calculated Total TC: </span>
                <span className="font-semibold text-zinc-900">
                  {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(totalComp)}
                </span>
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 border border-zinc-200 text-zinc-700 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-50">
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!form.baseSalary}
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                Review →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Review */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-zinc-900">Review your submission</h3>
            <div className="space-y-2 text-sm">
              {[
                ["Company", form.companySlug.charAt(0).toUpperCase() + form.companySlug.slice(1)],
                ["Level", form.level],
                ["Role", form.normalizedRole.toUpperCase()],
                ["City", form.city],
                ["Years of Experience", `${form.yearsOfExp} years`],
                ["Base Salary", `₹${parseInt(form.baseSalary).toLocaleString("en-IN")}`],
                ["Annual Bonus", `₹${parseInt(form.annualBonus || "0").toLocaleString("en-IN")}`],
                ["Equity/yr", `₹${parseInt(form.equityAnnual || "0").toLocaleString("en-IN")}`],
                ["Total TC", `₹${totalComp.toLocaleString("en-IN")}`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-zinc-100 pb-2">
                  <span className="text-zinc-500">{label}</span>
                  <span className="font-medium text-zinc-900">{value}</span>
                </div>
              ))}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 border border-zinc-200 text-zinc-700 py-2.5 rounded-lg text-sm font-medium hover:bg-zinc-50">
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? "Submitting..." : "Submit Anonymously"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}