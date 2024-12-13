import './App.css';
import React, { useState } from "react";
import SpotifyNowPlaying from "./currentplaying.js";
import MapComponent from './Googlemap.js';
import Loginbotton from './LoginButton.js';
import LogoutButton from './LogoutButton.js';
import LogoutHandler from './handleLogout.js';
import SpotifyProfile from './getProfile.js';
import { getTokenFromUrl } from './getToken.js';



const App = () => {

  const [isLogin, setIsLogin] = useState(false);
  const [status, setStatus] = useState(null); // ステータスを追加
  const [song, setSong] = useState(null);
  const [sessionOut, setSessionOut] = useState(null);
  const handleLogout = LogoutHandler({ setIsLogin });
  const [profileImage, setProfileImage] = useState(null);

  const handleSessionOut = (newSessionStatus)=>{
    setSessionOut(newSessionStatus)
    // console.log(sessionOut)
  }


  

  // const token=localStorage.getItem((getTokenFromUrl().access_token));





  return (   
    <div>
      
      {/* {localStorage.getItem((getTokenFromUrl().access_token))} */}
      {!isLogin ? (
        <Loginbotton isLogin={isLogin} setIsLogin={setIsLogin} />
        
        
      ) : (
        <>

{sessionOut ===401 && 
<p>Spotifyトークンの有効期限が切れました</p>
}

{sessionOut !== 401 && <SpotifyProfile />}


          <LogoutButton onLogout={handleLogout} />

          <SpotifyNowPlaying
          onSongUpdate={setSong} // 曲情報を更新
          setStatus={(status) => handleSessionOut(status)}
          />

          <MapComponent/>




          
        </>
      )}
      
    </div>
  );
};

export default App;