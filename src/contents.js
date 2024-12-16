import React, { useState,useEffect } from "react";
import SpotifyNowPlaying from "./currentplaying.js";
import CustomOverlayView from "./window.js";
import { getTokenFromUrl } from './getToken.js';


const SongComponent =(props) => {
  const [song, setSong] = useState(null);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const storedUserName = localStorage.getItem(getTokenFromUrl().access_token+"userName")
    setUserName(storedUserName || "Unknown User"); // 値がなければ "Unknown User" を設定
  }, []);

  return (
    <>    
          {
  !song ? (

    <>
    <CustomOverlayView
        position={props.marker}
        content={
          <div className="user-container">
          <span className="user-name">{userName}</span>
          <div className="song-container">
      <div className="no-song-placeholder" style={{ backgroundColor: '#ccc', width: '50px', height: '50px', marginRight: '8px' }}></div>
      <div>
        <h3>取得中だお</h3>
      </div>
    </div>
    </div>
        }
      />
      </>
  ) : (
    props.marker && (
      <>
      <CustomOverlayView
        position={props.marker}
        content={
          <div className="user-container">
            <span className="user-name">{userName}</span>
          <div className="song-container">
            <img src={song.albumCover} alt="Album cover" className="album-cover" width="50" />
            

            <div className="song-text">
              <h3 className="song-title">
                <span>{`${song.name}`}</span>
                </h3>
                <p className="artist-name">
                  <span>{`${song.artists}`}</span>
                  </p>
            </div>
         </div>
         </div>
        }
      />
      </>
    )
  )
}
        {setSong &&(
        <SpotifyNowPlaying
          onSongUpdate={setSong} // 曲情報を更新
          setStatus={(status) => console.log(status)}
          />
          )}
    </>
  );
};

export default SongComponent;