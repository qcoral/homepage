import type { APIRoute } from "astro";

const birthday = new Date("2006-01-11");
const age = Math.floor(
    (Date.now() - birthday.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
);
const location = "Toronto, Canada";
const weather_api_key = import.meta.env.WEATHER_API_KEY;
const weather_api_url;

export const personalInfo = {
    age,
    location,
};

export const GET = (({ params, request }) => {
    return new Response(JSON.stringify(personalInfo));
}) satisfies APIRoute;
