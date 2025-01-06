// src/infrastructures/spotify/fetchUserName.js
let MyName = "";
let MyImage = "";

export const fetchUserName = async (myId) => {
  const tempToken = localStorage.getItem(`spotifyToken_${myId}`);
  if (tempToken) {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${tempToken}` },
    });
    if (response.ok) {
      const data = await response.json();
      MyName = data.display_name;
      MyImage = data.images[0]?.url;
    }
  }
};

// 変数としてエクスポート
export { MyName, MyImage };
