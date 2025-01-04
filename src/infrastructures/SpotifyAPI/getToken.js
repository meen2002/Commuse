

// Spotify認証用エンドポイントと設定
export const authConfig = {
  endpoint: "https://accounts.spotify.com/authorize",
  clientId: "e631bbfc47864268998147bf7d9ee775",
  redirectUri: "http://localhost:3000" ,
  scopes: [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-read-private",
  ],
};

// URLからアクセストークンを取得
export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      const parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

// Spotify認証ページのURLを生成
export const accessUrl = `${authConfig.endpoint}?client_id=${authConfig.clientId}&redirect_uri=${authConfig.redirectUri}&scope=${authConfig.scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
