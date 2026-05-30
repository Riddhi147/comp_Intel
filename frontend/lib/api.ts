const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getEntries(params: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/entries?${query}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch entries");
  return res.json();
}

export async function postEntry(data: Record<string, unknown>) {
  const res = await fetch(`${API_URL}/entries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to submit entry");
  }
  return res.json();
}

export async function getCompare(params: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/compare?${query}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch comparison");
  return res.json();
}

export async function getInsights(params: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/insights?${query}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch insights");
  return res.json();
}