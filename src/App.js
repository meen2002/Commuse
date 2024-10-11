import './App.css';

import React, { useState } from "react";
import SpotifyNowPlaying from "./currentplaying.js";
import MapComponent from './Googlemap';
import Loginbotton from './LoginButton.js';
import LogoutButton from './LogoutButton.js';

const App = () => {
  let [isLogin, setIsLogin] = useState(false)

  const setLoginState = (state) => {
    setIsLogin(state)
  }

  return (
    <div>
      {isLogin ? (
        <>
          <LogoutButton isLogin={isLogin} setLoginState={setLoginState} />
          <SpotifyNowPlaying />
          <MapComponent />
        </>
      ) : (
        <Loginbotton isLogin={isLogin} setLoginState={setLoginState} ></ Loginbotton>
      )}
    </div>
  );


};

export default App;
