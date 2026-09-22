export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Tirana coordinates
const LAT = 41.3275;
const LON = 19.8189;

export async function GET() {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&timezone=Europe%2FTirane`;
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const cur = data?.current ?? {};
    return Response.json(
      {
        temp: Math.round(cur.temperature_2m),
        code: cur.weather_code ?? 0,
      },
      { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200" } },
    );
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "failed" },
      { status: 200 },
    );
  }
}
