// lib/db.ts
export async function getAllClones() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DATA_BACKEND_URL}/clone/all`,
    { cache: "no-store" } // fresh data every time
  );

  if (!response.ok) throw new Error("Failed to fetch clones");
  const data = await response.json();
  return data.data;
}
