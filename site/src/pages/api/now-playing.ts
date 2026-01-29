import type { APIRoute } from "astro";
import { getNowPlaying } from "../../lib/spotify";

export const GET: APIRoute = async () => {
    try {
        const nowPlaying = await getNowPlaying();
        return new Response(JSON.stringify(nowPlaying), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control":
                    "public, s-maxage=60, stale-while-revalidate=30",
            },
        });
    } catch (err: any) {
        console.error("/api/now-playing error:", err?.message || err);
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
};
