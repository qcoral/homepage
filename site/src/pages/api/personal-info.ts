import type { APIRoute } from "astro";
import { getWeather } from "../../lib/weather";

const birthday = new Date("2006-01-11");
const age = Math.floor(
    (Date.now() - birthday.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
);
const location = "Toronto, Canada";
// const weather_api_url;

export const personalInfo = {
    age,
    location,
};

export const GET = (async ({ params, request }) => {
    const weather = await getWeather();
    return new Response(
        JSON.stringify({ ...personalInfo, weather_info: weather }),
        {
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
}) satisfies APIRoute;
