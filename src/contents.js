import React, { useState, useEffect } from "react";
import SpotifyNowPlaying from "./currentplaying.js";
import CustomOverlayView from "./window.js";

const SongComponent = ( {song , userName , marker}) => {

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
                    <img
                      src={song.albumCover}
                      alt="Album cover"
                      className="album-cover"
                      width="50"
                    />
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
