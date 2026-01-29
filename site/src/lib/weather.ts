const WEATHER_API_ENDPOINT =
    "https://api.open-meteo.com/v1/forecast?latitude=43.7064&longitude=-79.3986&current=is_day,temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,snowfall&timezone=America%2FNew_York&forecast_days=1";

export async function getWeather() {
    console.log(`Fetching weather data`);

    const response = await fetch(`${WEATHER_API_ENDPOINT}`);
    const data = await response.json();
    console.log("Weather data fetched:", data);
    return data;
}
