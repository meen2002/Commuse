export const  authEndpoint = "https://accounts.spotify.com/authorize";


const redirectUri = "http://localhost:3000/";

const clientId = "e631bbfc47864268998147bf7d9ee775";

// 対応する範囲を決める
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      const parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial
    }, {});
}


// SpotifyのログインページのURL
export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
