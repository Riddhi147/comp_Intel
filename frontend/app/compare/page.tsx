"use client";

import { useState } from "react";
import { getCompare } from "@/lib/api";

const COMPANIES = ["amazon", "apple", "bytedance", "citadel", "coinbase", "google", "intel", "linkedin", "meta", "microsoft", "netflix", "oracle", "roblox", "salesforce", "snap", "uber"];
const ROLES = ["swe", "sre", "ds", "pm"];
const LEVELS = ["junior", "mid", "senior", "staff"];
const CITIES = ["Bengaluru", "Hyderabad", "London", "Remote", "San Mateo", "Singapore"];

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-zinc-100 last:border-0">
      <span className="text-sm text-zinc-500">{label}</span>
      <span className="text-sm font-medium text-zinc-900">{value}</span>
    </div>
  );
}

function BreakdownBar({ base, bonus, equity }: { base: number; bonus: number; equity: number }) {
  return (
    <div className="mt-4">
      <div className="flex rounded-full overflow-hidden h-3 mb-2">
        <div style={{ width: `${base}%` }} className="bg-blue-500" title={`Base ${base}%`} />
        <div style={{ width: `${bonus}%` }} className="bg-emerald-400" title={`Bonus ${bonus}%`} />
        <div style={{ width: `${equity}%` }} className="bg-violet-400" title={`Equity ${equity}%`} />
      </div>
      <div className="flex gap-4 text-xs text-zinc-500">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />Base {base}%</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />Bonus {bonus}%</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-violet-400 inline-block" />Equity {equity}%</span>
      </div>
    </div>
  );
}

function SideCard({ data, side }: { data: any; side: 1 | 2 }) {
  if (!data) return null;

  if (data.sampleSize === 0) {
    return (
      <div className="bg-white border border-zinc-200 rounded-xl p-6 flex-1">
        <h3 className="font-semibold text-zinc-900 mb-1">{data.company}</h3>
        <p className="text-sm text-zinc-400">Not enough data for this selection.</p>
      </div>
    );
  }

  return (
    <div className={`bg-white border-2 ${side === 1 ? "border-blue-200" : "border-violet-200"} rounded-xl p-6 flex-1`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-xl text-zinc-900">{data.company}</h3>
          <p className="text-sm text-zinc-500">{data.companyLevels.join(", ")} · {data.city}</p>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${side === 1 ? "bg-blue-50 text-blue-700" : "bg-violet-50 text-violet-700"}`}>
          {data.normalizedLevel}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-xs text-zinc-400 mb-1">Median Total Comp</p>
        <p className="text-3xl font-bold text-zinc-900">{formatINR(data.tc.median)}</p>
        <p className="text-xs text-zinc-400 mt-1">p25: {formatINR(data.tc.p25)} · p75: {formatINR(data.tc.p75)}</p>
      </div>

      <BreakdownBar
        base={data.breakdown.basePercent}
        bonus={data.breakdown.bonusPercent}
        equity={data.breakdown.equityPercent}
      />

      <div className="mt-5">
        <StatRow label="Avg Base" value={formatINR(data.components.avgBase)} />
        <StatRow label="Avg Bonus" value={formatINR(data.components.avgBonus)} />
        <StatRow label="Avg Equity/yr" value={formatINR(data.components.avgEquity)} />
        <StatRow label="Location-adjusted TC" value={formatINR(data.tc.adjustedMedianTC)} />
        <StatRow label="Sample size" value={`${data.sampleSize} reports`} />
      </div>
    </div>
  );
}

export default function ComparePage() {
  const [form, setForm] = useState({
    company1: "google", company2: "amazon",
    role: "swe", level: "mid",
    city1: "", city2: "",
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function setField(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setResult(null);
  }

  async function handleCompare() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const params: Record<string, string> = {
        company1: form.company1,
        company2: form.company2,
        role: form.role,
        level: form.level,
      };
      if (form.city1) params.city1 = form.city1;
      if (form.city2) params.city2 = form.city2;
      const data = await getCompare(params);
      setResult(data);
    } catch (e) {
      setError("Failed to fetch comparison. Try different filters.");
    } finally {
      setLoading(false);
    }
  }

  const winner =
    result?.side1?.tc?.median && result?.side2?.tc?.median
      ? result.side1.tc.median >= result.side2.tc.median ? result.side1.company : result.side2.company
      : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Compare Compensation</h1>
        <p className="text-zinc-500">Level-normalized, side-by-side TC breakdown across companies.</p>
      </div>

      {/* Controls */}
      <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-xs font-medium text-zinc-500 mb-1 block">Role</label>
            <select
              className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm"
              value={form.role}
              onChange={(e) => setField("role", e.target.value)}
            >
              {ROLES.map((r) => <option key={r} value={r}>{r.toUpperCase()}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-zinc-500 mb-1 block">Normalized Level</label>
            <select
              className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm"
              value={form.level}
              onChange={(e) => setField("level", e.target.value)}
            >
              {LEVELS.map((l) => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Side 1 */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Company A</p>
            <select
              className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm"
              value={form.company1}
              onChange={(e) => setField("company1", e.target.value)}
            >
              {COMPANIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
            <select
              className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm"
              value={form.city1}
              onChange={(e) => setField("city1", e.target.value)}
            >
              <option value="">Any city</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Side 2 */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-violet-600 uppercase tracking-wide">Company B</p>
            <select
              className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm"
              value={form.company2}
              onChange={(e) => setField("company2", e.target.value)}
            >
              {COMPANIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
            <select
              className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm"
              value={form.city2}
              onChange={(e) => setField("city2", e.target.value)}
            >
              <option value="">Any city</option>
              {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={handleCompare}
          disabled={loading || form.company1 === form.company2}
          className="mt-5 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Comparing..." : "Compare →"}
        </button>
        {form.company1 === form.company2 && (
          <p className="text-xs text-zinc-400 text-center mt-2">Select two different companies</p>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

      {/* Results */}
      {result && (
        <>
          {winner && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 mb-6 text-sm text-emerald-800 font-medium">
              🏆 {winner} offers a higher median TC at the {result.normalizedLevel} level
            </div>
          )}
          <div className="flex gap-5">
            <SideCard data={result.side1} side={1} />
            <SideCard data={result.side2} side={2} />
          </div>
        </>
      )}
    </div>
  );
}