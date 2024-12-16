import React, { useState, useEffect } from "react";
import SpotifyNowPlaying from "./currentplaying.js";
import CustomOverlayView from "./window.js";

const SongComponent = (props) => {
  const [song, setSong] = useState(null);
  const [userName, setUserName] = useState("Unknown User");

  useEffect(() => {
    // トークンからユーザーIDを取得し、一貫したキーでユーザーネームを取得
    const tempToken = localStorage.getItem("spotify_token_temp");
    if (!tempToken) {
      console.error("トークンが見つかりません。ログインしてください。");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const userResponse = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        });

        if (userResponse.status === 200) {
          const userData = await userResponse.json();
          const userId = userData.id;
          const userNameKey = `spotifyToken_${userId}_userName`;

          // ユーザーネームをローカルストレージから取得
          const storedUserName = localStorage.getItem(userNameKey);
          setUserName(storedUserName || "Unknown User");
        } else {
          console.error("ユーザープロファイルの取得に失敗しました。");
        }
      } catch (err) {
        console.error("エラーが発生しました:", err.message);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>

    
      {!song ? (
        <>
          <CustomOverlayView
            position={props.marker}
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
        props.marker && (
          <>
            <CustomOverlayView
              position={props.marker}
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
      {setSong && (
        <SpotifyNowPlaying
          onSongUpdate={setSong} // 曲情報を更新
          setStatus={(status) => console.log(status)}
        />
      )}
    </>
  );
};

export default SongComponent;
