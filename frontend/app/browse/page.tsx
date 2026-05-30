"use client";

import { useEffect, useState } from "react";
import { getEntries } from "@/lib/api";

const COMPANIES = ["google", "amazon", "flipkart", "swiggy", "zepto"];
const ROLES = ["swe", "sre", "ds", "pm"];
const LEVELS = ["junior", "mid", "senior", "staff"];
const CITIES = ["Bangalore", "Hyderabad", "Mumbai", "Delhi"];

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function BrowsePage() {
  const [entries, setEntries] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    company: "",
    role: "",
    level: "",
    city: "",
    minYoe: "",
    maxYoe: "",
    page: "1",
  });

  useEffect(() => {
    fetchEntries();
  }, [filters]);

  async function fetchEntries() {
    setLoading(true);
    setError("");
    try {
      const params: Record<string, string> = { page: filters.page, limit: "15" };
      if (filters.company) params.company = filters.company;
      if (filters.role) params.role = filters.role;
      if (filters.level) params.level = filters.level;
      if (filters.city) params.city = filters.city;
      if (filters.minYoe) params.minYoe = filters.minYoe;
      if (filters.maxYoe) params.maxYoe = filters.maxYoe;

      const data = await getEntries(params);
      setEntries(data.data);
      setMeta(data.meta);
    } catch (e) {
      setError("Failed to load entries.");
    } finally {
      setLoading(false);
    }
  }

  function setFilter(key: string, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value, page: "1" }));
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Browse Salaries</h1>
        <p className="text-zinc-500">Filter by company, role, level, or location.</p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-zinc-200 rounded-xl p-5 mb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <select
          className="border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-700 bg-white"
          value={filters.company}
          onChange={(e) => setFilter("company", e.target.value)}
        >
          <option value="">All Companies</option>
          {COMPANIES.map((c) => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>

        <select
          className="border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-700 bg-white"
          value={filters.role}
          onChange={(e) => setFilter("role", e.target.value)}
        >
          <option value="">All Roles</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r.toUpperCase()}</option>
          ))}
        </select>

        <select
          className="border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-700 bg-white"
          value={filters.level}
          onChange={(e) => setFilter("level", e.target.value)}
        >
          <option value="">All Levels</option>
          {LEVELS.map((l) => (
            <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
          ))}
        </select>

        <select
          className="border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-700 bg-white"
          value={filters.city}
          onChange={(e) => setFilter("city", e.target.value)}
        >
          <option value="">All Cities</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min YoE"
          className="border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-700"
          value={filters.minYoe}
          onChange={(e) => setFilter("minYoe", e.target.value)}
        />

        <input
          type="number"
          placeholder="Max YoE"
          className="border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-700"
          value={filters.maxYoe}
          onChange={(e) => setFilter("maxYoe", e.target.value)}
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-20 text-zinc-400">Loading...</div>
      ) : error ? (
        <div className="text-center py-20 text-red-500">{error}</div>
      ) : entries.length === 0 ? (
        <div className="text-center py-20 text-zinc-400">No entries found for these filters.</div>
      ) : (
        <>
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-zinc-500">Company</th>
                  <th className="text-left px-4 py-3 font-medium text-zinc-500">Role</th>
                  <th className="text-left px-4 py-3 font-medium text-zinc-500">Level</th>
                  <th className="text-left px-4 py-3 font-medium text-zinc-500">City</th>
                  <th className="text-left px-4 py-3 font-medium text-zinc-500">YoE</th>
                  <th className="text-right px-4 py-3 font-medium text-zinc-500">Base</th>
                  <th className="text-right px-4 py-3 font-medium text-zinc-500">Bonus</th>
                  <th className="text-right px-4 py-3 font-medium text-zinc-500">Equity/yr</th>
                  <th className="text-right px-4 py-3 font-medium text-zinc-500">Total TC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {entries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-zinc-900">{entry.company.name}</td>
                    <td className="px-4 py-3 text-zinc-600">{entry.role.name}</td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">
                        {entry.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-600">{entry.location.city}</td>
                    <td className="px-4 py-3 text-zinc-600">{entry.yearsOfExp}y</td>
                    <td className="px-4 py-3 text-right text-zinc-700">{formatINR(entry.baseSalary)}</td>
                    <td className="px-4 py-3 text-right text-zinc-700">{formatINR(entry.annualBonus)}</td>
                    <td className="px-4 py-3 text-right text-zinc-700">{formatINR(entry.equityAnnual)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-zinc-900">{formatINR(entry.totalComp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-zinc-500">
                Showing {entries.length} of {meta.total} entries
              </p>
              <div className="flex gap-2">
                <button
                  disabled={filters.page === "1"}
                  onClick={() => setFilter("page", String(parseInt(filters.page) - 1))}
                  className="px-4 py-2 text-sm border border-zinc-200 rounded-lg disabled:opacity-40 hover:bg-zinc-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-zinc-600">
                  Page {filters.page} of {meta.totalPages}
                </span>
                <button
                  disabled={parseInt(filters.page) >= meta.totalPages}
                  onClick={() => setFilter("page", String(parseInt(filters.page) + 1))}
                  className="px-4 py-2 text-sm border border-zinc-200 rounded-lg disabled:opacity-40 hover:bg-zinc-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}