import './App.css';

import React, { useState } from "react";
import SpotifyNowPlaying from "./currentplaying.js";
import MapComponent from './Googlemap';
import Loginbotton from './LoginButton.js';
import LogoutButton from './LogoutButton.js';

const App = () => {
  let [isLogin, setIsLogin] = useState(false)


  return (
    <div>
      {localStorage.getItem("spotifyToken")}
      {!isLogin ? (
        //ログイン状態じゃないなら
        <Loginbotton isLogin={isLogin} setIsLogin={setIsLogin} ></ Loginbotton>
      ) : (
        //ログイン状態なら
        <>
          <LogoutButton isLogin={isLogin} setIsLogin={setIsLogin} />
          <SpotifyNowPlaying />
          <MapComponent />
        </>
      )}
    </div>
  );


};

export default App;
