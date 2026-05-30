import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-200 bg-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight text-zinc-900">
          Comp<span className="text-blue-600">Intel</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-zinc-600">
          <Link href="/browse" className="hover:text-zinc-900 transition-colors">Browse</Link>
          <Link href="/compare" className="hover:text-zinc-900 transition-colors">Compare</Link>
          <Link href="/insights" className="hover:text-zinc-900 transition-colors">Insights</Link>
          <Link href="/submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Submit Salary
          </Link>
        </div>
      </div>
    </nav>
  );
}