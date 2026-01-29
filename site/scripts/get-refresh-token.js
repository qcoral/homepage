/**
 * Run this script once to get your Spotify refresh token.
 *
 * 1. First, go to your Spotify Developer Dashboard:
 *    https://developer.spotify.com/dashboard
 *
 * 2. Select your app and add this redirect URI in Settings:
 *    https://d2088d9bc2ad.ngrok-free.app/callback
 *
 * 3. Run: node scripts/get-refresh-token.js
 *
 * 4. Open the URL it prints in your browser
 *
 * 5. After authorizing, you'll be redirected to a URL with a "code" parameter.
 *    Copy that code and paste it when prompted.
 *
 * 6. The script will print your refresh token. Add it to your .env file.
 */

import readline from "readline";

const client_id = "0f45bc920f4945b0844b40a824caf0e8";
const client_secret = "b6f9f5ffae694d91b88f730ebaa4a049"; // Remember to regenerate this!
const redirect_uri = "https://d2088d9bc2ad.ngrok-free.app/callback";
const scope = "user-read-currently-playing user-read-playback-state";

const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
    response_type: "code",
    client_id,
    scope,
    redirect_uri,
})}`;

console.log("\n🎵 Spotify Refresh Token Generator\n");
console.log("Step 1: Open this URL in your browser:\n");
console.log(authUrl);
console.log("\nStep 2: After authorizing, you'll be redirected to a URL like:");
console.log("https://d2088d9bc2ad.ngrok-free.app/callback?code=AQBx...\n");
console.log(
    'Step 3: Copy the "code" value from that URL and paste it below:\n',
);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Paste the code here: ", async (code) => {
    try {
        const basic = Buffer.from(`${client_id}:${client_secret}`).toString(
            "base64",
        );

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                Authorization: `Basic ${basic}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code,
                redirect_uri,
            }),
        });

        const data = await response.json();

        if (data.error) {
            console.error("\n❌ Error:", data.error_description);
        } else {
            console.log("\n✅ Success! Here's your refresh token:\n");
            console.log(data.refresh_token);
            console.log(
                "\nAdd this to your .env file as SPOTIFY_REFRESH_TOKEN",
            );
            console.log(
                "\n⚠️  Remember to regenerate your client_secret since it was shared publicly!",
            );
        }
    } catch (error) {
        console.error("\n❌ Error:", error);
    }

    rl.close();
});
