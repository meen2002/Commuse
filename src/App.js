import './App.css';
import React, { useState, useEffect } from "react";
import SpotifyNowPlaying from "./currentplaying.js";
import MapComponent from './Googlemap.js';
import Loginbotton from './LoginButton.js';
import LogoutButton from './LogoutButton.js';
import LogoutHandler from './handleLogout.js';
import SpotifyProfile from './getProfile.js';
import FetchAllUserData from './Get.js'; // FetchAllUserDataをインポート
import GetUrl from './GetUrl';



const App = () => {
  const [userData, setUserData] = useState([]); // ユーザーデータを保存する状態
  const [url, setUrl] = useState(""); // URLを保存する状態
  const [isLogin, setIsLogin] = useState(() => {
    const savedLoginState = localStorage.getItem("isLogin");
    return savedLoginState === "true"; // ログイン状態の復元
  });
  const [sessionOut, setSessionOut] = useState(null); // セッションの状態を管理
  const [marker, setMarker] = useState({ lat: 33.658584, lng: 139.745433 }); // 現在地のマーカー


  const [song,setSong]=useState(null)
  const handleLogout = LogoutHandler({ setIsLogin });
  const handleSessionOut = (newSessionStatus) => setSessionOut(newSessionStatus);


  // userNameの取得
  const [userName, setUserName] = useState(""); // userName の状態を追加
  useEffect(() => {
    const fetchUserName = async () => {
      const tempToken = localStorage.getItem("spotify_token_temp");
      if (tempToken) {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${tempToken}` },
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
  
  return (
    <div>
      {!isLogin ? (
        <Loginbotton isLogin={isLogin} setIsLogin={setIsLogin} />
      ) : (
        <>
          {sessionOut === 401 ? (
            <div>Spotifyトークンの有効期限が切れました。再ログインしてください。</div>
          ) : (
            <SpotifyProfile />
          )}
          <LogoutButton onLogout={handleLogout} />
          <SpotifyNowPlaying
           onSongUpdate={setSong} // 曲情報を更新 // 曲情報の更新
            setStatus={handleSessionOut}
          />
          <MapComponent
            onMarkerUpdate={setMarker} // 現在地のマーカー更新
            userName={userName} 
            song={song}
            otherData={userData}
          />
          <GetUrl
            marker={marker}
            userName={userName}
            trackId="trackId" // 適切なtrackIdを渡す
            setUrl={setUrl} // URLをセット
          />

          {url && <FetchAllUserData url={url} setUserData={setUserData} />} {/* 取得したデータを保存 */}
        </>
      )}
    </div>
  );
};

export default App;
