import './App.css';
import React, { useState, useEffect } from "react";
import SpotifyNowPlaying from './infrastructures/SpotifyAPI/currentplaying.js';
import MapComponent from './Googlemap.js';
import Loginbotton from './LoginButton.js';

import LogoutHandler from './handleLogout.js';

import FetchAllUserData from './infrastructures/getOtherInfo/GetAllUserInfo.js';
import GetUrl from './infrastructures/getOtherInfo/SetAPIUrl.js';
import LoggedInScreen from './LoggedInScreen.js';

const App = () => {


  const[myId,setMyId]=useState(null);

 const handleUserId = (newUserId) => {
    setMyId(newUserId);
}

  const [userData, setUserData] = useState([]); // ユーザーデータを保存する状態
  const [url, setUrl] = useState(""); // URLを保存する状態
  
  const [isLogin, setIsLogin] = useState(false);



    


  const handleLogin = () => {
    // localStorage.setItem(`isLogin_${myId}`, "true"); // ログイン状態を保存
    setIsLogin(true); // ログイン状態をセット
  };


  const handleLogout = LogoutHandler({ setIsLogin ,myId});

  const [sessionOut, setSessionOut] = useState(null); // セッションの状態を管理
  const [marker, setMarker] = useState({ lat: 33.658584, lng: 139.745433 }); // 現在地のマーカー
  const [song, setSong] = useState(null);
  const [trackId, setTrackId] = useState(null);

  const handleTrackIdUpdate = (newTrackId) => {
    setTrackId(newTrackId);
    console.log("Received Track ID in App:", newTrackId);
  };

  const [userName, setUserName] = useState(""); // userName の状態を追加
  const [userImage, setUserImage] = useState(""); // 
  
  useEffect(() => {
    const fetchUserName = async () => {
      const tempToken = localStorage.getItem(`spotifyToken_${myId}`);
      if (tempToken) {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${tempToken}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUserName(data.display_name); // ユーザー名を設定
          setUserImage(data.images[0].url)
        }
      }
    };

    if (isLogin) {
      fetchUserName();
    }
  }, [isLogin]);
  console.log(myId)


  return (
    <div>
      {!isLogin ? (
        <Loginbotton isLogin={isLogin} setIsLogin={setIsLogin} onLogin={handleLogin} onUserId={handleUserId}/>
      ) : (
        <>
        
          <LoggedInScreen userName={userName} userImage={userImage} handleLogout={handleLogout} status={sessionOut}/>
  
          <SpotifyNowPlaying
            myId={myId}
            onSongUpdate={setSong} // 曲情報を更新
            setStatus={setSessionOut}
            onTrackIdUpdate={handleTrackIdUpdate}
          />

          <MapComponent
            onMarkerUpdate={setMarker} // 現在地のマーカー更新
            userName={userName}
            song={song}
            otherData={userData}
            myId={myId}
            userImage={userImage}
            status={sessionOut}
          />
          <GetUrl
            marker={marker}
            userName={userName}
            trackId={trackId}
            setUrl={setUrl}
            userImage={userImage}
          />

          {url && <FetchAllUserData url={url} setUserData={setUserData} />} {/* 取得したデータを保存 */}
        </>
      )}
    </div>
  );
};

export default App;