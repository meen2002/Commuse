import React, { useEffect } from "react";
import TrackInfo from "./SongInfoFromID";

async function fetchCurrentlyPlaying(myId) {
  try {
    const tempToken = localStorage.getItem(`spotifyToken_${myId}`);
    if (!tempToken) {
      console.error("トークンがありません。ログインしてください。");
      return null;
    }

    const response = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing?market=JP",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tempToken}`,
        },
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      return { data, status: 200 };
    } else {
      console.warn(`Spotify API応答ステータス: ${response.status}`);
      return { status: response.status };
    }
  } catch (error) {
    console.error("現在再生中の曲の取得中にエラーが発生しました:", error);
    return { status: 500 };
  }
}

const SpotifyNowPlaying = (props) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchCurrentlyPlaying(props.myId).then((response) => {
        if (response?.status === 200 && response.data?.item) {
          props.onSongUpdate({
            name: response.data.item.name,
            artists: response.data.item.artists
              .map((artist) => artist.name)
              .join(", "),
            albumCover: response.data.item.album.images[0].url,
          });
          props.onTrackIdUpdate(response.data.item.id);


        } else {
          props.onSongUpdate(null);
          props.onTrackIdUpdate(null);
        }

        props.setStatus(response?.status);


      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [props]);


  
};


export default SpotifyNowPlaying;


