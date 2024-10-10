import './App.css';

import React, { useState } from "react";
import SpotifyNowPlaying from "./currentplaying.js";
import MapComponent from './Googlemap';
import Login from './Login';
import LoggedIn from './ LoggedIn.js';

const App = (prop) => {
  const [marker, setMarker] = useState({
    lat: 35.658584,
    lng: 139.745433,
  });

  


  return (
    <div> 

        <app></app>

      <SpotifyNowPlaying /> {/* Spotifyの現在の再生曲情報 */}
      <MapComponent marker={marker} setMarker={setMarker} /> {/* Mapのコンポーネント */}
    </div>
  );

};

export default App;
