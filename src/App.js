import './App.css';
import React, { useState } from "react";
import SpotifyNowPlaying from "./currentplaying.js";
import MapComponent from './Googlemap.js';
import Loginbotton from './LoginButton.js';
import LogoutButton from './LogoutButton.js';
import LogoutHandler from './handleLogout.js';



const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [status, setStatus] = useState(null); // ステータスを追加
  const [song, setSong] = useState(null);
  const [sessionOut, setSessionOut] = useState(false);
  const handleLogout = LogoutHandler({ setIsLogin });

  return (
    
    <div>
      
      {localStorage.getItem("spotifyToken")}
      {!isLogin ? (
        <Loginbotton isLogin={isLogin} setIsLogin={setIsLogin} />
        
      ) : (
        <>
          {/* <LogoutButton isLogin={isLogin} setIsLogin={setIsLogin}/> */}
          {sessionOut && <p>Spotifyトークンの有効期限が切れました</p>}
          <LogoutButton onLogout={handleLogout} />
          
          <SpotifyNowPlaying 
          onSongUpdate={setSong}
          setStatus={setStatus}
          setSessionOut={setSessionOut} /> 
          
          <MapComponent/>
          
        </>
      )}
      
    </div>
  );
};

export default App;