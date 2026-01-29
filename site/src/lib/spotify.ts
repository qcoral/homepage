const client_id =
    process.env.SPOTIFY_CLIENT_ID ?? import.meta.env.SPOTIFY_CLIENT_ID;
const client_secret =
    process.env.SPOTIFY_CLIENT_SECRET ?? import.meta.env.SPOTIFY_CLIENT_SECRET;
const refresh_token =
    process.env.SPOTIFY_REFRESH_TOKEN ?? import.meta.env.SPOTIFY_REFRESH_TOKEN;

if (!client_id || !client_secret || !refresh_token) {
    throw new Error(
        "Missing Spotify env vars (SPOTIFY_CLIENT_ID/SECRET/REFRESH_TOKEN)",
    );
}

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
    "https://api.spotify.com/v1/me/player/currently-playing";

async function readBodySafe(response: Response): Promise<any> {
    const contentType = response.headers.get("content-type") || "";
    try {
        if (contentType.includes("application/json")) {
            return await response.json();
        }
        return await response.text();
    } catch {
        return null;
    }
}

async function getAccessToken() {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: {
            Authorization: `Basic ${basic}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
        }),
    });

    if (!response.ok) {
        const details = await readBodySafe(response);
        const message =
            details?.error_description ||
            details?.error ||
            (typeof details === "string" && details) ||
            `HTTP ${response.status}`;
        console.error("Spotify token error:", {
            status: response.status,
            statusText: response.statusText,
            body: details,
        });
        throw new Error(`Spotify token error: ${message}`);
    }

    console.log("Fetched new Spotify access token");
    const data = await response.json();
    // console.log(data);
    return data;
}

export interface NowPlayingData {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    album?: string;
    albumImageUrl?: string;
    songUrl?: string;
}

export async function getNowPlaying(): Promise<NowPlayingData> {
    const { access_token } = await getAccessToken();

    console.log("Fetching now playing track from Spotify");

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });

    // 204 = no content (not playing or private session)
    if (response.status === 204) {
        return { isPlaying: false };
    }

    if (response.status >= 400) {
        const details = await readBodySafe(response);
        console.warn("Spotify now playing error:", {
            status: response.status,
            statusText: response.statusText,
            body: details,
        });
        return { isPlaying: false };
    }

    const song = await response.json();
    // console.log(song);

    if (!song.item) {
        return { isPlaying: false };
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists
        .map((a: { name: string }) => a.name)
        .join(", ");
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0]?.url;
    const songUrl = song.item.external_urls.spotify;

    const now_playing_data = {
        isPlaying,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl,
    };

    // console.log(now_playing_data)

    return now_playing_data;
}
