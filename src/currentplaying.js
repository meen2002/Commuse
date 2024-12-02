import React, { useEffect } from 'react';
import LogoutButton from './LogoutButton';

async function fetchCurrentlyPlaying() {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing?market=JP', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("spotifyToken")}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return { data, status: 200 };
    } else {
      return { status: response.status };
    }
  } catch (error) {
    console.error("Error fetching currently playing song:", error);
    return null;
  }
}

const SpotifyNowPlaying = (props) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchCurrentlyPlaying().then(response => {
        props.setStatus(response?.status);        
        if (response?.status === 200 && response.data?.item) {
          props.onSongUpdate({
            name: response.data.item.name,
            artists: response.data.item.artists.map(artist => artist.name).join(", "),
            albumCover: response.data.item.album.images[0].url,
          });
        } else if (response?.status === 204) {
          props.onSongUpdate(null); // 再生されていない場合はnullを設定
        } else if (response?.status === 401) {
          props.setSessionOut(true); 
        } 
          
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [props]);

   

  return null;
}

export default SpotifyNowPlaying;