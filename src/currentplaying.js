import React, { useEffect, useState } from 'react';

// 現在の曲情報を取得する関数
async function fetchCurrentlyPlaying(token) {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.status === 204 || response.status === 401) { 
      // 204: 再生中の曲がない、401: トークンが無効
      return console.log(response.status);
    }
    

    return response.body;
  } catch (error) {
    console.error("Error fetching currently playing song:", error);
    return null;
  }
}

const SpotifyNowPlaying = ({ token }) => {
  const [song, setSong] = useState(null);

  useEffect(() => {
    // 曲情報を定期的に取得する（例えば10秒ごと）
    const intervalId = setInterval(() => {
      fetchCurrentlyPlaying(token).then((data) => {
        if (data) {
          setSong(data);
        }
      });
    }, 10000); // 10秒ごとに更新

    

    // クリーンアップ
    return () => clearInterval(intervalId);
  }, [token]);

  if (!song) {
    return <div>No song is currently playing.</div>;
  }

  return (
    //ちゃんとデータが取れたらコメントアウトを解除
    <p>再生中</p>
    
    // <div>
    //   <h3>Now Playing: {song.item.name}</h3>
    //   <p>Artist: {song.item.artists.map(artist => artist.name).join(", ")}</p>
    //   <img src={song.item.album.images[0].url} alt="Album cover" width="100" />
    // </div>
  );
};

export default SpotifyNowPlaying;
