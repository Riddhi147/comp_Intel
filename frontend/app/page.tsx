import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      {/* Hero */}
      <div className="text-center mb-20">
        <div className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
          India-first compensation data
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 mb-6">
          Compare salaries by level,<br />not just job title
        </h1>
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto mb-10">
          L5 at Google vs SDE2 at Amazon? CompIntel normalizes levels across companies
          so you can make fair, structured comparisons.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/compare" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Compare Roles
          </Link>
          <Link href="/browse" className="border border-zinc-300 text-zinc-700 px-6 py-3 rounded-lg font-medium hover:bg-zinc-100 transition-colors">
            Browse Data
          </Link>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="text-2xl mb-3">⚖️</div>
          <h3 className="font-semibold text-zinc-900 mb-2">Level normalization</h3>
          <p className="text-sm text-zinc-500">
            We map L5, SDE2, IC4 to a common scale so comparisons are always fair.
          </p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="text-2xl mb-3">📊</div>
          <h3 className="font-semibold text-zinc-900 mb-2">Full TC breakdown</h3>
          <p className="text-sm text-zinc-500">
            See base, bonus, and equity separately — not just a single CTC number.
          </p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-xl p-6">
          <div className="text-2xl mb-3">📍</div>
          <h3 className="font-semibold text-zinc-900 mb-2">Location adjusted</h3>
          <p className="text-sm text-zinc-500">
            Cost-of-living adjustments so Mumbai and Hyderabad salaries are comparable.
          </p>
        </div>
      </div>

      {/* Quick compare widget */}
      <div className="bg-white border border-zinc-200 rounded-xl p-8 text-center">
        <h2 className="text-xl font-semibold text-zinc-900 mb-2">Ready to compare?</h2>
        <p className="text-zinc-500 text-sm mb-6">Pick two companies, a role, and a level — get a side-by-side breakdown instantly.</p>
        <Link href="/compare" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Start Comparing →
        </Link>
      </div>
    </div>
  );
}