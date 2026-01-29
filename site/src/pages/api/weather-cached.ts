import type { APIRoute } from "astro";
import { getWeather } from "../../lib/weather";

export const prerender = false;

let cachedWeather: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5min

export const GET: APIRoute = async () => {
    const now = Date.now();

    if (!cachedWeather || now - lastFetchTime > CACHE_DURATION) {
        try {
            cachedWeather = await getWeather();
            lastFetchTime = now;
        } catch (err: any) {
            console.error("/api/weather-cached error:", err?.message || err);
            return new Response(
                JSON.stringify({
                    ok: false,
                    error: err?.message || "Unknown error",
                }),
                {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json",
                        "Cache-Control": "no-store",
                    },
                },
            );
        }
    }

    return new Response(JSON.stringify(cachedWeather), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
        },
    });
};
