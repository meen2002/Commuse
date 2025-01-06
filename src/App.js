import './App.css';
import React, { useState, useEffect } from "react";
import SpotifyNowPlaying from './infrastructures/SpotifyAPI/currentplaying.js';
import MapComponent from './Googlemap.js';
import Login from "./Login";
import LoginButton from './LoginButton.js';
import LogoutHandler from './handleLogout.js';
import FetchAllUserData from './infrastructures/getOtherInfo/GetAllUserInfo.js';
import GetUrl from './infrastructures/getOtherInfo/SetAPIUrl.js';
import LoggedInScreen from './LoggedInScreen.js';
import { fetchUserName } from './GetMyProf.js';

const App = () => {
  const [myId, setMyId] = useState(null);
  const [userData, setUserData] = useState([]);
  const [url, setUrl] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [sessionOut, setSessionOut] = useState(null);
  const [marker, setMarker] = useState({ lat: 33.658584, lng: 139.745433 });
  const [song, setSong] = useState(null);
  const [trackId, setTrackId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  const handleUserId = (newUserId) => {
    setMyId(newUserId);
  };

  const handleLogout = () => {
    LogoutHandler({ setIsLogin, myId });
  };

  const handleTrackIdUpdate = (newTrackId) => {
    setTrackId(newTrackId);
    console.log("Received Track ID in App:", newTrackId);
  };

  useEffect(() => {
    const getUserName = async () => {
      if (isLogin && myId) {
        await fetchUserName(myId);
      }
    };

    getUserName();
  }, [isLogin, myId]);

  return (
    <div>
      {isLogin ? (
        <>
          <LoggedInScreen userName={userName} userImage={userImage} handleLogout={handleLogout} status={sessionOut} />
  
          <SpotifyNowPlaying
            myId={myId}
            onSongUpdate={setSong}
            setStatus={setSessionOut}
            onTrackIdUpdate={handleTrackIdUpdate}
          />
  
          <MapComponent
            onMarkerUpdate={setMarker}
            song={song}
            otherData={userData}
            myId={myId}
            status={sessionOut}
          />
  
          <GetUrl
            marker={marker}
            trackId={trackId}
            setUrl={setUrl}
          />
  
          {url && <FetchAllUserData url={url} setUserData={setUserData} />}
        </>
      ) : (
        <>
          <LoginButton />
          <Login onUserId={handleUserId} setIsLogin={setIsLogin} />
        </>
      )}
    </div>
  );
};

export default App;
