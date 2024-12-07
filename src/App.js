import './App.css';
import React, { useState } from "react";
import SpotifyNowPlaying from "./currentplaying.js";
import MapComponent from './Googlemap.js';
import Loginbotton from './LoginButton.js';
import LogoutButton from './LogoutButton.js';
import LogoutHandler from './handleLogout.js';
import SpotifyProfile from './getProfile.js';



const App = () => {

  const [isLogin, setIsLogin] = useState(false);
  const [status, setStatus] = useState(null); // ステータスを追加
  const [song, setSong] = useState(null);
  const [sessionOut, setSessionOut] = useState(false);
  const handleLogout = LogoutHandler({ setIsLogin });
  const [profileImage, setProfileImage] = useState(null);

  // const handleSessionOut = (newSessionStatus)=>{
  //   setSessionOut(newSessionStatus)
  // }



  const handleProfileImage = (images) => {
    setProfileImage(images); // 画像を親の状態にセット
  // const handleProfileImage = (images) => {
  //   setProfileImage(images); // imagesを親の状態にセット
  // };
}



  return (
    
    <div>
      
      {/* {localStorage.getItem("spotifyToken")} */}
      {!isLogin ? (
        <Loginbotton isLogin={isLogin} setIsLogin={setIsLogin} />
        
        
      ) : (
        <>
          {sessionOut && <p>Spotifyトークンの有効期限が切れました</p>}
          <LogoutButton onLogout={handleLogout} />
          
          <SpotifyNowPlaying 
          onSongUpdate={setSong}
          setStatus={setStatus}
          // handleSessionOut={handleSessionOut}
          /> 
          {/* <SpotifyProfile onImageChange={handleProfileImage} /> */}

          
          <MapComponent/>
          
        </>
      )}
      
    </div>
  );
};

export default App;