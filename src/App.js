import './App.css';
import React, { useState, useEffect } from "react";
import SpotifyNowPlaying from "./currentplaying.js";
import MapComponent from './Googlemap.js';
import Loginbotton from './LoginButton.js';
import LogoutButton from './LogoutButton.js';
import LogoutHandler from './handleLogout.js';
import SpotifyProfile from './getProfile.js';
import UserInfoFetcher from './Get.js';
import GetUrl from './GetUrl'; // GetUrl をインポート

const App = () => {
  const [isLogin, setIsLogin] = useState(() => {
    const savedLoginState = localStorage.getItem("isLogin");
    return savedLoginState === "true";
  });
  const [status, setStatus] = useState(null);
  const [song, setSong] = useState(null);
  const [sessionOut, setSessionOut] = useState(null);
  const [marker, setMarker] = useState({
    lat: 35.658584,
    lng: 139.745433,
  });
  const [trackId, setTrackId] = useState(null);
  const [userName, setUserName] = useState(""); // userName の状態を追加

  const handleLogout = LogoutHandler({ setIsLogin });

  const handleSessionOut = (newSessionStatus) => {
    setSessionOut(newSessionStatus);
  };

  const handleTrackIdUpdate = (newTrackId) => {
    setTrackId(newTrackId);
    console.log("Received Track ID in App:", newTrackId);
  };

  const handleMarkerUpdate = (newMarker) => {
    setMarker(newMarker);
    console.log("Updated marker in App:", newMarker);
  };

  useEffect(() => {
    // ログインした際に Spotify のユーザー名を取得するロジックを追加
    const fetchUserName = async () => {
      const tempToken = localStorage.getItem("spotify_token_temp");
      if (tempToken) {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserName(data.display_name); // ユーザー名を設定
        }
      }
    };

    if (isLogin) {
      fetchUserName();
    }
  }, [isLogin]);

  useState(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);

  return (
    <div>
      {!isLogin ? (
        <Loginbotton isLogin={isLogin} setIsLogin={setIsLogin} />
      ) : (
        <>
          {sessionOut === 401 ? (
            <p>Spotifyトークンの有効期限が切れました</p>
          ) : (
            <SpotifyProfile />
          )}
          <LogoutButton onLogout={handleLogout} />
          <SpotifyNowPlaying
            onSongUpdate={setSong} // 曲情報を更新
            setStatus={(status) => handleSessionOut(status)}
            onTrackIdUpdate={handleTrackIdUpdate}
          />
          <MapComponent onMarkerUpdate={handleMarkerUpdate} />
          <UserInfoFetcher />
          <GetUrl 
            marker={marker} 
            trackId={trackId} 
            userName={userName} // userName を GetUrl に渡す
          />
        </>
      )}
    </div>
  );
};

export default App;
