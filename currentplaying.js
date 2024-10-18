import React, { useEffect, useState } from 'react';

// 現在の曲情報を取得する関数
async function fetchCurrentlyPlaying() {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing?market=JP', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("spotifyToken")}`,
      },
    });

    console.log(response.status); // ステータスコードを確認

    if (response.status === 200) {
      const data = await response.json(); // レスポンスをJSONに変換
      return data;
    } else if (response.status === 401) {

      return { status: 401 }; // ステータスコードを返す
    }
    return null;

  } catch (error) {
    console.error("Error fetching currently playing song:", error);
    return null;
  }
}

const SpotifyNowPlaying = () => {
  const [song, setSong] = useState({});

  useEffect(() => {
    // 曲情報を定期的に取得する（例えば10秒ごと）
    const intervalId = setInterval(() => {
      fetchCurrentlyPlaying()
  .then(data => {
    console.log(data);
    
    if(data){
      setSong(data)
    }      
  });
      console.log(song)

    }, 10000); // 10秒ごとに更新


    return () => clearInterval(intervalId);
  }, [song]);


  return (
    <>
      {Object.keys(song).length === 0 || !song.item ? (
        <div>No song is currently playing.</div>
      ) : (
        <div>
          <h3>Now Playing: {song.item.name}</h3>
          <p>Artist: {song.item.artists.map(artist => artist.name).join(", ")}</p>
          <img src={song.item.album.images[0].url} alt="Album cover" width="100" />
        </div>
      )}
    </>
  );
};

export default SpotifyNowPlaying;