import React, { useState, useEffect } from "react";
import CustomOverlayView from "./window.js";

const SongComponent = ( {song , userName , marker}) => {
  const[trackUrl, setTrackUrl]=useState(null);

  useEffect(() => {
    // songが存在し、trackIdがある場合、URLを作成
    if (song && song.TrackId) {
      const url = `https://open.spotify.com/track/${song.TrackId}`;
      setTrackUrl(url);
    }
  }, [song]);  // songが変更されるたびに実行

  console.log(userName,"da")

  return (
    <>
    
      {!song ? (
        <>
          <CustomOverlayView
            position={marker}
            content={
              <div className="user-container">
                <span className="user-name">{userName}</span>
                <div className="song-container">
                  <div
                    className="no-song-placeholder"
                    style={{
                      backgroundColor: "#ccc",
                      width: "50px",
                      height: "50px",
                      marginRight: "8px",
                    }}
                  ></div>
                  <div>
                    <h3>取得中だお</h3>
                  </div>
                </div>
              </div>
            }
          />
        </>
      ) : (
        marker && (
          <>
            <CustomOverlayView
              position={marker}
              content={
                <div className="user-container">
                  <span className="user-name">{userName}</span>
                  <div className="song-container">
                  <a href={trackUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      src={song.albumCover}
                      alt="Album cover"
                      className="album-cover"
                      width="50"
                    />
                  </a>
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
      )}

    </>
  );
};

export default SongComponent;