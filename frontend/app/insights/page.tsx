"use client";

import { useEffect, useState } from "react";
import { getInsights } from "@/lib/api";

const COMPANIES = ["", "google", "amazon", "flipkart", "swiggy", "zepto"];
const ROLES = ["", "swe", "sre", "ds", "pm"];

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-5">
      <p className="text-xs text-zinc-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-zinc-900">{value}</p>
      {sub && <p className="text-xs text-zinc-400 mt-1">{sub}</p>}
    </div>
  );
}

function RangeBar({ p25, median, p75, max }: { p25: number; median: number; p75: number; max: number }) {
  const pct = (v: number) => Math.round((v / max) * 100);
  return (
    <div className="mt-2">
      <div className="relative h-2 bg-zinc-100 rounded-full">
        <div
          className="absolute h-2 bg-blue-200 rounded-full"
          style={{ left: `${pct(p25)}%`, width: `${pct(p75) - pct(p25)}%` }}
        />
        <div
          className="absolute w-3 h-3 bg-blue-600 rounded-full -top-0.5"
          style={{ left: `${pct(median)}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-zinc-400 mt-1">
        <span>p25: {formatINR(p25)}</span>
        <span className="text-blue-600 font-medium">median: {formatINR(median)}</span>
        <span>p75: {formatINR(p75)}</span>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ company: "", role: "" });

  useEffect(() => {
    fetchInsights();
  }, [filters]);

  async function fetchInsights() {
    setLoading(true);
    setError("");
    try {
      const params: Record<string, string> = {};
      if (filters.company) params.company = filters.company;
      if (filters.role) params.role = filters.role;
      const result = await getInsights(params);
      setData(result);
    } catch {
      setError("Failed to load insights.");
    } finally {
      setLoading(false);
    }
  }

  const maxTC = data?.byCompany
    ? Math.max(...data.byCompany.map((c: any) => c.p75 ?? 0))
    : 0;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Insights</h1>
        <p className="text-zinc-500">Aggregate compensation trends across companies, roles, and cities.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-8">
        <select
          className="border border-zinc-200 rounded-lg px-3 py-2 text-sm bg-white"
          value={filters.company}
          onChange={(e) => setFilters((p) => ({ ...p, company: e.target.value }))}
        >
          {COMPANIES.map((c) => (
            <option key={c} value={c}>{c ? c.charAt(0).toUpperCase() + c.slice(1) : "All Companies"}</option>
          ))}
        </select>
        <select
          className="border border-zinc-200 rounded-lg px-3 py-2 text-sm bg-white"
          value={filters.role}
          onChange={(e) => setFilters((p) => ({ ...p, role: e.target.value }))}
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>{r ? r.toUpperCase() : "All Roles"}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-20 text-zinc-400">Loading insights...</div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">{error}</div>
      ) : data && (
        <>
          {/* Overall stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <StatCard label="Sample Size" value={`${data.sampleSize}`} sub="anonymous reports" />
            <StatCard label="Median TC" value={formatINR(data.overall.median)} />
            <StatCard label="p25 TC" value={formatINR(data.overall.p25)} sub="bottom quartile" />
            <StatCard label="p75 TC" value={formatINR(data.overall.p75)} sub="top quartile" />
          </div>

          {/* By company */}
          {data.byCompany?.length > 0 && (
            <div className="bg-white border border-zinc-200 rounded-xl p-6 mb-6">
              <h2 className="font-semibold text-zinc-900 mb-5">By Company</h2>
              <div className="space-y-5">
                {data.byCompany
                  .sort((a: any, b: any) => b.median - a.median)
                  .map((c: any) => (
                    <div key={c.key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-zinc-900">{c.name}</span>
                        <span className="text-sm text-zinc-500">{c.sampleSize} reports</span>
                      </div>
                      <RangeBar p25={c.p25} median={c.median} p75={c.p75} max={maxTC} />
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* By level + by city side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.byLevel?.length > 0 && (
              <div className="bg-white border border-zinc-200 rounded-xl p-6">
                <h2 className="font-semibold text-zinc-900 mb-4">By Level</h2>
                <div className="space-y-3">
                  {data.byLevel
                    .sort((a: any, b: any) => b.median - a.median)
                    .map((l: any) => (
                      <div key={l.key} className="flex justify-between items-center">
                        <span className="text-sm text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded font-mono">{l.key}</span>
                        <div className="text-right">
                          <p className="text-sm font-medium text-zinc-900">{formatINR(l.median)}</p>
                          <p className="text-xs text-zinc-400">{l.sampleSize} reports</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {data.byCity?.length > 0 && (
              <div className="bg-white border border-zinc-200 rounded-xl p-6">
                <h2 className="font-semibold text-zinc-900 mb-4">By City</h2>
                <div className="space-y-3">
                  {data.byCity
                    .sort((a: any, b: any) => b.median - a.median)
                    .map((c: any) => (
                      <div key={c.key} className="flex justify-between items-center">
                        <span className="text-sm text-zinc-600">{c.key}</span>
                        <div className="text-right">
                          <p className="text-sm font-medium text-zinc-900">{formatINR(c.median)}</p>
                          <p className="text-xs text-zinc-400">{c.sampleSize} reports</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}