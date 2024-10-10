import './App.css';

import React, { useState } from "react";
import SpotifyNowPlaying from "./currentplaying.js";
import MapComponent from './Googlemap';
import Loginbotton from './SpotifyApp.js';

const App= () => {
  let [isLogin, setIsLogin] = useState(false)

  const toggleLoginState = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div> 
      // if !login
      <Loginbotton isLogin={isLogin} toggleLoginState={toggleLoginState} ></ Loginbotton>

      /else
      <SpotifyNowPlaying /> {/* Spotifyの現在の再生曲情報 */}
      <MapComponent /> {/* Mapのコンポーネント */}
    </div>
    );


};

export default App;
